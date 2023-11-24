import Container from './Container';
import React, {useMemo, useState} from "react";
import createTreeUtils from "../createTreeUtils";
import get from "lodash/get";
import {Grid, List} from '@kne/antd-taro';
import style from "./style.module.scss";
import classnames from "classnames";
import ScrollViewVertical from "../ScrollViewVertical";
import {withFetch} from "@kne/react-fetch";
import useRefCallback from "@kne/use-ref-callback";

const DataSelect = ({data, renderDetail, ...props}) => {
    const {treeData, mapping, treeMapping} = useMemo(() => {
        const {treeData, mapping, treeMapping} = createTreeUtils(new Map(data.map((item) => {
            return [item.code, {
                ...item, id: item.code, value: item.code, label: item.chName, parentId: item.parentCode || null,
            },];
        })));
        return {
            mapping, treeMapping, treeData
        };
    }, [data]);
    const [menuKey, setMenuKey] = useState(get(treeData, '[0].id'));

    const searchFilter = useRefCallback(props.searchFilter);

    return <Container {...props} getSearchApi={(searchText) => {
        return {
            loader: () => {
                return Array.from(mapping.values()).filter((item) => {
                    return searchFilter(item) && ['label', 'enName', 'shortName'].some((key) => item[key] && item[key].indexOf(searchText) > -1);
                }).map((item) => {
                    return {value: item.id, label: item.label};
                });
            }
        };
    }} getTargetItem={(id) => {
        return mapping.get(id);
    }}>
        {({value, onChange}) => <Grid className={classnames(style['main-view'], style['has-top-border'])} wrap={false}>
            <Grid.Item span={7} className={style['menu-list']}>
                <ScrollViewVertical className={style['scroller']}>
                    <List>
                        {treeData.map(({id, label}) => {
                            const isActive = id === menuKey;
                            return <List.Item key={id} arrow={false} className={classnames(style['menu'], {
                                [style['is-active']]: isActive
                            })} onClick={() => {
                                setMenuKey(id);
                            }}>
                                {label}
                            </List.Item>
                        })}
                    </List>
                </ScrollViewVertical>
            </Grid.Item>
            <Grid.Item span={17} className={style['city-list']}>
                {renderDetail({data, menuKey, treeData, mapping, treeMapping, value, onChange})}
            </Grid.Item>
        </Grid>}
    </Container>
};

DataSelect.defaultProps = {
    maxLength: 10, multiple: true, defaultValue: [], searchFilter: () => true
};

const dataEnumCache = new Map();

const DataEnumInner = withFetch(({data, name, type, cache, children, ...props}) => {
    const mapping = useMemo(() => {
        return new Map(data.map((item) => [item.code, {
            ...item, id: item.code, value: item.code, label: item.chName, parentId: item.parentCode || null,
        }]));
    }, [data]);

    const output = mapping.get(name);
    dataEnumCache.set(`${name}_${type}`, output);
    return children(output, props);
});

export const DataEnum = (props) => {
    const key = `${props.name}_${props.type}`;
    const cache = dataEnumCache.get(key);
    if (cache && !props.force) {
        return props.children(cache);
    }
    return <DataEnumInner {...props}/>
};

DataEnum.defaultProps = {
    children: (item) => {
        return get(item, 'label', '');
    }
};

export default DataSelect;
