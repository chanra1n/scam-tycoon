function playerMove(lawyer, type, move) {

    document.getElementById('playerMoves').style.display = 'none';

    playerMoveInProgress = true;

    lawyer = activeLawyer;
    luckVarHack = player.lawyers[lawyer].luck;

    console.log('The lawyer is ' + lawyer + '. The move is "' + move + '", which is a ' + type + ' move.');

    let moveExists = false;
    let movePP = 0;

    if (player.lawyers[lawyer].status === "Confused") {
    // 50% chance of attack failing, and attacking self instead with 5-10 damage. no matter what.
        if (Math.random() < 0.5) {
            writeToPlayerMenu(lawyer + " is confused!");
            player.lawyers[lawyer].hp -= (Math.floor(Math.random() * 5) + 5);
            writePlayerInfo();
            writeToPlayerMenu("They hurt themselves in their confusion!");
            return;
        }
    } 

    if (player.lawyers[lawyer].status === "Paralyzed") {
    // 75% chance of attack failing. no damage taken if attack fails.
        if (Math.random() < 0.75) {
            writeToPlayerMenu(lawyer + " is paralyzed!");
            writeToPlayerMenu("They can't move!");

            return;
        }
    } 

    if (player.lawyers[lawyer].status === "Poisoned") {
    // 5 damage taken per turn, no matter what.
        player.lawyers[lawyer].hp -= 5;
        writePlayerInfo();
    } 


    if (type === "physical") {
        player.lawyers[lawyer].moveset.physicalPP -= 1;
        damagePolice(physicalMoves_player[move].power);
        writeToPlayerMenu(lawyer + " used " + move + "!");
    } 
    
    if (type === "status") {
        player.lawyers[lawyer].moveset.statusPP -= 1;
        damagePolice(statusMoves_player[move].power);
        statusMoves_player[move].action.call(player.lawyers[lawyer]);
        writeToPlayerMenu(lawyer + " used " + move + "!");
    } 

    if (type === "special") {
        player.lawyers[lawyer].moveset.specialPP -= 1;
        damagePolice(specialMoves_player[move].power);
        specialMoves_player[move].action.call(player.lawyers[lawyer]);
        writeToPlayerMenu(lawyer + " used " + move + "!");
    }

    writePlayerInfo();
    writePoliceInfo();

    messageQueueListener = setInterval(function () {
        if (messageQueue.length === 0) {
            playerMoveInProgress = false;
            clearInterval(messageQueueListener);
            if (!policeMoveInProgress) {
                setTimeout(function () {
                    policeMove(selectPoliceMove().type, selectPoliceMove().move);
                    playerTextElement.style.display = 'inline-flex';
                    playerMovesElement.style.display = 'none';
                    playerMovesElement.style.opacity = "0%";
                    playerMovesElement.style.pointerEvents = 'none';
                }, playerTextDuration);
            }
        }
    }
        , 1000);

    document.getElementById('enemyHPBarFill').style.animation = "horizontal-shaking 0.15s 1";
    if (police.hp <= policeMaxHP) {
        console.log(policeMaxHP);

        let hpPercentage = (police.hp / policeMaxHP) * 100;


        document.getElementById('enemyHPBarFill').style.width = Math.floor(hpPercentage) + '%';
    }

    if (police.hp <= 0) {
        document.getElementById('enemyHPBarFill').style.width = '0%';
        document.getElementById('enemyCurrentHP').innerHTML = "0";
        police.hp = 0;
    }

    setTimeout(function () {
        document.getElementById('enemyHPBarFill').style.animation = "";
    }, 100);

}

