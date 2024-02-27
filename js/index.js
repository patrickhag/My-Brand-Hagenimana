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
