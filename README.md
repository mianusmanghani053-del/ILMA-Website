# ILMA website

Editable static website with a Supabase backend for contact enquiries, demo requests and the private admin lead inbox.

## Preview
Run `python -m http.server 4173 --directory dist` from this folder, then visit http://localhost:4173.

## Supabase setup
1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor.
2. Copy the project's **Project URL** and **anon/public key** from Project Settings → API into `dist/assets/backend-config.js`. These are public browser settings; never put a `service_role` key in this file or in the website.
3. In Supabase Auth, keep public sign-ups disabled and create/invite each admin account. In the SQL Editor, grant the admin role to the intended user's UUID:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where id = 'USER_UUID';
   ```

   Sign out and sign back in after changing the role so the account receives a fresh token.
4. Add your local and production site URLs to Supabase Auth's allowed redirect/site URL settings. Start the preview server and open `http://localhost:4173/#/admin` to sign in.

The database enables row-level security. Unauthenticated visitors can submit new leads only; only users with the server-controlled `app_metadata.role = admin` claim can view, update status, or delete leads. The admin screen can display the 200 most recent leads. Demo times are saved as preferences and do **not** reserve a real appointment. Submissions are stored in Supabase; email notifications are not configured. The contact form includes a honeypot, but no CAPTCHA or rate limit has been configured; add abuse protection before wide public promotion.

The lead form collects names, school/contact details and enquiry text with explicit response-consent checkboxes. Add an approved privacy notice, retention policy and verified ILMA contact details before accepting real public submissions.

## Update content
- `dist/index.html`: Home, Features, Contact, navigation, FAQs and contact details.
- `dist/assets/catalogue.js`: all supplied suites, modules, descriptions, capabilities and coming-soon flags.
- `dist/assets/styles.css`: branding, typography, layouts and responsive styles.
- `dist/assets/app.js`: routing, search, filters, role previews, Urdu toggle, drawers, forms and calendar download.
- `dist/assets/admin.js`: invite-only lead inbox and status management.
- `dist/assets/backend.js` and `dist/assets/backend-config.js`: Supabase client and public project settings.

Routes are `#/home`, `#/features`, `#/contact` and `#/admin`. The Urdu switch translates only the strings supplied in the original mockup. Role dashboards, AI scan and available demo times are sample previews. No email or calendar integration is configured, and no real contact information has been invented.
