import React from "react";
import {usePreset} from '../../Global';
import ListSelect from '../ListSelect';
import {Avatar} from '@kne/antd-taro';
import style from './style.module.scss';

const UserListSelect = ({apis: propsApis, options, ...props}) => {
    const {apis: baseApis} = usePreset();
    const apis = Object.assign({}, baseApis, propsApis ? {user: propsApis} : {});

    return <ListSelect {...Object.assign({}, props, options ? {options} : {
        api: Object.assign({}, {
            transformData: (data) => {
                return Object.assign({}, data, {
                    pageData: data.pageData.map(({name, englishName, orgName, uid, gender}) => {
                        return ({
                            label: [englishName, name].filter((item) => !!item).join(' '),
                            description: orgName,
                            value: uid,
                            prefix: <Avatar className={style['avatar']} gender={gender}/>,
                            name,
                            englishName,
                            gender
                        });
                    })
                });
            }
        }, apis.user.getUserList)
    })} className={style['user-list']}/>
};

UserListSelect.defaultProps = {
    getSearchProps: (searchText) => {
        return {
            data: {
                userName: searchText
            }
        };
    }
};

export default UserListSelect;
