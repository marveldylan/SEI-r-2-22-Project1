// Global Variables
let gameRound;
let currentPlayer;
let hand;
let cardElement;
let cardImage;
let playCard;
let gameStatus = false;

let t0 = document.getElementById('t0');
let t1 = document.getElementById('t1');
let t2 = document.getElementById('t2');
let t3 = document.getElementById('t3');
let t4 = document.getElementById('t4');
let t5 = document.getElementById('t5');
let t6 = document.getElementById('t6');
let t7 = document.getElementById('t7');
let t8 = document.getElementById('t8');
let t9 = document.getElementById('t9');
let t10 = document.getElementById('t10');
let t11 = document.getElementById('t11');
let t12 = document.getElementById('t12');
let t13 = document.getElementById('t13');
let t14 = document.getElementById('Tt14');
let t15 = document.getElementById('t15');
let t16 = document.getElementById('t16');
let t17 = document.getElementById('t17');
let t18 = document.getElementById('t18');
let t19 = document.getElementById('t19');

const gameBoard =[];


// Player Objects
const player1 = {
    name: 'Player-1',
    class: '1',
    // pass data for deck select and profile image
    duck: localStorage.getItem('player1Duck'),
    stack: [],
    deck: [],
    hand: []
}

const player2 = {
    name: 'Player-2',
    class: '2',
    // pass data for deck select and profile image
    duck: localStorage.getItem('player2Duck'),
    stack: [],
    deck: [],
    hand: []
}

// Arrays of Card Objects

// GreyDuck Cards
let greyDucks =[
    {
    name: 'angryGreyDuck',
    attack: 5,
    defense: 1,
    imageLink: `assets/cards/greyDucks/angryGreyDuck.png`
},
{
    name: 'suspiciousGreyDuck',
    attack: 3,
    defense: 2,
    imageLink: `assets/cards/greyDucks/suspiciousGreyDuck.png`
}];

// Mallard Cards
let mallards = [ 
    {
    name: 'angryMallard',
    attack: 5,
    defense: 1,
    imageLink: `assets/cards/mallards/angryMallard.png`
},
{
    name: 'suspiciousMallard',
    attack: 3,
    defense: 2,
    imageLink: `assets/cards/mallards/suspiciousMallard.png`
}];

// Yeller Cards

let yellers = [
    {
    name: 'angryYeller',
    attack: 5,
    defense: 1,
    imageLink: `assets/cards/yellers/angryYeller.png`
},
{
    name: 'suspiciousYeller',
    attack: 3,
    defense: 2,
    imageLink: `assets/cards/yellers/suspiciousYeller.png`
}];

// Deck Arrays

let duckStacks = {
    greyDucks: greyDucks, 
    mallards: mallards, 
    yellers: yellers
};

// Team Check and Initializing Game
gameInit();

// Functions

// Initialize game. Sets score and round, calls functions to build player profiles and choose which player goes first
function gameInit() {
    if(player1.duck !== null && player2.duck !== null) {
    gameStatus = true;

    // Set player Scores to 0;
    player1.score = 0;
    player2.score = 0;

    // Set Rounds to 1
    gameRound = 1;

    // Initialize gameboard
    gameBoardInit();

    // Look at tic-tac-toe for basics
    // Choose Deck based on team
    buildProfile(player1);
    buildProfile(player2);

    // Set current player turn
    coinToss();

    // Begin current player turn
    startTurn(currentPlayer);
    };

};

// Function to initialize gameboard
function gameBoardInit() {
    document.querySelector('.invisible-hand-1').style.opacity = "0";  
    document.querySelector('.invisible-hand-2').style.opacity = "0";
    document.getElementById(`${player1.name}-hand`).disabled = true;
    document.getElementById(`${player1.name}-draw`).disabled = true;
    document.getElementById(`${player1.name}-attack`).disabled = true;
    document.getElementById(`${player2.name}-hand`).disabled = true;
    document.getElementById(`${player2.name}-draw`).disabled = true;
    document.getElementById(`${player2.name}-attack`).disabled = true;

    for(let i = 0; i < 20; i++) {
        gameBoard.push(`t${i}`)
    }
    return gameBoard;


}

