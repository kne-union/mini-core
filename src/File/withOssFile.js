import React from 'react';
import {usePreset} from '../Global';
import {withFetch} from '@kne/react-fetch';
import merge from 'lodash/merge';
import get from 'lodash/get';

const OssFile = withFetch(({data, children}) => {
    return children({data});
});

OssFile.defaultProps = {
    cache: 'oss-file', ttl: 1000 * 60 * 100
};

const withOssFile = (WrappedComponent) => ({value, api, ...props}) => {
    const {apis: baseApis} = usePreset();
    return <OssFile {...merge({}, get(baseApis, 'file.getFileUrl'), api, {params: {id: value}})}>{({data}) =>
        <WrappedComponent {...props} url={data}/>}</OssFile>
};

export default withOssFile;
