document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = parseInt(urlParams.get("id"))
  let articlesData = JSON.parse(localStorage.getItem("Articles"))

  let articleToUpdate = articlesData.find(article => {
    return article.id === id
  })

  document.getElementById("title").value = articleToUpdate.title
  document.getElementById("summary").value = articleToUpdate.summary
  document.getElementById("body").value = articleToUpdate.body

  const form = document.getElementById("form")
  form.addEventListener("submit", e => {
    e.preventDefault()

    articleToUpdate.title = document.getElementById("title").value
    articleToUpdate.summary = document.getElementById("summary").value
    articleToUpdate.body = document.getElementById("body").value

    const updatedArticles = articlesData.map(article => {
      return article.id === articleToUpdate.id ? articleToUpdate : article
    })
    localStorage.setItem("Articles", JSON.stringify(updatedArticles))
    if (updatedArticles) {
      alert("Updated success!")
      window.location.href = "/admin/all-articles.html"
    }
  })
})
