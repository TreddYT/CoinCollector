const UPDATES_PER_SECOND = 20;
const FRAMES_PER_SECOND = 30;

const gameState = {
    totalGold: 0,
    goldPerClick: 1,
    goldPerSecond: 1
}

const coin = document.getElementById("coin");
const goldCount = document.getElementById("gold-count");
const goldPerSecond = document.getElementById("gold-per-second");

coin.addEventListener("click", () => {
    gameState.totalGold += gameState.goldPerClick;
});

const update = () => {
    gameState.totalGold += gameState.goldPerSecond / UPDATES_PER_SECOND;
};

const render = () => {
    goldCount.textContent = gameState.totalGold.toFixed(0);
    goldPerSecond.textContent = gameState.goldPerSecond;
};

setInterval(update, 1000 / UPDATES_PER_SECOND);
setInterval(render, 1000 / FRAMES_PER_SECOND);