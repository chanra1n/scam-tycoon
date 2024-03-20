var player = {
    name: "Player",
    lawyers: {
        // the player can have 6 lawyers.
        lawyer1: {
            name: "Lawyer1",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Objection",
                physicalPP: 25,
                statusMove: "Recess",
                statusPP: 10,
                specialMove: "Overruled",
                specialPP: 5
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        },
        lawyer2: {
            name: "Lawyer2",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Present Evidence",
                physicalPP: 25,
                statusMove: "Legal Defense",
                statusPP: 20,
                specialMove: "Hung Jury",
                specialPP: 10
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        },
        lawyer3: {
            name: "Lawyer3",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Rebuttal",
                physicalPP: 25,
                statusMove: "Compelling Evidence",
                statusPP: 15,
                specialMove: "Act of God",
                specialPP: 15
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        },
        lawyer4: {
            name: "Lawyer4",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Cross Examination",
                physicalPP: 25,
                statusMove: "Witness Testimony",
                statusPP: 5,
                specialMove: "Chewbakka Defense",
                specialPP: 20
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        },
        lawyer5: {
            name: "Lawyer5",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Sustained Objection",
                physicalPP: 25,
                statusMove: "Hail Mary",
                statusPP: 15,
                specialMove: "Chewbakka Defense",
                specialPP: 20
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        },
        lawyer6: {
            name: "Lawyer6",
            status: "Healthy",
            hp: 100,
            moveset: {
                physicalMove: "Objection",
                physicalPP: 25,
                statusMove: "Recess",
                statusPP: 10,
                specialMove: "Overruled",
                specialPP: 5
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        }

    }
}

var activeLawyer = "lawyer1";

var police = {
    name: "Police",
    status: "Healthy",
    hp: 100,
    moveset: {
        physicalMove: "",
        statusMove: "",
        specialMove: ""
    },
    defense: 5,
    speed: 5,
    luck: 5,
    attack: 5
}

var physicalMoves_player = {
    "Objection": {
        "type": "physical",
        "power": 50,
        "accuracy": 90,
        "pp": 25,
        "description": "A basic move."
    },
    "Present Evidence": {
        "type": "physical",
        "power": 70,
        "accuracy": 75,
        "pp": 20,
        "description": "May not work, but it's worth a shot."
    },
    "Rebuttal": {
        "type": "physical",
        "power": 80,
        "accuracy": 70,
        "pp": 15,
        "description": "What the other guy said is wrong, and here's why."
    },
    "Cross Examination": {
        "type": "physical",
        "power": 40,
        "accuracy": 95,
        "pp": 30,
        "description": "Ask some questions, maybe they'll slip up."
    },
    "Sustained Objection": {
        "type": "physical",
        "power": 90,
        "accuracy": 60,
        "pp": 10,
        "description": "A strong move, but it's hard to pull off."
    }

};

var statusMoves_player = {
    "Recess": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 10,
        "description": "Take a break and heal up.",
        "action": function () {
            this.hp += this.hp * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s HP was restored!");
        }
    },
    "Legal Defense": {
        "type": "status",
        "power": 0,
        "accuracy": 90,
        "pp": 20,
        "description": "Definitely helps your case, but it might not work.",
        "action": function () {
            this.defense += this.defense * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense fell!");
        }

    },
    "Compelling Evidence": {
        "type": "status",
        "power": 0,
        "accuracy": 80,
        "pp": 15,
        "description": "Increases your attack power, but it's not guaranteed.",
        "action": function () {
            this.attack += this.attack * 0.25;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s attack rose!");
        }

    },
    "Witness Testimony": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 5,
        "description": "Let's call in the witness.",
        "action": function () {
            this.speed += this.speed * 0.1;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s speed rose!");
        }
    },
    "Hail Mary": {
        "type": "status",
        "power": 0,
        "accuracy": 70,
        "pp": 15,
        "description": "A last-ditch effort to turn the tide of the battle.",
        "action": function () {
            this.luck += this.luck * 0.5;
            police.luck -= police.luck * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s became luckier!");
        }
    },

};

var specialMoves_player = {
    "Overruled": {
        "type": "special",
        "power": 100,
        "accuracy": 70,
        "pp": 5,
        "description": "The judge has spoken."
    },
    "Hung Jury": {
        "type": "special",
        "power": 0,
        "accuracy": 100,
        "pp": 10,
        "description": "This may fail, but it's worth the risk.",
        "action": function () {
            this.luck += this.luck * 0.25;
            police.status = "Paralyzed";
        }
    },
    "Act of God": {
        "type": "special",
        "power": 150,
        "accuracy": 80,
        "pp": 15,
        "description": "A bolt of lightning inexplicably strikes the opponent.",
        "action": function () {
            this.luck -= this.luck * 0.1;
        }
    },
    "Chewbakka Defense": {
        "type": "special",
        "power": 0,
        "accuracy": 60,
        "pp": 20,
        "description": "It doesn't make sense!",
        "action": function () {
            this.luck += this.luck * 0.5;
            this.status = "Confused";
            police.status = "Confused";
        }
    },
};

