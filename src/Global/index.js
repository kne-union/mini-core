import './dayjsPlugins';
import './common.scss';
import style from './style.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { eventCenter, useLaunch } from '@tarojs/taro';
import { PageMeta, View } from '@tarojs/components';
import get from 'lodash/get';
import { Provider, useGlobalContext as useContext } from '@kne/global-context';
import classnames from 'classnames';
import { PAGE_NO_SCROLL_CHANGE } from '@kne/antd-taro';
import useRefCallback from '@kne/use-ref-callback';
import { stateColors, warningColors } from '../Common';
import transform from 'lodash/transform';
import merge from 'lodash/merge';

export const useGlobalContext = globalKey => {
  const contextValue = useContext();

  const setGlobal = useRefCallback(value => {
    contextValue.setGlobal(
      typeof value === 'function'
        ? global => {
            return Object.assign({}, global, {
              [globalKey]: value(get(global, globalKey))
            });
          }
        : Object.assign({}, contextValue.global, {
            [globalKey]: value
          })
    );
  });

  return Object.assign(
    {
      global: {},
      setGlobal: () => {
        console.warn('调用setGlobal的组件应该被放置在Global上下文中');
      }
    },
    contextValue,
    globalKey
      ? {
          global: get(contextValue.global, globalKey),
          setGlobal
        }
      : {}
  );
};

export const SetGlobal = ({ globalKey, value, needReady, children }) => {
  const { global, setGlobal } = useGlobalContext(globalKey);
  const setGlobalHandler = useRefCallback(setGlobal);

  useEffect(() => {
    setGlobalHandler(value);
  }, [value, setGlobalHandler]);

  if (needReady && !global) {
    return null;
  }

  return children;
};

export const GetGlobal = ({ globalKey, children }) => {
  const { global } = useGlobalContext(globalKey);
  return children({ value: global });
};

export const usePreset = () => {
  const contextValue = useContext();
  return get(contextValue, 'preset', {});
};

const Global = ({ preset, children, ...props }) => {
  const basePreset = usePreset();
  const globalRef = useRef({});
  const [global, setGlobal] = useState(Object.assign({}, { globalRef }, get(preset, 'global')));
  useLaunch(() => {
    console.log('App launched.');
  }, []);
  return (
    <Provider
      value={{
        ...props,
        preset: merge({}, basePreset, preset),
        global,
        setGlobal
      }}
    >
      {children}
    </Provider>
  );
};

export const GlobalStyle = props => {
  const { setGlobal } = useGlobalContext(PAGE_NO_SCROLL_CHANGE);
  useEffect(() => {
    eventCenter.on(PAGE_NO_SCROLL_CHANGE, open => {
      setGlobal(open);
    });
  }, [setGlobal]);
  return (
    <View className={classnames(style['container'], props.className)}>
      <PageMeta
        pageStyle={Object.assign(
          {},
          transform(
            stateColors,
            (result, value, key) => {
              result[`--state-${key}`] = value;
              result[`--state-${key}-06`] = value + '0F';
            },
            {}
          ),
          transform(
            warningColors,
            (result, value, key) => {
              result[`--warning-${key}`] = value;
              result[`--warning-${key}-06`] = value + '0F';
            },
            {}
          )
        )}
      />
      {props.children}
    </View>
  );
};

export default Global;
