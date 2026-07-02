// Glitter effect for Dream Space door
(function () {
  const door = document.querySelector('.door--dream .door__inner');
  if (!door) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.55;';
  door.insertBefore(canvas, door.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = door.offsetWidth;
    H = canvas.height = door.offsetHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.4 + 0.3;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.speed = Math.random() * 0.3 + 0.05;
    this.dir   = Math.random() * Math.PI * 2;
    // pinks, whites, soft lavenders
    const palette = ['#f0c8e8','#ffffff','#e8a8d8','#d4b8f0','#fce8f8','#c890d0'];
    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.life  = Math.random() * 200 + 80;
    this.age   = 0;
  };
  Particle.prototype.update = function () {
    this.x += Math.cos(this.dir) * this.speed;
    this.y += Math.sin(this.dir) * this.speed + 0.08;
    this.age++;
    if (this.age > this.life || this.y > H) this.reset();
  };
  Particle.prototype.draw = function () {
    const fade = this.age < 20 ? this.age / 20 : this.age > this.life - 20 ? (this.life - this.age) / 20 : 1;
    ctx.globalAlpha = this.alpha * fade;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  function init() {
    resize();
    particles = Array.from({length: 120}, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  loop();
})();
