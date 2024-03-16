const signOut = document.getElementById("sign-out")

signOut.addEventListener("click", () => {
  window.location.href = "login.html/"
  localStorage.removeItem("token")
})
