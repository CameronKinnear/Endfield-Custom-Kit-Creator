/* ============================================
This file handles the logic for formatting text
as it is written on the webpage
============================================= */

const FORMATTING = {
    /*
        The key value pairs that determine the formatting
        :key - The expression to be replaced
        :value - What the key is replaced with
    */
    // DMG Types
    'Electric DMG' : '<span class="format-span color-electric">Electric DMG</span>',
    'Heat DMG' : '<span class="format-span color-heat">Heat DMG</span>',
    'Nature DMG' : '<span class="format-span color-nature">Nature DMG</span>',
    'Cryo DMG' : '<span class="format-span color-cryo">Cryo DMG</span>',
    'Physical DMG' : '<span class="format-span color-physical">Physical DMG</span>',

    // Inflictions
    'Arts Infliction' : '<span class="format-span underline color-keyword">Arts Infliction</span>',
    'Electric Infliction' : '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-infliction-icon.png">Electric Infliction</span>',
    'Nature Infliction' : '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-infliction-icon.png">Nature Infliction</span>',
    'Cryo Infliction' : '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-infliction-icon.png">Cryo Infliction</span>',
    'Heat Infliction' : '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-infliction-icon.png">Heat Infliction</span>',
    'Knock Down' : '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/knock-down-icon.png">Knock Down</span>',
    'Lift' : '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/lift-icon.png">Lift</span>',
    'Vulnerability' : '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/vulnerability-icon.png">Vulnerability</span>',

    // Reactions
    'Arts Reaction' : '<span class="format-span underline color-keyword">Arts Reaction</span>',
    'Electrification' : '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electrification-icon.png">Electrification</span>',
    'Corrosion' : '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/corrosion-icon.png">Corrosion</span>',
    'Combustion' : '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/combustion-icon.png">Combustion</span>',
    'Shatter' : '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/shatter-icon.png">Shatter</span>',
    'Breach' : '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/breach-icon.png">Breach</span>',
    'Crush' : '<span class="format-span color-physical underline"><img class="image-icon" src="images/icons/crush-icon.png">Crush</span>',
    'Solidification' : '<span class="format-span format-span color-cryo underline"><img class="image-icon" src="images/icons/solidification-icon.png">Solidification</span>',

    // Susceptibility
    'Arts Susceptibility' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/arts-susceptibility-icon.png">Arts Susceptibility</span>',
    'Physical Susceptibility' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/physical-susceptibility-icon.png">Physical Susceptibility</span>',
    'Electric Susceptibility' : '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-susceptibility-icon.png">Electric Susceptibility</span>',
    'Nature Susceptibility' : '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-susceptibility-icon.png">Nature Susceptibility</span>',
    'Cryo Susceptibility' : '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-susceptibility-icon.png">Cryo Susceptibility</span>',
    'Heat Susceptibility' : '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-susceptibility-icon.png">Heat Susceptibility</span>',

    // Amp
    'Arts Amp' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/arts-amp-icon.png">Arts Amp</span>',
    'Physical Amp' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/physical-amp-icon.png">Physical Amp</span>',
    'Electric Amp' : '<span class="format-span color-electric underline"><img class="image-icon" src="images/icons/electric-amp-icon.png">Electric Amp</span>',
    'Nature Amp' : '<span class="format-span color-nature underline"><img class="image-icon" src="images/icons/nature-amp-icon.png">Nature Amp</span>',
    'Cryo Amp' : '<span class="format-span color-cryo underline"><img class="image-icon" src="images/icons/cryo-amp-icon.png">Cryo Amp</span>',
    'Heat Amp' : '<span class="format-span color-heat underline"><img class="image-icon" src="images/icons/heat-amp-icon.png">Heat Amp</span>',

    // Bold
    'FINISHER:' : '<span class="format-span body-text-bold">FINISHER</span>:',
    'COMBO TRIGGER' : '<span class="format-span body-text-bold">COMBO TRIGGER</span>',
    'BASIC ATTACK:' : '<span class="format-span body-text-bold">BASIC ATTACK</span>:',
    'DIVE ATTACK:' : '<span class="format-span body-text-bold">DIVE ATTACK</span>:',

    // Misc
    'Final Strike' : '<span class="format-span underline">Final Strike</span>',
    'Link' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/link-icon.png">Link</span>',
    'Protected' : '<span class="format-span color-keyword underline"><img class="image-icon" src="images/icons/protected-icon.png">Protected</span>',

    // Newline to work with div
    '\n' : '<br>'
    
}

const REPLACEMENT_REGEX = new RegExp(
    Object.keys(FORMATTING)
    .sort((a, b) => b.length - a.length)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
    'g'   
);

function ApplyFormatting(text) {
    /*
        Takes the provided input and changes its
        content based on keywords to automatcially
        format it
        :text - The full string of text to be formatted
        :return - The new string after formatting is applied
    */

    text = ApplyCustomKeywordsFormatting(text);

    // Formats note tag
    text = text.replaceAll(/\/note\((.*?)\)/g, '<span class="format-span footnote-text">$1</span>',);

    // Formats num tag
    text = text.replaceAll(/\/num\((.*?)\)/g, '<span class="format-span color-numeric">$1</span>',);

    // Formats stagger tag
    text = text.replaceAll(/\/stagger\((.*?)\)/g, '<span class="format-span color-stagger">$1</span>',);

    return text.replace(REPLACEMENT_REGEX, match => FORMATTING[match]);
}
