document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")

  const token = localStorage.getItem("token")

  if (!token) {
    window.location.href = "login.html"
  }

  try {
    const response = await fetch(`http://localhost:3001/api/blog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch article for editing")
    }

    const { data } = await response.json()
    const articleToUpdate = data
    console.log(articleToUpdate)
    document.getElementById("title").value = articleToUpdate.title
    document.getElementById("summary").value = articleToUpdate.summary
    document.getElementById("body").value = articleToUpdate.body
  } catch (error) {
    console.error(error)
  }

  // Add event listener for the edit form submission
  document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = document.getElementById("title")
    const summary = document.getElementById("summary")
    const cover = document.getElementById("cover")
    const body = document.getElementById("body")

    const data = new FormData()
    data.append("title", title.value)
    data.append("summary", summary.value)
    data.append("body", body.value)
    data.append("image", cover.files[0])

    try {
      const response = await fetch(
        `http://localhost:3001/api/blog/update-blog/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      )
      const { message } = await response.json()

      if (!response.ok) {
        alert(message)
      }
      window.location.href = "all-articles.html"
    } catch (error) {
      console.error(error)
    }
  })
})
