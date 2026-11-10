const canvas = document.getElementById("pipeline");

if (canvas) {
  const ctx = canvas.getContext("2d");
  resize();

  const nodes = Array.from({ length: 55 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 1.5) * 0.6,
    vy: (Math.random() - 1.5) * 0.6,
  }));

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0.5 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0.5 || n.y > canvas.height) n.vy *= -1;
    });

    nodes.forEach((a, i) => {
      nodes.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 160) {
          ctx.strokeStyle = `rgba(56,189,248,${1 - d / 160})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
}
