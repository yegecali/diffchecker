interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  return (
    <div className="flex flex-col h-full">
      <label className="text-lg font-semibold text-gray-900 mb-3">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none font-mono text-sm"
      />
      <div className="mt-2 text-sm text-gray-600">
        {value.length} caracteres · {value.split("\n").length} líneas
      </div>
    </div>
  );
}
