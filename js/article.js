const mainNavLinks = document.getElementById("main-nav-links")
const modalContainer = document.getElementById("modalContainer")
const leftIconsWrapper = document.getElementById("leftIconsWrapper")
const modalClose = document.getElementById("modalClose")

function showModal() {
  modalContainer.classList.add("show")
  modalContainer.classList.remove("hidden")
}

function hideModal() {
  modalContainer.classList.add("hidden")
  modalContainer.classList.remove("show")
}

modalClose.addEventListener("click", hideModal())

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

const urlParams = new URLSearchParams(window.location.search)
const id = parseInt(urlParams.get("id"))
const articlesData = JSON.parse(localStorage.getItem("Articles")) || []

const showArticle = id => {
  const article = articlesData.find(article => article.id === id)

  const originalDateString = article.id
  const originalDate = new Date(originalDateString)
  const day = originalDate.getDate()
  const monthIndex = originalDate.getMonth()
  const year = originalDate.getFullYear()
  const formattedDateString = `${months[monthIndex]} ${day}, ${year}`

  document.getElementById("article-container").innerHTML = `
  <div class="main-article">
        <h1 class="center">${article.title}</h1>
        <p class="center">
        ${formattedDateString} BY <span class="text-purple">PATRICK HAG</span>
        </p>
        <div>
          <p>
            ${article.summary}
          </p>
          <picture>
            <img
              src="${article.bgPicture}"
              alt="Articles's background"
              class="articles-cover"
          /></picture>
          <p>
          ${article.body}
          </p>
        </div>
      </div>
  `
}

window.addEventListener("onload", showArticle(id))

const allUsers = JSON.parse(localStorage.getItem("Users")) || []

const checkWhoLoggedIn = () => {
  foundUser = allUsers.find(user => user.isLoggedIn == true)
  return foundUser.isLoggedIn ? foundUser.isLoggedIn : false
}

const isLoggedIn = checkWhoLoggedIn()

if (isLoggedIn) {
  mainNavLinks.innerHTML = `
  <a href=""><span>Logout</span></a>
  `
  leftIconsWrapper.innerHTML = `
    <li>
    <button class="btn-third" id="likeButton">
      <i class="far fa-heart"></i>
    </button>
  </li>
  <li>
    <button id="commentButton" class="btn-third">
      <i class="far fa-comment"></i>
    </button>
  </li>
  `
  const commentButton = document.getElementById("commentButton")
  commentButton.addEventListener("click", () => showModal())
}
