let batkDisplayBox = document.getElementById("batk-display");
const batkEditBox = document.getElementById("batk-edit");
batkEditBox.addEventListener('input', () => {
    let editorText = batkEditBox.value;
    let formattedText = DetermineFormatting(editorText);
    batkDisplayBox.innerHTML = formattedText;
})

let bsklDisplayBox = document.getElementById("bskl-display");
const bsklEditBox = document.getElementById("bskl-edit");
bsklEditBox.addEventListener('input', () => {
    let editorText = bsklEditBox.value;
    let formattedText = DetermineFormatting(editorText);
    bsklDisplayBox.innerHTML = formattedText;
})

let csklDisplayBox = document.getElementById("cskl-display");
const csklEditBox = document.getElementById("cskl-edit");
csklEditBox.addEventListener('input', () => {
    let editorText = csklEditBox.value;
    let formattedText = DetermineFormatting(editorText);
    csklDisplayBox.innerHTML = formattedText;
})

let usklDisplayBox = document.getElementById("uskl-display");
const usklEditBox = document.getElementById("uskl-edit");
usklEditBox.addEventListener('input', () => {
    let editorText = usklEditBox.value;
    let formattedText = DetermineFormatting(editorText);
    usklDisplayBox.innerHTML = formattedText;
})



let customKeywords = [];
// Grabs the inputted custom keywords and applies formatting to them
function GetCustomKeywords() {
    const keywordsInput = document.getElementById('custom-keywords').value;
    customKeywords = keywordsInput.replaceAll(/\s*,\s*/g, ',').trim();
    customKeywords = customKeywords.split(',');
    console.log("Current Keywords: " + customKeywords);
}

