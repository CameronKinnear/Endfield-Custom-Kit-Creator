function PromoteStat(selectedStat) {
    if (selectedStat.value == 1) {
        MakeSubStat(selectedStat);
    }
    else if (selectedStat.value == 2) {
        MakeMainStat(selectedStat);
    }
    else {
        MakeInactiveStat(selectedStat);
    }
}

function MakeInactiveStat(stat) {
    let statImg = GetStatImage(stat);
    statImg.classList.remove('main-stat');
    statImg.classList.add('inactive-stat');
    stat.value = 1;
}

function MakeSubStat(stat) {
    let statImg = GetStatImage(stat);
    statImg.classList.remove('inactive-stat');
    statImg.classList.add('sub-stat');
    stat.value = 2;
}

function MakeMainStat(stat) {
    let statImg = GetStatImage(stat);
    statImg.classList.remove('sub-stat');
    statImg.classList.add('main-stat');
    stat.value = 3;
}

function GetStatImage(stat) {
    if (stat.dataset.type == 'str') {
        return document.getElementById('str-img');
    }
    if (stat.dataset.type == 'agl') {
        return document.getElementById('agl-img');
    }
    if (stat.dataset.type == 'int') {
        return document.getElementById('int-img');
    }
    if (stat.dataset.type == 'wil') {
        return document.getElementById('wil-img');
    }
}