import React, { useEffect, useCallback, useMemo, useState } from "react";
import axios from "axios";
import { createSlots, getMonthByNumber, getWeekday } from "../../utils/dateHelpers";
import { endOfMonth, startOfMonth, today } from "@internationalized/date";
import { CalendarMonth } from "../../component";
import Footer from "./components/Footer";
import IntervalRadioGroup from "./components/IntervalRadioGroup";
import "./CalendarPage.css";

function CalendarBookingPage() {
  const dateToDayInAsiaTimezone = today('Asia/Calcutta');;
  const [selectedDate, setSelectedDate] = useState(dateToDayInAsiaTimezone);
  const [currentMonthData, setCurrentMonthData] = useState({});
  const [selectedInterval, setSelectedInterval] = useState("60")
  const [intevalledSlots, setIntervalledSlots] = useState([])
  const [currentShowedMonth, setCurrentShowedMonth] = useState(selectedDate);
  const [selectedRadioValue, setSelectedRadioValue] = useState(null);
  const selectedDateString = useMemo(() => selectedDate.toString(), [selectedDate]);

  const getDataFromCurrentMonth = useCallback(async (currentShowedMonth) => {
    try{
      let startDate = startOfMonth(currentShowedMonth)
      let endDate = endOfMonth(currentShowedMonth)
      const response = await axios.get(`https://app.appointo.me/scripttag/mock_timeslots?start_date=${startDate}&end_date=${endDate}`)
      const resultObject = {};
      response?.data?.forEach(singleSlot => {
        resultObject[singleSlot.date] =  singleSlot.slots;
      })
      setCurrentMonthData(prev => ({...prev, ...resultObject}));
    } catch(e){
      console.log("Error getting data")
    }
  }, []);

  const onChangeInterval = (e) => {
    setSelectedInterval(e.target.value);
  }

  useEffect(() => {
    getDataFromCurrentMonth(currentShowedMonth);
  }, [getDataFromCurrentMonth,currentShowedMonth])

  useEffect(() => {
    setSelectedRadioValue(null);
    const newData = createSlots(currentMonthData[selectedDateString], selectedInterval)
    setIntervalledSlots(newData)
  }, [selectedInterval, currentMonthData, selectedDateString])

  return (
    <div className="page">
      <div className="booking-container">
        <div className="flex sm:flex-row">
          <div className="calendar-container">
            <div className="calendar-heading-container">
              <h2 className="calendar-heading">Test Service</h2>
              <p className="calendar-subheading">
                <b>Timezone:</b> Asia/Calcutta
              </p>
            </div>
            <div className="calendar-wrapper">
              <CalendarMonth
                maxMonthToShow={3}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                defaultMonthToShow={dateToDayInAsiaTimezone}
                getDataFromCurrentMonth={getDataFromCurrentMonth}
                setCurrentShowedMonth={setCurrentShowedMonth}
                currentShowedMonth={currentShowedMonth}
              />
            </div>
          </div>
          <div className="timing-container">
            <p className="timings-heading">Select from variants</p>
            <select className="select-slot-interval" defaultValue={selectedInterval} onChange={onChangeInterval}>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="60">60 mins</option>
            </select>
            <hr className="divider"/>
            <p className="timings-heading">{getWeekday(`${selectedDate.year}/${selectedDate.month}/${selectedDate.day}`)}, {getMonthByNumber(parseInt(selectedDate.month))} {selectedDate.day} - Available Slots</p>
            <div className="slot-container">
              <IntervalRadioGroup 
                intevalledSlots={intevalledSlots}
                selectedRadioValue={selectedRadioValue}
                setSelectedRadioValue={setSelectedRadioValue}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default CalendarBookingPage