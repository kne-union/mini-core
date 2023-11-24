import React, {createContext, useContext, useState} from 'react';
import {Icon, NavBar, Popup, toCSSLength} from '@kne/antd-taro';
import classnames from "classnames";
import style from "./style.module.scss";
import HeaderContainer from "../HeaderContainer";
import {ScrollView} from '@tarojs/components';

const context = createContext({});
const {Provider} = context;

export const PopupViewProvider = ({children}) => {
    const [popupViewList, setPopupViewList] = useState([]);
    return <Provider value={{
        openPopupView: (children, options) => {
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
        }, closeCurrentPopupView: () => {
            setPopupViewList((popupViewList) => {
                const newPopupViewList = popupViewList.slice(0);
                newPopupViewList.pop();
                return newPopupViewList;
            });
        }, closeAllPopupView: () => {
            setPopupViewList([]);
        }
    }}>
        {children}
        {popupViewList.map(({bodyClassName, ...props}, index) => {
            return <Popup position="right" {...props} bodyClassName={classnames(style['popup'], bodyClassName)}
                          key={index} open
                          hasSafeArea={false}
                          catchMove={true} isRootPortal={false}/>
        })}
    </Provider>
};

export const usePopupView = () => {
    const {openPopupView} = useContext(context);
    return ({children, ...props}) => {
        const onClose = () => {
            close();
        };
        const close = openPopupView(<PopupView {...props} open onClose={onClose}>
            {typeof children === 'function' ? children({close: onClose}) : children}
        </PopupView>);
        return {close};
    }
};

const PopupView = ({open, onClose, className, children, title, backArrow}) => {
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
    </>
};

PopupView.defaultProps = {
    title: ''
};

export default PopupView;
