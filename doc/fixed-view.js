const {FixedView,FixedButton, FixedLoadingButton} = miniCore;
const {Space} = antd;
const {View} = tarojsComponents;

const BaseExample = () => {
    return (
      <FixedView
        noPadding
        hasSafeArea
        direction={'vertical'}
        fixBottomExtra={<Space direction={'vertical'}><View>fixBottomExtra</View><View>fixBottomExtra2</View></Space>}
      >
        哈哈哈
        <Space>
          <FixedButton type='default'>FixedButton</FixedButton>
          <FixedButton type='primary'>FixedButton</FixedButton>
        </Space>
        <FixedLoadingButton loading type='primary'>FixedLoadingButton</FixedLoadingButton>
      </FixedView>
    );
};

render(<BaseExample/>);
