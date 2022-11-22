questions = [
  {
    question: "Wer war die Erste Person die Programmiert hat?",
    answer_0: "Bill Gates",
    answer_1: "George Gordon Byron",
    answer_2: "Ada Lovelace",
    answer_3: "Konrad Zuse",
    right_answer: 2,
  },
  {
    question: "Was ist ein Byte?",
    answer_0: "Eine Maßeinheit für Datenmengen",
    answer_1: "Programmiersprache",
    answer_2: "Ein Bildbearbeitungsprogramm",
    answer_3: "Teil der Hardware",
    right_answer: 0,
  },
  {
    question: "Was bedeutet IT?",
    answer_0: "Intelligenztest",
    answer_1: "Informationstechnologie",
    answer_2: "Informatik und Technik",
    answer_3: "Intel Technick",
    right_answer: "1",
  },
  {
    question: "Was bedeutet IoT?",
    answer_0: "Innovation on Transformation",
    answer_1: "Information of Technology",
    answer_2: "Internet of Things",
    answer_3: "Information on Television",
    right_answer: 2,
  },
  {
    question: "Wie viel Bits hat ein Byte?",
    answer_0: "2",
    answer_1: "4",
    answer_2: "8",
    answer_3: "16",
    right_answer: 2,
  },
  {
    question: "Was bedeutet Malware",
    answer_0: "Interne Software",
    answer_1: "Berater-Software",
    answer_2: "Bösartige Schadsoftware",
    answer_3: "Englischer für Schreibwaren Laden",
    right_answer: 2,
  },
];
let position = 0;
let right_answers = 0;
let success_sound = new Audio("sounds/right.mp3");
let wrong_sound = new Audio("sounds/wrong.mp3");
let win_sound = new Audio("sounds/win.mp3");
let duck_sound = new Audio("sounds/duck.mp3");
let monkey_sound = new Audio("sounds/monkey.mp3");

function init() {
  arrayLength();
  addText();
  addAnswer();
  counter();
  buttonEnable();
  progress();
}

function counter() {
  let counter = position + 1;
  document.getElementById("counter").innerHTML = `${counter}`;
}

function arrayLength() {
  let array_len = questions.length;
  document.getElementById("total").innerHTML = "";
  document.getElementById("total").innerHTML = `${array_len}`;
}

function addText() {
  let text = questions[position]["question"];
  document.getElementById("text").innerHTML = "";
  document.getElementById("text").innerHTML = `${text}`;
}

function addAnswer() {
  for (let i = 0; i < 4; i++) {
    let answerid = "answer" + i;
    let answer = "answer_" + i;

    document.getElementById(answerid).innerHTML = "";
    document.getElementById(answerid).href = "";
    document.getElementById(
      answerid
    ).innerHTML = `${questions[position][answer]}`;
  }
}

function nextQuestion() {
  position++;
  init();
}

function decision(select) {
  ButtonDisabled();
  decisionChecker(select);
}

function ButtonDisabled() {
  for (let i = 0; i < 4; i++) {
    let answers = "answer" + i;
    document.getElementById(answers).disabled = true;
  }
}

function buttonEnable() {
  for (let i = 0; i < 4; i++) {
    let answers = "answer" + i;
    document.getElementById(answers).disabled = false;
  }
}

function showResult() {
  document.getElementById("my-card").classList.add("my-end-card");
  if (right_answers == 6) {
    allRight();
  } else if (right_answers >= 3) {
    almostRight();
  } else {
    firstTry();
  }
  setTimeout(reloader, 1200);
}

function reloader() {
  document.getElementById("reloader").classList.remove("d-none");
}

function answers(body) {
  body.innerHTML = "";
  body.innerHTML = answerHTML();
}

