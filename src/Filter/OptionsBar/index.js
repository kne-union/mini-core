import React, {useEffect, useId, useState} from 'react';
import style from './style.module.scss';
import {View} from "@tarojs/components";
import classnames from "classnames";
import get from 'lodash/get';
import {CitySelect, ListSelect, UserListSelect, FunctionSelect, IndustrySelect, ScrollHeader} from '../../Common';
import {Popup, toCSSLength, Icon, Button} from "@kne/antd-taro";
import Taro from "@tarojs/taro";

const componentsMap = {CitySelect, ListSelect, UserListSelect, FunctionSelect, IndustrySelect};

const OptionsItem = (props) => {
  const itemId = `${props.containerId}-${props.id}`;
  const Component = componentsMap[props.type];
  const isNotLabel = props.value && props.value.length > 0;
  return <View id={itemId} className={classnames(style['options-item'], props.className, {
    [style['is-active']]: (props.value && props.value.length > 0) || props.active
  })} onClick={() => {
    props.setContent(Component &&
      <Component {...Object.assign({}, props.componentProps)} key={props.id} defaultValue={props.value}
                 onChange={(value) => {
                   props.onChange(value, itemId);
                 }} valueType="all"/>, itemId);
  }}>
    <View className={style['options-label']}>
      <View className={classnames(style['options-label-text'], {
        [style['is-label']]: !isNotLabel
      })}>
        {isNotLabel && props.value.length === 1 ? props.value.map((value) => value.label || value.value).join(',') : props.label + (props.value ? ` · ${props.value.length}` : '')}
      </View>
      {!props.iconHidden && <Icon type="down-fill" className={classnames("adm-component", style['icon'])}/>}
    </View>
  </View>
};

const OptionsDropdown = (props) => {
  const {open, onClose, top, children} = props;
  return (<Popup open={open} position='top' className={style['popup']} maskClassName={style['popup-mask']}
                 bodyClassName={style['popup-body']} style={Object.assign({}, top ? {
    top, '--top': toCSSLength(top)
  } : {})} onMaskClick={() => {
    onClose()
  }} hasSafeArea={false}>
    {open && children}
  </Popup>);
};

const OptionsBar = (props) => {
  const containerId = useId().replace(/:/g, '_');
  const [top, setTop] = useState(null);
  const [content, setContent] = useState(null);
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(`#${containerId}`)
      .boundingClientRect()
      .exec(res => {
        if (!(res && res[0])) {
          return;
        }
        setTop(res[0].bottom);
      })
  }, [containerId]);


  return <View id={containerId}>
    <ScrollHeader icon={<Icon type="down-fill" className={classnames("adm-component", style['more-icon'])}/>}
                  className={style['options-bar']} onOpenChange={(open) => {
      open && setContent(null);
    }}>
      {({open, needScroll, setOpen, computedNeedScroll, scrollTo}) => <>
        {props.items.map(({key, label, type, className, ...others}) => {
          const active = content && content.key === key;
          if (['SwitchButton'].indexOf(type) > -1) {
            return <OptionsItem key={key} id={key} containerId={containerId} label={label} iconHidden
                                active={get(props.value, key) === true} setContent={(target, elId) => {
              const targetValue = !get(props.value, key);
              props.onChange(Object.assign({}, props.value, {[key]: targetValue}));
              targetValue && scrollTo(elId);
            }}/>
          }
          return <OptionsItem componentProps={others} key={key} id={key} containerId={containerId}
                              className={className}
                              type={type}
                              label={label}
                              setContent={(target, elId) => {
                                setOpen(false);
                                scrollTo(elId);
                                setContent(active ? null : target);
                              }}
                              active={active}
                              value={get(props.value, key)}
                              onChange={(value, elId) => {
                                props.onChange(Object.assign({}, props.value, {[key]: value}));
                                scrollTo(elId);
                                setContent(null);
                                setTimeout(() => {
                                  computedNeedScroll();
                                }, 200);
                              }}/>
        })}
        {!open && <Button className={classnames(style['clean-btn'], style['location-item'])} fill="none"
                          onClick={() => {
                            props.onChange({});
                            setContent(null);
                            setOpen(false);
                          }}><Icon type="qingkong" className="iconfont"/>清空</Button>}
        {open && <View><Button className={classnames(style['clean-btn'], style['is-open'])} fill="none" onClick={() => {
          props.onChange({});
          setOpen(false);
        }}><Icon type="qingkong" className="iconfont"/>清空筛选</Button></View>}
        {!needScroll &&
          <Button className={classnames(style['clean-btn'], style['is-close'])} fill="none" onClick={() => {
            props.onChange({});
            setContent(null);
            setOpen(false);
          }}><Icon type="qingkong" className="iconfont"/>清空</Button>}
      </>}
    </ScrollHeader>
    <OptionsDropdown top={top} open={!!content} onClose={() => {
      setContent(null);
    }}>
      {content}
    </OptionsDropdown>
  </View>
};

export default OptionsBar;
