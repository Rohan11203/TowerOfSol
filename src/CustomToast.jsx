import { X } from "lucide-react";


const CustomToast = ({ message, onClose, color = "bg-purple-700/95" }) => (
  <div className={`${color} text-white px-4 py-3 rounded-2xl shadow-xl border border-purple-400/20 flex items-center gap-4 max-w-md mx-auto animate-fade-in`}>
    <span className="flex-1 text-center font-semibold">{message}</span>
    {onClose && (
      <button className="ml-2 text-white hover:text-pink-300 opacity-80" onClick={onClose} aria-label="Dismiss">
        <X size={20} />
      </button>
    )}
  </div>
);

export default CustomToast;
