import React from 'react';
import {View} from '@tarojs/components';
import {hooks, InputNumber, Picker, withItem} from "@kne/react-form-antd-taro";
import style from './style.module.scss';
import classnames from 'classnames';
import Enum from "../../../Enum";
import isNil from 'lodash/isNil';
import {Divider} from "@kne/antd-taro";

const {useDecorator} = hooks;


const SalaryInputField = ({data, value = {}, typeEnum, onChange, req, hasMonth, ...props}) => {
    value = Object.assign({
        type: 5, value: '', max: null, min: null, month: 12
    }, value);

    const isTenThousand = value.type === 6;

    const typeRender = (data) => {
        return <Picker.Field isRootPortal={false}
                             className={style['type']}
                             onChange={(v) => {
                                 onChange(Object.assign({}, {
                                     type: v[0],
                                     value: v[0] === 6 && Number.isInteger(Number(value.value)) ? value.value * 10000 : value.value,
                                     month: value.month
                                 }));
                             }}
                             value={isNil(value.type) ? [] : [value.type]}
                             placeholder="薪资类型"
                             columns={[data.map((item) => ({
                                 label: item.description, value: item.value
                             }))]}
        >薪资类型</Picker.Field>
    };

    return <View className={classnames(style['flex'], {
        [style['error-flex']]: !!req && !value.value
    })}>
        {typeEnum ? typeEnum({render: typeRender}) : <Enum moduleName="salaryTypeEnum">
            {typeRender}
        </Enum>}
        <Divider direction="vertical"/>
        {value.type !== 1 && <InputNumber.Field hiddenController clearable={false}
                                                className={style['number']} label={""}
                                                value={isTenThousand && Number.isInteger(Number(value.value)) ? value.value / 10000 : value.value}
                                                onChange={(v) => {
                                                    onChange(Object.assign({}, {
                                                        type: value.type,
                                                        value: isTenThousand && Number.isInteger(Number(value.value)) ? v * 10000 : v,
                                                        month: value.month
                                                    }));
                                                }}
                                                addonAfter={isTenThousand ? "万元" : (value.type !== 7 ? "元" : "")}
                                                placeholder={props.placeholder || "请输入"}/>}
        {value.type === 5 && hasMonth ? <><Divider direction="vertical"/><InputNumber.Field className={style['number']}
                                                                                            clearable={false} min={1}
                                                                                            max={99}
                                                                                            value={value.month}
                                                                                            onChange={(v) => {
                                                                                                onChange(Object.assign({}, {
                                                                                                    type: value.type,
                                                                                                    value: value.value,
                                                                                                    month: v
                                                                                                }));
                                                                                            }}/><View
            className={style['unit']}>月</View></> : null}
    </View>
}

SalaryInputField.defaultProps = {
    hasMonth: false
};


const SalaryInput = (props) => {
    const render = useDecorator(props);
    return render(SalaryInputField);
};


SalaryInput.Item = withItem(SalaryInput);


export default SalaryInput;
