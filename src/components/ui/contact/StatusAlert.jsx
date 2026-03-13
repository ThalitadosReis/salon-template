import { CheckCircleIcon, WarningIcon } from "@phosphor-icons/react";

export default function StatusAlert({ type, text }) {
  const isSuccess = type === "success";
  const colorClass = isSuccess
    ? "text-green-600 bg-green-50"
    : "text-red-500 bg-red-50";

  return (
    <div className={`flex items-center gap-2 text-sm font-ui rounded-xl px-4 py-3 ${colorClass}`}>
      {isSuccess ? <CheckCircleIcon size={16} /> : <WarningIcon size={16} />}
      {text}
    </div>
  );
}
