const { Enum, Filter } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;
const { useState } = React;

const stateBarItems = [
  { key: "all", children: "全部" },
  { key: "progress", children: "进展中" },
  { key: "stop", children: "暂停" },
  { key: "close", children: "关闭" },
  { key: "other1", children: "其他1" },
  { key: "other2", children: "其他2" },
  { key: "other3", children: "其他3" },
  { key: "other4", children: "其他4超长超长超长超长" },
  { key: "other5", children: "其他5" }
];

const optionsBarItems = ({ degreeEnum, political }) => [
  { key: "mine", label: "我上传的", type: "SwitchButton" },,
  {
    key: "political",
    label: "政治面貌",
    type: "ListSelect",
    api: {
      loader: () => {
        return {
          pageData: political.map(({ value, description }) => ({
            value, label: description
          }))
        };
      }
    }
  },
  { key: "city", label: "期望城市", type: "CitySelect" },
  { key: "currentCity", label: "现居城市", type: "CitySelect" },
  { key: "function", label: "职能", type: "FunctionSelect" },
  { key: "industry", label: "行业", type: "IndustrySelect" },
  {
    key: "positionUser",
    label: "职位负责人",
    type: "UserListSelect",
    apis: {
      getUserList: {
        loader: () => {
          return {
            pageData: degreeEnum.map(({ value, description }) => ({
              uid: value, name: description, description
            }))
          };
        }
      }
    }
  }
];

const BaseExample = () => {
  const [filter, setFilter] = useState({});
  const [filter2, setFilter2] = useState({});
  const [filter3, setFilter3] = useState({});
  const [filter4, setFilter4] = useState({state: "stop", option2: {mine: true, political: [{value: "中共党员", label: "中共党员"}]}});

  return <Space direction={"vertical"} size={30}>
    <Space direction={"vertical"}>
      <View>Filter 组合</View>
      <Filter filter={filter4} onChange={setFilter4}>
        <Filter.SearchBar name="keyword" />
        <Filter.StateBar name="state" items={stateBarItems} />
        <Enum loading={null} moduleName={["degreeEnum", "political"]}>
          {([degreeEnum, political]) => {
            return <Filter.OptionsBar name="option2" items={optionsBarItems({ degreeEnum, political })} />;
          }}
        </Enum>
        <Filter.OptionsBar
          name="option3"
          items={[
            { key: "city", label: "期望城市", type: "CitySelect" },
            { key: "currentCity", label: "现居城市", type: "CitySelect" }
          ]}
        />
      </Filter>
    </Space>
    <Space direction={"vertical"}>
      <View>SearchBar</View>
      <Filter filter={filter} onChange={setFilter}>
        <Filter.SearchBar name="keyword" />
      </Filter>
    </Space>
    <Space direction={"vertical"}>
      <View>StateBar</View>
      <Filter filter={filter2} onChange={setFilter2}>
        <Filter.StateBar name="state" items={stateBarItems} />
      </Filter>
    </Space>
    <Space direction={"vertical"}>
      <View>OptionsBar</View>
      <Filter filter={filter3} onChange={setFilter3}>
        <Filter.OptionsBar
          name="option3"
          items={[
            { key: "city", label: "期望城市", type: "CitySelect" },
            { key: "currentCity", label: "现居城市", type: "CitySelect" }
          ]}
        />
      </Filter>
    </Space>
  </Space>;
};

render(<BaseExample />);
