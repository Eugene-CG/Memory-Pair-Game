const cardsList = document.querySelector(".cards__list");
let clickRemember = [];
class Card {
  constructor(img) {
    this.img = img;
  }
  createCard() {
    // console.log(this);**************************************
    //create elements
    const liCardContainer = document.createElement("LI");
    const divCard = document.createElement("DIV");
    const image = document.createElement("IMG");
    //add class to elements
    liCardContainer.classList.add("card__container");
    divCard.classList.add("card", "card-back");
    //add attribute to elements
    image.setAttribute("src", `./img/${this.img}`);
    //creating card structure <ul class="cards__list"> <li class="card__container"> <div class="card"><img src="imgSrc"</div> </li></ul>
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
  //   console.log(cards);******************************************
  shuffleCards(cards);
  cards = cards.map((imgSrc) => {
    return new Card(imgSrc);
  });
  //   console.log(cards);*******************************************
  cards.forEach((card) => {
    card.createCard();
  });

  //timer()
  //starRating()
  //scoreboard()
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);

const flipCard = ({ target }) => {
  if (target.closest(".card") || target.closest("img")) {
    clickRemember.push(target);
    target.closest(".card").classList.remove("card-back");
    target.closest(".card").classList.add("hide", "card-front", "open");

    if (clickRemember.length === 2) match();
  }
};
const match = () => {
  console.log("ss");
  if (
    clickRemember[0].getAttribute("src") ===
    clickRemember[1].getAttribute("src")
  ) {
    // target.classList.add("match")
    clickRemember.forEach((target) => {
      target.closest(".card").classList.add("match");
    });
  } else {
    unmatch();
  }
  clickRemember = [];
};
const unmatch = () => {
  clickRemember.forEach((target) => {
    target.closest(".card").classList.add("card-back");
    setTimeout(() => {
      target.closest(".card").classList.remove("hide", "card-front", "open");
    }, 1000);
    // target.closest(".card").classList.remove("hide", "card-front", "open");
  });
  clickRemember = [];
};
cardsList.addEventListener("click", flipCard);
window.addEventListener("DOMContentLoaded", startGame); //change to click event later
