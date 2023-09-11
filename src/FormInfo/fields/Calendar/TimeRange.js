import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import {TimeRangePopup, utils} from '../../../Calendar';

const TimeRange = withDecoratorList(({render, placeholder, showPopup, value, ...props}) => {
    const label = useMemo(() => {
        if (!value || value.length !== 2) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={classnames('ellipsis')}>
            {utils.minuteRangeToHumanize(value)}
        </View>;
    }, [placeholder, value]);
    return render({
        ...props, label, value, placeholder, onClick: showPopup
    });
})(TimeRangePopup);

export default TimeRange;
