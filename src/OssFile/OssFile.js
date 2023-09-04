import React from 'react';
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import withOssFile from "./withOssFile";
import style from "./style.module.scss";
import classnames from "classnames";

const OssFile = withOssFile(({className, originalName, url, children}) => {
    if (!url) {
        return '-';
    }
    return (<View
        className={classnames(style['file-name'], className)}
        onClick={() => {
            if (!url) return;
            const type = originalName.split(".")[1];
            if (['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'].includes(type)) {
                Taro.previewMedia({
                    sources: [{
                        url
                    }]
                })
                return;
            }
            Taro.downloadFile({
                url, success: function (res) {
                    Taro.openDocument({
                        filePath: res.tempFilePath, success: function (res) {
                            console.log('打开文档成功')
                        }
                    })
                }
            })
        }}
    >
        {children || originalName}
    </View>)
});

export default OssFile;
