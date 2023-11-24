import {UserListSelect as CommonUserListSelect} from '../../../Common';
import React from "react";
import createDataSelectField from '../createDataSelectField';
import {labelRender} from '../AdvancedSelect';

const ListSelectInner = (props) => {
    return <CommonUserListSelect {...props} hasSafeArea valueType="all" defaultValue={props.value}/>
}

const UserListSelect = createDataSelectField(labelRender)(ListSelectInner);

UserListSelect.defaultProps = {
    multiple: true
}

export default UserListSelect;
