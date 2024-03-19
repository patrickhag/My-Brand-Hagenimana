const queryWrapper = document.getElementById("query-wrapper")

const token = localStorage.getItem("token")
const loader = document.querySelector(".loader")

const displayLoader = () => {
  loader.style.display = "block"
  queryWrapper.innerHTML = ""
}

const hideLoader = () => {
  loader.style.display = "none"
}

const getMessages = async () => {
  try {
    displayLoader()
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/all-contacts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch messages")
    }
    hideLoader()

    const { data: contactsData } = await response.json()
    contactsData.map(
      (contact) =>
        (queryWrapper.innerHTML += `
        <div class="query-container">
        <nav class="query-container-nav">
          <h3>Mr/Mrs ${contact.fullName}</h3>
          <div>
            <button onClick="deleteContact('${contact._id}')">
            <i class="fas fa-trash-alt"></i></div>
          </button>
        </nav>
      <div class="query-sub-container">
        <p>
          <i>S/he wrote</i>"${contact.message}"
        </p>
        <div>
          <div class="inline-block-container">
            <i class="fas fa-envelope"></i>
            <a href="mailto:${contact.email}">${contact.email}.com</a>
          </div>
          <div>
            <i class="fas fa-phone"></i>
            <span>${contact.phoneNumber}</span>
          </div>
        </div>
      </div>
      </div>
      `)
    )
  } catch (error) {
    console.error(error.message)
  }
}

const deleteContact = async (id) => {
  try {
    const confirmation = window.confirm(
      `Are you sure you want to delete this article?`
    )
    if (confirmation) {
      const response = await fetch(
        `https://my-brand-api-x9fd.onrender.com/api/delete-contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete article")
      }

      getMessages()
    }
  } catch (error) {
    console.error(error.message)
  }
}

window.addEventListener("onload", getMessages())
