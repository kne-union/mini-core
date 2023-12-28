import {ListSelect as CommonListSelect} from '../../../Common';
import React from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import createDataSelectField from '../createDataSelectField';
import get from 'lodash/get';
import concat from 'lodash/concat';

const ListSelectInner = (props) => {
    return <CommonListSelect {...props} hasSafeArea valueType="all" defaultValue={props.value}/>
}

const getValue = (value, mapping) => {
    return typeof value === 'object' && ['value', 'label'].every((key) => value.hasOwnProperty(key)) ? value.label : get((mapping || []).find((item) => item.value === value), 'label', '-');
}

export const labelRender = ({value, placeholder, multiple, options, mapping}) => {
    if (!(value && value.length > 0)) {
        return <View className="react-form__placeholder">{placeholder}</View>;
    }

    const targetMapping = concat(options || [], mapping || []);
    return multiple ? <View className={classnames('ellipsis')}>
        {Array.isArray(value) ? (value || []).map((item, index) => {
          return <>{getValue(item, targetMapping)}{((index !== value.length - 1) ? '，' : '')}</>;
        }) : ''}
    </View> : <View className={classnames('ellipsis')}>
        {Array.isArray(value) ? getValue(value[0], targetMapping) : getValue(value, targetMapping)}
    </View>;
};

const AdvancedSelect = createDataSelectField({
    labelRender
})(ListSelectInner);

AdvancedSelect.defaultProps = {
    multiple: true
}


export default AdvancedSelect;

