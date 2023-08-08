import {html, render} from '../../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs';

const header = document.querySelector('header');
const Navigation = (user) => html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo" />
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <!--Only Guest-->
            ${!user ? 
            html`
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            ` :   
            html`
            <li><a href="/create">Create Postcard</a></li>
            <li id="logoutBtn"><a @click=${logoutHandler}>Logout</a></li>
            `}
        </ul>
    </nav>
`

export function updateNav() {
    const user = window.sessionStorage.getItem('userId')
    render(Navigation(user), header)
}

async function logoutHandler() {
    try {
        const token = sessionStorage.getItem('token');
        const res = await fetch('http://localhost:3030/users/logout', 
        {method: 'GET', headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${token}`,
        }})
        // if (res.status === 204) {
            sessionStorage.clear()
            updateNav()
            page.redirect('/')
    // }
    } catch(err) {
        console.log(err)
    }
}