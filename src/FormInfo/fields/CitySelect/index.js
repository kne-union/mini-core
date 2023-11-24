import {CityEnum, CitySelect as CommonCitySelect} from '../../../Common';
import React from "react";
import {View} from "@tarojs/components";
import classnames from "classnames";
import style from "../../style.module.scss";
import createDataSelectField from '../createDataSelectField';

const CitySelectInner = (props) => {
    return <CommonCitySelect {...props} hasSafeArea
                             className={classnames(style['city-select-container'], props.className)}
                             defaultValue={props.value || []}/>
}

const CitySelect = createDataSelectField({
    labelRender: ({value,placeholder, valueType}) => {
        if (!value || !value?.[0]) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={"ellipsis"} split="," size={0}>{(value || []).map((item, index) => {
            const targetValue = valueType === 'all' ? item.value : item;
            return <>
                <CityEnum key={targetValue} name={targetValue}/>{index !== value.length - 1 && "，"}
            </>
        })}</View>
    }
})(CitySelectInner);

export default CitySelect;
