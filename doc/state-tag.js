const { StateTag } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return (
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <View>基础用法</View>
        <StateTag type="primary">哈哈哈</StateTag>
      </Space>
      <Space direction={"vertical"}>
        <View>不同类型</View>
        <Space wrap>
          {
            ["default", "result", "success", "progress", "danger", "info", "other", "primary"].map(type => (
              <StateTag key={type} type={type}>{type}</StateTag>
            ))
          }
        </Space>
      </Space>
      <Space direction={"vertical"}>
        <View>不展示背景色</View>
        <Space wrap>
          {
            ["default", "result", "success", "progress", "danger", "info", "other", "primary"].map(type => (
              <StateTag key={type} type={type} showBackground={false}>{type}</StateTag>
            ))
          }
        </Space>
      </Space>
      <Space direction={"vertical"}>
        <View>展示边框</View>
        <Space wrap>
          {
            ["default", "result", "success", "progress", "danger", "info", "other", "primary"].map(type => (
              <StateTag key={type} type={type} showBorder>{type}</StateTag>
            ))
          }
        </Space>
      </Space>
      <Space direction={"vertical"}>
        <View>文案传值</View>
        <Space wrap>
          {
            ["default", "result", "success", "progress", "danger", "info", "other", "primary"].map(type => (
              <StateTag key={type} type={type} showBorder text={type} />
            ))
          }
        </Space>
      </Space>
    </Space>
  );
};

render(<BaseExample />);
