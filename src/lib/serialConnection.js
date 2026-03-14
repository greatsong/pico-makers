/**
 * Web Serial API wrapper for Pico 2 WH USB serial connection.
 *
 * Parses incoming text lines in two formats:
 *   1. Key-value: "CO2:850,T:24.5,H:55.2" → { CO2: 850, T: 24.5, H: 55.2 }
 *   2. CSV with column names: "24.5,55.2,850" (columns set via setColumns)
 */
export class SerialConnection {
  constructor() {
    this._port = null;
    this._reader = null;
    this._readLoop = null;
    this._connected = false;
    this._dataCallback = null;
    this._statusCallback = null;
    this._columns = [];          // column names for CSV mode
    this._rawLines = [];         // last 200 raw lines for debugging
    this._buffer = '';           // partial line buffer
    this._autoReconnect = true;
    this._reconnectTimer = null;
  }

  /** Whether the port is currently open and reading */
  get isConnected() {
    return this._connected;
  }

  /** Access the underlying serial port */
  get port() {
    return this._port;
  }

  /** Last N raw text lines received */
  get rawLines() {
    return this._rawLines;
  }

  /**
   * Set column names for CSV-style data (no keys in line).
   * e.g. setColumns(['temp', 'humi', 'co2'])
   */
  setColumns(names) {
    this._columns = names;
  }

  /**
   * Register a callback for parsed data objects.
   * callback receives { key: numericValue, ... } and raw line string.
   */
  onData(callback) {
    this._dataCallback = callback;
  }

  /**
   * Register a callback for connection status changes.
   * callback receives boolean (true = connected, false = disconnected).
   */
  onStatus(callback) {
    this._statusCallback = callback;
  }

  /**
   * Open the Web Serial port selector and begin reading.
   * @param {number} baudRate - default 115200
   */
  async connect(baudRate = 115200) {
    if (!('serial' in navigator)) {
      throw new Error('Web Serial API를 지원하지 않는 브라우저입니다. Chrome/Edge를 사용해주세요.');
    }

    try {
      this._port = await navigator.serial.requestPort();
      await this._port.open({ baudRate });

      this._connected = true;
      this._statusCallback?.(true);
      this._buffer = '';

      // Start the read loop
      this._readLoop = this._startReading();

      // Listen for disconnect events
      this._port.addEventListener('disconnect', () => {
        this._handleDisconnect();
      });
    } catch (err) {
      // User cancelled the dialog or other error
      this._connected = false;
      this._statusCallback?.(false);
      if (err.name !== 'NotFoundError') {
        throw err;
      }
    }
  }

  /** Cleanly close the serial port */
  async disconnect() {
    this._autoReconnect = false;
    clearTimeout(this._reconnectTimer);

    try {
      if (this._reader) {
        await this._reader.cancel();
        this._reader.releaseLock();
        this._reader = null;
      }
    } catch { /* ignore */ }

    try {
      if (this._port) {
        await this._port.close();
      }
    } catch { /* ignore */ }

    this._connected = false;
    this._statusCallback?.(false);
    this._autoReconnect = true; // reset for future connections
  }

  // ─── Internal ─────────────────────────────────────────

  async _startReading() {
    const decoder = new TextDecoderStream();
    const inputDone = this._port.readable.pipeTo(decoder.writable);
    const inputStream = decoder.readable;
    this._reader = inputStream.getReader();

    try {
      while (true) {
        const { value, done } = await this._reader.read();
        if (done) break;
        if (value) {
          this._processChunk(value);
        }
      }
    } catch (err) {
      // Read error — port may have been unplugged
      console.warn('[Serial] Read error:', err);
    } finally {
      try { this._reader.releaseLock(); } catch { /* */ }
      try { await inputDone; } catch { /* */ }
    }
  }

  _processChunk(chunk) {
    this._buffer += chunk;
    const lines = this._buffer.split(/\r?\n/);
    // Keep the last incomplete segment in the buffer
    this._buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Store raw line (keep last 200)
      this._rawLines.push(trimmed);
      if (this._rawLines.length > 200) this._rawLines.shift();

      // Parse
      const parsed = this._parseLine(trimmed);
      if (parsed && Object.keys(parsed).length > 0) {
        this._dataCallback?.(parsed, trimmed);
      }
    }
  }

  /**
   * Parse a single line into { key: number } object.
   * Supports:
   *   "CO2:850,T:24.5,H:55.2"  → key:value pairs
   *   "24.5,55.2,850"           → uses this._columns
   */
  _parseLine(line) {
    const result = {};

    // Try key:value format first (contains ':')
    if (line.includes(':')) {
      const pairs = line.split(',');
      for (const pair of pairs) {
        const [key, val] = pair.split(':').map(s => s.trim());
        if (key && val !== undefined) {
          const num = parseFloat(val);
          result[key] = isNaN(num) ? val : num;
        }
      }
      return result;
    }

    // CSV format — requires columns to be set
    const values = line.split(',').map(s => s.trim());
    if (this._columns.length > 0) {
      for (let i = 0; i < Math.min(values.length, this._columns.length); i++) {
        const num = parseFloat(values[i]);
        result[this._columns[i]] = isNaN(num) ? values[i] : num;
      }
      return result;
    }

    // CSV without columns — use generic names
    if (values.length > 0 && values.every(v => !isNaN(parseFloat(v)))) {
      values.forEach((v, i) => {
        result[`ch${i + 1}`] = parseFloat(v);
      });
      return result;
    }

    return null;
  }

  _handleDisconnect() {
    this._connected = false;
    this._statusCallback?.(false);

    if (this._autoReconnect && this._port) {
      console.log('[Serial] 연결 끊김 — 3초 후 재연결 시도...');
      this._reconnectTimer = setTimeout(async () => {
        try {
          await this._port.open({ baudRate: 115200 });
          this._connected = true;
          this._statusCallback?.(true);
          this._buffer = '';
          this._readLoop = this._startReading();
          console.log('[Serial] 재연결 성공');
        } catch (err) {
          console.warn('[Serial] 재연결 실패:', err);
        }
      }, 3000);
    }
  }
}

export default SerialConnection;
