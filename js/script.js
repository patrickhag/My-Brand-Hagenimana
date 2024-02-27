const mode = value => {
  if (value == "dark") {
    body.classList.add("dark__mode")
  } else {
    body.classList.remove("dark__mode")
  }
}

const Themeswitcher = document.querySelectorAll(".theme-switcher"),
  body = document.querySelector("body")

Themeswitcher.forEach(elem => {
  elem.style.cursor = "pointer"
  elem.addEventListener("click", () => {
    if (body.classList.contains("dark__mode")) {
      body.classList.remove("dark__mode")
      localStorage.setItem("colorMode", "white")
      elem.classList.remove("fa-sun")
      elem.classList.add("fa-moon")
    } else {
      body.classList.add("dark__mode")
      localStorage.setItem("colorMode", "dark")
      elem.classList.remove("fa-moon")
      elem.classList.add("fa-sun")
    }
  })
})
//HANDLING THE BUTTON FOR UPDATING THE STATUS OF THE MODE SWITCHING BUTTON
onload = () => {
  mode(localStorage.getItem("colorMode"))
  if (localStorage.getItem("colorMode") === "dark") {
    Themeswitcher.forEach(elem => {
      elem.classList.remove("fa-moon")
      elem.classList.add("fa-sun")
    })
  }
}