// Function to choose which player goes first
function coinToss() {
    let headsOrTails = Math.random();
    if (headsOrTails <= 0.5) {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
    }

    document.getElementById('Game-round').innerText = `${currentPlayer.name}: ${currentPlayer.duck} go first`;
}

// Function to build player profiles. Player object is passed through to build deck and render hand.
function buildProfile(player) {
        // Set player profile pictures:
        if(player.duck === 'Random') {
        let randomSelect = Math.floor(Math.random()*3);
        if(randomSelect === 0) {
            player.duck = 'greyDucks';
        } else if (randomSelect === 1) {
            player.duck = 'yellers';
        } else if (randomSelect === 2) {
            player.duck = 'mallards';
        }
    }
   

    player.picture = document.getElementById(`${player.name}-pic-play`);
    player.picture.setAttribute('src', `assets/player-pictures/${player.name}/${player.duck}.png`)
    // Randomly deal cards to each player
    
    buildDeck(player);
    renderHand(player);
};

// Builds deck and hand for player 2 upon gameInit() -> buildP2Profile()
function buildDeck(player) {
    // Direction for choosing deck from duckStacks array with for(let[key, value] of Object.entries(object) taken from https://stackoverflow.com/questions/57928690/how-to-display-value-if-key-is-equal-to-variable
    for (let [key, value] of Object.entries(duckStacks)) {
        if (key === player.duck) {
            player.stack = value;
        }
    }
    // build the player hand
    for (let i = 0; i < 5; i++){
        //randomly push a value from the selected deck into player 'hand' until 16 cards are held
        let randomSelect = Math.floor(Math.random()*player.stack.length);
        player.hand.push(player.stack[randomSelect]);
    }
    //build the rest of the player deck
    for (let i = 0; i < 11; i++){
        //randomly push a value from the selected deck into player 'hand' until 16 cards are held
        let randomSelect = Math.floor(Math.random()*player.stack.length);
        player.deck.push(player.stack[randomSelect]);
    }
};

// Function that Renders player hands
// Inspiration for renderHand taken from my solution to TMDP_API Lab
function renderHand(player) {
    hand = player.hand;
    
    for(let i = 0; i < hand.length; i++) {
        cardElement = document.createElement('div');
        cardImage = document.createElement('div');
        playCard = document.createElement('button');
        cardElement.innerHTML = `${hand[i].name}, ATK: ${hand[i].attack}, DEF: ${hand[i].defense}`;
        cardElement.classList.add(`card-element`);
        cardElement.classList.add(`card-element-${i}`);
        cardImage.innerHTML = `<img class='card-image' src=${hand[i].imageLink}>`;
        playCard.innerHTML = 'Play Card';
        document.querySelector(`.${player.name}-view`).appendChild(cardElement);
        cardElement.appendChild(cardImage);
        cardElement.appendChild(playCard);
        cardElement.setAttribute("id", `${player.name}-card-element-${i}`);
        cardElement.setAttribute("draggable", "true");
        cardElement.setAttribute("ondragstart", "dragCard(event)");
    }

};

// Function for player move:

function startTurn(player) {
    if (gameStatus === true) {
        console.log(player.name);
        console.log(player.class);
        document.getElementById(`${player.name}-hand`).disabled = false;
        document.getElementById(`${player.name}-draw`).disabled = false;
        document.getElementById(`${player.name}-attack`).disabled = false;
        document.getElementById(`${player.name}-hand`).classList.toggle('invisible-hand');
        document.getElementById(`${player.name}-draw`).classList.toggle('invisible-hand');
        document.getElementById(`${player.name}-attack`).classList.toggle('invisible-hand');
    }
};

// Function if play card is selected
function LayCard() {
    console.log(currentPlayer.hand);

    //add end turn / player switch function
    endTurn();
};

