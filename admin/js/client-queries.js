const contactsData = JSON.parse(localStorage.getItem("Contacts")) || []
const queryWrapper = document.getElementById("query-wrapper")

const getFeedBack = () => {
  contactsData.map(
    contact =>
      (queryWrapper.innerHTML += `
      <div class="query-container"><h3>Mr/Mrs ${contact.username}</h3>
    <div class="query-sub-container">
      <p>
        <i>S/he wrote</i>${contact.textArea}
      </p>
      <div>
        <div class="inline-block-container">
          <i class="fas fa-envelope"></i>
          <a href="mailto:${contact.email}">${contact.email}.com</a>
        </div>
        <div>
          <i class="fas fa-phone"></i>
          <span>${contact.phoneNumber}</span>
        </div>
      </div>
    </div>
    </div>
    `)
  )
}

window.addEventListener("onload", getFeedBack())
