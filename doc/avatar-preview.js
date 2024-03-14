const { AvatarPreview } = miniCore;
const { Space, Button } = antd;
const { View } = tarojsComponents;
const { showToast } = tarojsTaro;

const demoAvatarImages = "https://avatars.githubusercontent.com/u/37367461?v=4";

const BaseExample = () => {
  return (
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
            showToast({icon: 'none', title: '点击事件。。。'})
          }}
        />
      </Space>
    </Space>
  );
};

render(<BaseExample />);
