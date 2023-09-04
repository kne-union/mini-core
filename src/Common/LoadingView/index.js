import React from 'react';
import classnames from 'classnames';
import {View} from '@tarojs/components';
import style from './style.module.scss';

const LoadingView = (props) => {
    return <View className={classnames(props.className, style['loading-view'])}>{props.children}</View>
};

LoadingView.defaultProps = {
    children: '正在加载中...'
};

export default LoadingView;
