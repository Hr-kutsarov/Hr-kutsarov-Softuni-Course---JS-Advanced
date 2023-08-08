import {html} from '../../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs'

const Create = (submitForm) => html`
    <section id="createPage" @submit=${submitForm}>
        <form class="createForm">
          <img src="./images/cat-create.jpg" />
          <div>
            <h2>Create PetPal</h2>
            <div class="name">
              <label for="name">Name:</label>
              <input name="name" id="name" type="text" placeholder="Max" />
            </div>
            <div class="breed">
              <label for="breed">Breed:</label>
              <input
                name="breed"
                id="breed"
                type="text"
                placeholder="Shiba Inu"
              />
            </div>
            <div class="Age">
              <label for="age">Age:</label>
              <input name="age" id="age" type="text" placeholder="2 years" />
            </div>
            <div class="weight">
              <label for="weight">Weight:</label>
              <input name="weight" id="weight" type="text" placeholder="5kg" />
            </div>
            <div class="image">
              <label for="image">Image:</label>
              <input
                name="image"
                id="image"
                type="text"
                placeholder="./image/dog.jpeg"
              />
            </div>
            <button class="btn" type="submit">Create Pet</button>
          </div>
        </form>
      </section>
`

export function renderCreate(context) {
    context.render(Create(submitForm));

    async function submitForm (e) {
      // prevent reload
      e.preventDefault();
      // collect data
      const formData = new FormData(e.target);
      const dataObj = Object.fromEntries(formData);
      // validate data
      const missingValues = Object.values(dataObj).indexOf('') >= 0
      if (missingValues) {
        return
      }

      // convert to json object
      const jsonData = JSON.stringify(dataObj)
      const token = sessionStorage.getItem('token');
      const res = await fetch('http://localhost:3030/data/pets', 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json','X-Authorization': `${token}`}, 
        body: jsonData}
        );
      if (res.ok) {
        console.log('created')
        page.redirect('/')
      }
    }
}