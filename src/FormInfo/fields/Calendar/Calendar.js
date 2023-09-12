import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import {CalendarPopup} from '../../../Calendar';
import dayjs from 'dayjs';

const Calendar = withDecoratorList(({render, placeholder, showPopup, value, ...props}) => {
    const label = useMemo(() => {
        if (!value) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={classnames('ellipsis')}>
            {dayjs(value).format('YYYY-MM-DD')}
        </View>;
    }, [placeholder, value]);
    return render({
        ...props, label, value, placeholder, onClick: showPopup
    });
})(CalendarPopup);

export default Calendar;
