import goblinImage from '../img/goblin.png';
import hammerImage from '../img/hammer.png';

// Создание поля
const gameField = document.getElementById('gameField');
const fieldSize = 4;
let score = 0; // Счетчик очков
let missCount = 0; // Счетчик пропусков
const maxMisses = 5; // Максимальное количество пропусков

// Создание сетки
const createGrid = () => {
    for (let i = 0; i < fieldSize * fieldSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameField.append(cell);
        
        // Добавляем обработчик клика на каждую ячейку
        cell.addEventListener('click', handleCellClick);
    }
};

// Создание персонажа
const character = document.createElement('img');
character.src = goblinImage;
character.alt = 'goblin';
character.classList.add('goblin');

// Создание кастомного курсора
const cursor = document.createElement('div');
cursor.classList.add('cursor');
cursor.style.display = 'none'; // Скрываем изначально
cursor.style.backgroundImage = `url(${hammerImage})`; // Правильно добавляем изображение

document.body.append(cursor);

// Генератор случайных чисел
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Размещение персонажа в случайной позиции
let characterTimeout; // Добавили переменную для таймера

const placeCharacter = () => {
    const randomCell = getRandomInt(0, fieldSize * fieldSize);
    const cells = document.getElementsByClassName('cell');
    
    // Очищаем предыдущий таймер
    clearTimeout(characterTimeout);
    
    // Перемещаем персонажа в новую ячейку
    cells[randomCell].append(character);
    character.style.display = 'block'; // Показываем персонажа
    
    // Запускаем таймер на 1 секунду
    characterTimeout = setTimeout(() => {
        character.style.display = 'none';
        missCount++;
        checkGameOver();
    }, 1000);
};

// Обработка клика по ячейке
const handleCellClick = (event) => {
    const targetCell = event.target;
    
    // Проверяем, находится ли гоблин в этой ячейке
    if (targetCell.contains(character)) {
        // Останавливаем таймер исчезновения
        clearTimeout(characterTimeout);
        
        // Показываем курсор
        cursor.style.display = 'block';
        
        // Обновляем позицию курсора
        const rect = character.getBoundingClientRect();
        cursor.style.left = rect.left + window.scrollX + 'px';
        cursor.style.top = rect.top + window.scrollY + 'px';
        
        // Увеличиваем счет
        score++;
        
        // Скрываем гоблина
        character.style.display = 'none';
        
        // Сброс счетчика пропусков
        missCount = 0;
        
        // Обновляем интерфейс
        updateUI();
        
        // Через 500 мс возвращаем гоблина и скрываем курсор
        setTimeout(() => {
            cursor.style.display = 'none';
            placeCharacter();
        }, 500);
    }
};

// Обновление интерфейса
const updateUI = () => {
    document.querySelector('.score').textContent = `Score: ${score}`;
};

// Проверка на окончание игры
const checkGameOver = () => {
    if (missCount >= maxMisses) {
        stopGame();
        alert('Игра окончена! Вы пропустили слишком много раз.');
    }
};

// Перемещение персонажа
const moveCharacter = () => {
    placeCharacter();
};

// Инициализация
createGrid();

// Сохраняем идентификатор интервала
let gameInterval;

// Запуск таймера
const startGame = () => {
    gameInterval = setInterval(moveCharacter, 1000);
    placeCharacter();
};

// Остановка таймера
const stopGame = () => {
    clearInterval(gameInterval);
};

// Пример добавления кнопки остановки
