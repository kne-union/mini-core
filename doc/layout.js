const { Layout } = miniCore;
const { View } = tarojsComponents;
const { Icon } = antd;
const BaseExample = () => {
  return <Layout
    hasSafeArea
    toolbarList={[{
      key: "/pages/index/index",
      icon: (active) => active ? <Icon type="tabgongzuotai-xuanzhong" className={"iconfont"} /> :
        <Icon type="tabgongzuotai-moren" className={"iconfont"} />,
      title: "首页"
    }, {
      key: "/pages/components/index",
      icon: (active) => active ? <Icon type="tabzhiwei-xuanzhong" className={"iconfont"} /> :
        <Icon type="tabzhiwei-moren" className={"iconfont"} />,
      title: "组件示例"
    }]}
    header={{
      title: "layout",
      bgColor: "#ff8f1f",
      extra: <View>extra</View>,
      backArrow: <Icon type="arrow-bold-left" className="iconfont nav-bar-icon" />
    }}
  >
    哈哈哈
  </Layout>;
};

render(<BaseExample />);
