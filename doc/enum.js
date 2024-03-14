const { Enum } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  return <Space direction={"vertical"} size={30}>
    <Space direction={"vertical"}>
      <View>基础用法</View>
      <Enum loading={null} moduleName="degreeEnum" name={30} />
    </Space>
    <Space direction={"vertical"}>
      <View>返回值自定义</View>
      <Enum moduleName="experienceEnum" name={'0-1'}>
        {({description}) => {
          return 'experienceEnum-' + description;
        }}
      </Enum>
    </Space>
    <Space direction={"vertical"}>
      <View>展示 Enum 所有值</View>
      <Enum moduleName="experienceEnum">
        {experienceEnum => (
          <Space>
            {experienceEnum.map(item => <View>{item.description}</View>)}
          </Space>
        )}
      </Enum>
    </Space>
  </Space>;
};

render(<BaseExample />);
