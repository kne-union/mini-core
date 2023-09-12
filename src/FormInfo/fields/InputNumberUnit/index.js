import React from 'react';
import {hooks, InputNumber, Picker, withItem} from "@kne/react-form-antd-taro";
import {Space,Divider} from '@kne/antd-taro';
import get from 'lodash/get';
import style from "./style.module.scss";
import classnames from 'classnames';

const {useDecorator} = hooks;

const InputNumberUnitField = ({units, unitPlaceholder, value, onChange, className, ...props}) => {
    value = Object.assign({
        unit: get(units, '[0].value', '0'), value: null
    }, value);
    return <Space className={classnames(className, style['input-number-unit'])} wrap={false} split={<Divider direction="vertical"/>}>
        <InputNumber.Field {...props} hiddenController value={value.value} onChange={(v) => {
            onChange(Object.assign({}, value, {value: v}));
        }}/>
        <Picker.Field className={style['unit']} onChange={(v) => {
            onChange(Object.assign({}, value, {unit: v[0]}));
        }} value={value.unit ? [value.unit] : []} placeholder={unitPlaceholder} columns={[units]}/>
    </Space>
};

InputNumberUnitField.defaultProps = {
    units: [{label: '月', value: '0'}, {label: '天', value: '1'}], unitPlaceholder: '单位', placeholder: '请输入'
};

const InputNumberUnit = (props) => {
    const render = useDecorator(props);
    return render(InputNumberUnitField);
};

InputNumberUnit.Item = withItem(InputNumberUnit);
InputNumberUnit.Field = InputNumberUnitField;

export default InputNumberUnit;
