import React, { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  value,
  onChange,
  required = false,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handleDateClick = (day: number) => {
    const { year, month } = getDaysInMonth(currentMonth);
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const event = {
      target: { name, value: formattedDate },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
    setShowCalendar(false);
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + increment,
        1,
      ),
    );
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(currentMonth);
    const days = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          className={`
            p-2 rounded-lg text-sm font-medium transition-all duration-200
            hover:bg-career-darkGreen hover:text-white
            ${
              isSelected
                ? "bg-career-darkGreen text-white shadow-md"
                : isToday
                  ? "bg-career-lightGray text-career-darkGreen border-2 border-career-mediumGreen"
                  : "text-gray-700 hover:scale-105"
            }
          `}
        >
          {day}
        </button>,
      );
    }

    return (
      <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-career-lightGray/50 p-4 z-50 w-80 animate-fade-in">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg hover:bg-career-lightGray transition-colors"
          >
            <svg
              className="w-5 h-5 text-career-darkGreen"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-career-darkGreen">
            {monthNames[month]} {year}
          </h3>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg hover:bg-career-lightGray transition-colors"
          >
            <svg
              className="w-5 h-5 text-career-darkGreen"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">{days}</div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
              const event = {
                target: { name, value: today },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
              setShowCalendar(false);
            }}
            className="w-full px-4 py-2 rounded-lg bg-career-lightGray text-career-darkGreen font-semibold hover:bg-career-mediumGreen hover:text-white transition-all duration-200"
          >
            Today
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={calendarRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="
          w-full pl-4 pr-4 py-2 text-base border-2 rounded-xl transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-career-mediumGreen/30
          border-career-lightGray hover:border-career-mediumGreen focus:border-career-darkGreen bg-white
          flex items-center justify-between
          text-left
        "
      >
        <span
          className={`flex items-center gap-2 ${!value ? "text-gray-500" : ""}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDisplayDate(value)}
        </span>
        <svg
          className={`w-5 h-5 text-career-darkGreen transition-transform duration-200 ${showCalendar ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showCalendar && renderCalendar()}
    </div>
  );
};

export default DatePicker;
