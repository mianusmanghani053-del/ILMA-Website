# ILMA website

Static website using Netlify Forms for contact enquiries and demo requests. The optional Supabase backend supports a private admin lead inbox.

## Preview
Run `python -m http.server 4173 --directory dist` from this folder, then visit http://localhost:4173.

## Netlify Forms and email notifications (default)
1. In Netlify, enable form detection under Forms if it is disabled, then redeploy `main`. Publish directory: `dist`; no build command is needed.
2. Confirm **ilma-enquiries** appears under Forms after deployment. The static form in `dist/index.html` declares every field sent by the contact and demo flows.
3. In the site's notification settings (Project configuration → Notifications → Emails and webhooks → Form submission notifications, or Forms → Notifications), add an **Email notification** for **New form submission**, select **ilma-enquiries**, and set the recipient to **contact@get-ilma.cloud**.
4. Submit one contact enquiry and one demo request on the live site. Confirm each appears in Netlify Forms and reaches the mailbox (including spam). Browser success means the submission was accepted, not that email delivery was confirmed. Spam submissions may not trigger notifications.

No browser API key or SMTP password is required. Netlify handles storage and notification delivery, subject to the site's plan limits and spam filtering. The local Python server does not implement Netlify Forms POST handling; test actual storage and delivery on the deployed Netlify site. Netlify submissions appear in the Netlify dashboard, not the optional Supabase admin inbox.

## Optional Supabase setup
Set `formProvider: "supabase"` in `dist/assets/backend-config.js` to use the original Supabase submission path instead of Netlify Forms. Supabase does not use Netlify email notifications.

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

The database enables row-level security. Unauthenticated visitors can submit new leads only; only users with the server-controlled `app_metadata.role = admin` claim can view, update status, or delete leads. The admin screen can display the 200 most recent leads. Demo times are saved as preferences and do **not** reserve a real appointment. When the Supabase provider is selected, submissions are stored in Supabase; email notifications need a separate integration. The contact form includes a honeypot, but no CAPTCHA or rate limit has been configured; add abuse protection before wide public promotion.

The lead form collects names, school/contact details and enquiry text with explicit response-consent checkboxes. Add an approved privacy notice, retention policy and verified ILMA contact details before accepting real public submissions.

## Update content
- `dist/index.html`: Home, Features, Contact, navigation, FAQs and contact details.
- `dist/assets/catalogue.js`: all supplied suites, modules, descriptions, capabilities and coming-soon flags.
- `dist/assets/styles.css`: branding, typography, layouts and responsive styles.
- `dist/assets/app.js`: routing, search, filters, role previews, Urdu toggle, drawers, forms and calendar download.
- `dist/assets/admin.js`: invite-only lead inbox and status management.
- `dist/assets/backend.js` and `dist/assets/backend-config.js`: Supabase client and public project settings.

Routes are `#/home`, `#/features`, `#/contact` and `#/admin`. The Urdu switch translates only the strings supplied in the original mockup. Role dashboards, AI scan and available demo times are sample previews. Netlify email notifications require the dashboard configuration described above. Calendar downloads do not reserve appointments.
