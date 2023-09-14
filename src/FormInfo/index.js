import React, {forwardRef, useEffect, useState} from 'react';
import merge from 'lodash/merge';
import {usePreset} from '../Global';
import AdvancedSelect from './fields/AdvancedSelect';
import AutoComplete from './fields/AutoComplete';
import CitySelect from './fields/CitySelect';
import TextArea from './fields/TextArea';
import FunctionSelect from "./fields/FunctionSelect";
import IndustrySelect from "./fields/IndustryInput";
import PhoneNumber from './fields/PhoneNumber';
import Avatar from './fields/Avatar';
import SalaryInput from './fields/SalaryInput';
import CardType from './fields/CardType';
import Calendar, {CalendarRange, CalendarTimeRange,TimeStep} from './fields/Calendar';
import UserListSelect from './fields/UserListSelect';
import InputNumberUnit from './fields/InputNumberUnit';
import Upload from "./fields/Upload";
import {
    fields as baseFields,
    Form as ReactForm,
    interceptors,
    preset as formPreset,
    RULES
} from '@kne/react-form-antd-taro';
import {get} from "lodash";
import {isValidPhoneNumber} from "libphonenumber-js/min";

export * from '@kne/react-form-antd-taro';
export const fields = {
    ...baseFields,
    AdvancedSelect,
    AutoComplete,
    CitySelect,
    FunctionSelect,
    IndustrySelect,
    TextArea,
    PhoneNumber,
    CalendarTimeRange,
    Calendar,
    TimeStep,
    CalendarRange,
    UserListSelect,
    Upload,
    InputNumberUnit
};
export {
    AdvancedSelect,
    AutoComplete,
    CitySelect,
    FunctionSelect,
    IndustrySelect,
    TextArea,
    PhoneNumber,
    Avatar,
    SalaryInput,
    CardType,
    CalendarTimeRange,
    Calendar,
    TimeStep,
    CalendarRange,
    UserListSelect,
    Upload,
    InputNumberUnit
};
export {default as FormList} from './List';
export {default as FormPart} from './FormPart';

interceptors.input.use('picker-single', (value) => {
    return value ? [value] : null;
});

interceptors.output.use('picker-single', (value) => {
    return value ? value[0] : null;
});


interceptors.input.use('picker-array', (value) => {
    return value ? value : [];
});

interceptors.input.use('photo-string', value => {
    if (typeof value === 'string' && value.indexOf('?') > -1) {
        return value.split('?')[0];
    }

    return value;
});

interceptors.output.use("file-format", (value) => {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.map((item) => ({
        id: item.id,
        originalName: item.fileName || item.originalName
    }));
});

interceptors.input.use("file-format", (value) => {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.map((item) => ({
        id: item.id,
        originalName: item.originalName,
        fileName: item.fileName,
    }));
});

const _oldREQ = RULES.REQ;

const baseFormPreset = {
    rules: {
        REQ: (...args) => {
            return Object.assign({}, _oldREQ(...args), {errMsg: `%s不能为空`});
        }, PHONE_NUMBER: async (value, {field}) => {
            if ((field.rule || '').split(' ').indexOf('REQ') > -1 && !get(value, 'value')) {
                return {result: false, errMsg: '%s不能为空'};
            }
            if (!get(value, 'value')) {
                return {result: true};
            }

            const result = isValidPhoneNumber(get(value, 'value', ''), {
                defaultCountry: get(value, 'code', 'CN'), extract: true
            });

            return {result, errMsg: '%s格式不正确'};
        }, NUMBER_OR_CHAR: (value) => {
            if (!/^[A-Za-z0-9]+$/.test(value)) {
                return {
                    result: false, errMsg: '%s只能包含数字和字母'
                };
            }
            return {
                result: true, errMsg: ''
            };
        }, CARD: (value) => {
            if (value.type === 1 && !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value.value)) {
                return {
                    result: false, errMsg: '请输入正确格式的18位二代身份证号码'
                };
            }
            if (!/^[A-Za-z0-9]+$/.test(value.value)) {
                return {
                    result: false, errMsg: '%s只能包含数字和字母'
                };
            }
            return {
                result: true, errMsg: ''
            };
        }, SALARY: ({value, type}) => {

            if (value && type !== 1 && type !== 7) {
                console.log(111, value, type)
                if (!/^[1-9]\d*$/.test(value)) {
                    return {
                        result: false, errMsg: '请输入正整数'
                    };
                }

                if (value >= 20000000) {
                    return {
                        result: false, errMsg: '薪资不得超过2千万'
                    };
                }
            }

            return {
                result: true, errMsg: ''
            };
        },
    }
};

const SetPreset = ({children}) => {
    const [isPreset, setIsPreset] = useState(false);
    const preset = usePreset();
    const formInfo = get(preset, "formInfo", {});
    useEffect(() => {
        formPreset(merge({}, baseFormPreset, formInfo));
        setIsPreset(true);
    }, [formInfo]);
    if (!isPreset) {
        return null;
    }
    return children;
};

export const Form = forwardRef(({children, ...props}, ref) => {
    return <ReactForm {...props} ref={ref}>
        <SetPreset>{children}</SetPreset>
    </ReactForm>
});
