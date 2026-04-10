import {
  CaretLeftIcon,
  CaretRightIcon,
  ClockIcon,
} from "@phosphor-icons/react";
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
    <div className="space-y-3">
      {/* calendar */}
      <div className={CARD_CLASS}>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="text-stone-500 hover:text-stone-800 transition-colors"
          >
            <CaretLeftIcon size={14} />
          </button>
          <span className="font-display text-lg font-medium text-stone-800">
            {monthNames[calMonth]} {calYear}
          </span>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="text-stone-500 hover:text-stone-800 transition-colors"
          >
            <CaretRightIcon size={14} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((d) => (
            <div
              key={d}
              className="text-center text-xs tracking-[0.15em] uppercase font-body font-medium text-stone-500 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
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
                aria-label={`${day} ${monthNames[calMonth]} ${calYear}${isToday ? " (today)" : ""}${isSelected ? " (selected)" : ""}`}
                aria-pressed={isSelected}
                className={`
                  aspect-square text-sm font-body transition-all duration-200 flex items-center justify-center
                  ${isPast ? "text-stone-300 cursor-not-allowed" : ""}
                  ${isSelected ? "bg-stone-400 text-white" : ""}
                  ${isToday && !isSelected ? "border border-stone-300 text-stone-500" : ""}
                  ${!isSelected && !isPast && !isToday ? "hover:bg-stone-200 text-stone-600" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* time picker */}
      <div className={CARD_CLASS}>
        <div className="flex items-center gap-2 mb-3">
          <ClockIcon size={14} className="text-stone-400" />
          <span className="text-xs tracking-[0.4em] uppercase font-body font-medium text-stone-600">
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
