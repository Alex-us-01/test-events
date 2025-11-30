import goblinImage from '../img/goblin.png';

// Создание поля
const gameField = document.getElementById('gameField');
const fieldSize = 4;

// Создание сетки
const createGrid = () => {
    for (let i = 0; i < fieldSize * fieldSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameField.append(cell);
    }
};

// Создание персонажа
const character = document.createElement('img');
character.src = goblinImage;
character.alt = 'goblin';

// Генератор случайных чисел
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Размещение персонажа в случайной позиции
const placeCharacter = () => {
    const randomCell = getRandomInt(0, fieldSize * fieldSize);
    const cells = document.getElementsByClassName('cell');
    
    // Перемещаем персонажа в новую ячейку
    cells[randomCell].append(character);
};

// Перемещение персонажа
const moveCharacter = () => {
    const cells = document.getElementsByClassName('cell');
    let currentPosition = -1;
    
    // Поиск текущей позиции
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].contains(character)) {
            currentPosition = i;
            break;
        }
    }
    
    // Генерация новой позиции
    let newPosition = currentPosition;
    while (newPosition === currentPosition) {
        newPosition = getRandomInt(0, fieldSize * fieldSize);
    }
    
    // Перемещаем персонажа в новую позицию
    cells[newPosition].append(character);
};

// Инициализация
createGrid();
placeCharacter();

// Сохраняем идентификатор интервала
let gameInterval;

// Запуск таймера
const startGame = () => {
    gameInterval = setInterval(moveCharacter, 1000);
};

// Остановка таймера
const stopGame = () => {
    clearInterval(gameInterval);
};

// Пример добавления кнопки остановки
const stopButton = document.createElement('button');
stopButton.textContent = 'Стоп';
stopButton.addEventListener('click', stopGame);
document.body.append(stopButton);

// Запускаем игру при загрузке
startGame();
