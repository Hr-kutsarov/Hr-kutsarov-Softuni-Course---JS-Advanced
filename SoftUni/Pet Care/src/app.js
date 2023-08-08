import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { renderHome } from './views/home.js'
import { renderDashboard } from './views/dashboard.js'
import { renderCreate } from './views/create.js'
import { renderLogin } from './views/login.js'
import { renderRegister } from './views/register.js';
import { renderEdit } from './views/edit.js';
import { renderDetails } from './views/details.js'
import { updateNav } from './views/navigation.js';
const root = document.getElementById('content');


updateNav()
page(decorateContext);
page('/', renderHome);
page('/dashboard', renderDashboard);
page('/dashboard/:id', renderDetails);
page('/edit/:id', renderEdit);
page('/create', renderCreate);
page('/login', renderLogin);
page('/register', renderRegister);

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderElement;
    ctx.updateNav = updateNav
    next();
}
function renderElement(content) {
    render(content, root)
}
