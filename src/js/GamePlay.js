import Board from './src/js/Board';
import Character from './src/js/Character';

export default class GamePlay {
  constructor() {
    this.size = 4;
    this.countDead = null;
    this.countLost = null;
    this.count = null;
  }

  startGame() {
    const board = new Board();
    board.getBoard(this.size);

    const goblin = new Character();

    this.onCellClick();

    setInterval(() => {
      goblin.randomPosition(this.size);

      this.countLost.textContent = +this.countLost.textContent + this.count;

      if (this.count !== 1) {
        setTimeout(this.count = 1, 1000);
      }

      this.showResult();
    }, 1000);
  }

  onCellClick() {
    const cells = document.querySelectorAll('.cell');

    this.countDead = document.querySelector('.dead');
    this.countLost = document.querySelector('.lost');

    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', () => {
        if (cells[i].classList.contains('active')) {
          cells[i].classList.remove('active');
          this.countDead.textContent = +this.countDead.textContent + 1;
        } else {
          this.countLost.textContent = +this.countLost.textContent + 1;
        }
        this.showResult();
        this.count = 0;
      });
    }
  }

  reset() {
    this.countDead.textContent = 0;
    this.countLost.textContent = 0;
  }

  showResult() {
    if (this.countDead.textContent > 10) {
      alert('Победа!');
      this.reset();
    }

    if (this.countLost.textContent > 5) {
      alert('Поражение!');
      this.reset();
    }
  }
}
