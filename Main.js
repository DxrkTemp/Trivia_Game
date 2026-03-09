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
        { question: "Which food is Italian?", answers: ["Pizza", "Burger", "Taco", "Sushi"], correct: 0 }
    ],
    songs: [
        { question: "Who sang 'Thriller'?", answers: ["Michael Jackson", "Drake", "Eminem", "Adele"], correct: 0 },
        { question: "Which is a K-Pop group?", answers: ["BTS", "Coldplay", "Maroon 5", "Imagine Dragons"], correct: 0 }
    ],
    knowledge: [
        { question: "What planet do we live on?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 0 },
        { question: "What is H2O?", answers: ["Water", "Salt", "Oxygen", "Hydrogen"], correct: 0 }
    ],
    programming: [
        { question: "What language runs in the browser?", answers: ["JavaScript", "Python", "C++", "Java"], correct: 0 },
        { question: "What does HTML stand for?", answers: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Machine Language", "None"], correct: 0 }
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