function CheckCustomKeywords(text) {
    for (let i = 0; i < customKeywords.length; i++) {
        if (text.includes(customKeywords[i])) {
            text = text.replaceAll(customKeywords[i], '<span class="color-keyword">' + customKeywords[i] + '</span>')
        }
    }
    return text;
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

    // ' {element} Infliction '
    if (text.includes("Infliction")) {
        if (text.includes('Electric Infliction')) {
            text = text.replaceAll('Electric Infliction', '<img class="image-icon" src="icons/electric-infliction-icon.png"><span class="color-electric underline">Electric Infliction</span>');
        }

        if (text.includes('Nature Infliction')) {
            text = text.replaceAll('Nature Infliction', '<img class="image-icon" src="icons/nature-infliction-icon.png"><span class="color-nature underline">Nature Infliction</span>');
        }

        if (text.includes('Cryo Infliction')) {
            text = text.replaceAll('Cryo Infliction', '<img class="image-icon" src="icons/cryo-infliction-icon.png"><span class="color-cryo underline">Cryo Infliction</span>');
        }

        if (text.includes('Heat Infliction')) {
            text = text.replaceAll('Heat Infliction', '<img class="image-icon" src="icons/heat-infliction-icon.png"><span class="color-heat underline">Heat Infliction</span>');
        }
    }

    // ' Knock Down '
    if (text.includes('Knock Down')) {
        text = text.replaceAll('Knock Down', '<img class="image-icon" src="icons/knock-down-icon.png"><span class="color-physical underline">Knock Down</span>');
    }

    // ' Lift '
    if (text.includes('Lift')) {
        text = text.replaceAll('Lift', '<img class="image-icon" src="icons/lift-icon.png"><span class="color-physical underline">Lift</span>');
    }
    
    // ' Final Strike '
    if (text.includes('Final Strike')) {
        text = text.replaceAll('Final Strike', '<span class="underline">Final Strike</span>')
    }

    // ' Vulnerability '
    if (text.includes('Vulnerability')) {
        text = text.replaceAll('Vulnerability', '<img class="image-icon" src="icons/vulnerability-icon.png"><span class="color-physical underline">Vulnerability</span>');
    }

    // ' Arts {string} '
    if (text.includes("Arts")) {
        if (text.includes("Arts Infliction")) {
            text = text.replaceAll('Arts Infliction', '<span class="underline color-keyword">Arts Infliction</span>')
        }
        
        if (text.includes("Arts Reaction")) {
            text = text.replaceAll('Arts Reaction', '<span class="underline color-keyword">Arts Reaction</span>')
        }
    }

    // Elemental Reactions
    if (text.includes('Electrification')) {
        text = text.replaceAll('Electrification', '<img class="image-icon" src="icons/electrification-icon.png"><span class="color-electric underline">Electrification</span>');
    }

    if (text.includes('Corrosion')) {
        text = text.replaceAll('Corrosion', '<img class="image-icon" src="icons/corrosion-icon.png"><span class="color-nature underline">Corrosion</span>');
    }

    if (text.includes('Combustion')) {
        text = text.replaceAll('Combustion', '<img class="image-icon" src="icons/combustion-icon.png"><span class="color-heat underline">Combustion</span>');
    }

    if (text.includes('Shatter')) {
        text = text.replaceAll('Shatter', '<img class="image-icon" src="icons/shatter-icon.png"><span class="color-cryo underline">Shatter</span>');
    }

    if (text.includes('Breach')) {
        text = text.replaceAll('Breach', '<img class="image-icon" src="icons/breach-icon.png"><span class="color-physical underline">Breach</span>');
    }

    if (text.includes('Crush')) {
        text = text.replaceAll('Crush', '<img class="image-icon" src="icons/crush-icon.png"><span class="color-physical underline">Crush</span>');
    }

    if (text.includes('Solidification')) {
        text = text.replaceAll('Solidification', '<img class="image-icon" src="icons/solidification-icon.png"><span class="color-cryo underline">Solidification</span>');
    }

    // ' Susceptibility '
    if (text.includes("Susceptibility")) {
        text = text.replaceAll('Arts Susceptibility', '<img class="image-icon" src="icons/arts-susceptibility-icon.png"><span class="color-keyword underline">Arts Susceptibility</span>');
        text = text.replaceAll('Physical Susceptibility', '<img class="image-icon" src="icons/physical-susceptibility-icon.png"><span class="color-keyword underline">Physical Susceptibility</span>');
        text = text.replaceAll('Electric Susceptibility', '<img class="image-icon" src="icons/electric-susceptibility-icon.png"><span class="color-electric underline">Electric Susceptibility</span>');
        text = text.replaceAll('Nature Susceptibility', '<img class="image-icon" src="icons/nature-susceptibility-icon.png"><span class="color-nature underline">Nature Susceptibility</span>');
        text = text.replaceAll('Cryo Susceptibility', '<img class="image-icon" src="icons/cryo-susceptibility-icon.png"><span class="color-cryo underline">Cryo Susceptibility</span>');
        text = text.replaceAll('Heat Susceptibility', '<img class="image-icon" src="icons/heat-susceptibility-icon.png"><span class="color-heat underline">Heat Susceptibility</span>');
    }

    // ' Amp '
    if (text.includes("Amp")) {
        text = text.replaceAll('Arts Amp', '<img class="image-icon" src="icons/arts-amp-icon.png"><span class="color-keyword underline">Arts Amp</span>');
        text = text.replaceAll('Physical Amp', '<img class="image-icon" src="icons/physical-amp-icon.png"><span class="color-keyword underline">Physical Amp</span>');
        text = text.replaceAll('Electric Amp', '<img class="image-icon" src="icons/electric-amp-icon.png"><span class="color-electric underline">Electric Amp</span>');
        text = text.replaceAll('Nature Amp', '<img class="image-icon" src="icons/nature-amp-icon.png"><span class="color-nature underline">Nature Amp</span>');
        text = text.replaceAll('Cryo Amp', '<img class="image-icon" src="icons/cryo-amp-icon.png"><span class="color-cryo underline">Cryo Amp</span>');
        text = text.replaceAll('Heat Amp', '<img class="image-icon" src="icons/heat-amp-icon.png"><span class="color-heat underline">Heat Amp</span>');
    }

    if (text.includes("Link")) {
        text = text.replaceAll('Link', '<img class="image-icon" src="icons/link-icon.png"><span class="color-keyword underline">Link</span>')
    }

    if (text.includes("Protected")) {
        text = text.replaceAll('Protected', '<img class="image-icon" src="icons/protected-icon.png"><span class="color-keyword underline">Protected</span>')
    }

    text = CheckCustomKeywords(text);

    return text;
}