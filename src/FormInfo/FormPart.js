import React, {useMemo, useRef} from 'react';
import {List} from '@kne/antd-taro';
import classnames from 'classnames';
import {useFormContext} from "@kne/react-form-antd-taro";
import {View} from '@tarojs/components';
import groupBy from 'lodash/groupBy';
import {ListTitle} from '../Common';
import style from './style.module.scss';


const FormPart = ({list, groupArgs, ...props}) => {
    const context = useFormContext();
    const contentApiRef = useRef(null);
    const contextApi = Object.assign({}, context, groupArgs ? {groupArgs} : {});
    contentApiRef.current = contextApi;
    const {displayList, hiddenList} = useMemo(() => {
        return groupBy(list.filter((item) => {
            if (typeof item.props.display === "function") {
                return item.props.display(contentApiRef.current);
            }
            return item.props.display !== false;
        }), (item) => {
            return item.props.hidden ? 'hiddenList' : 'displayList';
        });
    }, [list]);

    const renderItem = (item, index) => {
        const key = item.props.name + index || (groupArgs && groupArgs[0] + index) || index;
        const targetProps = {}, componentProps = Object.assign({}, item.props), ComponentItem = item.type;
        ["display", "hidden", "setExtraProps",].forEach((key) => {
            if (item.props.hasOwnProperty(key)) {
                targetProps[key] = item.props[key];
            }
            delete componentProps[key];
        });
        if (targetProps.hasOwnProperty("isBlock")) {
            componentProps["block"] = targetProps.isBlock;
        }
        return <ComponentItem key={key}
                              {...Object.assign({}, componentProps, typeof targetProps.setExtraProps === "function" ? targetProps.setExtraProps({
                                  props: componentProps, contextApi,
                              }) : {})}
                              onChange={(...args) => {
                                  return (item.props.onChange && item.props.onChange(...args, contextApi));
                              }}
        />;
    };

    return <>

        {props.title && <ListTitle subtitle={props.subtitle} isSubheading={props.isSubheading} extra={props.extra}>{props.title}</ListTitle>}
        <View style={{display: 'none'}}>
            {(hiddenList || []).map(renderItem)}
        </View>
        <List className={classnames('react-form',style['form-part'], props.className)}>
            {(displayList || []).map(renderItem)}
        </List>
    </>
};

export default FormPart;
