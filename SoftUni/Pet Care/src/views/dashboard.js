import {html} from '../../node_modules/lit-html/lit-html.js'
import { get } from '../api/app.js'
const Dashboard = (data) => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
        ${!data.length == 0 ? 
            
            data.map((pet) => petCard(pet)) :
            html`<div><p class="no-pets">No pets in dashboard</p></div>`
        }
        </div>
      </section>
`
const petCard = (pet) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${pet.image} />
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/dashboard/${pet._id}">Details</a>
        </div>
    </div>
`
export async function renderDashboard(context) {
    const res = await get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
    const data = await res.json()
    console.log(data)
    context.render(Dashboard(data));
}