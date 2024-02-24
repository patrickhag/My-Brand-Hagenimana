document.addEventListener("DOMContentLoaded", () => {
  displayArticles()
})

const retrieveArticles = () => {
  const articlesData = localStorage.getItem("Articles")
  if (articlesData) {
    return JSON.parse(articlesData)
  }
  return []
}

// Display article content on the webpage
const displayArticles = () => {
  const articles = retrieveArticles()
  const articlesContainer = document.getElementById("articles-container")
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

  articles.forEach(article => {
    const originalDateString = article.id
    const originalDate = new Date(originalDateString)
    const day = originalDate.getDate()
    const monthIndex = originalDate.getMonth()
    const year = originalDate.getFullYear()
    const formattedDateString = `${day} ${months[monthIndex]} ${year}`

    articlesContainer.innerHTML += `
      <div class="card-wrapper">
          <div class="card-content-wrapper">
            <img
              src="${article.bgPicture}"
              alt="Image shows athletes"
            />
            <span class="text-space">CREATED ON ${formattedDateString}</span>
            <p class="margin-top-bottom">
              &nbsp;${article.title}
            </p>

            <div class="card-wrapper-button">
              <button class="">Read article</button>
              <div>
                <button onClick="navigateToEditForm(${article.id})">
                  <i class="fas fa-edit fa-edit-alt"></i>
                </button>
                <button onClick="deleteArticle(${article.id})">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `
  })
}

const deleteArticle = id => {
  const articles = retrieveArticles()
  const indexToDelete = articles.findIndex(article => article.id === id)

  if (indexToDelete === -1) {
    console.error("Article not found")
    return
  }
  const confirmation = window.confirm(
    `Are you sure you want to delete the article "${articles[indexToDelete].title}"?`
  )

  if (confirmation) {
    const updatedArticles = articles.filter(article => article.id !== id)
    localStorage.setItem("Articles", JSON.stringify(updatedArticles))
    window.location.href = "/admin/all-articles.html"
  }
}

const navigateToEditForm = id => {
  window.location.href = `/admin/edit-article.html?id=${id}`
}
