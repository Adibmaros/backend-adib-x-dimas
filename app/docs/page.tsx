"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <LoadingState />,
});

export default function DocsPage() {
  const [spec, setSpec] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/docs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSpec(data);
      } catch (err) {
        console.error("Swagger Load Error:", err);
        setError(true);
      }
    };
    fetchDocs();
  }, []);

  if (error) return <ErrorState />;
  if (!spec) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header Modern */}
      <header className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">API Documentation</h1>
          <p className="text-slate-500 mt-2 text-lg">Backend Adib x Dimas Reference Explorer.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden custom-swagger">
          <SwaggerUI spec={spec} deepLinking={true} />
        </div>
      </main>

      {/* Override Swagger Style via Global CSS */}
      <style jsx global>{`
        .custom-swagger .swagger-ui {
          padding-bottom: 50px;
        }
        .custom-swagger .swagger-ui .topbar {
          display: none;
        }
        .custom-swagger .swagger-ui .info {
          margin: 40px 0;
          padding: 0 20px;
        }
        .custom-swagger .swagger-ui .scheme-container {
          background: transparent;
          box-shadow: none;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }
        .custom-swagger .swagger-ui .opblock-tag-section {
          padding: 0 20px;
        }
      `}</style>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Loading API Spec...</p>
    </div>
  );
}

function ErrorState() {
  return <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">Failed to load documentation. Please check your API route.</div>;
}
