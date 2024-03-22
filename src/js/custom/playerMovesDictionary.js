var physicalMoves_player = {
    "Objection": {
        "type": "physical",
        "power": 50,
        "accuracy": 100,
        "pp": 25,
        "description": "A low-level opener."
    },
    "Rebuttal": {
        "type": "physical",
        "power": 70,
        "accuracy": 95,
        "pp": 20,
        "description": "Strike back with the facts!"
    },
    "Damning Evidence": {
        "type": "physical",
        "power": 65,
        "accuracy": 95,
        "pp": 20,
        "description": "Damaging revelations go a long way.",
        "action": function () {
            this.defense += this.defense * 0.25;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
        }
    },
    "Examination": {
        "type": "physical",
        "power": 85,
        "accuracy": 95,
        "pp": 10,
        "description": "A strong move, but hard to pull off."
    },

    "Closing Argument": {
        "type": "physical",
        "power": 120,
        "accuracy": 90,
        "pp": 5,
        "description": "Rest your case."
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
            this.hp += this.maxHp * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s HP was restored!");
        }
    },
    "Solid Defense": {
        "type": "status",
        "power": 0,
        "accuracy": 100,
        "pp": 20,
        "description": "A strong defense is a good offense.",
        "action": function () {
            this.defense += this.defense * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + "'s defense rose!");
        }

    },
    "Compelling Testimony": {
        "type": "status",
        "power": 0,
        "accuracy": 90,
        "pp": 15,
        "description": "Increase your attack bonus.",
        "action": function () {
            this.attack += this.attack * 0.5;
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
    "power": luckVarHack,
    "accuracy": 90,
    "pp": 5,
    "description": "A last-ditch effort to turn the tide of the battle.",
    "action": function () {
        luckVarHack = this.luck;
        if (Math.random() < 0.6) {
            this.luck += this.luck * 2;
            this.attack += this.attack * 0.5;
            this.defense += this.defense * 0.5;
            this.speed += this.speed * 0.5;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + " became luckier!");
        } else {
            this.luck = 0;
            this.attack -= this.attack * 0.1;
            this.defense -= this.defense * 0.1;
            this.speed -= this.speed * 0.1;
            writeToPlayerMenu(player.lawyers[activeLawyer].name + " became less lucky!");
        }
    },
}
};

var specialMoves_player = {
    "Final Verdict": {
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
