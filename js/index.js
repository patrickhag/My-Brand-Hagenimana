const username = document.getElementById("username")
const phoneNumber = document.getElementById("phoneNumber")
const email = document.getElementById("email")
const form = document.getElementById("form")
const textArea = document.getElementById("textArea")

form.addEventListener("submit", e => {
  e.preventDefault()
  const isValid = validateInputs()
  if (isValid) {
    const contacts = {
      username: username.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      textArea: textArea.value,
    }
    reachToMe(contacts)
  }
})

let contactsData = []

function reachToMe(contact) {
  const existingContacts = localStorage.getItem("Contacts")
  if (existingContacts) {
    contactsData = JSON.parse(existingContacts)
  }

  contactsData.push(contact)
  localStorage.setItem("Contacts", JSON.stringify(contactsData))
  alert("Message sent successfully!")
}

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
