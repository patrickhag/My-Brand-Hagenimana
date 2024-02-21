const form = document.getElementById("form")
const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

form.addEventListener("submit", e => {
  e.preventDefault()

  validateInputs()
})

const setError = (element, message) => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector(".error")

  errorDisplay.innerText = message
  inputControl.classList.add("error")
  inputControl.classList.remove("success")
}

const setSuccess = element => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector(".error")

  errorDisplay.innerText = ""
  inputControl.classList.add("success")
  inputControl.classList.remove("error")
}

const isValidEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const isValidPassword = password => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,20}$/
  return re.test(password)
}

const validateInputs = () => {
  const fullnameValue = fullname.value.trim()
  const emailValue = email.value.trim()
  const passwordValue = password.value.trim()
  const password2Value = password2.value.trim()

  if (fullnameValue === "") {
    setError(fullname, "fullname is required")
  } else {
    setSuccess(fullname)
  }

  if (emailValue === "") {
    setError(email, "Email is required")
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address")
  } else {
    setSuccess(email)
  }

  if (passwordValue === "") {
    setError(password, "Password is required")
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Password must be at least 8 character.")
  } else {
    setSuccess(password)
  }
  if (password2Value === "") {
  } else if (password2Value !== passwordValue) {
    setError(password2, "Please confirm your password")
    setError(password2, "Passwords doesn't match")
  } else {
    setSuccess(password2)
  }
}
