const { CommonScrollLoader } = miniCore;
const {Space} = antd;
const {View} = tarojsComponents;

const ScrollLoaderInner = () => {
  return (
    <Space direction={'vertical'}>
      {
        ['one', 'two'].map(item => (
          <View key={item} style={{padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd'}}>
            {item}
          </View>
        ))
      }
    </Space>
  )
}

const BaseExample = () => {
  return (
    <Space direction={'vertical'} size={30}>
      <Space direction={'vertical'}>
        <View>基础用法</View>
        <CommonScrollLoader>
          <ScrollLoaderInner />
        </CommonScrollLoader>
      </Space>
      <Space direction={'vertical'}>
        <View>加载中</View>
        <CommonScrollLoader isLoading loadingTips={'正在加载数据...'}>
          <ScrollLoaderInner />
        </CommonScrollLoader>
      </Space>
      <Space direction={'vertical'}>
        <View>没有更多数据</View>
        <CommonScrollLoader noMore completeTips={'加载已完成，没有更多数据了'}>
          <ScrollLoaderInner />
        </CommonScrollLoader>
      </Space>
    </Space>
  )
};

render(<BaseExample />);
