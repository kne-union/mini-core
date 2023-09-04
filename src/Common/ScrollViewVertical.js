import React, {useRef} from "react";
import {ScrollView} from "@tarojs/components";

const ScrollViewVertical = (props) => {
  // 修正重新渲染后scrollTop滚回顶部的问题
  const scrollTopRef = useRef(0);
  return <ScrollView className={props.className} scrollY scrollTop={scrollTopRef.current} onScroll={(e) => {
    scrollTopRef.current = e.detail.scrollTop;
  }}>
    {props.children}
  </ScrollView>
};

export default ScrollViewVertical;
