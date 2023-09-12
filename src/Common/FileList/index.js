import {View} from "@tarojs/components";
import {Icon} from "@kne/antd-taro";
import classnames from "classnames";
import style from './style.module.scss';
import React from 'react';

const FileList = ({list, className, apis}) => {
  return <View className={classnames(style['file-list'], className)}>
    {(list || []).map((item) => {
      return <View className={style['file-list-item']} key={item.id}>
        <View className={classnames('ellipsis', style['file-name'])}>
          {item.fileName || item.originalName}
        </View>
        <View className={style['options']}>
          {apis?.hasOwnProperty('onDelete') ? <View
            className={style['delete-btn']}
            onClick={() => apis.onDelete && apis.onDelete(item)}
          >
            <Icon type="shanchu" className={classnames('iconfont')}/>
          </View> : null}
        </View>
      </View>
    })}
  </View>
};

export default FileList;