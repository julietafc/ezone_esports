import { endpoint, headers, formState } from "./settings.js";

// import { takeClass } from "../main";
let athleteID;
let gamer;
const btnStep1 = document.querySelector("#btn-next-step1");

//---------------------------------

export function get(athlete, query, nextPrev, postData, gamerName) {
  fetch(endpoint + query, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0]) {
        alert(`Hi ${gamerName}! that email already exist!`);
        document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
      } else {
        gamer = gamerName;
        post(athlete, nextPrev, postData);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//----------------------------

export function post(payout, nextPrev, postData) {
  const postPInfo = JSON.stringify(payout);
  fetch(endpoint, {
    method: "post",
    headers,
    body: postPInfo,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data._id);
      athleteID = data._id;
      formState.step1Posted = true;
      document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
      btnStep1.removeEventListener("click", postData);
      btnStep1.addEventListener("click", takeClass);
      nextPrevStep(nextPrev);
    });
}

//-----------------------------------

export function put(data, callBack) {
  let postData = JSON.stringify(data);

  fetch(endpoint + "/" + athleteID, {
    method: "put",
    headers,
    body: postData,
  })
    .then((d) => d.json())
    .then((res) => {
      // document.querySelector(".next circle.thinking").classList.remove("thinking");
      console.log(res);
      formState.formPosted = true;
      cleanForm();
      callBack(gamer);
    });
}

export function takeClass(e) {
  const nextPrev = e.currentTarget.dataset.step;
  nextPrevStep(nextPrev);
}

export function nextPrevStep(nextPrev) {
  document.querySelector(".option.active").classList.remove("active");
  document.querySelector(`.${nextPrev}`).classList.add("active");
}

function cleanForm() {
  document.querySelector("#fname").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#gtag").value = "";
  document.querySelector("#pwd").value = "";
  const allBoxes = document.querySelectorAll('input[type="checkbox"]');
  allBoxes.forEach((box) => {
    box.setAttribute("required", true);
    box.checked = false;
  });
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });
}
