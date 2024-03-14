import React from "react";
import { withOssFile } from "../OssFile";
import { Avatar } from "@kne/antd-taro";

const AvatarPreview = withOssFile(({ className, mode = "aspectFill", size, url, ...props }) => {
  return <Avatar {...props} src={url} />;
});

export default AvatarPreview;
