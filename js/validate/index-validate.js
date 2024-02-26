form.addEventListener("submit", e => {
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
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

const isValidPhoneNumber = phoneNumber => {
  const regex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
  return regex.test(phoneNumber)
}

const validateInputs = () => {
  const usernameValue = username.value.trim()
  const emailValue = email.value.trim()
  const phoneNumberValue = phoneNumber.value
  const textAreaValue = textArea.value

  let isValidate = true

  if (usernameValue === "") {
    setError(username, "Your name is required")
    isValidate = false
  } else {
    setSuccess(username)
  }

  if (phoneNumberValue === "") {
    setError(phoneNumber, "Phone number is required")
    isValidate = false
  } else if (!isValidPhoneNumber(phoneNumberValue)) {
    setError(phoneNumber, "Provide a valid phone number")
    isValidate = false
  } else {
    setSuccess(phoneNumber)
  }

  if (emailValue === "") {
    setError(email, "Email is required")
    isValidate = false
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address")
    isValidate = false
  } else {
    setSuccess(email)
  }

  if (textAreaValue === "") {
    setError(textArea, "Your message is required")
    isValidate = false
  } else {
    setSuccess(textArea)
  }
  return isValidate
}
