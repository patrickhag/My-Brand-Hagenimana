const form = document.getElementById("form")
const title = document.getElementById("title")
const summary = document.getElementById("summary")
const bgPicture = document.getElementById("bgPicture")
const body = document.getElementById("body")

form.addEventListener("submit", e => {
  e.preventDefault()
  if (bgPicture.files.length === 0) {
    alert("Please select a file")
    return
  }
  const reader = new FileReader()
  const file = bgPicture.files[0]

  // console.log(reader)

  reader.onload = function (event) {
    const article = {
      id: Date.now(),
      title: title.value,
      summary: summary.value,
      body: body.value,
      bgPicture: event.target.result,
    }
    addArticle(article)
  }

  reader.readAsDataURL(file)
})

let articlesData = []

const addArticle = article => {
  const existingArticles = localStorage.getItem("Articles")
  if (existingArticles) {
    articlesData = JSON.parse(existingArticles)
  }
  articlesData.push(article)
  localStorage.setItem("Articles", JSON.stringify(articlesData))

  if (articlesData) {
    alert("Added succeccesfully!")
    window.location.href = "/admin/all-articles.html"
  }
}
