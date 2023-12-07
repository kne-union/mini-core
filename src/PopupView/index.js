import React, {createContext, useContext, useState} from 'react';
import {Icon, NavBar, Popup, SafeArea, toCSSLength} from '@kne/antd-taro';
import classnames from "classnames";
import style from "./style.module.scss";
import HeaderContainer from "../HeaderContainer";
import {ScrollView} from '@tarojs/components';
import {Provider as GlobalProvider, useGlobalContext} from "@kne/global-context";

const context = createContext({});
const {Provider} = context;

export const PopupViewProvider = ({children}) => {
    const [popupViewList, setPopupViewList] = useState([]);
    return <Provider value={{
        openPopup: (children, options) => {
            const current = Object.assign({}, options, {children});
            setPopupViewList((popupViewList) => {
                const newPopupViewList = popupViewList.slice(0);
                newPopupViewList.push(current);
                return newPopupViewList;
            });

            return () => {
                setPopupViewList((popupViewList) => {
                    const newPopupViewList = popupViewList.slice(0);
                    const index = popupViewList.indexOf(current);
                    if (index > -1) {
                        newPopupViewList.splice(index, 1);
                    }
                    return newPopupViewList;
                });
            };
        }, closeCurrentPopup: () => {
            setPopupViewList((popupViewList) => {
                const newPopupViewList = popupViewList.slice(0);
                newPopupViewList.pop();
                return newPopupViewList;
            });
        }, closeAllPopup: () => {
            setPopupViewList([]);
        }
    }}>
        {children}
        {popupViewList.map((props, index) => {
            return <Popup {...props} key={index} open hasSafeArea={false} isRootPortal={false}/>
        })}
    </Provider>
};

export const usePopup = (options) => {
    const {openPopup} = useContext(context);
    const globalContext = useGlobalContext();
    return (children) => {
        const close = openPopup(<GlobalProvider value={globalContext}>
            {children}
        </GlobalProvider>, Object.assign({}, options));
        return {close};
    }
};

export const usePopupView = (options) => {
    const popup = usePopup(Object.assign({}, options, {
        position: 'right',
        bodyClassName: classnames(style['popup-page'], options?.bodyClassName),
        catchMove: true
    }));

    return ({children, ...props}) => {
        const onClose = () => {
            apis.close();
        };
        const apis = popup(<PopupView {...props} open onClose={onClose}>
            {typeof children === 'function' ? children({
                close: onClose
            }) : children}
        </PopupView>);

        return apis;
    }
};

const PopupView = ({open, onClose, className, children, title, hasSafeArea, backArrow}) => {
    const [headerHeight, setHeaderHeight] = useState();
    return <>
        <HeaderContainer onHeightChange={(height) => {
            setHeaderHeight(height);
        }}>
            <NavBar backArrow={backArrow || <Icon type="arrow-thin-left" className="iconfont"/>}
                    onBack={onClose}>{title}</NavBar>
        </HeaderContainer>
        <ScrollView className={classnames(style['popup-view'], className)} style={headerHeight ? {
            '--header-container-height': toCSSLength(headerHeight)
        } : {}} scrollY>
            {open && children}
        </ScrollView>
        {hasSafeArea && <SafeArea position="bottom"/>}
    </>;
};

PopupView.defaultProps = {
    title: '', hasSafeArea: false
};

export default PopupView;
