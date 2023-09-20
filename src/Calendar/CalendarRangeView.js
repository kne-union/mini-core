import React from 'react';
import {Tabs} from '@kne/antd-taro';
import useControlValue from '@kne/use-control-value';
import CalendarView from './CalendarView';
import dayjs from "dayjs";
import classnames from "classnames";
import {View} from '@tarojs/components';
import get from 'lodash/get';
import style from './style.module.scss';

const CalendarRangeView = ({
                               className,
                               minDate,
                               maxDate,
                               startDateTitle,
                               endDateTitle,
                               maxDurationLength,
                               durationHidden,
                               step,
                               ...props
                           }) => {
    const [activeKey, onActiveKeyChange] = useControlValue(props, {
        defaultValue: 'defaultActiveKey', value: 'activeKey', onChange: 'onActiveKeyChange'
    });
    const [value, onChange] = useControlValue(props);

    const items = [{
        key: 'start', title: value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : startDateTitle, children: <>
            <View className={style['time-range-view-title']}>{startDateTitle}</View>
            <CalendarView className={style['time-range-view-calendar']} value={value[0] || new Date()} minDate={minDate}
                          maxDate={maxDate} onChange={(value) => {
                onChange((rangeValue) => {
                    const newStart = dayjs(value);
                    let newEnd = rangeValue[1] && dayjs(rangeValue[1]);
                    if (newEnd && newStart.isAfter(newEnd)) {
                        newEnd = dayjs(newStart);
                    }
                    return [newStart.toDate(), newEnd && newEnd.toDate()];
                });
            }}/>
        </>
    }, {
        key: 'end', title: value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : endDateTitle, children: <>
            <View className={style['time-range-view-title']}>{endDateTitle}</View>
            <CalendarView className={style['time-range-view-calendar']} value={value[1] || new Date()}
                          minDate={value[0] || minDate}
                          maxDate={maxDate} onChange={(value) => {
                onChange((rangeValue) => {
                    const newEnd = dayjs(value);
                    let newStart = rangeValue[0] && dayjs(rangeValue[0]);
                    if (newStart && newEnd.isBefore(newStart)) {
                        newStart = dayjs(newEnd);
                    }
                    return [newStart && newStart.toDate(), newEnd.toDate()];
                });
            }}/>
        </>
    }];

    return <><Tabs.Header className={classnames(className, style['time-range-view'])} activeKey={activeKey}
                          onChange={onActiveKeyChange} items={items}/>
        {get(items.find((item) => item.key === activeKey), 'children', null)}
    </>
};

CalendarRangeView.defaultProps = {
    defaultActiveKey: 'start', defaultValue: [], startDateTitle: '开始日期', endDateTitle: '结束日期'
};

export default CalendarRangeView;
