const raw = document.getElementById("data")?.text;
const data = raw ? JSON.parse(raw) : { route: "index" };

export default data;

window.data = data;
