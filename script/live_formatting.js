let batkDisplayBox = document.getElementById("batk-display");
const batkEditBox = document.getElementById("batk-edit");


// When inputting on basic attack box
batkEditBox.addEventListener('input', () => {
    
    let editorText = batkEditBox.value;
    
    let formattedText = DetermineFormatting(editorText);

    batkDisplayBox.innerHTML = formattedText;
})

// Removes any text commented out from being edited
function TrimText(text) {

}

function DetermineFormatting(text) {

    // ' {element} DMG '
    if (text.includes('DMG')) {
        if (text.includes('Electric DMG')) {
            text = text.replaceAll('Electric DMG', '<span class="color-electric">Electric DMG</span>');
        }

        if (text.includes('Heat DMG')) {
            text = text.replaceAll('Heat DMG', '<span class="color-heat">Heat DMG</span>');
        }

        if (text.includes('Nature DMG')) {
            text = text.replaceAll('Nature DMG', '<span class="color-nature">Nature DMG</span>');
        }

        if (text.includes('Cryo DMG')) {
            text = text.replaceAll('Cryo DMG', '<span class="color-cryo">Cryo DMG</span>');
        }

        if (text.includes('Physical DMG')) {
            text = text.replaceAll('Physical DMG', '<span class="color-physical">Physical DMG</span>')
        }
    }

    // ' {element} Infliction
    if (text.includes("Infliction")) {
        if (text.includes('Electric Infliction')) {
            text = text.replaceAll('Electric Infliction', '<img src="icons/electric-infliction-icon.png"><span class="color-electric">Electric Infliction</span>');
        }

        if (text.includes('Nature Infliction')) {
            text = text.replaceAll('Nature Infliction', '<img src="icons/nature-infliction-icon.png"><span class="color-nature">Nature Infliction</span>');
        }

        if (text.includes('Cryo Infliction')) {
            text = text.replaceAll('Cryo Infliction', '<img src="icons/cryo-infliction-icon.png"><span class="color-cryo">Cryo Infliction</span>');
        }

        if (text.includes('Heat Infliction')) {
            text = text.replaceAll('Heat Infliction', '<img src="icons/heat-infliction-icon.png"><span class="color-heat">Heat Infliction</span>');
        }
    }

    // ' Knock Down '
    if (text.includes('Knock Down')) {
        text = text.replaceAll('Knock Down', '<img src="icons/knock-down-icon.png"><span class="color-physical">Knock Down</span>');
    }

    // ' Lift '
    if (text.includes('Lift')) {
        text = text.replaceAll('Lift', '<img src="icons/lift-icon.png"><span class="color-physical">Lift</span>');
    }
    

    return text;
}