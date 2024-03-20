import style from './style.module.scss';
import React from 'react';
import {Space, SearchBar} from '@kne/antd-taro';
import StateBar from './StateBar';
import OptionsBar from './OptionsBar';
import {Provider, useContext} from './context';
import classnames from 'classnames';

const Filter = (props) => {
  return <Provider value={{
    filter: props.filter, onChange: props.onChange
  }}>
    <Space direction="vertical" className={classnames(style['filter'], props.className)}>
      {props.children}
    </Space>
  </Provider>;
};

export default Filter;

const withFilter = (WrappedComponent, others) => ({name, ...props}) => {
  const {filter, onChange} = useContext();
  const mergedOthers = Object.assign({value: 'value', onChange: 'onChange'}, others);
  return <WrappedComponent {...Object.assign({}, props, {
    [mergedOthers.value]: filter[name], [mergedOthers.onChange]: (value) => {
      onChange(Object.assign({}, filter, {[name]: value}));
      props.onChange && props.onChange(value);
    }
  })}/>
};

Filter.SearchBar = withFilter((props) => {
  return <SearchBar onSearch={props.onChange} placeholder={props.searchPlaceholder}/>
});

Filter.StateBar = withFilter(StateBar, {value: 'activeKey'});

Filter.OptionsBar = withFilter(OptionsBar);