var availableMoves_police = {
    "Taser Shock": {
        "type": "physical",
        "power": 20,
        "accuracy": 90,
        "pp": 25,
        "description": "ACAB"
    },
    // mid level attack. does damage.
    "Pepper Spray": {
        "type": "physical",
        "power": 25,
        "accuracy": 80,
        "pp": 20,
        "description": "Damn, that stings."
    },
    // high level attack. does damage. less accurate.
    "Baton Strike": {
        "type": "physical",
        "power": 40,
        "accuracy": 65,
        "pp": 15,
        "description": "Oh no, scawy baton."
    },

    // low level status move. increases defense.    
    "Qualified Immunity": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 10,
        "description": "I can do whatever I want.",
        "action": function () {
            this.defense += this.defense * 0.4;
            writeToPlayerMenu("POLICE OFFICER's defense rose!");
        }
    },
    "Old Boy Assist": {
        "type": "status",
        "power": 0,
        "accuracy": 80,
        "pp": 20,
        "description": "I know a guy who knows a guy.",
        "action": function () {
            this.attack += this.attack * 0.25;
            this.defense += this.defense * 0.1;
            writeToPlayerMenu("POLICE OFFICER's attack rose!");
            writeToPlayerMenu("POLICE OFFICER's defense rose!");
        }
    },
    "The Court of Public Opinion": {
        "type": "status",
        "power": 0,
        "accuracy": 70,
        "pp": 15,
        "description": "Your badge doesn't earn you respect, your actions do.",
        "action": function () {
            this.speed += this.speed * 0.1;
            writeToPlayerMenu("POLICE OFFICER's speed rose!");
        }
    },

    "Blue Wall": {
        "type": "special",
        "power": 80,
        "accuracy": 70,
        "pp": 5,
        "description": "🌰🔫👮🏻‍♂️",
        "action": function () {
            this.luck += this.luck * 0.25;
            player.status = "Paralyzed";
            this.defense += this.defense * 0.25;
            writeToPlayerMenu("POLICE OFFICER's defense rose!");
            writeToPlayerMenu("POLICE OFFICER got luckier!");
            writeToPlayerMenu(player.lawyers[activeLawyer].name + " became paralyzed! It may be unable to move!");
        }
    },
    "Thin Blue Line": {
        "type": "special",
        "power": 100,
        "accuracy": 60,
        "pp": 10,
        "description": "Oh, give me a break.",
        "action": function () {
            this.luck += this.luck * 0.25;
            this.status = "Confused";
            writeToPlayerMenu("POLICE OFFICER got luckier!");
            writeToPlayerMenu("POLICE OFFICER became confused!");
        }
    },
    "Brutality": {
        "type": "special",
        "power": 120,
        "accuracy": 50,
        "pp": 15,
        "description": "Yeahhhhhh...",
        "action": function () {
            this.luck -= this.luck * 0.5;
            this.defense -= this.defense * 0.5;
            this.attack += this.attack * 0.5;
            writeToPlayerMenu("POLICE OFFICER's attack rose!");
            writeToPlayerMenu("POLICE OFFICER's became unluckier!");
            writeToPlayerMenu("POLICE OFFICER's defense fell!");

        }
    }
};

var playerTextDuration = 2500;

var messageQueue = [];
var isWriting = false;

function writeToPlayerMenu(text) {
    messageQueue.push(text);
    if (!isWriting) {
        writeNextMessage();
    }
}

function writeNextMessage() {
    if (messageQueue.length > 0) {
        isWriting = true;
        var text = messageQueue.shift();
        const instance = new Typewriter('#playerText', {
            strings: [text],
            autoStart: true,
            loop: false,
            delay: 0,
            deleteSpeed: 0,
            cursor: '',
            pauseFor: playerTextDuration,
            onComplete: function () {
                isWriting = false;
                if (messageQueue.length === 0) {
                    setTimeout(function () {
                        document.getElementById('playerText').style.display = 'none';
                        document.getElementById('playerMoves').style.display = 'inline-flex';
                    }, playerTextDuration);
                }
            }
        });
        var playerTextElement = document.getElementById('playerText');
        setTimeout(function () {
            playerTextElement.innerHTML = '';
            if (messageQueue.length > 0) {
                writeNextMessage();
            } else {
                isWriting = false;
                playerTextElement.style.display = 'none';
                document.getElementById('playerMoves').style.display = 'inline-flex';
            }
        }, playerTextDuration);
    }
}

