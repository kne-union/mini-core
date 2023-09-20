import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperItem} from "@tarojs/components";
import dayjs from "dayjs";
import classnames from "classnames";
import style from "./style.module.scss";
import MonthView from './MonthView';

const getGroups = (target, mainIndex) => {
    const mainDate = dayjs(target), prevDate = mainDate.subtract(1, 'month').date(1),
        nextDate = mainDate.add(1, 'month').date(1);
    if (mainIndex === 0) {
        return [mainDate, nextDate, prevDate];
    }
    if (mainIndex === 1) {
        return [prevDate, mainDate, nextDate];
    }
    if (mainIndex === 2) {
        return [nextDate, prevDate, mainDate]
    }
    return null;
};

const MonthSwiper = ({className, current, disabledDate, onChange, minDate, maxDate, marks}) => {
    const [animating, setAnimating] = useState(false);
    const indexRef = useRef(1);
    const touchLocation = useRef(null);
    const [listGroup, setListGroup] = useState(getGroups(current, indexRef.current));

    useEffect(() => {
        setListGroup(getGroups(current, indexRef.current));
    }, [current]);

    return <Swiper current={1} circular duration={300} skipHiddenItemLayout onAnimationFinish={(e) => {
        (() => {
            if (e.target.current === indexRef.current) {
                return;
            }
            indexRef.current = e.target.current;
            const targetDate = dayjs(current)[touchLocation.current.isRight ? 'add' : 'subtract'](1, 'month').date(1);
            const target = targetDate.isSame(dayjs(), 'month') ? dayjs() : targetDate;
            onChange(target.toDate());
        })();
        setAnimating(false);
    }} className={classnames(style['month-swiper'], className, {
        [style['animating']]: animating
    })} onChange={() => {
        setAnimating(true);
    }} onTouchEnd={(e) => {
        const {clientX} = e.changedTouches[0];
        touchLocation.current = {
            isRight: touchLocation.current.clientX > clientX
        };
    }} onTouchStart={(e) => {
        const {clientX} = e.changedTouches[0];
        touchLocation.current = {
            clientX: clientX
        };
    }}>
        {listGroup.map((item, key) => {
            return <SwiperItem key={key} itemId={key.toString()}>
                <MonthView current={item} disabledDate={disabledDate} onChange={onChange} minDate={minDate}
                           maxDate={maxDate} marks={marks}/>
            </SwiperItem>
        })}
    </Swiper>
};

export default MonthSwiper;
