document.addEventListener("DOMContentLoaded", () => {
  retrieveArticlesAndDisplayThem()
})

const articlesContainer = document.getElementById("articles-container")
const loader = document.querySelector(".loader")
const signOut = document.getElementById("sign-out")

if (signOut) {
  signOut.addEventListener("click", () => {
    window.location.href = "login.html/"
    localStorage.removeItem("token")
  })
}
const displayLoader = () => {
  loader.style.display = "block"
}

const hideLoader = () => {
  loader.style.display = "none"
}

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

const formatDateString = (date) => {
  const originalDateString = date
  const originalDate = new Date(originalDateString)
  const day = originalDate.getDate()
  const monthIndex = originalDate.getMonth()
  const year = originalDate.getFullYear()
  return `${months[monthIndex]} ${day}, ${year}`
}

const retrieveArticlesAndDisplayThem = async () => {
  try {
    displayLoader()
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/blog",
      {
        method: "GET",
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch articles")
    }
    hideLoader()

    const { data } = await response.json()
    data.forEach((article) => {
      articlesContainer.innerHTML += `
        <div class="project-wrapper text-grey" onClick="navigateToArticle('${
          article._id
        }')">
          <div class="project-wrapper-content">
            <h2>${article.title}.</h2>
            <p>
              ${article.summary}
            </p>
            <p class="text-grey"><i>${formatDateString(article.date)}</i></p>
          </div>
          <div class="project-wrapper-image">
            <img
              src="https://my-brand-api-x9fd.onrender.com/${article.cover}"
              alt=""
            />
          </div>
        </div>
      <hr class="vertical-line" />
          `
    })
  } catch (error) {
    console.error(error.message)
  }
}

const navigateToArticle = (id) => {
  window.location.href = `/article.html?id=${id}`
}

const mainNavLinks = document.getElementById("main-nav-links")

const token = localStorage.getItem("token")

let isLoggedIn

if (token) {
  isLoggedIn = true
}

if (isLoggedIn) {
  mainNavLinks.innerHTML = `
    <a href="" id="sign-out"><span>Logout</span></a>
    <i class="theme-switcher fas fa-moon"></i>
`
}
