import React, { useState, useRef, useEffect } from "react";

interface TimePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  name,
  value,
  onChange,
  required = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      const hour24 = parseInt(h);
      const isPM = hour24 >= 12;
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;

      setHours(hour12.toString().padStart(2, "0"));
      setMinutes(m);
      setPeriod(isPM ? "PM" : "AM");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const updateTime = (
    newHours: string,
    newMinutes: string,
    newPeriod: "AM" | "PM",
  ) => {
    let hour24 = parseInt(newHours);

    if (newPeriod === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (newPeriod === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    const timeString = `${hour24.toString().padStart(2, "0")}:${newMinutes}`;
    const event = {
      target: { name, value: timeString },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  const handleHourChange = (newHour: string) => {
    setHours(newHour);
    updateTime(newHour, minutes, period);
  };

  const handleMinuteChange = (newMinute: string) => {
    setMinutes(newMinute);
    updateTime(hours, newMinute, period);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const formatDisplayTime = (timeString: string) => {
    if (!timeString) return "Select time";
    const [h, m] = timeString.split(":");
    const hour24 = parseInt(h);
    const isPM = hour24 >= 12;
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    return `${hour12}:${m} ${isPM ? "PM" : "AM"}`;
  };

  const renderTimeColumn = (
    type: "hour" | "minute",
    currentValue: string,
    onValueChange: (value: string) => void,
  ) => {
    const values =
      type === "hour"
        ? Array.from({ length: 12 }, (_, i) =>
            (i + 1).toString().padStart(2, "0"),
          )
        : Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    return (
      <div className="flex-1 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-career-mediumGreen scrollbar-track-gray-100">
        <div className="space-y-1 p-2">
          {values.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onValueChange(val)}
              className={`
                w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                ${
                  currentValue === val
                    ? "bg-career-darkGreen text-white shadow-md"
                    : "text-gray-700 hover:bg-career-lightGray hover:scale-105"
                }
              `}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={pickerRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatDisplayTime(value)}
        </span>
        <svg
          className={`w-5 h-5 text-career-darkGreen transition-transform duration-200 ${showPicker ? "rotate-180" : ""}`}
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

      {showPicker && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-career-lightGray/50 p-4 z-50 w-72 animate-fade-in">
          {/* Time Picker Header */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-career-darkGreen">
              Select Time
            </h3>
            <div className="text-2xl font-bold text-career-mediumGreen mt-2">
              {hours}:{minutes} {period}
            </div>
          </div>

          {/* Time Selection */}
          <div className="flex gap-2 mb-4">
            {/* Hours */}
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-500 text-center mb-2">
                Hour
              </div>
              {renderTimeColumn("hour", hours, handleHourChange)}
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center text-2xl font-bold text-career-darkGreen pt-6">
              :
            </div>

            {/* Minutes */}
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-500 text-center mb-2">
                Minute
              </div>
              {renderTimeColumn("minute", minutes, handleMinuteChange)}
            </div>
          </div>

          {/* AM/PM Toggle */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => handlePeriodChange("AM")}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${
                  period === "AM"
                    ? "bg-career-darkGreen text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-career-lightGray"
                }
              `}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => handlePeriodChange("PM")}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${
                  period === "PM"
                    ? "bg-career-darkGreen text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-career-lightGray"
                }
              `}
            >
              PM
            </button>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const currentHour24 = now.getHours();
                const currentMinute = now.getMinutes();
                const currentPeriod: "AM" | "PM" =
                  currentHour24 >= 12 ? "PM" : "AM";
                const currentHour12 =
                  currentHour24 === 0
                    ? 12
                    : currentHour24 > 12
                      ? currentHour24 - 12
                      : currentHour24;

                const newHours = currentHour12.toString().padStart(2, "0");
                const newMinutes = currentMinute.toString().padStart(2, "0");

                setHours(newHours);
                setMinutes(newMinutes);
                setPeriod(currentPeriod);
                updateTime(newHours, newMinutes, currentPeriod);
                setShowPicker(false);
              }}
              className="w-full px-4 py-2 rounded-lg bg-career-lightGray text-career-darkGreen font-semibold hover:bg-career-mediumGreen hover:text-white transition-all duration-200"
            >
              Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
