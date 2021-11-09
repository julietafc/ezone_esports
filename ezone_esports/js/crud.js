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
        document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
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
      console.log(data._id);
      athleteID = data._id;
      document.querySelector("#btn-next-step1 circle").classList.remove("thinking");
      callBack(nextPrev);
    });
}

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
