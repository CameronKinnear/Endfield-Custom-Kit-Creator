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

let rar5 = document.getElementById('rarity-5-star-button');
let rar6 = document.getElementById('rarity-6-star-button');


let localDetails = null;
let customKeywords = [];

function SavePopupDetails(type) {
    localDetails[type].name = popupName.value;
    localDetails[type].text = popupEdit.value;
}

function SaveBasicInfoDetails() {
    localDetails.class = currentlySelectedClass.value;
    localDetails.weapon = currentlySelectedClass.value;
    localDetails.charname = document.getElementById('name-input').value;
    localDetails.rarity = currentlySelectedButton.value;
}

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




function SelectWeapon(selectedWeapon) {
    if (currentlySelectedWeapon != null) {
        currentlySelectedWeapon.classList.remove('selected-weapon')
    }
    selectedWeapon.classList.add("selected-weapon");
    currentlySelectedWeapon = selectedWeapon;
}

function SelectClass(selectedClass) {
    if (currentlySelectedClass != null) {
        currentlySelectedClass.classList.remove('selected-class')
    }
    selectedClass.classList.add("selected-class");
    currentlySelectedClass = selectedClass;
}



// Updates HTML to display the rarity passed into this function
// rarityValue (int)
// 
function SelectRarity(rarityValue) {
    if (rarityValue == 4) {
        rar5.classList.add('rarity-inactive');
        rar6.classList.add('rarity-inactive');
    }
    else if (rarityValue == 5) {
        rar5.classList.remove('rarity-inactive');
        rar6.classList.add('rarity-inactive');
    }
    else {
        rar5.classList.remove('rarity-inactive'); 
        rar6.classList.remove('rarity-inactive');
    }
}

// Function is run when page is first loaded
// Mainly used to fetch JSON and apply it to the web page
// !! This function is still being worked on
//
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const dater = await fetch('../data/char_template.json');
        localDetails = await dater.json();
        customKeywords = localDetails["custom keywords"];
        LoadCustomKeywordsFromJSON(customKeywords);
        LoadStatDetails();
        SelectRarity(localDetails.rarity);
    } catch (error) {
    }
});

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

// Loads the values and levels for stats from local details
// 
//
function LoadStatDetails() {
    strInp.value = localDetails.str.val;
    ChangeStatLevel(document.getElementById('str-stat-button'), localDetails.str.level);
    aglInp.value = localDetails.agl.val;
    ChangeStatLevel(document.getElementById('agl-stat-button'), localDetails.agl.level);
    intInp.value = localDetails.int.val;
    ChangeStatLevel(document.getElementById('int-stat-button'), localDetails.int.level);
    wilInp.value = localDetails.wil.val;
    ChangeStatLevel(document.getElementById('wil-stat-button'), localDetails.wil.level);
}

// Changes the stat passed into the function to the level indicated
// selectedStat (button element), newLevel (int)
//
function ChangeStatLevel(selectedStat, newLevel) {
    console.log(newLevel);
    if (newLevel == 1) {
        MakeInactiveStat(selectedStat);
    }
    else if (newLevel == 2) {
        MakeSubStat(selectedStat);
    }
    else {
        MakeMainStat(selectedStat);
    }
}

// Formats a stat as a regular stat
// stat (button element)
//
function MakeInactiveStat(stat) {
    stat.classList.add('inactive-stat');
    stat.classList.remove('sub-stat');
    stat.classList.remove('main-stat');
    stat.value = 1;
}

// Formats a stat as a sub stat
// stat (button element)
//
function MakeSubStat(stat) {
    stat.classList.add('sub-stat');
    stat.classList.remove('inactive-stat');
    stat.classList.remove('main-stat');
    stat.value = 2;
}

// Formats a stat as a main stat
// stat (button element)
//
function MakeMainStat(stat) {
    stat.classList.add('main-stat');
    stat.classList.remove('inactive-stat');
    stat.classList.remove('sub-stat');
    stat.value = 3;
}

// Event listener for edit box inputs
popupEdit.addEventListener('input', () => {
    UpdateDisplay();
})

