import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from '@tarojs/components';
import { showToast } from '@tarojs/taro';
import { CheckList, Empty, SearchBar, toCSSLength } from '@kne/antd-taro';
import classnames from 'classnames';
import clone from 'lodash/clone';
import LoadMoreList from '../LoadMoreList';
import SelectedFooter from '../SelectedFooter';
import SelectedLabel from '../SelectedLabel';
import style from './style.module.scss';
import useRefCallback from '@kne/use-ref-callback';

const mappingContext = createContext({});
const { Provider } = mappingContext;

const valueIsTypeAll = item => ['value', 'label'].every(key => item.hasOwnProperty(key));

const MappingProvider = ({ defaultMapping, defaultValue, onChange, valueType, children }) => {
  const [mapping, setMapping] = useState(new Map((defaultMapping || []).map(item => [item.value, item])));
  const appendMapping = useRefCallback(targetMapping => {
    setMapping(mapping => {
      const newMapping = clone(mapping);
      (targetMapping || []).forEach(item => {
        valueIsTypeAll(item) && newMapping.set(item.value, item);
      });
      return newMapping;
    });
  });

  const [value, setValue] = useState((defaultValue || []).map(item => (valueIsTypeAll(item) ? item.value : item)));

  const valueAll = useMemo(() => {
    return value.map(item => mapping.get(item)).filter(item => !!item);
  }, [value, mapping]);

  useEffect(() => {
    appendMapping(defaultValue);
  }, [defaultValue, appendMapping]);

  return (
    <Provider
      value={{
        value,
        valueAll,
        setValue,
        onChange: value => {
          onChange && onChange(valueType === 'all' ? value.map(item => mapping.get(item)).filter(item => !!item) : value);
        },
        mapping,
        appendMapping
      }}
    >
      {children}
    </Provider>
  );
};

const useMapping = () => {
  return useContext(mappingContext);
};

const ListSelectInner = ({ options, maxLength, disabledValues, ...props }) => {
  const { value, setValue, appendMapping, onChange } = useMapping();
  useEffect(() => {
    appendMapping(options);
  }, [options, appendMapping]);
  if (options.length === 0) {
    return <Empty description="暂无选项" />;
  }
  return (
    <CheckList
      {...props}
      value={value}
      onChange={value => {
        if (value.length > maxLength) {
          showToast({
            icon: 'none',
            title: `数量不能超过${maxLength}`
          });
          return;
        }
        setValue(value);
        !props.multiple && onChange(value);
      }}
      options={options.map(item => {
        const formatDisabledValues = typeof disabledValues === 'function' ? disabledValues(item) : disabledValues || [];
        return Object.assign({}, item, formatDisabledValues.indexOf(item.value) > -1 ? { disabled: true } : {});
      })}
    />
  );
};

const ListSelectFooter = ({ maxLength, setLabelHeight, valueType }) => {
  const { valueAll, value, setValue, onChange } = useMapping();
  return (
    <>
      <SelectedLabel
        value={valueAll}
        maxLength={maxLength}
        onResize={height => {
          setLabelHeight(height);
        }}
        onClose={item => {
          setValue(value => {
            const index = value.indexOf(item.value);
            if (index < 0) {
              return value;
            }
            const newValue = value.slice(0);
            newValue.splice(index, 1);
            return newValue;
          });
        }}
      />
      <SelectedFooter
        onReset={() => {
          setValue([]);
        }}
        onConfirm={() => {
          onChange(valueType === 'all' ? valueAll : value);
        }}
      />
    </>
  );
};

const ListSelect = props => {
  const { api, options, defaultValue, className, onChange, valueType, maxLength, multiple, mapping, ...others } = props;
  const [searchText, setSearchText] = useState('');
  const [labelHeight, setLabelHeight] = useState(0);
  return (
    <MappingProvider defaultValue={defaultValue} valueType={valueType} defaultMapping={mapping} onChange={onChange}>
      <View
        className={classnames(className, style['list-select'])}
        style={
          labelHeight
            ? {
                '--label-height': toCSSLength(labelHeight + (api && props.getSearchProps ? 51 : 0))
              }
            : {}
        }
      >
        {api ? (
          <LoadMoreList
            {...api}
            className={style['list-select-scroller']}
            searchText={searchText}
            getSearchProps={props.getSearchProps}
            header={(data, { reload }) =>
              props.getSearchProps && (
                <SearchBar
                  placeholder={props.searchPlaceholder}
                  className={style['search-bar']}
                  onSearch={value => {
                    setSearchText(value);
                    reload(props.getSearchProps(value));
                  }}
                />
              )
            }
            footer={multiple ? <ListSelectFooter setLabelHeight={setLabelHeight} maxLength={maxLength} /> : null}
          >
            {data => <ListSelectInner {...others} multiple={multiple} maxLength={maxLength} options={data} />}
          </LoadMoreList>
        ) : (
          <>
            <ScrollView scrollY className={style['list-select-scroller']}>
              {<ListSelectInner {...others} multiple={multiple} maxLength={maxLength} options={options} />}
            </ScrollView>
            {multiple && <ListSelectFooter setLabelHeight={setLabelHeight} />}
          </>
        )}
      </View>
    </MappingProvider>
  );
};

ListSelect.defaultProps = {
  defaultValue: [],
  multiple: true,
  maxLength: 10
};

export default ListSelect;
