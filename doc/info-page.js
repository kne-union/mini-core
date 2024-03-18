const { InfoPage, Content, Comment, Table } = miniCore;
const { Button, Steps, Space } = antd;
const { View } = tarojsComponents;

const contentList = [
  { label: "开票ID", content: "IN00001533" },
  { label: "客户名称", content: "自动化测试有限公司" },
  { label: "合同", content: "onsiteRPO合同", action: <Button>预览</Button> },
  {
    label: "划转人",
    block: true,
    content: <Table
      dataSource={[
        { id: 1, name: "哈哈哈", count: 12 },
        { id: 2, name: "张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三", count: 200 }
      ]}
      columns={[{ name: "name", title: "名称" }, { name: "count", title: "数量" }]}
    />
  },
  { label: "备注", content: null }
];

const stepsItems = [{
  title: "第一步", description: "完成时间：2020-12-01 12:30"
}, {
  title: "第二步", description: "完成时间：2020-12-01 12:30"
}, {
  title: "第三步", description: "完成时间：2020-12-01 12:30"
}, {
  title: "第四步", description: "完成时间：2020-12-01 12:30"
}];

const BaseExample = () => {
  return (
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <View>基础用法</View>
        <InfoPage>
          <InfoPage.Part title="开票信息">
            <InfoPage.Part>
              <Content list={contentList} />
            </InfoPage.Part>
          </InfoPage.Part>
        </InfoPage>
      </Space>
      <Space direction={"vertical"}>
        <View>带有副标题</View>
        <InfoPage>
          <InfoPage.Part title="开票信息">
            <InfoPage.Part title="发票费用信息">
              <InfoPage.Part>
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
              </InfoPage.Part>
              <InfoPage.Part title="开票信息详情">
                <Content list={contentList} />
              </InfoPage.Part>
            </InfoPage.Part>
          </InfoPage.Part>
        </InfoPage>
      </Space>
      <Space direction={"vertical"}>
        <View>折叠面板</View>
        <InfoPage.Part title="开票信息">
          <InfoPage.Collapse items={[{
            key: "1", title: "第一项", children: <Content list={[{
              label: "开票ID", content: "IN00001533", tips: "哈哈哈"
            }, {
              label: "客户名称", content: "自动化测试有限公司"
            }, {
              label: "合同", content: "onsiteRPO合同", action: <Button>预览</Button>
            }]} />
          }, {
            key: "2", title: "第二项", children: "第二项第二项第二项第二项第二项第二项第二项第二项"
          }, {
            key: "3", title: "第三项", children: "第三项第三项第三项第三项第三项第三项第三项第三项第三项"
          }]} />
        </InfoPage.Part>
      </Space>
      <Space direction={"vertical"}>
        <View>内容自定义</View>
        <InfoPage>
          <InfoPage.Part title="审批流程">
            <Steps current={2} items={stepsItems} />
            <Steps direction="vertical" current={2} items={stepsItems} />
            <Steps
              direction="vertical"
              current={2}
              items={[{
                title: "第一步",
                description: <Space direction="vertical">
                  <Comment user={{ name: "张三" }} time={new Date()}>
                    评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                  </Comment>
                  <Comment user={{ name: "张三" }} time={new Date()} action={<Button>撤回</Button>}>
                    评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                  </Comment>
                </Space>
              },
                { title: "第二步", description: "完成时间：2020-12-01 12:30" },
                { title: "第三步", status: "error", description: "完成时间：2020-12-01 12:30" },
                { title: "第四步", description: "完成时间：2020-12-01 12:30" }
              ]}
            />
          </InfoPage.Part>
        </InfoPage>
      </Space>
    </Space>
  );
};

render(<BaseExample />);
