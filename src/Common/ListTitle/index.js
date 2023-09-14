import React from 'react';
import {View} from '@tarojs/components';
import style from './style.module.scss';
import classnames from 'classnames';

const ListTitle = ({className, subtitle, isSubheading, extra, children}) => {
    return <View className={classnames(style['list-title'], className, {
        [style['is-sub']]: isSubheading
    })}>
        <View className={style['title']}>
            <View className={style['main-title']}>{children}</View>
            {subtitle && <View className={style['subtitle']}>{subtitle}</View>}
        </View>
        {extra && <View className={style['extra']}>{extra}</View>}
    </View>
};

export default ListTitle;
