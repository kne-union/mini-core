import React, {useState} from 'react';
import useCalendarValue from './useCalendarValue';
import classnames from "classnames";
import {Button, Icon} from '@kne/antd-taro';
import style from "./style.module.scss";
import {View} from "@tarojs/components";
import dayjs from "dayjs";
import MonthSelector from './MonthSelector';
import WeekTitle from './WeekTitle';
import MonthSwiper from "./MonthSwiper";

const CalendarView = ({className, ...props}) => {
    const [value, onChange] = useCalendarValue(props);
    const [monthSelector, setMonthSelector] = useState(false);

    return <>
        <View className={style['title']}>
            <View className={style['title-current']} onClick={() => {
                setMonthSelector((value) => !value);
            }}>
                {dayjs(value).format('YYYY年MM月')}
                <Icon className={classnames('iconfont', style['title-icon'])} type="jiantou-tianchong"/>
            </View>
            {monthSelector ? <View className={style['title-options']}>
                <Button size="small" onClick={() => {
                    onChange(new Date());
                    setMonthSelector(false);
                }}>本月</Button>
            </View> : <View className={style['title-options']}>
                <Button size="small" onClick={() => {
                    onChange(new Date());
                }}>今天</Button>
            </View>}
        </View>
        {monthSelector ? <View className={style['calendar-view-month-selector']}>
            <MonthSelector value={value} onChange={(value) => {
                onChange(value);
                setMonthSelector(false);
            }} maxDate={props.maxDate} minDate={props.minDate}/>
        </View> : <>
            <WeekTitle/>
            <MonthSwiper current={value} onChange={onChange} minDate={props.minDate} maxDate={props.maxDate}
                         marks={props.marks}/>
        </>}

    </>
};

CalendarView.defaultProps = {
    defaultValue: new Date(), marks: [], minDate: (() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 10);
        return date;
    })(), maxDate: (() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 10);
        return date;
    })()
};

export default CalendarView;
