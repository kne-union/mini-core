import React, {useState} from 'react';
import {Popup} from '@kne/antd-taro';
import useControlValue from "@kne/use-control-value";
import TimeStepView from './TimeStepView';
import classnames from "classnames";
import style from "./style.module.scss";
import {View} from "@tarojs/components";

const TimeStepPopup = ({className, onClose, onCancel, isRootPortal, value, onChange, placeholder, ...props}) => {
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
        {active && <><View className={`adm-picker-header`}>
            <View
                className={`adm-picker-header-button`}
                onClick={() => {
                    onCancel?.();
                    setActive(false);
                    onClose?.();
                }}
            >
                取消
            </View>
            <View className={`adm-picker-header-title`}>{placeholder}</View>
            <View
                className={classnames(`adm-picker-header-button`)}
                onClick={() => {
                    setActive(false);
                    onClose?.();
                    onChange?.(current);
                }}
            >
                确定
            </View>
        </View><TimeStepView {...props} value={current} onChange={setCurrent}/></>}
    </Popup>
};

TimeStepPopup.defaultProps = {
    isRootPortal: false, value: new Date(), placeholder: '请选择时间'
};

export default TimeStepPopup;
