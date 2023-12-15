import style from './style.module.scss';
import classnames from 'classnames';
import {View} from "@tarojs/components";
import {DotLoading, SafeArea, toCSSLength, useBoundingClientRect} from "@kne/antd-taro";
import useControlValue from '@kne/use-control-value';
import React, {useState} from "react";

export const FixedView = ({
                              className, children, direction, fixed, noPadding, hasSafeArea, fixBottomExtra, ...props
                          }) => {
    const [height, setHeight] = useState(0);
    const containerId = useBoundingClientRect((rect) => {
        setHeight(rect.height);
    });
    return <>
        <View {...props} className={classnames(style['fixed-view'], className, {
            [style['no-padding']]: noPadding,
        })}>
            <View style={{height: toCSSLength(height)}}/>
            {hasSafeArea && <SafeArea position="bottom"/>}
        </View>
        <View
            {...props}
            className={classnames(style['fixed-view'], className, {
                [style['no-padding']]: noPadding, [style["fixed"]]: !!fixed
            })}>
            <View id={containerId}>
                <View className={classnames(style['flex'], 'fixed-view-container', {
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

FixedView.defaultProps = {
    fixed: true, hasSafeArea: true, noPadding: false
};

export const FixedButton = ({
                                block, onClick, type, fixedOpen, children, className, disabled, size, loading, ...props
                            }) => {
    return <View
        {...props}
        onClick={onClick}
        className={classnames(style['btn'], {
            [style[size]]: size,
            [style['block']]: block,
            [style[type]]: type,
            [style['fixed']]: fixedOpen,
            [style['disabled']]: disabled,
            [style['loading']]: loading
        }, className)}>
        {loading ? (<View className={style['loading-wrapper']}>
            <DotLoading/>
        </View>) : children}
        <SafeArea/>
    </View>
}

export const FixedLoadingButton = ({onClick, children, ...props}) => {
    const [isLoading, setIsLoading] = useControlValue({value: props.loading});

    return <FixedButton {...props} loading={isLoading} onClick={(...args) => {
        setIsLoading(true);
        Promise.resolve(onClick && onClick(...args)).then(() => {
            setIsLoading(false);
        });
    }}>{typeof children === "function" ? children(isLoading) : children}</FixedButton>;
};

export default FixedView
