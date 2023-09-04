import React, {useLayoutEffect, useId} from "react";
import style from "./style.module.scss";
import {View, ScrollView} from "@tarojs/components";
import {Grid, Space, Icon} from '@kne/antd-taro';
import Tag from '../../StateTag';
import Taro from "@tarojs/taro";
import useRefCallback from '@kne/use-ref-callback';


const SelectedLabel = (props) => {
  const containerId = useId().replace(/:/g, '_');
  const handlerResize = useRefCallback(props.onResize);
  useLayoutEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query.select(`#${containerId}`)
        .boundingClientRect()
        .exec(res => {
          if (!(res && res[0])) {
            return;
          }
          handlerResize(res[0].height);
        });
    });
  }, [props.value, containerId, handlerResize]);
  return <View id={containerId}>
    <Grid className={style['selected-label']}>
      <Grid.Item span={5} className={style['selected-label-label']}>已选 <View
        className={style['current-label-count']}>{props.value ? props.value.length : '0'}</View>/{props.maxLength}
      </Grid.Item>
      <Grid.Item span={19}>{props.value && <ScrollView scrollY className={style['container']}>
        <Space className={style['tag-list']} wrap>{props.value.map((item) => {
          return <Tag className={style['tag-item']} key={item.value} type="primary" onClick={() => {
            props.onClose && props.onClose(item);
          }}>{item.label}<Icon type="close-thin" className="iconfont"/></Tag>;
        })}</Space>
      </ScrollView>}</Grid.Item>
    </Grid>
  </View>
};

export default SelectedLabel;