function playerMove(lawyer, type, move) {
    console.log('The lawyer is ' + lawyer + '. The move is "' + move + '", which is a ' + type + ' move.');
    let moveExists = false;
    let movePP = 0;

    if (type === "physical" && physicalMoves_player[move] !== undefined) {
        moveExists = true;
        movePP = player.lawyers[lawyer].moveset.physicalPP;
    } else if (type === "status" && statusMoves_player[move] !== undefined) {
        moveExists = true;
        movePP = player.lawyers[lawyer].moveset.statusPP;
    } else if (type === "special" && specialMoves_player[move] !== undefined) {
        moveExists = true;
        movePP = player.lawyers[lawyer].moveset.specialPP;
    }

    if (!moveExists) {
        console.log("The lawyer does not have that move in their moveset. So, they can't use it.");
        writeToPlayerMenu("You can't use that move!");
    } else if (movePP < 1) {
        console.log("The lawyer does not have enough PP to use that move. So, they can't use it.");
        writeToPlayerMenu("You don't have enough PP to use that move!");
    } else {
        if (type === "physical") {
            player.lawyers[lawyer].moveset.physicalPP -= 1;
            console.log("The move was used, and the PP was deducted.");
            let luck = player.lawyers[lawyer].luck;
            let accuracy = physicalMoves_player[move].accuracy;
            let hit = Math.random() * 100;
            if (hit <= accuracy) {
                console.log("The move hit!");
                writeToPlayerMenu(lawyer + " used " + move + "!");
                let attack = player.lawyers[lawyer].attack; // Added attack attribute
                if (luck === 100) {
                    police.hp -= ((physicalMoves_player[move].power + attack) * 1.1 - police.defense); // Added attack to the damage calculation
                    console.log("The move did " + ((physicalMoves_player[move].power + attack) * 1.1 - police.defense) + " damage.");
                    writeToPlayerMenu("A critical hit!");
                } else {
                    let bonus = Math.random() * 100;
                    if (bonus <= luck) {
                        police.hp -= ((physicalMoves_player[move].power + attack) * 1.1 - police.defense); // Added attack to the damage calculation
                        console.log("The move did " + ((physicalMoves_player[move].power + attack) * 1.1 - police.defense) + " damage.");
                        writeToPlayerMenu("A critical hit!");
                    } else {
                        police.hp -= (physicalMoves_player[move].power + attack - police.defense); // Added attack to the damage calculation
                        console.log("The move did " + (physicalMoves_player[move].power + attack - police.defense) + " damage.");
                    }
                }
            } else {
                console.log("The move missed!");
                writeToPlayerMenu(lawyer + " used " + move + "!");
                writeToPlayerMenu("POLICE OFFICER avoided the attack!");
            }
        } else if (type === "status") {
            player.lawyers[lawyer].moveset.statusPP -= 1;
            console.log("The move was used, and the PP was deducted.");
            writeToPlayerMenu(lawyer + " used " + move + "!");
            statusMoves_player[move].action.call(player.lawyers[lawyer]);
        } else if (type === "special") {
            player.lawyers[lawyer].moveset.specialPP -= 1;
            console.log("The move was used, and the PP was deducted.");
            writeToPlayerMenu(lawyer + " used " + move + "!");
            specialMoves_player[move].action.call(player.lawyers[lawyer]);
        }
    }

    console.log("The lawyer has " + player.lawyers[lawyer].moveset[type + "PP"] + " PP left for this kind of move now.");

    writePlayerInfo();
    writePoliceInfo();

}

function policeMove(type, move) {
    // police moves are like player moves, but they are not chosen by the player. They are chosen by the computer.
    // the police also do not need to worry about PP, so we don't need to check for that.
    // dont worry about calculating what move to do, that's handled by a function selectPoliceMove() that we will write later.

    let moveType = type
    let movePower = 0;
    let moveAccuracy = 0;

    if (availableMoves_police[move] !== undefined) {
        moveType = availableMoves_police[move].type;
        movePower = availableMoves_police[move].power;
        moveAccuracy = availableMoves_police[move].accuracy;
    }


    if (moveType === "physical") {
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
        player.lawyers[activeLawyer].hp -= ((movePower + police.attack) - player.lawyers[activeLawyer].defense);
    } else if (moveType === "status") {
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
        availableMoves_police[move].action.call(police);
    } else if (moveType === "special") {
        writeToPlayerMenu("POLICE OFFICER used " + move + "!");
        player.lawyers[activeLawyer].hp -= ((movePower + police.attack) - player.lawyers[activeLawyer].defense);
        availableMoves_police[move].action.call(police);
    }




    // if the amount of power that the current move has is more than or equal to half of the player's current HP, then we write to the menu that it's a critical hit.

    if (movePower >= player.lawyers[activeLawyer].hp / 2 && movePower < player.lawyers[activeLawyer].hp / 0.25) {
        writeToPlayerMenu("A critical hit!");
    } else if (movePower === 0) {
        writeToPlayerMenu("Luckily, " + player.lawyers[activeLawyer].name + " avoided damage!");
    } else if (movePower >= player.lawyers[activeLawyer].hp / 0.25) {
        writeToPlayerMenu("It's super effective!");
    }

    // if we catch an error, we should write to the menu that the move missed.

    writePlayerInfo();
    writePoliceInfo();

}

