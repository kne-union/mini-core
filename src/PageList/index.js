import {withFetch} from "@kne/react-fetch";
import Taro, {usePullDownRefresh, useReachBottom} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {Empty} from "@kne/antd-taro";
import get from 'lodash/get';
import React, {forwardRef} from 'react';
import style from "../Common/FetchList/style.module.scss";

const PageListInner = withFetch(({
                                     isComplete,
                                     data,
                                     pagination,
                                     dataFormat,
                                     mergeList,
                                     requestParams,
                                     loadMore,
                                     reload,
                                     children,
                                     bordered,
                                     emptyDescription,
                                     showTotalCount,
                                     totalCountRender,
                                     loadingTips,
                                     noMoreTips,
                                     ...props
                                 }) => {
    const formatData = dataFormat(data);
    const current = get(requestParams, [pagination.paramsType, pagination.currentName], pagination.startCurrent);
    const pageSize = get(requestParams, [pagination.paramsType, 'pageSize'], 20);

    const noMore = !formatData.total || (current - pagination.startCurrent + 1) * pageSize >= formatData.total;
    useReachBottom(() => {
        if (noMore) {
            return;
        }
        loadMore({
            [props[pagination.paramsType]]: {
                [pagination.currentName]: current + 1, [pagination.pageSizeName]: pagination.pageSize
            }
        }, mergeList);
    });
    usePullDownRefresh(() => {
        reload().then(res => {
            Taro.stopPullDownRefresh();
        });
    });

    const totalCountChildren = (() => {
        if (typeof totalCountRender === 'function') {
            return totalCountRender({total: formatData.total});
        }
        if (showTotalCount && formatData.total && isComplete) {
            return <View className={style["result-info"]}>
                搜索到{formatData.total}条结果
            </View>;
        }
        return null;
    })();

    return (<View className={bordered ? style["border-box"] : ""}>
        {totalCountChildren}
        {isComplete ? children({
            data: formatData, originData: data, current, pageSize, requestParams, reload, isComplete
        }) : null}
        {!isComplete ? <View className={style["bottom-info-view"]}>{loadingTips}</View> : null}
        {isComplete && noMore ? <View className={style["bottom-info-view"]}>{noMoreTips}</View> : null}
        {isComplete && formatData.total === 0 ? <Empty description={emptyDescription}/> : null}
    </View>);
});

PageListInner.defaultProps = {
    emptyDescription: '暂无数据',
    bordered: false,
    showTotalCount: false,
    loadingTips: '加载中...',
    noMoreTips: '到底了',
    mergeList: (data, newData) => {
        return Object.assign({}, newData, {
            pageData: data.pageData.concat(newData.pageData),
        });
    },
    dataFormat: (data) => {
        return {
            list: data.pageData, total: data.totalCount,
        };
    },
};

const PageList = forwardRef(({pagination, ...props}, ref) => {
    pagination = Object.assign({}, {
        paramsType: "data",
        requestType: "reload",
        currentName: "currentPage",
        pageSizeName: "perPage",
        pageSize: 20,
        startCurrent: 1
    }, pagination);

    return <PageListInner {...Object.assign({}, props, {
        pagination, [pagination.paramsType]: Object.assign({}, props[pagination.paramsType], {
            [pagination.currentName]: pagination.startCurrent, [pagination.pageSizeName]: pagination.pageSize
        })
    })} ref={ref}/>
});

PageList.defaultProps = {
    pagination: {}
};

export default PageList;
