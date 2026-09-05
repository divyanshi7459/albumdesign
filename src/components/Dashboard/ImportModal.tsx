import React, { useState } from "react";
import { X, Upload, FileCode, CheckCircle2, AlertCircle } from "lucide-react";
import { useAlbumStore } from "../../store/useAlbumStore";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: (id: string) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImported }) => {
  const { importProjectJSON } = useAlbumStore();
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      setError(null);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!jsonText.trim()) {
      setError("Please paste or upload a valid project JSON file.");
      return;
    }
    const newId = importProjectJSON(jsonText);
    if (newId) {
      onImported(newId);
    } else {
      setError("Failed to parse JSON. Please ensure it is a valid Album Design Studio project export.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#141620] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative text-left">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-white">
              Import Album Project
            </h2>
            <p className="text-zinc-400 text-xs">
              Load an existing .ads.json project backup or Photoshop layout file
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/10 hover:border-amber-400/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#0b0c11]">
            <input
              type="file"
              accept=".json,.ads.json,application/json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-import-input"
            />
            <label htmlFor="file-import-input" className="cursor-pointer block space-y-2">
              <FileCode className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-white">
                Click to upload .ads.json file
              </div>
              <div className="text-[10px] text-zinc-400">
                Or drag and drop project export file here
              </div>
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Or Paste Raw JSON</label>
            <textarea
              rows={5}
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setError(null);
              }}
              placeholder='{"name": "Aarav & Ananya Album", "spreads": [...] }'
              className="w-full px-3 py-2 rounded-xl bg-[#0b0c11] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            Import Project
          </button>
        </div>
      </div>
    </div>
  );
};
