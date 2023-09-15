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

const TimeRangeView = ({
                           className,
                           minTime,
                           maxTime,
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
                          minTime={dayjs(value[0]).diff(minTime, 'day') === 0 ? minTime : '0:00'}
                          maxTime={dayjs(maxTime).diff(dayjs(value[0]).startOf('day'), 'day') === 0 ? maxTime : '24:00'}
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

    return <Tabs className={classnames(className, style['time-range-view'])} activeKey={activeKey}
                 onChange={onActiveKeyChange} items={items}/>
};

TimeRangeView.defaultProps = {
    defaultActiveKey: 'calendar',
    step: 15,
    minTime: dayjs().startOf('hour'),
    maxTime: dayjs().startOf('date').add(10, 'year').hour(24),
    maxDurationLength: 60,
    durationHidden: false,
    startDateTitle: '开始日期',
    startTimeTitle: '开始时间',
    durationTitle: '时长',
    defaultValue: [dayjs(new Date()).startOf('hour'), dayjs(new Date()).startOf('hour').add(1, 'hour')]
};

export default TimeRangeView;
