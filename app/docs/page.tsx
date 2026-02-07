"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// WAJIB: Import CSS bawaan swagger agar tidak berantakan
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <LoadingState />,
});

export default function DocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs")
      .then((res) => res.json())
      .then(setSpec)
      .catch(console.error);
  }, []);

  if (!spec) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header Sederhana */}
      <header className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900">API Reference</h1>
          <p className="text-slate-500 mt-1">Documentation and interactive explorer for our API.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden custom-swagger-container">
          <SwaggerUI spec={spec} deepLinking={true} />
        </div>
      </main>

      {/* Custom Styling untuk override Swagger yang kaku */}
      <style jsx global>{`
        .custom-swagger-container .swagger-ui {
          font-family: inherit;
        }
        .swagger-ui .topbar {
          display: none;
        } /* Sembunyikan topbar bawaan yang jadul */
        .swagger-ui .info {
          margin: 30px 0;
        }
        .swagger-ui .scheme-container {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-slate-600 font-medium animate-pulse">Preparing Documentation...</p>
    </div>
  );
}
