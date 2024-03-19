const form = document.getElementById("form")
const title = document.getElementById("title")
const summary = document.getElementById("summary")
const tools = document.getElementById("tools")
const cover = document.getElementById("cover")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (cover.files.length === 0) {
    alert("Please select a file")
    return
  }
  const data = new FormData()
  data.append("title", title.value)
  data.append("summary", summary.value)
  data.append("tools", tools.value)
  data.append("image", cover.files[0])

  addArticle(data)
})

const token = localStorage.getItem("token")

async function addArticle(article) {
  try {
    const response = await fetch(
      "https://my-brand-api-x9fd.onrender.com/api/projects/create-project",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: article,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      alert(errorData.message)
      console.error(errorData)
    } else {
      const { message } = await response.json()
      alert(message)
      window.location.href = "projects.html"
    }
  } catch (error) {
    console.error(error)
  }
}
