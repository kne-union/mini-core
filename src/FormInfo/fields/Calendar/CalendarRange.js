import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import {CalendarRangePopup} from '../../../Calendar';
import dayjs from 'dayjs';

const CalendarRange = withDecoratorList(({render, placeholder, showPopup, value, ...props}) => {
    const label = useMemo(() => {
        if (!value || value.length !== 2) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={classnames('ellipsis')}>
            {dayjs(value[0]).format('YYYY-MM-DD')}~{dayjs(value[1]).format('YYYY-MM-DD')}
        </View>;
    }, [placeholder, value]);
    return render({
        ...props, label, value, placeholder, onClick: showPopup
    });
})(CalendarRangePopup);

export default CalendarRange;
