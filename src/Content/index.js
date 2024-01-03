import React from 'react';
import {View} from '@tarojs/components';
import {Space} from '@kne/antd-taro';
import style from './style.module.scss';
import classnames from 'classnames';
import isNil from 'lodash/isNil';
import TipsMessage from '../TipsMessage';

const Content = ({className, empty, list}) => {
    return <Space className={classnames(className, style['content'])} direction="vertical" size={8}>
        {list.filter((item) => {
            if (typeof item.display === "function") {
                return item.display();
            }
            return item.display !== false;
        }).map(({label, content, block, tips, action}, index) => {
            return <View key={index} className={classnames(style['content-item'], 'content-item', {
                [style['is-block']]: block
            })}>
                <View className={classnames(style['content-label'], 'content-label')}>{label}</View>
                <View className={classnames(style['content-value'], 'content-value')}>
                    {empty && isNil(content) ? empty : content}
                    {tips && <TipsMessage {...Object.assign({}, typeof tips === 'string' ? {
                        content: tips, title: label
                    } : tips)}/>}
                </View>
                {action && <View className={classnames(style['content-action'], 'content-action')}>{action}</View>}
            </View>
        })}
    </Space>
};

Content.defaultProps = {
    empty: '-', list: []
};

export default Content;
