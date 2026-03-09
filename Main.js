const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");

if (playBtn) {

  playBtn.addEventListener("click", () => {

    window.location.href = "Categories.html";

  });

}

if (settingsBtn) {

  settingsBtn.addEventListener("click", () => {

    window.location.href = "Settings.html";

  });

}

const backBtns = document.querySelectorAll("#backBtn");

backBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    window.location.href = "index.html";

  });

});

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category = button.dataset.category;

    if (!category) return;

    localStorage.setItem("selectedCategory", category);

    window.location.href = "Game.html";

  });

});

const musicToggle = document.getElementById("musicToggle");
const volumeSlider = document.getElementById("volumeSlider");
const fullscreenBtn = document.getElementById("fullscreenBtn");

if (musicToggle) {

  musicToggle.addEventListener("change", () => {

    localStorage.setItem("music", musicToggle.checked);

  });

}

if (volumeSlider) {

  volumeSlider.addEventListener("input", () => {

    localStorage.setItem("volume", volumeSlider.value);

  });

}

if (fullscreenBtn) {

  fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

      document.documentElement.requestFullscreen();

      fullscreenBtn.textContent = "ON";

    }
    else {

      document.exitFullscreen();

      fullscreenBtn.textContent = "OFF";

    }

  });

}

const questionBox = document.getElementById("questionBox");
const answerButtonsDiv = document.getElementById("answerButtons");
const categoryTitle = document.getElementById("categoryTitle");
const scoreText = document.getElementById("scoreText");

const shieldIcon = document.getElementById("shieldIcon");
const shieldUI = document.getElementById("shieldUI");

const resultOverlay = document.getElementById("resultOverlay");
const overlayText = document.getElementById("overlayText");

const tryBtn = document.getElementById("tryBtn");
const menuBtn = document.getElementById("menuBtn");

let currentQuestionIndex = 0;
let score = 0;
let shieldActive = false;

if (shieldIcon) {

  shieldIcon.addEventListener("click", () => {

    if (!shieldActive) {

      shieldActive = true;

      shieldIcon.style.opacity = "0.4";

      shieldUI.classList.remove("hidden");

    }

  });

}

const questions = {

  foods: [
    { q: "Which fruit is yellow?", a: ["Apple", "Banana", "Grapes", "Orange"], correct: 1 },
    { q: "Pizza comes from which country?", a: ["France", "USA", "Italy", "Spain"], correct: 2 },
    { q: "Which drink is made from coffee beans?", a: ["Milk", "Tea", "Coffee", "Juice"], correct: 2 },
    { q: "What food is sushi usually made with?", a: ["Rice", "Bread", "Potato", "Corn"], correct: 0 },
    { q: "Which fruit is red?", a: ["Banana", "Apple", "Lemon", "Grapes"], correct: 1 },
    { q: "Which food is known as fast food?", a: ["Burger", "Rice", "Soup", "Salad"], correct: 0 },
    { q: "Which vegetable is orange?", a: ["Broccoli", "Carrot", "Onion", "Cabbage"], correct: 1 }
  ],

  songs: [
    { q: "Who is known as the King of Pop?", a: ["Drake", "Michael Jackson", "Eminem", "Bruno Mars"], correct: 1 },
    { q: "Which song is by Taylor Swift?", a: ["Halo", "Blank Space", "Perfect", "Shape of You"], correct: 1 },
    { q: "Who sang 'Shape of You'?", a: ["Ed Sheeran", "Justin Bieber", "Drake", "Shawn Mendes"], correct: 0 },
    { q: "Which singer released 'Bad Guy'?", a: ["Ariana Grande", "Billie Eilish", "Dua Lipa", "Rihanna"], correct: 1 },
    { q: "Which band sang 'Bohemian Rhapsody'?", a: ["Queen", "Beatles", "Coldplay", "Maroon 5"], correct: 0 },
    { q: "Who sang 'Rolling in the Deep'?", a: ["Adele", "Beyonce", "Taylor Swift", "Rihanna"], correct: 0 },
    { q: "Which singer is famous for 'Uptown Funk'?", a: ["Bruno Mars", "Drake", "Post Malone", "The Weeknd"], correct: 0 }
  ],

  knowledge: [
    { q: "What is the capital of Japan?", a: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correct: 2 },
    { q: "How many continents are there?", a: ["5", "6", "7", "8"], correct: 2 },
    { q: "Which planet is known as the Red Planet?", a: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { q: "What is the largest ocean?", a: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 },
    { q: "Which animal is known as the King of the Jungle?", a: ["Tiger", "Lion", "Elephant", "Bear"], correct: 1 },
    { q: "What gas do humans breathe in?", a: ["Carbon Dioxide", "Oxygen", "Hydrogen", "Nitrogen"], correct: 1 },
    { q: "Which country has the Eiffel Tower?", a: ["Italy", "Germany", "France", "Spain"], correct: 2 }
  ],

  programming: [
    { q: "Which language is used for web pages?", a: ["Python", "C++", "HTML", "Java"], correct: 2 },
    { q: "What does JS stand for?", a: ["JavaSource", "JavaScript", "JustScript", "JumboScript"], correct: 1 },
    { q: "Which language styles web pages?", a: ["HTML", "CSS", "Python", "Java"], correct: 1 },
    { q: "Which language is mainly used for backend?", a: ["Python", "HTML", "CSS", "Photoshop"], correct: 0 },
    { q: "What symbol is used for comments in JavaScript?", a: ["//", "**", "##", "!!"], correct: 0 },
    { q: "Which company created JavaScript?", a: ["Microsoft", "Netscape", "Google", "Apple"], correct: 1 },
    { q: "Which tag is used for JavaScript in HTML?", a: ["<style>", "<js>", "<script>", "<code>"], correct: 2 }
  ]

};

const selectedCategory = localStorage.getItem("selectedCategory");

if (selectedCategory && questions[selectedCategory] && questionBox) {

  categoryTitle.textContent = selectedCategory.toUpperCase();

  loadQuestion();

}

function loadQuestion() {

  if (currentQuestionIndex >= questions[selectedCategory].length) {

    endGame();
    return;

  }

  answerButtonsDiv.innerHTML = "";

  const currentQuestion = questions[selectedCategory][currentQuestionIndex];

  questionBox.textContent = currentQuestion.q;


  currentQuestion.a.forEach((answer, index) => {

    const btn = document.createElement("button");

    btn.classList.add("category-btn");

    btn.textContent = answer;

    btn.onclick = () => checkAnswer(index, btn);

    answerButtonsDiv.appendChild(btn);

  });


  scoreText.textContent = "Score: " + score;

}

function checkAnswer(selectedIndex, button) {

  const correctIndex = questions[selectedCategory][currentQuestionIndex].correct;


  if (selectedIndex === correctIndex) {

    score++;

    currentQuestionIndex++;

    loadQuestion();

    return;

  }


  button.classList.add("wrong");

  button.disabled = true;



  if (shieldActive) {

    shieldActive = false;

    shieldIcon.style.display = "none";

    shieldUI.classList.add("hidden");

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

  tryBtn.style.display = "inline-block";
  menuBtn.style.display = "inline-block";

  resultOverlay.classList.remove("hidden");

}

if (tryBtn) {

  tryBtn.addEventListener("click", () => {

    resultOverlay.classList.add("hidden");

    loadQuestion();

  });

}

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    window.location.href = "Menu.html";

  });

}

function endGame() {

  questionBox.textContent = "GAME OVER";

  answerButtonsDiv.innerHTML = "";

  scoreText.textContent = "Final Score: " + score;

}
