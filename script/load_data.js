/* ============================================
This file is the handler for loading data 
from json filesand displaying it on the webpage 
============================================= */


window.addEventListener('DOMContentLoaded', async () => {
    /*
        Runs on DOMContentLoad (page is first loaded) and is used
        to retrieve data from the template to display by default
    */
    try {
        const dater = await fetch('../data/char_template.json');
        localDetails = await dater.json();
        customKeywords = localDetails["custom keywords"];
        LoadCustomKeywords(customKeywords);
        LoadStatDetails();
        SelectRarity(localDetails.rarity);
        SelectClass(localDetails.class);
        SelectWeapon(localDetails.weapon);
        LoadCharName(localDetails.charname);
    } catch (error) {
        ErrorLog(error);
    }
});


// Loads the values and levels for stats from local details
// 
//
function LoadStatDetails() {
    document.getElementById('str-box').dataset.level = localDetails.str.level;
    document.getElementById('agl-box').dataset.level = localDetails.agl.level;
    document.getElementById('int-box').dataset.level = localDetails.int.level;
    document.getElementById('wil-box').dataset.level = localDetails.wil.level;
}
