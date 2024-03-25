const Header = () => {
  return (
    <header className='main-header'>
      <div className='header-content'>
        <div className='main-header-logo'>
          <a href='./index.html'>PH</a>
        </div>
        <nav className='main-nav'>
          <ul>
            <li>
              <a href='#projects'>Web dev</a>
            </li>
            <li>
              <a href='#about'>Data science</a>
            </li>
            <li>
              <a href='./#contact'>Artificial intelligence</a>
            </li>
          </ul>
        </nav>
        <div id='main-nav-links' className='main-nav-links'>
          <a href='/login.html'>
            <span>Login</span>
          </a>
          <button>
            <i className='theme-switcher fas fa-moon fa-lg'></i>
          </button>
        </div>
        <div className='menu-button'>
          <i className='navToggle fas fa-bars fa-lg' id='bars'></i>
        </div>
      </div>
      <div className='small-device-links hide'>
        <ul className='links'>
          <li>
            <a href='#projects'>Web dev</a>
          </li>
          <li>
            <a href='#about'>Data science</a>
          </li>
          <li>
            <a href='./#contact'>Artificial intelligence</a>
          </li>
          <li>
            <a href='/login.html'>
              <span>Login</span>
            </a>
          </li>
          <li>
            <button>
              <i className='theme-switcher fas fa-moon fa-lg'></i>
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

const SectionBody = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  async function loginUser(e) {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const { token, userFound } = await response.json()
      localStorage.setItem("token", token)
      const name = userFound.fullName.split(" ")[1]
      if (userFound.role === "admin") {
        alert(`Welcome mr ${name}`)
        window.location.href = "admin/index.html"
      } else {
        alert(`welcome mr/mrs ${name}`)
        window.location.href = "blog.html"
      }
    } catch (error) {
      console.error("Error during login:", error)
      alert("Error during login")
    }
  }

  return (
    <section className='main-container-login'>
      <div className='login-form-wrapper'>
        <form action='/' id='form' onSubmit={loginUser}>
          <div className='center margin-bottom'>
            Login and get to like articles
            <hr className='vertical-line' />
          </div>
          <div className='input-control'>
            <input
              type='email'
              placeholder='🙎‍♂️ Email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='error'></div>
          </div>
          <div className='input-control'>
            <input
              type='password'
              placeholder='🔒 Password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='error'></div>
          </div>
          <button className='btn btn-secondary' id='signUpButton'>
            Sign in
          </button>
          <p>
            <span>
              <b>Or</b>
              <a href='./register.html'> sign up now!</a>
            </span>
          </p>
        </form>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a className='footer-link' href='#home'>
            Home |{" "}
          </a>
        </li>
        <li>
          <a className='footer-link' href='#about'>
            About |{" "}
          </a>
        </li>
        <li>
          <a className='footer-link' href='#projects'>
            Projects |{" "}
          </a>
        </li>
        <li>
          <a className='footer-link' href='#contact'>
            Contact
          </a>
        </li>
      </ul>
      <p>
        <span>
          <i className='fab fa-twitter'></i>
        </span>{" "}
        &#183;
        <span>
          <i className='fab fa-linkedin'></i>
        </span>
        &#183;
        <span>
          <i className='fas fa-envelope-open'></i>
        </span>
      </p>
      <p>
        &copy; Copyright 2024. Created by
        <span className='footer-name'>
          <a className='footer-link' href='./index.html'>
            Patrick Hagenimana
          </a>
        </span>
      </p>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <SectionBody />
      <Footer />
    </>
  )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(<App />)
