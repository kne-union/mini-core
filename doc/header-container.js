const { HeaderContainer } = miniCore;
const { Space, Icon } = antd;
const Taro = tarojsTaro;

const BaseExample = () => {
  return <HeaderContainer
    bgColor={'#6740C3'}
    extra={<Space>
      <Icon
        type={"arrow-thin-left"}
        className="iconfont"
        onClick={() => Taro.navigateBack({
          delta: 1
        }).catch(({ errMsg }) => {
          Taro.switchTab({ url: "/pages/index/index" });
        })}
      />
      返回
    </Space>}
  >
    哈哈哈
  </HeaderContainer>;
};

render(<BaseExample />);
