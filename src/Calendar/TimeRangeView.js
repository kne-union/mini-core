import React from 'react';
import {Tabs} from '@kne/antd-taro';
import useControlValue from '@kne/use-control-value';
import CalendarView from './CalendarView';
import TimeStepView from './TimeStepView';
import TimeLengthView from './TimeLengthView';
import dayjs from "dayjs";
import timeParse from './timeParse';
import {minuteRangeToDuration} from "./minuteToHumanize";
import classnames from "classnames";
import {View} from '@tarojs/components';
import style from './style.module.scss';

const TimeRangeView = ({className, ...props}) => {
    const [activeKey, onActiveKeyChange] = useControlValue(props, {
        defaultValue: 'defaultActiveKey', value: 'activeKey', onChange: 'onActiveKeyChange'
    });
    const [value, onChange] = useControlValue(props);

    return <Tabs className={classnames(className, style['time-range-view'])} activeKey={activeKey}
                 onChange={onActiveKeyChange} items={[{
        key: 'calendar', title: dayjs(value[0]).format('YYYY-MM-DD'), children: <>
            <View className={style['time-range-view-title']}>开始日期</View>
            <CalendarView className={style['time-range-view-calendar']} value={value[0]} onChange={(value) => {
                onChange((rangeValue) => {
                    const [start, end] = rangeValue;
                    const target = dayjs(value);
                    let newStart = dayjs(start).startOf('minute'), newEnd = dayjs(end).startOf('minute');
                    const duration = newEnd.diff(newStart, 'minute');
                    ['year', 'month', 'date'].forEach((key) => {
                        newStart = newStart.set(key, target.get(key));
                    });
                    newEnd = newStart.add(duration, 'minute');
                    return [newStart.toDate(), newEnd.toDate()];
                });
            }}/>
        </>
    }, {
        key: 'start', title: dayjs(value[0]).format('HH:mm'), children: <>
            <View className={style['time-range-view-title']}>开始时间</View>
            <TimeStepView value={value[0]} onChange={(value) => {
                onChange((rangeValue) => {
                    const [start, end] = rangeValue;
                    const target = dayjs(timeParse(value));
                    let newStart = dayjs(start).startOf('minute'), newEnd = dayjs(end).startOf('minute');

                    const duration = newEnd.diff(newStart, 'minute');
                    ['hour', 'minute'].forEach((key) => {
                        newStart = newStart.set(key, target.get(key));
                    });
                    newEnd = newStart.add(duration, 'minute');
                    return [newStart.toDate(), newEnd.toDate()];
                });
            }}/>
        </>
    }, {
        key: 'duration', title: minuteRangeToDuration(value), children: <>
            <View className={style['time-range-view-title']}>时长</View>
            <TimeLengthView value={dayjs(value[1]).diff(value[0], 'minute')} onChange={(value) => {
                onChange((rangeValue) => {
                    const [start] = rangeValue;
                    const newStart = dayjs(start).startOf('minute');
                    return [newStart.toDate(), newStart.add(value, 'minute').toDate()];
                });
            }}/>
        </>
    }]}/>
};

TimeRangeView.defaultProps = {
    defaultActiveKey: 'calendar', defaultValue: [dayjs(new Date()).startOf('hour'), dayjs(new Date()).startOf('hour').add(1, 'hour')]
};

export default TimeRangeView;
