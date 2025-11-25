export default function Home() {
  return (
    <html>
      <head>
        <title>Tribe</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background: linear-gradient(to bottom, #f8fafc, #ffffff);
            min-height: 100vh;
            padding: 2rem;
          }
          .container {
            max-width: 64rem;
            margin: 0 auto;
            text-align: center;
          }
          h1 {
            font-size: 3.5rem;
            font-weight: bold;
            background: linear-gradient(to right, #9333ea, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.25rem;
            color: #666;
            margin-bottom: 2rem;
          }
          .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 3rem;
          }
          a, button {
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            border: none;
            transition: all 0.2s;
          }
          .btn-primary {
            background: #9333ea;
            color: white;
          }
          .btn-primary:hover {
            background: #7e22ce;
          }
          .btn-secondary {
            border: 1px solid #ddd;
            color: #333;
            background: white;
          }
          .btn-secondary:hover {
            background: #f5f5f5;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }
          .feature {
            padding: 1.5rem;
          }
          .feature h3 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          .feature p {
            color: #666;
            margin: 0;
          }
          footer {
            margin-top: 3rem;
            text-align: center;
            color: #999;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>The Whop Killer Is Here</h1>
          
          <p>
            Keep 98–100% of everything you earn. Beautiful communities, courses, real-time chat, files, events — all in one link.
          </p>

          <div className="buttons">
            <a href="https://tribe.waitlist.so" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Join Waitlist
            </a>
            <button className="btn-secondary">
              Watch Demo
            </button>
          </div>

          <div className="features">
            <div className="feature">
              <h3>You keep almost everything</h3>
              <p>Only 1–2% + processing. Zero marketplace tax.</p>
            </div>
            <div className="feature">
              <h3>Better than Discord</h3>
              <p>Blazing-fast native chat, threads, reactions, mentions, search.</p>
            </div>
            <div className="feature">
              <h3>Everything creators need</h3>
              <p>Courses, files, events, paywalls, trials — one beautiful hub.</p>
            </div>
          </div>

          <footer>
            <p>Made with fire by a broke founder who got sick of 30% fees</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
