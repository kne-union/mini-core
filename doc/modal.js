const { Modal, ModalButton, useModal } = miniCore;
const { useState } = React;
const { Button, Space } = antd;
const { View } = tarojsComponents;

const ExampleUseModal = () => {
  const modal = useModal();
  return <Button onClick={() => {
    modal({
      title: "确认解除微信关联？", content: "解除后，将无法直接通过企业微信发起聊天。"
    });
  }}>按钮</Button>;
};

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  return <Space direction={"vertical"} size={30}>
    <Space direction={"vertical"}>
      <View>基础用法</View>
      <View>
        <Button onClick={() => {
          setOpen(true);
        }}>按钮</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="确认解除微信关联？"
          content="解除后，将无法直接通过企业微信发起聊天。"
        />
      </View>
    </Space>
    <Space direction={"vertical"}>
      <View>ModalButton</View>
      <ModalButton title="确认解除微信关联？" content="解除后，将无法直接通过企业微信发起聊天。">点击弹出</ModalButton>
    </Space>
    <Space direction={"vertical"}>
      <View>useModal Hook 调用</View>
      <ExampleUseModal />
    </Space>
  </Space>;
};

render(<BaseExample />);
