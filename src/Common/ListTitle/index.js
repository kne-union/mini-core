import React from 'react';
import {View} from '@tarojs/components';
import style from './style.module.scss';

const ListTitle = ({subtitle, extra, children}) => {
    return <View className={style['list-title']}>
        <View className={style['title']}>
            {children}
            {subtitle && <View className={style['subtitle']}>{subtitle}</View>}
        </View>
        {extra && <View className={style['extra']}>{extra}</View>}
    </View>
};

export default ListTitle;
