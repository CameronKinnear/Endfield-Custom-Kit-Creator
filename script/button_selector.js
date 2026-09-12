let currentlySelectedWeapon = null;
let currentlySelectedClass = null;
let currentlySelectedRarity = null;
let currentlySelectedSkill = null;


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

function SelectSkill(selectedSkill) {

    SwapSkillVisibility(selectedSkill);
    SwapSkillVisibility(currentlySelectedSkill);

    if (currentlySelectedSkill != null) {
        currentlySelectedSkill.classList.remove('selected-skill')
    }
    selectedSkill.classList.add("selected-skill");
    currentlySelectedSkill = selectedSkill;
}

function SwapSkillVisibility(skillButton) {
    if (skillButton == null) return;

    if (skillButton.value == 'basic') {
        document.getElementById('batk-box').classList.toggle("skill-box-invisible");
        return;
    }
    if (skillButton.value == 'battle') {
        document.getElementById('bskl-box').classList.toggle("skill-box-invisible");
        return;
    }
    if (skillButton.value == 'combo') {
        document.getElementById('cskl-box').classList.toggle("skill-box-invisible");
        return;
    }
    if (skillButton.value == 'ult') {
        document.getElementById('uskl-box').classList.toggle("skill-box-invisible");
        return;
    }
}