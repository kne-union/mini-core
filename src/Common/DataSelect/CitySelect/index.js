import React, {useMemo, useState} from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import {Grid, List, Selector, Tabs} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import {withFetch} from '@kne/react-fetch';
import createAddressApi from './createAddressApi';
import {usePreset} from '../../../Global';
import style from '../style.module.scss';
import ScrollViewVertical from '../../ScrollViewVertical';
import Container from '../Container';
import cityStyle from './style.module.scss';

const CityView = ({type, value, onChange, menuKey, setMenuKey, apis, ...props}) => {
    const {getCity, getChinaCities, getCountries, getList} = apis;
    return <Grid className={classnames(style['main-view'], cityStyle['main-view'])} wrap={false}>
        <Grid.Item span={7} className={classnames(style['menu-list'], cityStyle['menu-list'])}>
            <ScrollViewVertical className={style['scroller']}>
                <List>
                    {(type === '2' ? getChinaCities : getCountries)().map((item) => {
                        const selectedCount = getList(item.id).filter((city) => value.indexOf(city.code) > -1).length;
                        const isActive = item.id === menuKey;
                        return <List.Item key={item.id} arrow={false} className={classnames(style['menu'], {
                            [style['is-active']]: isActive
                        })} onClick={() => {
                            setMenuKey(item.id);
                        }}>
                            {item.name} {selectedCount ? `(${selectedCount})` : ''}
                        </List.Item>;
                    })}
                </List>
            </ScrollViewVertical>
        </Grid.Item>
        <Grid.Item span={17} className={style['item-list']}>
            <View className={style["title"]}>
                {getCity(menuKey).city.name}
            </View>
            <ScrollViewVertical className={style['with-title-scroller']}>
                <Selector multiple value={value} onChange={onChange} options={getList(menuKey, {
                    showChinaQuan: props.showChinaQuan, showForeignQuan: props.showForeignQuan,
                }).map(({code, name}) => ({
                    value: code, label: name
                }))}/>
            </ScrollViewVertical>
        </Grid.Item>
    </Grid>
};

CityView.defaultProps = {
    value: []
};

const CitySelectInner = withFetch(({data, showChinaQuan, showForeignQuan, ...props}) => {
    const [menuKey, setMenuKey] = useState("2");

    const addressApi = useMemo(() => {
        return createAddressApi(data);
    }, [data]);

    return <Container {...props} className={classnames(cityStyle['container'], props.className, {
        [cityStyle['is-single']]: !props.multiple
    })}
                      getSearchApi={(searchText) => {
                          return {
                              loader: () => {
                                  return addressApi.searchCities(searchText);
                              }
                          }
                      }} getTargetItem={(id) => {
        const target = addressApi.getCity(id);
        return Object.assign({}, target, {
            value: id, label: get(target, 'city.name')
        });
    }}>
        {({value, onChange}) => <Tabs onChange={setMenuKey} items={[{
            key: "2",
            title: "国内",
            children: <CityView type="2" menuKey={menuKey} setMenuKey={setMenuKey} showChinaQuan={showChinaQuan}
                                showForeignQuan={showForeignQuan} apis={addressApi} value={value}
                                onChange={onChange}/>
        }, {
            key: "1",
            title: "国外",
            children: <CityView type="1" menuKey={menuKey} setMenuKey={setMenuKey} showChinaQuan={showChinaQuan}
                                showForeignQuan={showForeignQuan} apis={addressApi} value={value}
                                onChange={onChange}/>
        }]}/>}
    </Container>
});

CitySelectInner.defaultProps = {
    maxLength: 10, multiple: true, defaultValue: [], searchPlaceholder: '搜索城市'
};

const CitySelect = (props) => {
    const {apis: apisBase} = usePreset();
    const apis = Object.assign({}, apisBase, props.apis);
    return <CitySelectInner {...props} {...apis.staticData.cityData}/>
};

const cityEnumCache = new Map();

const CityEnumInner = withFetch(({name, data, children, ...props}) => {
    const {getCity} = useMemo(() => createAddressApi(data), [data]);
    const output = getCity(name);
    cityEnumCache.set(name, output);
    return children(output, props, data);
});

export const CityEnum = (props) => {
    const {apis: apisBase} = usePreset();
    const apis = Object.assign({}, apisBase, props.apis);

    const key = `${props.name}-${props.displayParent}`;
    const cache = cityEnumCache.get(key);
    if (cache && !props.force) {
        return props.children(cache, props);
    }
    return <CityEnumInner loading={null} {...props} {...apis.staticData.cityData}/>
};

CityEnum.defaultProps = {
    displayParent: false, force: false, children: ({city, parent}, {displayParent}) => {
        if (displayParent) {
            return parent ? `${get(parent, "name")}·${get(city, "name")}` : get(city, "name");
        }
        return city?.name;
    }
};

export default CitySelect;


