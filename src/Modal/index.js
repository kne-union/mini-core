import React, {useState} from 'react';
import {Button, Grid, Icon, Popup} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import classnames from 'classnames';
import useControlValue from "@kne/use-control-value";
import style from './style.module.scss';

const Modal = ({className, icon, title, content, onCancel, onConfirm, closeOnMaskClick, ...props}) => {
    const [open, setOpen] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    return <Popup closeOnMaskClick={closeOnMaskClick} open={open} onOpenChange={setOpen}
                  bodyClassName={classnames(className, style['modal-body'])}
                  position="center"
                  hasSafeArea={false}>
        {title && <View className={style['title']}>{icon}<View className={style['title-content']}>{title}</View></View>}
        <View className={style['content']}>{content}</View>
        <Grid gap={15}>
            <Grid.Item span={12}><Button block onClick={async () => {
                if ((onCancel && await onCancel()) !== false) {
                    setOpen(false);
                }
            }}>取消</Button></Grid.Item>
            <Grid.Item span={12}><Button block color='primary' onClick={async () => {
                if ((onConfirm && await onConfirm()) !== false) {
                    setOpen(false);
                }
            }}>确定</Button></Grid.Item>
        </Grid>
    </Popup>
};

Modal.defaultProps = {
    closeOnMaskClick: false, icon: <Icon type="warning-tianchong" className="iconfont" color="var(--state-progress)"/>
};

export default Modal;

export const ModalButton = ({children, buttonProps, ...props}) => {
    const [open, setOpen] = useState(false);
    return <>
        {typeof children === 'function' ? children({open: () => setOpen(true), close: () => setOpen(false)}) :
            <Button {...buttonProps} onClick={() => setOpen(true)}>{children}</Button>}
        <Modal {...props} open={open} onOpenChange={setOpen}/>
    </>
};

ModalButton.defaultProps = {};
