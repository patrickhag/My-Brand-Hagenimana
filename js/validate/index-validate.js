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

  if (usernameValue === "") {
    setError(username, "Username is required")
  } else {
    setSuccess(username)
  }

  if (phoneNumberValue === "") {
    setError(phoneNumber, "Phone number is required")
  } else if (!isValidPhoneNumber(phoneNumberValue)) {
    setError(phoneNumber, "Provide a valid phone number")
  } else {
    setSuccess(phoneNumber)
  }

  if (emailValue === "") {
    setError(email, "Email is required")
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address")
  } else {
    setSuccess(email)
  }

  if (textAreaValue === "") {
    setError(textArea, "Your message is required")
  } else {
    setSuccess(textArea)
  }
}
