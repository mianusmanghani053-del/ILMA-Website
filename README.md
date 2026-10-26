# ILMA website

Editable static website extracted from the supplied HTML mockup. No build or dependencies required.

## Preview
Run `python -m http.server 4173 --directory dist` from this folder, then visit http://localhost:4173.

## Update content
- `dist/index.html`: Home, Features, Contact, navigation, FAQs and contact details.
- `dist/assets/catalogue.js`: all supplied suites, modules, descriptions, capabilities and coming-soon flags.
- `dist/assets/styles.css`: branding, typography, layouts and responsive styles.
- `dist/assets/app.js`: routing, search, filters, role previews, Urdu toggle, drawers, forms and calendar download.

Routes are `#/home`, `#/features` and `#/contact`. The Urdu switch translates only the strings supplied in the original mockup. Role dashboards, AI scan and available demo times are sample previews. Contact and booking forms validate locally but do not send data, reserve appointments or send email. Connect a backend and supply approved contact details, privacy policy and terms before a public launch. No real contact information has been invented.
