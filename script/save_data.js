/* ============================================
This file is the handler for saving data 
from webpage to the localdetails object
============================================= */


function SavePopupDetails() {
    /*
        Saves the data in the popup box to the local details
        to be redisplayed later
    */
    const TYPE = document.getElementById('button-selector').dataset.displayed;
    if (TYPE == 'none') return;
    localDetails[TYPE].name = document.getElementById('popup-name').value;
    localDetails[TYPE].text = document.getElementById('popup-edit').value;
}

function SaveBasicInfoDetails() {
    /*
        Saves basic character info to localDetails
    */
    localDetails.class = document.getElementById('class-selector').dataset.selectedclass;
    localDetails.weapon = document.getElementById('weapon-type-selector').dataset.selectedweapon;
    localDetails.charname = document.getElementById('name-input').value;
    localDetails.rarity = document.getElementById('rarity-selector').dataset.selectedrarity;
}

function SaveStatDetails() {
    /*
        Save stat details to localDetails
    */
    localDetails.str.val = document.getElementById('str-val').value;
    localDetails.agl.val = document.getElementById('agl-val').value;
    localDetails.int.val = document.getElementById('int-val').value;
    localDetails.wil.val = document.getElementById('wil-val').value;

    localDetails.str.level = document.getElementById('str-stat-button').value;
    localDetails.agl.level = document.getElementById('agl-stat-button').value;
    localDetails.int.level = document.getElementById('str-int-button').value;
    localDetails.wil.level = document.getElementById('wil-stat-button').value;
}

function SaveCustomKeywordDetails() {
    /*
        Saves the custom keywords to localDetails
    */
    let keywordsInput = document.getElementById('custom-keywords').value;
    let customKeywords = keywordsInput.replaceAll(/\s*,\s/g, ',').trim();
    customKeywords = customKeywords.split(',');
    localDetails['custom keywords'] = customKeywords;
    UpdateDisplay();
}

function SaveAll() {
    /*
        Runs all save functions
    */
    SaveBasicInfoDetails();
    SaveStatDetails();
    SavePopupDetails();
    SaveCustomKeywordDetails();
}