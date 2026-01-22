import { createRectangle, createText, createCircle } from "./elements/create.js";

document.getElementById("add-rect-btn").addEventListener('click', createRectangle);
document.getElementById('add-text-btn').addEventListener('click', createText);
document.getElementById('add-circle-btn').addEventListener('click', createCircle);