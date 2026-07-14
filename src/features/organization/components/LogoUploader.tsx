import { Camera, Upload } from "lucide-react";
import { useRef } from "react";

interface LogoUploaderProps {
  logo: string;
  disabled?: boolean;
}

const LogoUploader = ({ logo, disabled = false }: LogoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log(file);

    /**
     * Call Upload API here
     *
     * dispatch(uploadOrganizationLogo(file))
     *
     */
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Organization Logo
        </h2>

        <p className="mt-1 text-sm text-slate-500">Upload your company logo.</p>
      </div>

      <div className="flex flex-col items-center p-6">
        <div className="relative">
          {logo ? (
            <img
              src={logo}
              alt="Organization Logo"
              className="h-28 w-28 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-100">
              <Camera size={36} className="text-slate-400" />
            </div>
          )}

          <button
            type="button"
            disabled={disabled}
            onClick={handleClick}
            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow hover:bg-blue-700 disabled:opacity-50"
          >
            <Upload size={16} />
          </button>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={handleClick}
          className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
        >
          Upload Logo
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default LogoUploader;