function writePlayerInfo() {

    luckVarHack = player.lawyers[activeLawyer].luck;

    document.getElementById('playerName').innerHTML = player.lawyers[activeLawyer].name;
    document.getElementById('playerStatus').innerHTML = player.lawyers[activeLawyer].status;
    document.getElementById('playerDefense').innerHTML = Math.floor(player.lawyers[activeLawyer].defense);
    document.getElementById('playerSpeed').innerHTML = Math.floor(player.lawyers[activeLawyer].speed);
    document.getElementById('playerLuck').innerHTML = Math.floor(player.lawyers[activeLawyer].luck);

    document.getElementById('playerCurrentHP').innerHTML = Math.floor(player.lawyers[activeLawyer].hp);

    document.getElementById('move1Title').innerHTML = player.lawyers[activeLawyer].moveset.physicalMove;
    
    if (player.lawyers[activeLawyer].moveset.physicalPP == 0) {
        document.getElementById('move1PP').innerHTML = "--";
    } else {
        document.getElementById('move1PP').innerHTML = Math.floor(player.lawyers[activeLawyer].moveset.physicalPP);
    }

    if (physicalMoves_player[player.lawyers[activeLawyer].moveset.physicalMove].power == 0) {
        document.getElementById('move1Damage').innerHTML = "--";
    } else {
        document.getElementById('move1Damage').innerHTML = Math.floor(physicalMoves_player[player.lawyers[activeLawyer].moveset.physicalMove].power);
    }

    document.getElementById('move1Description').innerHTML = physicalMoves_player[player.lawyers[activeLawyer].moveset.physicalMove].description;
    document.getElementById('playerMove1').setAttribute('onclick', 'playerMove("' + activeLawyer + '", "physical", "' + player.lawyers[activeLawyer].moveset.physicalMove + '")');

    document.getElementById('move2Title').innerHTML = player.lawyers[activeLawyer].moveset.statusMove;
    
    if (player.lawyers[activeLawyer].moveset.statusPP == 0) {
        document.getElementById('move2PP').innerHTML = "--";
    }
    else {
        document.getElementById('move2PP').innerHTML = Math.floor(player.lawyers[activeLawyer].moveset.statusPP);
    }

    if (statusMoves_player[player.lawyers[activeLawyer].moveset.statusMove].power == 0 && player.lawyers[activeLawyer].moveset.statusMove !== "Hail Mary") {
        document.getElementById('move2Damage').innerHTML = "--";
    } else if (player.lawyers[activeLawyer].moveset.statusMove === "Hail Mary") {
        console.log("Hail Mary power is " + luckVarHack);
        document.getElementById('move2Damage').innerHTML = Math.floor(player.lawyers[activeLawyer].luck);
    } else {
        document.getElementById('move2Damage').innerHTML = Math.floor(statusMoves_player[player.lawyers[activeLawyer].moveset.statusMove].power);
    }

    document.getElementById('move2Description').innerHTML = statusMoves_player[player.lawyers[activeLawyer].moveset.statusMove].description;
    document.getElementById('playerMove2').setAttribute('onclick', 'playerMove("' + activeLawyer + '", "status", "' + player.lawyers[activeLawyer].moveset.statusMove + '")');

    document.getElementById('move3Title').innerHTML = player.lawyers[activeLawyer].moveset.specialMove;
    
    if (player.lawyers[activeLawyer].moveset.specialPP == 0) {
        document.getElementById('move3PP').innerHTML = "--";
    } else {
        document.getElementById('move3PP').innerHTML = Math.floor(player.lawyers[activeLawyer].moveset.specialPP);
    }

    if (specialMoves_player[player.lawyers[activeLawyer].moveset.specialMove].power == 0) {
        document.getElementById('move3Damage').innerHTML = "--";
    } else {
        document.getElementById('move3Damage').innerHTML = Math.floor(specialMoves_player[player.lawyers[activeLawyer].moveset.specialMove].power);
    }
    
    document.getElementById('move3Description').innerHTML = specialMoves_player[player.lawyers[activeLawyer].moveset.specialMove].description;
    document.getElementById('playerMove3').setAttribute('onclick', 'playerMove("' + activeLawyer + '", "special", "' + player.lawyers[activeLawyer].moveset.specialMove + '")');

    playerMoveInProgress = false;

}

function selectLawyer(lawyer) {
    activeLawyer = lawyer;
    writePlayerInfo();
}

function selectRandomPlayerMove() {
    var moveTypes = ["physical", "status", "special"];
    var selectedMoveType = moveTypes[Math.floor(Math.random() * moveTypes.length)];
    var availableMoves = [];

    switch (selectedMoveType) {
        case "physical":
            availableMoves = Object.keys(physicalMoves_player);
            break;
        case "status":
            availableMoves = Object.keys(statusMoves_player);
            break;
        case "special":
            availableMoves = Object.keys(specialMoves_player);
            break;
    }

    var selectedMoveName = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    if (player.lawyers[activeLawyer].moveset[selectedMoveType + "PP"] < 1) {
        selectedMoveName = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    return { type: selectedMoveType, move: selectedMoveName };
}