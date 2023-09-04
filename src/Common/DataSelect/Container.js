import React, {useRef, useState} from "react";
import {showToast} from "@tarojs/taro";
import {withFetch} from "@kne/react-fetch";
import {Button, CheckList, Empty, SearchBar, Space, toCSSLength, SafeArea} from '@kne/antd-taro';
import classnames from 'classnames';
import ScrollViewVertical from "../ScrollViewVertical";
import {View} from "@tarojs/components";
import SelectedLabel from "../SelectedLabel";
import SelectedFooter from "../SelectedFooter";
import get from "lodash/get";
import style from "./style.module.scss";

const SearchList = withFetch(({data, value, onCancel, onChange}) => {
  if (!(data && data.length > 0)) {
    return <Empty description={<Space direction="vertical">
      <View>暂无结果</View>
      <Button fill="none" color="primary" onClick={onCancel}>返回</Button>
    </Space>}/>;
  }
  return <CheckList multiple value={value || []} onChange={onChange} options={data}/>;
});

const Container = (props) => {
  const [searchText, setSearchText] = useState("");
  const [labelHeight, setLabelHeight] = useState(0);
  const searchRef = useRef(null);
  const [value, onChangeBase] = useState(props.defaultValue && props.valueType === 'all' ? props.defaultValue.map(({value}) => value) : props.defaultValue);
  const onChange = (target) => {
    if (target.length > props.maxLength) {
      showToast({
        icon: 'none', title: `数量不能超过${props.maxLength}`
      });
      return;
    }
    onChangeBase(target);
  };

  return <View className={classnames(style['container'], props.className)} style={labelHeight ? {
    '--label-height': toCSSLength(labelHeight)
  } : {}}>
    {props.getSearchApi &&
      <SearchBar placeholder={props.searchPlaceholder} className={style['search-bar']} ref={searchRef}
                 onSearch={(value) => {
                   setSearchText(value);
                 }} onClear={() => {
        setSearchText('');
      }}/>}
    {searchText && props.getSearchApi ? <ScrollViewVertical className={style['scroller']}>
      <SearchList {...props.getSearchApi(searchText)} value={value} onCancel={() => {
        setSearchText('');
        searchRef.current.clear();
      }} onChange={(target) => {
        setSearchText('');
        onChange(target);
        searchRef.current.clear();
      }}/>
    </ScrollViewVertical> : props.children({value, onChange})}
    <View className={classnames(style['footer'], 'data-select-container-footer')}>
      <SelectedLabel value={value && value.map((id) => {
        const data = props.getTargetItem(id);
        return {value: id, label: data.label};
      })} maxLength={props.maxLength} onResize={(height) => {
        setLabelHeight(height);
      }} onClose={(item) => {
        const index = value.indexOf(item.value);
        if (index < 0) {
          return;
        }
        const newValue = value.slice(0);
        newValue.splice(index, 1);
        onChange(newValue);
      }}/>
      <SelectedFooter onReset={() => {
        onChange([]);
      }} onConfirm={() => {
        props.onChange && props.onChange(value && props.valueType === 'all' ? value.map((value) => {
          const target = props.getTargetItem(value);
          return Object.assign({}, target, {
            value, label: get(target, 'label')
          });
        }) : value);
      }}/>
      {props.hasSafeArea && <SafeArea position="bottom"/>}
    </View>
  </View>
};

export default Container;
