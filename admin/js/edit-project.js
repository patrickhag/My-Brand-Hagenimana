document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")

  const token = localStorage.getItem("token")

  if (!token) {
    window.location.href = "login.html"
  }

  try {
    const response = await fetch(
      `https://my-brand-api-x9fd.onrender.com/api/projects/${id}`,
      {
        method: "GET",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch project for editing")
    }

    const { data } = await response.json()
    const projectToUpdate = data

    document.getElementById("title").value = projectToUpdate.title
    document.getElementById("summary").value = projectToUpdate.summary
    document.getElementById("tools").value = projectToUpdate.tools
  } catch (error) {
    console.error(error)
  }

  // Add event listener for the edit form submission
  document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = document.getElementById("title")
    const summary = document.getElementById("summary")
    const tools = document.getElementById("tools")
    const cover = document.getElementById("cover")

    const data = new FormData()
    data.append("title", title.value)
    data.append("summary", summary.value)
    data.append("tools", tools.value)
    data.append("image", cover.files[0])

    try {
      const response = await fetch(
        `https://my-brand-api-x9fd.onrender.com/api/projects/update-project/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      )
      const { message } = await response.json()

      if (response.ok) {
        alert(message)
      }
      window.location.href = "projects.html"
    } catch (error) {
      console.error(error)
    }
  })
})