// Updates the popup display to reflect live formatting
//
//
function UpdateDisplay() {
    let editorText = popupEdit.value;
    let formattedText = DetermineFormatting(editorText);
    popupDisplay.innerHTML = formattedText;
}

// Takes custom keywords from input and adds them to the input box
//
// !! Needs Review
function LoadCustomKeywordsFromJSON(keywords) {
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

// Grabs the inputted custom keywords and writes them to the custom keywords
// 
//
function GetCustomKeywords() {
    const keywordsInput = localDetails['custom keywords'];
    customKeywords = keywordsInput.replaceAll(/\s*,\s/g, ',').trim();
    customKeywords = customKeywords.split(',');
    UpdateDisplay();
}

// Checks edit box for custom keywords and applies formatting
// text (string)
//
function CheckCustomKeywords(text) {
    for (let i = 0; i < customKeywords.length; i++) {
        if (text.includes(customKeywords[i])) {
            text = text.replaceAll(customKeywords[i], '<span class="format-span color-keyword">' + customKeywords[i] + '</span>')
        }
    }
    return text;
}

// Checks for words that should be automatcially bolded
// text (string)
// 
function BoldFormatting(text) {
    if (text.includes('COMBO TRIGGER')) {
        text = text.replaceAll('COMBO TRIGGER', '<span class="format-span body-text-bold">COMBO TRIGGER</span>')
    }
    if (text.includes('BASIC ATTACK:')) {
        text = text.replaceAll('BASIC ATTACK:', '<span class="format-span body-text-bold">BASIC ATTACK</span>:')
    }
    if (text.includes('DIVE ATTACK:')) {
        text = text.replaceAll('DIVE ATTACK:', '<span class="format-span body-text-bold">DIVE ATTACK</span>:')
    }
    if (text.includes('FINISHER:')) {
        text = text.replaceAll('FINISHER:', '<span class="format-span body-text-bold">FINISHER</span>:')
    }

    return text;
}

// Formats text based on content
// text (string)
//
function DetermineFormatting(text) {

    // ' {element} DMG '
    if (text.includes('DMG')) {
        if (text.includes('Electric DMG')) {
            text = text.replaceAll('Electric DMG', '<span class="format-span color-electric">Electric DMG</span>');
        }

        if (text.includes('Heat DMG')) {
            text = text.replaceAll('Heat DMG', '<span class="format-span color-heat">Heat DMG</span>');
        }

        if (text.includes('Nature DMG')) {
            text = text.replaceAll('Nature DMG', '<span class="format-span color-nature">Nature DMG</span>');
        }

        if (text.includes('Cryo DMG')) {
            text = text.replaceAll('Cryo DMG', '<span class="format-span color-cryo">Cryo DMG</span>');
        }

        if (text.includes('Physical DMG')) {
            text = text.replaceAll('Physical DMG', '<span class="format-span color-physical">Physical DMG</span>')
        }
    }

    // ' {element} Infliction '
    if (text.includes("Infliction")) {
        if (text.includes('Electric Infliction')) {
            text = text.replaceAll('Electric Infliction', '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-infliction-icon.png">Electric Infliction</span>');
        }

        if (text.includes('Nature Infliction')) {
            text = text.replaceAll('Nature Infliction', '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-infliction-icon.png">Nature Infliction</span>');
        }

        if (text.includes('Cryo Infliction')) {
            text = text.replaceAll('Cryo Infliction', '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-infliction-icon.png">Cryo Infliction</span>');
        }

        if (text.includes('Heat Infliction')) {
            text = text.replaceAll('Heat Infliction', '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-infliction-icon.png">Heat Infliction</span>');
        }
    }

    // ' Knock Down '
    if (text.includes('Knock Down')) {
        text = text.replaceAll('Knock Down', '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/knock-down-icon.png">Knock Down</span>');
    }

    // ' Lift '
    if (text.includes('Lift')) {
        text = text.replaceAll('Lift', '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/lift-icon.png">Lift</span>');
    }
    
    // ' Final Strike '
    if (text.includes('Final Strike')) {
        text = text.replaceAll('Final Strike', '<span class="format-span underline">Final Strike</span>')
    }

    // ' Vulnerability '
    if (text.includes('Vulnerability')) {
        text = text.replaceAll('Vulnerability', '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/vulnerability-icon.png">Vulnerability</span>');
    }

    // ' Arts {string} '
    if (text.includes("Arts")) {
        if (text.includes("Arts Infliction")) {
            text = text.replaceAll('Arts Infliction', '<span class="format-span underline color-keyword">Arts Infliction</span>')
        }
        
        if (text.includes("Arts Reaction")) {
            text = text.replaceAll('Arts Reaction', '<span class="format-span underline color-keyword">Arts Reaction</span>')
        }
    }

    // Elemental Reactions
    if (text.includes('Electrification')) {
        text = text.replaceAll('Electrification', '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electrification-icon.png">Electrification</span>');
    }

    if (text.includes('Corrosion')) {
        text = text.replaceAll('Corrosion', '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/corrosion-icon.png">Corrosion</span>');
    }

    if (text.includes('Combustion')) {
        text = text.replaceAll('Combustion', '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/combustion-icon.png">Combustion</span>');
    }

    if (text.includes('Shatter')) {
        text = text.replaceAll('Shatter', '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/shatter-icon.png">Shatter</span>');
    }

    if (text.includes('Breach')) {
        text = text.replaceAll('Breach', '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/breach-icon.png">Breach</span>');
    }

    if (text.includes('Crush')) {
        text = text.replaceAll('Crush', '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/crush-icon.png">Crush</span>');
    }

    if (text.includes('Solidification')) {
        text = text.replaceAll('Solidification', '<span class="format-span format-span color-cryo underline"><img class="image-icon" src="images/icons/solidification-icon.png">Solidification</span>');
    }

    // ' Susceptibility '
    if (text.includes("Susceptibility")) {
        text = text.replaceAll('Arts Susceptibility', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/arts-susceptibility-icon.png">Arts Susceptibility</span>');
        text = text.replaceAll('Physical Susceptibility', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/physical-susceptibility-icon.png">Physical Susceptibility</span>');
        text = text.replaceAll('Electric Susceptibility', '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-susceptibility-icon.png">Electric Susceptibility</span>');
        text = text.replaceAll('Nature Susceptibility', '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-susceptibility-icon.png">Nature Susceptibility</span>');
        text = text.replaceAll('Cryo Susceptibility', '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-susceptibility-icon.png">Cryo Susceptibility</span>');
        text = text.replaceAll('Heat Susceptibility', '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-susceptibility-icon.png">Heat Susceptibility</span>');
    }

    // ' Amp '
    if (text.includes("Amp")) {
        text = text.replaceAll('Arts Amp', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/arts-amp-icon.png">Arts Amp</span>');
        text = text.replaceAll('Physical Amp', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/physical-amp-icon.png">Physical Amp</span>');
        text = text.replaceAll('Electric Amp', '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-amp-icon.png">Electric Amp</span>');
        text = text.replaceAll('Nature Amp', '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-amp-icon.png">Nature Amp</span>');
        text = text.replaceAll('Cryo Amp', '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-amp-icon.png">Cryo Amp</span>');
        text = text.replaceAll('Heat Amp', '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-amp-icon.png">Heat Amp</span>');
    }

    if (text.includes("Link")) {
        text = text.replaceAll('Link', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/link-icon.png">Link</span>')
    }

    if (text.includes("Protected")) {
        text = text.replaceAll('Protected', '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/protected-icon.png">Protected</span>')
    }

    text = CheckCustomKeywords(text);
    text = BoldFormatting(text);

    // Formats newline to work with div element
    text = text.replaceAll('\n', '<br>');

    // Formats note tag
    text = text.replaceAll(/\/note\((.*?)\)/g, '<span class="format-span footnote-text">$1</span>');

    // Formats num tag
    text = text.replaceAll(/\/num\((.*?)\)/g, '<span class="format-span color-numeric">$1</span>');

    // Formats stagger tag
    text = text.replaceAll(/\/stagger\((.*?)\)/g, '<span class="format-span color-stagger">$1</span>');

    return text;
}