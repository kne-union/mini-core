import React, {useState} from 'react';
import HeaderContainer from '../HeaderContainer';
import FixedView from '../FixedView';
import {NavBar, Popup, toCSSLength} from '@kne/antd-taro';
import useControlValue from "@kne/use-control-value";
import Form from './Form';
import classnames from 'classnames';
import style from './style.module.scss';

const PopupForm = ({
                       className, bodyClassName, isRootPortal, children, footer, navTitle, formProps, position, ...props
                   }) => {
    const [active, setActive] = useControlValue(props, {
        defaultValue: 'defaultOpen', value: 'open', onChange: 'onOpenChange'
    });
    const [headerHeight, setHeaderHeight] = useState();
    return <Popup isRootPortal={isRootPortal} className={className} open={active} onOpenChange={setActive}
                  position={position} bodyClassName={classnames(bodyClassName, style['popup-form-body'])}
                  hasSafeArea={false} bodyStyle={headerHeight ? {
        '--header-container-height': toCSSLength(headerHeight)
    } : {}}>
        <HeaderContainer onHeightChange={(height) => {
            setHeaderHeight(height);
        }}><NavBar onBack={() => {
            setActive(false);
        }}>{navTitle}</NavBar></HeaderContainer>
        <Form {...formProps} onSubmit={async (...args) => {
            const res = await formProps.onSubmit?.(...args);
            if (res !== false) {
                setActive(false);
            }
        }}>
            {children}
            <FixedView>{footer}</FixedView>
        </Form>
    </Popup>
};

PopupForm.defaultProps = {
    isRootPortal: false, formProps: {}, position: 'right'
};

export default PopupForm;
