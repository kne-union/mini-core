import React, {useRef} from 'react';
import {ScrollView} from '@tarojs/components';
import LoadingView from '../LoadingView';

const ScrollLoader = ({
                        className, noMore, onLoader, isLoading, loadingTips, completeTips, children
                      }) => {
  const loadingRef = useRef(false);
  return <ScrollView className={className} scrollY onScrollToLower={() => {
    if (loadingRef.current || isLoading || noMore) {
      return;
    }
    loadingRef.current = true;
    onLoader().finally(() => {
      loadingRef.current = false;
    });
  }}>
    {children}
    {isLoading ? (<LoadingView>{loadingTips}</LoadingView>) : null}
    {noMore && completeTips && !isLoading ? (<LoadingView>{completeTips}</LoadingView>) : null}
  </ScrollView>
};

ScrollLoader.defaultProps = {
  loadingTips: '加载中...', completeTips: ''
};

export default ScrollLoader;
