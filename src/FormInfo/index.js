import React from 'react';
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
import Calendar, {CalendarRange, CalendarTimeRange, TimeStep} from './fields/Calendar';
import UserListSelect from './fields/UserListSelect';
import InputNumberUnit from './fields/InputNumberUnit';
import Upload from "./fields/Upload";
import {fields as baseFields} from '@kne/react-form-antd-taro';

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
export {default as Form} from './Form';
export {default} from './Form';
export {default as PopupForm} from './PopupForm';
