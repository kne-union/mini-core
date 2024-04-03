import React, {useMemo, useRef} from 'react';
import createDataSelectField from './fields/createDataSelectField';
import Form from './Form';
import List from './List';
import {SubmitButton} from '@kne/react-form-antd-taro';
import style from "./style.module.scss";
import FixedView from "../FixedView";
import InfoPage from '../InfoPage';
import Content from '../Content';
import get from 'lodash/get';
import omit from 'lodash/omit';
import {Button, Icon} from '@kne/antd-taro';
import {View} from '@tarojs/components';

const SubListInner = ({list, extraProps, value, onChange}) => {
    const {title, subtitle, name, ...props} = Object.assign({}, extraProps);
    return <Form data={Object.assign({}, {[name]: value || []})} onSubmit={(data) => {
        onChange(data[name]);
    }}>
        <List {...props} name={name} list={list} title={title} subtitle={subtitle}/>
        <FixedView className={style['form-footer']}>{<SubmitButton>保存</SubmitButton>}</FixedView>
    </Form>;
};

const SubListItem = createDataSelectField({
    labelRender: ({value, listProps, extraProps}) => {
        if (!(Array.isArray(value) && value.length > 0)) {
            return null;
        }
        return <InfoPage>
            <InfoPage.Collapse items={value.map((data, index) => {
                return {
                    key: index,
                    title: typeof extraProps.itemTitle === "function" ? extraProps.itemTitle({index}) : extraProps.itemTitle,
                    children: <Content list={listProps.map(({name, label, contentRender}) => {
                        return {
                            label, content: typeof contentRender === 'function' ? contentRender({
                                value: get(value, `[${index}]${name ? `.${name}` : ''}`), label
                            }) : get(value, `[${index}].${name}`, '-')
                        }
                    })}/>
                };
            })}/>
        </InfoPage>;
    }
})(SubListInner).Item;

const SubList = ({list, listProps: defaultListProps, title, placeholder, name, editText, onChange, ...props}) => {
    const listProps = useMemo(() => {
        return defaultListProps || (Array.isArray(list) ? list.map(({props}) => {
            return {label: props.label, name: props.name, render: props.contentRender};
        }) : []);
    }, [defaultListProps, list]);
    const fieldItemApi = useRef(null);
    return <SubListItem className={style['sub-list']} label={title} title={<View className={style['sub-list-title']}>
        <View>{title}</View>
        <View>{<Button className={style["list-btn"]} color='primary' fill='none' onClick={() => {
            fieldItemApi.current?.openPopup();
        }}>
            <Icon className="iconfont" type="bianji"/>
            {editText}
        </Button>}</View>
    </View>} onChange={onChange}
                        list={typeof list === 'function' ? (...args) => list(...args).map((item) => omit(item, ['contentRender'])) : list.map((item) => omit(item, ['contentRender']))}
                        name={name} placeholder={title}
                        listProps={listProps}
                        popupClassName="bg-grey"
                        rule={(value) => {
                            if (props.minLength && Number.isInteger(props.minLength) && !(value && value.length >= props.minLength)) {
                                return {
                                    result: false, errMsg: `%s的长度不能小于${props.minLength}`
                                };
                            }
                            return {
                                result: true
                            };
                        }}
                        getItemApis={(apis) => {
                            fieldItemApi.current = apis;
                        }} extraProps={{title, name, ...props}}/>
};

SubList.defaultProps = {
    editText: '编辑'
};

export default SubList;
