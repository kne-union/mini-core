import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import FormPart from './FormPart';
import {GroupList, useFormContext} from '@kne/react-form-antd-taro';
import get from "lodash/get";
import {Button, Icon} from '@kne/antd-taro';
import style from "./style.module.scss";
import {ListTitle} from '../Common';
import classnames from "classnames";
import useRefCallback from "@kne/use-ref-callback";

const List = forwardRef(({
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
            groupRef.current.onAdd({isUnshift: isUnshift});
        }
    });
    useImperativeHandle(listRef, () => {
        return {
            add: () => {
                if (!allowAddRef.current) {
                    return;
                }
                addItem({isUnshift: isUnshift});
            }
        };
    }, [isUnshift, addItem]);
    return <OuterType {...Object.assign({}, outer.props, {
        title,
        addText,
        className,
        allowAdd,
        add: addItem,
        children: <GroupList name={name} defaultLength={defaultLength} ref={groupRef}>{(...groupArgs) => {
            const [key, {index, onRemove, length}] = groupArgs;
            const renderList = typeof list === "function" ? list(...groupArgs, context) : list;
            return <FormPart
                key={key}
                className={classnames(style["list-item"], 'form-part-list-item')}
                list={minLength && minLength >= length ? renderList : [...renderList, <Button block onClick={() => {
                    onRemove(key);
                    afterDelete && afterDelete(...groupArgs, context);
                }} color='danger' fill='none'>
                    <Icon className="iconfont" type="shanchu"/>{removeText}
                </Button>]}
                groupArgs={groupArgs}
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
