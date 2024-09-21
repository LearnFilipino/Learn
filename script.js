let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let lessonButton = document.getElementById("lesson-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const lessonContainer = document.getElementById("lesson-container");
const closeLesson = document.getElementById("close-lesson");


const quizArray = [
  {
    id: "0",
    question: "Naglaba",
    options: ["Pandiwa", "Pang-abay", "Pang-angkop", "Pang-uri"],
    correct: "Pandiwa",
  },
  {
    id: "1",
    question: "Nagmamadaling naligo si Lian.",
    options: ["Pandiwa", "Pang-abay", "Pang-uri", "Pangngalan"],
    correct: "Pang-abay",
  },
  {
    id: "2",
    question: "Kumanta",
    options: ["Pang-abay", "Pang-uri", "Pandiwa", "Pangngalan"],
    correct: "Pandiwa",
  },
  {
    id: "3",
    question: "Mabilis mag-Rap si Flow G.",
    options: ["Pandiwa", "Pang-abay", "Pang-uri", "Pangngalan"],
    correct: "Pang-abay",
  },
  {
    id: "4",
    question: "Tumakbo",
    options: ["Pang-abay", "Pang-uri", "Pandiwa", "Pangngalan"],
    correct: "Pandiwa",
  },
  {
    id: "5",
    question: "Ang bahay ___ puti ay napakalaki.",
    options: ["Na", "Ng", "Nang", "Sa"],
    correct: "Na",
  },
  {
    id: "6",
    question: "Kumain siya ___ tahimik upang hindi magising ang bata.",
    options: ["Na", "Ng", "Nang", "Sa"],
    correct: "Nang",
  },
  {
    id: "7",
    question: "Ang aklat ___ guro ay nasa mesa.",
    options: ["Na", "Ng", "Nang", "Sa"],
    correct: "Ng",
  },
  {
    id: "8",
    question: "Tumakbo siya ___ mabilis papunta sa paaralan.",
    options: ["Na", "Ng", "Nang", "Sa"],
    correct: "Nang",
  },
  {
    id: "9",
    question: "Si Juan ay isang bata ___ magaling maglaro ng chess.",
    options: ["Na", "Ng", "Nang", "Sa"],
    correct: "Na",
  },
  {
    id: "10",
    question: "Ano ang iyong gagawin bukas ____",
    options: [".", ",", "?", "!"],
    correct: "?",
  },
  {
    id: "11",
    question: "Kailangan mo ng tatlong bagay: papel, lapis, at libro ____",
    options: [".", ",", ";", ":"],
    correct: ":",
  },
  {
    id: "12",
    question: "Tumalon si Juan mula sa mataas na hagdan ____",
    options: [".", ",", "?", "!"],
    correct: "!",
  },
  {
    id: "13",
    question: "Nag-aaral si Ana nang mabuti upang pumasa sa pagsusulit ____",
    options: [".", ",", "?", "!"],
    correct: ".",
  },
  {
    id: "14",
    question: "Huwag kang mag-alala ____",
    options: [".", ",", "?", "!"],
    correct: "!",
  },
];


restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    
    questionCount += 1;
    
    if (questionCount == quizArray.length) {
      
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
    
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
 
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
 
  quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
  
  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
   
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
   
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
  
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

 
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    correctSound.play();
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    wrongSound.play(); 

    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }


  clearInterval(countdown);
 
  options.forEach((element) => {
    element.disabled = true;
  });
}


function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

lessonButton.addEventListener("click", () => {
  lessonContainer.classList.remove("hide");
  lessonContainer.style.height = "100vh"; // Full-page height
  lessonContainer.style.width = "100vw"; // Full-page width
});

// Hide the lesson iframe when "Close" button is clicked
closeLesson.addEventListener("click", () => {
  lessonContainer.classList.add("hide");
});
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");


};

