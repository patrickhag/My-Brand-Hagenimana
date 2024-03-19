const form = document.getElementById("form")
const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const isValid = validateInputs()

  if (isValid) {
    const userData = {
      fullName: fullname.value,
      email: email.value.trim(),
      password: password.value.trim(),
    }
    addUserAndRedirect(userData)
  }
})

async function addUserAndRedirect(user) {
  try {
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to register")
    } else {
      alert("User registration successfully")
      window.location.href = "login.html"
    }
  } catch (error) {
    console.error("Error during registering:", error)
  }
}
