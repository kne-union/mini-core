import React from "react";
import {usePreset} from '../../Global';
import ListSelect from '../ListSelect';
import {Avatar} from '@kne/antd-taro';
import style from './style.module.scss';

const UserListSelect = ({apis: propsApis, ...props}) => {
    const {apis: baseApis} = usePreset();
    const apis = Object.assign({}, baseApis, propsApis ? {user: propsApis} : {});
    return <ListSelect {...props} className={style['user-list']}
                       api={Object.assign({}, apis.user.getUserList, {
                           transformData: (data) => {
                               return Object.assign({}, data, {
                                   pageData: data.pageData.map(({name, englishName, orgName, uid, gender}) => {
                                       return ({
                                           label: [englishName, name].filter((item) => !!item).join(' '),
                                           description: orgName,
                                           value: uid,
                                           prefix: <Avatar className={style['avatar']} gender={gender}/>
                                       });
                                   })
                               });
                           }
                       })}/>
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
