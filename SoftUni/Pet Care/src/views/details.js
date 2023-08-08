import {html} from '../../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs'

const Details = (pet, userId, onEdit, onDelete) => html`
    <section id="detailsPage">
    <div class="details">
        <div class="animalPic">
        <img src="${pet.image}" />
        </div>
        <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: 0$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        <div class="actionBtn">
            ${pet._ownerId === userId ? 
            html`
            <a @click=${onEdit} href="javascript:void(0)" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            ` :
            html`<a href="#" class="donate">Donate</a>`}
        </div>
        </div>
    </div>
    </section>
`

export async function renderDetails(context) {
    const id = context.params.id
    const pet = await getPetById(id)
    // console.log(pet)
    const userId = sessionStorage.getItem('userId')
    context.render(Details(pet, userId, onEdit, onDelete));
}

async function onDelete() {
    const url = new URL(window.location)
    const id = url.pathname.split('/')[2]
    
    try {
        const token = sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:3030/data/pets/${id}`,
            {
            method: 'DELETE', 
            headers: {'Content-Type': 'application/json','X-Authorization': `${token}`} 
            })
        const data = await res.json();
        if (data._deletedOn !== '') {
            page.redirect('/dashboard')
        }
        return data
    } catch(err) {
        alert(err.message)
    }    
}

async function onEdit() {
    const url = new URL(window.location)
    const id = url.pathname.split('/')[2]
    page.redirect(`/edit/${id}`)
}
async function getPetById(id) {
    try {
        const token = sessionStorage.getItem('token');
        const res = await fetch('http://localhost:3030/data/pets/' + id,
            {
            method: 'GET', 
            headers: {'Content-Type': 'application/json','X-Authorization': `${token}`} 
            })
        const data = await res.json();

        return data
    } catch(err) {
        alert(err.message)
    }    
}