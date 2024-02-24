const form = document.getElementById("form")
const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

form.addEventListener("submit", e => {
  e.preventDefault()

  const isValid = validateInputs()
  console.log(isValid)

  if (isValid) {
    const user = {
      id: Date.now(),
      username: fullname.value,
      email: email.value.trim(),
      password: password.value,
      password2Value: password2.value,
      isLoggedIn: false,
    }
    addUserAndRedirect(user)
  }
})

let userData = []

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedPassword = hashArray
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("")

  return hashedPassword
}

async function addUserAndRedirect(user) {
  const hashedPassword = await hashPassword(user.password)
  const hashedPassword2 = await hashPassword(user.password2)
  const restructureUser = {
    id: Date.now(),
    username: user.username,
    email: user.email,
    password: hashedPassword,
    password2Value: hashedPassword2,
    isLoggedIn: user.isLoggedIn,
  }

  const existingUsers = localStorage.getItem("Users")
  if (existingUsers) {
    userData = JSON.parse(existingUsers)
  }

  if (restructureUser) {
    userData.push(restructureUser)
    localStorage.setItem("Users", JSON.stringify(userData))
    alert("Registered successfully!")
    window.location.href = "login.html"
  }
}
