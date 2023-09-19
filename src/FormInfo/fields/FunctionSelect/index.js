import {FunctionEnum, FunctionSelect as CommonFunctionSelect, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import {View} from "@tarojs/components";
import classnames from "classnames";
import style from "../../style.module.scss";

const FunctionSelectInner = (props) => {
    return <CommonFunctionSelect {...props} hasSafeArea
                                 className={classnames(style['data-select-container'], props.className)}
                                 defaultValue={props.value || []}/>
}

const FunctionSelect = withDecoratorList(({render, placeholder, showPopup, value, valueType}) => {
    const label = useMemo(() => {
        if (!(value && value.length > 0)) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return <View className={"ellipsis"} split="," size={0}>{(value || []).map((item, index) => {
            const targetValue = valueType === 'all' ? item.value : item;
            return <>
                <FunctionEnum key={targetValue} name={targetValue}/>{index !== value.length - 1 && "，"}
            </>
        })}</View>

    }, [value, valueType]);
    return render({
        label, value: value || [], placeholder, onClick: showPopup
    });
})(withPopup(FunctionSelectInner));

FunctionSelect.defaultProps = {
    multiple: true
}

export default FunctionSelect;
