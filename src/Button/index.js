import style from './style.module.scss';
import classnames from 'classnames';
import {View} from "@tarojs/components";
import {DotLoading, SafeArea, toCSSLength, useBoundingClientRect} from "@kne/antd-taro";
import useControlValue from '@kne/use-control-value';
import React,{useState} from "react";

export const FixView = ({children, direction, fixed, noPadding, hasSafeArea, fixBottomExtra, ...props}) => {
  const [height, setHeight] = useState(0);
  const containerId = useBoundingClientRect((rect) => {
    setHeight(rect.height);
  });
  return <>
    <View {...props} className={classnames(style['fixed-view'], {
      [style['no-padding']]: noPadding,
    })}>
      <View style={{height: toCSSLength(height)}}/>
      {hasSafeArea && <SafeArea position="bottom"/>}
    </View>
    <View
      {...props}
      className={classnames(style['fixed-view'], {
        [style['no-padding']]: noPadding, [style["fixed"]]: !!fixed
      })}>
      <View id={containerId}>
        <View className={classnames(style['flex'], {
          [style[direction]]: !!direction
        })}>
          {children}
        </View>
        {fixBottomExtra}
      </View>
      {hasSafeArea && <SafeArea position="bottom"/>}
    </View>
  </>
};

FixView.defaultProps = {
  fixed: true, hasSafeArea: true, noPadding: false
};

const Button = ({block, onClick, type, isFix, children, className, disabled, size, loading, ...props}) => {
  return <View
    {...props}
    onClick={onClick}
    className={classnames(style['btn'], {
      [style[size]]: size,
      [style['block']]: block,
      [style[type]]: type,
      [style['fixed']]: isFix,
      [style['disabled']]: disabled,
      [style['loading']]: loading
    }, className)}>
    {loading ? (<View className={style['loading-wrapper']}>
      <DotLoading/>
    </View>) : children}
    <SafeArea/>
  </View>
}

export const LoadingButton = ({onClick, children, ...props}) => {
  const [isLoading, setIsLoading] = useControlValue({value: props.loading});

  return <Button {...props} loading={isLoading} onClick={(...args) => {
    setIsLoading(true);
    Promise.resolve(onClick && onClick(...args)).then(() => {
      setIsLoading(false);
    });
  }}>{typeof children === "function" ? children(isLoading) : children}</Button>;
};

export default Button
