document.addEventListener("DOMContentLoaded", () => {
  retrieveArticlesAndDisplayThem()
})
const articlesContainer = document.getElementById("articles-container")
const loader = document.querySelector(".loader")
const token = localStorage.getItem("token")

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const displayLoader = () => {
  loader.style.display = "block"
  articlesContainer.innerHTML = ""
}

const hideLoader = () => {
  loader.style.display = "none"
}

const retrieveArticlesAndDisplayThem = async () => {
  try {
    displayLoader()

    const response = await fetch("http://localhost:3001/api/blog", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch articles")
    }

    hideLoader()

    const { data } = await response.json()

    data.forEach((article) => {
      const originalDateString = article.date
      const originalDate = new Date(originalDateString)
      const day = originalDate.getDate()
      const monthIndex = originalDate.getMonth()
      const year = originalDate.getFullYear()
      const formattedDateString = `${day} ${months[monthIndex]} ${year}`

      articlesContainer.innerHTML += `
      <div class="card-wrapper">
          <div class="card-content-wrapper">
            <img
              src="http://localhost:3001/${article.cover}"
              alt="Image goes here"
            />
            <p class="text-space">CREATED ON ${formattedDateString}</p>
            <p class="margin-top-bottom">
              &nbsp;${article.title}
            </p>

            <div class="card-wrapper-button">
              <button class="">Read article</button>
              <div>
                <button onClick="navigateToEditForm('${article._id}')">
                  <i class="fas fa-edit fa-edit-alt"></i>
                </button>
                <button onClick="deleteArticle('${article._id}')">
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

const deleteArticle = async (id) => {
  try {
    const confirmation = window.confirm(
      `Are you sure you want to delete this article?`
    )
    if (confirmation) {
      const response = await fetch(
        `http://localhost:3001/api/blog/delete-blog/${id}`,
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

      console.log("Article deleted successfully")

      retrieveArticlesAndDisplayThem()
    }
  } catch (error) {
    console.error(error.message)
  }
}

const navigateToEditForm = (id) => {
  window.location.href = `/admin/edit-article.html?id=${id}`
}
