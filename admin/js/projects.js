document.addEventListener("DOMContentLoaded", () => {
  retrieveProjectsAndDisplayThem()
})
const articlesContainer = document.getElementById("articles-container")
const loader = document.querySelector(".loader")
const token = localStorage.getItem("token")

const displayLoader = () => {
  loader.style.display = "block"
  articlesContainer.innerHTML = ""
}

const hideLoader = () => {
  loader.style.display = "none"
}

const retrieveProjectsAndDisplayThem = async () => {
  try {
    displayLoader()

    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/projects",
      {
        method: "GET",
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch articles")
    }

    hideLoader()

    const { data } = await response.json()

    data.forEach((project) => {
      articlesContainer.innerHTML += `
        <div class="card-wrapper">
            <div class="card-content-wrapper">
              <img
                src="https://my-brand-api-x9fd.onrender.com/${project.cover}"
                alt="Image goes here"
              />
              <p class="margin-top-bottom">
                &nbsp;${project.title}
              </p>
              <p>
                ${project.summary}
              </p>
              <div class="card-wrapper-button">
                <button class="">Read project</button>
                <div>
                  <button onClick="navigateToEditForm('${project._id}')">
                    <i class="fas fa-edit fa-edit-alt"></i>
                  </button>
                  <button onClick="deleteProject('${project._id}')">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
    })
  } catch (error) {
    console.error(error)
  }
}

const deleteProject = async (id) => {
  try {
    const confirmation = window.confirm(
      `Are you sure you want to delete this project?`
    )
    if (confirmation) {
      const response = await fetch(
        `https://my-brand-api-x9fd.onrender.com/api/projects/delete-project/${id}`,
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

      retrieveProjectsAndDisplayThem()
    }
  } catch (error) {
    console.error(error.message)
  }
}

const navigateToEditForm = (id) => {
  window.location.href = `/admin/edit-project.html?id=${id}`
}
