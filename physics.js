function checkCollision(horizontal) {
    let l = Math.floor(player.x / blockSize);
    let r = Math.floor((player.x + player.w) / blockSize);
    let t = Math.floor(player.y / blockSize);
    let b = Math.floor((player.y + player.h) / blockSize);

    for (let x = l; x <= r; x++) {
        for (let y = t; y <= b; y++) {
            if (!world[x] || world[x][y] === 0) continue;

            if (horizontal) {
                if (player.vx > 0) {
                    player.x = x * blockSize - player.w;
                } else if (player.vx < 0) {
                    player.x = (x + 1) * blockSize;
                }
                player.vx = 0;
                return;
            } else {
                if (player.vy > 0) {
                    player.y = y * blockSize - player.h;
                    player.vy = 0;
                    player.onGround = true;
                } else if (player.vy < 0) {
                    player.y = (y + 1) * blockSize;
                    player.vy = 0;
                }
                return;
            }
        }
    }
}
