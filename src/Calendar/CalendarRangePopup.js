import React, {useState} from 'react';
import {Popup} from '@kne/antd-taro';
import style from './style.module.scss';
import useControlValue from "@kne/use-control-value";
import CalendarRangeView from './CalendarRangeView';
import classnames from 'classnames';
import {View} from '@tarojs/components';

const CalendarRangePopup = ({className, onClose, onCancel, isRootPortal, value, onChange, placeholder, ...props}) => {
    const [active, setActive] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    const [current, setCurrent] = useState(value);
    return <Popup className={classnames(style['popup'], 'adm-picker-popup')} isRootPortal={false}
                  position="bottom" open={active}
                  onOpenChange={(open) => {
                      if (open) {
                          return;
                      }
                      setActive(false);
                      onClose?.();
                      setCurrent(value);
                  }}>

        {active && <CalendarRangeView {...props} value={current} onChange={setCurrent}/>}
        <View className={classnames(`adm-picker-header-button`, style['confirm-btn'])} onClick={() => {
            setActive(false);
            onClose?.();
            onChange?.(current);
        }}>确定</View>
    </Popup>
};

CalendarRangePopup.defaultProps = {
    value: [], placeholder: '请选择日期'
};

export default CalendarRangePopup;
