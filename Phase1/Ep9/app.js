const UPDATES_PER_SECOND = 20;
const FRAMES_PER_SECOND = 30;

// Gamestate
const gameState = {
    totalGold: 0,
    goldPerClick: 1,
    goldPerSecond: 0,

    buildings: [
        {
            name: "Miner",
            cost: 10,
            goldPerSecond: 0.1,
            total: 0
        },
        {
            name: "Blacksmith",
            cost: 100,
            goldPerSecond: 1,
            total: 0
        },
        {
            name: "Tavern",
            cost: 750,
            goldPerSecond: 8,
            total: 0
        },
        {
            name: "Trade Caravan",
            cost: 5000,
            goldPerSecond: 35,
            total: 0
        },
        {
            name: "Bank Vault",
            cost: 25000,
            goldPerSecond: 160,
            total: 0
        }
    ]
}

// DOM Elements
const coin = document.getElementById("coin");
const goldCount = document.getElementById("gold-count");
const goldPerSecond = document.getElementById("gold-per-second");
const buildingContainer = document.getElementById("buildings-container");


// Clicking for Gold
coin.addEventListener("click", () => {
    gameState.totalGold += gameState.goldPerClick;
});

// Set up Buildings
gameState.buildings.forEach((building) => {
    const buildingDiv = document.createElement("div");
    buildingDiv.classList.add("building");

    // Name
    const nameP = document.createElement("p");
    nameP.textContent = building.name;

    // Gold per Second
    const gpsP = document.createElement("p");
    gpsP.textContent = `GpS: ${building.goldPerSecond}`;

    // Total
    const totalP = document.createElement("p");
    totalP.textContent = `Total: ${building.total}`;

    // Current Cost
    const costP = document.createElement("p");
    costP.textContent = `Cost: ${building.cost}`;

    buildingDiv.appendChild(nameP);
    buildingDiv.appendChild(gpsP);
    buildingDiv.appendChild(totalP);
    buildingDiv.appendChild(costP);

    buildingContainer.appendChild(buildingDiv);
});

// Game Loop
const update = () => {
    gameState.totalGold += gameState.goldPerSecond / UPDATES_PER_SECOND;
};

const render = () => {
    goldCount.textContent = truncDecimal(gameState.totalGold);
    goldPerSecond.textContent = gameState.goldPerSecond;
};

setInterval(update, 1000 / UPDATES_PER_SECOND);
setInterval(render, 1000 / FRAMES_PER_SECOND);