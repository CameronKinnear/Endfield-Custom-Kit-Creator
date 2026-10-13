/* ============================================
This file is used to control the canvas elements
for skill and talent icons
============================================= */
const canvas = document.getElementById('canvas-editor');
const canvasCtx = canvas.getContext('2d');
let imageHeight = 0;
let imageWidth = 0;


function ShowCanvasEditor() {
    document.getElementById('skill-edit-canvas').classList.toggle('invisible');
}

const FILE_INPUT = document.getElementById('skill-icon-input');

FILE_INPUT.addEventListener('change', async (evnt) => {
    /*
        On user file input
    */
    const fileList = evnt.target.files;
    if (fileList.length == 0) return ErrorLog("No Files Selected");

    const file = fileList[0];
    ShowFileOnCanvas(file);
})

function ShowFileOnCanvas(file) {
    const fileReader = new FileReader();

    fileReader.onload = function(evnt) {
        
        const image = new Image();

        image.onload = function() {
            let x = canvas.width / 2;
            let y = canvas.height / 2
            canvasCtx.drawImage(image, x, y);
        }

        image.src = evnt.target.result;
    }

    fileReader.readAsDataURL(file);
}