import {FunctionEnum, FunctionSelect as CommonFunctionSelect} from '../../../Common';
import React from "react";
import {View} from "@tarojs/components";
import classnames from "classnames";
import style from "../../style.module.scss";
import createDataSelectField from '../createDataSelectField';

const FunctionSelectInner = (props) => {
    return <CommonFunctionSelect {...props} hasSafeArea
                                 className={classnames(style['data-select-container'], props.className)}
                                 defaultValue={props.value || []}/>
};

const FunctionSelect = createDataSelectField({
    labelRender: ({value, valueType, placeholder}) => {
        if (!(value && value.length > 0)) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={"ellipsis"} split="," size={0}>{(value || []).map((item, index) => {
            const targetValue = valueType === 'all' ? item.value : item;
            return <>
                <FunctionEnum key={targetValue} name={targetValue}/>{index !== value.length - 1 && "，"}
            </>
        })}</View>
    }
})(FunctionSelectInner);

FunctionSelect.defaultProps = {
    multiple: true
}

export default FunctionSelect;
