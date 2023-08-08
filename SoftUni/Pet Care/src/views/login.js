import {html} from '../../node_modules/lit-html/lit-html.js'
import { post } from "../api/app.js"
import page from '../../node_modules/page/page.mjs';
const Login = (submitHandler) => html`
      <section id="loginPage">
        <form class="loginForm" @submit=${submitHandler}>
          <img src="./images/logo.png" alt="logo" />
          <h2>Login</h2>

          <div>
            <label for="email">Email:</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="steven@abv.bg"
              value=""
            />
          </div>

          <div>
            <label for="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value=""
            />
          </div>

          <button class="btn" type="submit">Login</button>

          <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
          </p>
        </form>
      </section>
`

export function renderLogin(context) {
    context.render(Login(submitHandler));

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        // console.log(JSON.stringify(data))

        if (data.email === '' || data.password === '') {
            alert('invalid values');
            return;
        }
        try {
            const res = await fetch('http://localhost:3030/users/login',
            {method: 'POST', body: JSON.stringify(data)})
            const resData = await res.json()
            window.sessionStorage.setItem('userId', resData._id)
            window.sessionStorage.setItem('email', resData.email)
            window.sessionStorage.setItem('token', resData.accessToken)
            context.updateNav()
            context.page.redirect('/')

        } catch(err) {
            console.log(err.message)
        }
    }
}