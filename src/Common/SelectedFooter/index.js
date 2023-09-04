import React from "react";
import {Grid, Button} from '@kne/antd-taro';
import style from "./style.module.scss";
import classnames from "classnames";

const SelectedFooter = (props) => {
  return (<Grid gap={16} className={classnames(style['selected-footer'], props.className)}>
    {props.showReset && <Grid.Item span={props.showConfirm && props.showReset ? 12 : 24}><Button block onClick={props.onReset}>{props.resetText}</Button></Grid.Item>}
    {props.showConfirm && <Grid.Item span={props.showConfirm && props.showReset ? 12 : 24}><Button color='primary' fill='solid' block
                                                       onClick={props.onConfirm}>{props.confirmText}</Button></Grid.Item>}
  </Grid>);
};

SelectedFooter.defaultProps = {
  showReset: true,
  showConfirm: true,
  confirmText: '确定',
  resetText: '重置'
}

export default SelectedFooter;
