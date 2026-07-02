/* =========================================================
   빵춘쿠키 · 빵 캐릭터 데이터
   - 첨부 레퍼런스(BAKED FRIENDS COLL.) "그대로":
     · 광택 있는 말랑 클레이/비닐 토이 질감
     · 얼굴만 얹음 (액세서리 없음)
     · 진갈색 오벌 눈 + 은은한 하이라이트
     · 아주 작고 심플한 입
     · 살구빛 빗금 볼터치
   - 토스터기에는 얼굴 없음
   ========================================================= */

let _uid = 0;
const uid = () => ++_uid;

/* 사진 톤의 진갈색 오벌 눈 + 은은한 하이라이트 */
function eye(cx, cy, s = 1) {
  const rx = 3.1 * s, ry = 4.1 * s;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#43291a"/>
          <ellipse cx="${cx - 1*s}" cy="${cy - 1.5*s}" rx="${1*s}" ry="${1.3*s}" fill="#fff" opacity="0.55"/>`;
}
/* 살구빛 빗금 볼터치 */
function cheek(cx, cy, s = 1) {
  return `<g class="cheek">
    <ellipse cx="${cx}" cy="${cy}" rx="${6.6*s}" ry="${4.2*s}" fill="#F5A08C" opacity="0.7"/>
    <g stroke="#E67F73" stroke-width="${1.2*s}" stroke-linecap="round" opacity="0.85">
      <path d="M${cx-3.6*s} ${cy-1.4*s} l${-1.4*s} ${3*s}"/>
      <path d="M${cx} ${cy-2.2*s} l${-1.4*s} ${3.8*s}"/>
      <path d="M${cx+3.6*s} ${cy-1.4*s} l${-1.4*s} ${3*s}"/>
    </g>
  </g>`;
}

/* ---------- 식빵 (토스트 로프) ---------- */
function svgLoaf() {
  const u = uid();
  return `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="bread-svg">
    <defs>
      <radialGradient id="lfB${u}" cx="0.42" cy="0.4" r="0.95">
        <stop offset="0" stop-color="#FFFBF2"/><stop offset="0.75" stop-color="#F6ECD6"/><stop offset="1" stop-color="#EBDCBC"/>
      </radialGradient>
      <linearGradient id="lfC${u}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D8A05A"/><stop offset="0.55" stop-color="#C6853F"/><stop offset="1" stop-color="#B67534"/>
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="104" rx="40" ry="7.5" fill="#000" opacity="0.10"/>
    <!-- 흰 속살 몸통 -->
    <path d="M26 66 Q26 58 32 55 L88 55 Q94 58 94 66 L94 90 Q94 99 85 99 L35 99 Q26 99 26 90 Z" fill="url(#lfB${u})"/>
    <path d="M26 66 Q26 58 32 55 L88 55 Q94 58 94 66 L94 90 Q94 99 85 99 L35 99 Q26 99 26 90 Z" fill="none" stroke="#e3d1ad" stroke-width="1.5" opacity="0.6"/>
    <!-- 노릇 크러스트 지붕 -->
    <path d="M30 57 Q31 30 60 30 Q89 30 90 57 Q90 60 84 60 L36 60 Q30 60 30 57 Z" fill="url(#lfC${u})"/>
    <!-- 슈가 크럼(소보로) 토핑 -->
    <g>
      <circle cx="45" cy="43" r="2.1" fill="#E7B36C"/><circle cx="55" cy="38" r="2.3" fill="#E0A85C"/>
      <circle cx="66" cy="40" r="2.1" fill="#E7B36C"/><circle cx="75" cy="45" r="2" fill="#DC9E52"/>
      <circle cx="50" cy="48" r="1.8" fill="#EEC07E"/><circle cx="61" cy="45" r="1.9" fill="#E7B36C"/>
      <circle cx="70" cy="49" r="1.7" fill="#EEC07E"/><circle cx="40" cy="49" r="1.6" fill="#DC9E52"/>
    </g>
    <g fill="#fff" opacity="0.5">
      <circle cx="48" cy="41" r="0.9"/><circle cx="63" cy="39" r="0.9"/><circle cx="72" cy="43" r="0.9"/><circle cx="56" cy="47" r="0.8"/>
    </g>
    <!-- 광택 -->
    <ellipse cx="44" cy="70" rx="15" ry="7" fill="#fff" opacity="0.35"/>
    <!-- 얼굴 -->
    ${eye(48, 76)}${eye(72, 76)}
    <path d="M55 84 q5 4 10 0" stroke="#7a5230" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${cheek(38, 82)}${cheek(82, 82)}
  </svg>`;
}

/* ---------- 크루아상 (통통 세겹 롤) ---------- */
function svgCroissant() {
  const u = uid();
  return `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="bread-svg">
    <defs>
      <radialGradient id="crB${u}" cx="0.4" cy="0.32" r="0.95">
        <stop offset="0" stop-color="#F2C078"/><stop offset="0.7" stop-color="#E0A257"/><stop offset="1" stop-color="#CE8C41"/>
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="98" rx="40" ry="7.5" fill="#000" opacity="0.10"/>
    <!-- 통통한 롤 몸통 -->
    <path d="M18 68 C18 48 36 40 60 40 C84 40 102 48 102 68 C102 84 84 90 60 90 C36 90 18 84 18 68 Z" fill="url(#crB${u})"/>
    <!-- 말린 결(세겹) -->
    <g stroke="#bd8038" stroke-width="2.4" fill="none" opacity="0.5" stroke-linecap="round">
      <path d="M40 45 q-8 20 -3 40"/>
      <path d="M62 42 q-6 22 -2 46"/>
      <path d="M84 46 q6 18 1 38"/>
    </g>
    <!-- 광택 -->
    <ellipse cx="42" cy="54" rx="13" ry="6" fill="#fff" opacity="0.3"/>
    <!-- 깨 -->
    <ellipse cx="58" cy="48" rx="1.3" ry="2" fill="#4a2e1c"/><ellipse cx="66" cy="49" rx="1.3" ry="2" fill="#4a2e1c" transform="rotate(15 66 49)"/>
    <!-- 얼굴 (도톰한 볼 사이 오종종) -->
    ${eye(50, 66)}${eye(70, 66)}
    <!-- 뾰로통 입 -->
    <path d="M56 74 q4 3 8 0" stroke="#a85b3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M60 74 l0 3" stroke="#a85b3a" stroke-width="2" stroke-linecap="round"/>
    ${cheek(38, 70)}${cheek(82, 70)}
  </svg>`;
}

/* ---------- 소금빵 (버터 소금롤) · 우중충 · 눈물 ---------- */
function svgSoltbread() {
  const u = uid();
  return `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="bread-svg">
    <defs>
      <radialGradient id="sbB${u}" cx="0.4" cy="0.32" r="0.95">
        <stop offset="0" stop-color="#F6DEAE"/><stop offset="0.7" stop-color="#EAC17E"/><stop offset="1" stop-color="#D9A85E"/>
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="97" rx="40" ry="7.5" fill="#000" opacity="0.10"/>
    <!-- 통통한 소금롤 몸통 -->
    <path d="M16 64 C16 50 34 44 60 44 C86 44 104 50 104 64 C104 80 86 88 60 88 C34 88 16 80 16 64 Z" fill="url(#sbB${u})"/>
    <!-- 가운데 이음새 -->
    <path d="M60 45 C57 58 57 74 60 87" stroke="#c9924b" stroke-width="2" opacity="0.4" fill="none"/>
    <!-- 광택 -->
    <ellipse cx="42" cy="55" rx="14" ry="6" fill="#fff" opacity="0.32"/>
    <!-- 소금 알갱이 -->
    <circle cx="44" cy="52" r="1.5" fill="#fff"/><circle cx="70" cy="50" r="1.5" fill="#fff"/>
    <circle cx="80" cy="60" r="1.4" fill="#fff"/><circle cx="34" cy="62" r="1.3" fill="#fff"/>
    <!-- 축 처진 눈 -->
    <path d="M40 62 q6 5 12 0" stroke="#43291a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M68 62 q6 5 12 0" stroke="#43291a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <!-- 눈물 -->
    <path class="tear tear--l" d="M45 69 q-3 8 0 11 q3 -3 0 -11 Z" fill="#8fd3ff"/>
    <path class="tear tear--r" d="M75 69 q-3 8 0 11 q3 -3 0 -11 Z" fill="#8fd3ff"/>
    <!-- 시무룩 입 -->
    <path d="M55 76 q5 4 10 0" stroke="#8a5c34" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${cheek(35, 66)}${cheek(85, 66)}
  </svg>`;
}

/* ---------- 단팥빵 (앙금 도톰 번) ---------- */
function svgRedbean() {
  const u = uid();
  return `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="bread-svg">
    <defs>
      <radialGradient id="rbB${u}" cx="0.5" cy="0.2" r="0.95">
        <stop offset="0" stop-color="#F0A0A6"/><stop offset="0.4" stop-color="#EC8D82"/>
        <stop offset="0.72" stop-color="#E3A45E"/><stop offset="1" stop-color="#D9974D"/>
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="98" rx="37" ry="7.5" fill="#000" opacity="0.10"/>
    <!-- 도톰한 번 몸통 -->
    <path d="M22 68 C22 44 40 33 60 33 C80 33 98 44 98 68 C98 82 82 90 60 90 C38 90 22 82 22 68 Z" fill="url(#rbB${u})"/>
    <!-- 광택 -->
    <ellipse cx="46" cy="46" rx="14" ry="6.5" fill="#fff" opacity="0.28"/>
    <!-- 검은깨 송송(윗면) -->
    <g fill="#2f2018">
      <ellipse cx="56" cy="40" rx="1.5" ry="2.4"/><ellipse cx="64" cy="39" rx="1.5" ry="2.4" transform="rotate(18 64 39)"/>
      <ellipse cx="60" cy="44" rx="1.5" ry="2.4"/><ellipse cx="52" cy="43" rx="1.5" ry="2.4" transform="rotate(-16 52 43)"/>
      <ellipse cx="68" cy="43" rx="1.5" ry="2.4" transform="rotate(22 68 43)"/><ellipse cx="60" cy="38" rx="1.4" ry="2.2"/>
    </g>
    <!-- 바닥으로 삐져나온 앙금 -->
    <path d="M42 88 Q40 76 52 74 Q60 72.5 68 74 Q80 76 78 88 Q60 95 42 88 Z" fill="#5E2A2C"/>
    <path d="M48 82 q3 -2.5 6 0 M60 83 q3 -2.5 6 0" stroke="#7c3a3c" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="79" rx="2.4" ry="1.8" fill="#733537"/><ellipse cx="66" cy="80" rx="2.2" ry="1.7" fill="#733537"/>
    <!-- 얼굴 -->
    ${eye(48, 62)}${eye(72, 62)}
    <path d="M55 72 q5 3.5 10 0" stroke="#8a4a3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${cheek(35, 66)}${cheek(85, 66)}
  </svg>`;
}

/* ---------- 메론빵 (거북 멜론) · 두근두근 · 하트 ---------- */
function svgMelon() {
  const u = uid();
  return `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="bread-svg">
    <defs>
      <radialGradient id="mlBody${u}" cx="0.42" cy="0.55" r="0.9">
        <stop offset="0" stop-color="#EAF3C0"/><stop offset="1" stop-color="#D6E79C"/>
      </radialGradient>
      <radialGradient id="mlShell${u}" cx="0.4" cy="0.25" r="0.9">
        <stop offset="0" stop-color="#D7E88A"/><stop offset="0.7" stop-color="#BBD469"/><stop offset="1" stop-color="#A6C356"/>
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="99" rx="36" ry="7.5" fill="#000" opacity="0.10"/>
    <!-- 아기 발 -->
    <ellipse cx="34" cy="88" rx="8" ry="6" fill="#DBE9A2"/><ellipse cx="86" cy="88" rx="8" ry="6" fill="#DBE9A2"/>
    <ellipse cx="46" cy="94" rx="7" ry="5" fill="#DBE9A2"/><ellipse cx="74" cy="94" rx="7" ry="5" fill="#DBE9A2"/>
    <!-- 얼굴/몸 밝은 부분 -->
    <path d="M24 70 C24 54 40 46 60 46 C80 46 96 54 96 70 C96 84 80 90 60 90 C40 90 24 84 24 70 Z" fill="url(#mlBody${u})"/>
    <!-- 초록 등딱지 캡 -->
    <path d="M26 62 C26 42 42 32 60 32 C78 32 94 42 94 62 C94 66 84 66 60 66 C36 66 26 66 26 62 Z" fill="url(#mlShell${u})"/>
    <!-- 격자 무늬 -->
    <g stroke="#9cbb52" stroke-width="2.1" opacity="0.8" fill="none">
      <path d="M42 34 L40 65"/><path d="M54 33 L53 66"/><path d="M66 33 L67 66"/><path d="M78 34 L80 65"/>
      <path d="M28 46 Q60 41 92 46"/><path d="M27 58 Q60 53 93 58"/>
    </g>
    <ellipse cx="44" cy="44" rx="12" ry="5.5" fill="#fff" opacity="0.3"/>
    <!-- 크고 반짝이는 눈 -->
    ${eye(48, 70, 1.5)}${eye(72, 70, 1.5)}
    <!-- 방긋 입 -->
    <path d="M53 80 q7 5 14 0" stroke="#6f8a3a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    ${cheek(33, 74)}${cheek(87, 74)}
    <!-- 둥실 하트 -->
    <path class="mheart mheart--1" d="M98 38 c2-4 8-3 8 2 c0 4-8 8-8 8 c0 0-8-4-8-8 c0-5 6-6 8-2 Z" fill="#FF7E9B"/>
    <path class="mheart mheart--2" d="M20 44 c1.4-3 6-2 6 1.6 c0 3-6 6-6 6 c0 0-6-3-6-6 c0-3.6 4.6-4.6 6-1.6 Z" fill="#FF7E9B"/>
  </svg>`;
}

/* 빵 목록 (각 테마별 화면 분위기 포함) */
const BREADS = [
  {
    id: 'soltbread',
    name: '소금빵',
    theme: 'gloomy',
    emoji: '🥖',
    fortune: '오늘의 빵 한 조각: 주변 사람에게 따뜻한 소금빵 같은 위로를 건네보세요.',
    voice: '흑흑… 그래도 짭조름한 위로는 내가 최고야…',
    svg: svgSoltbread,
  },
  {
    id: 'redbean',
    name: '단팥빵',
    theme: 'smart',
    emoji: '🫘',
    fortune: '오늘의 빵 한 조각: 속이 꽉 찬 단팥처럼, 차분히 아는 것을 나누면 좋은 일이 생겨요.',
    voice: '흐음, 오늘은 지혜가 팥소처럼 가득 차오르는 날이군.',
    svg: svgRedbean,
  },
  {
    id: 'loaf',
    name: '식빵',
    theme: 'muscle',
    emoji: '🍞',
    fortune: '오늘의 빵 한 조각: 두려워 말고 밀어붙여요! 오늘의 당신은 식빵처럼 든든합니다.',
    voice: '가보자고! 오늘 네 멘탈은 통밀 100%다!',
    svg: svgLoaf,
  },
  {
    id: 'croissant',
    name: '크루아상',
    theme: 'hip',
    emoji: '🥐',
    fortune: '오늘의 빵 한 조각: 결이 다른 선택이 정답. 남들과 다른 길에서 빛이 나요.',
    voice: 'Yo, 오늘의 바이브는 겹겹이 힙해. 결대로 가.',
    svg: svgCroissant,
  },
  {
    id: 'melon',
    name: '메론빵',
    theme: 'flutter',
    emoji: '🍈',
    fortune: '오늘의 빵 한 조각: 두근두근! 설레는 만남이나 소식이 찾아올지도 몰라요.',
    voice: '두근두근… 오늘 뭔가 달콤한 일이 생길 것 같아!',
    svg: svgMelon,
  },
];
