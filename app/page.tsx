import Link from "next/link";

const endpoints = [
  {
    method: "GET",
    path: "/api/users",
    description: "Get all users (paginated)",
  },
  {
    method: "POST",
    path: "/api/users",
    description: "Create a new user",
  },
  {
    method: "GET",
    path: "/api/users/:id",
    description: "Get user by ID with posts",
  },
  {
    method: "GET",
    path: "/api/users/with-posts",
    description: "Get all users with their posts",
  },
  {
    method: "GET",
    path: "/api/users/:id/posts",
    description: "Get all posts by a user",
  },
  {
    method: "GET",
    path: "/api/posts",
    description: "Get all posts (paginated, filterable)",
  },
  {
    method: "POST",
    path: "/api/posts",
    description: "Create a new post",
  },
  {
    method: "GET",
    path: "/api/posts/:id",
    description: "Get post by ID",
  },
  {
    method: "GET",
    path: "/api/posts/slug/:slug",
    description: "Get post by slug",
  },
  {
    method: "GET",
    path: "/api/posts/search?q=",
    description: "Search posts by keyword",
  },
  {
    method: "GET",
    path: "/api/posts/tags",
    description: "Get all tags with counts",
  },
  {
    method: "GET",
    path: "/api/stats",
    description: "Dashboard statistics",
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-100 text-emerald-700",
    POST: "bg-blue-100 text-blue-700",
    PUT: "bg-amber-100 text-amber-700",
    DELETE: "bg-red-100 text-red-700",
  };
  return <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold tracking-wide ${colors[method] || "bg-gray-100 text-gray-700"}`}>{method}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Server is running
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Backend Dimas API</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">REST API built with Next.js, Prisma ORM &amp; Supabase PostgreSQL. Explore the full interactive documentation below.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              Swagger Docs
            </Link>
            <a href="/api/stats" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
              API Stats
            </a>
          </div>
        </div>
      </header>

      {/* Endpoints */}
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900">Available Endpoints</h2>
        <p className="mt-1 text-sm text-slate-500">
          Quick overview of all API routes. See{" "}
          <Link href="/docs" className="font-medium text-blue-600 hover:underline">
            /docs
          </Link>{" "}
          for full interactive documentation.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 font-semibold text-slate-600">Method</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Endpoint</th>
                <th className="hidden px-5 py-3 font-semibold text-slate-600 sm:table-cell">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {endpoints.map((ep, i) => (
                <tr key={i} className="transition hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <MethodBadge method={ep.method} />
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-800">{ep.path}</td>
                  <td className="hidden px-5 py-3 text-slate-500 sm:table-cell">{ep.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tech stack */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Next.js 15",
              desc: "App Router & API Routes",
              icon: "◆",
            },
            {
              title: "Prisma ORM",
              desc: "Type-safe database access",
              icon: "△",
            },
            {
              title: "Supabase",
              desc: "PostgreSQL database hosting",
              icon: "⬡",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400">Backend Adib x Dimas API &mdash; {new Date().getFullYear()}</footer>
    </div>
  );
}
