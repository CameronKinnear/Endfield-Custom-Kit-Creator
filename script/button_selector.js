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


// Selector for the skills and talents buttons
function SelectPopup(selectedPopup) {

    if (selectedPopup == currentlyselectedPopup) {
        SwapPopupVisbility(currentlyselectedPopup);
        currentlyselectedPopup.classList.remove("selected-popup");
        currentlyselectedPopup = null;
        return;
    }

    SwapPopupVisbility(selectedPopup);
    SwapPopupVisbility(currentlyselectedPopup);

    MakeAllSkillEditBoxesInvisible();

    if (currentlyselectedPopup != null) {
        currentlyselectedPopup.classList.remove('selected-popup')
    }
    selectedPopup.classList.add("selected-popup");
    currentlyselectedPopup = selectedPopup;
}

function SwapPopupVisbility(button) {
    if (button == null) return;

    if (button.value == 'basic') {
        document.getElementById('batk-box').classList.toggle("popup-box-invisible");
        return;
    }
    if (button.value == 'battle') {
        document.getElementById('bskl-box').classList.toggle("popup-box-invisible");
        return;
    }
    if (button.value == 'combo') {
        document.getElementById('cskl-box').classList.toggle("popup-box-invisible");
        return;
    }
    if (button.value == 'ult') {
        document.getElementById('uskl-box').classList.toggle("popup-box-invisible");
        return;
    }
    if (button.value == 'talent 1') {
        document.getElementById('talent-1-box').classList.toggle("popup-box-invisible");
        return;
    }
    if (button.value == 'talent 2') {
        document.getElementById('talent-2-box').classList.toggle("popup-box-invisible");
        return;
    }
}

function ToggleEditBox(editButton) {
    console.log(editButton.value);
    if (editButton == null) return;

    if (editButton.value == 'basic') {
        document.getElementById('batk-edit').classList.toggle("edit-box-invisible");
        return;
    }
    if (editButton.value == 'battle') {
        document.getElementById('bskl-edit').classList.toggle("edit-box-invisible");
        return;
    }
    if (editButton.value == 'combo') {
        document.getElementById('cskl-edit').classList.toggle("edit-box-invisible");
        return;
    }
    if (editButton.value == 'ultimate') {
        document.getElementById('uskl-edit').classList.toggle("edit-box-invisible");
        return;
    }
    if (editButton.value == 'talent 1') {
        document.getElementById('talent-1-edit').classList.toggle("edit-box-invisible");
        return;
    }
    if (editButton.value == 'talent 2') {
        document.getElementById('talent-2-edit').classList.toggle("edit-box-invisible");
        return;
    }
}

// Makes all the boxes for skill editing invisible
// Used when swapping between skill popups
function MakeAllSkillEditBoxesInvisible() {
    document.getElementById('batk-edit').classList.add("edit-box-invisible");
    document.getElementById('bskl-edit').classList.add("edit-box-invisible");
    document.getElementById('cskl-edit').classList.add("edit-box-invisible");
    document.getElementById('uskl-edit').classList.add("edit-box-invisible");
    document.getElementById('talent-1-edit').classList.add("edit-box-invisible");
    document.getElementById('talent-2-edit').classList.add("edit-box-invisible");
}
