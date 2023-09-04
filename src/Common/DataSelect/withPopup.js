import {NavBar, Popup, toCSSLength} from "@kne/antd-taro";
import React, {useState} from "react";
import HeaderContainer from "../../HeaderContainer";
import classnames from 'classnames';
import style from './style.module.scss';

const withFormPopup = (WrappedComponent) => ({open, onClose, title, placeholder, onChange, catchMove, ...props}) => {
  const [headerHeight, setHeaderHeight] = useState();
  return <Popup bodyClassName={classnames("react-form__popup", style['component-body'], props.className)}
                catchMove={catchMove}
                bodyStyle={headerHeight ? {
                  '--header-container-height': toCSSLength(headerHeight)
                } : {}} open={open} onClose={onClose} position="right" hasSafeArea={false}>
    <HeaderContainer onHeightChange={(height) => {
      setHeaderHeight(height);
    }}>
      <NavBar onBack={onClose}>{title || placeholder}</NavBar>
    </HeaderContainer>
    {open && <WrappedComponent {...props} onChange={(target) => {
      onClose();
      onChange && onChange(target);
    }}/>}
  </Popup>
};

export default withFormPopup;
