let elements = [];
let selectedElementId = null;

/* READ FUNCTIONS */

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


/* WRITE FUNCTIONS */

function addElement(elem){
    elements.push(elem);
}

function removeElement(id){
    element = elements.filter(elem => elem.id !== id);
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
    setSelectedElementId = id;
}

function clearSelection(){
    selectedElementId = null;
}

export {
    getElements,
    getSelectedElement,
    getSelectedElementId,
    addElement,
    removeElement,
    updateElement,
    setSelectedElementId,
    clearSelection
};