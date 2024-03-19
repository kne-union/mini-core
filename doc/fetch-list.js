const { CommonFetchList, Global, usePreset } = miniCore;
const { Space, Avatar } = antd;
const { View } = tarojsComponents;

const BaseExample = () => {
  const { apis } = usePreset();
  return <Space direction="vertical" size={30}>
    <Space direction="vertical">
      <View>基础用法</View>
      <CommonFetchList showTotalCount {...apis.user.getUserList}>
        {
          ({ pageData }) => {
            return (
              <Space direction="vertical" style={{ padding: "10px 0", boxSizing: "border-box" }}>
                {
                  pageData.map(item => (
                    <Space key={item.id} style={{ border: "1px solid #ddd", padding: "10px", boxSizing: "border-box", width: '100%' }}>
                      <Avatar gender={item.gender} />
                      <View>
                        <View>Name: {[item.name, item.englishName].join("，")}</View>
                        <View>Gender: {item.gender}</View>
                        <View>Email: {item.email}</View>
                      </View>
                    </Space>
                  ))
                }
              </Space>
            );
          }
        }
      </CommonFetchList>
    </Space>
  </Space>;
};

render(<Global
  preset={{
    apis: {
      baseURL: "https://erc.test.fatalent.cn",
      user: {
        getUserList: {
          loader: () => {
            return mockData.userList.data;
          }
        }
      }
    }
  }}>
  <BaseExample />
</Global>);
