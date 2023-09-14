import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import isDate from 'lodash/isDate';
import {View} from "@tarojs/components";
import {TimeStepPopup} from '../../../Calendar';
import dayjs from 'dayjs';

const TimeStep = withDecoratorList(({render, placeholder, showPopup, value, ...props}) => {
    const label = useMemo(() => {
        if (!value) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={classnames('ellipsis')}>
            {value}
        </View>;
    }, [placeholder, value]);
    return render({
        ...props, label, value, placeholder, onClick: showPopup
    });
})(TimeStepPopup);

export default TimeStep;
