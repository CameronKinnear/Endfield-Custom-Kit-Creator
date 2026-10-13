/* ============================================
This file is used to control the canvas elements
for skill and talent icons
============================================= */
const canvas = document.getElementById('canvas-editor');
const canvasCtx = canvas.getContext('2d');
const applyChanges = document.getElementById('apply-skill-image');
let currentFile = null;

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
    currentFile = file;
    ShowFileOnCanvas(file);
})

function ShowFileOnCanvas(file, imgScale = 1, imgOffsetX = 0, imgOffsetY = 0) {
    ClearCanvas();
    const fileReader = new FileReader();

    fileReader.onload = function(evnt) {
        
        const image = new Image();

        image.onload = function() {

            // Display image on center of canvas
            let x = ((canvas.width - (image.width * imgScale)) / 2) + imgOffsetX;
            let y = ((canvas.height - (image.height * imgScale)) / 2) + imgOffsetY;
            let imgSizeX = image.width * imgScale;
            let imgSizeY = image.height * imgScale;
            canvasCtx.drawImage(image, x, y, imgSizeX, imgSizeY);
        }

        image.src = evnt.target.result;
    }

    fileReader.readAsDataURL(file);
}

const sizeSlider = document.getElementById('img-slider');
sizeSlider.addEventListener('input', () => {
    Log(sizeSlider.value);
    ClearCanvas();
    let newSize = sizeSlider.value;

    ShowFileOnCanvas(currentFile, newSize);
})

function ClearCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}