import React from 'react';
import {hooks, withItem} from "@kne/react-form-antd-taro";
import {Upload as UploadField} from "../../../Common";

const {useDecorator} = hooks;

const Upload = (props) => {
  const render = useDecorator(Object.assign({placeholder: `请选择${props.label || ''}`}, props));
  return render(UploadField);
};
Upload.defaultProps = {
  interceptor: "file-format",
};

Upload.Item = withItem(Upload);

export default Upload;
