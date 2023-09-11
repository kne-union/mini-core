import React from 'react';
import style from "./style.module.scss";
import {View} from "@tarojs/components";
import classnames from "classnames";

const WeekTitle = () => {
    return <View className={classnames(style['week-item'],style['week-title'])}>
        {['一', '二', '三', '四', '五', '六', '日'].map((target) => {
            return <View key={target} className={classnames(style['date-cell'], style['cell-title'])}><View
                className={style['date-item']}>{target}</View></View>
        })}
    </View>;
};

export default WeekTitle;
