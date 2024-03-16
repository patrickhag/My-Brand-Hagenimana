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
    }

    const { token, userFound } = await response.json()
    localStorage.setItem("token", token)
    const name = userFound.fullName.split(" ")[1]
    if (userFound.role === "admin") {
      alert(`Welcome mr ${name}`)
      window.location.href = "admin/index.html"
    } else {
      alert(`welcome mr/mrs ${name}`)
      window.location.href = "article.html"
    }
  } catch (error) {
    console.error(error)
    alert("Failed to login. Please try again.")
  }
}
