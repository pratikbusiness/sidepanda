import React from 'react'
import { RadioGroup, RadioButton } from "../../../component";

function IntervalRadioGroup({ intevalledSlots, selectedRadioValue, setSelectedRadioValue }) {
    const formatTime = (timeString) => {
    const date = new Date(timeString);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

  return (
    <>
    {!!intevalledSlots && 
        <RadioGroup>
            {intevalledSlots?.map((slot, index)=> (
                <RadioButton
                    key={slot.start_time+index}
                    onChange={setSelectedRadioValue}
                    checked={selectedRadioValue===formatTime(slot.start_time)+""+formatTime(slot.end_time)}
                    value={formatTime(slot.start_time)+""+formatTime(slot.end_time)}
                    label={formatTime(slot.start_time)+" - "+formatTime(slot.end_time)}
                />
            ))}
        </RadioGroup>}
    </>
  )
}

export default IntervalRadioGroup