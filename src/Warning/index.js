import React from 'react';
import {View} from '@tarojs/components';
import classnames from 'classnames';
import style from './style.module.scss';

const Warning = ({className, type, fontColorful, children, ...props}) => {
    const currentBgColor = `var(--warning-${type}-06)`;
    const currentColor = `var(--warning-${type})`;
    return <View {...props} className={classnames(className, style['warning'])} style={Object.assign({}, props.style, {
        '--bg-color': currentBgColor, '--color': fontColorful ? currentColor : 'var(--adm-color-text-secondary)'
    })}>{children}</View>
};

Warning.defaultProps = {
    type: 'warning', fontColorful: false
};

export default Warning;
