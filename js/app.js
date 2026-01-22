import { createRectangle, createText } from "./elements/create.js";

document.getElementById("add-rect-btn").addEventListener('click', createRectangle);
document.getElementById('add-text-btn').addEventListener('click', createText);