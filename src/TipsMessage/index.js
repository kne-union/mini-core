import {Icon, Button} from "@kne/antd-taro";
import classnames from "classnames";
import {useModal} from "../Modal";
import React from "react";
import style from './style.module.scss';

const TipsMessage = ({className, ...props}) => {
    const modal = useModal();
    return <Button onClick={() => {
        modal(Object.assign({}, {
            confirm: null, cancel: {text: '知道了'}
        }, props));
    }} className={classnames(className, style['tips-message'])}>
        <Icon type="tishi" className={classnames('iconfont', style['tips'])}/>
    </Button>
};

export default TipsMessage;
