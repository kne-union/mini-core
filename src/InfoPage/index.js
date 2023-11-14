import React from 'react';
import {Card, Collapse as AntdCollapse} from "@kne/antd-taro";
import {View} from '@tarojs/components';
import classnames from "classnames";
import style from "./style.module.scss";

const Collapse = ({className, ...props}) => {
    return <AntdCollapse {...props} className={classnames(className, style['collapse'])}
                         defaultActiveKey={props.items.map(({key}) => key)}/>
};

const Part = ({className, title, extra, children, ...props}) => {
    return (<Card
        className={classnames(style["part"], className, {
            "no-title": !title,
        })}
        bordered={false}
        title={title}
        extra={extra}
        {...props}
    >
        {children}
    </Card>);
};

const InfoPage = ({className, children}) => {
    return (<View className={classnames(className, style['info-page'])}>
        {children}
    </View>);
};

InfoPage.Part = Part;
InfoPage.Collapse = Collapse;
export default InfoPage;
