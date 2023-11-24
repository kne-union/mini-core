import React, {useState, useMemo, createContext, useContext, useEffect} from 'react';
import {View, ScrollView} from '@tarojs/components';
import {showToast} from '@tarojs/taro';
import {CheckList, toCSSLength, SearchBar} from '@kne/antd-taro';
import classnames from 'classnames';
import {Empty} from '@kne/antd-taro';
import clone from 'lodash/clone';
import LoadMoreList from '../LoadMoreList';
import SelectedFooter from '../SelectedFooter';
import SelectedLabel from '../SelectedLabel';
import style from './style.module.scss';
import useRefCallback from "@kne/use-ref-callback";

const mappingContext = createContext({});
const {Provider} = mappingContext;

const MappingProvider = ({children}) => {
  const [mapping, setMapping] = useState(new Map());
  const appendMapping = useRefCallback((targetMapping) => {
    setMapping((mapping) => {
      const newMapping = clone(mapping);
      targetMapping.forEach((item) => {
        newMapping.set(item.value, item);
      });
      return newMapping;
    });
  });
  return <Provider value={{
    mapping, appendMapping
  }}>{children}</Provider>
};

const useMapping = () => {
  return useContext(mappingContext);
};

const ListSelectInner = ({options, value, setValue, maxLength, valueType, ...props}) => {
  const {mapping: optionsMapping, appendMapping} = useMapping();
  useEffect(() => {
    if (valueType === 'all') {
      appendMapping(value);
    }
  }, [value, valueType, appendMapping]);
  useEffect(() => {
    appendMapping(options);
  }, [options, appendMapping]);
  if (options.length === 0) {
    return <Empty description="暂无选项"/>
  }
  return <CheckList {...props} value={value && valueType === 'all' ? value.map(({value}) => value) : value}
                    onChange={(value) => {
                      if (value.length > maxLength) {
                        showToast({
                          icon: 'none', title: `数量不能超过${maxLength}`
                        });
                        return;
                      }
                      setValue(valueType === 'all' ? value.map((value) => optionsMapping.get(value)).filter((item) => !!item) : value);
                    }} options={options}/>
};

const ListSelectFooter = ({options, maxLength, setLabelHeight, setValue, onChange, value, valueType}) => {
  const {mapping: optionsMapping} = useMapping();
  return <>
    <SelectedLabel
      value={(value || []).map((value) => valueType === 'all' ? value : optionsMapping.get(value))}
      maxLength={maxLength} onResize={(height) => {
      setLabelHeight(height);
    }} onClose={(item) => {
      const index = value.indexOf(item);
      if (index < 0) {
        return;
      }
      const newValue = value.slice(0);
      newValue.splice(index, 1);
      setValue(newValue);
    }}/>
    <SelectedFooter onReset={() => {
      setValue([]);
    }} onConfirm={() => {
      onChange(value);
    }}/>
  </>
};

const ListSelect = (props) => {
  const {api, options, defaultValue, className, onChange, valueType, maxLength, multiple, ...others} = props;
  const [searchText, setSearchText] = useState('');
  const [value, setValue] = useState(defaultValue);
  const [labelHeight, setLabelHeight] = useState(0);
  return <MappingProvider>
    <View className={classnames(className, style['list-select'])} style={labelHeight ? {
    '--label-height': toCSSLength(labelHeight + (api && props.getSearchProps ? 51 : 0))
  } : {}}>
    {api ? <LoadMoreList {...api} className={style['list-select-scroller']} searchText={searchText}
                         getSearchProps={props.getSearchProps}
                         header={(data, {reload}) => props.getSearchProps &&
                           <SearchBar placeholder={props.searchPlaceholder} className={style['search-bar']} onSearch={(value) => {
                             setSearchText(value);
                             reload(props.getSearchProps(value));
                           }}/>}
                         footer={multiple ? (data) => <ListSelectFooter
                           options={data}
                           setLabelHeight={setLabelHeight}
                           value={value}
                           maxLength={maxLength} setValue={setValue}
                           valueType={valueType}
                           onChange={onChange}/> : null}>
      {(data) => <ListSelectInner {...others} multiple={multiple} maxLength={maxLength} options={data} value={value}
                                  setValue={multiple ? setValue : onChange}
                                  valueType={valueType}/>}
    </LoadMoreList> : <>
      <ScrollView scrollY className={style['list-select-scroller']}>
        {
          <ListSelectInner
            {...others}
            multiple={multiple}
            maxLength={maxLength}
            options={options} value={value}
            setValue={multiple ? setValue : onChange}
            valueType={valueType}
          />
        }
      </ScrollView>
      {multiple && <ListSelectFooter
        options={options}
        setLabelHeight={setLabelHeight}
        value={value}
        maxLength={maxLength}
        setValue={setValue} valueType={valueType}
        onChange={onChange}/>}
    </>}
  </View></MappingProvider>
};

ListSelect.defaultProps = {
  defaultValue: [], multiple: true, maxLength: 10
};

export default ListSelect;
