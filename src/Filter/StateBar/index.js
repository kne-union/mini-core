import React, {useId} from 'react';
import { ScrollHeader } from '@kne/antd-taro';
import style from './style.module.scss';
import {View} from "@tarojs/components";
import classnames from 'classnames';

const StateItem = (props) => {
  const itemId = `${props.containerId}-${props.id}`;
  return <View id={itemId} className={classnames(style['state-item'], props.className, {
    [style['is-active']]: props.active
  })} onClick={() => {
    props.onChange && props.onChange(props.id, itemId);
  }}>{props.children}</View>
};

const StateBar = (props) => {
  const containerId = useId().replace(/:/g, '_');
  return <ScrollHeader className={style['state-bar']}>
    {({open, setOpen, scrollTo}) => props.items.map(({key, children}) => {
      return <StateItem key={key} id={key} containerId={containerId}
                        active={(props.activeKey || props.items[0].key) === key}
                        onChange={(id, elId) => {
                          props.onChange(id);
                          open && scrollTo(elId);
                          setOpen(false);
                        }}>{children}</StateItem>
    })}
  </ScrollHeader>
};

export default StateBar;
