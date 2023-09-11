import React from 'react';
import {PickerView, PickerViewColumn, View} from "@tarojs/components";
import range from 'lodash/range';
import classnames from 'classnames';
import style from "./style.module.scss";
import minuteToHumanize from "./minuteToHumanize";

const TimeLengthView = ({className, value, step, onChange, minLength, maxLength, lineHeight}) => {
    const currentValue = Math.floor(value / step) - minLength;
    return <PickerView className={classnames(style['picker-view'], className)} immediateChange
                       indicatorStyle={`height:${lineHeight};`}
                       value={[currentValue]} onChange={(e) => {
        const value = e.detail.value;
        onChange?.((value[0] + minLength) * step);
    }}>
        <PickerViewColumn>{range(minLength, maxLength + 1).map((i, index) => {
            return <View className={classnames(style['picker-column'], {
                [style['is-active']]: currentValue === index
            })} style={{lineHeight}}>
                {minuteToHumanize(i * step)}
            </View>
        })}</PickerViewColumn>
    </PickerView>
};

TimeLengthView.defaultProps = {
    step: 15, minLength: 1, maxLength: 60, value: 4, lineHeight: '34px'
};

export default TimeLengthView;
