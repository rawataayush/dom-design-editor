import { addElement, setSelectedElementId} from "../state/store";

function createRectangle() {
    let rectangleObject =  {
        id: generateId(),
        type: "rect",
        position: {x: 200, y: 120},
        size: {height: 200, width: 200},
        rotation: 0,
        styles: {backgroundColor: "#2563eb"},
        content: null
    };

    addElement(rectangleObject);
    setSelectedElementId(rectangleObject.id);
}