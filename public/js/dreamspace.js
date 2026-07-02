// Full-page glitter for Dream Space
(function () {
  const canvas = document.getElementById('ds-glitter');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const PALETTE = [
    '#f8e0f4', '#e8b4d8', '#ffffff', '#d4b8f0',
    '#c890cc', '#fce4f8', '#e0d0f8', '#f0c0e8'
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Star {
    constructor() { this.spawn(); }
    spawn() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.5 + 0.2;
      this.alpha = 0;
      this.peak  = Math.random() * 0.7 + 0.15;
      this.life  = Math.random() * 180 + 80;
      this.age   = 0;
      this.drift = (Math.random() - 0.5) * 0.25;
      this.fall  = Math.random() * 0.15 + 0.03;
      this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      // occasional cross sparkle shape
      this.sparkle = Math.random() < 0.15;
    }
    update() {
      this.age++;
      this.x += this.drift;
      this.y += this.fall;
      const half = this.life / 2;
      this.alpha = this.age < half
        ? (this.age / half) * this.peak
        : ((this.life - this.age) / half) * this.peak;
      if (this.age >= this.life || this.y > H + 10) this.spawn();
    }
    draw() {
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = this.color;
      if (this.sparkle) {
        // 4-point cross
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillRect(-this.r * 2.5, -this.r * 0.4, this.r * 5, this.r * 0.8);
        ctx.fillRect(-this.r * 0.4, -this.r * 2.5, this.r * 0.8, this.r * 5);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 200 }, () => {
      const s = new Star();
      s.age = Math.floor(Math.random() * s.life); // stagger phases
      return s;
    });
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();
