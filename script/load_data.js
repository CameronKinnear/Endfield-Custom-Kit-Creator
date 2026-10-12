/* ============================================
This file is the handler for loading data 
from json files and displaying it on the webpage 

Gets a JSON File -> Saves to the localDetails var
-> localDetails data is put on page
============================================= */
let localDetails = null;

window.addEventListener('DOMContentLoaded', async () => {
    /*
        Runs on DOMContentLoad (page is first loaded) and is used
        to retrieve data from the template to display by default
    */
    try {
        const DATA = await fetch('../data/char_template.json');
        localDetails = await DATA.json();
        LoadCustomKeywords();
        LoadStatDetails();
        LoadBasicDetails();
        LoadCharName();
        LoadTalentInfo();
        LoadSkillInfo();
    } catch (error) {
        ErrorLog(error);
    }
});

function LoadTalentInfo() {
    const TALENT1 = document.getElementById('talent-1-button');
    const TALENT2 = document.getElementById('talent-2-button');
    TALENT1.innerHTML = localDetails["talent 1"].name;
    TALENT2.innerHTML = localDetails["talent 2"].name;
}

function LoadSkillInfo() {
    const BATK_IMG = document.getElementById('batk-image');
    const BATK_BUTTON = document.getElementById('batk-button');
    BATK_IMG.src = localDetails["basic"].image;
    
}

function LoadStatDetails() {
    /*
        Sets the information for stat levels and values
        to data stored in local details
    */
    document.getElementById('str-box').dataset.level = localDetails.str.level;
    document.getElementById('agl-box').dataset.level = localDetails.agl.level;
    document.getElementById('int-box').dataset.level = localDetails.int.level;
    document.getElementById('wil-box').dataset.level = localDetails.wil.level;

    document.getElementById('str-val').value = localDetails.str.val;
    document.getElementById('agl-val').value = localDetails.agl.val;
    document.getElementById('int-val').value = localDetails.int.val;
    document.getElementById('wil-val').value = localDetails.wil.val;
}

function LoadCustomKeywords() {
    /*
        Loads the custom keywords from the 
        inputted array
        :keywords - An array of strings
    */
    const KEYWORDS = localDetails["custom keywords"];
    
    let finalString = "";
    let kwlen = KEYWORDS.length;
    for (let i = 0; i < kwlen; i++) {
        finalString = finalString + KEYWORDS[i]
        if (i != kwlen - 1) {
            finalString = finalString + ",";
        }
    }
    document.getElementById('custom-keywords').value = finalString;
}

function LoadCharName() {
    /*
        Loads the char name from local details
    */
    document.getElementById('name-input').value = localDetails.charname;
}

function LoadBasicDetails() {
    /*
        Loads the basic details from the localDetails
    */
    SelectRarity(localDetails.rarity);
    SelectClass(localDetails.class);
    SelectWeapon(localDetails.weapon);
    LoadCharName();
    Log(localDetails.class);
}