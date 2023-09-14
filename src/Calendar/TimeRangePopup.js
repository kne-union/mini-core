import React, {useState} from 'react';
import {Popup} from '@kne/antd-taro';
import style from './style.module.scss';
import useControlValue from "@kne/use-control-value";
import TimeRangeView from './TimeRangeView';
import classnames from 'classnames';
import {View} from '@tarojs/components';
import dayjs from 'dayjs';

const TimeRangePopup = ({className, onClose, isRootPortal, value, onChange, ...props}) => {
    const [active, setActive] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    const [current, setCurrent] = useState(value);
    return <Popup className={classnames(style['popup'], 'adm-picker-popup')} isRootPortal={isRootPortal}
                  position="bottom" open={active}
                  onOpenChange={(open) => {
                      if (open) {
                          return;
                      }
                      setActive(false);
                      onClose?.();
                      setCurrent(value);
                  }}>
        {active && <TimeRangeView {...props} value={current} onChange={setCurrent}/>}
        <View className={classnames(`adm-picker-header-button`, style['confirm-btn'])} onClick={() => {
            setActive(false);
            onClose?.();
            onChange?.(current);
        }}>确定</View>
    </Popup>
};

TimeRangePopup.defaultProps = {
    value: [dayjs(new Date()).startOf('hour'), dayjs(new Date()).startOf('hour').add(1, 'hour')], isRootPortal: false
};

export default TimeRangePopup;
