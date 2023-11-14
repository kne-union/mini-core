import React from 'react';
import {View} from '@tarojs/components';
import {Icon, Space} from '@kne/antd-taro';
import style from './style.module.scss';
import classnames from 'classnames';
import {ModalButton} from "../Modal";

const Content = ({className, list}) => {
    return <Space className={classnames(className, style['content'])} direction="vertical" size={8}>
        {list.map(({label, content, tips, action}, index) => {
            return <View key={index} className={style['content-item']}>
                <View className={style['content-label']}>{label}</View>
                <View className={style['content-content']}>
                    {content}{tips && <ModalButton content={tips} confirm={null} cancel={{text: '知道了'}}>
                    {({open}) => <Icon type="tishi" className={classnames('iconfont', style['tips'])} onClick={open}/>}
                </ModalButton>}
                </View>
                {action && <View className={style['content-action']}>{action}</View>}
            </View>
        })}
    </Space>
};

Content.defaultProps = {
    list: []
};

export default Content;
