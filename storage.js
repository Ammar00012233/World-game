function saveGame() {
    localStorage.setItem("world", JSON.stringify(world));
    localStorage.setItem("player", JSON.stringify({
        x: player.x,
        y: player.y
    }));
}

function loadGame() {
    const w = localStorage.getItem("world");
    const p = localStorage.getItem("player");

    if (w && p) {
        world = JSON.parse(w);
        const pos = JSON.parse(p);
        player.x = pos.x;
        player.y = pos.y;
    } else {
        generateWorld();
    }
}

// حفظ تلقائي كل 3 ثواني
setInterval(saveGame, 3000);
