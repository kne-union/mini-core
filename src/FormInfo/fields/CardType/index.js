import React from 'react';
import {View} from '@tarojs/components';
import {hooks, Input, Picker, withItem} from "@kne/react-form-antd-taro";
import style from './style.module.scss';
import classnames from 'classnames';
import Enum from "../../../Enum";

const {useDecorator} = hooks;


const CardTypeField = ({data, value = {}, onChange, req, ...props}) => {
    value = Object.assign({
        type: 1, value: null
    }, value);

    return <View className={classnames(style['flex'], {
        [style['error-flex']]: !!req && !value.value
    })}>
        <Enum moduleName="cardTypeEnum">
            {data => {
                return <Picker.Field
                    className={style['type']}
                    onChange={(v) => {
                        onChange(Object.assign({}, value, {type: v[0]}));
                    }}
                    value={value.type ? [value.type] : []}
                    placeholder="证件类型"
                    columns={[data.map((item) => ({
                        label: item.description, value: item.value
                    }))]}
                />
            }}
        </Enum>
        <Input.Field
            className={style['number']} label={""} value={value.value}
            onChange={(v) => {
                onChange(Object.assign({}, value, {value: v}));
            }}
            placeholder={props.placeholder || "请输入"}/>
    </View>
}


const CardType = (props) => {
    const render = useDecorator(props);
    return render(CardTypeField);
};


CardType.Item = withItem(CardType);


export default CardType;
