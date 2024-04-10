import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import FormPart from './FormPart';
import {GroupList, useFormContext} from '@kne/react-form-antd-taro';
import get from "lodash/get";
import {Button, Icon} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import style from "./style.module.scss";
import {ListTitle} from '../Common';
import classnames from "classnames";
import useRefCallback from "@kne/use-ref-callback";

const List = forwardRef(({
                             title,
                             subtitle,
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
                         }, listRef) => {
    const groupRef = useRef(null);
    const context = useFormContext();
    const {formData} = context;
    const OuterType = outer.type;
    const allowAdd = !(maxLength && maxLength <= get(formData, `${name}.length`, 0));
    const allowAddRef = useRef(allowAdd);
    allowAddRef.current = allowAdd;

    const addItem = useRefCallback(() => {
        if (typeof beforeAdd === "function" ? beforeAdd(name, context) !== false : true) {
            groupRef.current.onAdd();
        }
    });
    useImperativeHandle(listRef, () => {
        return {
            add: () => {
                if (!allowAddRef.current) {
                    return;
                }
                addItem();
            }
        };
    }, [addItem]);
    return <OuterType {...Object.assign({}, outer.props, {
        title,
        subtitle,
        addText,
        className,
        allowAdd,
        add: addItem,
        children: <GroupList name={name} defaultLength={minLength || defaultLength} ref={groupRef}
                             reverseOrder={isUnshift}>{(groupOptions) => {
            const {id: key, index, onRemove, length} = groupOptions;
            const renderList = typeof list === "function" ? list(key, groupOptions, context) : list;
            return <FormPart
                key={key}
                className={classnames(style["list-item"], 'form-part-list-item')}
                isSubheading
                list={minLength && minLength >= length ? renderList : [...renderList, <View>
                    <Button className={style['list-btn-del']} block onClick={() => {
                        onRemove(key);
                        afterDelete && afterDelete(key, groupOptions, context);
                    }} color='danger' fill='none'>
                        <Icon className="iconfont" type="shanchu"/>{removeText}
                    </Button>
                </View>]}
                groupOptions={groupOptions}
                title={typeof itemTitle === "function" ? itemTitle({index, key, onRemove}) : itemTitle}/>
        }}</GroupList>
    })}/>;
});

const Outer = ({add, addText, className, allowAdd, children, ...props}) => {
    return <>
        {props.title && <ListTitle subtitle={props.subtitle}
                                   extra={props.extra && typeof props.extra === 'function' ? props.extra({
                                       add, allowAdd
                                   }) : props.extra || (allowAdd &&
                                       <Button className={style["list-btn"]} color='primary' fill='none' onClick={add}>
                                           <Icon className="iconfont" type="tianjia"/>
                                           {addText}
                                       </Button>)}>{props.title}</ListTitle>}
        {children}
    </>
};

List.defaultProps = {
    minLength: 0, isUnshift: true, defaultLength: 1, removeText: '删除', addText: '添加', outer: <Outer/>,
};

export default List;
