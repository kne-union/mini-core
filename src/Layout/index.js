import React, {useEffect, useRef, useState} from 'react';
import HeaderContainer from '../HeaderContainer';
import {GlobalStyle} from '../Global';
import Taro, {useRouter} from "@tarojs/taro";
import {Icon, NavBar, SafeArea, TabBar} from '@kne/antd-taro';
import FixedView from '../FixedView';
import classnames from "classnames";
import style from './style.module.scss';
import {PopupViewProvider} from "../PopupView";

const ToolBar = ({list, noSafeArea}) => {
    const listRef = useRef(list);
    listRef.current = list;
    const router = useRouter();
    const [activeKey, setActiveKey] = useState(router.path);

    useEffect(() => {
        if (listRef.current.find(({key}) => key === router.path)) {
            setActiveKey(router.path)
        }
    }, [router.path]);
    return <FixedView className={style['tab-bar']} noPadding>
        <TabBar
            className="adm-tab-bar-fixed"
            items={list}
            activeKey={activeKey}
        />
        {!noSafeArea && <SafeArea position="bottom"/>}
    </FixedView>
};

ToolBar.defaultProps = {
    noSafeArea: false
};

const Layout = ({className, children, header, toolBar, toolBarList}) => {
    const pages = Taro.getCurrentPages();
    const router = useRouter();
    return <GlobalStyle className={classnames(className, style['layout'], 'layout')}>
        <PopupViewProvider>
            {header && <HeaderContainer className={header.className} extra={header.extra}>
                <NavBar back={header.back} backArrow={header.backArrow ||
                    <Icon type={pages.length === 1 ? "huidaoshouye" : "arrow-thin-left"} className="iconfont"/>}
                        onBack={() => {
                            if (header.onBack) {
                                header.onBack(router);
                                return;
                            }
                            Taro.navigateBack({
                                delta: 1
                            }).catch(({errMsg}) => {
                                Taro.switchTab({url: "/pages/index/index"})
                            })
                        }}>{header.title}</NavBar>
            </HeaderContainer>}
            {children}
            {toolBar || (toolBarList && <ToolBar list={toolBarList}/>) || <SafeArea position="bottom"/>}
        </PopupViewProvider>
    </GlobalStyle>;
};

Layout.defaultProps = {};

export default Layout;
