function policeMove(type, move) {

    if (!playerWins) {

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
    } else if (police.status === "Paralyzed") {
        if (Math.random() < 0.75) {
            writeToPlayerMenu("POLICE OFFICER is paralyzed!");
            writeToPlayerMenu("They can't move!");
            conditionMet = true;
        }
    } else if (police.status === "Poisoned") {
        police.hp -= 5;
        writePoliceInfo();
        conditionMet = true;
    } 

    if (!conditionMet) {
        if (moveType === "physical") {
            writeToPlayerMenu("POLICE OFFICER used " + move + "!");
            damagePlayer((movePower));
        } else if (moveType === "status") {
            writeToPlayerMenu("POLICE OFFICER used " + move + "!");
            damagePlayer((movePower));
            availableMoves_police[move].action.call(police);
        } else if (moveType === "special") {
            writeToPlayerMenu("POLICE OFFICER used " + move + "!");
            damagePlayer((movePower));
            availableMoves_police[move].action.call(police);
        }
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
    let activeLawyerMaxHP;
    
    switch (activeLawyer) {
        case 'lawyer1':
            activeLawyerMaxHP = lawyer1maxHP;
            break;
        case 'lawyer2':
            activeLawyerMaxHP = lawyer2maxHP;
            break;
        case 'lawyer3':
            activeLawyerMaxHP = lawyer3maxHP;
            break;
        case 'lawyer4':
            activeLawyerMaxHP = lawyer4maxHP;
            break;
        case 'lawyer5':
            activeLawyerMaxHP = lawyer5maxHP;
            break;
        case 'lawyer6':
            activeLawyerMaxHP = lawyer6maxHP;
            break;
        default:
            console.log("Invalid activeLawyer value");
    }

    let hpPercentage = (player.lawyers[activeLawyer].hp / activeLawyerMaxHP) * 100;

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
}

function writePoliceInfo() {

    document.getElementById('enemyCurrentHP').innerHTML = Math.floor(police.hp);
    document.getElementById('enemyStatus').innerHTML = police.status;
    document.getElementById('enemyDefense').innerHTML = (Math.floor(police.defense) == police.defense) ? police.defense : police.defense.toFixed(1);
    document.getElementById('enemySpeed').innerHTML = (Math.floor(police.speed) == police.speed) ? police.speed : police.speed.toFixed(1);
    document.getElementById('enemyLuck').innerHTML = (Math.floor(police.luck) == police.luck) ? police.luck : police.luck.toFixed(1);
    document.getElementById('enemyDamageBonus').innerHTML = (Math.floor(police.attack) == police.attack) ? police.attack : police.attack.toFixed(1);

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

function policeWinsAction() {
    alert('THE COPS WON!');
}
