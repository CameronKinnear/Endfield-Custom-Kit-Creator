/* ============================================
This file is used to control the canvas elements
for skill and talent icons

NEEDS CLEANUP
============================================= */
const canvas = document.getElementById('canvas-editor');
const canvasCtx = canvas.getContext('2d');
const applyChanges = document.getElementById('apply-skill-image');
let currentFile = null;
let currentImage = null;
let needsRedraw = false;

/**
 * Toggles the visibility of the canvas editor
 */
function ShowCanvasEditor() {
    document.getElementById('skill-edit-canvas').classList.toggle('invisible');
}

const FILE_INPUT = document.getElementById('skill-icon-input');
FILE_INPUT.addEventListener('change', async (evnt) => {
    const fileList = evnt.target.files;
    if (fileList.length == 0) return console.error("No Files Selected");

    const file = fileList[0];
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
        URL.revokeObjectURL(url);
        currentImage = image;
        distFromCenterX = 0;
        distFromCenterY = 0;
        RequestRedraw();
    };
    image.src = url;
})

function ShowFileOnCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    if (!currentImage) return;

    const scale = parseFloat(sizeSlider.value) || 1;
    const w = currentImage.width * scale;
    const h = currentImage.height * scale;
    const x = (canvas.width - w) / 2 - distFromCenterX;
    const y = (canvas.height - h) / 2 - distFromCenterY;

    canvasCtx.drawImage(currentImage, x, y, w, h);
}

// Batch redraws so we draw at most once per display frame
function RequestRedraw() {
    if (needsRedraw) return;
    needsRedraw = true;
    requestAnimationFrame(() => {
        needsRedraw = false;
        DrawImage();
    });
}

const sizeSlider = document.getElementById('img-slider');
sizeSlider.addEventListener('input', () => {
    ClearCanvas();
    let newSize = sizeSlider.value;

    ShowFileOnCanvas(currentFile, newSize, distFromCenterX, distFromCenterY);
})

function ClearCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

let holdInterval = null;
let isMouseDown = false;
let distFromCenterX = null;
let distFromCenterY = null;
canvas.addEventListener('mousedown', (evnt) => {

    UpdateDistFromLastPOS(evnt);
    holdInterval = setInterval((e) => {
        isMouseDown = true;
    }, 100); // Triggers every 100 milliseconds
});

function UpdateDistFromLastPOS(e) {
    const rect = canvas.getBoundingClientRect();
    const centerX = (rect.right - rect.left) / 2;
    const centerY = (rect.bottom - rect.top) / 2;

    distFromCenterX = centerX - (e.clientX - rect.left);
    distFromCenterY = centerY - (e.clientY - rect.top);
}

const stopAction = () => {
    clearInterval(holdInterval);
};

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown == true) UpdateDistFromLastPOS(e);
    ShowFileOnCanvas(currentFile, sizeSlider.value, distFromCenterX, distFromCenterY);
});
canvas.addEventListener('mouseup', () => {
    stopAction()
    isMouseDown = false;
});

function update() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // Clear once per frame
  
}

/**
 * Takes the data in the canvas editor and
 * copies it to the currently selected skill
 */
function ApplyChangesToSkillIcon() {
    const DATA_SELECTOR = document.getElementById('button-selector');
    const skillDisplayed = DATA_SELECTOR.dataset.displayed;
    const buttonParent = DATA_SELECTOR.querySelector('button[value="' + skillDisplayed + '"]');
    const skillCanvas = buttonParent.querySelector('.skill-image');
    const skillCanvasCtx = skillCanvas.getContext('2d');
    skillCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    skillCanvasCtx.drawImage(canvas, 0, 0, skillCanvas.width, skillCanvas.height);
}