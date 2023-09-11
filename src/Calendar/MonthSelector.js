import React, {useEffect, useId, useState} from 'react';
import dayjs from "dayjs";
import {ScrollView, View} from "@tarojs/components";
import style from "./style.module.scss";
import {Button, Selector, Space} from "@kne/antd-taro";
import range from 'lodash/range';

const MonthSelector = ({value, minDate, maxDate, onChange}) => {
    const containerId = useId().replace(/:/g, '_');
    const [scrollIntoView, setScrollIntoView] = useState(null);
    const currentYear = dayjs(value).year(), currenMonth = dayjs(value).month();
    useEffect(() => {
        setScrollIntoView(`${containerId}-${currentYear}`);
    }, [currentYear, containerId]);
    return <ScrollView scrollY scrollIntoView={scrollIntoView} className={style['month-selector-scroller']}>
        {range(dayjs(minDate).year(), dayjs(maxDate).year() + 1).map((year) => {
            return <Space direction="vertical">
                <View id={`${containerId}-${year}`} className={style['year-title']}>{year}年</View>
                <Selector className={style['selector']} value={currentYear === year ? [currenMonth] : []}
                          onChange={([month]) => {
                              if (month === void (0)) {
                                  onChange(value);
                                  return;
                              }
                              const target = new Date(year, month, 1);
                              onChange(dayjs(target).isSame(new Date(), 'month') ? new Date() : target);
                          }} options={range(0, 12).map((index) => {
                    const current = dayjs(new Date(year, index, 1));
                    const disabled = current.isBefore(dayjs(minDate).startOf('month')) || current.isAfter(dayjs(maxDate).startOf('month'));
                    return {
                        value: index, label: `${index + 1}月`, disabled
                    };
                })}/>
            </Space>
        })}
    </ScrollView>;
};

export default MonthSelector;
