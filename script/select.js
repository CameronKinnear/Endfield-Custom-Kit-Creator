/* ============================================
This file handles all the logic for selecting
buttons, fields, and inputting text relating
to rarity, skills, talents, stats, etc.
============================================= */


let rarity5 = document.getElementById('rarity-5-star-button');
let rarity6 = document.getElementById('rarity-6-star-button');
/**
 * Changes the rarity icons class style class to reflect
 * if it is active or inactive
 * @param {Number} rarityValue - An integer between 4 - 6 
 *  to represent the new rarity selected
 */
function SelectRarity(rarityValue) {
    if (rarityValue == 4) {
        rarity5.classList.add('rarity-inactive');
        rarity6.classList.add('rarity-inactive');
    }
    else if (rarityValue == 5) {
        rarity5.classList.remove('rarity-inactive');
        rarity6.classList.add('rarity-inactive');
    }
    else if (rarityValue == 6) {
        rarity5.classList.remove('rarity-inactive'); 
        rarity6.classList.remove('rarity-inactive');
    }
    else {
        return console.error("Invalid rarity input (must be between 4 and 6)");
    }

    document.getElementById('rarity-selector').dataset.selectedrarity = rarityValue;
}

/**
 * Takes the inputted stat and changes its level.
 * The order goes from:
 * Basic -> Sub -> Main -> (Repeat)
 * @param {HTMLObjectElement} statElement - Any element that is a child of the div
 *  or is the div that represents a stat
 * @param {String} changeTo - Not required. Forgoes the cycle and 
 *  changes to specified level. 
 */
function ChangeStatLevel(statElement, changeTo = null) {
    // If passed element isnt the wrapper container, find the container
    if (!statElement.classList.contains('stat-box')) {
        tempElement = statElement.closest('.stat-box');
        if (tempElement == null) return console.error("statElement does not have a parent stat-box");

        statElement = tempElement;
    }

    // Gets the level from dataset
    const statContainer = statElement;
    const currentStatLevel = statContainer.dataset.level;

    // Change to specified level
    if (changeTo != null) {
        if (changeTo != 'basic' || changeTo != 'sub' || changeTo != 'main') return console.error("Invalid stat level (must be basic, sub, or main");
        statContainer.dataset.level = changeTo;
        return;
    }

    // Upgrade to next level
    if (currentStatLevel == 'basic') {
        statContainer.dataset.level = 'sub';
    }
    else if (currentStatLevel == 'sub') {
        statContainer.dataset.level = 'main';
    }
    else if (currentStatLevel == 'main') {
        statContainer.dataset.level = 'basic';
    }
    else {
        console.error("currentStatLevel variable is not valid (must be basic, sub, or main)");
    }
}

/**
 * Changes the selected class to the one passed through the function
 * @param {String} newSelectedClass - A lowercase string that 
 *  determines the new class
 */
function SelectClass(newSelectedClass) {
    const CLASS_SELECTOR = document.getElementById('class-selector');
    const VALID_CLASSES = ['guard', 'caster', 'striker', 'vanguard', 'defender', 'supporter'];

    if (!VALID_CLASSES.includes(newSelectedClass)) return console.error("Attempted class change is invalid")
    
    CLASS_SELECTOR.dataset.selectedclass = newSelectedClass;
}

/**
 * Changes the selected weapon to the one passed
 * through the function
 * @param {String} newSelectedWeapon - A lowercase string that 
 *  determines the new weapon
 */
function SelectWeapon(newSelectedWeapon) {
    const WEAPON_SELECTOR = document.getElementById('weapon-type-selector');
    const VALID_WEAPONS = ['artsunit', 'greatsword', 'handcannon', 'polearm', 'sword'];

    if (!VALID_WEAPONS.includes(newSelectedWeapon)) return console.error("Attempted weapon change is invalid")
    
    WEAPON_SELECTOR.dataset.selectedweapon = newSelectedWeapon;
}

/**
 * Switches the display box data to the newly selected value
 * and handles logic for toggling visibility
 * @param {String} dataSelected - A string representing 
 *  the newly selected data value
 */
async function DisplayData(dataSelected) {
    const DATA_DISPLAY_CONTAINER = document.getElementById('button-selector');
    const CURRENT_SELECTION = DATA_DISPLAY_CONTAINER.dataset.displayed;

    // Checks if selected and current buttons are the same
    if (CURRENT_SELECTION == dataSelected) {
        DATA_DISPLAY_CONTAINER.dataset.displayed = 'none';
        document.getElementById('popup-box').classList.add('popup-box-invisible');
        return;
    }

    // If no button was selected
    if (CURRENT_SELECTION == 'none') {
        document.getElementById('popup-box').classList.remove('popup-box-invisible');
    }

    const DATA = localDetails[dataSelected];
    SavePopupDetails();
    ApplyDataToPopupBox(DATA);
    UpdateDisplay();
    DATA_DISPLAY_CONTAINER.dataset.displayed = dataSelected;
}

let popupName = document.getElementById('popup-name');
let popupLabel = document.getElementById('popup-label');
/**
 * Applies the data passed to the popup box
 * @param {JSON} data - JSON object for popup box data
 */
function ApplyDataToPopupBox(data) {
    popupLabel.innerHTML = data.type;
    popupName.value = data.name;
    popupEdit.value = data.text;
}

/**
 * Toggles the visibility of the edit box
 */
function ToggleEditBox() {
    popupEdit.classList.toggle('edit-box-invisible');
    document.getElementById('popup-edit-icon').classList.toggle('invisible');
    document.getElementById('skill-edit-canvas').classList.add('invisible');
}

