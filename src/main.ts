import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steak Selector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

function increaseScore(score: number, increase: number) {
    return score + increase;
}

const steak_button = document.createElement("button");
steak_button.innerHTML = "&#129385";
app.append(steak_button);

const upgrade_cost = 10;
const upgrade_button = document.createElement("button");
upgrade_button.innerHTML = `Upgrade (Costs ${upgrade_cost} Steaks)`
app.append(upgrade_button);
upgrade_button.disabled = true;

let num_steak: number = 0;

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

upgrade_button.onclick = () => {
    num_steak -= upgrade_cost;
}


let last_time: number = performance.now();

function update(timestamp: number) {
    const time_elapsed: number = timestamp - last_time;
    createSteak((time_elapsed/1000));
    last_time = timestamp;
    if (num_steak >= upgrade_cost) {
        upgrade_button.disabled = false;
    } else {
        upgrade_button.disabled = true;
    }
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
