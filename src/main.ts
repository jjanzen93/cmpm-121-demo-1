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
let skip_available = true;
const SKIP_VALUES = [103, 97, 91, 89, 84];
const COST_INCREMENT = 1.15;

// make steak button
const steak_button = document.createElement("button");
steak_button.innerHTML = "&#129385";
app.append(steak_button);
app.append(document.createElement("br"));

const num_div = document.createElement("div");
num_div.innerHTML = `You have made ${num_steak} steaks!`;
app.append(num_div);

// display current growth rate
const growth_div = document.createElement("div");
growth_div.innerHTML = `${growth_factor.toFixed(1)} steaks/sec`;
app.append(growth_div);
app.append(document.createElement("br"));

interface Item {
    name: string,
    cost: number,
    rate: number,
    desc: string
};

interface Upgrade {
    button: HTMLButtonElement,
    amount: number
};
  
const availableItems : Item[] = [
    {name: "Buy Cow Farm", cost: 10, rate: 0.1, desc: "Purchase a nice cow farm in the totally non-fictional land of Wyoming."},
    {name: "Upgrade Slaughterhouse", cost: 100, rate: 2, desc: "Sharpen those blades and increase production!"},
    {name: "Build Packing Facility", cost: 1000, rate: 50, desc: "Construct a monolith to consumption and glutto- I mean the end of world hunger!"},
    {name: "Produce Carnivore Diet Advertisement", cost: 10000, rate: 1000, desc: "Get kids excited about eating steak-- and ONLY steak."},
    {name: "Fuel the Cowpocalypse", cost: 100000, rate: 20000, desc: "Fund the warring cow tribes. The more dead soldiers, the more meat to sell."}
];

const buttons : Upgrade[] = [];

// create buttons
for (const element of availableItems) {
    const upgrade : Upgrade = {button: document.createElement("button"), amount: 0};
    buttons.push(upgrade);
    upgrade.button.innerHTML = `${element.name} (You have ${upgrade.amount}.)`;
    app.append(upgrade.button);
    app.append(document.createElement("br"));
    const description = document.createElement("div");
    description.innerHTML = element.desc;
    app.append(description);
    app.append(document.createElement("br"));
    upgrade.button.disabled = true;
};


function createSteak(current_increase: number) {
    num_steak = increaseScore(num_steak, current_increase);
    num_div.innerHTML = `You have made ${num_steak.toFixed(1)} steaks!`;
};

// steak button listener
steak_button.onclick = () => {
    skip_available = false;
    createSteak(1);
};

// upgrade button listeners
buttons.forEach(
    (current_button) => {
        const current_item = availableItems[buttons.indexOf(current_button)];
        current_button.button.onclick = () => {
            num_steak -= current_item.cost;
            current_item.cost *= COST_INCREMENT;
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

// roommate skip

function skipItem(button_index:number) {
    availableItems[button_index].cost *= COST_INCREMENT;
    buttons[button_index].amount++;
    buttons[button_index].button.innerHTML = `${availableItems[button_index].name} (You have ${buttons[button_index].amount}.)`;
    growth_factor += availableItems[button_index].rate;
    growth_div.innerHTML = `${growth_factor.toFixed(1)} steaks/sec`;
}

function skipLoop() {
    buttons.forEach( (current_button) => {
        for (let i = 0; i < SKIP_VALUES[buttons.indexOf(current_button)]; i++) {
            skipItem(buttons.indexOf(current_button))
        }
    })
}

window.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter' && skip_available) {
        const password_prompt: string | null = prompt("Enter password", "Type here")
            if (password_prompt === "poo") {
                skip_available = false;
                skipLoop();
            }
        }
}); 

window.requestAnimationFrame(update);
