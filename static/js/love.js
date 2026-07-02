// ─── Love section: full-page y2k glitter — Safari-safe ───────────────────────
(function () {
  var canvas = document.getElementById('lv-glitter');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];
  var PALETTE = [
    '#ff9ecd','#ffc8e0','#ffffff','#f0a0c8',
    '#e8d0e8','#ffb3d9','#d4a0c0','#ffe0f0',
    '#f8c0d8','#e890b8'
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function drawHeart(x, y, size) {
    ctx.save(); ctx.translate(x, y); ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-0.5, -0.5, -1, 0.2, 0, 1);
    ctx.bezierCurveTo(1, 0.2, 0.5, -0.5, 0, 0);
    ctx.fill(); ctx.restore();
  }

  function draw4Star(x, y, r) {
    ctx.save(); ctx.translate(x, y);
    ctx.beginPath();
    for (var i = 0; i < 8; i++) {
      var angle = (i * Math.PI) / 4;
      var dist  = (i % 2 === 0) ? r : r * 0.28;
      if (i === 0) ctx.moveTo(Math.cos(angle)*dist, Math.sin(angle)*dist);
      else         ctx.lineTo(Math.cos(angle)*dist, Math.sin(angle)*dist);
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function makeParticle() {
    var rnd = Math.random();
    var p = {
      x:    Math.random() * W,
      y:    Math.random() * H,
      size: Math.random() * 2.8 + 0.6,
      peak: Math.random() * 0.75 + 0.15,
      life: Math.random() * 160 + 80,
      age:  Math.floor(Math.random() * 140),
      dx:   (Math.random() - 0.5) * 0.35,
      dy:   Math.random() * 0.18 - 0.06,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      type: rnd < 0.38 ? 'circle' : rnd < 0.6 ? 'cross' : rnd < 0.8 ? 'heart' : 'star',
      alpha: 0
    };
    return p;
  }

  function resetParticle(p) {
    var rnd = Math.random();
    p.x = Math.random() * W; p.y = Math.random() * H;
    p.size = Math.random() * 2.8 + 0.6;
    p.peak = Math.random() * 0.75 + 0.15;
    p.life = Math.random() * 160 + 80; p.age = 0;
    p.dx = (Math.random() - 0.5) * 0.35;
    p.dy = Math.random() * 0.18 - 0.06;
    p.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    p.type = rnd < 0.38 ? 'circle' : rnd < 0.6 ? 'cross' : rnd < 0.8 ? 'heart' : 'star';
  }

  function updateParticle(p) {
    p.x += p.dx; p.y += p.dy; p.age++;
    var h = p.life / 2;
    p.alpha = p.age < h ? (p.age / h) * p.peak : ((p.life - p.age) / h) * p.peak;
    if (p.age >= p.life) resetParticle(p);
  }

  function drawParticle(p) {
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle   = p.color;
    if (p.type === 'circle') {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    } else if (p.type === 'cross') {
      var r = p.size;
      ctx.save(); ctx.translate(p.x, p.y);
      ctx.fillRect(-r*2.5, -r*0.45, r*5, r*0.9);
      ctx.fillRect(-r*0.45, -r*2.5, r*0.9, r*5);
      ctx.restore();
    } else if (p.type === 'heart') {
      drawHeart(p.x, p.y, p.size * 0.85);
    } else {
      draw4Star(p.x, p.y, p.size * 1.6);
    }
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < 220; i++) particles.push(makeParticle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) { updateParticle(particles[i]); drawParticle(particles[i]); }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();
