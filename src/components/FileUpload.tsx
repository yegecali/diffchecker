import React, { useRef } from "react";
import Modal from "./Modal";

interface FileUploadProps {
  onFileLoad: (content: string, label: "original" | "modified") => void;
  label: "original" | "modified";
  placeholder: string;
}

const ALLOWED_FORMATS = [
  { ext: ".txt", type: "text/plain", label: "Texto plano" },
  { ext: ".md", type: "text/markdown", label: "Markdown" },
  { ext: ".json", type: "application/json", label: "JSON" },
  { ext: ".csv", type: "text/csv", label: "CSV" },
  { ext: ".xml", type: "application/xml", label: "XML" },
  { ext: ".html", type: "text/html", label: "HTML" },
  { ext: ".css", type: "text/css", label: "CSS" },
  { ext: ".js", type: "text/javascript", label: "JavaScript" },
  { ext: ".ts", type: "text/typescript", label: "TypeScript" },
  { ext: ".py", type: "text/x-python", label: "Python" },
  { ext: ".java", type: "text/x-java", label: "Java" },
  { ext: ".sql", type: "text/x-sql", label: "SQL" },
  { ext: ".sh", type: "text/x-shellscript", label: "Shell Script" },
  { ext: ".yaml", type: "text/yaml", label: "YAML" },
  { ext: ".yml", type: "text/yaml", label: "YAML" },
];

export default function FileUpload({
  onFileLoad,
  label,
  placeholder,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileLoad(content, label);
    };
    reader.readAsText(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const acceptFormats = ALLOWED_FORMATS.map((f) => f.type).join(",");

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        accept={acceptFormats}
        className="hidden"
      />

      <div className="flex gap-2 items-stretch">
        <button
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex-1 p-4 border-2 border-dashed rounded-lg transition font-medium text-sm ${
            isDragOver
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
          }`}
        >
          📁 {placeholder}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm"
          title="Ver formatos permitidos"
        >
          ℹ️
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Formatos de Archivo Permitidos"
      >
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            Puedes cargar archivos en los siguientes formatos:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {ALLOWED_FORMATS.map((format) => (
              <div
                key={format.ext}
                className="p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">{format.ext}</span>
                  <span className="text-gray-600">({format.label})</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            💡 También puedes hacer drag & drop de archivos directamente en el
            área de carga.
          </p>
        </div>
      </Modal>
    </div>
  );
}
