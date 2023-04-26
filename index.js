let player = {
    name: "Coins",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let BJ = 0

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
let startBtnEl = document.getElementById("start-btn")
let newCardBtnEl = document.getElementById("newCard-btn")
let startOverBtnEl = document.getElementById("startOver-btn")
newCardBtnEl.style.display = 'inline-block';
startOverBtnEl.style.display = 'none';



function startGame() {
    if(player.chips>=10){
        player.chips -= 10
        playerEl.textContent = player.name + ": $" + player.chips
        isAlive = true
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
    else{
            startBtnEl.style.display = 'none';
            newCardBtnEl.style.display = 'none';
            startOverBtnEl.style.display = 'inline-block';
            messageEl.textContent = "You Don't Have Enough Coins!"
    }
}

function startOver(){
    player.chips = 200;
    startOverBtnEl.style.display = 'none';
    startBtnEl.style.display = 'inline-block';
    newCardBtnEl.style.display = 'inline-block';
    messageEl.textContent = "Want to play a round?"
    Cards = []
    cardsEl.textContent = "Cards: "
    sum = 0
    sumEl.textContent = "Sum: "
    playerEl.textContent = player.name + ": $" + player.chips
    BJ = 0
    document.getElementById("count-el").textContent = "Total BlackJack Wins: " + BJ;
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
        startBtnEl.style.display = 'inline-block';
        newCardBtnEl.style.display = 'inline-block';
        if(player.chips<2){
            newCardBtnEl.style.display = 'none';
            startBtnEl.style.display = 'none';
            startOverBtnEl.style.display = 'inline-block';
            message = "You don't have enough coins! Start over and try your luck again!"
        }
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        startBtnEl.style.display = 'inline-block';
        startOverBtnEl.style.display = 'none';
        newCardBtnEl.style.display = 'inline-block';
        hasBlackJack = true
        player.chips += 15
        playerEl.textContent = player.name + ": $" + player.chips
        BJ ++ ;
        document.getElementById("count-el").textContent = "Total BlackJack Wins: " + BJ;
    } else {
        message = "You're out of the game!"
        isAlive = false
        newCardBtnEl.style.display = 'inline-block';
        startBtnEl.style.display = 'inline-block';
        if(player.chips<10){
            startBtnEl.style.display = 'none';
            newCardBtnEl.style.display = 'none';
            startOverBtnEl.style.display = 'inline-block';
            message = "You don't have enough coins! Start over and try your luck again!"
        }
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        if(player.chips>=2){
            player.chips -= 2
            playerEl.textContent = player.name + ": $" + player.chips
            let card = getRandomCard()
            sum += card
            cards.push(card)
            renderGame()
        }
        else{
            isAlive = false
            startGame()
        }
    }
}
