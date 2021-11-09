import "./style.scss";
import { get, post } from "./js/crud";
import { Athlete } from "./js/settings";

init();

function init() {
  document.querySelectorAll(".next, .back").forEach((element) => {
    element.addEventListener("click", takeClass);
  });
  const btnStep1 = document.querySelector("#btn-next-step1");
  btnStep1.removeEventListener("click", takeClass);
  btnStep1.addEventListener("click", postData);
}

function takeClass(e) {
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

function postData(e) {
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
  get(athlete, query, nextPrev, nextPrevStep);
}
