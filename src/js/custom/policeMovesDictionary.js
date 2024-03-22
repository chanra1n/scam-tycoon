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
        "accuracy": 90,
        "pp": 20,
        "description": "Damn, that stings."
    },
    // high level attack. does damage. less accurate.
    "Baton Strike": {
        "type": "physical",
        "power": 40,
        "accuracy": 90,
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
        "accuracy": 100,
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
        "accuracy": 90,
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
        "accuracy": 90,
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
        "accuracy": 80,
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