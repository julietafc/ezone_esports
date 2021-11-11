import { formState } from "./js/settings";

//get the DOM content
const modal = document.querySelector(".options_wrapper");
const trigger = document.querySelector(".modal__btn");
const closeButton = document.querySelector(".close");

//add eventlistener
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//Toggle styles on/off
function toggleModal() {
  if (modal.classList.contains("show-modal") && formState.formPosted) {
    if (document.querySelector(".greetingWraper")) {
      document.querySelector(".greetingWraper").remove();
    }
    document.querySelector(".option.active").classList.remove("active");
    document.querySelector(".option.step1").classList.add("active");
  }
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
