const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

form.addEventListener("submit", e => {
  e.preventDefault()
  const isValid = validateInputs()
  if (isValid) {
    const user = {
      email: email.value.trim(),
      password: password.value.trim(),
    }
    loggingIn(user)
  }
})

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

const allUsers = JSON.parse(localStorage.getItem("Users")) || []

async function loggingIn(passedUser) {
  const hashedPassword = await hashPassword(passedUser.password)

  const userIndex = allUsers.findIndex(
    user => user.email === passedUser.email && hashedPassword === user.password
  )

  if (userIndex >= 0) {
    let username = allUsers[userIndex].username
    username = username.split(" ")[0]
    allUsers[userIndex].isLoggedIn = true
    localStorage.setItem("Users", JSON.stringify(allUsers))
    alert("Welcome " + username)
    window.location.href = "article.html"
  } else if (
    passedUser.email == "ADMIN@ADMIN.OWNER" &&
    passedUser.password === "adMIN@1234"
  ) {
    window.location.href = "/admin"
  } else {
    alert("Verify your credentials. or sign up instead!")
  }
}
