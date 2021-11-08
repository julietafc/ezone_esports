import "./style.scss";

init();

function init() {
  document.querySelectorAll(".next, .back").forEach((element) => {
    element.addEventListener("click", (e) => {
      document.querySelector(".option.active").classList.remove("active");

      console.log(e.currentTarget.dataset.step);
      document.querySelector(`.${e.currentTarget.dataset.step}`).classList.add("active");
    });
  });
}
