import style from './style.module.scss';
import React, {useState} from 'react';
import {Button, Divider, Icon, Popup, Space} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import classnames from 'classnames';
import dayjs from 'dayjs';
import HeaderContainer from "../HeaderContainer";
import WeekView from './WeekView';
import MonthSwiper from './MonthSwiper';
import MonthSelector from './MonthSelector';
import WeekTitle from "./WeekTitle";
import useCalendarValue from "./useCalendarValue";

const Calendar = ({className, ...props}) => {
    const [isWeekView, setIsWeekView] = useState(true);
    const [monthSelectOpen, setMonthSelectOpen] = useState(false);
    const [value, onChange] = useCalendarValue(props);

    return <Space direction="vertical" className={classnames(className)}>
        <View className={style['title']}>
            <View className={style['title-current']} onClick={() => {
                setMonthSelectOpen(true);
            }}>
                {dayjs(value).format('YYYY年MM月')}
                <Icon className={classnames('iconfont', style['title-icon'])} type="jiantou-tianchong"/>
            </View>
            <View className={style['title-options']}>
                <Button size="small" onClick={() => {
                    onChange(new Date());
                }}>今天</Button>
            </View>
        </View>
        <View>
            <Popup open={monthSelectOpen} bodyClassName={style['month-selector-body']} hasSafeArea={false}
                   position="top"
                   onMaskClick={() => setMonthSelectOpen(false)}>
                {monthSelectOpen && <>
                    <HeaderContainer/>
                    <View className={style['title']}>
                        <View className={style['title-current']}>
                            {dayjs(value).format('YYYY年MM月')}
                        </View>
                        <View>
                            <Button size="small" onClick={() => {
                                onChange(new Date());
                                setMonthSelectOpen(false);
                            }}>本月</Button>
                        </View>
                    </View>
                    <MonthSelector value={value} onChange={(value) => {
                        onChange(value);
                        setMonthSelectOpen(false);
                    }} maxDate={props.maxDate} minDate={props.minDate}/>
                </>}
            </Popup>
            <WeekTitle/>
            {isWeekView ? <WeekView current={value} value={value} onChange={onChange} minDate={props.minDate}
                                    maxDate={props.maxDate}
                                    marks={props.marks}/> :
                <MonthSwiper current={value} onChange={onChange} minDate={props.minDate} maxDate={props.maxDate}
                             marks={props.marks}/>}
        </View>
        <Divider className={style['divider']} onClick={() => {
            setIsWeekView((value) => !value);
        }}><Icon type={"rilijiantou"} className={classnames("iconfont", style['divider-icon'], {
            [style['is-month']]: !isWeekView
        })}/></Divider>
    </Space>;
};

Calendar.defaultProps = {
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

export default Calendar;
