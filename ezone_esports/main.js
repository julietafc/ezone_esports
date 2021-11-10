import "./style.scss";
import { get, post, put } from "./js/crud";
import { Athlete } from "./js/settings";
import { formState } from "./js/settings";

let btnStep1;

init();

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

  addDataToInputs();
  //addRequiredToBox();
}

export function takeClass(e) {
  const nextPrev = e.currentTarget.dataset.step;
  nextPrevStep(nextPrev);
}

function nextPrevStep(nextPrev) {
  document.querySelector(".option.active").classList.remove("active");
  document.querySelector(`.${nextPrev}`).classList.add("active");
}

const form = document.querySelector("form.options");
form.setAttribute("novalidate", true);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
  } else {
  }
});

export function postData(e) {
  const nextPrev = e.currentTarget.dataset.step;
  //add class thinking to the button
  document.querySelector("#btn-next-step1 circle").classList.add("thinking");

  //crating query to search for the email
  const email = document.querySelector("#email").value;
  const query = `?q={"email":"${email}"}`;

  //fill athlete object with personal info
  const athlete = Object.create(Athlete);
  athlete.fullName = document.querySelector("#fname").value;
  athlete.email = email;
  athlete.gamerTag = document.querySelector("#gtag").value;
  athlete.fakePassword = document.querySelector("#pwd").value;

  //call
  get(athlete, query, nextPrev, nextPrevStep, postData);
}

function putData(e) {
  const nextPrev = e.currentTarget.dataset.step;
  const fieldToPost = e.currentTarget.dataset.field;
  // console.log(e.currentTarget);
  e.currentTarget.querySelector("circle").classList.add("thinking");
  let data = [];
  const checkedBoxes = document.querySelectorAll("fieldset.step2 input[type=checkbox]:checked");
  checkedBoxes.forEach((checkBox) => {
    data.push(checkBox.value);
  });
  const dataObj = {};
  dataObj[fieldToPost] = data;
  // console.log(dataObj);
  put(nextPrev, dataObj, nextPrevStep);
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
    if (step === "step2") {
      stepTwo(e);
    }
  } else {
    return;
  }
}

function stepTwo(e) {
  const nextPrev = e.currentTarget.dataset.step;
  const fieldToPost = e.currentTarget.dataset.field;
  const checkedBoxes = document.querySelectorAll("fieldset.step2 input[type=checkbox]:checked");
  // console.log(checkedBoxes.length);
  if (checkedBoxes.length >= 1) {
    // console.log("lenght more then 1");
    document.querySelectorAll('fieldset.step2 input[type="checkbox"]').forEach((box) => {
      box.removeAttribute("required");
    });
  } else {
    document.querySelectorAll('fieldset.step2 input[type="checkbox"]').forEach((box) => {
      box.setAttribute("required", true);
    });
  }
}
