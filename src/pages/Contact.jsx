import { useState } from "react";
import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ChatTextIcon,
  CircleNotchIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import Label from "../components/ui/Label";
import IconInputField from "../components/ui/contact/IconInputField";
import TimeSelectField from "../components/ui/contact/TimeSelectField";
import StatusAlert from "../components/ui/contact/StatusAlert";
import BookingCalendarPanel from "../components/ui/contact/BookingCalendarPanel";
import {
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
  PRIMARY_BUTTON_CLASS,
} from "../components/ui/contact/styles";
import { useLang } from "../i18n/LangContext";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function generateTimeSlots(startHour, endHour, intervalMinutes = 30) {
  const slots = [];
  for (
    let minute = startHour * 60;
    minute <= endHour * 60;
    minute += intervalMinutes
  ) {
    const h = String(Math.floor(minute / 60)).padStart(2, "0");
    const m = String(minute % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  const days = [];
  for (let i = 0; i < offset; i += 1) days.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) days.push(day);
  return days;
}

function toIsoDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const TIME_SLOTS = generateTimeSlots(9, 18, 30);

export default function Contact() {
  const { t } = useLang();
  const f = t.contactPage;

  // ── calendar state ──
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null); // desktop calendar day
  const [mobileDate, setMobileDate] = useState(""); // mobile date input string

  // ── booking state ──
  const [selectedTime, setSelectedTime] = useState("");

  // ── form state ──
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(""); // "" | "loading" | "success" | "error"

  // ── derived values ──
  const days = getCalendarDays(calYear, calMonth);
  const monthNames = f.calendar.months;
  const dayNames = f.calendar.days;
  const allServices = t.services.categories.flatMap((category) =>
    category.items.map((item) => item.name),
  );
  const desktopDateStr = selectedDate
    ? toIsoDate(calYear, calMonth, selectedDate)
    : null;
  const selectedDateStr = mobileDate || desktopDateStr;
  const canSubmit = Boolean(
    form.name &&
    form.email &&
    selectedDateStr &&
    selectedTime &&
    status !== "loading",
  );

  // ── form handlers ──
  function setFormField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    setStatus("loading");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: selectedDateStr,
          time: selectedTime,
        }),
      });

      setStatus("success");
      setForm(INITIAL_FORM);
      setSelectedDate(null);
      setMobileDate("");
      setSelectedTime("");
    } catch {
      setStatus("error");
    }
  }

  // ── calendar handlers ──
  function prevMonth() {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else setCalMonth((m) => m - 1);
  }

  function nextMonth() {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else setCalMonth((m) => m + 1);
  }

  function isPastDay(day) {
    if (!day) return true;
    const date = new Date(calYear, calMonth, day);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    return date < startOfToday;
  }

  function onDesktopDaySelect(day) {
    if (isPastDay(day)) return;
    setSelectedDate(day);
    setMobileDate("");
    setSelectedTime("");
  }

  function onMobileDateChange(value) {
    setMobileDate(value);
    setSelectedDate(null);
    setSelectedTime("");
  }

  return (
    <main className="bg-stone-100 min-h-screen">
      <section className="bg-stone-200 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <Label
              as="h1"
              label={f.reservationLabel}
              title={f.hero}
              body={f.sub}
              titleSize="lg"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* form */}
            <Reveal direction="up" className="lg:col-span-2">
              <div className="bg-stone-50 border border-stone-200">
                <div className="p-8 lg:p-10">
                  <h2 className="font-display font-light text-3xl text-stone-800 mb-8">
                    {f.detailsHeading}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <IconInputField
                        label={f.form.name}
                        type="text"
                        value={form.name}
                        onChange={(value) => setFormField("name", value)}
                        Icon={UserIcon}
                      />
                    </div>

                    <IconInputField
                      label={f.form.email}
                      type="email"
                      value={form.email}
                      onChange={(value) => setFormField("email", value)}
                      Icon={EnvelopeIcon}
                    />
                    <IconInputField
                      label={f.form.phone}
                      type="tel"
                      value={form.phone}
                      onChange={(value) => setFormField("phone", value)}
                      Icon={PhoneIcon}
                    />

                    <div className="md:col-span-2">
                      <label className={FORM_LABEL_CLASS}>
                        {f.form.service}
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) =>
                          setFormField("service", e.target.value)
                        }
                        className={FORM_SELECT_CLASS}
                      >
                        <option value="">—</option>
                        {allServices.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* mobile: date + time */}
                    <div className="md:col-span-2 grid sm:grid-cols-2 gap-5 lg:hidden">
                      <div>
                        <label className={FORM_LABEL_CLASS}>
                          {f.form.date}
                        </label>
                        <input
                          type="date"
                          value={mobileDate}
                          onChange={(e) => onMobileDateChange(e.target.value)}
                          className={FORM_SELECT_CLASS}
                        />
                      </div>
                      <TimeSelectField
                        label={f.form.time}
                        value={selectedTime}
                        onChange={setSelectedTime}
                        disabled={!mobileDate}
                        slots={TIME_SLOTS}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={FORM_LABEL_CLASS}>
                        {f.form.message}
                      </label>
                      <div className="relative">
                        <ChatTextIcon
                          size={14}
                          className="absolute left-4 top-3.5 text-stone-400"
                        />
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) =>
                            setFormField("message", e.target.value)
                          }
                          className={FORM_TEXTAREA_CLASS}
                        />
                      </div>
                    </div>

                    {/* booking summary */}
                    {(selectedDate || selectedTime) && (
                      <div className="hidden lg:flex md:col-span-2 bg-stone-200 border border-stone-200 px-5 py-3.5 items-center gap-3">
                        <CalendarBlankIcon
                          size={13}
                          className="text-stone-400 shrink-0"
                        />
                        <p className="text-xs font-body font-medium text-stone-500">
                          {selectedDate &&
                            `${selectedDate} ${monthNames[calMonth]} ${calYear}`}
                          {selectedDate && selectedTime && (
                            <span className="mx-2 text-stone-400">·</span>
                          )}
                          {selectedTime}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className={PRIMARY_BUTTON_CLASS}
                    >
                      {status === "loading" ? (
                        <>
                          {f.form.sending}{" "}
                          <CircleNotchIcon size={13} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          {f.form.send} <ArrowRightIcon size={13} />
                        </>
                      )}
                    </button>
                  </div>

                  {status === "success" && (
                    <div className="mt-5">
                      <StatusAlert type="success" text={f.form.success} />
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mt-5">
                      <StatusAlert type="error" text={f.form.error} />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {/* calendar */}
            <Reveal direction="up" delay={0.1} className="hidden lg:block">
              <BookingCalendarPanel
                monthNames={monthNames}
                dayNames={dayNames}
                calYear={calYear}
                calMonth={calMonth}
                today={today}
                days={days}
                selectedDate={selectedDate}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onSelectDay={onDesktopDaySelect}
                isPastDay={isPastDay}
                timeLabel={f.form.time}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
                timeSlots={TIME_SLOTS}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
