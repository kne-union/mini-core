import {Icon} from "@kne/antd-taro";
import classnames from "classnames";
import {ModalButton} from "../Modal";
import React from "react";
import style from './style.module.scss';
const TipsMessage=({className,...props})=>{
  return <ModalButton  {...props} className={classnames(className,style['tips-message'])} confirm={null} cancel={{text: '知道了'}}>
    <Icon type="tishi" className={classnames('iconfont', style['tips'])} />
  </ModalButton>
};

export default TipsMessage;