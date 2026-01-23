let elements = [];
let selectedElementId = null;


function getElements() {
    return elements;
}

function getSelectedElementId() {
    return selectedElementId;
}

function getSelectedElement() {
    if(!selectedElementId) return null;
    return elements.find(elem => elem.id === selectedElementId) || null;
}

function getNextElementPosition() {
    const baseX = 200;
    const baseY = 120;

    const offsetStep = 20;
    const offset = elements.length * offsetStep;

    return {
        x: baseX + offset,
        y: baseY + offset
    };
}

function bringToFront(id) {
    const maxZ = Math.max(...elements.map(e => e.zIndex || 0));
    const elem = elements.find(e => e.id === id);
    if (elem) elem.zIndex = maxZ + 1;
}

function addElement(elem){
    const maxZ = elements.length? Math.max(...elements.map(e => e.zIndex || 0))
    : 0;
    elem.zIndex = maxZ + 1;
    elements.push(elem);
}

function removeElement(id){
    elements = elements.filter(elem => elem.id !== id);
    if(selectedElementId === id){
        selectedElementId = null;
    }
}

function updateElement(id, updates){
    let element = elements.find(elem => elem.id === id);
    if(!element) return;

    if(updates.position) element.position = updates.position;
    if(updates.size) element.size = updates.size;
    if(updates.styles) element.styles = updates.styles;
    if(updates.rotation !== undefined) element.rotation = updates.rotation;
    if(updates.content !== undefined) element.content = updates.content;
}

function setSelectedElementId(id){
    selectedElementId = id;
}

function clearSelection(){
    selectedElementId = null;
}

function moveLayerUp(id) {
    const sorted = [...elements].sort((a, b) => a.zIndex -b.zIndex);
    const index = sorted.findIndex(e => e.id === id);
    if(index === sorted.length -1) return;

    const current =sorted[index];
    const above = sorted[index + 1];

    const temp = current.zIndex;
    current.zIndex = above.zIndex;
    above.zIndex = temp;
}

function moveLayerDown(id) {
    const sorted = [...elements].sort((a, b) => a.zIndex -b.zIndex);
    const index = sorted.findIndex(e => e.id === id);
    if(index === 0) return;

    const current = sorted[index];
    const below = sorted[index -1];

    const temp = current.zIndex;
    current.zIndex = below.zIndex;
    below.zIndex = temp;
}

function saveToLocalStorage() {
    localStorage.setItem("design-editor-elements", JSON.stringify(elements));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("design-editor-elements");
    if(!data) return;

    try {
        elements = JSON.parse(data);
    } catch (err) {
        console.error("Failed to load saved design", err);
        elements = [];
    }
}

export {
    getElements,
    getSelectedElement,
    getSelectedElementId,
    getNextElementPosition,
    bringToFront,
    addElement,
    removeElement,
    updateElement,
    setSelectedElementId,
    clearSelection,
    moveLayerUp,
    moveLayerDown,
    saveToLocalStorage,
    loadFromLocalStorage
};