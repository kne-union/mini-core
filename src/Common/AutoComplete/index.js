import React, {useEffect, useRef, useState} from 'react';
import {CheckList, SearchBar} from '@kne/antd-taro';
import LoadMoreList from "../LoadMoreList";
import merge from 'lodash/merge';
import {useDebouncedCallback} from 'use-debounce';
import useRefCallback from '@kne/use-ref-callback';
import style from './style.module.scss';

const Header = ({onChange, ...props}) => {
    const reloadCallback = useDebouncedCallback((value) => {
        onChange(value);
    });
    return <SearchBar {...props} className={style['search-bar']} onClear={() => {
    }} onChange={reloadCallback} searchText="确定"/>;
};

const AutoComplete = ({api, value, onChange, getSearchProps, placeholder, ...props}) => {
    const [searchText, setSearchText] = useState(value);
    const ref = useRef(null);
    const getSearchPropsHandler = useRefCallback(getSearchProps);
    useEffect(() => {
        ref.current && searchText && ref.current.reload(getSearchPropsHandler(searchText));
    }, [searchText, getSearchPropsHandler]);

    return <>
        <Header placeholder={placeholder} defaultValue={searchText} onChange={(value) => {
            setSearchText(value);
        }} onSearch={(value) => {
            onChange?.(value);
        }}/>
        {searchText && <LoadMoreList {...props} {...merge({}, api, getSearchProps(searchText))} ref={ref}
                                     className={style['list-select-scroller']}
                                     searchText={searchText}
                                     getSearchProps={getSearchProps}>
            {(data) => <CheckList multiple={false} options={data} onChange={(value) => {
                const currentItem = data.find((item) => item.value === value?.[0]);
                onChange?.(currentItem?.label);
            }}/>}
        </LoadMoreList>}
    </>
};

AutoComplete.defaultProps = {
    empty: null, placeholder: '请输入关键字', getSearchProps: (value) => {
        return {data: {searchText: value}};
    }
};


export default AutoComplete;
