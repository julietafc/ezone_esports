import { endpoint, headers, formState } from "./settings.js";

import { takeClass } from "../main";
let athleteID;
const btnStep1 = document.querySelector("#btn-next-step1");

//---------------------------------

export function get(athlete, query, nextPrev, callBack, postData) {
  fetch(endpoint + query, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0]) {
        alert("that email exist");
        document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
      } else {
        post(athlete, nextPrev, callBack, postData);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//----------------------------

export function post(payout, nextPrev, callBack, postData) {
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
      callBack(nextPrev);
    });
}

//-----------------------------------

export function put(nextPrev, data, callBack) {
  let postData = JSON.stringify(data);

  fetch(endpoint + "/" + athleteID, {
    method: "put",
    headers,
    body: postData,
  })
    .then((d) => d.json())
    .then((res) => {
      document.querySelector(".next circle.thinking").classList.remove("thinking");
      callBack(nextPrev);
      console.log(res);
    });
}
