// 15차시 + Course B 커리큘럼 구조 데이터
// ai-physical-computing 교재 기반

export const CURRICULUM = {
  courseA: {
    act1: {
      title: 'Act 1: 센서로 세상 읽기',
      subtitle: '직접 코딩으로 기초 다지기',
      aiRole: 'teacher',       // 친절한 선생님
      codeStyle: 'full',       // 완성 코드 + 줄별 설명
      lessons: [
        {
          id: 'lesson-01', num: 1, title: '센서로 세상 읽기',
          sensors: ['DHT20'], devices: [],
          question: '우리 교실의 온도는 정말 24도일까?',
          skills: ['직접코딩', 'I2C', '센서읽기'],
          difficulty: 1, duration: 50,
          tips: ['I2C 버스 번호(0 vs 1) 주의', 'GP6=SDA, GP7=SCL 확인'],
          suggestedQuestions: [
            'DHT20 센서 배선은 어떻게 하나요?',
            'I2C가 뭐예요?',
            '온도가 안 읽혀요, 도와주세요!',
          ],
        },
        {
          id: 'lesson-02', num: 2, title: '빛을 숫자로',
          sensors: ['LIGHT'], devices: [],
          question: '지금 이 교실은 정말 밝은 편일까?',
          skills: ['ADC', 'Thonny Plotter', '실시간그래프'],
          difficulty: 1, duration: 50,
          tips: ['ADC는 GP26~GP28만 사용 가능', 'Thonny Plotter로 시각화'],
          suggestedQuestions: [
            '빛 센서 값이 0~65535인데 이게 뭔가요?',
            'Thonny Plotter 사용법 알려주세요',
            'ADC가 뭐예요?',
          ],
        },
        {
          id: 'lesson-03', num: 3, title: '자동 기록 시스템',
          sensors: ['DHT20'], devices: [],
          question: '센서 데이터를 사람 대신 컴퓨터가 기록하면 어떤 점이 달라질까?',
          skills: ['파일I/O', 'CSV', '데이터저장'],
          difficulty: 2, duration: 50,
          tips: ['파일 열 때 "a" 모드 사용 주의', 'flush()로 바로 저장'],
          suggestedQuestions: [
            'CSV 파일이 뭔가요?',
            '파일에 데이터를 저장하는 코드를 알려주세요',
            '기록이 안 되는데 왜 그럴까요?',
          ],
        },
        {
          id: 'lesson-04', num: 4, title: '첫 번째 대시보드',
          sensors: ['DHT20', 'LIGHT'], devices: ['OLED'],
          question: '센서 데이터를 Shell 창이 아니라, 화면에 예쁘게 보여줄 수는 없을까?',
          skills: ['다중센서', 'I2C주소공유', 'OLED제어', '대시보드'],
          difficulty: 2, duration: 50,
          tips: ['OLED와 DHT20 모두 I2C — 주소 다르면 공존 가능', 'Y-split 케이블 활용'],
          suggestedQuestions: [
            'OLED에 글자를 표시하는 코드를 알려주세요',
            'DHT20과 OLED를 동시에 연결할 수 있나요?',
            '대시보드 레이아웃 예시를 보여주세요',
          ],
        },
      ],
    },
    act2: {
      title: 'Act 2: AI와 함께 만들기',
      subtitle: '바이브 코딩으로 확장하기',
      aiRole: 'coach',         // 바이브코딩 코치
      codeStyle: 'guided',     // 프롬프트 작성법 가이드, 코드 검증
      lessons: [
        {
          id: 'lesson-05', num: 5, title: 'AI에게 코드 시키기',
          sensors: ['DHT20'], devices: [],
          question: '코드를 직접 쓰지 않고, AI에게 말로 설명해서 만들 수 있을까?',
          skills: ['바이브코딩', '프롬프트작성', 'AI코드리뷰'],
          difficulty: 2, duration: 50,
          tips: ['좋은 프롬프트의 3요소: 맥락+구체적요청+제약조건', '결과물 반드시 검증'],
          suggestedQuestions: [
            '바이브 코딩이 뭔가요?',
            '프롬프트를 어떻게 써야 하나요?',
            'AI가 만든 코드를 어떻게 검증하나요?',
          ],
        },
        {
          id: 'lesson-06', num: 6, title: '환경 모니터링 대시보드',
          sensors: ['SCD30', 'DHT20'], devices: ['OLED'],
          question: '바이브 코딩으로 교실 환경 대시보드를 만들 수 있을까?',
          skills: ['멀티I2C', 'CO2기준', '환기판정'],
          difficulty: 3, duration: 50,
          tips: ['CO2 1000ppm 이상이면 환기 필요', 'SCD30 첫 측정 2초 대기'],
          suggestedQuestions: [
            'CO2 센서 배선을 알려주세요',
            'CO2 기준치가 얼마인가요?',
            '환기 알림 코드를 바이브 코딩으로 만들고 싶어요',
          ],
        },
        {
          id: 'lesson-07', num: 7, title: '내 몸의 데이터',
          sensors: ['PULSE'], devices: ['OLED'],
          question: '내 심장 박동을 실시간 대시보드로 볼 수 있을까?',
          skills: ['피크감지', 'BPM계산', '파형그래프'],
          difficulty: 3, duration: 50,
          tips: ['THRESHOLD 값 조절이 핵심', '손가락을 세게 누르면 오히려 안 됨'],
          suggestedQuestions: [
            '심박 센서 연결 방법을 알려주세요',
            'BPM은 어떻게 계산하나요?',
            '파형이 안 나오는데 왜 그럴까요?',
          ],
        },
        {
          id: 'lesson-08', num: 8, title: '스마트 알림 시스템',
          sensors: ['ULTRASONIC'], devices: ['BUZZER', 'LED_BAR', 'OLED'],
          question: '센서 데이터에 따라 자동으로 알림을 보내는 시스템을 만들 수 있을까?',
          skills: ['PWM', '입력처리출력', '거리별알림'],
          difficulty: 3, duration: 50,
          tips: ['초음파 최소 2cm, 최대 400cm', '부저 주파수로 경고 강도 표현'],
          suggestedQuestions: [
            '초음파 센서와 부저를 같이 사용하는 방법은?',
            'PWM으로 부저 소리를 바꾸는 방법은?',
            '거리에 따라 LED바가 변하게 하고 싶어요',
          ],
        },
        {
          id: 'lesson-09', num: 9, title: '데이터 정리와 시각화',
          sensors: [], devices: [],
          question: '센서 데이터를 예쁜 대시보드로 만들려면 먼저 무엇을 해야 할까?',
          skills: ['PC Python', 'matplotlib', 'plotly', '이상값제거'],
          difficulty: 3, duration: 50,
          tips: ['PC Python 환경 (Pico가 아닌 노트북)', '이상값 = 측정 오류 데이터'],
          suggestedQuestions: [
            'CSV 파일을 그래프로 만드는 방법은?',
            '이상값을 어떻게 찾아서 제거하나요?',
            'matplotlib과 plotly 차이가 뭔가요?',
          ],
        },
        {
          id: 'lesson-10', num: 10, title: 'AI 데이터 분석',
          sensors: [], devices: [],
          question: 'AI에게 데이터를 보여주면 사람이 못 찾은 패턴도 찾아줄까?',
          skills: ['AI분석프롬프트', 'AI한계이해', '비판적사고'],
          difficulty: 2, duration: 50,
          tips: ['AI 분석 결과도 반드시 검증', 'AI는 데이터를 "이해"하는 게 아님'],
          suggestedQuestions: [
            'AI에게 데이터 분석을 시키는 프롬프트 예시가 있나요?',
            'AI 분석의 한계가 뭔가요?',
            '분석 결과를 검증하는 방법은?',
          ],
        },
      ],
    },
    act3: {
      title: 'Act 3: 프로젝트와 도전',
      subtitle: '팀 프로젝트와 머신러닝',
      aiRole: 'mentor',        // 프로젝트 멘토
      codeStyle: 'hints',      // 설계 질문, 방향만 제시
      lessons: [
        {
          id: 'lesson-11', num: 11, title: '팀 프로젝트 설계',
          sensors: [], devices: [],
          question: '센서+대시보드+AI로 해결할 수 있는 우리만의 문제는 뭘까?',
          skills: ['문제발견', '센서선택', '대시보드설계', '바이브코딩전략'],
          difficulty: 2, duration: 50,
          tips: ['문제 → 센서 → 대시보드 → AI 순서로 설계', '실현 가능성 먼저 체크'],
          suggestedQuestions: [
            '프로젝트 주제를 어떻게 정하나요?',
            '센서 조합을 추천해주세요',
            '프로젝트 계획서 양식이 있나요?',
          ],
        },
        {
          id: 'lesson-12', num: 12, title: '실시간 대시보드 제작',
          sensors: [], devices: ['OLED'],
          question: '여러 센서 데이터를 한 화면에 보여주는 종합 대시보드를 만들 수 있을까?',
          skills: ['OLED레이아웃', 'Serial통신', 'PC실시간그래프'],
          difficulty: 4, duration: 50,
          tips: ['OLED + PC 이중 대시보드', 'Serial로 Pico→PC 데이터 전송'],
          suggestedQuestions: [
            'OLED 대시보드 레이아웃을 설계하고 싶어요',
            'Pico에서 PC로 데이터를 보내는 방법은?',
            'PC에서 실시간 그래프를 만드는 방법은?',
          ],
        },
        {
          id: 'lesson-13', num: 13, title: '센서 데이터로 ML 입문',
          sensors: [], devices: [],
          question: '컴퓨터가 센서 데이터만 보고 박수 소리와 말소리를 구분할 수 있을까?',
          skills: ['Teachable Machine', 'ML파이프라인', '데이터품질'],
          difficulty: 4, duration: 50,
          tips: ['Teachable Machine = 코드 없이 ML 체험', '데이터 양과 품질이 핵심'],
          suggestedQuestions: [
            '머신러닝이 뭔가요?',
            'Teachable Machine 사용법을 알려주세요',
            '좋은 학습 데이터를 만드는 방법은?',
          ],
        },
        {
          id: 'lesson-14', num: 14, title: '발표와 피드백',
          sensors: [], devices: [],
          question: '대시보드와 데이터로 사람들을 설득하려면?',
          skills: ['발표구조', '데이터설득', '피드백'],
          difficulty: 2, duration: 50,
          tips: ['5단계 발표 구조: 문제→방법→결과→의미→다음', '데이터로 스토리텔링'],
          suggestedQuestions: [
            '발표 자료를 어떻게 구성하나요?',
            '데이터로 설득하는 방법을 알려주세요',
            '피드백을 어떻게 주고받나요?',
          ],
        },
        {
          id: 'lesson-15', num: 15, title: '되돌아보기와 다음 단계',
          sensors: [], devices: [],
          question: '15차시 동안 나는 어떤 능력을 얻었을까?',
          skills: ['성찰', '자기평가', '코스B준비'],
          difficulty: 1, duration: 50,
          tips: ['센서 여권에 배운 센서 기록', 'Course B 레벨 선택 도움'],
          suggestedQuestions: [
            '지금까지 뭘 배운 건가요?',
            'Course B는 뭔가요?',
            '어떤 레벨부터 시작하면 좋을까요?',
          ],
        },
      ],
    },
  },
  courseB: {
    wifiTips: [
      'Pico W는 2.4GHz WiFi만 지원합니다 (5GHz 연결 불가). 공유기 설정에서 2.4GHz 대역을 확인하세요.',
      '학교 WiFi(기업용 인증)가 안 되면 핸드폰 핫스팟을 사용하세요. 핫스팟 설정에서 2.4GHz로 변경해야 합니다.',
      'SSID와 비밀번호를 정확히 입력하세요. 대소문자를 구분하며, 공백도 포함됩니다.',
      'WiFi 연결 실패 시: (1) SSID/비밀번호 재확인 (2) Pico 재부팅 (3) 공유기와 가까이 이동 (4) 핫스팟으로 전환',
      '교실에서 여러 Pico가 동시에 연결되면 공유기 부하가 생길 수 있습니다. 순차적으로 연결하세요.',
    ],
    lv1: {
      id: 'course-b-lv1', title: '탐험가', level: 1,
      sensors: 1, hours: 3, focus: '단일센서 대시보드',
      difficulty: 2,
      aiRole: 'coach', codeStyle: 'hints',
      prerequisite: 'Course A 1~4차시',
      textbookUrl: '/course-b/lv1/',
      dataStorage: {
        method: 'csv',
        title: 'CSV 파일 저장',
        desc: 'Pico 내부 파일 시스템에 CSV로 데이터 저장',
        icon: '📁',
      },
      examples: [
        {
          name: '교실 온도 대시보드',
          sensors: ['DHT20', 'OLED'],
          desc: 'DHT20으로 온습도 측정, OLED에 막대그래프 표시',
          code: `from machine import I2C, Pin
import time

# ── I2C 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
sensor_addr = 0x38
time.sleep(0.1)

# ── OLED 설정 ──
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_dht20():
    i2c.writeto(sensor_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(sensor_addr, 7)
    humidity = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temperature = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temperature, 1), round(humidity, 1)

def get_status(temp):
    if temp < 18:
        return "Cold"
    elif temp > 28:
        return "Hot"
    else:
        return "Good"

# ── CSV 파일 준비 ──
f = open("temp_log.csv", "a")
f.write("time_s,temp,humi\\n")
start = time.ticks_ms()

# 온도 이력 (스파크라인용, 최대 50개)
temp_history = []

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    status = get_status(temp)
    elapsed = time.ticks_diff(time.ticks_ms(), start) // 1000

    # 이력 저장
    temp_history.append(int(temp))
    if len(temp_history) > 50:
        temp_history.pop(0)

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Classroom", 28, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 온습도 표시
    oled.text(f"{temp}", 4, 16)
    oled.text("o", 4 + len(str(temp)) * 8, 14)
    oled.text("C", 4 + len(str(temp)) * 8 + 8, 16)
    oled.text(f"H:{humi:.0f}%", 72, 16)
    oled.text(f"[{status}]", 76, 28)
    # 스파크라인 영역
    oled.hline(0, 44, 128, 1)
    oled.fill_rect(0, 46, 128, 18, 1)
    oled.text("0", 0, 46, 0)
    oled.text("40C", 100, 46, 0)
    for i in range(len(temp_history)):
        h = int((temp_history[i] - 10) / 30 * 14)
        h = max(1, min(14, h))
        oled.vline(2 + i, 62 - h, h, 0)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{temp},{humi}\\n")
    f.flush()

    print(f"{elapsed}s | {temp}°C {humi}% [{status}]")
    time.sleep(2)`,
          pcCode: `# PC 실시간 대시보드 — 교실 온도 대시보드
# 사용법: pip install pyserial matplotlib
# 실행: python classroom_temp_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time
import re

# ── 시리얼 연결 (포트 이름은 환경에 맞게 수정) ──
# Windows: 'COM3', macOS: '/dev/tty.usbmodem...', Linux: '/dev/ttyACM0'
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)  # 연결 안정화

# ── 데이터 버퍼 ──
MAX_POINTS = 100
times = deque(maxlen=MAX_POINTS)
temps = deque(maxlen=MAX_POINTS)
humis = deque(maxlen=MAX_POINTS)

# ── 그래프 설정 ──
plt.style.use('dark_background')
fig, ax1 = plt.subplots(figsize=(10, 5))
fig.suptitle('Classroom Temp Dashboard', fontsize=14, color='cyan')

ax2 = ax1.twinx()
line_temp, = ax1.plot([], [], 'r-o', markersize=3, label='Temp (°C)')
line_humi, = ax2.plot([], [], 'c-s', markersize=3, label='Humi (%)')

ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Temperature (°C)', color='red')
ax2.set_ylabel('Humidity (%)', color='cyan')
ax1.set_ylim(10, 40)
ax2.set_ylim(0, 100)

# 쾌적 온도 영역 표시
ax1.axhspan(18, 28, alpha=0.15, color='green', label='Good (18-28°C)')
ax1.axhspan(0, 18, alpha=0.10, color='blue', label='Cold')
ax1.axhspan(28, 50, alpha=0.10, color='red', label='Hot')

ax1.legend(loc='upper left')
ax2.legend(loc='upper right')
ax1.grid(True, alpha=0.3)

# ── 실시간 업데이트 ──
def update(frame):
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "12s | 24.5°C 55.2% [Good]"
        m = re.match(r'(\\d+)s \\| ([\\d.]+)°C ([\\d.]+)% \\[(.+)\\]', line)
        if not m:
            return
        t = int(m.group(1))
        temp = float(m.group(2))
        humi = float(m.group(3))

        times.append(t)
        temps.append(temp)
        humis.append(humi)

        line_temp.set_data(list(times), list(temps))
        line_humi.set_data(list(times), list(humis))
        ax1.set_xlim(max(0, t - 200), t + 10)
        fig.canvas.manager.set_window_title(f'Classroom — {temp}°C {humi}% [{m.group(4)}]')
    except:
        pass

ani = FuncAnimation(fig, update, interval=2000, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
        {
          name: '소음 레벨 모니터',
          sensors: ['SOUND', 'OLED'],
          desc: '소리 센서로 소음 수준 판별, 레벨 미터 시각화',
          code: `from machine import ADC, Pin, I2C
import time

# ── 소리 센서 설정 (ADC — Grove A1 포트: GP27) ──
sound = ADC(Pin(27))

# ── OLED 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def get_noise_level(value):
    pct = value / 65535 * 100
    if pct < 20:
        return pct, "Quiet", 1
    elif pct < 50:
        return pct, "Normal", 3
    elif pct < 75:
        return pct, "Loud", 5
    else:
        return pct, "V.Loud", 7

# ── CSV 파일 준비 ──
f = open("noise_log.csv", "a")
f.write("time_s,noise_pct,level\\n")
start = time.ticks_ms()

# ── 메인 루프 ──
while True:
    raw = sound.read_u16()
    pct, level_text, bars = get_noise_level(raw)
    elapsed = time.ticks_diff(time.ticks_ms(), start) // 1000

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Noise Level", 24, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 퍼센트 크게 표시
    pct_str = f"{pct:.0f}%"
    oled.text(pct_str, 64 - len(pct_str) * 4, 18)
    oled.text(f"[{level_text}]", 64 - len(level_text) * 4 - 8, 30)
    # 레벨 미터 (막대 7칸, 2px 간격)
    oled.hline(0, 42, 128, 1)
    for i in range(7):
        x = 10 + i * 16
        if i < bars:
            oled.fill_rect(x, 46, 12, 16, 1)
        else:
            oled.rect(x, 46, 12, 16, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{pct:.1f},{level_text}\\n")
    f.flush()

    print(f"{elapsed}s | {pct:.0f}% [{level_text}]")
    time.sleep(0.5)`,
          pcCode: `# PC 실시간 대시보드 — 소음 레벨 모니터
# 사용법: pip install pyserial matplotlib
# 실행: python noise_level_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import numpy as np
import time
import re

# ── 시리얼 연결 ──
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

# ── 데이터 버퍼 ──
MAX_POINTS = 200
times = deque(maxlen=MAX_POINTS)
noise_pcts = deque(maxlen=MAX_POINTS)

# ── 그래프 설정 ──
plt.style.use('dark_background')
fig, (ax_bar, ax_wave) = plt.subplots(1, 2, figsize=(12, 5),
                                       gridspec_kw={'width_ratios': [1, 2]})
fig.suptitle('Noise Level Monitor', fontsize=14, color='cyan')

# VU 미터 (막대 차트)
vu_labels = ['Q', 'N', 'L', 'VL']
vu_colors = ['#00ff88', '#00ff88', '#ffaa00', '#ff3333']
vu_bars = ax_bar.barh(vu_labels, [0, 0, 0, 0], color=vu_colors, height=0.6)
ax_bar.set_xlim(0, 100)
ax_bar.set_title('VU Meter', color='lime')
ax_bar.set_xlabel('%')

# 파형 (롤링)
line_wave, = ax_wave.plot([], [], 'lime', linewidth=1)
ax_wave.set_ylim(0, 100)
ax_wave.set_title('Noise Waveform', color='lime')
ax_wave.set_xlabel('Time (s)')
ax_wave.set_ylabel('Level (%)')
ax_wave.grid(True, alpha=0.3)

# 영역 색상
ax_wave.axhspan(0, 20, alpha=0.1, color='green')
ax_wave.axhspan(20, 50, alpha=0.1, color='yellow')
ax_wave.axhspan(50, 75, alpha=0.1, color='orange')
ax_wave.axhspan(75, 100, alpha=0.1, color='red')

def update(frame):
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "12s | 45% [Normal]"
        m = re.match(r'(\\d+)s \\| (\\d+)% \\[(.+)\\]', line)
        if not m:
            return
        t = int(m.group(1))
        pct = float(m.group(2))
        level = m.group(3)

        times.append(t)
        noise_pcts.append(pct)

        # VU 미터 업데이트
        levels = [min(pct, 20), min(max(pct - 20, 0), 30),
                  min(max(pct - 50, 0), 25), max(pct - 75, 0)]
        for bar, val in zip(vu_bars, levels):
            bar.set_width(val)

        # 파형 업데이트
        line_wave.set_data(list(times), list(noise_pcts))
        ax_wave.set_xlim(max(0, t - 100), t + 5)

        fig.canvas.manager.set_window_title(f'Noise — {pct:.0f}% [{level}]')
    except:
        pass

ani = FuncAnimation(fig, update, interval=500, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
        {
          name: '자동 조명 측정기',
          sensors: ['LIGHT', 'OLED'],
          desc: '빛 센서로 조도 퍼센트 변환, 실시간 그래프',
          code: `from machine import ADC, Pin, I2C
import time

# ── 빛 센서 설정 (ADC — Grove A0 포트: GP26) ──
light = ADC(Pin(26))

# ── OLED 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

# 그래프 데이터 저장 (최근 100개)
graph_data = []

def get_brightness(value):
    pct = value / 65535 * 100
    if pct < 20:
        return pct, "Dark"
    elif pct < 60:
        return pct, "Normal"
    else:
        return pct, "Bright"

# ── CSV 파일 준비 ──
f = open("light_log.csv", "a")
f.write("time_s,light_pct,status\\n")
start = time.ticks_ms()

# ── 메인 루프 ──
while True:
    raw = light.read_u16()
    pct, status = get_brightness(raw)
    elapsed = time.ticks_diff(time.ticks_ms(), start) // 1000

    # 그래프 데이터 추가
    graph_data.append(int(pct))
    if len(graph_data) > 100:
        graph_data.pop(0)

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Light Meter", 24, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 현재 값 + 상태
    oled.text(f"{pct:.0f}%", 4, 16)
    oled.text(f"[{status}]", 64, 16)
    # 막대그래프
    bar_w = int(min(pct, 100) / 100 * 108)
    oled.rect(8, 28, 112, 8, 1)
    oled.fill_rect(10, 30, bar_w, 4, 1)
    # 스파크라인 영역 (테두리 프레임)
    oled.hline(0, 38, 128, 1)
    oled.rect(0, 40, 128, 24, 1)
    for i in range(min(len(graph_data), 124)):
        idx = len(graph_data) - min(len(graph_data), 124) + i
        h = int(graph_data[idx] / 100 * 20)
        h = max(1, min(20, h))
        oled.vline(2 + i, 62 - h, h, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{pct:.1f},{status}\\n")
    f.flush()

    print(f"{elapsed}s | {pct:.0f}% [{status}]")
    time.sleep(1)`,
          pcCode: `# PC 실시간 대시보드 — 자동 조명 측정기
# 사용법: pip install pyserial matplotlib
# 실행: python light_meter_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time
import re

# ── 시리얼 연결 ──
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

# ── 데이터 버퍼 ──
MAX_POINTS = 200
times = deque(maxlen=MAX_POINTS)
light_vals = deque(maxlen=MAX_POINTS)

# ── 그래프 설정 ──
plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(10, 5))
fig.suptitle('Light Level Monitor', fontsize=14, color='cyan')

line_light, = ax.plot([], [], 'yellow', linewidth=1.5)
fill = None
ax.set_ylim(0, 100)
ax.set_xlabel('Time (s)')
ax.set_ylabel('Light Level (%)')
ax.grid(True, alpha=0.3)

# 주/야간 영역 표시
ax.axhspan(0, 20, alpha=0.15, color='#1a1a3e', label='Dark')
ax.axhspan(20, 60, alpha=0.10, color='#4a4a00', label='Normal')
ax.axhspan(60, 100, alpha=0.15, color='#aaaa00', label='Bright')
ax.legend(loc='upper left')

def update(frame):
    global fill
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "12s | 45% [Normal]"
        m = re.match(r'(\\d+)s \\| (\\d+)% \\[(.+)\\]', line)
        if not m:
            return
        t = int(m.group(1))
        val = float(m.group(2))
        status = m.group(3)

        times.append(t)
        light_vals.append(val)

        t_list = list(times)
        v_list = list(light_vals)
        line_light.set_data(t_list, v_list)

        # 면적 채우기 갱신
        if fill:
            fill.remove()
        fill = ax.fill_between(t_list, v_list, alpha=0.3, color='yellow')

        ax.set_xlim(max(0, t - 200), t + 10)
        fig.canvas.manager.set_window_title(f'Light — {val:.0f}% [{status}]')
    except:
        pass

ani = FuncAnimation(fig, update, interval=1000, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
      ],
      requirements: [
        '센서 1개 데이터 정상 읽기',
        'OLED에 실시간 대시보드 표시',
        'if문으로 상태 판단 (예: 좋음/보통/나쁨)',
        'CSV 파일에 데이터 자동 저장',
        '프로젝트 한 줄 설명 작성',
      ],
      evaluation: {
        essential: ['코드 실행 + 센서 읽기', 'OLED 시각화'],
        good: ['조건 판단 로직', 'CSV 자동 저장'],
        excellent: ['try/except 에러 처리', '창의적 확장 기능'],
      },
      timeline: [
        { time: '0:00~0:20', task: '프로젝트 선택 + 센서 연결', picoMakers: '센서 추가 → 배선 탭 확인' },
        { time: '0:20~0:40', task: '센서 읽기 코드 작성', picoMakers: '코드 탭에서 예제 복사 → AI에게 질문' },
        { time: '0:40~1:20', task: 'OLED 대시보드 제작', picoMakers: 'AI에게 "OLED 대시보드 코드" 요청' },
        { time: '1:20~1:50', task: '조건 판단 + CSV 저장', picoMakers: 'AI에게 "if문 + CSV 저장 추가" 요청' },
        { time: '1:50~2:20', task: '테스트 + 디버깅', picoMakers: '에러 메시지 붙여넣기 → AI 진단' },
        { time: '2:20~3:00', task: '기록 + 발표 준비', picoMakers: '스크린샷 + 한 줄 설명' },
      ],
      suggestedQuestions: [
        '어떤 센서로 시작하면 좋을까요?',
        'OLED 대시보드 디자인을 도와주세요',
        'CSV 파일에 데이터를 저장하는 방법은?',
        '프로젝트 완성도를 높이려면?',
      ],
    },
    lv2: {
      id: 'course-b-lv2', title: '발명가', level: 2,
      sensors: '2+', hours: 3, focus: '복합센서 스마트시스템',
      difficulty: 3,
      aiRole: 'coach', codeStyle: 'hints',
      prerequisite: 'Course A 1~10차시',
      textbookUrl: '/course-b/lv2/',
      dataStorage: {
        method: 'google-sheets',
        title: 'Google Sheets 연동',
        desc: 'WiFi로 Google Sheets에 자동 기록 — 어디서든 데이터 확인',
        icon: '📊',
        setupGuide: '## Google Sheets 연동 설정\n\n### 1단계: Apps Script 프로젝트 만들기\n1. Google Drive 접속 (drive.google.com)\n2. 좌측 상단 "새로 만들기" → "더보기" → "Google Apps Script" 클릭\n   (※ "더보기"를 눌러야 Apps Script가 보입니다)\n3. 프로젝트 이름을 "센서데이터수집"으로 변경\n\n### 2단계: 코드 붙여넣기\n1. 기본으로 있는 function myFunction() { } 코드를 **전체 삭제**\n2. 아래 Apps Script 코드를 **전체 복사하여 붙여넣기**\n3. Ctrl+S (또는 Cmd+S)로 저장\n\n### 3단계: 웹 앱으로 배포\n1. 상단 메뉴 "배포" → "새 배포" 클릭\n2. 톱니바퀴 아이콘 → "웹 앱" 선택\n3. 설명: "센서 데이터 수집" 입력\n4. 실행 주체: "나" (본인 계정)\n5. 액세스 권한: **"모든 사용자"** 선택 (중요!)\n6. "배포" 버튼 클릭\n\n### 4단계: 권한 승인 (처음 1회)\n1. "액세스 승인" 버튼 클릭\n2. Google 계정 선택\n3. ⚠️ "확인되지 않은 앱" 경고가 나타남\n4. 좌측 하단 "고급" 클릭\n5. "센서데이터수집(으)로 이동 (안전하지 않음)" 클릭\n6. "허용" 버튼 클릭\n\n### 5단계: URL 복사\n1. 배포 완료 화면에서 **웹 앱 URL**을 복사\n2. Pico 코드의 SHEET_URL = "여기에_붙여넣기"\n3. URL은 https://script.google.com/macros/s/...../exec 형태입니다\n\n💡 코드를 수정하면 "배포 관리" → "새 버전"으로 재배포해야 반영됩니다',
        appsScriptCode: `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // 타임스탬프 자동 추가
  var row = [new Date()];
  var keys = Object.keys(data);

  // 첫 행이면 헤더 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["timestamp", ...keys]);
  }

  // 데이터 행 추가
  keys.forEach(function(key) {
    row.push(data[key]);
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({status: "ok"})
  ).setMimeType(ContentService.MimeType.JSON);
}`,
        picoTemplate: `# ── WiFi 연결 ──
import network
import urequests
import json

SSID = "학교WiFi"        # WiFi 이름
PASSWORD = "비밀번호"     # WiFi 비밀번호
SHEET_URL = "https://script.google.com/macros/s/여기에_스크립트ID/exec"
import time

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

print("WiFi 연결 중...")
# WiFi 연결 (최대 20초)
timeout = 40
while not wlan.isconnected() and timeout > 0:
    time.sleep(0.5)
    timeout -= 1

if not wlan.isconnected():
    print("WiFi 연결 실패! SSID/비밀번호를 확인하세요")
    # 오프라인 모드로 전환
else:
    print("WiFi 연결 완료:", wlan.ifconfig()[0])

def send_to_sheets(data_dict):
    """Google Sheets에 데이터 전송"""
    try:
        r = urequests.post(SHEET_URL,
            json=data_dict,
            headers={"Content-Type": "application/json"})
        print(f"Sheets 전송 OK ({r.status_code})")
        r.close()
    except Exception as e:
        print(f"전송 실패: {e}")

# 메인 루프에서 사용 예시:
# send_to_sheets({"temp": temp, "humi": humi, "co2": co2})`,
      },
      examples: [
        {
          name: '스마트 환기 시스템',
          sensors: ['DHT20', 'SCD30', 'OLED'],
          desc: 'CO2+온습도 복합 판단으로 환기 알림',
          code: `from machine import I2C, Pin
import time, struct

# ── I2C 설정 (DHT20 + SCD30 + OLED 공유) ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
scd_addr = 0x61
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def crc8(data):
    crc = 0xFF
    for b in data:
        crc ^= b
        for _ in range(8):
            if crc & 0x80:
                crc = (crc << 1) ^ 0x31
            else:
                crc <<= 1
            crc &= 0xFF
    return crc

def read_dht20():
    i2c.writeto(dht_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(dht_addr, 7)
    humi = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temp, 1), round(humi, 1)

def read_scd30():
    # 데이터 준비 확인
    i2c.writeto(scd_addr, bytes([0x02, 0x02]))
    time.sleep(0.01)
    ready = i2c.readfrom(scd_addr, 3)
    if ready[1] != 1:
        return None
    # 측정 데이터 읽기
    i2c.writeto(scd_addr, bytes([0x03, 0x00]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 18)
    co2 = struct.unpack('>f', bytes([data[0], data[1], data[3], data[4]]))[0]
    return round(co2)

# SCD30 연속 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x00, 0x10, 0x00, 0x00, crc8(bytes([0x00, 0x00]))]))
print("SCD30 준비 중... 2초 대기")
time.sleep(2)

def judge_ventilation(co2, temp, humi):
    if co2 > 1500 or temp > 30:
        return "VENT NOW!", True
    elif co2 > 1000 or temp > 28:
        return "Vent Soon", True
    else:
        return "Good", False

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    co2 = read_scd30()
    if co2 is None:
        time.sleep(2)
        continue
    status, need_vent = judge_ventilation(co2, temp, humi)

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Smart Vent", 28, 2, 0)
    oled.hline(0, 13, 128, 1)
    # CO2 값 크게 표시
    oled.text(f"CO2 {co2}ppm", 4, 16)
    # 3개 미니 프로그레스 바
    # CO2 바 (0~2000ppm)
    oled.text("C", 0, 28)
    co2_w = int(min(co2, 2000) / 2000 * 80)
    oled.rect(10, 28, 82, 8, 1)
    oled.fill_rect(12, 30, co2_w, 4, 1)
    # Temp 바 (0~40C)
    oled.text("T", 0, 38)
    temp_w = int(min(max(temp, 0), 40) / 40 * 80)
    oled.rect(10, 38, 82, 8, 1)
    oled.fill_rect(12, 40, temp_w, 4, 1)
    oled.text(f"{temp}", 96, 38)
    # Humi 바 (0~100%)
    oled.text("H", 0, 48)
    humi_w = int(min(humi, 100) / 100 * 80)
    oled.rect(10, 48, 82, 8, 1)
    oled.fill_rect(12, 50, humi_w, 4, 1)
    oled.text(f"{humi}", 96, 48)
    # 상태 표시
    if need_vent:
        oled.fill_rect(0, 56, 128, 8, 1)
        oled.text(f">> {status} <<", 4, 56, 0)
    else:
        oled.text(f"[{status}]", 96, 16)
    oled.show()

    print(f"CO2:{co2}ppm T:{temp}C H:{humi}% [{status}]")
    time.sleep(2)`,
          pcCode: `# PC 실시간 대시보드 — 스마트 환기 시스템
# 사용법: pip install pyserial matplotlib
# 실행: python smart_vent_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.patches import FancyBboxPatch
from collections import deque
import time
import re

# ── 시리얼 연결 ──
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

# ── 데이터 버퍼 ──
MAX_POINTS = 100
idx_buf = deque(maxlen=MAX_POINTS)
co2_buf = deque(maxlen=MAX_POINTS)
temp_buf = deque(maxlen=MAX_POINTS)
humi_buf = deque(maxlen=MAX_POINTS)
count = 0

# ── 그래프 설정 (2x2) ──
plt.style.use('dark_background')
fig, ((ax_co2, ax_temp), (ax_humi, ax_status)) = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle('Smart Ventilation Dashboard', fontsize=14, color='cyan')

# CO2 트렌드
line_co2, = ax_co2.plot([], [], 'r-', linewidth=2)
ax_co2.set_title('CO2 (ppm)', color='red')
ax_co2.set_ylim(300, 2500)
ax_co2.axhline(y=1000, color='orange', linestyle='--', alpha=0.5, label='Vent Soon')
ax_co2.axhline(y=1500, color='red', linestyle='--', alpha=0.5, label='Vent Now!')
ax_co2.legend(fontsize=8)
ax_co2.grid(True, alpha=0.3)

# 온도 트렌드
line_temp, = ax_temp.plot([], [], '#ff8800', linewidth=2)
ax_temp.set_title('Temperature (°C)', color='#ff8800')
ax_temp.set_ylim(10, 40)
ax_temp.axhspan(18, 28, alpha=0.1, color='green')
ax_temp.grid(True, alpha=0.3)

# 습도 트렌드
line_humi, = ax_humi.plot([], [], 'cyan', linewidth=2)
ax_humi.set_title('Humidity (%)', color='cyan')
ax_humi.set_ylim(0, 100)
ax_humi.axhspan(40, 60, alpha=0.1, color='green')
ax_humi.grid(True, alpha=0.3)

# 상태 표시
ax_status.set_xlim(0, 10)
ax_status.set_ylim(0, 10)
ax_status.set_title('Status', color='white')
ax_status.axis('off')
status_text = ax_status.text(5, 5, 'Waiting...', ha='center', va='center',
                              fontsize=24, color='gray',
                              bbox=dict(boxstyle='round,pad=0.5', facecolor='#222'))

def update(frame):
    global count
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "CO2:850ppm T:24.5C H:55.2% [Good]"
        m = re.match(r'CO2:(\\d+)ppm T:([\\d.]+)C H:([\\d.]+)% \\[(.+)\\]', line)
        if not m:
            return
        co2 = int(m.group(1))
        temp = float(m.group(2))
        humi = float(m.group(3))
        status = m.group(4)
        count += 1

        idx_buf.append(count)
        co2_buf.append(co2)
        temp_buf.append(temp)
        humi_buf.append(humi)

        x = list(idx_buf)
        line_co2.set_data(x, list(co2_buf))
        line_temp.set_data(x, list(temp_buf))
        line_humi.set_data(x, list(humi_buf))

        for ax in [ax_co2, ax_temp, ax_humi]:
            ax.set_xlim(max(0, count - MAX_POINTS), count + 5)

        # 상태 색상
        colors = {'Good': '#00ff88', 'Vent Soon': '#ffaa00', 'VENT NOW!': '#ff3333'}
        c = colors.get(status, 'gray')
        status_text.set_text(f'{status}\\nCO2: {co2} ppm')
        status_text.set_color(c)

        fig.canvas.manager.set_window_title(f'Vent — CO2:{co2} T:{temp} H:{humi} [{status}]')
    except:
        pass

ani = FuncAnimation(fig, update, interval=5000, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
        {
          name: '간이 보안 시스템',
          sensors: ['ULTRASONIC', 'SOUND', 'OLED', 'BUZZER'],
          desc: '거리+소리 감지로 침입 경보',
          code: `from machine import Pin, ADC, PWM, I2C, time_pulse_us
import time

# ── 초음파 센서 설정 ──
trig = Pin(16, Pin.OUT)
echo = Pin(17, Pin.IN)

# ── 소리 센서 설정 (Grove A1: GP27) ──
sound = ADC(Pin(27))

# ── 부저 설정 (GP18 — 초음파가 GP16 사용하므로 대체 핀) ──
buzzer = PWM(Pin(18))
buzzer.duty_u16(0)

# ── OLED 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

DIST_THRESHOLD = 50    # cm 이내 감지
SOUND_THRESHOLD = 40   # % 이상 감지

def read_distance():
    trig.value(0)
    time.sleep_us(5)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    duration = time_pulse_us(echo, 1, 30000)
    if duration < 0:
        return 999
    return round(duration / 58, 1)

def read_sound():
    return sound.read_u16() / 65535 * 100

def alarm_on(level):
    freq = 1000 + level * 500
    buzzer.freq(freq)
    buzzer.duty_u16(32768)

def alarm_off():
    buzzer.duty_u16(0)

# ── 메인 루프 ──
while True:
    dist = read_distance()
    noise = read_sound()

    # 침입 판단: 거리 가까움 AND 소리 감지
    dist_alert = dist < DIST_THRESHOLD
    sound_alert = noise > SOUND_THRESHOLD

    if dist_alert and sound_alert:
        status = "INTRUDER!"
        alarm_on(3)
    elif dist_alert or sound_alert:
        status = "ALERT!"
        alarm_on(1)
    else:
        status = "Safe"
        alarm_off()

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Security", 32, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 거리 표시 + 근접 인디케이터
    oled.text(f"Dist: {dist:.0f}cm", 4, 16)
    prox = min(int((DIST_THRESHOLD - min(dist, DIST_THRESHOLD)) / DIST_THRESHOLD * 5), 5)
    for i in range(5):
        x = 100 + i * 5
        if i < prox:
            oled.fill_rect(x, 16, 4, 8, 1)
        else:
            oled.rect(x, 16, 4, 8, 1)
    # 소음 레벨 바
    oled.text(f"Sound:{noise:.0f}%", 4, 28)
    noise_w = int(min(noise, 100) / 100 * 48)
    oled.rect(80, 28, 46, 8, 1)
    oled.fill_rect(81, 29, noise_w, 6, 1)
    # 상태 표시
    oled.hline(0, 40, 128, 1)
    if status == "INTRUDER!":
        oled.fill_rect(0, 42, 128, 22, 1)
        oled.text("!! INTRUDER !!", 8, 48, 0)
    elif status == "ALERT!":
        oled.fill_rect(4, 44, 8, 8, 1)
        oled.text("ALERT!", 16, 44)
        oled.text("Check area", 16, 54)
    else:
        oled.rect(4, 44, 8, 8, 1)
        oled.text("Safe", 16, 44)
        oled.text("Monitoring...", 16, 54)
    oled.show()

    print(f"D:{dist:.0f}cm N:{noise:.0f}% [{status}]")
    time.sleep(0.3)`,
          pcCode: `# PC 실시간 대시보드 — 간이 보안 시스템
# 사용법: pip install pyserial matplotlib
# 실행: python security_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import numpy as np
import time
import re

# ── 시리얼 연결 ──
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

# ── 데이터 버퍼 ──
MAX_POINTS = 200
idx_buf = deque(maxlen=MAX_POINTS)
dist_buf = deque(maxlen=MAX_POINTS)
noise_buf = deque(maxlen=MAX_POINTS)
alert_log = deque(maxlen=20)
count = 0

# ── 그래프 설정 ──
plt.style.use('dark_background')
fig = plt.figure(figsize=(14, 7))
gs = fig.add_gridspec(2, 3, hspace=0.35, wspace=0.3)
ax_radar = fig.add_subplot(gs[0, 0], polar=True)
ax_wave = fig.add_subplot(gs[0, 1:])
ax_log = fig.add_subplot(gs[1, :])
fig.suptitle('Security Monitor', fontsize=14, color='cyan')

# 거리 레이더 스타일
ax_radar.set_title('Proximity', color='lime', fontsize=10)
ax_radar.set_ylim(0, 100)
ax_radar.set_yticks([25, 50, 75, 100])
ax_radar.set_yticklabels(['25', '50', '75', '100'], fontsize=7)
theta = np.linspace(0, 2 * np.pi, 36)
radar_line, = ax_radar.plot([], [], 'lime', linewidth=2)
radar_fill = None

# 소음 파형
line_noise, = ax_wave.plot([], [], '#ff8800', linewidth=1)
line_dist, = ax_wave.plot([], [], 'lime', linewidth=1)
ax_wave.set_title('Distance & Noise', color='#ff8800', fontsize=10)
ax_wave.set_ylim(0, 110)
ax_wave.legend(['Noise %', 'Dist cm'], fontsize=8, loc='upper right')
ax_wave.grid(True, alpha=0.3)

# 알림 로그
ax_log.set_title('Alert Log', color='red', fontsize=10)
ax_log.axis('off')
log_text = ax_log.text(0.02, 0.95, 'Waiting...', transform=ax_log.transAxes,
                        fontsize=9, verticalalignment='top', color='gray',
                        family='monospace')

def update(frame):
    global count, radar_fill
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "D:45cm N:30% [Safe]"
        m = re.match(r'D:(\\d+)cm N:(\\d+)% \\[(.+)\\]', line)
        if not m:
            return
        dist = int(m.group(1))
        noise = int(m.group(2))
        status = m.group(3)
        count += 1

        idx_buf.append(count)
        dist_buf.append(min(dist, 100))
        noise_buf.append(noise)

        # 알림 로그
        if status != 'Safe':
            alert_log.append(f'[{count:04d}] {status} D:{dist}cm N:{noise}%')

        # 레이더 업데이트
        r = max(5, 100 - min(dist, 100))
        radar_data = np.full(36, r)
        radar_line.set_data(theta, radar_data)
        if radar_fill:
            radar_fill.remove()
        c = '#ff3333' if status == 'INTRUDER!' else '#ffaa00' if status == 'ALERT!' else '#00ff88'
        radar_fill = ax_radar.fill(theta, radar_data, alpha=0.3, color=c)

        # 파형 업데이트
        x = list(idx_buf)
        line_noise.set_data(x, list(noise_buf))
        line_dist.set_data(x, list(dist_buf))
        ax_wave.set_xlim(max(0, count - MAX_POINTS), count + 10)

        # 로그 업데이트
        log_str = '\\n'.join(list(alert_log)[-15:]) if alert_log else 'No alerts'
        log_text.set_text(log_str)
        log_text.set_color('#ff3333' if status != 'Safe' else 'gray')

        fig.canvas.manager.set_window_title(f'Security — D:{dist}cm N:{noise}% [{status}]')
    except:
        pass

ani = FuncAnimation(fig, update, interval=300, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
        {
          name: '종합 쾌적도 대시보드',
          sensors: ['DHT20', 'LIGHT', 'SOUND', 'OLED'],
          desc: '온습도+조도+소음 종합 쾌적도 점수',
          code: `from machine import I2C, Pin, ADC
import time

# ── 센서 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
light = ADC(Pin(26))  # Grove A0 포트
sound = ADC(Pin(27))  # Grove A1 포트
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_dht20():
    i2c.writeto(dht_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(dht_addr, 7)
    humi = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temp, 1), round(humi, 1)

def calc_comfort(temp, humi, light_pct, noise_pct):
    # 온도 점수 (20~26도가 최적)
    if 20 <= temp <= 26:
        t_score = 100
    elif 18 <= temp <= 28:
        t_score = 70
    else:
        t_score = 30

    # 습도 점수 (40~60%가 최적)
    if 40 <= humi <= 60:
        h_score = 100
    elif 30 <= humi <= 70:
        h_score = 70
    else:
        h_score = 30

    # 조도 점수 (30~70%가 최적)
    if 30 <= light_pct <= 70:
        l_score = 100
    else:
        l_score = 50

    # 소음 점수 (낮을수록 좋음)
    n_score = max(0, 100 - noise_pct)

    total = (t_score + h_score + l_score + n_score) // 4
    return total

# ── CSV 파일 준비 ──
f = open("comfort_log.csv", "a")
f.write("time_s,temp,humi,light,noise,score\\n")
start = time.ticks_ms()

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    light_pct = light.read_u16() / 65535 * 100
    noise_pct = sound.read_u16() / 65535 * 100
    score = calc_comfort(temp, humi, light_pct, noise_pct)
    elapsed = time.ticks_diff(time.ticks_ms(), start) // 1000

    # 개별 점수 계산 (대시보드용)
    t_sc = 100 if 20 <= temp <= 26 else (70 if 18 <= temp <= 28 else 30)
    h_sc = 100 if 40 <= humi <= 60 else (70 if 30 <= humi <= 70 else 30)
    l_sc = 100 if 30 <= light_pct <= 70 else 50
    n_sc = max(0, int(100 - noise_pct))

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Comfort", 36, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 4개 미니 바 (T/H/L/N 나란히)
    labels = ['T', 'H', 'L', 'N']
    scores = [t_sc, h_sc, l_sc, n_sc]
    for i in range(4):
        x = 4 + i * 32
        oled.text(labels[i], x + 4, 16)
        bar_h = int(scores[i] / 100 * 18)
        oled.rect(x, 25, 12, 20, 1)
        oled.fill_rect(x + 1, 44 - bar_h, 10, bar_h, 1)
    # 종합 점수
    oled.hline(0, 47, 128, 1)
    oled.text(f"Score:{score}/100", 4, 50)
    # 점수 프로그레스 바 (테두리)
    oled.rect(4, 58, 120, 6, 1)
    oled.fill_rect(5, 59, min(score, 100) * 118 // 100, 4, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{temp},{humi},{light_pct:.0f},{noise_pct:.0f},{score}\\n")
    f.flush()

    print(f"T:{temp} H:{humi} L:{light_pct:.0f} N:{noise_pct:.0f} => {score}점")
    time.sleep(2)`,
          pcCode: `# PC 실시간 대시보드 — 종합 쾌적도 대시보드
# 사용법: pip install pyserial matplotlib
# 실행: python comfort_pc.py

import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import numpy as np
import time
import re

# ── 시리얼 연결 ──
PORT = '/dev/tty.usbmodem1101'
BAUD = 115200

ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

# ── 데이터 버퍼 ──
MAX_POINTS = 100
idx_buf = deque(maxlen=MAX_POINTS)
score_buf = deque(maxlen=MAX_POINTS)
count = 0

# 현재 개별 점수 저장
current_scores = {'T': 0, 'H': 0, 'L': 0, 'N': 0}

# ── 그래프 설정 ──
plt.style.use('dark_background')
fig = plt.figure(figsize=(14, 7))
gs = fig.add_gridspec(2, 4, hspace=0.35, wspace=0.4)

# 4개 게이지 (상단)
ax_gauges = []
gauge_colors = ['#ff4444', '#44aaff', '#ffcc00', '#44ff88']
gauge_labels = ['Temp', 'Humi', 'Light', 'Noise']
gauge_keys = ['T', 'H', 'L', 'N']
gauge_bars = []

for i in range(4):
    ax = fig.add_subplot(gs[0, i])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 100)
    ax.set_title(gauge_labels[i], color=gauge_colors[i], fontsize=10)
    bar = ax.bar(0.5, 0, width=0.6, color=gauge_colors[i], alpha=0.8)
    ax.set_xticks([])
    ax.axhline(y=70, color='white', linestyle=':', alpha=0.3)
    ax.axhline(y=30, color='white', linestyle=':', alpha=0.3)
    ax.grid(True, axis='y', alpha=0.2)
    ax_gauges.append(ax)
    gauge_bars.append(bar)

# 점수 트렌드 (하단 전체)
ax_trend = fig.add_subplot(gs[1, :])
line_score, = ax_trend.plot([], [], 'cyan', linewidth=2, marker='o', markersize=3)
ax_trend.set_title('Comfort Score Trend', color='cyan', fontsize=10)
ax_trend.set_ylim(0, 100)
ax_trend.set_xlabel('Sample')
ax_trend.set_ylabel('Score')
ax_trend.axhspan(80, 100, alpha=0.1, color='green', label='Excellent')
ax_trend.axhspan(50, 80, alpha=0.1, color='yellow', label='Normal')
ax_trend.axhspan(0, 50, alpha=0.1, color='red', label='Poor')
ax_trend.legend(fontsize=8, loc='upper left')
ax_trend.grid(True, alpha=0.3)
score_text = ax_trend.text(0.98, 0.95, '', transform=ax_trend.transAxes,
                            ha='right', va='top', fontsize=16, color='cyan')

fig.suptitle('Comfort Dashboard', fontsize=14, color='cyan')

def calc_sub_scores(temp, humi, light, noise):
    t = 100 if 20 <= temp <= 26 else (70 if 18 <= temp <= 28 else 30)
    h = 100 if 40 <= humi <= 60 else (70 if 30 <= humi <= 70 else 30)
    l = 100 if 30 <= light <= 70 else 50
    n = max(0, 100 - noise)
    return {'T': t, 'H': h, 'L': l, 'N': int(n)}

def update(frame):
    global count
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line:
            return
        # 파싱: "T:24.5 H:55.2 L:45 N:20 => 82점"
        m = re.match(r'T:([\\d.]+) H:([\\d.]+) L:(\\d+) N:(\\d+) => (\\d+)', line)
        if not m:
            return
        temp = float(m.group(1))
        humi = float(m.group(2))
        light = float(m.group(3))
        noise = float(m.group(4))
        score = int(m.group(5))
        count += 1

        idx_buf.append(count)
        score_buf.append(score)

        subs = calc_sub_scores(temp, humi, light, noise)

        # 게이지 업데이트
        for i, key in enumerate(gauge_keys):
            for rect in gauge_bars[i]:
                rect.set_height(subs[key])

        # 트렌드 업데이트
        x = list(idx_buf)
        line_score.set_data(x, list(score_buf))
        ax_trend.set_xlim(max(0, count - MAX_POINTS), count + 5)
        score_text.set_text(f'{score}/100')

        fig.canvas.manager.set_window_title(f'Comfort — T:{temp} H:{humi} L:{light:.0f} N:{noise:.0f} => {score}')
    except:
        pass

ani = FuncAnimation(fig, update, interval=2000, cache_frame_data=False)
plt.tight_layout()
plt.show()
`,
        },
      ],
      requirements: [
        '센서 2개 이상 동시 데이터 수집',
        'OLED에 통합 대시보드 표시',
        '복합 조건문(and/or)으로 지능형 판단',
        'AI 코드 생성 활용 (프롬프트 기록 필수)',
        '프로젝트 한 줄 설명 작성',
      ],
      evaluation: {
        essential: ['복합 센서 동시 읽기', 'OLED 통합 표시'],
        good: ['스마트 판단 로직', 'AI(바이브 코딩) 활용'],
        excellent: ['CSV 자동 저장', '독창적 센서 조합'],
      },
      timeline: [
        { time: '0:00~0:20', task: '프로젝트 선택 + 센서 연결', picoMakers: '센서 2개+ 추가 → 핀 충돌 확인' },
        { time: '0:20~0:50', task: 'AI로 기본 코드 생성', picoMakers: '통합 코드 복사 → AI에게 수정 요청' },
        { time: '0:50~1:30', task: '코드 수정 + 디버깅', picoMakers: '에러 진단 → AI 수정 안내' },
        { time: '1:30~2:00', task: '복합 조건 로직 추가', picoMakers: 'AI에게 "and/or 조건 판단" 요청' },
        { time: '2:00~2:20', task: 'OLED 레이아웃 개선', picoMakers: 'AI에게 "대시보드 디자인 개선" 요청' },
        { time: '2:20~3:00', task: '테스트 + 산출물 정리', picoMakers: '프롬프트 기록 정리' },
      ],
      suggestedQuestions: [
        '센서 2개를 조합하는 아이디어를 추천해주세요',
        '자동 판정 로직을 어떻게 만들까요?',
        '핀 충돌이 안 나게 배선하는 방법은?',
        '바이브 코딩 프롬프트를 잘 쓰는 법은?',
      ],
    },
    lv3: {
      id: 'course-b-lv3', title: '연구자', level: 3,
      sensors: '2+', hours: 3, focus: '가설+장기데이터+AI분석',
      difficulty: 4,
      aiRole: 'reviewer', codeStyle: 'feedback',
      prerequisite: 'Course A 1~13차시',
      textbookUrl: '/course-b/lv3/',
      dataStorage: {
        method: 'wifi-server',
        title: 'WiFi 실시간 통신',
        desc: 'WiFi로 PC/노트북 서버에 실시간 전송 — USB 케이블 없이 무선 모니터링',
        icon: '📡',
        setupGuide: '## WiFi 실시간 서버 설정\n\n### 1단계: Python 설치 확인\n1. PC에 Python이 설치되어 있는지 확인\n   - 터미널(또는 명령 프롬프트)에서: python --version\n   - 설치 안 됐으면: python.org에서 다운로드 (3.8 이상)\n   - Windows: 설치 시 "Add to PATH" 체크 필수!\n\n### 2단계: 라이브러리 설치\n1. 터미널(또는 명령 프롬프트)을 열고:\n   pip install flask flask-cors\n2. 설치 확인: pip list | grep flask\n\n### 3단계: 서버 실행\n1. 아래 서버 코드를 server.py 파일로 저장\n2. 터미널에서 저장한 폴더로 이동\n3. python server.py 실행\n4. "Running on http://0.0.0.0:5000" 메시지가 나오면 성공!\n\n### 4단계: PC의 IP 주소 확인\n- Windows: 명령 프롬프트 → ipconfig → "IPv4 주소" 확인 (예: 192.168.0.100)\n- Mac: 시스템 설정 → Wi-Fi → 세부사항 → IP 주소 확인\n- Linux: 터미널 → ip addr 또는 ifconfig\n\n### 5단계: Pico 코드에 IP 입력\n1. Pico 코드의 SERVER = "http://여기에_PC_IP:5000"\n2. 예: SERVER = "http://192.168.0.100:5000"\n3. Pico와 PC가 **같은 WiFi 네트워크**에 연결되어야 합니다!\n\n⚠️ 방화벽이 5000번 포트를 차단할 수 있습니다.\n   → Windows: 방화벽 설정에서 Python 허용\n   → Mac: 보안 팝업에서 "허용" 클릭',
        serverCode: `# server.py — PC 실시간 데이터 수신 서버
# pip install flask flask-cors

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from collections import deque
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# 데이터 저장 (최근 1000개)
data_store = deque(maxlen=1000)

@app.route('/api/data', methods=['POST'])
def receive_data():
    """Pico에서 보낸 데이터 수신"""
    data = request.json
    data['timestamp'] = datetime.now().isoformat()
    data_store.append(data)
    print(f"수신: {data}")
    return jsonify({"status": "ok", "count": len(data_store)})

@app.route('/api/data', methods=['GET'])
def get_data():
    """브라우저에서 데이터 조회"""
    limit = request.args.get('limit', 100, type=int)
    return jsonify(list(data_store)[-limit:])

@app.route('/')
def dashboard():
    """간단한 웹 대시보드"""
    return render_template_string("""
<!DOCTYPE html>
<html><head>
<title>IoT Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
  body { background: #0f172a; color: #e2e8f0; font-family: sans-serif; padding: 20px; }
  .card { background: #1e293b; border-radius: 12px; padding: 16px; margin: 8px; }
  h1 { color: #22d3ee; }
</style>
</head><body>
<h1>IoT 실시간 대시보드</h1>
<div class="card"><canvas id="chart"></canvas></div>
<div class="card" id="latest">데이터 수신 대기 중...</div>
<script>
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: {
    animation: false,
    scales: { x: { display: false } },
    plugins: { legend: { labels: { color: '#e2e8f0' } } }
  }
});

setInterval(async () => {
  const res = await fetch('/api/data?limit=60');
  const data = await res.json();
  if (data.length === 0) return;

  const keys = Object.keys(data[0]).filter(k => k !== 'timestamp');
  const colors = ['#22d3ee', '#fb923c', '#4ade80', '#a78bfa', '#f87171'];

  chart.data.labels = data.map((_, i) => i);
  chart.data.datasets = keys.map((key, i) => ({
    label: key,
    data: data.map(d => d[key]),
    borderColor: colors[i % colors.length],
    tension: 0.3,
    pointRadius: 0,
  }));
  chart.update();

  const latest = data[data.length - 1];
  document.getElementById('latest').innerHTML =
    keys.map(k => k + ': <b>' + latest[k] + '</b>').join(' | ');
}, 2000);
</script>
</body></html>""")

if __name__ == '__main__':
    import socket
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    print(f"\\n서버 시작: http://{ip}:5000")
    print(f"대시보드: http://{ip}:5000")
    print("Pico 코드의 SERVER 변수를 위 IP로 설정하세요\\n")
    app.run(host='0.0.0.0', port=5000, debug=True)`,
        picoTemplate: `# ── WiFi 연결 ──
import network
import urequests
import json

SSID = "학교WiFi"
PASSWORD = "비밀번호"
SERVER = "http://192.168.0.100:5000"  # PC의 IP 주소
import time

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

print("WiFi 연결 중...")
# WiFi 연결 (최대 20초)
timeout = 40
while not wlan.isconnected() and timeout > 0:
    time.sleep(0.5)
    timeout -= 1

if not wlan.isconnected():
    print("WiFi 연결 실패! SSID/비밀번호를 확인하세요")
    # 오프라인 모드로 전환
else:
    print("WiFi 연결 완료:", wlan.ifconfig()[0])

send_count = 0

def send_data(data_dict):
    """PC 서버에 데이터 전송"""
    global send_count
    try:
        r = urequests.post(f"{SERVER}/api/data",
            json=data_dict,
            headers={"Content-Type": "application/json"})
        send_count += 1
        print(f"전송 #{send_count} OK")
        r.close()
    except Exception as e:
        print(f"전송 실패: {e}")

# 메인 루프에서 사용 예시:
# send_data({"temp": temp, "humi": humi, "light": light_pct})`,
      },
      examples: [
        {
          name: '식물 성장 환경 분석',
          sensors: ['DHT20', 'LIGHT', 'OLED'],
          desc: '온도+광량이 식물 성장에 미치는 영향',
          code: `from machine import I2C, Pin, ADC
import time

# ── 연구 설정 ──
RESEARCH_TITLE = "온도와 광량이 식물에 미치는 영향"
MEASURE_INTERVAL = 60  # 60초마다 측정
LOG_FILE = "plant_research.csv"

# ── 센서 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
light = ADC(Pin(26))  # Grove A0 포트
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_dht20():
    i2c.writeto(dht_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(dht_addr, 7)
    humi = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temp, 1), round(humi, 1)

# ── CSV 파일 준비 ──
f = open(LOG_FILE, "a")
f.write("측정번호,경과시간(분),온도(C),습도(%),광량(%)\\n")
count = 0
start = time.ticks_ms()
temp_hist = []  # 온도 트렌드 (최대 40개)

# ── 장기 데이터 수집 루프 ──
while True:
    temp, humi = read_dht20()
    light_pct = round(light.read_u16() / 65535 * 100, 1)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # 이력 저장
    temp_hist.append(int(temp))
    if len(temp_hist) > 40:
        temp_hist.pop(0)

    # OLED 연구 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Plant Lab", 28, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 측정 정보
    oled.text(f"#{count}", 4, 16)
    oled.text(f"{elapsed_min}min", 80, 16)
    # 센서 값
    oled.text(f"T:{temp}C", 4, 28)
    oled.text(f"L:{light_pct:.0f}%", 72, 28)
    # 온도 트렌드 그래프
    oled.hline(0, 40, 128, 1)
    oled.text("Trend", 0, 42)
    if len(temp_hist) > 1:
        t_min = min(temp_hist)
        t_max = max(temp_hist)
        t_range = max(t_max - t_min, 1)
        for i in range(len(temp_hist)):
            h = int((temp_hist[i] - t_min) / t_range * 16)
            x = 44 + i * 2
            oled.vline(x, 62 - h, max(h, 1), 1)
    oled.show()

    # CSV 저장
    f.write(f"{count},{elapsed_min},{temp},{humi},{light_pct}\\n")
    f.flush()

    print(f"#{count} | {elapsed_min}분 | T:{temp} H:{humi} L:{light_pct}%")
    time.sleep(MEASURE_INTERVAL)`,
          pcCode: `# PC 실시간 대시보드 — 식물 성장 환경 분석
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.widgets import Button
from collections import deque
import time, csv

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 200
times = deque(maxlen=MAX_POINTS)
temps = deque(maxlen=MAX_POINTS)
humis = deque(maxlen=MAX_POINTS)
lights = deque(maxlen=MAX_POINTS)

plt.style.use('dark_background')
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 7))
fig.suptitle('Plant Growth Environment', fontsize=14, color='cyan')

# CSV 내보내기 버튼
csv_file = 'plant_pc_log.csv'
def export_csv(event):
    with open(csv_file, 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['time_min', 'temp', 'humi', 'light_pct'])
        for i in range(len(times)):
            w.writerow([f'{times[i]:.1f}', f'{temps[i]:.1f}',
                        f'{humis[i]:.1f}', f'{lights[i]:.1f}'])
    print(f'Saved {len(times)} rows to {csv_file}')
ax_btn = plt.axes([0.81, 0.01, 0.15, 0.04])
btn = Button(ax_btn, 'Export CSV', color='#333', hovercolor='#555')
btn.on_clicked(export_csv)

def update(frame):
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line or not line.startswith('#'): return
        # 파싱: #1 | 0분 | T:24.5 H:55.2 L:72.3%
        parts = line.split('|')
        elapsed = float(parts[1].strip().replace('분', ''))
        vals = parts[2].strip().split()
        t = float(vals[0].split(':')[1])
        h = float(vals[1].split(':')[1])
        l = float(vals[2].split(':')[1].replace('%', ''))
        times.append(elapsed)
        temps.append(t)
        humis.append(h)
        lights.append(l)

        ax1.clear()
        ax1.set_title('Temperature & Humidity')
        ax1.set_ylabel('Temperature (C)', color='#ff6b6b')
        ax1.plot(list(times), list(temps), color='#ff6b6b', linewidth=2, label='Temp')
        ax1.tick_params(axis='y', labelcolor='#ff6b6b')
        ax1r = ax1.twinx()
        ax1r.set_ylabel('Humidity (%)', color='#4ecdc4')
        ax1r.plot(list(times), list(humis), color='#4ecdc4', linewidth=2, label='Humi')
        ax1r.tick_params(axis='y', labelcolor='#4ecdc4')
        ax1.set_xlabel('Time (min)')

        ax2.clear()
        ax2.set_title('Light Level')
        ax2.fill_between(list(times), list(lights), alpha=0.3, color='#ffe66d')
        ax2.plot(list(times), list(lights), color='#ffe66d', linewidth=2)
        ax2.set_ylabel('Light (%)')
        ax2.set_xlabel('Time (min)')
        ax2.set_ylim(0, 100)
    except: pass

ani = FuncAnimation(fig, update, interval=1000, cache_frame_data=False)
plt.tight_layout(rect=[0, 0.05, 1, 0.95])
plt.show()`,
        },
        {
          name: 'CO2 농도와 수업 집중도',
          sensors: ['SCD30', 'OLED'],
          desc: '수업 전후 CO2 변화 분석',
          code: `from machine import I2C, Pin
import time, struct

# ── 연구 설정 ──
MEASURE_INTERVAL = 30  # 30초마다 측정
LOG_FILE = "co2_research.csv"

# ── I2C 설정 (SCD30 + OLED) ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
scd_addr = 0x61
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def crc8(data):
    crc = 0xFF
    for b in data:
        crc ^= b
        for _ in range(8):
            if crc & 0x80:
                crc = (crc << 1) ^ 0x31
            else:
                crc <<= 1
            crc &= 0xFF
    return crc

def read_scd30():
    i2c.writeto(scd_addr, bytes([0x02, 0x02]))
    time.sleep(0.01)
    ready = i2c.readfrom(scd_addr, 3)
    if ready[1] != 1:
        return None
    i2c.writeto(scd_addr, bytes([0x03, 0x00]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 18)
    co2 = struct.unpack('>f', bytes([data[0], data[1], data[3], data[4]]))[0]
    temp = struct.unpack('>f', bytes([data[6], data[7], data[9], data[10]]))[0]
    return round(co2), round(temp, 1)

# SCD30 연속 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x00, 0x10, 0x00, 0x00, crc8(bytes([0x00, 0x00]))]))
print("SCD30 준비 중... 2초 대기")
time.sleep(2)

def co2_status(co2):
    if co2 < 600:
        return "Great"
    elif co2 < 1000:
        return "Good"
    elif co2 < 1500:
        return "Fair"
    else:
        return "Vent!"

# ── CSV 파일 준비 ──
f = open(LOG_FILE, "a")
f.write("측정번호,경과시간(분),CO2(ppm),온도(C),상태\\n")
count = 0
start = time.ticks_ms()
co2_hist = []  # CO2 트렌드 (최대 40개)

# ── 장기 데이터 수집 루프 ──
while True:
    result = read_scd30()
    if result is None:
        time.sleep(2)
        continue
    co2, temp = result
    status = co2_status(co2)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # 이력 저장
    co2_hist.append(co2)
    if len(co2_hist) > 40:
        co2_hist.pop(0)

    # OLED 연구 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("CO2 Lab", 36, 2, 0)
    oled.hline(0, 13, 128, 1)
    # CO2 값 크게 표시
    oled.text(f"{co2}ppm", 4, 16)
    oled.text(f"T:{temp}C", 72, 16)
    # 상태 표시 (zone)
    zone = "+" if co2 < 600 else ("++" if co2 < 1000 else ("+++" if co2 < 1500 else "!!!!"))
    oled.text(f"[{status}] {zone}", 4, 28)
    # CO2 트렌드 그래프
    oled.hline(0, 40, 128, 1)
    oled.text("Trend", 0, 42)
    if len(co2_hist) > 1:
        c_min = min(co2_hist)
        c_max = max(co2_hist)
        c_range = max(c_max - c_min, 1)
        for i in range(len(co2_hist)):
            h = int((co2_hist[i] - c_min) / c_range * 16)
            x = 44 + i * 2
            oled.vline(x, 62 - h, max(h, 1), 1)
    oled.show()

    # CSV 저장
    f.write(f"{count},{elapsed_min},{co2},{temp},{status}\\n")
    f.flush()

    print(f"#{count} | {elapsed_min}분 | CO2:{co2}ppm T:{temp}C [{status}]")
    time.sleep(MEASURE_INTERVAL)`,
          pcCode: `# PC 실시간 대시보드 — CO2 농도와 수업 집중도
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 300
times = deque(maxlen=MAX_POINTS)
co2s = deque(maxlen=MAX_POINTS)
temps_data = deque(maxlen=MAX_POINTS)

plt.style.use('dark_background')
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7), gridspec_kw={'height_ratios': [3, 1]})
fig.suptitle('CO2 Concentration Monitor', fontsize=14, color='cyan')

def update(frame):
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line or not line.startswith('#'): return
        # 파싱: #1 | 0분 | CO2:800ppm T:24.5C [Good]
        parts = line.split('|')
        elapsed = float(parts[1].strip().replace('분', ''))
        vals = parts[2].strip()
        co2 = int(vals.split('CO2:')[1].split('ppm')[0])
        t = float(vals.split('T:')[1].split('C')[0])
        times.append(elapsed)
        co2s.append(co2)
        temps_data.append(t)

        ax1.clear()
        ax1.set_title('CO2 Concentration (ppm)', fontsize=11)
        t_list = list(times)
        c_list = list(co2s)
        # 존 배경색
        ax1.axhspan(0, 600, alpha=0.15, color='green', label='Good (<600)')
        ax1.axhspan(600, 1000, alpha=0.15, color='yellow', label='Fair (600-1000)')
        ax1.axhspan(1000, 1500, alpha=0.15, color='orange', label='Poor (1000-1500)')
        ax1.axhspan(1500, 3000, alpha=0.12, color='red', label='Vent! (>1500)')
        ax1.plot(t_list, c_list, color='white', linewidth=2)
        ax1.fill_between(t_list, c_list, alpha=0.2, color='cyan')
        ax1.set_ylabel('CO2 (ppm)')
        ax1.set_ylim(300, max(1600, max(c_list) + 100) if c_list else 1600)
        ax1.legend(fontsize=8, loc='upper left')
        ax1.grid(True, alpha=0.3)
        # 현재 값 표시
        if c_list:
            ax1.text(0.98, 0.95, f'{c_list[-1]} ppm', transform=ax1.transAxes,
                     ha='right', va='top', fontsize=18, color='cyan',
                     fontweight='bold')

        ax2.clear()
        ax2.set_title('Temperature', fontsize=10)
        ax2.plot(t_list, list(temps_data), color='#ff6b6b', linewidth=1.5)
        ax2.set_ylabel('Temp (C)')
        ax2.set_xlabel('Time (min)')
        ax2.grid(True, alpha=0.3)
    except: pass

ani = FuncAnimation(fig, update, interval=1000, cache_frame_data=False)
plt.tight_layout()
plt.show()`,
        },
        {
          name: '운동 강도와 가속도 패턴',
          sensors: ['MPU6050', 'OLED'],
          desc: '가속도 데이터로 운동 패턴 분류',
          code: `from machine import I2C, Pin
import time
import math

# ── I2C 설정 (MPU6050 + OLED) ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
mpu_addr = 0x68
time.sleep(0.1)

# MPU6050 초기화
i2c.writeto_mem(mpu_addr, 0x6B, bytes([0x00]))  # 슬립 해제
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_accel():
    data = i2c.readfrom_mem(mpu_addr, 0x3B, 6)
    ax = (data[0] << 8 | data[1]) - (65536 if data[0] > 127 else 0)
    ay = (data[2] << 8 | data[3]) - (65536 if data[2] > 127 else 0)
    az = (data[4] << 8 | data[5]) - (65536 if data[4] > 127 else 0)
    # g 단위로 변환
    return ax / 16384, ay / 16384, az / 16384

def classify_motion(magnitude):
    if magnitude < 1.2:
        return "Idle"
    elif magnitude < 2.0:
        return "Walk"
    elif magnitude < 4.0:
        return "Run"
    else:
        return "Jump"

# ── CSV 파일 준비 ──
f = open("motion_log.csv", "a")
f.write("time_ms,ax,ay,az,magnitude,motion\\n")
start = time.ticks_ms()
mag_hist = []  # 가속도 크기 파형 (최대 60개)

# ── 메인 루프 ──
while True:
    ax, ay, az = read_accel()
    mag = math.sqrt(ax*ax + ay*ay + az*az)
    motion = classify_motion(mag)
    elapsed = time.ticks_diff(time.ticks_ms(), start)

    # 이력 저장
    mag_hist.append(mag)
    if len(mag_hist) > 60:
        mag_hist.pop(0)

    # OLED 대시보드
    oled.fill(0)
    # 헤더 바
    oled.fill_rect(0, 0, 128, 12, 1)
    oled.text("Motion Lab", 24, 2, 0)
    oled.hline(0, 13, 128, 1)
    # 3축 값 컴팩트
    oled.text(f"X:{ax:.1f}", 0, 16)
    oled.text(f"Y:{ay:.1f}", 42, 16)
    oled.text(f"Z:{az:.1f}", 84, 16)
    # 크기 + 분류
    oled.text(f"G:{mag:.2f}", 4, 28)
    oled.text(f"[{motion}]", 72, 28)
    # 실시간 파형 (60포인트, y=40~62)
    oled.hline(0, 39, 128, 1)
    if len(mag_hist) > 1:
        m_max = max(max(mag_hist), 2.0)
        for i in range(len(mag_hist)):
            h = int(min(mag_hist[i] / m_max, 1.0) * 22)
            x = 4 + i * 2
            oled.vline(x, 62 - h, max(h, 1), 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{ax:.2f},{ay:.2f},{az:.2f},{mag:.2f},{motion}\\n")
    f.flush()

    print(f"G:{mag:.2f} [{motion}]")
    time.sleep(0.2)`,
          pcCode: `# PC 실시간 대시보드 — 운동 강도와 가속도 패턴
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 200
mag_buf = deque(maxlen=MAX_POINTS)
idx_buf = deque(maxlen=MAX_POINTS)
count = 0
current_label = 'Idle'

plt.style.use('dark_background')
fig, (ax_xyz, ax_mag) = plt.subplots(2, 1, figsize=(12, 7))
fig.suptitle('Motion Accelerometer Dashboard', fontsize=14, color='cyan')

# 분류 결과 텍스트
label_text = fig.text(0.98, 0.02, 'Idle', fontsize=20, color='lime',
                       ha='right', va='bottom', fontweight='bold')

def update(frame):
    global count, current_label
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line: return
        # 파싱: G:1.23 [Walk]
        if not line.startswith('G:'): return
        parts = line.split()
        g_val = float(parts[0].split(':')[1])
        label = parts[1].strip('[]')
        current_label = label
        count += 1
        idx_buf.append(count)
        mag_buf.append(g_val)

        ax_mag.clear()
        ax_mag.set_title('Magnitude (G)', fontsize=11)
        x = list(idx_buf)
        m = list(mag_buf)
        ax_mag.plot(x, m, color='cyan', linewidth=1.5)
        ax_mag.fill_between(x, m, alpha=0.2, color='cyan')
        ax_mag.axhline(y=1.2, color='green', linestyle=':', alpha=0.5, label='Walk')
        ax_mag.axhline(y=2.0, color='yellow', linestyle=':', alpha=0.5, label='Run')
        ax_mag.axhline(y=4.0, color='red', linestyle=':', alpha=0.5, label='Jump')
        ax_mag.set_ylabel('G-force')
        ax_mag.set_xlabel('Sample')
        ax_mag.legend(fontsize=8, loc='upper left')
        ax_mag.grid(True, alpha=0.3)
        ax_mag.set_ylim(0, max(5, max(m) + 0.5) if m else 5)

        # 분류 결과 색상
        colors = {'Idle': '#888888', 'Walk': '#44ff44', 'Run': '#ffcc00', 'Jump': '#ff4444'}
        label_text.set_text(current_label)
        label_text.set_color(colors.get(current_label, 'white'))

        # 최근 분류 히스토그램
        recent = list(mag_buf)[-50:]
        ax_xyz.clear()
        ax_xyz.set_title('Recent Motion Classification (last 50)', fontsize=11)
        classes = {'Idle': 0, 'Walk': 0, 'Run': 0, 'Jump': 0}
        for v in recent:
            if v < 1.2: classes['Idle'] += 1
            elif v < 2.0: classes['Walk'] += 1
            elif v < 4.0: classes['Run'] += 1
            else: classes['Jump'] += 1
        bars = ax_xyz.bar(classes.keys(), classes.values(),
                          color=['#888888', '#44ff44', '#ffcc00', '#ff4444'])
        ax_xyz.set_ylabel('Count')
        ax_xyz.grid(True, axis='y', alpha=0.3)
    except: pass

ani = FuncAnimation(fig, update, interval=50, cache_frame_data=False)
plt.tight_layout()
plt.show()`,
        },
      ],
      requirements: [
        '측정 가능한 연구 질문과 가설 설정',
        '30분 이상 자동 데이터 수집 (CSV)',
        'OLED 또는 PC 실시간 대시보드',
        'matplotlib 데이터 시각화',
        '가설 검증 보고서 작성',
      ],
      evaluation: {
        essential: ['연구 설계 품질', '데이터 완성도'],
        good: ['대시보드 기능성', '분석 정확도'],
        excellent: ['논리적 결론', '학문적 성찰'],
      },
      timeline: [
        { time: '0:00~0:30', task: '연구 계획서 작성', picoMakers: 'AI에게 가설 설정 상담' },
        { time: '0:30~1:30', task: '센서 연결 + 데이터 수집', picoMakers: '배선 확인 → 통합 코드 → AI 수정' },
        { time: '1:30~2:30', task: '그래프 분석 + 통계', picoMakers: 'AI에게 "CSV 분석 코드" 요청' },
        { time: '2:30~3:00', task: '결론 작성 + 한계점 검토', picoMakers: 'AI에게 "보고서 검토" 요청' },
      ],
      suggestedQuestions: [
        '연구 가설을 세우는 방법을 도와주세요',
        '장기 데이터 수집 시 주의할 점은?',
        '수집한 데이터를 AI로 분석하고 싶어요',
        'matplotlib으로 그래프를 그리는 방법은?',
      ],
    },
    lv4: {
      id: 'course-b-lv4', title: '마스터', level: 4,
      sensors: '3+', hours: '3+', focus: '다중센서+ML+시스템설계',
      difficulty: 5,
      aiRole: 'reviewer', codeStyle: 'feedback',
      prerequisite: 'Course A 전체 + Course B Lv.1~3',
      textbookUrl: '/course-b/lv4/',
      dataStorage: {
        method: 'supabase',
        title: 'Supabase 클라우드',
        desc: '클라우드 DB에 실시간 저장 — 전시 대시보드와 연동',
        icon: '☁️',
        setupGuide: '## Supabase 클라우드 설정\n\n### 1단계: Supabase 가입\n1. supabase.com 접속\n2. "Start your project" 클릭\n3. GitHub 계정 또는 이메일로 가입 (무료)\n\n### 2단계: 새 프로젝트 생성\n1. 대시보드에서 "New Project" 클릭\n2. 프로젝트 이름: "sensor-dashboard" (원하는 이름)\n3. Database Password: 안전한 비밀번호 설정 (메모해두세요!)\n4. Region: **Northeast Asia (Tokyo)** 선택 (한국에서 가장 빠름)\n5. "Create new project" 클릭 → 2~3분 대기\n\n### 3단계: 테이블 생성\n1. 좌측 메뉴 "SQL Editor" 클릭\n2. "New query" 클릭\n3. 아래 SQL을 붙여넣고 "Run" 클릭:\n\nCREATE TABLE sensor_data (\n  id BIGSERIAL PRIMARY KEY,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  device_id TEXT DEFAULT \'pico-01\',\n  temp REAL,\n  humi REAL,\n  co2 INTEGER,\n  light REAL,\n  sound REAL,\n  dust REAL,\n  extra JSONB\n);\n\nALTER TABLE sensor_data REPLICA IDENTITY FULL;\n\n### 4단계: API 키 복사\n1. 좌측 메뉴 맨 아래 "Project Settings" (톱니바퀴) 클릭\n2. "API" 메뉴 클릭\n3. **Project URL** 복사 → Pico 코드의 SUPABASE_URL에 붙여넣기\n4. **anon public** 키 복사 → Pico 코드의 SUPABASE_KEY에 붙여넣기\n   (⚠️ service_role 키는 절대 사용하지 마세요!)\n\n### 5단계: 보안 정책 (RLS) 설정\n1. SQL Editor에서 새 쿼리 실행:\n\nALTER TABLE sensor_data ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY "Pico에서 데이터 삽입 허용"\n  ON sensor_data FOR INSERT\n  TO anon WITH CHECK (true);\n\nCREATE POLICY "누구나 데이터 읽기 허용"\n  ON sensor_data FOR SELECT\n  TO anon USING (true);\n\n### 6단계: Pico 코드에 붙여넣기\n1. SUPABASE_URL = "https://여기에프로젝트ID.supabase.co"\n2. SUPABASE_KEY = "여기에_anon_key"\n3. 두 값 모두 따옴표 안에 정확히 붙여넣기\n\n💡 anon key는 공개용 키입니다. 비밀번호가 아니므로 코드에 포함해도 됩니다.\n💡 데이터 확인: 좌측 "Table Editor" → sensor_data 테이블 클릭',
        picoTemplate: `# ── WiFi + Supabase 연결 ──
import network
import urequests
import json

SSID = "학교WiFi"
PASSWORD = "비밀번호"

# Supabase 설정
SUPABASE_URL = "https://여기에프로젝트ID.supabase.co"
SUPABASE_KEY = "여기에_anon_key"
import time

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

print("WiFi 연결 중...")
# WiFi 연결 (최대 20초)
timeout = 40
while not wlan.isconnected() and timeout > 0:
    time.sleep(0.5)
    timeout -= 1

if not wlan.isconnected():
    print("WiFi 연결 실패! SSID/비밀번호를 확인하세요")
    # 오프라인 모드로 전환
else:
    print("WiFi 연결 완료:", wlan.ifconfig()[0])

def send_to_supabase(data_dict, table="sensor_data"):
    """Supabase에 데이터 전송"""
    try:
        r = urequests.post(
            f"{SUPABASE_URL}/rest/v1/{table}",
            json=data_dict,
            headers={
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Prefer": "return=minimal"
            })
        print(f"Supabase 전송 OK ({r.status_code})")
        r.close()
    except Exception as e:
        print(f"전송 실패: {e}")

# 메인 루프에서 사용 예시:
# send_to_supabase({"temp": temp, "humi": humi, "co2": co2, "device_id": "pico-01"})`,
        dashboardCode: `<!-- Supabase 실시간 대시보드 (HTML 파일로 저장) -->
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>IoT Cloud Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
  * { margin: 0; box-sizing: border-box; }
  body { background: #0f172a; color: #e2e8f0; font-family: 'Segoe UI', sans-serif; }
  .header { padding: 16px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #1e293b; }
  .header h1 { font-size: 18px; color: #22d3ee; }
  .status { padding: 4px 12px; border-radius: 20px; font-size: 12px; }
  .status.on { background: #065f4620; color: #4ade80; border: 1px solid #4ade8040; }
  .status.off { background: #7f1d1d20; color: #f87171; border: 1px solid #f8717140; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 16px 24px; }
  .card { background: #1e293b; border-radius: 16px; padding: 20px; border: 1px solid #334155; }
  .card .label { font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
  .card .value { font-size: 36px; font-weight: bold; font-family: monospace; }
  .card .unit { font-size: 14px; color: #64748b; margin-left: 4px; }
  .chart-container { padding: 16px 24px; }
  .chart-card { background: #1e293b; border-radius: 16px; padding: 20px; border: 1px solid #334155; }
</style>
</head>
<body>
<div class="header">
  <h1>☁️ IoT Cloud Dashboard</h1>
  <span class="status off" id="status">연결 중...</span>
  <span style="margin-left:auto;font-size:13px;color:#64748b" id="count">0 데이터</span>
</div>
<div class="grid" id="cards"></div>
<div class="chart-container">
  <div class="chart-card"><canvas id="chart" height="300"></canvas></div>
</div>

<script>
const SUPABASE_URL = '여기에_URL';
const SUPABASE_KEY = '여기에_anon_key';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const colors = { temp:'#f87171', humi:'#22d3ee', co2:'#fb923c', light:'#facc15', sound:'#a78bfa', dust:'#4ade80' };
const units = { temp:'°C', humi:'%', co2:'ppm', light:'%', sound:'dB', dust:'μg/m³' };

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: {
    animation: false,
    responsive: true,
    scales: {
      x: { display: false },
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
    },
    plugins: { legend: { labels: { color: '#e2e8f0' } } }
  }
});

async function loadData() {
  const { data, error } = await supabase
    .from('sensor_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) { console.error(error); return; }
  const sorted = data.reverse();
  updateCards(sorted[sorted.length - 1]);
  updateChart(sorted);
  document.getElementById('count').textContent = sorted.length + ' 데이터';
}

function updateCards(latest) {
  if (!latest) return;
  const grid = document.getElementById('cards');
  const keys = Object.keys(latest).filter(k => !['id','created_at','device_id','extra'].includes(k) && latest[k] !== null);
  grid.innerHTML = keys.map(k =>
    '<div class="card"><div class="label">' + k + '</div>' +
    '<div class="value" style="color:' + (colors[k]||'#e2e8f0') + '">' +
    (typeof latest[k]==='number' ? latest[k].toFixed(1) : latest[k]) +
    '<span class="unit">' + (units[k]||'') + '</span></div></div>'
  ).join('');
}

function updateChart(data) {
  const keys = Object.keys(data[0]).filter(k => !['id','created_at','device_id','extra'].includes(k) && typeof data[0][k] === 'number');
  chart.data.labels = data.map((_, i) => i);
  chart.data.datasets = keys.map(k => ({
    label: k,
    data: data.map(d => d[k]),
    borderColor: colors[k] || '#e2e8f0',
    tension: 0.3,
    pointRadius: 0,
  }));
  chart.update();
}

// 실시간 구독
supabase
  .channel('sensor_realtime')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_data' }, (payload) => {
    updateCards(payload.new);
    loadData();
    document.getElementById('status').className = 'status on';
    document.getElementById('status').textContent = '실시간 수신 중';
  })
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      document.getElementById('status').className = 'status on';
      document.getElementById('status').textContent = '연결됨';
    }
  });

loadData();
setInterval(loadData, 10000);
</script>
</body>
</html>`,
      },
      examples: [
        {
          name: '학교 공기질 모니터링',
          sensors: ['SCD30', 'DHT20', 'DUST', 'OLED'],
          desc: 'CO2+온습도+미세먼지 통합 공기질 시스템',
          code: `from machine import I2C, Pin, ADC
import time, struct

# ── 센서 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
scd_addr = 0x61
dust = ADC(Pin(28))  # 미세먼지 센서 (ADC — GP28, A0/A2는 다른 센서용)
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def crc8(data):
    crc = 0xFF
    for b in data:
        crc ^= b
        for _ in range(8):
            if crc & 0x80:
                crc = (crc << 1) ^ 0x31
            else:
                crc <<= 1
            crc &= 0xFF
    return crc

def read_dht20():
    i2c.writeto(dht_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(dht_addr, 7)
    humi = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temp, 1), round(humi, 1)

def read_scd30():
    i2c.writeto(scd_addr, bytes([0x02, 0x02]))
    time.sleep(0.01)
    ready = i2c.readfrom(scd_addr, 3)
    if ready[1] != 1:
        return None
    i2c.writeto(scd_addr, bytes([0x03, 0x00]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 18)
    co2 = struct.unpack('>f', bytes([data[0], data[1], data[3], data[4]]))[0]
    return round(co2)

# SCD30 연속 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x00, 0x10, 0x00, 0x00, crc8(bytes([0x00, 0x00]))]))
print("SCD30 준비 중... 2초 대기")
time.sleep(2)

def read_dust():
    raw = dust.read_u16()
    # 간이 미세먼지 농도 변환 (ug/m3 근사)
    return round(raw / 65535 * 500, 0)

def air_quality_index(co2, dust_ug, temp, humi):
    score = 100
    if co2 > 1000: score -= 30
    elif co2 > 800: score -= 15
    if dust_ug > 75: score -= 30
    elif dust_ug > 35: score -= 15
    if temp < 18 or temp > 28: score -= 10
    if humi < 30 or humi > 70: score -= 10
    return max(0, score)

def aqi_grade(score):
    if score >= 80: return "Good"
    elif score >= 60: return "Fair"
    elif score >= 40: return "Poor"
    else: return "Bad!"

# ── CSV 파일 준비 ──
f = open("air_quality.csv", "a")
f.write("분,CO2,온도,습도,미세먼지,AQI점수,등급\\n")
count = 0
start = time.ticks_ms()
aqi_hist = []  # AQI 트렌드 (최대 40개)

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    co2 = read_scd30()
    if co2 is None:
        time.sleep(2)
        continue
    dust_ug = read_dust()
    aqi = air_quality_index(co2, dust_ug, temp, humi)
    grade = aqi_grade(aqi)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # AQI 이력
    aqi_hist.append(aqi)
    if len(aqi_hist) > 40:
        aqi_hist.pop(0)

    # OLED 이중 대시보드
    oled.fill(0)
    # 외곽 프레임
    oled.rect(0, 0, 128, 64, 1)
    # 헤더 바
    oled.fill_rect(1, 1, 126, 11, 1)
    oled.text("Air Quality", 24, 2, 0)
    # 왼쪽 패널: CO2 + Dust
    oled.text(f"CO2:{co2}", 4, 14)
    co2_w = min(int(co2 / 2000 * 40), 40)
    oled.rect(4, 24, 42, 6, 1)
    oled.fill_rect(5, 25, co2_w, 4, 1)
    oled.text(f"D:{dust_ug:.0f}", 4, 32)
    d_w = min(int(dust_ug / 200 * 40), 40)
    oled.rect(4, 42, 42, 6, 1)
    oled.fill_rect(5, 43, d_w, 4, 1)
    # 오른쪽 패널: Temp + Humi
    oled.vline(64, 13, 38, 1)
    oled.text(f"T:{temp}C", 68, 14)
    oled.text(f"H:{humi:.0f}%", 68, 26)
    # AQI 스코어 바 (하단)
    oled.hline(1, 50, 126, 1)
    oled.text(f"AQI:{aqi}", 4, 53)
    oled.text(f"[{grade}]", 76, 53)
    aqi_w = int(aqi / 100 * 120)
    oled.fill_rect(4, 62, aqi_w, 1, 1)
    oled.show()

    # CSV + Serial (PC 이중 대시보드)
    f.write(f"{elapsed_min},{co2},{temp},{humi},{dust_ug:.0f},{aqi},{grade}\\n")
    f.flush()
    # Serial 출력 (PC 실시간 그래프용)
    print(f"CO2:{co2},T:{temp},H:{humi},D:{dust_ug:.0f},AQI:{aqi}")
    time.sleep(10)`,
          pcCode: `# PC 실시간 대시보드 — 학교 공기질 모니터링
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 200
idx = deque(maxlen=MAX_POINTS)
co2s = deque(maxlen=MAX_POINTS)
dusts = deque(maxlen=MAX_POINTS)
temps_d = deque(maxlen=MAX_POINTS)
humis_d = deque(maxlen=MAX_POINTS)
aqis = deque(maxlen=MAX_POINTS)
count = 0

plt.style.use('dark_background')
fig, ((ax_co2, ax_dust), (ax_th, ax_aqi)) = plt.subplots(2, 2, figsize=(14, 8))
fig.suptitle('Air Quality Monitoring Station', fontsize=14, color='cyan')

def update(frame):
    global count
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line or not line.startswith('CO2:'): return
        # 파싱: CO2:800,T:24.5,H:55,D:25,AQI:85
        parts = dict(p.split(':') for p in line.split(','))
        co2 = int(parts['CO2'])
        temp = float(parts['T'])
        humi = float(parts['H'])
        dust = float(parts['D'])
        aqi = int(parts['AQI'])
        count += 1
        idx.append(count)
        co2s.append(co2)
        dusts.append(dust)
        temps_d.append(temp)
        humis_d.append(humi)
        aqis.append(aqi)

        x = list(idx)

        # CO2 차트
        ax_co2.clear()
        ax_co2.set_title('CO2 (ppm)', color='#ff6b6b')
        ax_co2.axhspan(0, 600, alpha=0.1, color='green')
        ax_co2.axhspan(600, 1000, alpha=0.1, color='yellow')
        ax_co2.axhspan(1000, 1500, alpha=0.1, color='orange')
        ax_co2.axhspan(1500, 3000, alpha=0.1, color='red')
        ax_co2.plot(x, list(co2s), color='#ff6b6b', linewidth=2)
        ax_co2.set_ylim(300, max(1600, max(co2s) + 100) if co2s else 1600)
        ax_co2.grid(True, alpha=0.3)

        # Dust 차트
        ax_dust.clear()
        ax_dust.set_title('Dust (ug/m3)', color='#ffaa44')
        ax_dust.axhspan(0, 35, alpha=0.1, color='green')
        ax_dust.axhspan(35, 75, alpha=0.1, color='yellow')
        ax_dust.axhspan(75, 500, alpha=0.1, color='red')
        ax_dust.plot(x, list(dusts), color='#ffaa44', linewidth=2)
        ax_dust.grid(True, alpha=0.3)

        # Temp/Humi 차트
        ax_th.clear()
        ax_th.set_title('Temp & Humidity', color='#4ecdc4')
        ax_th.plot(x, list(temps_d), color='#ff6b6b', linewidth=1.5, label='Temp(C)')
        ax_th_r = ax_th.twinx()
        ax_th_r.plot(x, list(humis_d), color='#4ecdc4', linewidth=1.5, label='Humi(%)')
        ax_th.set_ylabel('Temp', color='#ff6b6b')
        ax_th_r.set_ylabel('Humi', color='#4ecdc4')
        ax_th.legend(loc='upper left', fontsize=8)
        ax_th_r.legend(loc='upper right', fontsize=8)
        ax_th.grid(True, alpha=0.3)

        # AQI 트렌드
        ax_aqi.clear()
        ax_aqi.set_title('AQI Score', color='cyan')
        aqi_list = list(aqis)
        ax_aqi.axhspan(80, 100, alpha=0.1, color='green')
        ax_aqi.axhspan(60, 80, alpha=0.1, color='yellow')
        ax_aqi.axhspan(40, 60, alpha=0.1, color='orange')
        ax_aqi.axhspan(0, 40, alpha=0.1, color='red')
        ax_aqi.plot(x, aqi_list, color='cyan', linewidth=2)
        ax_aqi.fill_between(x, aqi_list, alpha=0.15, color='cyan')
        ax_aqi.set_ylim(0, 100)
        ax_aqi.grid(True, alpha=0.3)
        if aqi_list:
            ax_aqi.text(0.98, 0.95, f'{aqi_list[-1]}', transform=ax_aqi.transAxes,
                        ha='right', va='top', fontsize=20, color='cyan')
    except: pass

ani = FuncAnimation(fig, update, interval=1000, cache_frame_data=False)
plt.tight_layout()
plt.show()`,
        },
        {
          name: '교실 에너지 절약 자동화',
          sensors: ['LIGHT', 'PIR', 'DHT20', 'OLED', 'RELAY'],
          desc: '재실감지+조도로 자동 에너지 관리',
          code: `from machine import I2C, Pin, ADC
import time

# ── 센서 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
light = ADC(Pin(26))  # Grove A0 포트
pir = Pin(16, Pin.IN)   # PIR 인체감지 (Grove D16)
relay = Pin(18, Pin.OUT) # 릴레이 (GP18 — PIR이 GP16 사용하므로 대체 핀)
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_dht20():
    i2c.writeto(dht_addr, bytes([0xAC, 0x33, 0x00]))
    time.sleep(0.08)
    data = i2c.readfrom(dht_addr, 7)
    humi = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576 * 100
    temp = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576 * 200 - 50
    return round(temp, 1), round(humi, 1)

# 자동 제어 로직
EMPTY_TIMEOUT = 300  # 5분 동안 사람 없으면 절전
last_motion = time.ticks_ms()
relay_on = False

# ── CSV 파일 준비 ──
f = open("energy_log.csv", "a")
f.write("분,온도,습도,조도,재실,릴레이,절약시간(초)\\n")
save_seconds = 0
start = time.ticks_ms()

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    light_pct = round(light.read_u16() / 65535 * 100, 1)
    occupied = pir.value() == 1
    now = time.ticks_ms()

    if occupied:
        last_motion = now

    idle_sec = time.ticks_diff(now, last_motion) // 1000

    # 자동 제어
    if not occupied and idle_sec > EMPTY_TIMEOUT:
        relay.value(0)
        relay_on = False
        save_seconds += 2
    elif light_pct < 30 and occupied:
        relay.value(1)
        relay_on = True
    elif light_pct > 70:
        relay.value(0)
        relay_on = False
        save_seconds += 2

    elapsed_min = time.ticks_diff(now, start) // 60000

    # OLED 대시보드
    oled.fill(0)
    # 외곽 프레임
    oled.rect(0, 0, 128, 64, 1)
    # 헤더 바
    oled.fill_rect(1, 1, 126, 11, 1)
    oled.text("EnergySaver", 20, 2, 0)
    # 상태 표시
    oled.text(f"Person:{'Y' if occupied else 'N'}", 4, 14)
    oled.text(f"Relay:{'ON' if relay_on else 'OFF'}", 4, 24)
    # 조도 레벨 바
    oled.text(f"Light:{light_pct:.0f}%", 4, 36)
    l_w = int(min(light_pct, 100) / 100 * 56)
    oled.rect(68, 36, 58, 8, 1)
    oled.fill_rect(69, 37, l_w, 6, 1)
    # 절약 카운터 크게
    oled.hline(1, 48, 126, 1)
    oled.text(f"Saved:{save_seconds//60}min", 4, 52)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed_min},{temp},{humi},{light_pct},{'Y' if occupied else 'N'},{'ON' if relay_on else 'OFF'},{save_seconds}\\n")
    f.flush()

    print(f"T:{temp} L:{light_pct:.0f}% P:{'Y' if occupied else 'N'} R:{'ON' if relay_on else 'OFF'}")
    time.sleep(2)`,
          pcCode: `# PC 실시간 대시보드 — 교실 에너지 절약 자동화
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 300
idx = deque(maxlen=MAX_POINTS)
temps_d = deque(maxlen=MAX_POINTS)
lights_d = deque(maxlen=MAX_POINTS)
persons = deque(maxlen=MAX_POINTS)
relays = deque(maxlen=MAX_POINTS)
savings = []
count = 0

plt.style.use('dark_background')
fig, (ax_timeline, ax_light, ax_save) = plt.subplots(3, 1, figsize=(12, 8),
    gridspec_kw={'height_ratios': [2, 2, 1]})
fig.suptitle('Energy Savings Dashboard', fontsize=14, color='cyan')

def update(frame):
    global count
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line or not line.startswith('T:'): return
        # 파싱: T:24.5 L:65% P:Y R:ON
        parts = line.split()
        temp = float(parts[0].split(':')[1])
        light = float(parts[1].split(':')[1].replace('%', ''))
        person = 1 if parts[2].split(':')[1] == 'Y' else 0
        relay = 1 if parts[3].split(':')[1] == 'ON' else 0
        count += 1
        idx.append(count)
        temps_d.append(temp)
        lights_d.append(light)
        persons.append(person)
        relays.append(relay)
        x = list(idx)

        # 타임라인: 사람감지 + 릴레이
        ax_timeline.clear()
        ax_timeline.set_title('Detection & Relay Timeline', fontsize=11)
        ax_timeline.fill_between(x, list(persons), step='mid',
                                  alpha=0.3, color='#44ff88', label='Person')
        ax_timeline.fill_between(x, list(relays), step='mid',
                                  alpha=0.3, color='#ff6b6b', label='Relay')
        ax_timeline.set_ylabel('ON/OFF')
        ax_timeline.set_ylim(-0.1, 1.5)
        ax_timeline.legend(fontsize=8, loc='upper left')
        ax_timeline.grid(True, alpha=0.3)

        # 조도 차트
        ax_light.clear()
        ax_light.set_title('Light Level', fontsize=11, color='#ffe66d')
        ax_light.plot(x, list(lights_d), color='#ffe66d', linewidth=1.5)
        ax_light.fill_between(x, list(lights_d), alpha=0.2, color='#ffe66d')
        ax_light.axhline(y=30, color='red', linestyle=':', alpha=0.5, label='Dark(<30%)')
        ax_light.axhline(y=70, color='green', linestyle=':', alpha=0.5, label='Bright(>70%)')
        ax_light.set_ylabel('Light (%)')
        ax_light.set_ylim(0, 100)
        ax_light.legend(fontsize=8)
        ax_light.grid(True, alpha=0.3)

        # 누적 절약 (릴레이 OFF일 때 절약으로 가정)
        total_off = sum(1 for r in relays if r == 0)
        total_on = sum(1 for r in relays if r == 1)
        ax_save.clear()
        ax_save.set_title('Relay Usage', fontsize=11)
        ax_save.barh(['OFF (saving)', 'ON'], [total_off, total_on],
                     color=['#44ff88', '#ff6b6b'])
        ax_save.set_xlabel('Samples')
    except: pass

ani = FuncAnimation(fig, update, interval=500, cache_frame_data=False)
plt.tight_layout()
plt.show()`,
        },
        {
          name: '동작 분류 ML 시스템',
          sensors: ['MPU6050', 'OLED'],
          desc: 'Teachable Machine으로 동작 패턴 분류',
          code: `from machine import I2C, Pin
import time
import math

# ── I2C 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
mpu_addr = 0x68
time.sleep(0.1)

# MPU6050 초기화
i2c.writeto_mem(mpu_addr, 0x6B, bytes([0x00]))
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_accel():
    data = i2c.readfrom_mem(mpu_addr, 0x3B, 6)
    ax = (data[0] << 8 | data[1]) - (65536 if data[0] > 127 else 0)
    ay = (data[2] << 8 | data[3]) - (65536 if data[2] > 127 else 0)
    az = (data[4] << 8 | data[5]) - (65536 if data[4] > 127 else 0)
    return ax / 16384, ay / 16384, az / 16384

# ── 데이터 수집 모드 ──
# Teachable Machine 학습용 데이터 수집
MODE = "collect"  # "collect" 또는 "predict"
LABEL = "idle"    # 수집할 동작 이름
SAMPLES = 100     # 수집할 샘플 수

def collect_data(label, n_samples):
    print(f"[{label}] 데이터 수집 시작! 3초 후...")
    time.sleep(3)
    f = open(f"ml_{label}.csv", "a")
    f.write("ax,ay,az,magnitude\\n")

    for i in range(n_samples):
        ax, ay, az = read_accel()
        mag = math.sqrt(ax*ax + ay*ay + az*az)
        f.write(f"{ax:.3f},{ay:.3f},{az:.3f},{mag:.3f}\\n")
        pct = int((i + 1) / n_samples * 100)

        # OLED 수집 대시보드
        oled.fill(0)
        oled.fill_rect(0, 0, 128, 12, 1)
        oled.text("Collect", 36, 2, 0)
        oled.hline(0, 13, 128, 1)
        oled.text(f"Label: {label}", 4, 16)
        oled.text(f"{i+1}/{n_samples}", 4, 28)
        oled.text(f"{pct}%", 100, 28)
        # 진행 막대 (프레임 + 채움)
        oled.rect(4, 42, 120, 10, 1)
        oled.fill_rect(5, 43, int(pct / 100 * 118), 8, 1)
        oled.text(f"G:{mag:.2f}", 4, 56)
        oled.show()

        time.sleep(0.05)  # 20Hz 샘플링

    f.close()
    print(f"[{label}] {n_samples}개 수집 완료!")

def predict_mode():
    mag_hist = []  # 크기 파형 (최대 60개)
    # 간단한 규칙 기반 분류 (ML 모델 적용 전 테스트용)
    while True:
        ax, ay, az = read_accel()
        mag = math.sqrt(ax*ax + ay*ay + az*az)

        if mag < 1.1:
            label = "Idle"
        elif mag < 2.0:
            label = "Walk"
        elif mag < 4.0:
            label = "Shake"
        else:
            label = "Jump"

        mag_hist.append(mag)
        if len(mag_hist) > 60:
            mag_hist.pop(0)

        # OLED 예측 대시보드
        oled.fill(0)
        # 헤더 바
        oled.fill_rect(0, 0, 128, 12, 1)
        oled.text("ML Predict", 24, 2, 0)
        oled.hline(0, 13, 128, 1)
        # 크기 게이지 (수평 바)
        oled.text(f"G:{mag:.2f}", 4, 16)
        gauge_w = min(int(mag / 5.0 * 60), 60)
        oled.rect(68, 16, 56, 8, 1)
        # 게이지 표시선
        oled.vline(68 + int(1.2/5*56), 16, 8, 1)
        oled.vline(68 + int(2.0/5*56), 16, 8, 1)
        oled.vline(68 + int(4.0/5*56), 16, 8, 1)
        oled.fill_rect(69, 17, gauge_w, 6, 1)
        # 분류 결과 크게
        oled.text(f"=> {label}", 20, 28)
        # 실시간 파형 (하단)
        oled.hline(0, 39, 128, 1)
        if len(mag_hist) > 1:
            m_max = max(max(mag_hist), 2.0)
            for i in range(len(mag_hist)):
                h = int(min(mag_hist[i] / m_max, 1.0) * 22)
                x = 4 + i * 2
                oled.vline(x, 62 - h, max(h, 1), 1)
        oled.show()

        # Serial로 PC 전송 (ML 모델 연동용)
        print(f"{ax:.3f},{ay:.3f},{az:.3f},{mag:.3f},{label}")
        time.sleep(0.1)

# ── 실행 ──
if MODE == "collect":
    collect_data(LABEL, SAMPLES)
else:
    predict_mode()`,
          pcCode: `# PC 실시간 대시보드 — 동작 분류 ML 시스템
# 사용법: pip install pyserial matplotlib
import serial
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import time

PORT = '/dev/tty.usbmodem1101'  # 환경에 맞게 수정
BAUD = 115200
ser = serial.Serial(PORT, BAUD, timeout=1)
time.sleep(2)

MAX_POINTS = 300
ax_buf = deque(maxlen=MAX_POINTS)
ay_buf = deque(maxlen=MAX_POINTS)
az_buf = deque(maxlen=MAX_POINTS)
mag_buf = deque(maxlen=MAX_POINTS)
idx_buf = deque(maxlen=MAX_POINTS)
count = 0
current_label = 'Idle'
label_counts = {'Idle': 0, 'Walk': 0, 'Shake': 0, 'Jump': 0}

plt.style.use('dark_background')
fig = plt.figure(figsize=(14, 8))
gs = fig.add_gridspec(2, 2, hspace=0.35, wspace=0.3)
ax_xyz = fig.add_subplot(gs[0, 0])
ax_mag = fig.add_subplot(gs[0, 1])
ax_class = fig.add_subplot(gs[1, 0])
ax_conf = fig.add_subplot(gs[1, 1])
fig.suptitle('Motion Classification ML Dashboard', fontsize=14, color='cyan')

# 분류 결과 텍스트
label_text = fig.text(0.5, 0.48, 'Idle', fontsize=24, color='lime',
                       ha='center', va='center', fontweight='bold',
                       bbox=dict(boxstyle='round', facecolor='#222', alpha=0.8))

def update(frame):
    global count, current_label
    try:
        line = ser.readline().decode('utf-8').strip()
        if not line: return
        parts = line.split(',')
        if len(parts) != 5: return
        # 파싱: ax,ay,az,mag,label
        ax_v = float(parts[0])
        ay_v = float(parts[1])
        az_v = float(parts[2])
        mag_v = float(parts[3])
        label = parts[4]
        current_label = label
        count += 1
        idx_buf.append(count)
        ax_buf.append(ax_v)
        ay_buf.append(ay_v)
        az_buf.append(az_v)
        mag_buf.append(mag_v)
        if label in label_counts:
            label_counts[label] += 1

        x = list(idx_buf)

        # 3축 파형
        ax_xyz.clear()
        ax_xyz.set_title('3-Axis Accelerometer', fontsize=10)
        ax_xyz.plot(x, list(ax_buf), color='#ff4444', linewidth=1, alpha=0.8, label='X')
        ax_xyz.plot(x, list(ay_buf), color='#44ff44', linewidth=1, alpha=0.8, label='Y')
        ax_xyz.plot(x, list(az_buf), color='#4444ff', linewidth=1, alpha=0.8, label='Z')
        ax_xyz.set_ylabel('G-force')
        ax_xyz.legend(fontsize=8, loc='upper left')
        ax_xyz.grid(True, alpha=0.3)

        # 크기 + 임계선
        ax_mag.clear()
        ax_mag.set_title('Magnitude', fontsize=10, color='cyan')
        m = list(mag_buf)
        ax_mag.plot(x, m, color='cyan', linewidth=1.5)
        ax_mag.fill_between(x, m, alpha=0.15, color='cyan')
        ax_mag.axhline(y=1.1, color='#888', linestyle=':', alpha=0.5)
        ax_mag.axhline(y=2.0, color='yellow', linestyle=':', alpha=0.5)
        ax_mag.axhline(y=4.0, color='red', linestyle=':', alpha=0.5)
        ax_mag.set_ylabel('G')
        ax_mag.set_ylim(0, max(5, max(m) + 0.5) if m else 5)
        ax_mag.grid(True, alpha=0.3)

        # 분류 히스토그램
        ax_class.clear()
        ax_class.set_title('Classification Count', fontsize=10)
        colors = {'Idle': '#888888', 'Walk': '#44ff44', 'Shake': '#ffcc00', 'Jump': '#ff4444'}
        bars = ax_class.bar(label_counts.keys(), label_counts.values(),
                            color=[colors[k] for k in label_counts.keys()])
        ax_class.set_ylabel('Count')
        ax_class.grid(True, axis='y', alpha=0.3)

        # 실시간 분류 표시 (큰 텍스트)
        label_colors = {'Idle': '#888888', 'Walk': '#44ff44', 'Shake': '#ffcc00', 'Jump': '#ff4444'}
        label_text.set_text(current_label)
        label_text.set_color(label_colors.get(current_label, 'white'))

        # 최근 50개 분류 비율 (유사 신뢰도)
        ax_conf.clear()
        ax_conf.set_title('Recent 50 Distribution', fontsize=10)
        recent = list(mag_buf)[-50:]
        rc = {'Idle': 0, 'Walk': 0, 'Shake': 0, 'Jump': 0}
        for v in recent:
            if v < 1.1: rc['Idle'] += 1
            elif v < 2.0: rc['Walk'] += 1
            elif v < 4.0: rc['Shake'] += 1
            else: rc['Jump'] += 1
        total = max(sum(rc.values()), 1)
        pcts = [rc[k]/total*100 for k in rc]
        ax_conf.barh(list(rc.keys()), pcts,
                     color=[colors[k] for k in rc.keys()])
        ax_conf.set_xlabel('%')
        ax_conf.set_xlim(0, 100)
        for i, (k, p) in enumerate(zip(rc.keys(), pcts)):
            ax_conf.text(p + 1, i, f'{p:.0f}%', va='center', fontsize=9)
    except: pass

ani = FuncAnimation(fig, update, interval=50, cache_frame_data=False)
plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()`,
        },
      ],
      requirements: [
        '센서 3개 이상 통합 데이터 수집',
        'OLED + PC 이중 대시보드',
        'ML 모델(Teachable Machine 등) 활용',
        '장기 운영 설계(에러 핸들링, 파일 관리)',
        '5분 이내 시스템 설명 역량',
      ],
      evaluation: {
        essential: ['센서 통합', '이중 대시보드 동작'],
        good: ['ML 활용', '장기 운영 안정성'],
        excellent: ['실제 문제 해결', '논리적 설명 능력'],
      },
      timeline: [
        { time: '0:00~0:30', task: '프로젝트 설계 + 아키텍처', picoMakers: 'AI에게 시스템 설계 상담' },
        { time: '0:30~1:00', task: '센서 통합 배선', picoMakers: '센서 3개+ 추가 → 핀 충돌 해결' },
        { time: '1:00~2:00', task: '대시보드 + ML 구현', picoMakers: '통합 코드 → AI 코드 리뷰' },
        { time: '2:00~3:00', task: '테스트 + 최적화', picoMakers: 'AI에게 안정성 개선 요청' },
        { time: '3:00~', task: '발표 준비 + 문서화', picoMakers: '시스템 설명 연습' },
      ],
      suggestedQuestions: [
        '복잡한 시스템을 설계하는 방법은?',
        'ML을 센서 데이터에 적용하려면?',
        '프로젝트를 발전시키는 방향을 제안해주세요',
        '장기 운영 시 에러 처리 방법은?',
      ],
    },
  },
};

// 전체 레슨 목록 (플랫)
export const ALL_LESSONS = [
  ...CURRICULUM.courseA.act1.lessons,
  ...CURRICULUM.courseA.act2.lessons,
  ...CURRICULUM.courseA.act3.lessons,
];

// 레슨 ID로 찾기
export function getLessonById(id) {
  return ALL_LESSONS.find(l => l.id === id) || null;
}

// 레슨 번호로 찾기
export function getLessonByNum(num) {
  return ALL_LESSONS.find(l => l.num === num) || null;
}

// 레슨이 속한 Act 정보
export function getActForLesson(lessonNum) {
  if (lessonNum >= 1 && lessonNum <= 4) return { act: 'act1', ...CURRICULUM.courseA.act1 };
  if (lessonNum >= 5 && lessonNum <= 10) return { act: 'act2', ...CURRICULUM.courseA.act2 };
  if (lessonNum >= 11 && lessonNum <= 15) return { act: 'act3', ...CURRICULUM.courseA.act3 };
  return null;
}

// Course B 레벨 정보
export function getCourseBLevel(level) {
  const key = `lv${level}`;
  return CURRICULUM.courseB[key] || null;
}

// 차시에서 사용하는 센서 ID 목록
export function getSensorsForLesson(lessonNum) {
  const lesson = getLessonByNum(lessonNum);
  if (!lesson) return [];
  return [...lesson.sensors, ...(lesson.devices || [])];
}

// AI 역할 결정
export function getAIRole(mode, lessonNum, courseBLevel) {
  if (mode === 'free') return { role: 'assistant', codeStyle: 'full', label: '자유 모드' };
  if (mode === 'hackathon') return { role: 'advisor', codeStyle: 'direction', label: '해커톤' };

  if (mode === 'courseB') {
    const level = getCourseBLevel(courseBLevel);
    if (!level) return { role: 'coach', codeStyle: 'hints', label: 'Course B' };
    return { role: level.aiRole, codeStyle: level.codeStyle, label: `Course B Lv.${courseBLevel}` };
  }

  // 교재 연동 모드
  const act = getActForLesson(lessonNum);
  if (!act) return { role: 'teacher', codeStyle: 'full', label: '교재 모드' };
  return { role: act.aiRole, codeStyle: act.codeStyle, label: act.title };
}

export default CURRICULUM;
