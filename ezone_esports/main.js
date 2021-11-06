import "./style.scss";

init();

function init() {
  document.querySelectorAll(".option").forEach((element) => {
    element.addEventListener("click", () => {
      if (document.querySelector(".option.active")) {
        document.querySelector(".option.active").classList.remove("active");
      }

      element.classList.add("active");
    });
  });
}
