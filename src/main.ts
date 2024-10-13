import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steak Selector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// set up scoring
function increaseScore(score: number, increase: number) {
    return score + increase;
}
let growth_factor = 0;
let num_steak: number = 0;

// make steak button
const steak_button = document.createElement("button");
steak_button.innerHTML = "&#129385";
app.append(steak_button);
app.append(document.createElement("br"));

interface Item {
    name: string,
    cost: number,
    rate: number
};

interface Upgrade {
    button: HTMLButtonElement,
    amount: number
};
  
const availableItems : Item[] = [
    {name: "Buy Cow Farm", cost: 10, rate: 0.1},
    {name: "Upgrade Slaughterhouse", cost: 100, rate: 2},
    {name: "Build Packing Facility", cost: 1000, rate: 50}
];

const buttons : Upgrade[] = [];

// create buttons
for (const element of availableItems) {
    const upgrade : Upgrade = {button: document.createElement("button"), amount: 0};
    buttons.push(upgrade);
    upgrade.button.innerHTML = `${element.name} (You have ${upgrade.amount}.)`;
    app.append(upgrade.button);
    app.append(document.createElement("br"));
    upgrade.button.disabled = true;
};

const num_div = document.createElement("div");
num_div.innerHTML = `You have made ${num_steak} steaks!`;
app.append(num_div);

function createSteak(current_increase: number) {
    num_steak = increaseScore(num_steak, current_increase);
    num_div.innerHTML = `You have made ${num_steak.toFixed(1)} steaks!`;
};

// display current growth rate
const growth_div = document.createElement("div");
growth_div.innerHTML = `${growth_factor.toFixed(1)} steaks/sec`;
app.append(growth_div);

// steak button listener
steak_button.onclick = () => {
    createSteak(1);
};

// upgrade button listeners
buttons.forEach(
    (current_button) => {
        const current_item = availableItems[buttons.indexOf(current_button)];
        current_button.button.onclick = () => {
            num_steak -= current_item.cost;
            current_item.cost *= 1.15;
            current_button.amount++;
            current_button.button.innerHTML = `${current_item.name} (You have ${current_button.amount}.)`;
            growth_factor += current_item.rate;
            growth_div.innerHTML = `${growth_factor.toFixed(1)} steaks/sec`;
        };
    }
);

let last_time: number = performance.now();

function update(timestamp: number) {
    const time_elapsed: number = timestamp - last_time;
    // update score by growth rate
    createSteak((time_elapsed/1000)*growth_factor);
    // update time
    last_time = timestamp;
    // check item affordability
    buttons.forEach(
        (current_button) => {
            const current_item = availableItems[buttons.indexOf(current_button)];
            if (num_steak >= current_item.cost) {
                current_button.button.disabled = false;
            } else {
                current_button.button.disabled = true;
            };
        }
    );
    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
