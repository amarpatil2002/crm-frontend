import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, UploadCloud, Loader2 } from "lucide-react";

interface LogoUploaderProps {
  logo?: string | null;
  loading?: boolean;
  onFileSelect: (file: File | null) => void;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function LogoUploader({
  logo,
  loading = false,
  onFileSelect,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState("");

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setPreview(logo || "");
  }, [logo]);

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image size should be less than 2 MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragging(false);

    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Organization Logo
        </h2>

        <p className="mt-1 text-sm text-slate-500">Upload your company logo.</p>
      </div>

      {/* Body */}

      <div className="p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition

          ${dragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300"}`}
        >
          {/* Preview */}

          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="Organization Logo"
                className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-slate-100">
                <Camera className="h-12 w-12 text-slate-400" />
              </div>
            )}

            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview("");

                  onFileSelect(null);
                }}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />

          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="h-5 w-5" />

                {preview ? "Change Logo" : "Upload Logo"}
              </>
            )}
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Drag & Drop your logo here
          </p>

          <p className="text-xs text-slate-400">PNG • JPG • WEBP • Max 2 MB</p>
        </div>
      </div>
    </section>
  );
}
