import {Popup} from "@kne/antd-taro";
import PopupView from '../../PopupView';
import React from "react";
import classnames from 'classnames';
import style from './style.module.scss';

const withFormPopup = (WrappedComponent) => ({open, onClose, title, onChange, catchMove, ...props}) => {
    return <Popup bodyClassName={classnames("react-form__popup", style['component-body'], props.className)}
                  isRootPortal={false}
                  catchMove={catchMove} open={open} position="right" hasSafeArea={false}>
        <PopupView title={title || props.placeholder} open={open} onClose={onClose}>
            <WrappedComponent {...props} onChange={(target) => {
                onClose();
                onChange && onChange(target);
            }}/>
        </PopupView>
    </Popup>
};

export default withFormPopup;
