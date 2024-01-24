function runTechSupport() {
  const classRoll = Math.random();
  const isPoor = classRoll < 0.4;
  const isRich = classRoll < 0.3;

  const person = {
    class: isPoor ? "poor" : isRich ? "rich" : "middle",
    money: Math.floor(Math.random() * (isPoor ? 2000 : isRich ? 50000 : 7000) + (isPoor ? 500 : isRich ? 20000 : 3000)),
    defense: Math.floor(Math.random() * (isPoor ? 20 : 40)) + 1
  };

  person.defense = Math.max(0, person.defense - person.defense * (player.persuasiveness * 0.15));

  const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * (player.persuasiveness * 2)));
  const scamSucceeded = randomNumbers.some(num => num > person.defense);

  if (scamSucceeded) {
    const cut = person.money;
    const datapoints = cut * 0.1; // 10% of the payout is paid out in datapoints
    updateBalance("add", Math.ceil(cut - datapoints));
    updateDatapoints("add", Math.ceil(datapoints));
    player.persuasiveness +=1;
    return `scam succeeded, player got ${cut - datapoints} dollars and ${datapoints} datapoints`;
  } else {
    const consolation = (person.money / 2) * 0.01;
    const datapoints = consolation * 0.1; // 10% of the consolation is paid out in datapoints
    player.persuasiveness+= 0.0025;
    updateBalance("add", Math.floor(consolation - datapoints));
    updateDatapoints("add", Math.floor(datapoints));
    return `scam failed, player got ${consolation - datapoints} dollars and ${datapoints} datapoints`;
  }
}


function runCreditCardScam() {
  const classRoll = Math.random();
  const isPoor = classRoll < 0.4;
  const isRich = classRoll < 0.3;

  const person = {
    class: isPoor ? "poor" : isRich ? "rich" : "middle",
    money: Math.floor(Math.random() * (isPoor ? 2000 : isRich ? 50000 : 7000) + (isPoor ? 500 : isRich ? 20000 : 3000)),
    defense: Math.floor(Math.random() * (isPoor ? 20 : 40)) + 1 // Lowered maximum defense score
  };

  person.defense = Math.max(0, person.defense - person.defense * (player.persuasiveness * 0.15)); // Increased impact of persuasiveness

  const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * (player.persuasiveness * 2)) ); // Increased range of random numbers
  const scamSucceeded = randomNumbers.some(num => num > person.defense);

  if (scamSucceeded) {
    const cut = person.money;
    updateBalance("add", Math.ceil(cut));
    player.persuasiveness +=1;
    return `scam succeeded, player got ${cut} dollars`;
  } else {
    const consolation = (person.money / 2) * 0.01;
    player.persuasiveness+= 0.0025;
    updateBalance("add", Math.floor(consolation));
    return `scam failed, player got ${consolation} dollars`;
  }
}
