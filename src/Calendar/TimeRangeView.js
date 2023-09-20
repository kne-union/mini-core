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
import get from 'lodash/get';
import style from './style.module.scss';

const timeRangeFix = (value, {startTime, endTime}) => {
    const start = timeParse(startTime), end = timeParse(endTime);
    if (dayjs(value).isBefore(dayjs(start))) {
        return dayjs(value).set('hour', start.hour).set('minute', start.minute).toDate();
    }
    if (dayjs(value).isAfter(dayjs(end))) {
        return dayjs(value).set('hour', end.hour).set('minute', end.minute).toDate();
    }
    return value;
};

const TimeRangeView = ({
                           className,
                           minTime,
                           maxTime,
                           startTime,
                           endTime,
                           maxDurationLength,
                           durationHidden,
                           step,
                           disabledDate,
                           startDateTitle,
                           startTimeTitle,
                           durationTitle,
                           ...props
                       }) => {
    const [activeKey, onActiveKeyChange] = useControlValue(props, {
        defaultValue: 'defaultActiveKey', value: 'activeKey', onChange: 'onActiveKeyChange'
    });
    const [value, onChange] = useControlValue(props);

    const items = [{
        key: 'calendar', title: dayjs(value[0]).format('YYYY-MM-DD'), children: <>
            <View className={style['time-range-view-title']}>{startDateTitle}</View>
            <CalendarView className={style['time-range-view-calendar']} value={value[0]} minDate={minTime}
                          disabledDate={disabledDate}
                          maxDate={maxTime} onChange={(value) => {
                onChange((rangeValue) => {
                    const [start, end] = rangeValue;
                    const target = dayjs(value);
                    let newStart = dayjs(start).startOf('minute'), newEnd = dayjs(end).startOf('minute');
                    const duration = newEnd.diff(newStart, 'minute');
                    ['year', 'month', 'date'].forEach((key) => {
                        newStart = newStart.set(key, target.get(key));
                    });
                    if (newStart.isBefore(minTime)) {
                        newStart = dayjs(minTime);
                    }
                    if (newStart.isAfter(dayjs(maxTime).subtract(duration, 'minute'))) {
                        newStart = dayjs(maxTime).subtract(duration, 'minute');
                    }
                    newEnd = newStart.add(duration, 'minute');
                    return [newStart.toDate(), newEnd.toDate()];
                });
            }}/>
        </>
    }, {
        key: 'start', title: dayjs(value[0]).format('HH:mm'), children: <>
            <View className={style['time-range-view-title']}>{startTimeTitle}</View>
            <TimeStepView value={value[0]} step={step}
                          minTime={dayjs(value[0]).diff(minTime, 'day') === 0 ? timeRangeFix(minTime, {
                              startTime, endTime
                          }) : startTime}
                          maxTime={dayjs(maxTime).diff(dayjs(value[0]).startOf('day'), 'day') === 0 ? timeRangeFix(maxTime, {
                              startTime, endTime
                          }) : endTime}
                          onChange={(value) => {
                              onChange((rangeValue) => {
                                  const [start, end] = rangeValue;
                                  const target = dayjs(timeParse(value));
                                  let newStart = dayjs(start).startOf('minute'), newEnd = dayjs(end).startOf('minute');

                                  const duration = newEnd.diff(newStart, 'minute');
                                  ['hour', 'minute'].forEach((key) => {
                                      newStart = newStart.set(key, target.get(key));
                                  });
                                  if (newStart.isAfter(dayjs(maxTime).subtract(duration, 'minute'))) {
                                      newEnd = dayjs(maxTime);
                                  } else {
                                      newEnd = newStart.add(duration, 'minute');
                                  }
                                  return [newStart.toDate(), newEnd.toDate()];
                              });
                          }}/>
        </>
    }];

    if (!durationHidden) {
        items.push({
            key: 'duration', title: minuteRangeToDuration(value), children: <>
                <View className={style['time-range-view-title']}>{durationTitle}</View>
                <TimeLengthView value={dayjs(value[1]).diff(value[0], 'minute')} step={step}
                                maxLength={Math.min(Math.floor(dayjs(maxTime).diff(value[0], 'minute') / step), maxDurationLength)}
                                onChange={(value) => {
                                    onChange((rangeValue) => {
                                        const [start] = rangeValue;
                                        const newStart = dayjs(start).startOf('minute');
                                        return [newStart.toDate(), newStart.add(value, 'minute').toDate()];
                                    });
                                }}/>
            </>
        });
    }

    return <><Tabs.Header className={classnames(className, style['time-range-view'])} activeKey={activeKey}
                          onChange={onActiveKeyChange} items={items}/>
        {get(items.find((item) => item.key === activeKey), 'children', null)}
    </>
};

TimeRangeView.defaultProps = {
    defaultActiveKey: 'calendar',
    step: 15,
    minTime: dayjs().startOf('date').subtract(10, 'year').hour(24),
    maxTime: dayjs().startOf('date').add(10, 'year').hour(24),
    startTime: '0:00',
    endTime: '24:00',
    maxDurationLength: 60,
    durationHidden: false,
    startDateTitle: '开始日期',
    startTimeTitle: '开始时间',
    durationTitle: '时长',
    defaultValue: [dayjs(new Date()).startOf('hour'), dayjs(new Date()).startOf('hour').add(1, 'hour')]
};

export default TimeRangeView;
