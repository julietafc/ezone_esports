import "./style.scss";
import { get, put, takeClass, nextPrevStep } from "./js/crud";
import { Athlete, formState } from "./js/settings";

let btnStep1;
let gamerName;

const athlete = Object.create(Athlete);

window.addEventListener("load", init);

function init() {
  document.querySelectorAll(".back").forEach((element) => {
    element.addEventListener("click", takeClass);
  });

  document.querySelectorAll(".next").forEach((element) => {
    element.addEventListener("click", takeClass);
  });

  btnStep1 = document.querySelector("#btn-next-step1");
  btnStep1.removeEventListener("click", takeClass);
  btnStep1.addEventListener("click", postData);

  document.querySelector(".btn.submit").addEventListener("click", putData);

  addDataToInputs();
  addRequiredToBox();
}

function postData(e) {
  const nextPrev = e.currentTarget.dataset.step;
  //add class thinking to the button
  document.querySelector("#btn-next-step1 circle").classList.add("thinking");

  //crating query to search for the email
  const email = document.querySelector("#email").value;
  const query = `?q={"email":"${email}"}`;

  //fill athlete object with personal info

  athlete.fullName = document.querySelector("#fname").value;
  athlete.email = email;
  athlete.gamerTag = document.querySelector("#gtag").value;
  athlete.fakePassword = document.querySelector("#pwd").value;
  gamerName = takeName(document.querySelector("#fname").value);
  //call
  get(athlete, query, nextPrev, postData, gamerName);
}

function putData() {
  fillObject();
  // console.log(dataObj);
  put(athlete, displayGreeting);
}

function fillObject() {
  athlete.fullName = document.querySelector("#fname").value;
  athlete.email = document.querySelector("#email").value;
  athlete.gamerTag = document.querySelector("#gtag").value;
  athlete.fakePassword = document.querySelector("#pwd").value;
  athlete.gameType = arrayBoxes("step2");
  athlete.gamePreference = arrayBoxes("step3");
  athlete.habits = objRadio("step4");
  athlete.skills = arrayBoxes("step5");
  console.log(athlete);
}

function arrayBoxes(step) {
  let data = [];
  const checkedBoxes = document.querySelectorAll(`fieldset.${step} input[type=checkbox]:checked`);
  checkedBoxes.forEach((checkBox) => {
    data.push(checkBox.value);
  });
  return data;
}

function objRadio(step) {
  let data = {};
  const checkedRadios = document.querySelectorAll(`fieldset.${step} input[type=radio]:checked`);
  checkedRadios.forEach((checkRadio) => {
    const key = checkRadio.getAttribute("name");
    data[key] = checkRadio.value;
  });
  return data;
}

function addDataToInputs() {
  const steps = document.querySelectorAll("fieldset.option");
  steps.forEach((step, i) => {
    const formStep = "step" + (i + 1);
    //add info to numbers
    step.querySelector(".number").dataset.formStep = formStep;
    step.querySelector(".number").addEventListener("click", function () {
      nextPrevStep(formStep);
    });
    //add info to inputs
    step.querySelectorAll("input").forEach((input) => {
      input.dataset.formStep = formStep;
      input.addEventListener("change", manageImputChanges);
    });
  });
}

function manageImputChanges(e) {
  if (formState.step1Posted) {
    const step = e.currentTarget.dataset.formStep;
    if (step === "step2" || "step3" || "step5") {
      stepTwo(step);
    }
  } else {
    return;
  }
}

function stepTwo(step) {
  const checkedBoxes = document.querySelectorAll(`fieldset.${step} input[type=checkbox]:checked`);
  // console.log(checkedBoxes.length);
  let NoBoxes = 1;
  if (step === "step3") {
    NoBoxes = 3;
  }
  if (checkedBoxes.length >= NoBoxes) {
    // console.log("lenght more then 1");
    document.querySelectorAll(`fieldset.${step} input[type=checkbox]`).forEach((box) => {
      box.removeAttribute("required");
    });
  } else {
    document.querySelectorAll(`fieldset.${step} input[type=checkbox]`).forEach((box) => {
      box.setAttribute("required", true);
    });
  }
}

function addRequiredToBox() {
  document.querySelectorAll(`fieldset.option input[type=checkbox]`).forEach((box) => {
    box.setAttribute("required", true);
  });
}

function takeName(fullName) {
  let gamer = fullName.split(" ")[0];
  gamer = gamer.replace(gamer[0], gamer[0].toUpperCase());
  return gamer;
}

///-------------greeting-----------------

function displayGreeting(gamerName) {
  const greeting = `Thank you very much ${gamerName} for your preference.
We are  so happy to help you to become the gamer you want to be.`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("greetingWraper");
  const pGreeting = document.createElement("p");
  pGreeting.textContent = greeting;
  wrapper.appendChild(pGreeting);
  document.querySelector("fieldset.step5").appendChild(wrapper);
}