function answerHTML() {
  return `
        
        <div class="last-card-body">
          <div class="card-head colum">
            <h2 class="card-title font-weight-bolder">
              Ihr Ergebnis!
            </h2>
            <h3 class="mt-5">Glückwünsch!<br>Sie haben ${right_answers} von 6 Fragen richtig beantwortet</h3>
            <div class="steps steps-position" style="margin-top: 5%;">
              <button
              id="reloader"
              onclick="location.reload()"
              type="button"
              class="center btn btn-info text-white d-none">
                Neu starten
              </button>
            </div>
          </div>
        </div>`;
}

function firstTry() {
  monkey_sound.play();
  let body = document.getElementById("my-card");
  body.style = "background-color: red;";
  answers(body);
}

function almostRight() {
  duck_sound.play();
  let body = document.getElementById("my-card");
  body.style = "background-color: yellow;";
  answers(body);
}

function allRight() {
  win_sound.play();
  foo();
  let body = document.getElementById("my-card");

  body.style = "background-color: #27d182;";
  body.innerHTML = "";
  body.innerHTML = allRightHTML();
}

function allRightHTML() {
  return `
        <div class="last-card-body">
          <div class="card-head colum">
            <h2 class="card-title font-weight-bolder">
              Ihr Ergebnis!
            </h2>
            <h3 class="mt-5">Glückwünsch!<br>Sie haben alle ${right_answers} Fragen richtig beantwortet</h3>
            <div class="steps steps-position" style="margin-top: 5%;">
              <button
              id="reloader"
              onclick="location.reload()"
              type="button"
              class="center btn btn-info text-white d-none">
                Neu starten
              </button>
            </div>
          </div>
        </div>`;
}

function decisionChecker(select) {
  if (!(position == 5)) {
    showAnswer(select);
  } else {
    position++;
    progress();
    switchToResult(select);
  }
}

function switchToResult(select) {
  let answer = "right_answer";
  let answerId = "answer" + select;
  if (questions[position - 1][answer] == select) {
    afterLastRightInput(answerId);
  } else {
    afterLastWrongInput(answerId);
  }
}

function afterLastRightInput(answerId) {
  right_answers++;
  toggleRight(answerId);
  setTimeout(toggleRight, 500, answerId);
  setTimeout(showResult, 600);
  setTimeout(responsLastScreenMargin, 600);
  success_sound.play();
}

function afterLastWrongInput(answerId) {
  toggleWrong(answerId);
  setTimeout(toggleWrong, 500, answerId);
  setTimeout(showResult, 600);
  setTimeout(responsLastScreenMargin, 600);
  wrong_sound.play();
}

function showAnswer(select) {
  let answer = "right_answer";
  let answerId = "answer" + select;

  if (questions[position][answer] == select) {
    afterRightInput(answerId);
  } else {
    afterWrongInput(answerId);
  }
}

function afterWrongInput(answerId) {
  toggleWrong(answerId);
  setTimeout(toggleWrong, 500, answerId);
  setTimeout(nextQuestion, 600);
  wrong_sound.play();
}

function afterRightInput(answerId) {
  right_answers++;
  toggleRight(answerId);
  setTimeout(toggleRight, 500, answerId);
  setTimeout(nextQuestion, 600);
  success_sound.play();
}

function toggleRight(answerId) {
  document.getElementById(answerId).classList.toggle("right");
}

function toggleWrong(answerId) {
  document.getElementById(answerId).classList.toggle("wrong");
}

function progress() {
  let progresses = Math.round((position / questions.length) * 100);
  console.log(progresses);

  document.getElementById("progressbar").style = `width : ${progresses}%`;
  document.getElementById("progressbar").innerHTML = `${progresses}%`;
}

function responsLastScreenMargin() {
  if (window.screen.width < 400) {
    document.getElementById("my-card").classList.add("ml-3");
  } else if (window.screen.width < 800) {
    document.getElementById("my-card").classList.add("ml-4");
  } else if (window.screen.width < 1200) {
    document.getElementById("my-card").classList.add("ml-13");
  }
}
