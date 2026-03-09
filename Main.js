const menuScreen = document.getElementById("menuScreen");
const settingsScreen = document.getElementById("settingsScreen");
const categoryScreen = document.getElementById("categoryScreen");
const gameScreen = document.getElementById("gameScreen");

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");

playBtn.addEventListener("click", () => showScreen(categoryScreen));
settingsBtn.addEventListener("click", () => showScreen(settingsScreen));

document.getElementById("backSettings").onclick = () => showScreen(menuScreen);
document.getElementById("backCategory").onclick = () => showScreen(menuScreen);
document.getElementById("homeBtn").onclick = () => showScreen(menuScreen);

const volumeSlider = document.getElementById("volumeSlider");
const musicToggle = document.getElementById("musicToggle");
const fullscreenBtn = document.getElementById("fullscreenBtn");
let isFullscreen = false;

fullscreenBtn.addEventListener("click", () => {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = "ON";
        isFullscreen = true;
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = "OFF";
        isFullscreen = false;
    }
});

let selectedCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let shieldActive = false;

const questionBox = document.getElementById("questionBox");
const answerButtons = document.getElementById("answerButtons");
const scoreText = document.getElementById("scoreText");
const resultOverlay = document.getElementById("resultOverlay");
const overlayText = document.getElementById("overlayText");
const tryBtn = document.getElementById("tryBtn");
const menuBtn = document.getElementById("menuBtn");
const categoryTitle = document.getElementById("categoryTitle");
const shieldIcon = document.getElementById("shieldIcon");
const shieldUI = document.getElementById("shieldUI");

const questions = {
    foods: [
        { question: "Which fruit is yellow?", answers: ["Banana", "Apple", "Orange", "Grapes"], correct: 0 },
        { question: "Which food is Italian?", answers: ["Pizza", "Burger", "Taco", "Sushi"], correct: 0 },
        { question: "Which vegetable is green?", answers: ["Broccoli", "Carrot", "Potato", "Beetroot"], correct: 0 },
        { question: "Which is a dairy product?", answers: ["Cheese", "Bread", "Rice", "Chicken"], correct: 0 },
        { question: "Which food is commonly eaten for breakfast?", answers: ["Cereal", "Steak", "Sushi", "Burger"], correct: 0 },
        { question: "Which fruit has seeds on the outside?", answers: ["Strawberry", "Apple", "Grapes", "Mango"], correct: 0 },
        { question: "Which food is spicy?", answers: ["Chili", "Bread", "Milk", "Cheese"], correct: 0 },
        { question: "Which meat is commonly used in bacon?", answers: ["Pork", "Beef", "Chicken", "Lamb"], correct: 0 },
        { question: "Which is a type of pasta?", answers: ["Spaghetti", "Rice", "Bread", "Burger"], correct: 0 },
        { question: "Which fruit is tropical?", answers: ["Mango", "Apple", "Strawberry", "Blueberry"], correct: 0 },
        { question: "Which nut is used to make peanut butter?", answers: ["Peanut", "Almond", "Walnut", "Cashew"], correct: 0 }
    ],
    songs: [
        { question: "Who sang 'Thriller'?", answers: ["Michael Jackson", "Drake", "Eminem", "Adele"], correct: 0 },
        { question: "Which is a K-Pop group?", answers: ["BTS", "Coldplay", "Maroon 5", "Imagine Dragons"], correct: 0 },
        { question: "Who is known as the Queen of Pop?", answers: ["Madonna", "Taylor Swift", "Beyoncé", "Rihanna"], correct: 0 },
        { question: "Which song has the lyrics 'Let it be'?", answers: ["Let It Be", "Hey Jude", "Yellow Submarine", "Yesterday"], correct: 0 },
        { question: "Who sang 'Shape of You'?", answers: ["Ed Sheeran", "Justin Bieber", "Shawn Mendes", "Bruno Mars"], correct: 0 },
        { question: "Which band sang 'Bohemian Rhapsody'?", answers: ["Queen", "The Beatles", "Coldplay", "Nirvana"], correct: 0 },
        { question: "Who is known as the 'King of Pop'?", answers: ["Michael Jackson", "Elvis Presley", "Prince", "Usher"], correct: 0 },
        { question: "Which singer is Canadian?", answers: ["Justin Bieber", "Ed Sheeran", "Bruno Mars", "Adele"], correct: 0 },
        { question: "Which song was sung by Adele?", answers: ["Hello", "Firework", "Rolling in the Deep", "Shape of You"], correct: 2 },
        { question: "Which artist is part of Destiny's Child?", answers: ["Beyoncé", "Rihanna", "Lady Gaga", "Katy Perry"], correct: 0 },
        { question: "Which genre is BTS known for?", answers: ["K-Pop", "Rock", "Jazz", "Country"], correct: 0 }
    ],
    knowledge: [
        { question: "What planet do we live on?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 0 },
        { question: "What is H2O?", answers: ["Water", "Salt", "Oxygen", "Hydrogen"], correct: 0 },
        { question: "What gas do humans breathe in?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 0 },
        { question: "Which is the largest ocean?", answers: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 0 },
        { question: "How many continents are there?", answers: ["7", "5", "6", "8"], correct: 0 },
        { question: "Which is the tallest mountain?", answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], correct: 0 },
        { question: "Which animal is the largest?", answers: ["Blue Whale", "Elephant", "Giraffe", "Shark"], correct: 0 },
        { question: "Which planet is known as the Red Planet?", answers: ["Mars", "Jupiter", "Venus", "Mercury"], correct: 0 },
        { question: "Which organ pumps blood?", answers: ["Heart", "Lungs", "Kidney", "Liver"], correct: 0 },
        { question: "Which is the fastest land animal?", answers: ["Cheetah", "Lion", "Horse", "Tiger"], correct: 0 },
        { question: "What is the boiling point of water?", answers: ["100°C", "0°C", "50°C", "212°C"], correct: 0 }
    ],
    programming: [
        { question: "What language runs in the browser?", answers: ["JavaScript", "Python", "C++", "Java"], correct: 0 },
        { question: "What does HTML stand for?", answers: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Machine Language", "None"], correct: 0 },
        { question: "Which language is used for styling web pages?", answers: ["CSS", "Python", "C#", "Ruby"], correct: 0 },
        { question: "Which is a backend language?", answers: ["Node.js", "HTML", "CSS", "Bootstrap"], correct: 0 },
        { question: "What symbol is used to start a comment in JavaScript?", answers: ["//", "#", "<!--", "/*"], correct: 0 },
        { question: "Which language is mainly used for iOS apps?", answers: ["Swift", "Java", "Python", "C#"], correct: 0 },
        { question: "Which language is mainly used for Android apps?", answers: ["Java", "Swift", "C++", "Ruby"], correct: 0 },
        { question: "Which is a database language?", answers: ["SQL", "HTML", "CSS", "Python"], correct: 0 },
        { question: "Which is used for version control?", answers: ["Git", "HTML", "Python", "CSS"], correct: 0 },
        { question: "Which framework is used with JavaScript for UI?", answers: ["React", "Django", "Flask", "Rails"], correct: 0 },
        { question: "Which keyword declares a variable in JavaScript?", answers: ["let", "var", "const", "All of the above"], correct: 3 }
    ]
};

function resetShield() {
    shieldActive = false;
    if (shieldIcon) shieldIcon.style.display = "inline-block";
    if (shieldUI) shieldUI.classList.add("hidden");
    if (shieldIcon) shieldIcon.style.opacity = "1";
}

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        currentQuestionIndex = 0;
        score = 0;
        scoreText.textContent = "Score: 0";
        categoryTitle.textContent = selectedCategory.toUpperCase();
        resetShield();  
        showScreen(gameScreen);
        loadQuestion();
    });
});

