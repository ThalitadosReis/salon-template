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
  const start = startHour * 60;
  const end = endHour * 60;

  for (let minute = start; minute <= end; minute += intervalMinutes) {
    const hours = String(Math.floor(minute / 60)).padStart(2, "0");
    const mins = String(minute % 60).padStart(2, "0");
    slots.push(`${hours}:${mins}`);
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

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [mobileDate, setMobileDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("");

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

  function setFormField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function prevMonth() {
    if (calMonth === 0) {
      setCalYear((year) => year - 1);
      setCalMonth(11);
      return;
    }

    setCalMonth((month) => month - 1);
  }

  function nextMonth() {
    if (calMonth === 11) {
      setCalYear((year) => year + 1);
      setCalMonth(0);
      return;
    }

    setCalMonth((month) => month + 1);
  }

  function isPastDay(day) {
    if (!day) return true;

    const comparedDate = new Date(calYear, calMonth, day);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return comparedDate < startOfToday;
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

  return (
    <main className="bg-stone-50 min-h-screen pt-20">
      <section className="relative py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase font-ui text-stone-500 mb-4">
              Reservation
            </p>
            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-light text-stone-900 whitespace-pre-line mb-6">
              {f.hero}
            </h1>
            <p className="text-[15px] lg:text-base font-ui font-light text-stone-600">
              {f.sub}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <Reveal direction="right" className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-[0_4px_40px_rgb(44_37_32/6%)] space-y-5">
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
                    <label className={FORM_LABEL_CLASS}>{f.form.service}</label>
                    <select
                      value={form.service}
                      onChange={(e) => setFormField("service", e.target.value)}
                      className={FORM_SELECT_CLASS}
                    >
                      <option value="">-</option>
                      {allServices.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-5 lg:hidden">
                    <div>
                      <label className={FORM_LABEL_CLASS}>{f.form.date}</label>
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
                    <label className={FORM_LABEL_CLASS}>{f.form.message}</label>
                    <div className="relative">
                      <ChatTextIcon
                        size={14}
                        className="absolute left-4 top-3.5 text-stone-500"
                      />
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setFormField("message", e.target.value)
                        }
                        className={FORM_TEXTAREA_CLASS}
                      />
                    </div>
                  </div>

                  {(selectedDate || selectedTime) && (
                    <div className="hidden lg:flex md:col-span-2 bg-stone-100 rounded-2xl px-5 py-4 items-center gap-3">
                      <CalendarBlankIcon size={16} className="text-stone-500" />
                      <div className="text-sm font-ui text-stone-600">
                        {selectedDate && (
                          <span>{`${selectedDate} ${monthNames[calMonth]} ${calYear}`}</span>
                        )}
                        {selectedDate && selectedTime && (
                          <span className="mx-2">·</span>
                        )}
                        {selectedTime && <span>{selectedTime}</span>}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={PRIMARY_BUTTON_CLASS}
                  >
                    {status === "loading" ? (
                      <>
                        {f.form.sending}
                        <CircleNotchIcon size={14} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        {f.form.send}
                        <ArrowRightIcon size={14} />
                      </>
                    )}
                  </button>
                </div>

                {status === "success" && (
                  <StatusAlert type="success" text={f.form.success} />
                )}
                {status === "error" && (
                  <StatusAlert type="error" text={f.form.error} />
                )}
              </div>
            </Reveal>

            <Reveal
              direction="left"
              delay={0.1}
              className="hidden lg:block lg:col-span-1"
            >
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
