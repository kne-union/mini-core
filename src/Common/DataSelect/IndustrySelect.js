import React from "react";
import DataSelect, {DataEnum} from './DataSelect';
import {withFetch} from "@kne/react-fetch";
import {usePreset} from "../../Global";
import style from "./style.module.scss";
import get from "lodash/get";
import ScrollViewVertical from "../ScrollViewVertical";
import {Selector} from '@kne/antd-taro';
import {View} from "@tarojs/components";

const IndustrySelectInner = withFetch((props) => {
  return <DataSelect {...props} searchFilter={(item) => item.level === '1'} renderDetail={({treeMapping, mapping, menuKey, value, onChange}) => <>
    <View className={style["title"]}>
      {get(mapping.get(menuKey), 'label')}
    </View>
    <ScrollViewVertical className={style['with-title-scroller']}>
      <Selector multiple value={value} onChange={onChange}
                options={(get(treeMapping.get(menuKey), 'children') || []).map(({id, label}) => {
                  return {
                    value: id, label
                  };
                })}/>
    </ScrollViewVertical>
  </>}/>
});

IndustrySelectInner.defaultProps = {
  searchPlaceholder: '搜索行业'
};

const IndustrySelect = (props) => {
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, props.apis);
  return <IndustrySelectInner {...props} {...apis.staticData.industryData} transformData={({data}) => data.slice(1)}/>
};

export const IndustryEnum = ({apis: currentApis, ...props}) => {
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, currentApis);
  return <DataEnum {...apis.staticData.industryData} type="industry" transformData={({data}) => data} {...props}/>
};

export default IndustrySelect;
