function policeMove(type, move) {

    document.getElementById('playerMoves').style.display = 'none';
    policeMoveInProgress = true;

    console.log('The move is "' + move + '", which is a ' + type + ' move.');

    let moveType = type;
    let movePower = 0;
    let moveAccuracy = 0;

    if (availableMoves_police[move] !== undefined) {
        moveType = availableMoves_police[move].type || type;
        movePower = availableMoves_police[move].power;
        moveAccuracy = availableMoves_police[move].accuracy;
    }

    let conditionMet = false;

    if (police.status === "Confused") {
        if (Math.random() < 0.5) {
            writeToPlayerMenu("POLICE OFFICER is confused!");
            police.hp -= (Math.floor(Math.random() * 5) + 5);
            writePoliceInfo();
            writeToPlayerMenu("They hurt themselves in their confusion!");
            conditionMet = true;
        }
    } 

    if (!conditionMet && police.status === "Paralyzed") {
        if (Math.random() < 0.75) {
            writeToPlayerMenu("POLICE OFFICER is paralyzed!");
            writeToPlayerMenu("They can't move!");
            conditionMet = true;
        }
    } 

    if (!conditionMet && police.status === "Poisoned") {
        police.hp -= 5;
        writePoliceInfo();
        conditionMet = true;
    } 

    if (!conditionMet && moveType === "physical") {
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
        damagePlayer((movePower));
    } 

    if (!conditionMet && moveType === "status") {
        damagePlayer((movePower));
        availableMoves_police[move].action.call(police);
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
    } 

    if (!conditionMet && moveType === "special") {
        damagePlayer((movePower));
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
        availableMoves_police[move].action.call(police);
    }

    writePlayerInfo();
    writePoliceInfo();

    messageQueueListener = setInterval(function () {
        if (messageQueue.length === 0) {
            policeMoveInProgress = false;
            clearInterval(messageQueueListener);
            if (!playerMoveInProgress) {
                setTimeout(function () {
                    playerTextElement.style.display = 'none';
                    playerMovesElement.style.display = 'inline-flex';
                    playerMovesElement.style.opacity = "100%";
                    playerMovesElement.style.pointerEvents = 'auto';
                }, playerTextDuration);
            }
        }
    }, 1000);

    document.getElementById('playerHPBarFill').style.animation = "horizontal-shaking 0.15s 1";
    let hpPercentage = (player.lawyers[activeLawyer].hp / player.lawyers[activeLawyer].maxHp) * 100;

    if (player.lawyers[activeLawyer].hp <= 100) {
        document.getElementById('playerHPBarFill').style.width = Math.floor(hpPercentage) + '%';
    }

    if (player.lawyers[activeLawyer].hp <= 0) {
        document.getElementById('playerHPBarFill').style.width = '0%';
        player.lawyers[activeLawyer].hp = 0;
        document.getElementById('playerCurrentHP').innerHTML = "0";
    }

    setTimeout(function () {
        document.getElementById('playerHPBarFill').style.animation = "";
    }, 100);

}

function writePoliceInfo() {

    document.getElementById('enemyCurrentHP').innerHTML = Math.floor(police.hp);
    document.getElementById('enemyStatus').innerHTML = police.status;
    document.getElementById('enemyDefense').innerHTML = Math.floor(police.defense);
    document.getElementById('enemySpeed').innerHTML = Math.floor(police.speed);
    document.getElementById('enemyLuck').innerHTML = Math.floor(police.luck);
    document.getElementById('enemyDamageBonus').innerHTML = Math.floor(police.attack);

    policeMoveInProgress = false;
}

function selectPoliceMove() {

    var moveTypes = ["physical", "status", "special"];
    var selectedMoveType = moveTypes[Math.floor(Math.random() * moveTypes.length)];
    var availableMoves = [];

    switch (selectedMoveType) {
        case "physical":
            availableMoves = Object.keys(availableMoves_police).filter(move => availableMoves_police[move].type === "physical");
            break;
        case "status":
            availableMoves = Object.keys(availableMoves_police).filter(move => availableMoves_police[move].type === "status");
            break;
        case "special":
            availableMoves = Object.keys(availableMoves_police).filter(move => availableMoves_police[move].type === "special");
            break;
    }

    var selectedMoveName = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    if (police.hp < 50) {
        selectedMoveName = availableMoves.find(move => availableMoves_police[move].power > 70) || selectedMoveName;
    }

    if (police.luck > 7) {
        selectedMoveName = availableMoves.find(move => availableMoves_police[move].accuracy < 70) || selectedMoveName;
    }

    // Check if the selected move is indeed of the selected type
    if (availableMoves_police[selectedMoveName].type !== selectedMoveType) {
        throw new Error(`The move "${selectedMoveName}" is not a "${selectedMoveType}" move.`);
    }

    return { type: selectedMoveType, move: selectedMoveName };

}