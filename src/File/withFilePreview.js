import React from 'react';
import withOssFile from './withOssFile';
import compose from '@kne/compose';
import useFilePreview from './useFilePreview';

const withFilePreview = (WrappedComponent) => ({originalName, url, ...props}) => {
    const {loading, onPreview} = useFilePreview({originalName, url});
    return <WrappedComponent {...props} loading={loading} originalName={originalName} url={url} onClick={onPreview}/>
};

export default compose(withOssFile, withFilePreview);
