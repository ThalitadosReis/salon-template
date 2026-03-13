import { FORM_LABEL_CLASS, FORM_SELECT_CLASS } from "./styles";

export default function TimeSelectField({
  label,
  value,
  onChange,
  disabled,
  slots,
  showLabel = true,
}) {
  return (
    <div>
      {showLabel && <label className={FORM_LABEL_CLASS}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${FORM_SELECT_CLASS} ${disabled ? "text-stone-300 cursor-not-allowed" : ""}`}
      >
        <option value="">
          {disabled ? "Select a date first" : "Select a time"}
        </option>
        {slots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
}
