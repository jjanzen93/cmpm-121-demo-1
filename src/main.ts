import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Salami Selector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "&#128516";
app.append(button);
