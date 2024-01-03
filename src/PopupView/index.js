import React, {createContext, useContext, useState} from 'react';
import {Icon, NavBar, Popup, SafeArea, toCSSLength} from '@kne/antd-taro';
import classnames from "classnames";
import style from "./style.module.scss";
import HeaderContainer from "../HeaderContainer";
import {ScrollView} from '@tarojs/components';
import {Provider as GlobalProvider, useGlobalContext} from "@kne/global-context";
import uniqueId from 'lodash/uniqueId';
import {useDebounce} from 'use-debounce';

const context = createContext({});
const {Provider} = context;

const scrollContext = createContext(0);

const {Provider: ScrollProvider} = scrollContext;

export const PopupViewProvider = ({children}) => {
    const [popupViewList, setPopupViewList] = useState([]);
    const [scroll, setScroll] = useState({});
    const [scrollY] = useDebounce(scroll, 300);

    return <Provider value={{
        openPopup: (children, options) => {
            const id = uniqueId('popup-');
            const current = Object.assign({}, options, {
                children: <GlobalProvider value={options.globalContext}>{typeof children === 'function' ? children({
                    id, onScroll: (e) => {
                        const {scrollTop} = e.detail;
                        setScroll((scroll) => {
                            return Object.assign({}, scroll, {[id]: scrollTop})
                        });
                    }
                }) : children}</GlobalProvider>, id
            });
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

                setScroll((scroll) => {
                    const newScroll = Object.assign({}, scroll);
                    delete newScroll[id];
                    return newScroll;
                });
            };
        }, closeAllPopup: () => {
            setPopupViewList([]);
            setScroll([]);
        }
    }}>
        {children}
        {popupViewList.map((props) => {
            return <ScrollProvider value={scrollY[props.id]}><Popup {...props} open key={props.id} hasSafeArea={false}
                                                                    isRootPortal={false}/></ScrollProvider>
        })}
    </Provider>
};

export const usePopup = (options) => {
    const {openPopup} = useContext(context);
    const globalContext = useGlobalContext();
    return (children) => {
        const close = openPopup(children, Object.assign({}, options, {globalContext}));
        return {close};
    }
};

export const usePopupView = (options) => {
    const popup = usePopup(Object.assign({}, options, {
        position: 'right', bodyClassName: classnames(style['popup-page'], options?.bodyClassName), catchMove: true
    }));

    return ({children, ...props}) => {
        const onClose = () => {
            apis.close();
        };
        const apis = popup(({onScroll}) => <PopupView {...props} open onClose={onClose} onScroll={onScroll}>
            {typeof children === 'function' ? children({
                close: onClose
            }) : children}
        </PopupView>);

        return apis;
    }
};

const PopupView = ({open, onClose, className, children, title, hasSafeArea, backArrow, onScroll, scrollTop}) => {
    const [headerHeight, setHeaderHeight] = useState();
    const scroll = useContext(scrollContext);
    if (!open) {
        return null;
    }
    return <>
        <HeaderContainer onHeightChange={(height) => {
            setHeaderHeight(height);
        }}>
            <NavBar backArrow={backArrow || <Icon type="arrow-thin-left" className="iconfont"/>}
                    onBack={onClose}>{title}</NavBar>
        </HeaderContainer>
        <ScrollView className={classnames(style['popup-view'], className)}
                    scrollTop={(Number.isInteger(scrollTop) ? scrollTop : scroll) || 0}
                    onScroll={onScroll} style={headerHeight ? {
            '--header-container-height': toCSSLength(headerHeight)
        } : {}} scrollY>
            {children}
            {hasSafeArea && <SafeArea position="bottom"/>}
        </ScrollView>
    </>;
};

PopupView.defaultProps = {
    title: '', hasSafeArea: false
};

export default PopupView;
