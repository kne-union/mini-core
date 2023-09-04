import React, {useEffect, useState} from "react";
import {usePreset} from "../Global";
import getOssUrl from './getOssUrl';

const withOSSFile = (WrappedComponent) => ({value, children, ...props}) => {
    if (typeof value === 'string' && value.indexOf('?') > -1) {
        value = value.split('?')[0];
    }
    const [data, setData] = useState(null);
    const {ajax, apis} = usePreset();
    useEffect(() => {
        if (!value) return;
        getOssUrl({value, ajax, apis}).then((data) => {
            setData(data);
        });
    }, [value, ajax, apis]);
    return <WrappedComponent {...Object.assign({}, props, {url: data})}/>
};

export default withOSSFile;
