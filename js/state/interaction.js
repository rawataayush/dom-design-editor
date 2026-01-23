let isInteracting = false;

function startInteraction() {
    isInteracting = true;
}

function endInteraction() {
    isInteracting = false;
}

function isInteractionActive(){
    return isInteracting;
}

export {
    startInteraction,
    endInteraction,
    isInteractionActive
};