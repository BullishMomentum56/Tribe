export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f8fafc, #ffffff)", padding: "2rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", background: "linear-gradient(to right, #9333ea, #ec4899)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>
          The Whop Killer Is Here
        </h1>
        
        <p style={{ fontSize: "1.25rem", color: "#666", marginBottom: "2rem" }}>
          Keep 98–100% of everything you earn. Beautiful communities, courses, real-time chat, files, events — all in one link.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a href="https://tribe.waitlist.so" target="_blank" rel="noopener noreferrer" style={{ 
            background: "#9333ea", 
            color: "white", 
            padding: "0.75rem 2rem", 
            borderRadius: "0.5rem", 
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Join Waitlist
          </a>
          <button style={{ 
            border: "1px solid #ddd", 
            color: "#333", 
            padding: "0.75rem 2rem", 
            borderRadius: "0.5rem", 
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            background: "white"
          }}>
            Watch Demo
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>You keep almost everything</h3>
            <p style={{ color: "#666" }}>Only 1–2% + processing. Zero marketplace tax.</p>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Better than Discord</h3>
            <p style={{ color: "#666" }}>Blazing-fast native chat, threads, reactions, mentions, search.</p>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Everything creators need</h3>
            <p style={{ color: "#666" }}>Courses, files, events, paywalls, trials — one beautiful hub.</p>
          </div>
        </div>

        <footer style={{ marginTop: "3rem", textAlign: "center", color: "#999" }}>
          <p>Made with fire by a broke founder who got sick of 30% fees</p>
        </footer>
      </div>
    </div>
  );
}
