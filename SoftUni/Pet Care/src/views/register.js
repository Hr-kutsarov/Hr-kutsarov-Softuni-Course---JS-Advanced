import {html} from '../../node_modules/lit-html/lit-html.js'

const Register = (submitHandler) => html`
    <section id="registerPage">
    <form class="registerForm" @submit=${submitHandler}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
        <label for="email">Email:</label>
        <input
            id="email"
            name="email"
            type="text"
            placeholder="steven@abv.bg"
            value=""
        />
        </div>

        <div class="on-dark">
        <label for="password">Password:</label>
        <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value=""
        />
        </div>

        <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="********"
            value=""
        />
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
    </section>
`

export function renderRegister(context) {

    context.render(Register(submitHandler));

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        console.log(JSON.stringify(data))

        if (data.email === '' || data.password === '') {
            alert('invalid values');
            return;
        }
        
        try {
            const res = await fetch('http://localhost:3030/users/register',
            {method: 'POST', body: JSON.stringify(data)})
            const resData = await res.json()
            window.sessionStorage.setItem('userId', resData._id)
            window.sessionStorage.setItem('email', resData.email)
            window.sessionStorage.setItem('token', resData.accessToken)
            context.updateNav();
            context.page.redirect('/')

        } catch(err) {
            console.log(err.message)
        }
    }
}