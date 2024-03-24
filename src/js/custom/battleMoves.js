var player = {
    name: "Player",
    lawyers: {
        // the player can have 6 lawyers.
        lawyer1: {
            name: "Lawyer1",
            status: "Healthy",
            hp: 100,
            maxHp: 100,
            moveset: {
                physicalMove: "Objection",
                physicalPP: 25,
                statusMove: "Recess",
                statusPP: 10,
                specialMove: "Final Verdict",
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
            maxHp: 100,
            moveset: {
                physicalMove: "Damning Evidence",
                physicalPP: 25,
                statusMove: "Solid Defense",
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
            maxHp: 100,
            moveset: {
                physicalMove: "Rebuttal",
                physicalPP: 25,
                statusMove: "Key Testimony",
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
            maxHp: 100,
            moveset: {
                physicalMove: "Examination",
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
            maxHp: 100,
            moveset: {
                physicalMove: "Closing Argument",
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
            maxHp: 100,
            moveset: {
                physicalMove: "Objection",
                physicalPP: 25,
                statusMove: "Recess",
                statusPP: 10,
                specialMove: "Final Verdict",
                specialPP: 5
            },
            defense: 5,
            speed: 5,
            luck: 5,
            attack: 5
        }

    }
}

var activeLawyer = "lawyer3";

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

var policeMaxHP = police.hp;

var playerTextDuration = 2500;

var messageQueue = [];
var messageQueueListener;
var isWriting = false;

var luckVarHack = 0;

var policeMoveInProgress = false;
var playerMoveInProgress = false;

var playerTextElement = document.getElementById('playerText');
var playerMovesElement = document.getElementById('playerMoves');

function writeToPlayerMenu(text) {
    playerTextElement.style.display = 'inline-flex';
    playerMovesElement.style.display = 'none';
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
            }
        }, playerTextDuration);
    }
}

function initialInfoWrite() {
    // pick a random lawyer to be the active lawyer, lawyer1 - lawyer 6 are the choices.
    activeLawyer = "lawyer" + Math.floor(Math.random() * 6 + 1);
    selectLawyer(activeLawyer);
    document.getElementById('enemyTotalHP').innerHTML = "/"+ Math.floor(police.hp);
    document.getElementById('playerTotalHP').innerHTML = "/"+ Math.floor(player.lawyers[activeLawyer].hp);
    writePlayerInfo();
    writePoliceInfo();
}

function damagePlayer(damage){

    var attackBonus = damage * (police.attack / 100);
    var luckBonus = police.luck;
    var luckFactor = Math.random() < Math.abs(luckBonus) / 100 ? (luckBonus > 0 ? 1 + (luckBonus / 100) : 1 - (luckBonus / 100)) : 1;
    var trueDamage = damage + (attackBonus) + (damage * luckFactor - damage);

    console.log("damage: "+damage);
    console.log("attackBonus: "+attackBonus);
    console.log("luckBonus: "+luckBonus);
    console.log("luckFactor: "+luckFactor);
    console.log("trueDamage: "+trueDamage);

    if (damage === 0) {
    trueDamage = 0;
    }

    var playerDefenseValue = player.lawyers[activeLawyer].defense;
    var playerLuckValue = player.lawyers[activeLawyer].luck;
    var playerLuckFactor = Math.random() < Math.abs(playerLuckValue) / 100 ? (playerLuckValue > 0 ? 1 - (playerLuckValue / 100) : 1 + (playerLuckValue / 100)) : 1;
    var playerTrueDefense = playerDefenseValue + (playerDefenseValue * playerLuckFactor - playerDefenseValue);

    console.log("playerDefenseValue: "+playerDefenseValue);
    console.log("playerLuckValue: "+playerLuckValue);
    console.log("playerLuckFactor: "+playerLuckFactor);
    console.log("playerTrueDefense: "+playerTrueDefense);

    if (player.lawyers[activeLawyer].hp <= 0) {
        player.lawyers[activeLawyer].hp = 0;
    }

    console.log("so, in total, the amount of damage actually dealt to the player is: " + (trueDamage - playerTrueDefense));
    console.log("it would have been "+trueDamage+" if the player's defense and luck didn't come into play.");
    
    player.lawyers[activeLawyer].hp -= trueDamage - playerTrueDefense;
    
}

function damagePolice(damage){

    // let's structure damagePolice pretty much the same way we structured damagePlayer.

    var attackBonus = damage * (player.lawyers[activeLawyer].attack / 100);
    var luckBonus = player.lawyers[activeLawyer].luck;
    var luckFactor = Math.random() < Math.abs(luckBonus) / 100 ? (luckBonus > 0 ? 1 + (luckBonus / 100) : 1 - (luckBonus / 100)) : 1;
    var trueDamage = damage + (attackBonus) + (damage * luckFactor - damage);

    console.log("damage: "+damage);
    console.log("attackBonus: "+attackBonus);
    console.log("luckBonus: "+luckBonus);
    console.log("luckFactor: "+luckFactor);
    console.log("trueDamage: "+trueDamage);

    if (damage === 0) {
    trueDamage = 0;
    } 
    
    police.hp -= trueDamage;

    if (police.hp <= 0) {
        police.hp = 0;
    }

}
