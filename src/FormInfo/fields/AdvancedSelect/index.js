import {ListSelect as CommonListSelect} from '../../../Common';
import React from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import createDataSelectField from '../createDataSelectField';

const ListSelectInner = (props) => {
    return <CommonListSelect {...props} hasSafeArea valueType="all" defaultValue={props.value}/>
}

const getValue = (value) => {
    return Object.prototype.toString.call(value) === '[object String]' ? value.value : value?.label
}

export const labelRender = ({value, placeholder, multiple}) => {
    if (!(value && value.length > 0)) {
        return <View className="react-form__placeholder">{placeholder}</View>;
    }
    return multiple ? <View className={classnames('ellipsis')}>
        {Array.isArray(value) ? (value || []).map((value) => {
            return getValue(value)
        }).join('，') : ''}
    </View> : <View className={classnames('ellipsis')}>
        {Array.isArray(value) ? getValue(value[0]) : getValue(value)}
    </View>;
};

const AdvancedSelect = createDataSelectField({
    labelRender
})(ListSelectInner);

AdvancedSelect.defaultProps = {
    multiple: true
}

export default AdvancedSelect;

