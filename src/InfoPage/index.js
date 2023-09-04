import React from 'react';
import {Card, Space} from "@kne/antd-taro";
import classnames from "classnames";
import style from "./style.module.scss";

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
    return (<Space className={className} direction="vertical" size={24}>
        {children}
    </Space>);
};

InfoPage.Part = Part;
export default InfoPage;
