let currentlySelectedWeapon = null;
let currentlySelectedClass = null;
let currentlySelectedRarity = null;
let currentlyselectedPopup = null;



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

function SelectRarity(selectedRarity) {
    if (currentlySelectedRarity != null) {
        currentlySelectedRarity.classList.remove('selected-rarity')
    }
    selectedRarity.classList.add("selected-rarity");
    currentlySelectedRarity = selectedRarity;
}