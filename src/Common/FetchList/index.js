import React, { useMemo, useState } from "react";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { withFetch } from "@kne/react-fetch";
import { Empty } from "@kne/antd-taro";
import merge from "lodash/merge";

import style from "./style.module.scss";

const FetchList = withFetch(({
  data,
  reload,
  loadMore,
  showTotalCount,
  requestParams,
  emptyDescription,
  withFilter,
  isComplete,
  needMergeList,
  children,
  hasBorder = true
}) => {
  // console.log(data, showTotalCount);
  const [loading, setLoading] = useState(false);

  requestParams = merge({}, { data: { currentPage: 1, perPage: 20 } }, requestParams);

  const hasMore = useMemo(() => {
    const pageData = Array.isArray(data?.pageData) ? data.pageData : data?.pageData?.data || [];
    return pageData?.length < data?.totalCount;
  }, [data]);

  usePullDownRefresh(() => {
    reload().then(res => {
      Taro.stopPullDownRefresh();
    });
  });

  useReachBottom(() => {
    if (!hasMore) return;
    setLoading(true);
    const totalPage = Math.ceil(data?.totalCount / (requestParams.data.perPage));
    loadMore({ data: { currentPage: requestParams.data.currentPage >= totalPage ? totalPage : requestParams.data.currentPage + 1 } }, (resData, newData) => {
      setLoading(false);
      const reachBottomData = Object.assign({}, newData, {
        pageData: Array.isArray(resData?.pageData) ? resData.pageData.concat(newData.pageData) : {
          data: (resData.pageData?.data || []).concat(newData.pageData?.data || [])
        }
      });
      if (needMergeList?.length) {
        needMergeList.map(item => {
          reachBottomData[item] = resData[item].concat(newData[item]);
        });
      }
      return reachBottomData;
    });
  });

  return (
    <View className={hasBorder ? style["border-box"] : ""}>
      {showTotalCount && data?.totalCount && isComplete
        ? <View className={withFilter ? style["result-info"] : style["bottom-info-view"]}>
          搜索到{data?.totalCount}条结果
        </View>
        : null
      }
      {loading || isComplete ? children(data, requestParams, reload, isComplete) : null}
      {loading || !isComplete ? <View className={style["bottom-info-view"]}>加载中...</View> : null}
      {
        !hasMore && data?.totalCount && !loading && isComplete
          ? <View className={style["bottom-info-view"]}>到底了</View>
          : null
      }
      {data?.totalCount || !isComplete ? null : <Empty description={emptyDescription} />}
    </View>
  );
});

FetchList.defaultProps = {
  emptyDescription: "暂无数据", withFilter: true
};

export default FetchList;
