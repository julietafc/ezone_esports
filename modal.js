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
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
