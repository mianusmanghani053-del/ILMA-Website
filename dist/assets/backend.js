(() => {
  const config = window.ILMA_BACKEND_CONFIG || {};
  const sdk = window.supabase;
  const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey && sdk && sdk.createClient);
  const client = configured ? sdk.createClient(config.supabaseUrl, config.supabaseAnonKey) : null;

  async function submitLead(lead) {
    if (!client) throw new Error("The backend is not configured yet. Please try again later.");
    const { error } = await client.from("leads").insert(lead);
    if (error) {
      console.error("ILMA lead submission failed", error);
      throw new Error("We could not send your request. Please try again in a moment.");
    }
  }

  window.ilmaBackend = { configured, client, submitLead };
})();
