let PLAYER_DAMAGE = 10;
let MONSTER_DAMAGE = 15;

// this value sets all health bars
let monster_hp = document.getElementById('monster-health')
let player_hp = document.getElementById('player-health')
let player_life = document.getElementById('player-life')
let monster_life = document.getElementById('monster-life')

let btnAttack = document.getElementById('attack-btn')
btnAttack.addEventListener('click', attack)

let btnStrAttack = document.getElementById('strong-attack-btn')
btnStrAttack.addEventListener('click', attack_strong)

let btnRecuperate = document.getElementById('heal-btn')
btnRecuperate.addEventListener('click', recuperate)

let btnShowLog = document.getElementById('log-btn')
btnShowLog.addEventListener('click', showLog)

let log = []

function change_values(monster_value, player_value) {
  if (monster_value > 100) {
    monster_hp.value = 100
    monster_life.innerHTML = monster_hp.value
  } else if (player_value > 100) {
    player_hp.value = 100
    player_life.innerHTML = player_hp.value
  }
  monster_hp.value = Math.floor(monster_value)
  monster_life.innerHTML = monster_hp.value
  player_hp.value = Math.floor(player_value)
  player_life.innerHTML = player_hp.value
}

function createLogAttackEntry(method, monsterHealth, monsterDamage, playerHealth, playerDamage) {
  let m_hp = monsterHealth;
  let p_hp = playerHealth;
  if (monsterHealth < 0) {
    m_hp = 0
  } else if (playerHealth < 0) {
    p_hp = 0
  }
  result = `Player dealt ${method} with ${playerDamage} to monster. Monster's health is now ${m_hp}.\n`
  result += `Monster dealt ${monsterDamage} to player. Player's health is now ${p_hp}.`
  log.push(result)
  console.log(result)
  return result
}

function createLogRecuperateEntry(method, monsterHealth, monsterDamage, playerHealth, recuperateValue) {
  let m_hp = monsterHealth;
  let p_hp = playerHealth;
  if (monsterHealth < 0) {
    m_hp = 0
  } else if (playerHealth < 0) {
    p_hp = 0
  }
  result = `Player ran away from the monster but took ${monsterDamage} in the process.`
  result += `Player healed ${recuperateValue} . Player's health is now ${p_hp}.\n`
  result += `The monster also regained his strenght. Monster now has ${m_hp}.`
  
  log.push(result)
  console.log(result)
  return result
}

function displayLog() {
  document.getElementById('log-info').innerHTML = 'new value'
}

let logDisplay = document.getElementById('log-info')
logDisplay.addEventListener('click', displayLog)

function check_win_condition(monster_value, player_value) {
    // check for win condition
  if (monster_value <= 0) {
    alert('You won!')
  } else if (player_value <= 0) {
    alert('You lost!')
  }
}


// set up additional health(life) value
function create_health() {
  // default value = 100, change on prompt if you have to
  prompt('Welcome, Monster Killer', value=100)
  // let's set up 4 values with 2 inputs, why not?
  change_values(value, value)
}
create_health()


// button attack
function attack() {

  let monsterHealth = monster_hp.value - PLAYER_DAMAGE
  let playerHealth = player_hp.value - MONSTER_DAMAGE
  
  // check for win condition
  check_win_condition(monsterHealth, playerHealth)
  change_values(monsterHealth, playerHealth)
  let logEntry = createLogAttackEntry('Attack', monsterHealth, MONSTER_DAMAGE, playerHealth, PLAYER_DAMAGE)
  document.getElementById('log-info').innerHTML = logEntry
}

// button strong attack
function attack_strong() {
  let monsterHealth = monster_hp.value;
  let playerHealth = player_hp.value;

  // insert some chance logic

  const randomNumFromZeroToTen = Math.floor(Math.random() * 10)

  // depending on the number's value it may deal extra damage or take reduced damage
  
  let playerDamage = PLAYER_DAMAGE
  let monsterDamage = MONSTER_DAMAGE
  if (randomNumFromZeroToTen > 5) {
    playerDamage = PLAYER_DAMAGE * 1.6
    monsterHealth -= playerDamage
    monsterDamage = 1
    playerHealth -= monsterDamage
  } else {
    playerDamage = PLAYER_DAMAGE++
    monsterHealth -= playerDamage
    monsterDamage = MONSTER_DAMAGE * 2.6
    playerHealth -= monsterDamage
  }

  let logEntry = createLogAttackEntry('Strong Attack', monsterHealth, monsterDamage, playerHealth, playerDamage)
  document.getElementById('log-info').innerHTML = logEntry
  check_win_condition(monsterHealth, playerHealth)
  change_values(monsterHealth, playerHealth)
}

// button heal
function recuperate() {
  // alert('i am recuperating!') - for testing

  let monsterHealth = monster_hp.value;
  let playerHealth = player_hp.value;

  // you will always heal this much
  const RECUPERATE_BASE_VALUE = 40

  // i'm introducing this variable so I can calculate additional factors later
  let recuperateValue = RECUPERATE_BASE_VALUE
  // the monster hits you while recuperating
  let monsterDamage = MONSTER_DAMAGE
 
  // insert some chance logic
  const randomNumFromZeroToTen = Math.floor(Math.random() * 10)
  const reflectDamage = MONSTER_DAMAGE

  // the outcome of the next function depends on the random number
  // if the number is below 2 the player will heal for twice the amount
  if (randomNumFromZeroToTen < 5) {
    monsterDamage = MONSTER_DAMAGE / 2
  }

  // the monster regains some strength as well
  monsterHealth += 15
  playerHealth = playerHealth-monsterDamage+recuperateValue

  let logEntry = createLogRecuperateEntry('Recuperate', monsterHealth, monsterDamage, playerHealth, recuperateValue)
  document.getElementById('log-info').innerHTML = logEntry
  check_win_condition(monsterHealth, playerHealth)
  change_values(monsterHealth, playerHealth)
}

function showLog() {
  // print the numerated log on the console
  for (let i = 0; i < log.length; i++) {
    console.log(`${i+1}. ${log[i]}`)
  }
}

// button show log in a scroll text menu
// how a log entry looks
