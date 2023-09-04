import {withPopup} from '../../../Common';
import {withDecoratorList, withItem} from '@kne/react-form-antd-taro';
import React, {useMemo, useState} from "react";
import {View} from "@tarojs/components";
import classnames from "classnames";
import commonStyle from "../../../Common/DataSelect/style.module.scss";
import style from "./style.module.scss";
import SelectedFooter from "../../../Common/SelectedFooter";
import {TextArea as AntdTextArea} from '@kne/react-form-antd-taro';

const classPrefix = 'adm-text-area';

const TextAreaInner = (props) => {
  const {onChange, ...otherProps} = props;
  const [value, onChangeBase] = useState(props.value || props.defaultValue);
  return <View className={classnames(style['component-item-body'])}>
    <View className={classnames(commonStyle['component-wrapper'], style[`${classPrefix}-wrapper`])}>
      <AntdTextArea {...otherProps} value={value} onChange={(value) => {
        onChangeBase(value);
      }} showCount={(valueLength, maxLength) => {
        return <>
          <View className={style[`${classPrefix}-count`]}>{valueLength}</View>
          <View className={style[`${classPrefix}-split`]}>/</View>
          <View className={style[`${classPrefix}-max`]}>{maxLength}</View>
        </>
      }}/>
    </View>
    <SelectedFooter
      className={commonStyle['component-fix-footer']}
      showReset={false}
      confirmText="保存"
      onConfirm={() => {
        onChange(value)
      }}/>
  </View>
}

const TextAreaPopup = withDecoratorList(({render, placeholder, showPopup, ellipsisRows = 1, value}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return <View style={{'--line-clamp': ellipsisRows}} className={classnames('ellipsis')}>
      {value}
    </View>;
  }, [value]);
  return render({
    label, value, placeholder, onClick: showPopup
  });
})(withPopup(TextAreaInner));

const TextArea = ({isPopup, ...props}) => {
  return isPopup !== false ? <TextAreaPopup {...props} catchMove={false}/> : <AntdTextArea {...props} />;
}

TextArea.Item = withItem(TextArea);

export default TextArea;
