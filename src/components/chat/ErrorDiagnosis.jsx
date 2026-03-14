import { AlertTriangle } from 'lucide-react';

export default function ErrorDiagnosis({ error }) {
  return (
    <div className="bg-red/10 border border-red/30 rounded-xl p-3 text-xs">
      <div className="flex items-center gap-2 mb-1.5">
        <AlertTriangle size={14} className="text-red" />
        <span className="font-medium text-red">{error.emoji} {error.cause}</span>
      </div>
      <p className="text-text-secondary mb-2">{error.explain}</p>
      <ul className="space-y-0.5 text-text-muted">
        {error.solutions.slice(0, 3).map((s, i) => (
          <li key={i}>• {s}</li>
        ))}
      </ul>
    </div>
  );
}
