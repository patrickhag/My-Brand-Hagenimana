const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

form.addEventListener("submit", (e) => {
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

async function loggingIn(user) {
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
    } else {
      alert("Verify your credentials. or sign up instead!")
    }

    const { token, userFound } = await response.json()

    if (userFound.role === "admin") {
      window.location.href = "admin/index.html"
    } else {
      window.location.href = "article.html"
    }
  } catch (error) {
    console.error(error)
    alert("Failed to login. Please try again.")
  }
}
