const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// إعدادات
const blockSize = 32;
const worldWidth = 200;
const worldHeight = 40;

let world = [];
let player = {
    x: 50 * blockSize,
    y: 10 * blockSize,
    w: 22,
    h: 40,
    vx: 0,
    vy: 0,
    speed: 4,
    jump: -12,
    onGround: false
};

let camera = { x: 0, y: 0 };

// توليد العالم
function generateWorld() {
    for (let x = 0; x < worldWidth; x++) {
        world[x] = [];
        let ground = 20 + Math.floor(Math.sin(x * 0.15) * 5);
        for (let y = 0; y < worldHeight; y++) {
            if (y === ground) world[x][y] = 1;
            else if (y > ground) world[x][y] = 2;
            else world[x][y] = 0;
        }
    }
}

// الحركة
function update() {
    if (moveL) player.vx = -player.speed;
    else if (moveR) player.vx = player.speed;
    else player.vx = 0;

    if (moveJ && player.onGround) {
        player.vy = player.jump;
        player.onGround = false;
    }

    player.vy += 0.8;

    player.x += player.vx;
    checkCollision(true);

    player.y += player.vy;
    checkCollision(false);

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
}

// الرسم
function draw() {
    ctx.fillStyle = "#72a7ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let sx = Math.floor(camera.x / blockSize);
    let ex = sx + Math.ceil(canvas.width / blockSize);

    for (let x = sx; x < ex; x++) {
        if (!world[x]) continue;
        for (let y = 0; y < worldHeight; y++) {
            if (world[x][y] !== 0) {
                ctx.fillStyle = "#59a135";
                ctx.fillRect(
                    x * blockSize - camera.x,
                    y * blockSize - camera.y,
                    blockSize,
                    blockSize
                );
            }
        }
    }

    // اللاعب
    ctx.fillStyle = "#3c5fa2";
    ctx.fillRect(
        player.x - camera.x,
        player.y - camera.y,
        player.w,
        player.h
    );
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// تشغيل
loadGame();
loop();

window.onresize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};
