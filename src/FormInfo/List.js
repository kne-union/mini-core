import React, {useRef} from 'react';
import FormPart from './FormPart';
import {GroupList, useFormContext} from '@kne/react-form-antd-taro';
import get from "lodash/get";
import {Button, Icon} from '@kne/antd-taro';
import style from "./style.module.scss";
import {View} from "@tarojs/components";
import classnames from "classnames";

const List = ({
                title,
                addText,
                removeText,
                minLength,
                isUnshift,
                maxLength,
                defaultLength,
                label,
                name,
                beforeAdd,
                afterDelete,
                column,
                list,
                itemTitle,
                outer,
                className,
              }) => {
  const groupRef = useRef(null);
  const context = useFormContext();
  const {formData} = context;
  const OuterType = outer.type;
  return <OuterType {...Object.assign({}, outer.props, {
    title, addText, className, allowAdd: !(maxLength && maxLength <= get(formData, `${name}.length`, 0)), add: () => {
      if (typeof beforeAdd === "function" ? beforeAdd(name, context) !== false : true) {
        groupRef.current.onAdd({isUnshift: isUnshift});
      }
    }, children: <GroupList name={name} defaultLength={defaultLength} ref={groupRef}>{(...groupArgs) => {
      const [key, {index, onRemove, length}] = groupArgs;
      return <FormPart
        key={key}
        className={classnames(style["list-item"], 'form-part-list-item')}
        list={[...(typeof list === "function" ? list(...groupArgs, context) : list), minLength && minLength >= length ? null :
          <Button block onClick={() => {
            onRemove(key);
            afterDelete && afterDelete(...groupArgs, context);
          }} color='danger'>
            <Icon type="icon-shanchu"/>{removeText}
          </Button>]}
        groupArgs={groupArgs}
        title={typeof itemTitle === "function" ? itemTitle({index, key, onRemove}) : itemTitle}/>
    }}</GroupList>
  })}/>;
};

const Outer = ({add, addText, className, allowAdd, children, ...props}) => {
  return <>
    <View className={classnames(style['list-header'], 'list-header', className)}>
      <View className={classnames(style['list-header-title'], 'list-header-title')}>{props.title}</View>
      {allowAdd &&
        <Button className={style["list-btn"]} color='primary' fill='none' onClick={add}>
          <Icon type="icon-tianjia"/>
          {addText}
        </Button>
      }
    </View>
    {children}
  </>
};

List.defaultProps = {
  minLength: 0, isUnshift: true, defaultLength: 1, removeText: '', addText: '', outer: <Outer/>,
};

export default List;
