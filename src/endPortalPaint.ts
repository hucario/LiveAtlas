const c = [
	'6,  9,  48',
	'13, 21, 45',
	'3,  5,  30',
	'30, 48, 98',
	'21, 12, 50',
	'28, 68, 64',
	'28, 68, 64', // Unlikely to ever happen /shrug
];
let portalPaused = true;
const canv = document.getElementById("endPortal_canv") as HTMLCanvasElement;
const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
let width = canv.width = window.innerWidth;
let height = canv.height = window.innerHeight;
const minSize = 3;
const maxSize = 7;
export function setPauseState(paused: boolean) {
	portalPaused = paused;
	width = canv.width = window.innerWidth;
	height = canv.height = window.innerHeight;
	if (paused) {
		if (canv) {
			canv.style.opacity = "0";
		}
	} else {
		if (canv) {
			canv.style.opacity = "1";
		}
		paintPortal();
	}
}
let particles: number[][] = [];

for (let i = 0; i < ((window.innerWidth * window.innerHeight) / 1000); i++) {
	particles.push([
		Math.floor(Math.random() * width),
		Math.floor(Math.random() * height),
		Math.floor(Math.random() * (maxSize - minSize)) + minSize,
		Math.floor(Math.random() * 15000) + 5000,
		Date.now() - 5000,
		Math.round(Math.random() * 3),
		Math.floor(Math.random() * (c.length - 2)) + 1
	])
}

let t0 = Date.now();
function paintPortal() {
	if (portalPaused) {
	return;
	}

	let delta = (Date.now() - t0);
	t0 = Date.now();
	ctx.fillStyle = "#010812";
	ctx.fillRect(0, 0, width, height);

	let count = ((window.innerWidth * window.innerHeight) / 1000);

	for (let i = 0; i < count; i++) {
	let x, y, w, life_total, life_pct, speed, col;
	if (particles[i]) {
		let d;
		[x, y, w, life_total, d, speed, col] = particles[i];
		life_pct = (Date.now() - d) / life_total;
		if (life_pct > 1) {
		particles.splice(i, 1);
		continue;
		}
	} else {
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);
		w = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
		life_total = Math.floor(Math.random() * 15000) + 5000;
		speed = Math.round(Math.random() * 3);
		life_pct = 0;
		col = Math.floor(Math.random() * (c.length - 2)) + 1;
		particles[i] = [x, y, w, life_total, Date.now(), speed, col];
	}

	x += speed * (delta / 200);
	ctx.fillStyle = `rgba(${c[col]}, ${
		life_pct < 0.5 ? 
		(life_pct * 2) : (1 - life_pct) * 2
	})`;

	particles[i][0] = x;

	ctx.fillRect(x, y, w, 2);
	}
	requestAnimationFrame(paintPortal);
}