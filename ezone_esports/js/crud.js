import { endpoint, headers } from "./settings.js";
let athleteID;

export function get(athlete, query, nextPrev, callBack) {
  fetch(endpoint + query, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0]) {
        alert("that email exist");
      } else {
        post(athlete, nextPrev, callBack);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function post(payout, nextPrev, callBack) {
  const postData = JSON.stringify(payout);
  fetch(endpoint, {
    method: "post",
    headers,
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
      callBack(nextPrev);
    });
}
