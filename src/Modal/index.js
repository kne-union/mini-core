import React, {useState} from 'react';
import {Button, Grid, Icon, Popup} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import classnames from 'classnames';
import useControlValue from "@kne/use-control-value";
import style from './style.module.scss';

const Modal = ({className, icon, title, content, onCancel, onConfirm, closeOnMaskClick, cancel, confirm, ...props}) => {
    const [open, setOpen] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    return <Popup closeOnMaskClick={closeOnMaskClick} open={open} onOpenChange={setOpen}
                  bodyClassName={classnames(className, style['modal-body'])}
                  position="center"
                  hasSafeArea={false}>
        {title && <View className={style['title']}>{icon}<View className={style['title-content']}>{title}</View></View>}
        <View className={classnames(style['content'], {
            [style['no-title']]: !title
        })}>{content}</View>
        <Grid gap={15} justify="center">
            {cancel && <Grid.Item span={cancel.span || Modal.defaultProps.cancel.span}>
                <Button block onClick={async () => {
                    if ((onCancel && await onCancel()) !== false) {
                        setOpen(false);
                    }
                }}>{cancel.text || Modal.defaultProps.cancel.text}</Button></Grid.Item>}
            {confirm && <Grid.Item span={confirm.span || Modal.defaultProps.confirm.span}>
                <Button block color='primary'
                        onClick={async () => {
                            if ((onConfirm && await onConfirm()) !== false) {
                                setOpen(false);
                            }
                        }}>{confirm.text || Modal.defaultProps.confirm.text}</Button></Grid.Item>}
        </Grid>
    </Popup>
};

Modal.defaultProps = {
    closeOnMaskClick: false,
    icon: <Icon type="warning-tianchong" className="iconfont" color="var(--state-progress)"/>,
    cancel: {span: 12, text: '取消'},
    confirm: {span: 12, text: '确定'},
};

export default Modal;

export const ModalButton = ({children, buttonProps, className, ...props}) => {
    const [open, setOpen] = useState(false);
    console.log(className);
    return <>
        {typeof children === 'function' ? children({open: () => setOpen(true), close: () => setOpen(false)}) :
            <Button {...buttonProps} calssName={className} onClick={() => setOpen(true)}>{children}</Button>}
        <Modal {...props} open={open} onOpenChange={setOpen}/>
    </>
};

ModalButton.defaultProps = {};
