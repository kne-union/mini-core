import React from 'react';
import {View} from '@tarojs/components';
import {Icon, Space} from '@kne/antd-taro';
import style from './style.module.scss';
import classnames from 'classnames';
import {ModalButton} from "../Modal";
import isNil from 'lodash/isNil';

const Content = ({className, empty, list}) => {
    return <Space className={classnames(className, style['content'])} direction="vertical" size={8}>
        {list.filter((item) => {
            if (typeof item.display === "function") {
                return item.display();
            }
            return item.display !== false;
        }).map(({label, content, block, tips, action}, index) => {
            return <View key={index} className={classnames(style['content-item'], {
                [style['is-block']]: block
            })}>
                <View className={style['content-label']}>{label}</View>
                <View className={style['content-content']}>
                    {empty && isNil(content) ? empty : content}
                    {tips && <ModalButton content={tips} confirm={null} cancel={{text: '知道了'}}>
                        {({open}) => <Icon type="tishi" className={classnames('iconfont', style['tips'])}
                                           onClick={open}/>}
                    </ModalButton>}
                </View>
                {action && <View className={style['content-action']}>{action}</View>}
            </View>
        })}
    </Space>
};

Content.defaultProps = {
    empty: '-', list: []
};

export default Content;
