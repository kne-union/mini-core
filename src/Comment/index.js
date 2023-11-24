import React from 'react';
import {Space} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import dayjs from 'dayjs';
import classnames from 'classnames';
import style from './style.module.scss';

const Comment = ({className, user, title, action, time, timeFormat, children, extra}) => {
    return <Space direction="vertical" className={classnames(className, style['comment'])}>
        <View className={style['comment-header']}>
            <View className={style['comment-user']}>{user.name}</View>
            <View className={style['comment-title']}>{title}</View>
            <View className={style['comment-time']}>{time && dayjs(time).format(timeFormat)}</View>
        </View>
        <View className={style['comment-message']}>
            <View className={style['comment-content']}>{children}</View>
            {action && <View className={style['comment-action']}>{action}</View>}
        </View>
        {extra && <View className={style['comment-extra']}>{extra}</View>}
    </Space>
};

Comment.defaultProps = {
    title: '添加了评论', timeFormat: 'YYYY-MM-DD HH:mm:ss'
};

export default Comment;
