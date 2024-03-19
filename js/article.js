const loader = document.querySelector(".loader")

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

const displayLoader = () => {
  loader.style.display = "block"
}

const hideLoader = () => {
  loader.style.display = "none"
}

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")

const showArticle = async () => {
  try {
    displayLoader()
    const response = await fetch(
      `https://my-brand-api-x9fd.onrender.com/api/blog/${id}`,
      {
        method: "GET",
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch articles")
    }
    hideLoader()
    let { data: article } = await response.json()

    document.getElementById("article-container").innerHTML = `
    <div class="main-article">
          <h1 class="center">${article.title}</h1>
          <p class="center">
          ${formatDateString(
            article.date
          )} BY <span class="text-purple">PATRICK HAG</span>
          </p>
          <div>
            <p>
              ${article.summary}
            </p>
            <picture>
              <img
                src="https://my-brand-api-x9fd.onrender.com/${article.cover}"
                alt="Articles's background"
                class="articles-cover"
            /></picture>
            <p>
            ${article.body}
            </p>
          </div>
        </div>
    `
  } catch (error) {
    console.error(error.message)
  }
}

showArticle()

const mainNavLinks = document.getElementById("main-nav-links")
const modalContainer = document.getElementById("modalContainer")
const leftIconsWrapper = document.getElementById("leftIconsWrapper")
const modalClose = document.getElementById("modalClose")

function showModal(element) {
  element.classList.add("show")
  element.classList.remove("hidden")
}

function hideModal(element) {
  element.classList.remove("show")
  element.classList.add("hidden")
}

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
  commentButton.addEventListener("click", () => showModal(modalContainer))
}

modalClose.addEventListener("click", () => hideModal(modalContainer))

const phraseEl = document.getElementById("phrase")
const postCommentBtn = document.getElementById("post-comment")
const commentContainer = document.getElementById("comment-container")

if (phraseEl !== "") {
  postCommentBtn.addEventListener("click", () => {
    const data = {
      phrase: phraseEl.value,
    }
    commentOnArticle(data)
  })
}

const commentOnArticle = async (phrase) => {
  try {
    const response = await fetch(
      `https://my-brand-api-x9fd.onrender.com/api/blog/${id}/create-comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(phrase),
      }
    )

    const { message } = await response.json()

    if (!response.ok) {
      alert(message)
    } else {
      grabAllComments()
      phraseEl.value = ""
    }
  } catch (error) {
    console.error(error.message)
  }
}

const createProfile = (name) => {
  const logo = name.split(" ")
  const firstCharacters = logo.map((word) => word.charAt(0))
  return firstCharacters.join("").toUpperCase()
}

const formatCommentDates = (date) => {
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  })
  return formattedDate
}

const grabAllComments = async () => {
  commentContainer.innerHTML = ""
  try {
    displayLoader()
    const response = await fetch(
      `https://my-brand-api-x9fd.onrender.com/api/blog/${id}/all-comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch comments")
    }
    hideLoader()
    const { data } = await response.json()
    console.log(data)
    data.forEach((comment) => {
      commentContainer.innerHTML += `
      <nav class="modal-user-section">
            <div class="profile"><span>${createProfile(
              comment.user
            )}</span></div>
            <div>
              <div class="modal-name-headers">
                <h5 class="">${comment.user}</h5>
                <span class="">• ${formatCommentDates(comment.date)}</span>
              </div>
              <p>
                ${comment.phrase}
              </p>
            </div>
          </nav>
      `
    })
  } catch (error) {
    console.error(error.message)
  }
}
grabAllComments()
