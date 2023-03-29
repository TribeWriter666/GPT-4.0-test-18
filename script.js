const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const angleStep = Math.PI / 6;
const branchLengthFactor = 0.67;

function drawBranch(x, y, length, angle, depth) {
  if (depth <= 0) return;

  const x2 = x + Math.cos(angle) * length;
  const y2 = y + Math.sin(angle) * length;

  ctx.strokeStyle = `rgba(0, 0, 0, ${depth / 8})`;
  ctx.lineWidth = depth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  drawBranch(x2, y2, length * branchLengthFactor, angle - angleStep, depth - 1);
  drawBranch(x2, y2, length * branchLengthFactor, angle + angleStep, depth - 1);
}

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const angle = (Math.sin(Date.now() * 0.001) * 0.5 + 0.5) * Math.PI * 2;
  drawBranch(canvas.width / 2, canvas.height, canvas.height * 0.3, angle, 8);

  requestAnimationFrame(animate);
}

animate();
