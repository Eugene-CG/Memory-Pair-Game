const cardsList = document.querySelector(".cards__list");
let clickRemember = [];

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
  cards = shuffleCards([...cards, ...cards]);
  cards.forEach((imgSrc) => {
    cardsList.innerHTML += createCard(imgSrc);
  });
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);
const createCard = (imgSrc) => {
  return `
    <li class="card__container">
          <div class="card card-back">
              <img src="./img/${imgSrc}">
          </div>
      </li>`;
};
const flipCard = ({ target }) => {
  if (target.closest(".card") || target.closest("img")) {
    clickRemember = [...clickRemember, target.firstElementChild];
    target.closest(".card").classList.remove("card-back");
    target.closest(".card").classList.add("hide", "open");

    if (clickRemember.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }
};
const checkMatch = () => {
  if (
    !(
      clickRemember[0].getAttribute("src") ===
      clickRemember[1].getAttribute("src")
    )
  )
    checkUnmatch();
  clickRemember = [];
};
const checkUnmatch = () => {
  clickRemember.forEach((target) => {
    target.closest(".card").classList.add("card-back");
    target.closest(".card").classList.remove("hide", "open");
  });
  clickRemember = [];
};

cardsList.addEventListener("click", (event) => {
  if (!(clickRemember.length === 2)) flipCard(event);
});
window.addEventListener("DOMContentLoaded", startGame);
