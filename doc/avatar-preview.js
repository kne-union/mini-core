const { Global, AvatarPreview } = miniCore;
const { Space, Button } = antd;
const { View } = tarojsComponents;
const { showToast } = tarojsTaro;

const demoAvatarImages = "https://avatars.githubusercontent.com/u/37367461?v=4";

const BaseExample = () => {
  return (<Global preset={{
      apis: {
        file: {
          getFileUrl: {
            loader: ({params}) => {
              return "https://attachment.test.fatalent.cn/attachment/Q0ol94kBBZgnCXyZKG1Y.jpg?Expires=1700814537&OSSAccessKeyId=LTAI5tAfbu2aBppB3jMj1kMt&Signature=KcJHlI8FDYMolFQFxacGzhoaA1A%3D";
            }
          }
        }
      }
    }}>
      <Space direction="vertical" size={30}>
        <Space direction={"vertical"}>
          <View>基础用法</View>
          <AvatarPreview value={demoAvatarImages} />
        </Space>

        <Space direction={"vertical"}>
          <View>点击事件</View>
          <AvatarPreview
            value={demoAvatarImages}
            onClick={() => {
              showToast({ icon: "none", title: "点击事件。。。" });
            }}
          />
        </Space>
      </Space>
    </Global>
  );
};

render(<BaseExample />);
