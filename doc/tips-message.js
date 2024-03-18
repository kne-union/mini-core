const { TipsMessage } = miniCore;
const { Space, Icon } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return (
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <View>基础用法</View>
        <TipsMessage
          content={"客户下任一合同包含Hands-off条款，该客户即受Hands-off限制。默认按照最严格的赔偿责任及条款描述提交审批。"}
          title={"Hands-off信息"}
        />
      </Space>
      <Space direction={"vertical"}>
        <View>自定义弹窗 Title 图标</View>
        <TipsMessage
          content={"客户下任一合同包含Hands-off条款，该客户即受Hands-off限制。默认按照最严格的赔偿责任及条款描述提交审批。"}
          title={"Hands-off信息"}
          icon={<Icon type="tabzhiwei-xuanzhong" className={'iconfont'} />}
        />
      </Space>
      <Space direction={"vertical"}>
        <View>取消确认按钮</View>
        <TipsMessage
          content={"客户下任一合同包含Hands-off条款，该客户即受Hands-off限制。默认按照最严格的赔偿责任及条款描述提交审批。"}
          title={"Hands-off信息"}
          cancel={{ span: 10, text: "Cancel" }}
          confirm={{ span: 14, text: "Confirm" }}
        />
      </Space>
    </Space>
  );
};

render(<BaseExample />);
