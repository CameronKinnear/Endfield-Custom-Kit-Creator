/* ============================================
This file handles all the logic for selecting
buttons, fields, and inputting text relating
to rarity, skills, talents, stats, etc.
============================================= */

let rarity5 = document.getElementById('rarity-5-star-button');
let rarity6 = document.getElementById('rarity-6-star-button');
function SelectRarity(rarityValue) {
    /*
        Changes the each rarity icons class to
        reflect if it is inactive or not.
        :rarityValue - An integer between 4 - 6
    */
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
        return ErrorLog("Invalid rarity input (must be between 4 and 6)")
    }

    document.getElementById('rarity-selector').dataset.selectedrarity = rarityValue;

}

function ChangeStatLevel(statElement, changeTo = null) {
    /*
        Takes the inputted stat and changes its level.
        The order goes from:
        Basic -> Sub -> Main -> (Repeat)
        :statObject - Any element that is a child of the div
                      or is the div that represents a stat
        :changeTo - Not required. Forgoes the cycle and 
                    changes to specified level.
    */

    // If passed element isnt the wrapper container, find the container
    if (!statElement.classList.contains('stat-box')) {
        tempElement = statElement.closest('.stat-box');
        if (tempElement == null) return ErrorLog("statElement does not have a parent stat-box");

        statElement = tempElement;
    }

    // Gets the level from dataset
    const statContainer = statElement;
    const currentStatLevel = statContainer.dataset.level;

    // Change to specified level
    if (changeTo != null) {
        if (changeTo != 'basic' || changeTo != 'sub' || changeTo != 'main') return ErrorLog("Invalid stat level (must be basic, sub, or main");
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
        ErrorLog("currentStatLevel variable is not valid (must be basic, sub, or main)");
    }
}

function SelectClass(newSelectedClass) {
    /*
        Changes the selected class to the one passed
        through the function
        :newSelectedClass - A lowercase string that 
                            determines the new class
    */
    const CLASS_SELECTOR = document.getElementById('class-selector');
    const VALID_CLASSES = ['guard', 'caster', 'striker', 'vanguard', 'defender', 'supporter'];

    if (!VALID_CLASSES.includes(newSelectedClass)) return ErrorLog("Attempted class change is invalid")
    
    CLASS_SELECTOR.dataset.selectedclass = newSelectedClass;
}

function SelectWeapon(newSelectedWeapon) {
    /*
        Changes the selected weapon to the one passed
        through the function
        :newSelectedWeapon - A lowercase string that 
                             determines the new weapon
    */
    const WEAPON_SELECTOR = document.getElementById('weapon-type-selector');
    const VALID_WEAPONS = ['artsunit', 'greatsword', 'handcannon', 'polearm', 'sword'];

    if (!VALID_WEAPONS.includes(newSelectedWeapon)) return ErrorLog("Attempted weapon change is invalid")
    
    WEAPON_SELECTOR.dataset.selectedweapon = newSelectedWeapon;
}

async function DisplayData(dataSelected) {
    /*
        Switches the display box data to the newly selected value
        and handles logic for toggling visibility
        :dataSelected - A string representing the newly selected 
                        data value
    */
    const DATA_DISPLAY_CONTAINER = document.getElementById('button-selector');
    DATA_DISPLAY_CONTAINER.dataset.displayed = dataSelected;

    // Checks if selected and current buttons are the same
    if (currentlySelectedButton != dataSelected) {
        popupBox.classList.remove("popup-box-invisible");
    }
    else {
        popupBox.classList.toggle("popup-box-invisible");
        dataSelected.classList.toggle('selected-button');
        currentlySelectedButton = null;
        return;
    }

    // If this if the first button selected
    if (currentlySelectedButton != null) {
        SavePopupDetails(currentlySelectedButton.value);
        currentlySelectedButton.classList.remove('selected-button')
    }

    const DATA = localDetails[dataSelected];
    ApplyDataToPopupBox(DATA);
    UpdateDisplay();
}

function ApplyDataToPopupBox(data) {
    /*
        Applies the data passed to the popup box
        :data - json object for popup box data
    */
    popupLabel.innerHTML = data.type;
    popupName.value = data.name;
    popupEdit.value = data.text;
}