function writePlayerInfo() {

    // then, we should write some info regarding hp bars and stuff.

    document.getElementById('playerHPBarFill').style.animation = "horizontal-shaking 0.15s 1";
    document.getElementById('playerName').innerHTML = player.lawyers[activeLawyer].name;
    if (player.lawyers[activeLawyer].hp <= 100) {
        document.getElementById('playerHPBarFill').style.width = Math.floor(player.lawyers[activeLawyer].hp) + '%';
    } 

    if (player.lawyers[activeLawyer].hp <= 0) {
        document.getElementById('playerHPBarFill').style.width = '0%';
        player.lawyers[activeLawyer].hp = 0;
    }
    
    document.getElementById('playerStatus').innerHTML = player.lawyers[activeLawyer].status;
    document.getElementById('playerDefense').innerHTML = player.lawyers[activeLawyer].defense;
    document.getElementById('playerSpeed').innerHTML = player.lawyers[activeLawyer].speed;
    document.getElementById('playerLuck').innerHTML = player.lawyers[activeLawyer].luck;

    document.getElementById('playerCurrentHP').innerHTML = Math.floor(player.lawyers[activeLawyer].hp);



    setTimeout(function () {
        document.getElementById('playerHPBarFill').style.animation = "";
    }, 100);

    document.getElementById('move1Title').innerHTML = player.lawyers[activeLawyer].moveset.physicalMove;
    document.getElementById('move1PP').innerHTML = player.lawyers[activeLawyer].moveset.physicalPP;
    document.getElementById('move1Description').innerHTML = physicalMoves_player[player.lawyers[activeLawyer].moveset.physicalMove].description;
    document.getElementById('move1Damage').innerHTML = physicalMoves_player[player.lawyers[activeLawyer].moveset.physicalMove].power;

    document.getElementById('move2Title').innerHTML = player.lawyers[activeLawyer].moveset.statusMove;
    document.getElementById('move2PP').innerHTML = player.lawyers[activeLawyer].moveset.statusPP;
    document.getElementById('move2Description').innerHTML = statusMoves_player[player.lawyers[activeLawyer].moveset.statusMove].description;
    document.getElementById('move2Damage').innerHTML = statusMoves_player[player.lawyers[activeLawyer].moveset.statusMove].power;

    document.getElementById('move3Title').innerHTML = player.lawyers[activeLawyer].moveset.specialMove;
    document.getElementById('move3PP').innerHTML = player.lawyers[activeLawyer].moveset.specialPP;
    document.getElementById('move3Description').innerHTML = specialMoves_player[player.lawyers[activeLawyer].moveset.specialMove].description;
    document.getElementById('move3Damage').innerHTML = specialMoves_player[player.lawyers[activeLawyer].moveset.specialMove].power;

    



}

function writePoliceInfo() {
    // write the entire police object to the screen - the entirety of it. format it nicely.

    // Add the horizontal-shaking animation here
    document.getElementById('enemyHPBarFill').style.animation = "horizontal-shaking 0.15s 1";
    if (police.hp <= 100) {
        document.getElementById('enemyHPBarFill').style.width = Math.floor(police.hp) + '%';
    }
    document.getElementById('enemyCurrentHP').innerHTML = Math.floor(police.hp);
    document.getElementById('enemyStatus').innerHTML = police.status;
    document.getElementById('enemyDefense').innerHTML = police.defense;
    document.getElementById('enemySpeed').innerHTML = police.speed;
    document.getElementById('enemyLuck').innerHTML = police.luck;
    document.getElementById('enemyDamageBonus').innerHTML = police.attack;

    setTimeout(function () {
        document.getElementById('enemyHPBarFill').style.animation = "";
    }, 100);
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

    return { type: selectedMoveType, move: selectedMoveName };

}

function selectLawyer(lawyer){
    activeLawyer = lawyer;
    writePlayerInfo();
}
