import React from 'react';
import {View} from "@tarojs/components";
import {usePopupView} from "../../PopupView";
import classnames from "classnames";
import {hooks, withItem} from "@kne/react-form-antd-taro";

const {useDecorator} = hooks;

const createDataSelectField = ({labelRender}) => (WrappedComponents) => {
    const Field = ({className, onChange, ...props}) => {
        const label = labelRender(props);
        const popupView = usePopupView();
        return <View className={classnames(className, 'react-form_decorator-item', {
            "react-form__placeholder": !label
        })} onClick={() => {
            const {close} = popupView({
                title: 'placeholder', children: <WrappedComponents {...props} onChange={(target) => {
                    close();
                    onChange && onChange(target);
                }}/>
            });
        }}>{label}</View>
    };

    const Component = (props) => {
        const render = useDecorator(Object.assign({placeholder: `请选择${props.label}`}, props));
        return render(Field);
    };

    Component.Field = Field;
    Component.Item = withItem(Component);
    return Component;
};

export default createDataSelectField;
