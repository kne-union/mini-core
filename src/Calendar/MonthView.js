import React from 'react';
import dayjs from "dayjs";
import range from 'lodash/range';
import WeekView from './WeekView';

const MonthView = ({current, disabledDate, onChange, minDate, maxDate, marks}) => {
    const currentDate = dayjs(current);
    const startDate = currentDate.startOf('month'), endDate = currentDate.endOf('month');
    const firstDate = startDate.weekday(0), lastDate = endDate.weekday(6);
    const startWeek = startDate.isoWeek();
    const weeks = lastDate.diff(firstDate, 'week');
    return range(startWeek, startWeek + Math.max(weeks, 6) + 1).map((week) => {
        const target = dayjs(startDate).isoWeek(week);
        return <WeekView key={week} current={target} value={current} disabledDate={disabledDate} onChange={onChange} minDate={minDate} marks={marks}
                         maxDate={maxDate}/>;
    })
};

export default MonthView;
