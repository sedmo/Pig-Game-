/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


**BONUS:
- A player looses his ENTIRE score when he rolls two 6s in a row. After that, it's the next players turn. 
- Add an input field where players can set the score
- Add an audio when player wins
*/

//Initial Values
var scores, roundScore, activePlayer, diceDOM, gamePlaying, winningScore;
diceDOM = document.querySelector('.dice');

initVals();

var previousRoll;

//Roll Dice button function
document.querySelector('.btn-roll').addEventListener('click', function () {


    if (gamePlaying) {
        //1. create a 6 sided dice
        let dice = Math.floor(Math.random() * 6) + 1;

        // Check if previousRoll was assigned before 
        //check if prev roll and dice are 6
        if (previousRoll === 6 && dice === 6) {
            //update GLOBAL score and UI
            scores[activePlayer] = 0;
            document.getElementById(`score-${activePlayer}`).textContent = '0';
            nextPlayer();
        }

        previousRoll = dice;

        //2. display the results
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        //3. Update round score, BUT only if rolled number was NOT a 1
        if (dice !== 1) {
            //Add score 
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

//Hold button function
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        //Check if player won the game, if not, only then will it continue
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            //play audio
            document.getElementById('winningSound').play();

        } else {
            //Next Player
            nextPlayer();
        }
    }

});

//New game button
document.querySelector('.btn-new').addEventListener('click', initVals);


//FUNCTIONS
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //reset scores
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    diceDOM.style.display = 'none';

    //if the active was on turn off and if off turn on 
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}

function initVals() {
    gamePlaying = true;
    scores = [0, 0]; //2players = 2dimensional array
    roundScore = 0;
    activePlayer = 0;
    diceDOM.style.display = 'none'; //initially, we don't want to see the dice

    //find winning score from input field and remove box after finding
    document.getElementById('user_score_input').addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            winningScore = document.getElementById('user_score_input').value;
            //remove/hide the box
            document.querySelector('#user_input_box').style.display = 'none';
        }
    })





    //set all values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove CSS styles from initial
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    //needed since it would interfere with the next player function (toggle)
    document.querySelector(`.player-0-panel`).classList.add('active');


}