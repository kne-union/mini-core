const { Comment } = miniCore;
const { Space, Button } = antd;
const { View } = tarojsComponents;
const { showToast } = tarojsTaro;

const BaseExample = () => {
  return <Space direction="vertical" size={30}>
    <Space direction="vertical">
      <View>基础用法</View>
      <Comment user={{ name: "张三" }} time={new Date()}>
        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
      </Comment>
    </Space>
    <Space direction="vertical">
      <View>添加事件</View>
      <Comment
        user={{ name: "张三" }}
        time={new Date()}
        action={<Button onClick={() => {
          showToast({ icon: "none", title: "点击撤回..." });
        }}>撤回</Button>}
      >
        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
      </Comment>
    </Space>
    <Space direction="vertical">
      <View>自定义标题</View>
      <Comment
        user={{ name: "张三" }}
        time={new Date()}
        title={"添加了备注"}
      >
        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
      </Comment>
    </Space>
    <Space direction="vertical">
      <View>自定义时间格式</View>
      <Comment
        user={{ name: "张三" }}
        time={new Date()}
        timeFormat={"YYYY-MM-DD"}
      >
        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
      </Comment>
    </Space>
    <Space direction="vertical">
      <View>添加 Extra 区域内容</View>
      <Comment
        user={{ name: "张三" }}
        time={new Date()}
        action={<Button onClick={() => {
          showToast({ icon: "none", title: "点击撤回..." });
        }}>撤回</Button>}
        title={"添加了备注"}
        timeFormat={"YYYY-MM-DD"}
        extra={<View>这里是Extra</View>}
      >
        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
      </Comment>
    </Space>
  </Space>;
};

render(<BaseExample />);
