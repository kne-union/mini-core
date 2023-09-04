import React from 'react';
import {withFetch} from '@kne/react-fetch';
import ScrollLoader from './ScrollLoader';
import get from 'lodash/get';
import merge from 'lodash/merge';

const LoadMoreList = withFetch((props) => {
  const pagination = Object.assign({}, {
    paramsType: "data", current: "currentPage", pageSize: "perPage", defaultPageSize: 20,
  }, props.pagination);

  const current = get(props.requestParams, [pagination.paramsType, pagination.current], 1),
    pageSize = get(props.requestParams, [pagination.paramsType, pagination.pageSize,]) || pagination.defaultPageSize;
  const formatData = props.dataFormat(props.data, {requestParams: props.requestParams});

  return <>
    {typeof props.header === 'function' ? props.header(formatData.list, {reload: props.reload}) : props.footer}
    <ScrollLoader isLoading={!props.isComplete} className={props.className}
                  noMore={!formatData.total || current * pageSize >= formatData.total} onLoader={async () => {
      await props.loadMore(merge({
        data: {
          [pagination.pageSize]: pageSize, [pagination.current]: current + 1,
        },
      }, props.getSearchProps && props.getSearchProps(props.searchText)), props.mergeList);
    }}>
      {props.children(formatData.list, {reload: props.reload})}
    </ScrollLoader>
    {typeof props.footer === 'function' ? props.footer(formatData.list, {reload: props.reload}) : props.footer}
  </>
});

LoadMoreList.defaultProps = {
  footer: null,
  mergeList: (data, newData) => {
    return Object.assign({}, newData, {
      pageData: data.pageData.concat(newData.pageData),
    });
  }, dataFormat: (data) => {
    return {
      list: data.pageData, total: data.totalCount,
    };
  }
};

export default LoadMoreList;