// Function to draw card
function drawCard() {
    // draw card. Check to see if < 6 - pop from deck, push to hand., else can't draw.f
    //add end turn / player switch function
    endTurn();
};

// Function to ATTACK!
function attack() {
    // look for any cards on the board

    //add end turn / player switch function
    endTurn();
};

// Function to end turn, save changes to board:
function endTurn() {
    document.getElementById(`${currentPlayer.name}-hand`).disabled = true;
    document.getElementById(`${currentPlayer.name}-draw`).disabled = true;
    document.getElementById(`${currentPlayer.name}-attack`).disabled = true;
    document.getElementById(`${currentPlayer.name}-hand`).classList.toggle('invisible-hand');
    document.getElementById(`${currentPlayer.name}-draw`).classList.toggle('invisible-hand');
    document.getElementById(`${currentPlayer.name}-attack`).classList.toggle('invisible-hand');

    console.log(currentPlayer.name);
    console.log(currentPlayer.class);

    changePlayer();

}
// Function to change currentPlayer after every move:
function changePlayer () {
    // switch current player
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else if (currentPlayer === player2) {
        currentPlayer = player1;
    }
    // start turn for next player
    startTurn(currentPlayer);
}

// Direction for dragging cards to grid from https://medium.com/@tatismolin/how-to-implement-drag-and-drop-functionality-using-vanilla-javascript-9ddfe2402695
// Function for transferring dragged card data:
function dragCard(cardElement) {
    cardElement.dataTransfer.setData("text", cardElement.target.id);
}
// Function for card dragover game board tiles
function dragOverCard(cardElement) {
    cardElement.preventDefault();
}

// Function for card drop to game board tile
function dropCard(cardElement) {
    cardElement.preventDefault();
    if(cardElement.target.classList.contains(`${currentPlayer.name}-tile`) === true){
        let data = cardElement.dataTransfer.getData("text");
        cardElement.target.appendChild(document.getElementById(data));
        cardElement.dataTransfer.clearData();
        cardId = cardElement.srcElement.firstElementChild.id;
        for(let i = 0; i < 6; i++) {
            if (cardId ===`${currentPlayer.name}-card-element-${i}`) {
                currentPlayer.hand.splice(i, 1, 'empty');
                console.log(currentPlayer.hand);
            } else {
                console.log(`Can't get card id`);
            }
        }
        endTurn();
    }
}


// Event Handlers
//inspiration for hover taken from DOTS lab level winner opacity change, but with added toggle to play
document.getElementById('Player-1-hand').addEventListener('mouseover', () => {
    if(document.getElementById('Player-1-view').classList.contains('invisible-hand-1') === true) {
        document.querySelector('.invisible-hand-1').style.opacity = "1.0";
    }
});
document.getElementById('Player-1-hand').addEventListener('mouseout', () => {
    if(document.getElementById('Player-1-view').classList.contains('invisible-hand-1') === true) {
        document.querySelector('.invisible-hand-1').style.opacity = "0";
    } 
});
document.getElementById('Player-1-hand').addEventListener('click', () => {
    if(document.getElementById('Player-1-view').classList.contains('invisible-hand-1') === true) {
        document.querySelector('.Player-1-view').classList.toggle('invisible-hand-1');
    }
});
document.getElementById('Player-2-hand').addEventListener('mouseover', () => {
    if(document.getElementById('Player-2-view').classList.contains('invisible-hand-2') === true) {
        document.querySelector('.invisible-hand-2').style.opacity = "1.0";
    }
});
document.getElementById('Player-2-hand').addEventListener('mouseout', () => {
    if(document.getElementById('Player-2-view').classList.contains('invisible-hand-2') === true) {
        document.querySelector('.invisible-hand-2').style.opacity = "0";
    }
});
document.getElementById('Player-2-hand').addEventListener('click', () => {
    if(document.getElementById('Player-2-view').classList.contains('invisible-hand-2') === true) {
        document.querySelector('.Player-2-view').classList.toggle('invisible-hand-2');
    }
});
