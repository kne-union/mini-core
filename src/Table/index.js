import React from 'react';
import {View} from '@tarojs/components';
import {Grid} from '@kne/antd-taro';
import transform from 'lodash/transform';
import classnames from 'classnames';
import style from './style.module.scss';

const Table = ({className, dataSource, rowKey, columns}) => {
    const col = Math.floor(24 / columns.length);
    return <Grid className={classnames(className, style['table'])}>
        {columns.map(({name, title}) => {
            return <Grid.Item key={name} span={col}>
                <View
                    className={classnames('table-col', 'table-thead', style['table-col'], style['table-thead'])}>{title}</View>
            </Grid.Item>
        })}
        {transform(dataSource, (result, item) => {
            columns.forEach((column) => {
                const {name, render, valueOf} = column;
                const colKey = typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
                const key = `${name}_${colKey}`;
                const renderCol = ({col, key, children}) => {
                    return <Grid.Item key={key} span={col}>
                        <View className={classnames('table-col', style['table-col'])}>{children}</View>
                    </Grid.Item>
                };
                if (typeof render === 'function') {
                    result.push(renderCol({key, col, children: render(item, {dataSource, column})}));
                    return;
                }
                if (column.hasOwnProperty(valueOf) && typeof valueOf === 'function') {
                    result.push(renderCol({key, col, children: valueOf(item)}));
                    return;
                }
                result.push(renderCol({key, col, children: item[name]}));
            })
        }, [])}
    </Grid>
};

Table.defaultProps = {
    rowKey: "id", dataSource: []
};

export default Table;
