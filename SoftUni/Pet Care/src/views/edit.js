import {html} from '../../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs'

const Edit = (data) => html`
      <section id="editPage">
        <form class="editForm" @submit=${submitForm}>
          <img src="./images/editpage-dog.jpg" />
          <div>
            <h2>Edit PetPal</h2>
            <div class="name">
              <label for="name">Name:</label>
              <input name="name" id="name" type="text" value="${data.name}" />
            </div>
            <div class="breed">
              <label for="breed">Breed:</label>
              <input name="breed" id="breed" type="text" value="${data.breed}" />
            </div>
            <div class="Age">
              <label for="age">Age:</label>
              <input name="age" id="age" type="text" value="${data.age}" />
            </div>
            <div class="weight">
              <label for="weight">Weight:</label>
              <input name="weight" id="weight" type="text" value="${data.weight}" />
            </div>
            <div class="image">
              <label for="image">Image:</label>
              <input
                name="image"
                id="image"
                type="text"
                value="${data.image}"
              />
            </div>
            <button class="btn" type="submit">Edit Pet</button>
          </div>
        </form>
      </section>
`


export async function renderEdit(context) {
  const id = context.params.id;
  const data = await getData(id)
  context.render(Edit(data));
}

async function getData(id) {
  const token = sessionStorage.getItem('token');
  const res = await fetch(`http://localhost:3030/data/pets/${id}`, {
    method: "GET",
    headers: {'Content-Type': 'application/json','X-Authorization': `${token}`},
  })
  const data = await res.json();
  return data
}

async function submitForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const bodyData = JSON.stringify(Object.fromEntries(formData))

  // validate form
  const dataObj = Object.fromEntries(formData);
  const missingValues = Object.values(dataObj).indexOf('') >= 0
  if (missingValues) {
    alert('missing data')
    return
  }

  try {
    const url = new URL(window.location)
    const id = url.pathname.split('/')[2]
    const token = sessionStorage.getItem('token');
    const res = await fetch(`http://localhost:3030/data/pets/${id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json','X-Authorization': `${token}`},
      body: bodyData
    })
    console.log(res)
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      page.redirect(`/dashboard/${id}`)
    }
  } catch(err) {
    alert(err.message)
  }
}