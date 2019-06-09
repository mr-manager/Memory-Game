var card = document.querySelectorAll(".card");
var firstGuess, secondGuess;
var hasCardFlipped = false;
var disableCardFlip = false;

function randomizeCards() {
    var cardLength = card.length;
    card.forEach(card => {
        var randomIndex = Math.floor(Math.random() * cardLength);
        card.style.order = randomIndex;
    });
}

window.onload = randomizeCards;

function playGame() {
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener("click", function () {
            if (disableCardFlip) return;
            this.classList.add("flip");
            if (this === firstGuess) return;
            if (!hasCardFlipped) {
                hasCardFlipped = true;
                firstGuess = this;
            } else {
                hasCardFlipped = false;
                secondGuess = this;
                checkIfCardsMatch();
            }
        });
    }
}

function unflipCards() {
    disableCardFlip = true;
    setTimeout(function () {
        firstGuess.classList.remove("flip");
        secondGuess.classList.remove("flip");
        disableCardFlip = false;
    }, 1000);
}

function checkIfCardsMatch() {
    if (firstGuess.dataset.pokemon === secondGuess.dataset.pokemon) {
        firstGuess.removeEventListener("click", playGame);
        secondGuess.removeEventListener("click", playGame);
        firstGuess.classList.add("matched");
        secondGuess.classList.add("matched");
        wonGame();
    } else {
        unflipCards();
    }
}

function wonGame() {
    var matched = document.getElementsByClassName("matched");
    if (card.length === matched.length) {
        document.getElementById("modal-wrapper").style.display = "";
    }
}

playGame();

function restartGame() {
    document.getElementById("modal-wrapper").style.display = "none";
    $(".card").removeClass("matched");
    $(".flip").toggleClass("flip");
    randomizeCards();
    playGame();
}