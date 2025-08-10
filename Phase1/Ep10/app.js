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
            total: 0,
            costRateIncrease: 1.13,
            image: "pickaxe.png"
        },
        {
            name: "Blacksmith",
            cost: 100,
            goldPerSecond: 1,
            total: 0,
            costRateIncrease: 1.14,
            image: "hammer.png"
        },
        {
            name: "Tavern",
            cost: 750,
            goldPerSecond: 8,
            total: 0,
            costRateIncrease: 1.15,
            image: "wine.png"
        },
        {
            name: "Trade Caravan",
            cost: 5000,
            goldPerSecond: 35,
            total: 0,
            costRateIncrease: 1.16,
            image: "collect.png"
        },
        {
            name: "Bank Vault",
            cost: 25000,
            goldPerSecond: 160,
            total: 0,
            costRateIncrease: 1.17,
            image: "chest.png"
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

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("building-icon-wrapper");

    const iconImg = document.createElement("img");
    iconImg.setAttribute("alt", `${building.name} icon`);
    iconImg.setAttribute("src", `./images/${building.image}`);
    iconImg.classList.add("building-icon");

    iconWrapper.appendChild(iconImg);

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

    // Buy Button
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("buy-button-wrapper");

    const buyButton = document.createElement("button");
    buyButton.textContent = "Purchase";
    buyButton.classList.add("buy-button");

    buyButton.addEventListener("click", () => {
        if (gameState.totalGold >= building.cost) {
            gameState.totalGold -= building.cost;

            gameState.goldPerSecond = Math.round((gameState.goldPerSecond + building.goldPerSecond) * 10) / 10;

            building.total++;
            building.cost = Math.round(building.cost *= building.costRateIncrease);

            totalP.textContent = `Total: ${building.total}`;
            costP.textContent = `Cost: ${building.cost}`;
        };
    });

    building.button = buyButton;

    buttonWrapper.appendChild(buyButton);

    buildingDiv.appendChild(iconWrapper);
    buildingDiv.appendChild(nameP);
    buildingDiv.appendChild(gpsP);
    buildingDiv.appendChild(totalP);
    buildingDiv.appendChild(costP);
    buildingDiv.appendChild(buttonWrapper);

    buildingContainer.appendChild(buildingDiv);
});

const truncDecimal = (num) => {
    const str = num.toString();
    const decIndex = str.indexOf('.');
    if (decIndex === -1) {
        return str;
    }
    return str.slice(0, decIndex);
};

// Game Loop
const update = () => {
    gameState.totalGold += gameState.goldPerSecond / UPDATES_PER_SECOND;

    gameState.buildings.forEach((building) => {
        building.button.disabled = !(gameState.totalGold >= building.cost);
    });
};

const render = () => {
    goldCount.textContent = truncDecimal(gameState.totalGold);
    goldPerSecond.textContent = gameState.goldPerSecond;
};

setInterval(update, 1000 / UPDATES_PER_SECOND);
setInterval(render, 1000 / FRAMES_PER_SECOND);