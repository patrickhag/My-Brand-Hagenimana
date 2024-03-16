const form = document.getElementById("form")
const title = document.getElementById("title")
const summary = document.getElementById("summary")
const cover = document.getElementById("cover")
const body = document.getElementById("body")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (cover.files.length === 0) {
    alert("Please select a file")
    return
  }
  const data = new FormData()
  data.append("title", title.value)
  data.append("summary", summary.value)
  data.append("body", body.value)
  data.append("image", cover.files[0])

  addArticle(data)
})

const token = localStorage.getItem("token")

async function addArticle(article) {
  try {
    const response = await fetch("http://localhost:3001/api/blog/create-blog", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: article,
    })

    if (!response.ok) {
      const errorData = await response.json()
      alert(errorData.message)
      console.error(errorData)
    } else {
      const { message } = await response.json()
      alert(message)
      window.location.href = "all-articles.html"
    }
  } catch (error) {
    console.error(error)
  }
}
