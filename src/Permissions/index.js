import React from 'react';
import {usePreset} from "../Global";
import {Result} from "@kne/antd-taro";
import get from "lodash/get";

export const computedIsPass = ({permissions, request}) => {
    return Array.isArray(request) && request.length > 0 ? request.some((currentKey) => (permissions || []).indexOf(currentKey) > -1) : true;
};

export const usePermissions = () => {
    const preset = usePreset();
    return get(preset, "permissions", []);
};

export const usePermissionsPass = ({request}) => {
    const permissions = usePermissions();
    return computedIsPass({permissions, request});
};

const Permissions = ({
                         type, className, message, request, children, ...props
                     }) => {
    const isPass = usePermissionsPass({request});
    if (typeof children === "function") {
        return children({isPass, type, request});
    }

    if (isPass === true) {
        return children;
    }

    if (type === "error") {
        return <Result status="warning" title={message}/>;
    }

    return null;
};

Permissions.defaultProps = {
    type: "hidden", message: "您暂无权限，请联系管理员",
};

export default Permissions;
