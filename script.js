/* =========================================================
   빵춘쿠키 · 로직
   순수 JS · 의존성 없음
   ========================================================= */
(function () {
  'use strict';

  const app        = document.getElementById('app');
  const scIntro    = document.getElementById('screen-intro');
  const scToaster  = document.getElementById('screen-toaster');
  const scResult   = document.getElementById('screen-result');

  const toaster    = document.getElementById('toaster');
  const lever      = document.getElementById('lever');
  const pushBtn    = document.getElementById('push-btn');
  const peekBread  = document.getElementById('peek-bread');

  const resultBread = document.getElementById('result-bread');
  const fortuneName = document.getElementById('fortune-name');
  const fortuneText = document.getElementById('fortune-text');
  const retryBtn    = document.getElementById('retry-btn');

  const THEME_CLASSES = ['theme-gloomy','theme-smart','theme-muscle','theme-hip','theme-flutter'];
  let isBaking = false;

  /* ---------- 화면 전환 ---------- */
  function show(screen) {
    [scIntro, scToaster, scResult].forEach(s => s.classList.remove('is-active'));
    screen.classList.add('is-active');
  }

  /* ---------- 사운드 (Web Audio, 파일 의존성 없음) ---------- */
  let actx = null;
  function ac() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) actx = new AC();
    }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  // 부르르 떨리는 저음 진동
  function playRumble(duration) {
    const ctx = ac(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, ctx.currentTime);
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 18;         // 떨림 속도
    lfoGain.gain.value = 12;
    lfo.connect(lfoGain).connect(osc.frequency);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.09, ctx.currentTime + duration - 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); lfo.start();
    osc.stop(ctx.currentTime + duration);
    lfo.stop(ctx.currentTime + duration);
  }
  // 탁! 튀어나오는 소리
  function playPop() {
    const ctx = ac(); if (!ctx) return;
    // 스프링 "팅"
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.26);
    // "탁" 노이즈 클릭
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random()*2-1) * (1 - i/data.length);
    const noise = ctx.createBufferSource();
    const ng = ctx.createGain();
    ng.gain.value = 0.3;
    noise.buffer = buf;
    noise.connect(ng).connect(ctx.destination);
    noise.start();
  }

  /* ---------- 빵 굽기 시퀀스 ---------- */
  function bake() {
    if (isBaking) return;
    isBaking = true;
    pushBtn.disabled = true;

    // 오늘의 빵 랜덤 선택
    const bread = BREADS[Math.floor(Math.random() * BREADS.length)];

    // 슬롯에서 살짝 미리보기
    peekBread.innerHTML = bread.svg();

    // 흔들림 시작 (1~2초)
    const shakeMs = 1200 + Math.random() * 800;
    toaster.classList.add('is-shaking');
    playRumble(shakeMs / 1000);

    // 빵이 슬롯 위로 조금씩 떠오르는 미리보기
    peekBread.animate(
      [
        { transform: 'translateX(-50%) translateY(40px)', opacity: 0 },
        { transform: 'translateX(-50%) translateY(18px)', opacity: .9 },
      ],
      { duration: shakeMs, easing: 'ease-out', fill: 'forwards' }
    );

    setTimeout(() => {
      toaster.classList.remove('is-shaking');
      playPop();
      reveal(bread);
      isBaking = false;
      pushBtn.disabled = false;
    }, shakeMs);
  }

  /* ---------- 결과 노출 ---------- */
  function reveal(bread) {
    // 테마 배경 적용
    THEME_CLASSES.forEach(c => app.classList.remove(c));
    app.classList.add('theme-' + bread.theme);

    // 빵 + 문구 채우기 (토스터기는 화면 전환으로 사라짐)
    resultBread.innerHTML = bread.svg();
    fortuneName.textContent = bread.name;
    fortuneText.textContent = bread.fortune;

    show(scResult);

    // 튀어오르는 팝 애니메이션 재시작
    resultBread.classList.remove('is-pop');
    void resultBread.offsetWidth;
    resultBread.classList.add('is-pop');

    // peek 초기화
    peekBread.getAnimations().forEach(a => a.cancel());
    peekBread.style.opacity = 0;
  }

  /* ---------- 레버 드래그 ---------- */
  function setupLever() {
    const RANGE = 62;           // 최대 내려가는 거리(px)
    const TRIGGER = 48;         // 발동 임계값
    let dragging = false, startY = 0, cur = 0;

    function down(e) {
      if (isBaking) return;
      dragging = true;
      startY = (e.touches ? e.touches[0].clientY : e.clientY);
      lever.setPointerCapture && e.pointerId != null && lever.setPointerCapture(e.pointerId);
    }
    function move(e) {
      if (!dragging) return;
      const y = (e.touches ? e.touches[0].clientY : e.clientY);
      cur = Math.max(0, Math.min(RANGE, y - startY));
      lever.style.top = cur + 'px';
      lever.setAttribute('aria-valuenow', Math.round(cur / RANGE * 100));
      if (e.cancelable) e.preventDefault();
    }
    function up() {
      if (!dragging) return;
      dragging = false;
      if (cur >= TRIGGER) {
        // 발동!
        lever.style.top = RANGE + 'px';
        bake();
        setTimeout(resetLever, 900);
      } else {
        resetLever();
      }
    }
    function resetLever() {
      cur = 0;
      lever.style.transition = 'top .25s ease';
      lever.style.top = '0px';
      lever.setAttribute('aria-valuenow', 0);
      setTimeout(() => (lever.style.transition = ''), 260);
    }

    lever.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    // 키보드 접근성: 엔터/스페이스로 발동
    lever.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bake(); }
    });
  }

  /* ---------- 이벤트 바인딩 ---------- */
  // 인트로 → 토스터 (클릭/키/터치)
  scIntro.addEventListener('click', () => { ac(); show(scToaster); });
  scIntro.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { ac(); show(scToaster); }
  });

  pushBtn.addEventListener('click', bake);
  // 토스터 본체 클릭도 굽기 (레버 영역 제외)
  toaster.addEventListener('click', e => {
    if (e.target.closest('.lever')) return;
    bake();
  });
  toaster.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bake(); }
  });

  retryBtn.addEventListener('click', () => {
    THEME_CLASSES.forEach(c => app.classList.remove(c));
    show(scToaster);
  });

  setupLever();
})();
