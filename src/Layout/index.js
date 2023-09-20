import React, {useEffect, useRef, useState} from 'react';
import HeaderContainer from '../HeaderContainer';
import {GlobalStyle} from '../Global';
import Taro, {useRouter} from "@tarojs/taro";
import {Icon, NavBar, SafeArea, TabBar} from '@kne/antd-taro';
import classnames from "classnames";
import style from './style.module.scss';

const ToolBar = ({list}) => {
    const listRef = useRef(list);
    listRef.current = list;
    const router = useRouter();
    const [activeKey, setActiveKey] = useState(router.path);

    useEffect(() => {
        if (listRef.current.find(({key}) => key === router.path)) {
            setActiveKey(router.path)
        }
    }, [router.path]);
    return (<TabBar
        safeArea
        className="adm-tab-bar-fixed"
        items={list}
        activeKey={activeKey}
    />)
};

const Layout = ({children, showToolBar = false, header, toolBar, toolBarList, className}) => {
    const pages = Taro.getCurrentPages();
    const router = useRouter();
    return <GlobalStyle className={classnames(style['layout'], 'layout')}>
        <HeaderContainer className={header.className} extra={header.extra}>
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
        </HeaderContainer>
        {children}
        {toolBar || (toolBarList && <ToolBar list={toolBarList}/>) || <SafeArea position="bottom"/>}
    </GlobalStyle>;
};

export default Layout;
