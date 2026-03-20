import { useState, useEffect } from "react";
import DiffMatchPatch from "diff-match-patch";
import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  // Agregar schema JSON-LD para SEO
  useEffect(() => {
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Diff Checker",
      description: "Comparador de textos online gratuito",
      url: "https://diffchecker.yegecali.com",
      applicationCategory: "UtilityApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
    document.head.appendChild(schemaScript);
    return () => {
      document.head.removeChild(schemaScript);
    };
  }, []);
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [diffs, setDiffs] = useState<[number, string][]>([]);

  const dmp = new DiffMatchPatch();

  const handleCompare = () => {
    if (originalText || modifiedText) {
      const diffResult = dmp.diff_main(originalText, modifiedText);
      setDiffs(diffResult);
    }
  };

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
    setDiffs([]);
  };

  const getOriginalDiff = () => {
    return diffs
      .filter(([type]) => type !== 1)
      .map(([type, text]) => ({ type, text }));
  };

  const getModifiedDiff = () => {
    return diffs
      .filter(([type]) => type !== -1)
      .map(([type, text]) => ({ type, text }));
  };

  const renderDiffText = (diffParts: { type: number; text: string }[]) => {
    return diffParts.map((part, index) => {
      const { type, text } = part;

      if (type === 0) {
        return (
          <span key={index} className="text-gray-900">
            {text}
          </span>
        );
      } else if (type === -1) {
        return (
          <span
            key={index}
            className="bg-red-300 text-red-900"
            title="Eliminado"
          >
            {text}
          </span>
        );
      } else if (type === 1) {
        return (
          <span
            key={index}
            className="bg-green-300 text-green-900"
            title="Agregado"
          >
            {text}
          </span>
        );
      }
    });
  };

  const hasDiffs = diffs.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Diff Checker</h1>
          <p className="text-gray-400">
            Compara dos textos y visualiza las diferencias lado a lado de forma
            instantánea
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6 mb-8 min-h-96">
          {/* Original Text Column */}
          <div className="flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Texto Original
            </h2>
            <FileUpload
              onFileLoad={(content) => setOriginalText(content)}
              label="original"
              placeholder="Cliga para cargar archivo o arrastra aquí"
            />
            <div className="mt-4 mb-3 text-sm text-gray-600 font-medium">
              O pegar contenido:
            </div>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Pega el texto original aquí..."
              className="flex-1 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none font-mono text-sm"
            />
            <div className="mt-2 text-sm text-gray-600">
              {originalText.length} caracteres
            </div>
          </div>

          {/* Modified Text Column */}
          <div className="flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Texto Modificado
            </h2>
            <FileUpload
              onFileLoad={(content) => setModifiedText(content)}
              label="modified"
              placeholder="Cliga para cargar archivo o arrastra aquí"
            />
            <div className="mt-4 mb-3 text-sm text-gray-600 font-medium">
              O pegar contenido:
            </div>
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Pega el texto modificado aquí..."
              className="flex-1 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none font-mono text-sm"
            />
            <div className="mt-2 text-sm text-gray-600">
              {modifiedText.length} caracteres
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handleCompare}
            disabled={!originalText && !modifiedText}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-lg"
          >
            Comparar
          </button>
          <button
            onClick={handleClear}
            disabled={!originalText && !modifiedText && !hasDiffs}
            className="px-8 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-lg"
          >
            Limpiar
          </button>
        </div>

        {/* Diff Results */}
        {hasDiffs && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resultado de la Comparación
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Original with diff highlights */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Original
                </h3>
                <div className="flex-1 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 overflow-auto">
                  <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {renderDiffText(getOriginalDiff())}
                  </pre>
                </div>
              </div>

              {/* Modified with diff highlights */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Modificado
                </h3>
                <div className="flex-1 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 overflow-auto">
                  <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {renderDiffText(getModifiedDiff())}
                  </pre>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-red-300 text-red-900 px-3 py-1 rounded">
                  Eliminado
                </span>
                <span className="text-gray-600">Texto que fue removido</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-300 text-green-900 px-3 py-1 rounded">
                  Agregado
                </span>
                <span className="text-gray-600">Texto que se agregó</span>
              </div>
            </div>
          </>
        )}

        {/* Footer / SEO Content */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                ¿Qué es Diff Checker?
              </h2>
              <p className="text-gray-600 mb-3">
                Diff Checker es una herramienta online gratuita que te permite
                comparar dos textos y visualizar las diferencias de forma clara
                y sencilla. Perfecta para desarrolladores, escritores y
                cualquier persona que necesite identificar cambios entre
                documentos.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Características principales
              </h2>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Comparación lado a lado de textos</li>
                <li>✓ Resaltado de diferencias en color</li>
                <li>✓ Interfaz simple e intuitiva</li>
                <li>✓ 100% gratis y sin registro</li>
                <li>✓ Funciona en cualquier navegador</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-200 pt-4">
            <p>&copy; 2026 Diff Checker. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900">
                Privacidad
              </a>
              <a href="#" className="hover:text-gray-900">
                Términos
              </a>
              <a href="#" className="hover:text-gray-900">
                Contacto
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
