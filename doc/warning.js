const { Warning } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return (
    <Space direction={'vertical'} size={30}>
      <Space direction={'vertical'}>
        <View>基础用法</View>
        <Warning>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</Warning>
      </Space>
      <Space direction={'vertical'}>
        <View>不同类型</View>
        <Space direction={'vertical'}>
          {
            ['success', 'info', 'error', 'warning', ].map(type => (
              <Warning key={type} type={type}>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</Warning>
            ))
          }
        </Space>
      </Space>
      <Space direction={'vertical'}>
        <View>文字颜色根据类型改变</View>
        <Space direction={'vertical'}>
          {
            ['success', 'info', 'error', 'warning', ].map(type => (
              <Warning key={type} type={type} fontColorful>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</Warning>
            ))
          }
        </Space>
      </Space>
    </Space>
  );
};

render(<BaseExample />);
