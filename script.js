let currentquestion = {};
let stage = 0; //prod, mod, letter

let seen = 0;
let p1seen = 0;
let p2seen = 0;
let p3seen = 0;
let p1right = 0;
let p2right = 0;
let p3right = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const returner = document.getElementById("returner");
const submitbtn = document.getElementById("submit");
const nextbtn = document.getElementById("next");

function generate() {
  enablebutton();
  let a = Math.floor(Math.random() * 26);
  let b = Math.floor(Math.random() * 26);
  let product = a * b;
  let remainder = product % 26;
  let letter = String.fromCharCode(97 + remainder);
  seen += 1;
  currentquestion = { a, b, product, remainder, letter };
  stage = 0;

  update();
  answer.value = "";
  returner.textContent = "";
}

function update() {
  if (stage === 0) {
    question.textContent = `What is ${currentquestion.a} × ${currentquestion.b}?`;
  } else if (stage === 1) {
    question.textContent = `What is ${currentquestion.product} mod 26?`;
  } else if (stage === 2) {
    question.textContent = `Which letter corresponds to ${currentquestion.remainder}? (a=0, b=1, … z=25)`;
  }
  document.getElementById("seen").textContent = `questions seen: ${seen}`;
  document.getElementById("totalacc").textContent = `total correct/attempts: ${
    p1right + p2right + p3right
  } / ${p1seen + p2seen + p3seen}`;
  document.getElementById(
    "p1acc"
  ).textContent = `product c/a: ${p1right} / ${p1seen}`;
  document.getElementById(
    "p2acc"
  ).textContent = `remainder c/a: ${p2right} / ${p2seen}`;
  document.getElementById(
    "p3acc"
  ).textContent = `conversion c/a: ${p3right} / ${p3seen}`;
}

function check() {
  let userAnswer = answer.value.trim().toLowerCase();

  if (stage === 0) {
    p1seen += 1;
    if (userAnswer === currentquestion.product.toString()) {
      returner.textContent = "Correct. (1/3)";
      returner.style.color = "green";
      stage = 1;
      answer.value = "";
      p1right += 1;
      update();
    } else {
      returner.textContent = "Incorrect.";
      returner.style.color = "red";
    }
  } else if (stage === 1) {
    p2seen += 1;
    if (userAnswer === currentquestion.remainder.toString()) {
      returner.textContent = "Correct. (2/3)";
      returner.style.color = "green";
      stage = 2;
      answer.value = "";
      p2right += 1;
    } else {
      returner.textContent = "Incorrect.";
      returner.style.color = "red";
    }
  } else if (stage === 2) {
    p3seen += 1;
    if (userAnswer === currentquestion.letter) {
      p3right += 1;
      returner.textContent = `Correct.
       ${currentquestion.a} × ${currentquestion.b} = ${currentquestion.product}, 
            ${currentquestion.product} mod 26 = ${currentquestion.remainder}, 
             ${currentquestion.remainder} corresponds to ${currentquestion.letter}.`;
      returner.style.color = "green";
      disablebutton();
    } else {
      returner.textContent = "Incorrect.";
      returner.style.color = "red";
    }
  }
  update();
}

answer.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitbtn.click();
  }
});

const disablebutton = () => {
  submitbtn.disabled = true;
};
const enablebutton = () => {
  submitbtn.disabled = false;
};

submitbtn.addEventListener("click", check);
nextbtn.addEventListener("click", generate);

generate();
