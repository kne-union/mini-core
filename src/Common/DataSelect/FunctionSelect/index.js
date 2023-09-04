import React from "react";
import DataSelect, {DataEnum} from '../DataSelect';
import {withFetch} from "@kne/react-fetch";
import {usePreset} from "../../../Global";
import style from "../style.module.scss";
import get from "lodash/get";
import ScrollViewVertical from "../../ScrollViewVertical";
import {Collapse, Selector} from '@kne/antd-taro';
import functionStyle from './style.module.scss';


const FunctionSelectInner = withFetch((props) => {
  return <DataSelect
    {...props}
    searchFilter={(item) => item.level === '3'}
    renderDetail={({treeMapping, menuKey, value, onChange}) => <ScrollViewVertical
      className={style['scroller']}>
      <Collapse
        key={menuKey}
        className={functionStyle['collapse']}
        defaultActiveKey={[get(treeMapping.get(menuKey), 'children[0].id')]}
        items={
          (get(treeMapping.get(menuKey), 'children') || [])
            .map(({
                    id, label, children
                  }) => {
              return {
                key: id,
                title: label,
                children: <Selector
                  multiple
                  value={value}
                  onChange={onChange}
                  options={(children || []).map(({id, label}) => {
                    return {
                      value: id, label
                    };
                  })}/>
              };
            })}
      />
    </ScrollViewVertical>}/>
});

FunctionSelectInner.defaultProps = {
  searchPlaceholder: '搜索职能'
};

const FunctionSelect = (props) => {
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, props.apis);
  return <FunctionSelectInner {...props} {...apis.staticData.functionData} transformData={({data}) => data}/>
};

export const FunctionEnum = ({apis: currentApis, ...props}) => {
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, currentApis);
  return <DataEnum {...apis.staticData.functionData} type="function" transformData={({data}) => data} {...props}/>
};

export default FunctionSelect;
