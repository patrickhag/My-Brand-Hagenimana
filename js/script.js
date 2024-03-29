const mode = (value) => {
  if (value == "dark") {
    body.classList.add("dark__mode")
  } else {
    body.classList.remove("dark__mode")
  }
}

const Themeswitcher = document.querySelectorAll(".theme-switcher"),
  body = document.querySelector("body")

Themeswitcher.forEach((elem) => {
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

onload = () => {
  mode(localStorage.getItem("colorMode"))
  if (localStorage.getItem("colorMode") === "dark") {
    Themeswitcher.forEach((elem) => {
      elem.classList.remove("fa-moon")
      elem.classList.add("fa-sun")
    })
  }
}

const barsEl = document.getElementById("bars")
const smallDeviceLinksEl = document.querySelector(".small-device-links")
const linksEl = document.querySelector(".links li")

barsEl.addEventListener("click", () =>
  smallDeviceLinksEl.classList.toggle("hide")
)
