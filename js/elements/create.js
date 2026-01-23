import { addElement, setSelectedElementId, getNextElementPosition, saveToLocalStorage} from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { generateId } from "../utils/id.js";
import { renderLayers } from "../panels/layer.js";
import { renderProperties } from "../panels/properties.js";

function createRectangle() {
    let rectangleObject =  {
        id: generateId(),
        type: "rect",
        position: getNextElementPosition(),
        size: {width: 200, height: 200},
        rotation: 0,
        styles: {backgroundColor: "#2563eb"},
        content: null
    };

    addElement(rectangleObject);
    saveToLocalStorage();
    setSelectedElementId(rectangleObject.id);
    renderCanvas();
    renderLayers();
    renderProperties();
}

function createText() {
    let textObject = {
        id: generateId(),
        type: "text",
        position: getNextElementPosition(),
        size: {width: 120, height: 40},
        rotation: 0,
        styles: {},
        content: "Type here"
    };

    addElement(textObject);
    saveToLocalStorage();
    setSelectedElementId(textObject.id);
    renderCanvas();
    renderLayers();
    renderProperties();
}

function createCircle() {
    let circleObject = {
        id: generateId(),
        type: "circle",
        position: getNextElementPosition(),
        size: {width: 200, height: 200},
        rotation: 0,
        styles: {backgroundColor: "#2563eb", borderRadius: 50},
        content: null
    };

    addElement(circleObject);
    saveToLocalStorage();
    setSelectedElementId(circleObject.id);
    renderCanvas();
    renderLayers();
    renderProperties();
}

export {createRectangle, createText, createCircle};