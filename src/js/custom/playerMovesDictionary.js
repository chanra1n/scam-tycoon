var physicalMoves_player = {
    "Objection": {
        "type": "physical",
        "power": 50,
        "accuracy": 100,
        "pp": 15,
        "description": "A good opener."
    },
    "Rebuttal": {
        "type": "physical",
        "power": 70,
        "accuracy": 97,
        "pp": 10,
        "description": "Strike back with the facts!"
    },
    "Damning Evidence": {
        "type": "physical",
        "power": 80,
        "accuracy": 95,
        "pp": 10,
        "description": "Damaging revelations go a long way."
    },
    "Examination": {
        "type": "physical",
        "power": 90,
        "accuracy": 95,
        "pp": 5,
        "description": "A thorough examination of the facts."
    },
    "Closing Argument": {
        "type": "physical",
        "power": 120,
        "accuracy": 90,
        "pp": 5,
        "description": "Go forth, rest the case."
    }
};

var statusMoves_player = {
    "Recess": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 5,
        "description": "Take a break and heal up.",
        "action": function () {
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

            this.hp += Math.floor(currentMaxHP * 0.5 + Math.random() * currentMaxHP * 0.25);
            if (this.hp > currentMaxHP) {
                this.hp = currentMaxHP;
            }
            document.getElementById('playerHPBarFill').style.width = (this.hp / currentMaxHP) * 100 + "%";
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s HP was restored!");
        }
    },
    "Solid Defense": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 15,
        "description": "A strong defense is a good offense.",
        "action": function () {
            this.defense += Math.floor(this.defense * 0.75 + Math.random() * this.defense * 0.25);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
        }
    },
    "Key Testimony": {
        "type": "status",
        "power": 0,
        "accuracy": 90,
        "pp": 15,
        "description": "Increase your attack bonus.",
        "action": function () {
            this.attack += Math.floor(this.attack * 0.5);
            this.luck += Math.floor(this.luck * 0.5);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s attack rose!");
            writeToPlayerMenu(player.lawyers[activeLawyer].name + " got luckier!");
        }
    },
    "Witness Testimony": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 10,
        "description": "Let's call in the witness.",
        "action": function () {
            this.speed += Math.floor(this.speed * 0.5);
            this.defense += Math.floor(this.defense * 0.5);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s speed rose!");
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
        }
    },
    "Hail Mary": {
        "type": "status",
        "power": 0,
        "accuracy": 90,
        "pp": 5,
        "description": "A last-ditch effort to turn the tide of the battle.",
        "action": function () {
            // there should be a 70% chance of this move succeeding.
            // if it succeeds, every player stat is doubled.
            // if it fails, every player stat is halved.

            var success = Math.random() < 0.7;
            if (success) {
                this.attack *= 2;
                this.defense *= 2;
                this.speed *= 2;
                this.luck *= 2;
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s attack bonus rose!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s speed rose!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + " got luckier!");

            } else {
                this.attack /= 2;
                this.defense /= 2;
                this.speed /= 2;
                this.luck /= 2;
                writeToPlayerMenu("But it failed!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s attack bonus fell!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense fell!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s speed fell!");
                writeToPlayerMenu(player.lawyers[activeLawyer].name + " became unluckier!");
            }
        }
    }
};

var specialMoves_player = {

    // attack 
    "Final Verdict": {
        "type": "special",
        "power": 100,
        "accuracy": 95,
        "pp": 3,
        "description": "The judge has spoken.",
        "action": function () {
            this.attack += Math.floor(this.attack * 2);
            police.attack = Math.floor(police.attack / 2);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s attack bonus rose!");
            writeToPlayerMenu("POLICE OFFICER's attack bonus fell!");
        }
    },

    // speed 
    "Hung Jury": {
        "type": "special",
        "power": 100,
        "accuracy": 95,
        "pp": 3,
        "description": "This may fail, but it's worth the risk.",
        "action": function () {
            this.speed += Math.floor(this.speed * 2);
            police.speed = Math.floor(police.speed / 2);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s speed rose!");
            writeToPlayerMenu("POLICE OFFICER's speed fell!");
        }
    },
    // luck
    "Act of God": {
        "type": "special",
        "power": 100,
        "accuracy": 95,
        "pp": 3,
        "description": "A bolt of lightning inexplicably strikes the opponent.",
        "action": function () {
            this.luck += Math.floor(this.luck * 2);
            police.luck = Math.floor(police.luck / 2);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + " got luckier!");
            writeToPlayerMenu("POLICE OFFICER became unluckier!");
        }
    },
    //defense 
    "Chewbakka Defense": {
        "type": "special",
        "power": 120,
        "accuracy": 100,
        "pp": 3,
        "description": "It doesn't make sense!",
        "action": function () {
            this.defense += Math.floor(this.defense * 2);
            police.defense = Math.floor(police.defense / 2);
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
            writeToPlayerMenu("POLICE OFFICER's defense fell!");

            if (Math.random() > 0.5) {
                this.status = "Confused";
                document.getElementById('playerStatus').innerHTML = "Confused";
                writeToPlayerMenu(player.lawyers[activeLawyer].name + " became confused!");
                police.status = "Confused";
                document.getElementById('enemyStatus').innerHTML = "Confused";
                writeToPlayerMenu("POLICE OFFICER became confused!");
            }

        }
    }
};
