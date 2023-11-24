import withFilePreview from './withFilePreview';
import React from 'react';
import {Button, Icon} from '@kne/antd-taro';
import classnames from 'classnames';
import style from './style.module.scss';

const File = withFilePreview(({className, loading, onClick, originalName, icon, ...props}) => {
    return <Button {...props} className={classnames(className, style['file'])} loading={loading} onClick={onClick}>
        {icon}{originalName}
    </Button>
});

File.defaultProps = {
    icon: <Icon className="iconfont" type={"fujian"}/>
};

export default File;

export {withFilePreview};

export {default as useFilePreview} from './useFilePreview';
export {default as withOssFile} from './withOssFile';
