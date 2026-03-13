import { FORM_INPUT_CLASS, FORM_LABEL_CLASS } from "./styles";

export default function IconInputField({ label, type, value, onChange, Icon }) {
  return (
    <div>
      <label className={FORM_LABEL_CLASS}>{label}</label>
      <div className="relative">
        <Icon
          size={14}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={FORM_INPUT_CLASS}
        />
      </div>
    </div>
  );
}
