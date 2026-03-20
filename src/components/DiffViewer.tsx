import { useMemo } from "react";
import DiffMatchPatch from "diff-match-patch";

interface DiffViewerProps {
  original: string;
  modified: string;
}

type DiffType = [number, string]; // [type, text]

export default function DiffViewer({ original, modified }: DiffViewerProps) {
  const dmp = useMemo(() => new DiffMatchPatch(), []);

  const diffs = useMemo(() => {
    return dmp.diff_main(original, modified) as DiffType[];
  }, [original, modified, dmp]);

  const renderDiff = () => {
    return diffs.map((diff: DiffType, index: number) => {
      const [type, text] = diff;

      if (type === 0) {
        // Unchanged
        return (
          <span key={index} className="text-gray-900">
            {text}
          </span>
        );
      } else if (type === -1) {
        // Deleted
        return (
          <span
            key={index}
            className="bg-red-200 text-red-900 line-through"
            title="Eliminado"
          >
            {text}
          </span>
        );
      } else if (type === 1) {
        // Added
        return (
          <span
            key={index}
            className="bg-green-200 text-green-900 font-semibold"
            title="Agregado"
          >
            {text}
          </span>
        );
      }
    });
  };

  const changeStats = useMemo(() => {
    let added = 0;
    let deleted = 0;

    diffs.forEach(([type, text]: DiffType) => {
      if (type === 1) added += text.length;
      if (type === -1) deleted += text.length;
    });

    return { added, deleted };
  }, [diffs]);

  return (
    <div className="space-y-6">
      {/* Change Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-sm text-red-700 font-medium">Eliminado</p>
          <p className="text-3xl font-bold text-red-600">
            {changeStats.deleted}
          </p>
          <p className="text-xs text-red-600 mt-1">caracteres</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-sm text-green-700 font-medium">Agregado</p>
          <p className="text-3xl font-bold text-green-600">
            {changeStats.added}
          </p>
          <p className="text-xs text-green-600 mt-1">caracteres</p>
        </div>
      </div>

      {/* Diff Display */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
          {renderDiff()}
        </pre>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="bg-red-200 text-red-900 px-3 py-1 rounded">
            Removido
          </span>
          <span className="text-gray-600">Texto eliminado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-200 text-green-900 px-3 py-1 rounded">
            Agregado
          </span>
          <span className="text-gray-600">Texto nuevo</span>
        </div>
      </div>
    </div>
  );
}
