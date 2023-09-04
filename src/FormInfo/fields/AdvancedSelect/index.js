import {ListSelect as CommonListSelect, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";

const ListSelectInner = (props) => {
  return <CommonListSelect {...props} hasSafeArea valueType="all" defaultValue={props.value}/>
}

const getValue = (value) => {
  return Object.prototype.toString.call(value) === '[object String]' ? value.value : value?.label
}

const AdvancedSelect = withDecoratorList(({render, placeholder, showPopup, value, multiple, ...props}) => {
  const label = useMemo(() => {
    if (!value) {
      return <View className="react-form__placeholder">{placeholder}</View>;
    }
    return multiple ? <View className={classnames('ellipsis')}>
      {Array.isArray(value) ? (value || []).map((value) => {
        return getValue(value)
      }).join('，') : ''}
    </View> : <View className={classnames('ellipsis')}>
      {Array.isArray(value) ? getValue(value[0]) : getValue(value)}
    </View>;
  }, [value]);
  return render({
    ...props, label, value, placeholder, onClick: showPopup, multiple
  });
})(withPopup(ListSelectInner));

AdvancedSelect.defaultProps = {
  multiple: true
}

export default AdvancedSelect;

