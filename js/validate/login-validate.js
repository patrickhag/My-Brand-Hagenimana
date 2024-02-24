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
  const emailValue = email.value.trim()
  const passwordValue = password.value.trim()
  let isValid = true

  if (emailValue === "") {
    setError(email, "Email is required")
    isValid = false
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address")
    isValid = false
  } else {
    setSuccess(email)
  }

  if (passwordValue === "") {
    setError(password, "Password is required")
    isValid = false
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Password must be at least 8 character.")
    isValid = false
  } else {
    setSuccess(password)
  }
  return isValid
}
