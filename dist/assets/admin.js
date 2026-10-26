(() => {
  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const loginPanel = $("#admin-login");
  const loginForm = $("#admin-login-form");
  const loginMessage = $("#admin-auth-message");
  const panel = $("#admin-panel");
  const listMessage = $("#admin-list-message");
  const leadList = $("#admin-leads");
  let client = null;
  let currentUser = null;
  let loading = false;
  let leads = [];

  function isAdmin(user) {
    return user && user.app_metadata && user.app_metadata.role === "admin";
  }

  function renderLead(lead) {
    const demo = lead.kind === "demo";
    const preference = demo && lead.preferred_date
      ? `<div><span>Preferred time (not reserved)</span><b>${escapeHtml(lead.preferred_date)} · ${escapeHtml(lead.preferred_time)}</b></div>`
      : "";
    const modules = lead.selected_modules && lead.selected_modules.length
      ? `<div><span>Modules requested</span><b>${escapeHtml(lead.selected_modules.join(", "))}</b></div>`
      : "";
    const message = lead.message
      ? `<div class="lead-message"><span>Message</span><p>${escapeHtml(lead.message)}</p></div>`
      : "";
    return `<article class="lead-card">
      <div class="lead-head"><div><span class="lead-kind">${demo ? "Demo request" : "Contact enquiry"}</span><h2>${escapeHtml(lead.school)}</h2></div><time datetime="${escapeHtml(lead.submitted_at)}">${escapeHtml(new Date(lead.submitted_at).toLocaleString())}</time></div>
      <div class="lead-details">
       <div><span>Contact</span><b>${escapeHtml(lead.name)} · ${escapeHtml(lead.role)}</b></div>
       <div><span>Email</span><a href="mailto:${encodeURIComponent(lead.email)}">${escapeHtml(lead.email)}</a></div>
       <div><span>Phone</span><a href="tel:${encodeURIComponent(lead.phone)}">${escapeHtml(lead.phone)}</a></div>
       <div><span>School size · city</span><b>${escapeHtml(lead.student_range)}${lead.city ? ` · ${escapeHtml(lead.city)}` : ""}</b></div>
        <div><span>Response consent</span><b>${escapeHtml(new Date(lead.consented_at).toLocaleString())}</b></div>
        ${preference}${modules}${message}
      </div>
      <div class="lead-actions">
       <label>Status <select class="fi2" data-lead-status="${escapeHtml(lead.id)}">
        ${["new", "contacted", "closed"].map((status) => `<option value="${status}" ${lead.status === status ? "selected" : ""}>${status[0].toUpperCase() + status.slice(1)}</option>`).join("")}
       </select></label>
       <button class="btn g" type="button" data-delete-lead="${escapeHtml(lead.id)}">Delete</button>
      </div>
    </article>`;
  }

  function showSignedOut(message) {
    currentUser = null;
    loginPanel.hidden = false;
    panel.hidden = true;
    loginMessage.textContent = message || "";
  }

  async function loadLeads() {
    if (!client || !currentUser || loading) return;
    loading = true;
    listMessage.textContent = "Loading lead records…";
    try {
      const { data, error } = await client.from("leads")
        .select("id,kind,name,role,school,phone,email,student_range,city,message,preferred_date,preferred_time,selected_modules,status,submitted_at,consented_at")
        .order("submitted_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      leads = data || [];
      renderLeads();
      listMessage.textContent = leads.length === 200
        ? "Showing the 200 most recent records."
        : `${leads.length} lead${leads.length === 1 ? "" : "s"} found.`;
    } catch (error) {
      console.error("ILMA admin could not load leads", error);
      listMessage.textContent = "Could not load leads. Check the database setup and your admin access, then refresh.";
    } finally {
      loading = false;
    }
  }

  function renderLeads() {
    const status = $("#admin-status-filter").value;
    const visible = status === "all" ? leads : leads.filter((lead) => lead.status === status);
    leadList.innerHTML = visible.length
      ? visible.map(renderLead).join("")
      : '<div class="empty"><h2>No leads to show</h2><p>New website enquiries will appear here.</p></div>';
  }

  function applySession(user) {
    if (!user) {
      showSignedOut(!window.ilmaBackend || !window.ilmaBackend.configured
        ? "Backend setup is incomplete. Add the Supabase URL and anon key to backend-config.js."
        : "");
      return;
    }
    if (!isAdmin(user)) {
      showSignedOut("This account is not provisioned as an ILMA admin. Ask an existing project owner to grant the admin role.");
      return;
    }
    currentUser = user;
    loginPanel.hidden = true;
    panel.hidden = false;
    $("#admin-identity").textContent = user.email || "ILMA admin";
    void loadLeads();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!client) {
      loginMessage.textContent = "Backend setup is incomplete. Add the Supabase URL and anon key to backend-config.js.";
      return;
    }
    const button = loginForm.querySelector('button[type="submit"]');
    button.disabled = true;
    loginMessage.textContent = "Signing in…";
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: $("#admin-email").value.trim(),
        password: $("#admin-password").value
      });
      if (error) throw error;
      if (!isAdmin(data.user)) {
        await client.auth.signOut();
        showSignedOut("This account is not provisioned as an ILMA admin.");
        return;
      }
      applySession(data.user);
    } catch (error) {
      console.error("ILMA admin sign-in failed", error);
      loginMessage.textContent = "Sign-in failed. Check your credentials and try again.";
    } finally {
      button.disabled = false;
    }
  });

  $("#admin-refresh").addEventListener("click", () => void loadLeads());
  $("#admin-signout").addEventListener("click", async () => {
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("ILMA admin sign-out failed", error);
      listMessage.textContent = "Could not sign out. Please try again.";
      return;
    }
    showSignedOut("You have signed out.");
  });
  $("#admin-status-filter").addEventListener("change", renderLeads);
  leadList.addEventListener("change", async (event) => {
    const select = event.target.closest("[data-lead-status]");
    if (!select || !client) return;
    select.disabled = true;
    const { error } = await client.from("leads").update({ status: select.value }).eq("id", select.dataset.leadStatus);
    if (error) {
      console.error("ILMA admin could not update lead status", error);
      listMessage.textContent = "Could not update lead status. Please refresh and try again.";
      select.disabled = false;
    } else {
      const lead = leads.find((item) => item.id === select.dataset.leadStatus);
      if (lead) lead.status = select.value;
      renderLeads();
      listMessage.textContent = "Lead status updated.";
    }
  });
  leadList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-delete-lead]");
    if (!button || !client || !window.confirm("Delete this lead permanently?")) return;
    button.disabled = true;
    const { error } = await client.from("leads").delete().eq("id", button.dataset.deleteLead);
    if (error) {
      console.error("ILMA admin could not delete lead", error);
      listMessage.textContent = "Could not delete the lead. Please refresh and try again.";
      button.disabled = false;
      return;
    }
    leads = leads.filter((lead) => lead.id !== button.dataset.deleteLead);
    renderLeads();
    listMessage.textContent = "Lead deleted.";
  });

  function updateAdminRoute() {
    if (location.hash.replace("#/", "") !== "admin") return;
    if (!window.ilmaBackend || !window.ilmaBackend.configured) {
      client = null;
      applySession(null);
      return;
    }
    client = window.ilmaBackend.client;
    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("ILMA admin session could not be checked", error);
        showSignedOut("Could not verify your session. Refresh the page and try again.");
        return;
      }
      applySession(data.session && data.session.user);
    });
  }

  window.addEventListener("hashchange", updateAdminRoute);
  if (window.ilmaBackend && window.ilmaBackend.client) {
    window.ilmaBackend.client.auth.onAuthStateChange((_event, session) => {
      if (location.hash.replace("#/", "") === "admin") applySession(session && session.user);
    });
  }
  updateAdminRoute();
})();
