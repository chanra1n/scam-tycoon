var availableMoves_police = {
    "Baton Strike": {
        "type": "physical",
        "power": 75,
        "accuracy": 95,
    },
    "Pepper Spray": {
        "type": "physical",
        "power": 80,
        "accuracy": 95,
    },
    "Baton Strike": {
        "type": "physical",
        "power": 80,
        "accuracy": 90,
    },

    "The Court of Public Opinion": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "action": function () {
            police.hp += Math.floor(policeMaxHP * 0.5 + Math.random() * policeMaxHP * 0.25);
            if (this.hp > policeMaxHP) {
                this.hp = policeMaxHP;
            }
            document.getElementById('enemyHPBarFill').style.width = (this.hp / policeMaxHP) * 100 + "%";
            writeToPlayerMenu("POLICE OFFICER's HP was restored!");
        }
    },
    "Blue Wall": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 15,
        "description": "A strong defense is a good offense.",
        "action": function () {
            police.defense += Math.ceil(police.defense * 0.75 + Math.random() * police.defense * 0.25);
            writeToPlayerMenu("POLICE OFFICER's defense rose!");
        }
    },
    "Qualified Immunity": {
        "type": "status",
        "power": 0,
        "accuracy": 90,
        "pp": 15,
        "description": "Increase your attack bonus.",
        "action": function () {
            police.attack += Math.floor(police.attack * 0.5);
            police.luck += Math.floor(police.luck * 0.5);
            writeToPlayerMenu("POLICE OFFICER's attack rose!");
            writeToPlayerMenu("POLICE OFFICER got luckier!");
        }
    },
    "Thin Blue Line": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 10,
        "description": "Let's call in the witness.",
        "action": function () {
            police.speed += Math.floor(police.speed * 0.5);
            police.defense += Math.floor(police.defense * 0.5);
            writeToPlayerMenu("POLICE OFFICER's speed rose!");
            writeToPlayerMenu("POLICE OFFICER's defense rose!");
        }
    },
    "Brutality": {
        "type": "special",
        "power": 150,
        "accuracy": 90,
        "pp": 5,
        "description": "A last-ditch effort to turn the tide of the battle.",
        "action": function () {
            // there should be a 70% chance of this move succeeding.
            // if it succeeds, every player stat is doubled.
            // if it fails, every player stat is halved.

            var success = Math.random() < 0.75;
            if (success) {
                police.attack *= 2;
                police.defense *= 2;
                police.speed *= 2;
                police.luck *= 2;
                writeToPlayerMenu("POLICE OFFICER's attack bonus rose!");
                writeToPlayerMenu("POLICE OFFICER's defense rose!");
                writeToPlayerMenu("POLICE OFFICER's speed rose!");
                writeToPlayerMenu("POLICE OFFICER got luckier!");

            } else {
                police.attack /= 2;
                police.defense /= 2;
                police.speed /= 2;
                police.luck /= 2;
                writeToPlayerMenu("POLICE OFFICER's attack bonus fell!");
                writeToPlayerMenu("POLICE OFFICER's defense fell!");
                writeToPlayerMenu("POLICE OFFICER's speed fell!");
                writeToPlayerMenu("POLICE OFFICER became unluckier!");
            }
        }
    }
};