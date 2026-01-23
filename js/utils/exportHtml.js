import { getElements } from "../state/store.js";

function exportHTML() {
    const elements = getElements();

    const bodyContent = elements.map(elem => {
        const styles = [];

        styles.push(`position : absolute`);
        styles.push(`left : ${elem.position.x}px`);
        styles.push(`top : ${elem.position.y}px`);
        styles.push(`width : ${elem.size.width}px`);
        styles.push(`height : ${elem.size.height}px`);

        if (elem.styles?.backgroundColor) {
            styles.push(`background : ${elem.styles.backgroundColor}`);
        }
        if (elem.styles?.borderRadius) {
            styles.push(`border-radius : ${elem.styles.borderRadius}%`);
        }
        if (elem.rotation) {
            styles.push(`transform : rotate(${elem.rotation}deg)`);
        }
        return `<div style="${styles.join(";")}">${elem.type === "text" ? elem.content : ""}</div>`;
    }).join("\n");

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Exported Design</title>
            <style>
                body {
                    position: relative;
                    margin: 0;
                    width: 100vw;
                    height: 100vh;
                    background: #fff;
                }
            </style>
        </head>
        <body>
            ${bodyContent}
        </body>
        </html>`;

        const blob = new Blob([html], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "design.html";
        a.click();

        URL.revokeObjectURL(url);
    }

export {exportHTML};
