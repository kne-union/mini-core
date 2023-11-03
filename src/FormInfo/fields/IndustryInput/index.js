import {IndustryEnum, IndustrySelect as CommonIndustrySelect, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';
import {View} from '@tarojs/components'
import React, {useMemo} from "react";
import classnames from 'classnames';
import style from '../../style.module.scss';

const IndustrySelectInner = (props) => {
  return <CommonIndustrySelect {...props} hasSafeArea
                               className={classnames(style['data-select-container'], props.className)}
                               defaultValue={props.value || []}/>
}

const IndustrySelect = withDecoratorList(({render, placeholder, showPopup, value, valueType}) => {
  const label = useMemo(() => {
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
  }, [value, placeholder, valueType]);
  return render({
    label, value: value || [], placeholder, onClick: showPopup
  });
})(withPopup(IndustrySelectInner));

IndustrySelect.defaultProps = {
  multiple: true
}

export default IndustrySelect;
