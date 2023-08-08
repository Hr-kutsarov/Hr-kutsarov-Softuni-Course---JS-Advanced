import {html} from '../../node_modules/lit-html/lit-html.js'

const Base = () => html`
    <h1>element</h1>
`

export function renderBase(context) {
    context.render(Base());
}