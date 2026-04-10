import { CheckCircleIcon, WarningIcon } from "@phosphor-icons/react";

export default function StatusAlert({ type, text }) {
  const isSuccess = type === "success";
  return (
    <div className={`flex items-center gap-2.5 text-xs font-body px-4 py-3 border ${
      isSuccess
        ? "text-stone-600 bg-stone-200 border-stone-300"
        : "text-red-600 bg-red-50 border-red-100"
    }`}>
      {isSuccess ? <CheckCircleIcon size={14} /> : <WarningIcon size={14} />}
      {text}
    </div>
  );
}
