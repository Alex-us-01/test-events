export default class Character {
  constructor() {
    this.character = 'active';
    this.position = -1;
  }

  randomPosition(size) {
    const divs = document.querySelectorAll('.cell');

    const randomInt = Math.floor(Math.random() * (size ** 2));
    if (this.position >= 0) {
      divs[this.position].classList.remove(this.character);
      this.position = -1;
    }

    divs[randomInt].classList.add(this.character);
    this.position = randomInt;
  }
}