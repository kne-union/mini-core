const { Content, TipsMessage } = miniCore;
const { Button, Space } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return <Space direction={"vertical"} size={30}>
    <Space direction={"vertical"}>
      <View>基础用法</View>
      <Content
        list={[
          { label: "测试", content: "哈哈啊哈哈" },
          { label: "测试", content: "哈哈啊哈哈", tips: "哈哈哈哈", action: <Button>查看</Button> },
          { label: "tips", content: <TipsMessage content="哈哈哈哈" title="我是一个title" icon={null} /> }
        ]}
      />
    </Space>
    <Space direction={"vertical"}>
      <View>数据为空时展示</View>
      <Content
        empty={"-此处是空数据-"}
        list={[
          { label: "测试" },
          { label: "测试", tips: "哈哈哈哈" }
        ]}
      />
    </Space>
    <Space direction={"vertical"}>
      <View>内容单独一行显示</View>
      <Content
        empty={"-"}
        list={[
          { label: "测试" },
          { label: "测试", content: "哈哈啊哈哈", tips: "哈哈哈哈", block: true }
        ]}
      />
    </Space>
    <Space direction={"vertical"}>
      <View>数据展示判断</View>
      <Content
        empty={"-"}
        list={[
          { label: "测试1", content: '哈哈啊哈哈' },
          { label: "测试2", content: "哈哈啊哈哈", display: false },
          { label: "测试3", content: "哈哈啊哈哈", display: () => true }
        ]}
      />
    </Space>
  </Space>;
};

render(<BaseExample />);