shieldIcon.addEventListener("click", () => {
    if (!shieldActive) {
        shieldActive = true;
        shieldIcon.style.opacity = "0.4";
        shieldUI.classList.remove("hidden");
    }
});

function loadQuestion() {
    const categoryQuestions = questions[selectedCategory];
    if (!categoryQuestions || categoryQuestions.length === 0) return;

    if (currentQuestionIndex >= categoryQuestions.length) {
        overlayText.textContent = "YOU FINISHED THE QUIZ!";
        resultOverlay.classList.remove("hidden");
        return;
    }

    const currentQuestion = categoryQuestions[currentQuestionIndex];
    questionBox.textContent = currentQuestion.question;
    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("answer-btn");
        btn.onclick = () => checkAnswer(index, btn);
        answerButtons.appendChild(btn);
    });
}

function checkAnswer(index, button) {
    const categoryQuestions = questions[selectedCategory];
    const currentQuestion = categoryQuestions[currentQuestionIndex];

    if (index === currentQuestion.correct) {
        score++;
        scoreText.textContent = "Score: " + score;
        currentQuestionIndex++;
        loadQuestion();
        return;
    }

    button.classList.add("wrong");
    button.disabled = true;

    if (shieldActive) {
        shieldActive = false;
        shieldUI.classList.add("hidden");
        shieldIcon.style.display = "none";

        overlayText.textContent = "SHIELD SAVED YOU!";
        resultOverlay.classList.remove("hidden");
        tryBtn.style.display = "none";
        menuBtn.style.display = "none";

        setTimeout(() => {
            resultOverlay.classList.add("hidden");
            tryBtn.style.display = "inline-block";
            menuBtn.style.display = "inline-block";
        }, 1000);

        return;
    }

    overlayText.textContent = "YOUR ANSWER WAS INCORRECT";
    resultOverlay.classList.remove("hidden");
}

tryBtn.onclick = () => {
    resultOverlay.classList.add("hidden");
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = "Score: 0";
    resetShield();  
    loadQuestion();
};

menuBtn.onclick = () => {
    resultOverlay.classList.add("hidden");
    showScreen(menuScreen);
    resetShield();
};

