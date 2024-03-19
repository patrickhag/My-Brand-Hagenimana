const username = document.getElementById("username")
const phoneNumber = document.getElementById("phoneNumber")
const email = document.getElementById("email")
const form = document.getElementById("form")
const textArea = document.getElementById("textArea")
const projectContainer = document.querySelector(".project-container")

window.addEventListener("onload", grabProjects())

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const isValid = validateInputs()
  if (isValid) {
    const contact = {
      fullName: username.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      message: textArea.value,
    }
    reachToMe(contact)
    emptyFormData()
  }
})

const emptyFormData = () => {
  return (
    (username.value = ""),
    (phoneNumber.value = ""),
    (email.value = ""),
    (textArea.value = "")
  )
}

async function reachToMe(contact) {
  try {
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/contact-me",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      alert(errorData.message)
      console.error(errorData)
    } else {
      const { message } = await response.json()
      alert(message)
    }
  } catch (error) {
    console.error(error)
  }
}

async function grabProjects() {
  try {
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/projects",
      {
        method: "GET",
      }
    )

    const { data } = await response.json()
    console.log(data)
    data.forEach((project) => {
      projectContainer.innerHTML += `
      <div class="project-wrapper">
      <div class="project-wrapper-image">
        <img
          src="https://my-brand-api-x9fd.onrender.com/${project.cover}"
          alt="Image shows athletes"
        />
      </div>
      <div class="project-wrapper-content">
        <h4>${project.title}</h4>
        <p class="text-grey">
          ${project.summary}
        </p>
        <a href="${project.tools}" target="_blank"><button class="btn btn-secondary">Visit</button></a>
      </div>
    </div>
      `
    })
  } catch (error) {
    console.error(error)
  }
}
