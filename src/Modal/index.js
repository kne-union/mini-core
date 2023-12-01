import React, {useState} from 'react';
import {Button, Grid, Icon, Popup} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import {usePopup} from '../PopupView';
import classnames from 'classnames';
import useControlValue from "@kne/use-control-value";
import style from './style.module.scss';

const ModalInner = ({title, icon, content, cancel, onCancel, confirm, onConfirm, onClose}) => {
    return <>
        {title && <View className={style['title']}>{icon}<View className={style['title-content']}>{title}</View></View>}
        <View className={classnames(style['content'], {
            [style['no-title']]: !title
        })}>{content}</View>
        <Grid gap={15} justify="center">
            {cancel && <Grid.Item span={cancel.span || ModalInner.defaultProps.cancel.span}>
                <Button block onClick={async () => {
                    if ((onCancel && await onCancel()) !== false) {
                        onClose();
                    }
                }}>{cancel.text || ModalInner.defaultProps.cancel.text}</Button></Grid.Item>}
            {confirm && <Grid.Item span={confirm.span || ModalInner.defaultProps.confirm.span}>
                <Button block color='primary'
                        onClick={async () => {
                            if ((onConfirm && await onConfirm()) !== false) {
                                onClose();
                            }
                        }}>{confirm.text || ModalInner.defaultProps.confirm.text}</Button></Grid.Item>}
        </Grid>
    </>
};

ModalInner.defaultProps = {
    icon: <Icon type="warning-tianchong" className="iconfont" color="var(--state-progress)"/>,
    cancel: {span: 12, text: '取消'},
    confirm: {span: 12, text: '确定'},
};

const Modal = ({className, closeOnMaskClick, ...props}) => {
    const [open, setOpen] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    return <Popup closeOnMaskClick={closeOnMaskClick} open={open} onOpenChange={setOpen}
                  bodyClassName={classnames(className, style['modal-body'])}
                  position="center"
                  hasSafeArea={false}>
        <ModalInner {...props} onClose={() => {
            setOpen(false);
        }}/>
    </Popup>
};

Modal.defaultProps = {
    closeOnMaskClick: false,
};

export default Modal;

export const useModal = (options) => {
    const popup = usePopup(Object.assign({}, {closeOnMaskClick: false}, options, {
        position: 'center', hasSafeArea: false, bodyClassName: classnames(options?.className, style['modal-body']),
    }));

    return ({children, ...props}) => {
        const onClose = () => {
            apis.close();
        };
        const apis = popup(<ModalInner {...props} open onClose={onClose}>
            {typeof children === 'function' ? children({
                close: onClose
            }) : children}
        </ModalInner>);

        return apis;
    }
};

export const ModalButton = ({children, buttonProps, className, ...props}) => {
    const [open, setOpen] = useState(false);
    return <>
        {typeof children === 'function' ? children({open: () => setOpen(true), close: () => setOpen(false)}) :
            <Button {...buttonProps} className={className} onClick={() => setOpen(true)}>{children}</Button>}
        <Modal {...props} open={open} onOpenChange={setOpen}/>
    </>
};

ModalButton.defaultProps = {};
