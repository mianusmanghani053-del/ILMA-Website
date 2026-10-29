(() => {
  const config = window.ILMA_BACKEND_CONFIG || {};
  const sdk = window.supabase;
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && sdk && sdk.createClient);
  const client = configured ? sdk.createClient(config.supabaseUrl, config.supabaseAnonKey) : null;
  const provider = config.formProvider || "netlify";

  async function submitLead(lead) {
    if (provider === "netlify") {
      const body = new URLSearchParams({ "form-name": "ilma-enquiries", "bot-field": "" });
      for (const [key, value] of Object.entries(lead)) {
        body.set(key, Array.isArray(value) ? value.join(", ") : value == null ? "" : String(value));
      }
      let response;
      try {
        response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString()
        });
      } catch {
        throw new Error("We could not send your request. Please check your connection and try again.");
      }
      if (!response.ok) throw new Error("We could not send your request. Please try again or email contact@almantiqhub.com.");
      return;
    }
    if (provider !== "supabase" || !client) throw new Error("The backend is not configured yet. Please email contact@almantiqhub.com.");
    const { error } = await client.from("leads").insert(lead);
    if (error) throw new Error("We could not send your request. Please try again or email contact@almantiqhub.com.");
  }

  window.ilmaBackend = { configured, client, submitLead };
})();
