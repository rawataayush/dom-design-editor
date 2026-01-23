import {
    getSelectedElement,
    updateElement,
    saveToLocalStorage
} from "../state/store.js";

import { renderCanvas } from "../canvas/render.js";
import { renderLayers } from "./layer.js";

// DOM REFERENCES
const panel = document.querySelector(".properties");
const xInput = document.getElementById("prop-x");
const yInput = document.getElementById("prop-y");
const widthInput = document.getElementById("prop-width");
const heightInput = document.getElementById("prop-height");
const rotationInput = document.getElementById("prop-rotation");
const colorInput = document.getElementById("prop-bg-color");
const radiusInput = document.getElementById("prop-border-radius");
const textGroup = document.querySelector(".property-group--text");
const textInput = document.getElementById("prop-text-content");
const fontSizeInput = document.getElementById("prop-font-size");

// RENDER PROPERTIES
function renderProperties() {
    const elem = getSelectedElement();

    if (!elem) {
        panel.classList.add("is-disabled");

        textInput.value = "";
        widthInput.value = "";
        heightInput.value = "";
        xInput.value = "";
        yInput.value = "";
        rotationInput.value = "";
        radiusInput.value = "";
        fontSizeInput.value = "";

        return;
    }

    panel.classList.remove("is-disabled");

    xInput.value = elem.position.x;
    yInput.value = elem.position.y;

    widthInput.value = elem.size.width;
    heightInput.value = elem.size.height;

    rotationInput.value = elem.rotation || 0;

    colorInput.value = elem.styles?.backgroundColor || "#000000";
    radiusInput.value = elem.styles?.borderRadius || 0;

    fontSizeInput.value = elem.styles?.fontSize || 16;

    if (elem.type === "text") {
        textGroup.style.display = "block";
        textInput.value = elem.content || "";

        fontSizeInput.closest(".property").style.display = "block";
        radiusInput.closest(".property").style.display = "none";
    } else {
        textGroup.style.display = "none";
        textInput.value = "";

        fontSizeInput.closest(".property").style.display = "none";
        radiusInput.closest(".property").style.display = "block";
    }

    // INPUT HANDLERS

xInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem) return;

    updateElement(elem.id, {
        position: {
            ...elem.position,
            x: Number(xInput.value)
        }
    });
    saveToLocalStorage();
    renderCanvas();
})

yInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem) return

    updateElement(elem.id, {
        position: {
            ...elem.position, y: Number(yInput.value)
        }
    });
    saveToLocalStorage();
    renderCanvas();
})

widthInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem) return;

    updateElement(elem.id, {
        size: { ...elem.size, width: Number(widthInput.value) }
    });

    saveToLocalStorage();
    renderCanvas();
});

heightInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem) return;

    updateElement(elem.id, {
        size: { ...elem.size, height: Number(heightInput.value) }
    });

    saveToLocalStorage();
    renderCanvas();
});

rotationInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if(!elem) return;

    updateElement(elem.id, {
        rotation: Number(rotationInput.value)
    });
    saveToLocalStorage();
    renderCanvas();
})

colorInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem) return;

    updateElement(elem.id, {
        styles: { ...elem.styles, backgroundColor: colorInput.value }
    });

    saveToLocalStorage();
    renderCanvas();
});

radiusInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if(!elem) return;

    updateElement(elem.id, {
        styles: {
            ...elem.styles,
            borderRadius: Number(radiusInput.value)
        }
    });
    saveToLocalStorage();
    renderCanvas();
})

textInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if (!elem || elem.type !== "text") return;

    updateElement(elem.id, {
        content: textInput.value
    });

    saveToLocalStorage();
    renderCanvas();
    renderLayers();
});

fontSizeInput.addEventListener("input", () => {
    const elem = getSelectedElement();
    if(!elem || elem.type !== "text") return;

    updateElement(elem.id, {
        styles: {
            ...elem.styles, fontSize: Number(fontSizeInput.value)
        }
    });

    saveToLocalStorage();
    renderCanvas();
})
}

export { renderProperties };