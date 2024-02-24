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
    const formattedDateString = `${months[monthIndex]} ${day}, ${year}`

    articlesContainer.innerHTML += `
      <div class="project-wrapper text-grey" onClick="navigateToArticle(${article.id})">
        <div class="project-wrapper-content">
          <h2>${article.title}.</h2>
          <p>
            ${article.summary}
          </p>
          <p class="text-grey">${formattedDateString}</p>
        </div>
        <div class="project-wrapper-image">
          <img
            src="${article.bgPicture}"
            alt=""
          />
        </div>
      </div>
    <hr class="vertical-line" />
        `
  })
}

const navigateToArticle = id => {
  window.location.href = `/article.html?id=${id}`
}
