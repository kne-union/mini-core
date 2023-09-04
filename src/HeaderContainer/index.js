import React, {useRef, useEffect, useState} from 'react';
import style from './style.module.scss';
import {toCSSLength, useBoundingClientRect} from '@kne/antd-taro';
import useRefCallback from "@kne/use-ref-callback";
import Taro from "@tarojs/taro";
import {View} from '@tarojs/components';
import classnames from 'classnames';

const HeaderContainer = ({bgColor, extra, children, className, onHeightChange, ...props}) => {
  const [menuRect] = useState(() => Taro.getMenuButtonBoundingClientRect());
  const [height, setHeight] = useState(menuRect.top + menuRect.height);
  const handlerHeightChange = useRefCallback(onHeightChange);
  useEffect(() => {
    handlerHeightChange(height);
  }, [height, handlerHeightChange]);
  const ref = useRef(null);
  const containerId = useBoundingClientRect((rect) => {
    setHeight(rect.height);
  });
  return <>
    <View {...props} id={containerId} ref={ref}
          className={classnames(style['header-container'], 'header-container', className)}
          style={Object.assign({
            '--header-title-top': toCSSLength(menuRect.top),
            '--header-title-height': toCSSLength(menuRect.height),
            '--header-container-height': toCSSLength(height)
          }, bgColor ? {'--header-bg-color': bgColor} : {})}>
      <View className={style['header-title']}>{children}</View>
      {extra}
    </View>
    <View className={classnames(style['header-container-padding'], 'header-container-padding')}
          style={{height: toCSSLength(height)}}/>
  </>;
};

export default HeaderContainer;
