const getMonthByNumber = (monthNumber) => {
  const items = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (!items[monthNumber - 1]) return;
  return items[monthNumber - 1];
};

const getWeekday = (date) => {
  const dateObject = new Date(date);
  const options = { weekday: "long" };
  const day = dateObject.toLocaleDateString(undefined, options);
  return day;
};

const createSlots = (data, intervalMinutes) => {
  const slots = [];
  data?.forEach((slot) => {
    const startTime = new Date(slot.start_time);
    const endTime = new Date(slot.end_time);
    let currentTime = startTime;

    while (currentTime < endTime) {
      const slotEndTime = new Date(
        currentTime.getTime() + intervalMinutes * 60000
      );
      if (slotEndTime > endTime) {
        slots.push({
          start_time: currentTime.toISOString(),
          end_time: endTime.toISOString(),
        });
        break;
      }
      slots.push({
        start_time: currentTime.toISOString(),
        end_time: slotEndTime.toISOString(),
      });
      currentTime = slotEndTime;
    }
  });
  return slots;
};

export { getWeekday, getMonthByNumber, createSlots };
