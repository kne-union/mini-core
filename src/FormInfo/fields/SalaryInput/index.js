import React from 'react';
import {View} from '@tarojs/components';
import {hooks, InputNumber, Picker, withItem} from "@kne/react-form-antd-taro";
import style from './style.module.scss';
import classnames from 'classnames';
import Enum from "../../../Enum";
import isNil from 'lodash/isNil';

const {useDecorator} = hooks;


const SalaryInputField = ({data, value = {}, onChange, req, ...props}) => {
    value = Object.assign({
        type: 5, value: '', max: null, min: null
    }, value);

    const isTenThousand = value.type === 6;

    return <View className={classnames(style['flex'], {
        [style['error-flex']]: !!req && !value.value
    })}>
        <Enum moduleName="salaryTypeEnum">
            {data => {
                return <Picker.Field
                    className={style['type']}
                    onChange={(v) => {
                        onChange(Object.assign({}, {
                            type: v[0],
                            value: v[0] === 6 && Number.isInteger(Number(value.value)) ? value.value * 10000 : value.value
                        }));
                    }}
                    value={isNil(value.type) ? [] : [value.type]}
                    placeholder="薪资类型"
                    columns={[data.map((item) => ({
                        label: item.description, value: item.value
                    }))]}
                >薪资类型</Picker.Field>
            }}
        </Enum>
        {value.type !== 1 && <InputNumber.Field hiddenController
                                                className={style['number']} label={""}
                                                value={isTenThousand && Number.isInteger(Number(value.value)) ? value.value / 10000 : value.value}
                                                onChange={(v) => {
                                                    onChange(Object.assign({}, {
                                                        type: value.type,
                                                        value: isTenThousand && Number.isInteger(Number(value.value)) ? v * 10000 : v
                                                    }));
                                                }}
                                                addonAfter={isTenThousand ? "万元" : (value.type !== 7 ? "元" : "")}
                                                placeholder={props.placeholder || "请输入"}/>}
    </View>
}


const SalaryInput = (props) => {
    const render = useDecorator(props);
    return render(SalaryInputField);
};


SalaryInput.Item = withItem(SalaryInput);


export default SalaryInput;
