import { ClockIcon } from "@phosphor-icons/react";
import TimeSelectField from "./TimeSelectField";
import { CARD_CLASS } from "./styles";

export default function BookingCalendarPanel({
  monthNames,
  dayNames,
  calYear,
  calMonth,
  today,
  days,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  isPastDay,
  timeLabel,
  selectedTime,
  onTimeChange,
  timeSlots,
}) {
  return (
    <div className="space-y-6">
      <div className={CARD_CLASS}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onPrevMonth}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-500 transition-colors text-sm"
          >
            ‹
          </button>
          <span className="font-display text-xl font-light text-stone-900">
            {monthNames[calMonth]} {calYear}
          </span>
          <button
            onClick={onNextMonth}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-500 transition-colors text-sm"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              className="text-center text-xs tracking-[0.2em] uppercase font-ui text-stone-500 py-1"
            >
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day)
              return <div key={`empty-${index}`} className="aspect-square" />;

            const isPast = isPastDay(day);
            const isSelected = selectedDate === day;
            const isToday =
              day === today.getDate() &&
              calMonth === today.getMonth() &&
              calYear === today.getFullYear();

            return (
              <button
                key={`${calYear}-${calMonth}-${day}`}
                disabled={isPast}
                onClick={() => onSelectDay(day)}
                className={`aspect-square rounded-full text-sm font-ui transition-all duration-200 flex items-center justify-center
                  ${isPast ? "text-stone-300 cursor-not-allowed" : ""}
                  ${isSelected ? "bg-stone-900 text-white" : ""}
                  ${isToday && !isSelected ? "border border-stone-400 text-stone-500" : ""}
                  ${!isSelected && !isPast && !isToday ? "hover:bg-stone-100 text-stone-600" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className={CARD_CLASS}>
        <div className="flex items-center gap-2 mb-5">
          <ClockIcon size={15} className="text-stone-500" />
          <span className="text-xs tracking-[0.2em] uppercase font-ui text-stone-500">
            {timeLabel}
          </span>
        </div>

        <TimeSelectField
          label={timeLabel}
          value={selectedTime}
          onChange={onTimeChange}
          disabled={!selectedDate}
          slots={timeSlots}
          showLabel={false}
        />
      </div>
    </div>
  );
}
