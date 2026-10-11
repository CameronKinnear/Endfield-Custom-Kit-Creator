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
