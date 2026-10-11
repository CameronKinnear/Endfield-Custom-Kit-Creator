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
        ErrorLog("Invalid rarity input (must be between 4 and 6)")
    }
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

// Selects class button and saves to local details
// classType (string)
//
function SelectClass(newSelectedClass) {
    const CLASS_SELECTOR = document.getElementById('class-selector');
    
    CLASS_SELECTOR.dataset.selectedclass = newSelectedClass;
    Log(CLASS_SELECTOR.dataset.selectedclass);

    /*
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
    */
}