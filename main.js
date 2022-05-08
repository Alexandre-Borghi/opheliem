window.addEventListener("load", main);

function main() {
    const startBtnEl = document.querySelector("#page-1 button");
    startBtnEl.addEventListener("click", transition.bind(null, "page-1", "page-2"));

    initGame();
}

function transition(startPageId, endPageId) {
    const startPageEl = document.getElementById(startPageId);
    const endPageEl = document.getElementById(endPageId);

    if (startPageEl == null) {
        throw Error(`Couldn't find start page #${startPageId}`);
    }

    if (endPageEl == null) {
        throw Error(`Couldn't find end page #${endPageId}`);
    }

    endPageEl.style.display = "flex";

    startPageEl.classList.add("hidden");
    window.setTimeout(() => {
        endPageEl.classList.remove("hidden");
        startPageEl.style.display = "none";
    }, 1000);
}

function initGame() {
    const cards = document.querySelectorAll("div#memory>img");
    const images = [
        "./img/produit-1.jpg",
        "./img/produit-2.jpg",
        "./img/produit-3.jpg",
    ];
    const hiddenImage = "./img/hidden.png";
    const game = {
        returnedCards: 0,
        returnedCard1: null,
        returnedCard2: null,
        frozenCards: [],
    }

    function resetCurrentCards() {
        game.returnedCards = 0;
        game.returnedCard1.src = hiddenImage;
        game.returnedCard2.src = hiddenImage;
        game.returnedCard1 = null;
        game.returnedCard2 = null;
    }

    function bravo() {
        transition("page-2", "page-3");
    }

    cards.forEach(card => {
        card.addEventListener("click", _ => {
            const nb = card.getAttribute("nb");
            const val = card.getAttribute("val");

            if (game.frozenCards.includes(nb)) {
                return;
            }

            switch (game.returnedCards) {
                case 0:
                    card.src = images[val];
                    game.returnedCards = 1;
                    game.returnedCard1 = card;
                    break;

                case 1:
                    const otherNb = game.returnedCard1.getAttribute("nb");
                    const otherVal = game.returnedCard1.getAttribute("val");

                    if (otherNb == nb) {
                        return;
                    }

                    card.src = images[val];
                    game.returnedCards = 2;
                    game.returnedCard2 = card;
                    if (otherVal != val) {
                        window.setTimeout(resetCurrentCards, 700);
                    } else {
                        game.frozenCards.push(nb, otherNb);
                        game.returnedCard1 = null;
                        game.returnedCard2 = null;
                        game.returnedCards = 0;

                        if (game.frozenCards.length == 6) {
                            window.setTimeout(bravo, 700);
                        }
                    }
                    break;
            }
        });
    });
}
