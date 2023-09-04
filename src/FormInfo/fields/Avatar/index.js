import React from 'react';
import {hooks, withItem} from "@kne/react-form-antd-taro";
import Taro from "@tarojs/taro";
import {isJSON} from "../../../Common";
import AvatarPreview from '../../../AvatarPreview';
import get from "lodash/get";
import {usePreset} from "../../../Global";


const {useDecorator} = hooks;

const AvatarField = ({onChange, value, ...props}) => {
    const {apis: apisBase} = usePreset();
    const apis = Object.assign({}, apisBase, props.apis);

    const onUpload = () => {
        Taro.getStorage({key: "USER_HEADER"}).then(({data: userHeader}) => {
            Taro.chooseImage({
                count: 1,
                success(res) {
                    const tempFilePaths = res.tempFilePaths[0];

                    Taro.uploadFile({
                        url: `${apis.baseURL}${apis.resume.ossUpload.url}`,
                        filePath: tempFilePaths,
                        name: 'file',
                        formData: {},
                        header: Object.assign({
                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'X-APP-NAME': 'erc'
                        }, userHeader && {'X-FAT-TOKEN': userHeader.token, 'X-FAT-CO-ID': userHeader.coId}),
                        success: function ({data: re}) {
                            if (isJSON(re)) {
                                const results = JSON.parse(re);
                                if (results.code === 0) {
                                    onChange && onChange(get(results, 'data.id'));
                                }
                            }
                        }
                    })
                }
            })
        })
    }

    return <AvatarPreview
        value={value}
        onClick={onUpload}/>
}

const Avatar = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label || ''}`}, props));
    return render(AvatarField);
};

Avatar.Item = withItem(Avatar);


export default Avatar;
