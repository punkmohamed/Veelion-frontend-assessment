import Link from "next/link";
import { Activity, BarChart3, LayoutList } from "lucide-react";

export default function HomePage() {
  return (
    <main className="page-main">
      <header className="stack" style={{ marginBottom: "1.75rem" }}>
        <h1 className="page-title" style={{ fontSize: "2rem" }}>
          VeeLion Frontend Assessment
        </h1>
        <p className="page-lead muted-text" style={{ maxWidth: "36rem" }}>
          Task dashboard, activity feed, and summary reports wired to the assessment backend.
        </p>
      </header>

      <section className="home-grid">
        <Link href="/tasks" className="card home-card">
          <div className="home-card-header">
            <span className="home-card-icon" aria-hidden>
              <LayoutList size={22} strokeWidth={1.85} />
            </span>
            <div>
              <h2>Task dashboard</h2>
              <p>Filter, review, and toggle completion on live tasks.</p>
            </div>
          </div>
        </Link>

        <Link href="/activity" className="card home-card">
          <div className="home-card-header">
            <span className="home-card-icon" aria-hidden>
              <Activity size={22} strokeWidth={1.85} />
            </span>
            <div>
              <h2>Activity feed</h2>
              <p>Searchable timeline of actions and context from the API.</p>
            </div>
          </div>
        </Link>

        <Link href="/reports" className="card home-card">
          <div className="home-card-header">
            <span className="home-card-icon" aria-hidden>
              <BarChart3 size={22} strokeWidth={1.85} />
            </span>
            <div>
              <h2>Tasks summary</h2>
              <p>Charts and KPIs from the aggregated tasks summary endpoint.</p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
