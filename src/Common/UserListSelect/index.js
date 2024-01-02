import React from "react";
import {usePreset} from '../../Global';
import ListSelect from '../ListSelect';
import {Avatar} from '@kne/antd-taro';
import style from './style.module.scss';


const transformUserInfo = ({name, englishName, orgName, uid, gender, ...props}) => {
    return Object.assign({}, props, {
      uid,
      orgName,
        label: [englishName, name].filter((item) => !!item).join(' '),
        description: orgName,
        value: uid,
        prefix: <Avatar className={style['avatar']} gender={gender}/>,
        name,
        englishName,
        gender
    });
};

const UserListSelect = ({apis: propsApis, options, ...props}) => {
    const {apis: baseApis} = usePreset();
    const apis = Object.assign({}, baseApis, propsApis ? {user: propsApis} : {});

    return <ListSelect {...Object.assign({}, props, options ? {options: options.map(transformUserInfo)} : {
        api: Object.assign({}, {
            transformData: (data) => {
                return Object.assign({}, data, {
                    pageData: data.pageData.map(transformUserInfo)
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
