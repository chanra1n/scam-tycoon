function playerMove(lawyer, type, move) {

    // get the pp of the move
    let pp = player.lawyers[lawyer].moveset[type + "PP"];

    if (pp < 1 || pp == 0) {
        writeToPlayerMenu(lawyer + " CAN'T USE THAT MOVE!");
        setTimeout(function () {
            document.getElementById('playerMoves').style.display = 'inline-flex';
            document.getElementById('playerText').style.display = 'none';
        }, playerTextDuration);
        return;
    }

    document.getElementById('playerMoves').style.display = 'none';

    playerMoveInProgress = true;

    lawyer = activeLawyer;
    luckVarHack = player.lawyers[lawyer].luck;

    console.log('The lawyer is ' + lawyer + '. The move is "' + move + '", which is a ' + type + ' move.');

    let moveExists = false;
    let movePP = 0;

    let isMoveSuccessful = true;

    if (player.lawyers[lawyer].status === "Confused") {
        if (Math.random() < 0.5) {
            writeToPlayerMenu(lawyer + " is confused!");
            console.log("Confused. Hitting self.");
            var damageToTake = (Math.floor(Math.random() * 5) + 10);
            player.lawyers[lawyer].hp -= damageToTake;
            if (player.lawyers[lawyer].hp < 0) {
                player.lawyers[lawyer].hp = 0;
            }

            var currentMaxHP;

            switch(activeLawyer) {
                case "lawyer1":
                    currentMaxHP = lawyer1maxHP;
                    break;
                case "lawyer2":
                    currentMaxHP = lawyer2maxHP;
                    break;
                case "lawyer3":
                    currentMaxHP = lawyer3maxHP;
                    break;
                case "lawyer4":
                    currentMaxHP = lawyer4maxHP;
                    break;
                case "lawyer5":
                    currentMaxHP = lawyer5maxHP;
                    break;
                case "lawyer6":
                    currentMaxHP = lawyer6maxHP;
                    break;
                default:
                    console.error("Invalid activeLawyer value");
            }

            document.getElementById('playerHPBarFill').style.width = (this.hp / currentMaxHP) * 100 + "%";
            console.log("Damage taken: " + damageToTake);
            writePlayerInfo();
            writeToPlayerMenu("They hurt themselves in their confusion!");
            isMoveSuccessful = false;
        }
    } 

    if (isMoveSuccessful && player.lawyers[lawyer].status === "Paralyzed") {
        if (Math.random() < 0.75) {
            writeToPlayerMenu(lawyer + " is paralyzed!");
            writeToPlayerMenu("They can't move!");
            isMoveSuccessful = false;
        }
    } 

    if (player.lawyers[lawyer].status === "Poisoned") {
        player.lawyers[lawyer].hp -= 5;
        writePlayerInfo();
    } 

    if (isMoveSuccessful) {
        if (type === "physical") {
            player.lawyers[lawyer].moveset.physicalPP -= 1;
            damagePolice(physicalMoves_player[move].power);
            writeToPlayerMenu(lawyer + " used " + move + "!");
        } else if (type === "status") {
            player.lawyers[lawyer].moveset.statusPP -= 1;
            writeToPlayerMenu(lawyer + " used " + move + "!");
            damagePolice(statusMoves_player[move].power);
            statusMoves_player[move].action.call(player.lawyers[lawyer]);
        } else if (type === "special") {
            player.lawyers[lawyer].moveset.specialPP -= 1;
            writeToPlayerMenu(lawyer + " used " + move + "!");
            damagePolice(specialMoves_player[move].power);
            specialMoves_player[move].action.call(player.lawyers[lawyer]);
        }
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
    document.getElementById('playerDefense').innerHTML = (Math.floor(player.lawyers[activeLawyer].defense) == player.lawyers[activeLawyer].defense) ? player.lawyers[activeLawyer].defense : player.lawyers[activeLawyer].defense.toFixed(1);
    document.getElementById('playerSpeed').innerHTML = (Math.floor(player.lawyers[activeLawyer].speed) == player.lawyers[activeLawyer].speed) ? player.lawyers[activeLawyer].speed : player.lawyers[activeLawyer].speed.toFixed(1);
    document.getElementById('playerLuck').innerHTML = (Math.floor(player.lawyers[activeLawyer].luck) == player.lawyers[activeLawyer].luck) ? player.lawyers[activeLawyer].luck : player.lawyers[activeLawyer].luck.toFixed(1);
    document.getElementById('playerDamageBonus').innerHTML = (Math.floor(player.lawyers[activeLawyer].attack) == player.lawyers[activeLawyer].attack) ? player.lawyers[activeLawyer].attack : player.lawyers[activeLawyer].attack.toFixed(1);

    document.getElementById('playerCurrentHP').innerHTML = Math.floor(player.lawyers[activeLawyer].hp);
    let maxHp;
    switch (activeLawyer) {
        case 'lawyer1':
            maxHp = lawyer1maxHP;
            break;
        case 'lawyer2':
            maxHp = lawyer2maxHP;
            break;
        case 'lawyer3':
            maxHp = lawyer3maxHP;
            break;
        case 'lawyer4':
            maxHp = lawyer4maxHP;
            break;
        case 'lawyer5':
            maxHp = lawyer5maxHP;
            break;
        case 'lawyer6':
            maxHp = lawyer6maxHP;
            break;
        default:
            console.error('Invalid activeLawyer value');
            break;
    }

    document.getElementById('playerTotalHP').innerHTML = "/" + Math.floor(maxHp);

    document.getElementById('playerHPBarFill').style.width = (player.lawyers[activeLawyer].hp / maxHp) * 100 + "%";

    document.getElementById('move1Title').innerHTML = player.lawyers[activeLawyer].moveset.physicalMove;
    
    if (player.lawyers[activeLawyer].moveset.physicalPP <= 0) {
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
    
    if (player.lawyers[activeLawyer].moveset.statusPP <= 0) {
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
    
    if (player.lawyers[activeLawyer].moveset.specialPP <= 0) {
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

    document.getElementById('lawyer1name').innerHTML = player.lawyers.lawyer1.name;
    document.getElementById('lawyer2name').innerHTML = player.lawyers.lawyer2.name;
    document.getElementById('lawyer3name').innerHTML = player.lawyers.lawyer3.name;
    document.getElementById('lawyer4name').innerHTML = player.lawyers.lawyer4.name;
    document.getElementById('lawyer5name').innerHTML = player.lawyers.lawyer5.name;
    document.getElementById('lawyer6name').innerHTML = player.lawyers.lawyer6.name;

    document.getElementById('lawyer1physicalmove').innerHTML = player.lawyers.lawyer1.moveset.physicalMove;
    document.getElementById('lawyer2physicalmove').innerHTML = player.lawyers.lawyer2.moveset.physicalMove;
    document.getElementById('lawyer3physicalmove').innerHTML = player.lawyers.lawyer3.moveset.physicalMove;
    document.getElementById('lawyer4physicalmove').innerHTML = player.lawyers.lawyer4.moveset.physicalMove;
    document.getElementById('lawyer5physicalmove').innerHTML = player.lawyers.lawyer5.moveset.physicalMove;
    document.getElementById('lawyer6physicalmove').innerHTML = player.lawyers.lawyer6.moveset.physicalMove;


    document.getElementById('lawyer1physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer1.moveset.physicalMove].power || "-";
    document.getElementById('lawyer2physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer2.moveset.physicalMove].power || "-";
    document.getElementById('lawyer3physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer3.moveset.physicalMove].power || "-";
    document.getElementById('lawyer4physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer4.moveset.physicalMove].power || "-";
    document.getElementById('lawyer5physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer5.moveset.physicalMove].power || "-";
    document.getElementById('lawyer6physicalmovedamage').innerHTML = physicalMoves_player[player.lawyers.lawyer6.moveset.physicalMove].power || "-";

    document.getElementById('lawyer1statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer1.moveset.statusMove].power || "-";
    document.getElementById('lawyer2statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer2.moveset.statusMove].power || "-";
    document.getElementById('lawyer3statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer3.moveset.statusMove].power || "-";
    document.getElementById('lawyer4statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer4.moveset.statusMove].power || "-";
    document.getElementById('lawyer5statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer5.moveset.statusMove].power || "-";
    document.getElementById('lawyer6statusmovedamage').innerHTML = statusMoves_player[player.lawyers.lawyer6.moveset.statusMove].power || "-";

    document.getElementById('lawyer1specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer1.moveset.specialMove].power || "-";
    document.getElementById('lawyer2specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer2.moveset.specialMove].power || "-";
    document.getElementById('lawyer3specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer3.moveset.specialMove].power || "-";
    document.getElementById('lawyer4specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer4.moveset.specialMove].power || "-";
    document.getElementById('lawyer5specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer5.moveset.specialMove].power || "-";
    document.getElementById('lawyer6specialmovedamage').innerHTML = specialMoves_player[player.lawyers.lawyer6.moveset.specialMove].power || "-";


    document.getElementById('lawyer1statusmove').innerHTML = player.lawyers.lawyer1.moveset.statusMove;
    document.getElementById('lawyer2statusmove').innerHTML = player.lawyers.lawyer2.moveset.statusMove;
    document.getElementById('lawyer3statusmove').innerHTML = player.lawyers.lawyer3.moveset.statusMove;
    document.getElementById('lawyer4statusmove').innerHTML = player.lawyers.lawyer4.moveset.statusMove;
    document.getElementById('lawyer5statusmove').innerHTML = player.lawyers.lawyer5.moveset.statusMove;
    document.getElementById('lawyer6statusmove').innerHTML = player.lawyers.lawyer6.moveset.statusMove;

    document.getElementById('lawyer1specialmove').innerHTML = player.lawyers.lawyer1.moveset.specialMove;
    document.getElementById('lawyer2specialmove').innerHTML = player.lawyers.lawyer2.moveset.specialMove;
    document.getElementById('lawyer3specialmove').innerHTML = player.lawyers.lawyer3.moveset.specialMove;
    document.getElementById('lawyer4specialmove').innerHTML = player.lawyers.lawyer4.moveset.specialMove;
    document.getElementById('lawyer5specialmove').innerHTML = player.lawyers.lawyer5.moveset.specialMove;
    document.getElementById('lawyer6specialmove').innerHTML = player.lawyers.lawyer6.moveset.specialMove;

    if (player.lawyers.lawyer1.hp == 0) {
        document.getElementById('lawyer1select').style.opacity = "25%";
        document.getElementById('lawyer1select').style.pointerEvents = 'none';
        document.getElementById('lawyer1HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer1callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer1HP').innerHTML = Math.floor(player.lawyers.lawyer1.hp) + "/" + lawyer1maxHP;
    }

    if (player.lawyers.lawyer2.hp == 0) {
        document.getElementById('lawyer2select').style.opacity = "25%";
        document.getElementById('lawyer2select').style.pointerEvents = 'none';
        document.getElementById('lawyer2HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer2callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer2HP').innerHTML = Math.floor(player.lawyers.lawyer2.hp) + "/" + lawyer2maxHP;
    }

    if (player.lawyers.lawyer3.hp == 0) {
        document.getElementById('lawyer3select').style.opacity = "25%";
        document.getElementById('lawyer3select').style.pointerEvents = 'none';
        document.getElementById('lawyer3HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer3callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer3HP').innerHTML = Math.floor(player.lawyers.lawyer3.hp) + "/" + lawyer3maxHP;
    }

    if (player.lawyers.lawyer4.hp == 0) {
        document.getElementById('lawyer4select').style.opacity = "25%";
        document.getElementById('lawyer4select').style.pointerEvents = 'none';
        document.getElementById('lawyer4HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer4callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer4HP').innerHTML = Math.floor(player.lawyers.lawyer4.hp) + "/" + lawyer4maxHP;
    }

    if (player.lawyers.lawyer5.hp == 0) {
        document.getElementById('lawyer5select').style.opacity = "25%";
        document.getElementById('lawyer5select').style.pointerEvents = 'none';
        document.getElementById('lawyer5HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer5callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer5HP').innerHTML = Math.floor(player.lawyers.lawyer5.hp) + "/" + lawyer5maxHP;
    }

    if (player.lawyers.lawyer6.hp == 0) {
        document.getElementById('lawyer6select').style.opacity = "25%";
        document.getElementById('lawyer6select').style.pointerEvents = 'none';
        document.getElementById('lawyer6HP').innerHTML = "DISBARRED";
        document.getElementById('lawyer6callbutton').innerHTML = "UNAVAILABLE";
    } else {
    document.getElementById('lawyer6HP').innerHTML = Math.floor(player.lawyers.lawyer6.hp) + "/" + lawyer6maxHP;
    }

    playerMoveInProgress = false;

}

function selectLawyer(lawyer) {
    activeLawyer = lawyer;
    writePlayerInfo();
    document.getElementById('lawyerSelection').style.opacity = "0%";
    document.getElementById('lawyerSelection').style.pointerEvents = 'none';

    let lawyerHP = player.lawyers[activeLawyer].hp;
    let lawyerMaxHP;
    switch(activeLawyer) {
        case 'lawyer1':
            lawyerMaxHP = lawyer1maxHP;
            break;
        case 'lawyer2':
            lawyerMaxHP = lawyer2maxHP;
            break;
        case 'lawyer3':
            lawyerMaxHP = lawyer3maxHP;
            break;
        case 'lawyer4':
            lawyerMaxHP = lawyer4maxHP;
            break;
        case 'lawyer5':
            lawyerMaxHP = lawyer5maxHP;
            break;
        case 'lawyer6':
            lawyerMaxHP = lawyer6maxHP;
            break;
        default:
            console.error('Invalid activeLawyer');
    }

    let hpBarFillPercentage = Math.min((lawyerHP / lawyerMaxHP) * 100, 100);
    document.getElementById('playerHPBarFill').style.width = hpBarFillPercentage + "%";

    writeToPlayerMenu(player.lawyers[activeLawyer].name + " COMES TO YOUR DEFENSE!");

    setTimeout(function () {
        playerTextElement.style.display = 'none';
        playerMovesElement.style.display = 'inline-flex';
        playerMovesElement.style.opacity = "100%";
        playerMovesElement.style.pointerEvents = 'auto';
    }, playerTextDuration);

    // set the pp value of each move in every lawyer's moveset to the pp value of the move in the playermovesdictionary.
    player.lawyers.lawyer1.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer1.moveset.physicalMove].pp;
    player.lawyers.lawyer1.moveset.statusPP = statusMoves_player[player.lawyers.lawyer1.moveset.statusMove].pp;
    player.lawyers.lawyer1.moveset.specialPP = specialMoves_player[player.lawyers.lawyer1.moveset.specialMove].pp;

    player.lawyers.lawyer2.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer2.moveset.physicalMove].pp;
    player.lawyers.lawyer2.moveset.statusPP = statusMoves_player[player.lawyers.lawyer2.moveset.statusMove].pp;
    player.lawyers.lawyer2.moveset.specialPP = specialMoves_player[player.lawyers.lawyer2.moveset.specialMove].pp;

    player.lawyers.lawyer3.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer3.moveset.physicalMove].pp;
    player.lawyers.lawyer3.moveset.statusPP = statusMoves_player[player.lawyers.lawyer3.moveset.statusMove].pp;
    player.lawyers.lawyer3.moveset.specialPP = specialMoves_player[player.lawyers.lawyer3.moveset.specialMove].pp;

    player.lawyers.lawyer4.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer4.moveset.physicalMove].pp;
    player.lawyers.lawyer4.moveset.statusPP = statusMoves_player[player.lawyers.lawyer4.moveset.statusMove].pp;
    player.lawyers.lawyer4.moveset.specialPP = specialMoves_player[player.lawyers.lawyer4.moveset.specialMove].pp;

    player.lawyers.lawyer5.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer5.moveset.physicalMove].pp;
    player.lawyers.lawyer5.moveset.statusPP = statusMoves_player[player.lawyers.lawyer5.moveset.statusMove].pp;
    player.lawyers.lawyer5.moveset.specialPP = specialMoves_player[player.lawyers.lawyer5.moveset.specialMove].pp;

    player.lawyers.lawyer6.moveset.physicalPP = physicalMoves_player[player.lawyers.lawyer6.moveset.physicalMove].pp;
    player.lawyers.lawyer6.moveset.statusPP = statusMoves_player[player.lawyers.lawyer6.moveset.statusMove].pp;
    player.lawyers.lawyer6.moveset.specialPP = specialMoves_player[player.lawyers.lawyer6.moveset.specialMove].pp;

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

function playerWinsAction() {
    writeToParentDocument("PLAYER WINS");
}

// let's write a function that passes a string to the parent document.
// after all, this is an iframe, and we need to communicate with the parent document.

function writeToParentDocument(message) {
    window.parent.postMessage(message, '*');
}
