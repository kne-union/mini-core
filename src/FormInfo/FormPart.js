import React, { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { List } from '@kne/antd-taro';
import classnames from 'classnames';
import { useFormContext } from '@kne/react-form-antd-taro';
import { View } from '@tarojs/components';
import groupBy from 'lodash/groupBy';
import { ListTitle } from '../Common';
import style from './style.module.scss';
import useRefCallback from '@kne/use-ref-callback';
import isEqual from 'lodash/isEqual';
import TipsMessage from '../TipsMessage';

const propsEqual = (target, origin) => {
  if (typeof target === 'function' && typeof target === 'function') {
    return true;
  }

  if (Array.isArray(target) && Array.isArray(origin) && target.length === origin.length) {
    return target.every((item, index) => propsEqual(item, origin[index]));
  }

  if (target && origin && typeof target === 'object' && typeof origin === 'object' && isEqual(Object.keys(target), Object.keys(origin))) {
    return Object.keys(target).every(key => propsEqual(target[key], origin[key]));
  }

  return isEqual(target, origin);
};

const FormItemRenderer = ({ type, onChange, ...props }) => {
  const prePropsRef = useRef(null);
  const handlerChange = useRefCallback(onChange);
  const render = useRefCallback(() => {
    prePropsRef.current = props;
    return createElement(type, Object.assign({}, props, { onChange: handlerChange }));
  });
  const [formItem, setFormItem] = useState(render);

  useEffect(() => {
    if (!propsEqual(props, prePropsRef.current)) {
      setFormItem(render());
    }
  }, [props, render]);

  return formItem;
};

const FormPart = ({ list, groupOptions, ...props }) => {
  const context = useFormContext();
  const formData = context.formData;
  const openApiRef = useRef(null);
  openApiRef.current = context.openApi;

  const formApi = useMemo(() => {
    return { formData, groupOptions, openApi: openApiRef.current };
  }, [formData, groupOptions]);

  const targetList = typeof list === 'function' ? list(formApi) : list;

  const { displayList, hiddenList } = useMemo(() => {
    return groupBy(
      targetList.filter(item => {
        if (typeof item.props.display === 'function') {
          return item.props.display(formApi);
        }
        return item.props.display !== false;
      }),
      item => {
        return item.props.hidden ? 'hiddenList' : 'displayList';
      }
    );
  }, [targetList, formApi]);

  const renderItem = (item, index) => {
    const key = item.props.name || (groupOptions ? groupOptions.id : '') || index;
    const targetProps = {},
      componentProps = Object.assign({}, item.props);
    ['display', 'hidden', 'setExtraProps'].forEach(key => {
      if (item.props.hasOwnProperty(key)) {
        targetProps[key] = item.props[key];
      }
      delete componentProps[key];
    });
    if (targetProps.hasOwnProperty('isBlock')) {
      componentProps['block'] = targetProps.isBlock;
    }

    const itemProps = Object.assign(
      {},
      componentProps,
      typeof targetProps.setExtraProps === 'function'
        ? targetProps.setExtraProps({
            props: componentProps,
            contextApi: formApi
          })
        : {}
    );

    return (
      <FormItemRenderer
        key={key}
        type={item.type}
        {...Object.assign(
          {},
          itemProps,
          itemProps.labelTips
            ? {
                labelTips: () => <TipsMessage title={itemProps.label} content={itemProps.labelTips} />
              }
            : {}
        )}
        onChange={(...args) => {
          return item.props.onChange && item.props.onChange(...args, formApi);
        }}
      />
    );
  };

  return (
    <>
      {props.title && (
        <ListTitle subtitle={props.subtitle} isSubheading={props.isSubheading} extra={props.extra}>
          {props.title}
        </ListTitle>
      )}
      <View style={{ display: 'none' }}>{(hiddenList || []).map(renderItem)}</View>
      <List className={classnames('react-form', 'form-part', style['form-part'], props.className)}>{(displayList || []).map(renderItem)}</List>
      <View
        className={classnames(style['list-item-split'], 'form-part-list-split', {
          'bg-split': props.isSubheading || props.title
        })}
      />
    </>
  );
};

export default FormPart;
