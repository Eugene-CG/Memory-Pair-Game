const cardsList = document.querySelector(".cards__list");
let clickRemember = [];
class Card {
  constructor(img) {
    this.img = img;
  }
  createCard() {
    const liCardContainer = document.createElement("LI");
    const divCard = document.createElement("DIV");
    const image = document.createElement("IMG");

    liCardContainer.classList.add("card__container");
    divCard.classList.add("card", "card-back");

    image.setAttribute("src", `./img/${this.img}`);

    cardsList.appendChild(liCardContainer);
    liCardContainer.appendChild(divCard);
    divCard.appendChild(image);
  }
}

const startGame = () => {
  let cards = [
    "fool.jpg",
    "lovers.jpg",
    "magician.jpg",
    "priestess.jpg",
    "star.jpg",
    "sun.jpg",
    "hanged.jpg",
    "justice.jpg",
  ];
  cards = [...cards, ...cards];
  shuffleCards(cards);
  cards = cards.map((imgSrc) => {
    return new Card(imgSrc);
  });
  cards.forEach((card) => {
    card.createCard();
  });
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);

const flipCard = ({ target }) => {
  if (target.closest(".card") || target.closest("img")) {
    console.log(target.firstChild);
    clickRemember.push(target.firstChild);
    target.closest(".card").classList.remove("card-back");
    target.closest(".card").classList.add("hide", "card-front", "open");

    if (clickRemember.length === 2) match();
  }
};
const match = () => {
  console.log(clickRemember[0].getAttribute("src"));
  if (
    clickRemember[0].getAttribute("src") ===
    clickRemember[1].getAttribute("src")
  ) {
    clickRemember.forEach((target) => {
      target.closest(".card").classList.add("match");
    });
  } else {
    unmatch();
  }
  setTimeout(() => {
    clickRemember = [];
  }, 700);
};
const unmatch = () => {
  clickRemember.forEach((target) => {
    target.closest(".card").classList.add("card-back");
    setTimeout(() => {
      target.closest(".card").classList.remove("hide", "card-front", "open");
    }, 800);
  });
  setTimeout(() => {
    clickRemember = [];
  }, 800);
};
cardsList.addEventListener("click", (event) => {
  if (!(clickRemember.length === 2)) flipCard(event);
});
window.addEventListener("DOMContentLoaded", startGame);
