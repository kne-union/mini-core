import React, {useState} from 'react';
import Taro from "@tarojs/taro";
import {isJSON, FileList} from "../../Common";
import {get, uniqueId} from "lodash";
import {usePreset} from "../../Global";
import classnames from "classnames";
import {View} from "@tarojs/components";
import {Button, Icon} from "@kne/antd-taro";
import style from './style.module.scss';
import useControlValue from "@kne/use-control-value";

const Upload = ({
                  className,
                  accept,
                  renderTips,
                  fileSize,
                  maxLength,
                  showUploadList,
                  children,
                  formData,
                  chooseFileType,
                  multiple,
                  onError,
                  ...props
                }) => {
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, props.apis);
  const [propsValue, onChange] = useControlValue(props);
  const value = propsValue || [];
  const [uploadingList, setUploadingList] = useState([]);

  const previewFileList = [...uploadingList, ...value];

  const onUpload = () => {
    const allowCount = maxLength - value.length;
    if (
      !(maxLength === 1 || multiple !== true) &&
      uploadingList.length > allowCount
    ) {
      onError({
        message: `上传文件不能超过最大允许数量${maxLength}`
      });
      return;
    }
    Taro.getStorage({key: "USER_HEADER"}).then(({data: userHeader}) => {
      Taro.chooseMessageFile({
        count: 1,
        type: chooseFileType || "all",
        success(res) {
          const tempFilePaths = res.tempFiles[0];
          const {size, name} = tempFilePaths;
          if (size > fileSize * 1024 * 1024) {
            onError({
              message: `文件${name}不能超过${fileSize}MB!`,
              file: tempFilePaths
            });
            return;
          }
          const uuid = uniqueId();
          if (maxLength === 1 || multiple === false) {
            setUploadingList([
              {
                uuid,
                type: "uploading",
                fileName: name,
                originalName: name
              }
            ]);
          } else {
            setUploadingList((list) => {
              const newList = (list || []).slice(0);
              newList.unshift({
                uuid,
                type: "uploading",
                fileName: name,
                originalName: name
              });
              return newList;
            });
          }

          Taro.uploadFile({
            url: `${apis.baseURL}${apis.resume.ossUpload.url}`,
            filePath: tempFilePaths?.path,
            name: 'file',
            formData: formData || {},
            header: Object.assign({
              'content-type': 'multipart/form-data;charset=utf-8',
              'X-APP-NAME': 'erc'
            }, userHeader && {'X-FAT-TOKEN': userHeader.token, 'X-FAT-CO-ID': userHeader.coId}),
            success: function ({data: re}) {
              if (isJSON(re)) {
                const results = JSON.parse(re);
                if (results.code === 0) {
                  const outputData = {
                    fileName: name,
                    originalName: get(results, 'data.originalName'),
                    id: get(results, 'data.id'),
                    uuid,
                  }
                  setUploadingList((list) => {
                    const newList = (list || []).slice(0);
                    const index = newList.findIndex((item) => item.uuid === uuid);
                    index > -1 && newList.splice(index, 1);
                    return newList;
                  });
                  if (maxLength === 1 || multiple === false) {
                    onChange([outputData]);
                  } else {
                    const newList = (value || []).slice(0);
                    newList.unshift(outputData);
                    onChange(newList);
                  }
                } else {
                  onError && onError({message: get(results, 'msg') || `文件${name}上传错误`});
                  setUploadingList((list) => {
                    const newList = list.slice(0);
                    const index = newList.findIndex((item) => item.uuid === uuid);
                    index > -1 && newList.splice(index, 1);
                    return newList;
                  });
                }
              }
            }
          })
        }
      })
    })
  }

  const tipsText = renderTips(
    `支持扩展名${accept
      .map((str) => str.replace(/^\./, ""))
      .join("、")},单个文件大小不超过${fileSize}M，最多上传${maxLength}个附件`,
    {
      fileSize,
      maxLength,
      accept,
    }
  );

  return <View className={classnames(className, style['upload'])}>
    {tipsText && <View className={classnames(style['tips'], 'tips')}>{tipsText}</View>}
    <Button className={classnames(style['upload-button'], 'upload-button')} onClick={onUpload}>
      {children}
    </Button>
    {showUploadList && previewFileList?.length > 0 && (
      <FileList className="preview-file-list" list={previewFileList} apis={{
        onDelete: (target) => {
          const newUploadList = uploadingList.slice(0);
          const indexUpload = newUploadList.findIndex((item) => item.uuid === target.uuid);
          indexUpload > -1 && newUploadList.splice(indexUpload, 1);
          console.log('>>>>>>>newUploadList', newUploadList)
          setUploadingList(newUploadList);

          const newList = value.slice(0);
          const index = newList.indexOf(target);
          index > -1 && newList.splice(index, 1);
          console.log('>>>>>>>newList', newList)
          onChange(newList);
        },
      }}/>
    )}
  </View>
}

Upload.defaultProps = {
  defaultValue: [],
  children: (
    <>
      <Icon type="shangchuanfujian" className="iconfont"/>
      上传附件
    </>
  ),
  accept: [
    ".pdf",
    ".jpg",
    ".png",
    ".jpeg",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".html",
    ".msg",
    ".zip",
  ],
  renderTips: (defaultTips) => {
    return defaultTips;
  },
  multiple: true,
  showUploadList: true,
  maxLength: 10,
  fileSize: 30,
}
export default Upload;
