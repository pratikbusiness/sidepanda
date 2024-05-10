import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from "react-aria-components";
import {CalendarGridBody, CalendarGridHeader, CalendarHeaderCell} from 'react-aria-components';
import "./index.css";
import { isSameMonth } from "@internationalized/date";
import classNames from "classnames";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// TODO: a11y compliance
function CalendarMonth({currentShowedMonth, setCurrentShowedMonth, selectedDate, setSelectedDate, defaultMonthToShow, maxMonthToShow}) {
  const IS_PREV_MONTH_ALLOWED = isSameMonth(
    currentShowedMonth,
    defaultMonthToShow
  );
  const IS_NEXT_MONTH_ALLOWED = isSameMonth(
    currentShowedMonth,
    defaultMonthToShow.add({ months: maxMonthToShow })
  );

  const onMonthNext = () => {
    const newValue = currentShowedMonth.add({ months: 1 })
    setCurrentShowedMonth(newValue);
  };

  const onMonthPrev = () => {
    const newValue = currentShowedMonth.subtract({ months: 1 })
    setCurrentShowedMonth(newValue);
  };

  return (
    <Calendar
      className="calendar"
      aria-label="Appointment date"
      value={selectedDate}
      onChange={setSelectedDate}
      minValue={defaultMonthToShow}
      maxValue={defaultMonthToShow.add({ months: maxMonthToShow })}
    >
      <div className="calendar-header">
        <Button
          className={classNames(
            "calendar-navigate-button calendar-prev-button",
            {
              disabled: IS_PREV_MONTH_ALLOWED,
            }
          )}
          isDisabled={IS_PREV_MONTH_ALLOWED}
          slot="previous"
          onClick={onMonthPrev}
        >
          <MdNavigateBefore />
        </Button>
        <Heading className="calendar-month-name" />
        <Button
          className={classNames(
            "calendar-navigate-button calendar-next-button",
            {
              disabled: IS_NEXT_MONTH_ALLOWED,
            }
          )}
          isDisabled={IS_NEXT_MONTH_ALLOWED}
          slot="next"
          onClick={onMonthNext}
        >
          <MdNavigateNext />
        </Button>
      </div>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="calendar-grid-heading">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              className={classNames("calendar-date-cell", {
                "date-selected": date.toString() === selectedDate.toString(),
              })}
              date={date}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  );
}

export default React.memo(CalendarMonth);
