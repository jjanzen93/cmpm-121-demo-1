import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steak Selector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

function increaseScore(score: number) {
    return score + 1;
}

const button = document.createElement("button");
button.innerHTML = "&#129385";


let num_steak: number = 0;

const listen_div = document.createElement("div");
listen_div.innerHTML = `You have made ${num_steak} steaks!`;
app.append(listen_div);

function createSteak() {
    num_steak = increaseScore(num_steak);
    listen_div.innerHTML = `You have made ${num_steak} steaks!`;
}

button.onclick = () => {
    createSteak();
}

app.append(button);

window.setInterval(createSteak, 1000);
