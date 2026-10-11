let currentlySelectedButton = null;
let currentlySelectedRarity = null;
let currentlySelectedWeapon = null;
let currentlySelectedClass = null;
let currentlyselectedPopup = null;

let popupLabel = document.getElementById('popup-label');
let popupName = document.getElementById('popup-name');
let popupEdit = document.getElementById('popup-edit');
let popupDisplay = document.getElementById('popup-display');
let popupBox = document.getElementById('popup-box');

let strInp = document.getElementById('str-val');
let aglInp = document.getElementById('agl-val');
let intInp = document.getElementById('int-val');
let wilInp = document.getElementById('wil-val');


let localDetails = null;

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

// Applies formatting and runs functionaility of buttons when pressed
// Works for skills and talents / any buttons that display a popup box 
//
async function SelectButton(buttonSelected) {

    // Checks if selected and current buttons are the same
    if (currentlySelectedButton != buttonSelected) {
        popupBox.classList.remove("popup-box-invisible");
    }
    else {
        popupBox.classList.toggle("popup-box-invisible");
        buttonSelected.classList.toggle('selected-button');
        currentlySelectedButton = null;
        return;
    }

    // If this if the first button selected
    if (currentlySelectedButton != null) {
        SavePopupDetails(currentlySelectedButton.value);
        currentlySelectedButton.classList.remove('selected-button')
    }

    buttonSelected.classList.add("selected-button");
    currentlySelectedButton = buttonSelected;

    ApplyDataToPopupBox(localDetails[buttonSelected.value]);
    UpdateDisplay();
}

// Selects weapon button
// weaponType (string)
//
function SelectWeapon(weaponType) {
    let selectedWeapon = null;
    if (weaponType == 'artsunit') {
        selectedWeapon = document.getElementById('button-arts-unit');
    }
    else if (weaponType == 'greatsword') {
        selectedWeapon = document.getElementById('button-great-sword');
    }
    else if (weaponType == 'handcannon') {
        selectedWeapon = document.getElementById('button-hand-cannon');
    }
    else if (weaponType == 'polearm') {
        selectedWeapon = document.getElementById('button-polearm');
    }
    else if (weaponType == 'sword') {
        selectedWeapon = document.getElementById('button-sword');
    }
    
    if (currentlySelectedWeapon != null && currentlySelectedWeapon == selectedWeapon) {
        return;
    }
    
    selectedWeapon.classList.add('selected-weapon');
    if (currentlySelectedWeapon != null) {
        currentlySelectedWeapon.classList.remove('selected-weapon');
    }

    currentlySelectedWeapon = selectedWeapon

    localDetails.weapon = weaponType;
}

// Selects class button and saves to local details
// classType (string)
//
function SelectClass(classType) {
    let selectedClass = null;

    if (classType == 'guard') {
        selectedClass = document.getElementById('button-guard');
    }
    else if (classType == 'caster') {
        selectedClass = document.getElementById('button-caster');
    }
    else if (classType == 'striker') {
        selectedClass = document.getElementById('button-striker');
    }
    else if (classType == 'vanguard') {
        selectedClass = document.getElementById('button-vanguard');
    }
    else if (classType == 'defender') {
        selectedClass = document.getElementById('button-defender');
    }
    else if (classType == 'supporter') {
        selectedClass = document.getElementById('button-supporter');
    }

    if (currentlySelectedClass != null && currentlySelectedClass == selectedClass) {
        return;
    }
    
    selectedClass.classList.add('selected-class');
    if (currentlySelectedClass != null) {
        currentlySelectedClass.classList.remove('selected-class');
    }

    currentlySelectedClass = selectedClass;

    localDetails.class = classType;
}

function LoadCharName(charName) {
    document.getElementById('name-input').value = charName;
}




// Toggles the visibility of the edit box
// Uses a class to change formatting
//
function ToggleEditBox() {
    popupEdit.classList.toggle('edit-box-invisible')
}

// Applies the data passed into the function to the web page
// data (json object)
// !! More fields need to be processed depending on the skill
function ApplyDataToPopupBox(data) {
    popupLabel.innerHTML = data.type;
    popupName.value = data.name;
    popupEdit.value = data.text;
}





// Takes custom keywords from input and adds them to the input box
//
// !! Needs Review
function LoadCustomKeywords(keywords) {
    let keywordsBox = document.getElementById('custom-keywords');
    let finalString = "";
    let kwlen = keywords.length;
    for (let i = 0; i < kwlen; i++) {
        finalString = finalString + keywords[i]
        if (i != kwlen - 1) {
            finalString = finalString + ",";
        }
    }
    keywordsBox.value = finalString;
}



//
// Live Formatting Functions \/
//



