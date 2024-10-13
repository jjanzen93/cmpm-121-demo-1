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

// upgrade A information
const a_upgrade_cost = 10;
const a_growth_increase = 0.1;
const a_upgrade_button = document.createElement("button");
a_upgrade_button.innerHTML = `Upgrade Cow Feed (Costs ${a_upgrade_cost} Steaks)`
app.append(a_upgrade_button);
a_upgrade_button.disabled = true;

// upgrade B information
const b_upgrade_cost = 100;
const b_growth_increase = 2;
const b_upgrade_button = document.createElement("button");
b_upgrade_button.innerHTML = `Upgrade Meat Quality (Costs ${b_upgrade_cost} Steaks)`
app.append(b_upgrade_button);
b_upgrade_button.disabled = true;

// upgrade C information
const c_upgrade_cost = 1000;
const c_growth_increase = 50;
const c_upgrade_button = document.createElement("button");
c_upgrade_button.innerHTML = `Upgrade Packing Facility (Costs ${c_upgrade_cost} Steaks)`
app.append(c_upgrade_button);
c_upgrade_button.disabled = true;

// display current steaks
const listen_div = document.createElement("div");
listen_div.innerHTML = `You have made ${num_steak} steaks!`;
app.append(listen_div);

function createSteak(current_increase: number) {
    num_steak = increaseScore(num_steak, current_increase);
    listen_div.innerHTML = `You have made ${num_steak.toFixed(1)} steaks!`;
}

steak_button.onclick = () => {
    createSteak(1);
}

a_upgrade_button.onclick = () => {
    num_steak -= a_upgrade_cost;
    growth_factor += a_growth_increase;
}

b_upgrade_button.onclick = () => {
    num_steak -= b_upgrade_cost;
    growth_factor += b_growth_increase;
}

c_upgrade_button.onclick = () => {
    num_steak -= c_upgrade_cost;
    growth_factor += c_growth_increase;
}


let last_time: number = performance.now();

function update(timestamp: number) {
    const time_elapsed: number = timestamp - last_time;
    createSteak((time_elapsed/1000)*growth_factor);
    last_time = timestamp;
    if (num_steak >= a_upgrade_cost) {
        a_upgrade_button.disabled = false;
    } else {
        a_upgrade_button.disabled = true;
    }
    if (num_steak >= b_upgrade_cost) {
        b_upgrade_button.disabled = false;
    } else {
        b_upgrade_button.disabled = true;
    }
    if (num_steak >= c_upgrade_cost) {
        c_upgrade_button.disabled = false;
    } else {
        c_upgrade_button.disabled = true;
    }
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
