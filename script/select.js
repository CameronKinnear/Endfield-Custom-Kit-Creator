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

function NextStatLevel(statElement) {
    /*
        Takes the inputted stat and changes its level.
        The order goes from:
        Basic -> Sub -> Main -> (Repeat)
        :statObject - Any element that is a child of the div
                      or is the div that represents a stat
    */

    // If passed element isnt the wrapper container, find the container
    if (!statElement.classList.includes('stat-box')) {

    }

    const statContainer = statElement;
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
