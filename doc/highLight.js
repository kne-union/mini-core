const { HighLight, HighLightProvider } = miniCore;
const { View } = tarojsComponents;
const { Space } = antd;

const BaseExample = () => {
  return <Space direction={"vertical"} size={30}>
    <Space direction={"vertical"}>
      <View>默认标签</View>
      <HighLightProvider keyword="东北">
        <HighLight text="我的家在东北，松花江上呀！" />
      </HighLightProvider>
    </Space>
    <Space direction={"vertical"}>
      <View>自定义容器标签</View>
      <HighLightProvider keyword={["项目需求分析", "新的技术栈"]}>
        <HighLight tagName={View}
                   text="工作描述: 参与项目需求分析,业务模块划分↵学习一些新的技术栈↵部分功能模块代码的实现↵对自身完成代码进行简单测试↵对于电商项目的核心业务有一定经验↵后端开发RabbitMQJavaMySQLRedisSpringCloudElasticsearch微服务架构" />
      </HighLightProvider>
    </Space>
    <Space direction={"vertical"}>
      <View>忽略大小写</View>
      <HighLightProvider keyword={["哈尔滨", "信息", "abs", "wang"]}>
        <HighLight tagName={View} text="ABs Wang我的家在东北，松花江上呀！哈尔滨真美，信息通达" />
      </HighLightProvider>
      <View>区分大小写</View>
      <HighLightProvider keyword={["哈尔滨", "信息", "abs", "Wang"]} caseSensitive>
        <HighLight tagName={View} text="ABs Wang我的家在东北，松花江上呀！哈尔滨真美，信息通达" />
      </HighLightProvider>
    </Space>
  </Space>;
};

render(<BaseExample />);