const { Global, File } = miniCore;
const { Space, Icon } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return <Global preset={{
    apis: {
      file: {
        getFileUrl: {
          loader: ({ params }) => {
            return "https://attachment.test.fatalent.cn/attachment/Q0ol94kBBZgnCXyZKG1Y.jpg?Expires=1700814537&OSSAccessKeyId=LTAI5tAfbu2aBppB3jMj1kMt&Signature=KcJHlI8FDYMolFQFxacGzhoaA1A%3D";
          }
        }
      }
    }
  }}>
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <View>基础用法</View>
        <File value="xxxxx" originalName="预览文件.jpg" />
      </Space>
      <Space direction={"vertical"}>
        <View>修改文件图标</View>
        <File value="xxxxx" originalName="预览文件.jpg" icon={<Icon className="iconfont" type="tianjia" />} />
      </Space>
    </Space>
  </Global>;
};

render(<BaseExample />);
