export const endpoint = "https://reicpe-9cc2.restdb.io/rest/ezone-subscribers";
export const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "x-apikey": "606d5dcef5535004310074f4",
  "cache-control": "no-cache",
};

export const Athlete = {
  fullName: "",
  email: "",
  gamerTag: "",
  fakePassword: "",
  gameType: [],
  gamePreference: [],
  habits: {},
  skills: [],
};

let firstDataPosted = false;
function setFDP(value) {
  firstDataPosted = value;
}

export const formState = {
  step1Posted: false,
  step1Change: false,
  step2Posted: false,
  step2Change: false,
  step3Posted: false,
  step3Change: false,
  step4Posted: false,
  step4Change: false,
  step5Posted: false,
  step5Change: false,
  formPosted: false,
};
