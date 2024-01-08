import {IndustryEnum, IndustrySelect as CommonIndustrySelect} from '../../../Common';
import {View} from '@tarojs/components'
import React from "react";
import classnames from 'classnames';
import style from '../../style.module.scss';
import createDataSelectField from '../createDataSelectField';

const IndustrySelectInner = (props) => {
    return <CommonIndustrySelect {...props} hasSafeArea
                                 className={classnames(style['data-select-container'], props.className)}
                                 defaultValue={props.value || []}/>
}

const IndustrySelect = createDataSelectField({
    labelRender: ({value, placeholder, valueType}) => {
        if (!(value && value.length > 0)) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={"ellipsis"} split="," size={0}>{(value || []).map((item, index) => {
            const targetValue = valueType === 'all' ? item.value : item;
            return <>
                <IndustryEnum key={targetValue} name={targetValue}>
                    {data => data?.label || '-'}
                </IndustryEnum>{index !== value.length - 1 && "，"}
            </>
        })}</View>;
    }
})(IndustrySelectInner);

IndustrySelect.defaultProps = {
    multiple: true
}

export default IndustrySelect;
