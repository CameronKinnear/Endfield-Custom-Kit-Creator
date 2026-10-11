let currentlySelectedButton = null;
let currentlySelectedClass = null;

let popupLabel = document.getElementById('popup-label');
let popupName = document.getElementById('popup-name');
let popupEdit = document.getElementById('popup-edit');
let popupDisplay = document.getElementById('popup-display');
let popupBox = document.getElementById('popup-box');

let strInp = document.getElementById('str-val');
let aglInp = document.getElementById('agl-val');
let intInp = document.getElementById('int-val');
let wilInp = document.getElementById('wil-val');

// Saves the details of the passed popup object into local details
// type (popup box value, string)
//
function SavePopupDetails(type) {
    localDetails[type].name = popupName.value;
    localDetails[type].text = popupEdit.value;
}

// Saves basic char info to local details
//
//
function SaveBasicInfoDetails() {
    localDetails.class = currentlySelectedClass.value;
    localDetails.weapon = currentlySelectedClass.value;
    localDetails.charname = document.getElementById('name-input').value;
    localDetails.rarity = currentlySelectedButton.value;
}

// Save details to local details
//
//
function SaveStatDetails() {
    localDetails.str.val = strInp.value;
    localDetails.str.level = document.getElementById('str-stat-button').value;
    localDetails.agl.val = aglInp.value;
    localDetails.agl.level = document.getElementById('agl-stat-button').value;
    localDetails.int.val = intInp.value;
    localDetails.int.level = document.getElementById('str-int-button').value;
    localDetails.wil.val = wilInp.value;
    localDetails.wil.level = document.getElementById('wil-stat-button').value;
}

function SaveCustomKeywordDetails() {
    let keywordsInput = document.getElementById('custom-keywords').value;
    let customKeywords = keywordsInput.replaceAll(/\s*,\s/g, ',').trim();
    customKeywords = customKeywords.split(',');
    localDetails['custom keywords'] = customKeywords;
    UpdateDisplay();
}

//
// Select Buttons Functions \/
//








