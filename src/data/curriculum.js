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
          sensors: ['SCD41', 'DHT20'], devices: ['OLED'],
          question: '바이브 코딩으로 교실 환경 대시보드를 만들 수 있을까?',
          skills: ['멀티I2C', 'CO2기준', '환기판정'],
          difficulty: 3, duration: 50,
          tips: ['CO2 1000ppm 이상이면 환기 필요', 'SCD41 첫 측정 5초 대기'],
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
    lv1: {
      id: 'course-b-lv1', title: '탐험가', level: 1,
      sensors: 1, hours: 3, focus: '단일센서 대시보드',
      difficulty: 2,
      aiRole: 'coach', codeStyle: 'hints',
      prerequisite: 'Course A 1~4차시',
      textbookUrl: '/course-b/lv1/',
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

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    status = get_status(temp)
    elapsed = time.ticks_diff(time.ticks_ms(), start) // 1000

    # OLED 대시보드
    oled.fill(0)
    oled.text("== Classroom ==", 4, 0)
    oled.text(f"Temp: {temp} C", 4, 16)
    oled.text(f"Humi: {humi} %", 4, 28)
    oled.text(f"[{status}]", 4, 44)
    # 온도 막대그래프 (0~40도 범위)
    bar_w = int(min(max(temp, 0), 40) / 40 * 100)
    oled.fill_rect(14, 56, bar_w, 6, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{temp},{humi}\\n")
    f.flush()

    print(f"{elapsed}s | {temp}°C {humi}% [{status}]")
    time.sleep(2)`,
        },
        {
          name: '소음 레벨 모니터',
          sensors: ['SOUND', 'OLED'],
          desc: '소리 센서로 소음 수준 판별, 레벨 미터 시각화',
          code: `from machine import ADC, Pin, I2C
import time

# ── 소리 센서 설정 (ADC — Grove A2 포트: GP27) ──
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
    oled.text("== Noise ==", 20, 0)
    oled.text(f"{pct:.0f}%", 48, 16)
    oled.text(f"[{level_text}]", 4, 32)
    # 레벨 미터 (막대 7칸)
    for i in range(7):
        x = 14 + i * 16
        if i < bars:
            oled.fill_rect(x, 48, 12, 14, 1)
        else:
            oled.rect(x, 48, 12, 14, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{pct:.1f},{level_text}\\n")
    f.flush()

    print(f"{elapsed}s | {pct:.0f}% [{level_text}]")
    time.sleep(0.5)`,
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
    oled.text("== Light ==", 20, 0)
    oled.text(f"{pct:.0f}% [{status}]", 4, 12)
    # 실시간 그래프
    for i, val in enumerate(graph_data):
        x = 14 + i
        h = int(val / 100 * 36)
        oled.vline(x, 62 - h, h, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{pct:.1f},{status}\\n")
    f.flush()

    print(f"{elapsed}s | {pct:.0f}% [{status}]")
    time.sleep(1)`,
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
      examples: [
        {
          name: '스마트 환기 시스템',
          sensors: ['DHT20', 'SCD41', 'OLED'],
          desc: 'CO2+온습도 복합 판단으로 환기 알림',
          code: `from machine import I2C, Pin
import time

# ── I2C 설정 (DHT20 + SCD41 + OLED 공유) ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
scd_addr = 0x62
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

def read_scd41():
    # 데이터 읽기 (주기 측정 모드에서 자동 갱신됨)
    i2c.writeto(scd_addr, bytes([0xEC, 0x05]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 9)
    co2 = (data[0] << 8) | data[1]
    return co2

# SCD41 주기 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x21, 0xB1]))
print("SCD41 준비 중... 5초 대기")
time.sleep(5)

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
    co2 = read_scd41()
    status, need_vent = judge_ventilation(co2, temp, humi)

    # OLED 대시보드
    oled.fill(0)
    oled.text("== Smart Vent ==", 0, 0)
    oled.text(f"CO2 : {co2} ppm", 4, 14)
    oled.text(f"Temp: {temp} C", 4, 26)
    oled.text(f"Humi: {humi} %", 4, 38)
    if need_vent:
        oled.fill_rect(0, 52, 128, 12, 1)
        oled.text(f">> {status} <<", 16, 54, 0)
    else:
        oled.text(f"[{status}]", 4, 54)
    oled.show()

    print(f"CO2:{co2}ppm T:{temp}C H:{humi}% [{status}]")
    time.sleep(5)`,
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

# ── 소리 센서 설정 (Grove A2: GP27) ──
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
    oled.text("== Security ==", 8, 0)
    oled.text(f"Dist: {dist:.0f} cm", 4, 16)
    oled.text(f"Noise: {noise:.0f} %", 4, 28)
    oled.text(f"[{status}]", 4, 44)
    oled.show()

    print(f"D:{dist:.0f}cm N:{noise:.0f}% [{status}]")
    time.sleep(0.3)`,
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
sound = ADC(Pin(27))  # Grove A2 포트
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

    # OLED 대시보드
    oled.fill(0)
    oled.text("== Comfort ==", 12, 0)
    oled.text(f"T:{temp}C H:{humi}%", 4, 14)
    oled.text(f"L:{light_pct:.0f}% N:{noise_pct:.0f}%", 4, 26)
    oled.text(f"Score: {score}/100", 4, 42)
    # 점수 막대그래프
    oled.fill_rect(4, 56, score, 6, 1)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{temp},{humi},{light_pct:.0f},{noise_pct:.0f},{score}\\n")
    f.flush()

    print(f"T:{temp} H:{humi} L:{light_pct:.0f} N:{noise_pct:.0f} => {score}점")
    time.sleep(2)`,
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

# ── 장기 데이터 수집 루프 ──
while True:
    temp, humi = read_dht20()
    light_pct = round(light.read_u16() / 65535 * 100, 1)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # OLED 연구 대시보드
    oled.fill(0)
    oled.text("Plant Research", 8, 0)
    oled.text(f"#{count} ({elapsed_min}min)", 4, 14)
    oled.text(f"T:{temp}C H:{humi}%", 4, 28)
    oled.text(f"Light: {light_pct}%", 4, 40)
    oled.text(f"Next: {MEASURE_INTERVAL}s", 4, 54)
    oled.show()

    # CSV 저장
    f.write(f"{count},{elapsed_min},{temp},{humi},{light_pct}\\n")
    f.flush()

    print(f"#{count} | {elapsed_min}분 | T:{temp} H:{humi} L:{light_pct}%")
    time.sleep(MEASURE_INTERVAL)`,
        },
        {
          name: 'CO2 농도와 수업 집중도',
          sensors: ['SCD41', 'OLED'],
          desc: '수업 전후 CO2 변화 분석',
          code: `from machine import I2C, Pin
import time

# ── 연구 설정 ──
MEASURE_INTERVAL = 30  # 30초마다 측정
LOG_FILE = "co2_research.csv"

# ── I2C 설정 (SCD41 + OLED) ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
scd_addr = 0x62
time.sleep(0.1)

from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)

def read_scd41():
    i2c.writeto(scd_addr, bytes([0xEC, 0x05]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 9)
    co2 = (data[0] << 8) | data[1]
    temp_raw = (data[3] << 8) | data[4]
    temp = -45 + 175 * temp_raw / 65535
    return co2, round(temp, 1)

# SCD41 주기 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x21, 0xB1]))
print("SCD41 준비 중... 5초 대기")
time.sleep(5)

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

# ── 장기 데이터 수집 루프 ──
while True:
    co2, temp = read_scd41()
    status = co2_status(co2)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # OLED 연구 대시보드
    oled.fill(0)
    oled.text("CO2 Research", 16, 0)
    oled.text(f"#{count} ({elapsed_min}min)", 4, 14)
    oled.text(f"CO2: {co2} ppm", 4, 28)
    oled.text(f"Temp: {temp} C", 4, 40)
    oled.text(f"[{status}]", 4, 54)
    oled.show()

    # CSV 저장
    f.write(f"{count},{elapsed_min},{co2},{temp},{status}\\n")
    f.flush()

    print(f"#{count} | {elapsed_min}분 | CO2:{co2}ppm T:{temp}C [{status}]")
    time.sleep(MEASURE_INTERVAL)`,
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

# ── 메인 루프 ──
while True:
    ax, ay, az = read_accel()
    mag = math.sqrt(ax*ax + ay*ay + az*az)
    motion = classify_motion(mag)
    elapsed = time.ticks_diff(time.ticks_ms(), start)

    # OLED 대시보드
    oled.fill(0)
    oled.text("Motion Track", 16, 0)
    oled.text(f"X:{ax:.1f} Y:{ay:.1f}", 4, 14)
    oled.text(f"Z:{az:.1f}", 4, 26)
    oled.text(f"G: {mag:.2f}", 4, 40)
    oled.text(f"[{motion}]", 4, 54)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed},{ax:.2f},{ay:.2f},{az:.2f},{mag:.2f},{motion}\\n")
    f.flush()

    print(f"G:{mag:.2f} [{motion}]")
    time.sleep(0.2)`,
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
      examples: [
        {
          name: '학교 공기질 모니터링',
          sensors: ['SCD41', 'DHT20', 'DUST', 'OLED'],
          desc: 'CO2+온습도+미세먼지 통합 공기질 시스템',
          code: `from machine import I2C, Pin, ADC
import time

# ── 센서 설정 ──
i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=100000)
dht_addr = 0x38
scd_addr = 0x62
dust = ADC(Pin(28))  # 미세먼지 센서 (ADC — GP28, A0/A2는 다른 센서용)
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

def read_scd41():
    i2c.writeto(scd_addr, bytes([0xEC, 0x05]))
    time.sleep(0.01)
    data = i2c.readfrom(scd_addr, 9)
    return (data[0] << 8) | data[1]

# SCD41 주기 측정 시작 (한 번만 호출)
i2c.writeto(scd_addr, bytes([0x21, 0xB1]))
print("SCD41 준비 중... 5초 대기")
time.sleep(5)

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

# ── 메인 루프 ──
while True:
    temp, humi = read_dht20()
    co2 = read_scd41()
    dust_ug = read_dust()
    aqi = air_quality_index(co2, dust_ug, temp, humi)
    grade = aqi_grade(aqi)
    count += 1
    elapsed_min = time.ticks_diff(time.ticks_ms(), start) // 60000

    # OLED 이중 대시보드
    oled.fill(0)
    oled.text("AirQ Monitor", 16, 0)
    oled.text(f"CO2:{co2} Dust:{dust_ug:.0f}", 0, 12)
    oled.text(f"T:{temp}C H:{humi}%", 4, 24)
    oled.text(f"AQI: {aqi}/100", 4, 38)
    oled.text(f"[{grade}]", 4, 50)
    # AQI 막대
    oled.fill_rect(4, 60, aqi, 3, 1)
    oled.show()

    # CSV + Serial (PC 이중 대시보드)
    f.write(f"{elapsed_min},{co2},{temp},{humi},{dust_ug:.0f},{aqi},{grade}\\n")
    f.flush()
    # Serial 출력 (PC 실시간 그래프용)
    print(f"CO2:{co2},T:{temp},H:{humi},D:{dust_ug:.0f},AQI:{aqi}")
    time.sleep(10)`,
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
    oled.text("Energy Saver", 16, 0)
    oled.text(f"T:{temp}C L:{light_pct:.0f}%", 4, 14)
    oled.text(f"Person: {'O' if occupied else 'X'}", 4, 26)
    oled.text(f"Relay: {'ON' if relay_on else 'OFF'}", 4, 38)
    oled.text(f"Saved: {save_seconds//60}min", 4, 50)
    oled.show()

    # CSV 저장
    f.write(f"{elapsed_min},{temp},{humi},{light_pct},{'Y' if occupied else 'N'},{'ON' if relay_on else 'OFF'},{save_seconds}\\n")
    f.flush()

    print(f"T:{temp} L:{light_pct:.0f}% P:{'Y' if occupied else 'N'} R:{'ON' if relay_on else 'OFF'}")
    time.sleep(2)`,
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

        oled.fill(0)
        oled.text(f"Collecting: {label}", 0, 0)
        oled.text(f"{i+1}/{n_samples}", 4, 20)
        # 진행 막대
        oled.fill_rect(4, 40, int(i/n_samples*120), 8, 1)
        oled.show()

        time.sleep(0.05)  # 20Hz 샘플링

    f.close()
    print(f"[{label}] {n_samples}개 수집 완료!")

def predict_mode():
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

        oled.fill(0)
        oled.text("ML Predict", 24, 0)
        oled.text(f"G: {mag:.2f}", 4, 20)
        oled.text(f"=> {label}", 4, 40)
        oled.show()

        # Serial로 PC 전송 (ML 모델 연동용)
        print(f"{ax:.3f},{ay:.3f},{az:.3f},{mag:.3f},{label}")
        time.sleep(0.1)

# ── 실행 ──
if MODE == "collect":
    collect_data(LABEL, SAMPLES)
else:
    predict_mode()`,
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
