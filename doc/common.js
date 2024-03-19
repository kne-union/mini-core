const {
  CommonIsJSON: isJSON,
  CommonAutoComplete,
  CommonFileList,
  CommonListTitle,
  CommonLoadingView,
  CommonSelectedFooter,
  CommonSelectedLabel,
} = miniCore;
const { Space, Icon } = antd;
const { View } = tarojsComponents;
const { showToast } = tarojsTaro;

const data = "data";
const dataJson = {
  "title": "Warning 警告提示",
  "description": "Warning 警告提示",
  "code": "./warning.js",
  "scope": [
    {
      "name": "miniCore",
      "packageName": "@kne/mini-core"
    },
    {
      "name": "antd",
      "packageName": "@kne/antd-taro"
    },
    {
      "name": "tarojsComponents",
      "packageName": "@tarojs/components"
    }
  ]
};

const fileList = [
  { fileName: "file1", id: "1" },
  { originalName: "file2", id: "2" }
];

const SubTitle = ({ children }) => {
  return <View style="font-size: 16px">{children}</View>;
};

const BaseExample = () => {
  return <Space direction="vertical" size={30}>
    <Space direction="vertical">
      <View>CommonIsJSON</View>
      <Space direction="vertical">
        <View>{(!!isJSON(data)).toString()}</View>
        <View>{(!!isJSON(dataJson)).toString()}</View>
      </Space>
    </Space>
    <Space direction="vertical">
      <View>AutoComplete</View>
      <SubTitle>输入框自动完成功能。</SubTitle>
      <CommonAutoComplete placeholder={"AutoComplete--"} />
    </Space>
    <Space direction="vertical">
      <View>FileList</View>
      <SubTitle>基础用法</SubTitle>
      <CommonFileList list={fileList} />
      <SubTitle>可删除</SubTitle>
      <CommonFileList
        list={fileList}
        apis={{
          onDelete: ({ id, fileName, originalName }) => {
            showToast({
              icon: "none",
              title: `ID为${id}的文件${fileName || originalName}被点击删除...`
            });
          }
        }}
      />
    </Space>
    <Space direction="vertical">
      <View>ListTitle</View>
      <Space direction={"vertical"}>
        <SubTitle>基础用法</SubTitle>
        <CommonListTitle>标题</CommonListTitle>
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>副标题</SubTitle>
        <CommonListTitle subtitle={"副标题"}>标题</CommonListTitle>
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>extra</SubTitle>
        <CommonListTitle
          subtitle={"副标题"}
          extra={<Icon
            type="arrow-bold-right"
            className="iconfont nav-bar-icon"
            onClick={() => {
              showToast({ icon: "none", title: "点击 Extra" });
            }}
          />}
        >
          标题
        </CommonListTitle>
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>内标题</SubTitle>
        <CommonListTitle subtitle={"副标题"} isSubheading>标题</CommonListTitle>
      </Space>
    </Space>
    <Space direction={"vertical"}>
      <View>LoadingView</View>
      <Space direction={"vertical"}>
        <SubTitle>基础用法</SubTitle>
        <CommonLoadingView />
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>自定义加载文案</SubTitle>
        <CommonLoadingView>CommonLoadingView...</CommonLoadingView>
      </Space>
    </Space>
    <Space direction={"vertical"}>
      <View>SelectedFooter</View>
      <Space direction={"vertical"}>
        <SubTitle>基础用法</SubTitle>
        <CommonSelectedFooter />
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>修改底部按钮文案</SubTitle>
        <CommonSelectedFooter confirmText={"Confirm"} resetText={"Cancel"} />
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>添加按钮事件</SubTitle>
        <CommonSelectedFooter
          confirmText={"Confirm"}
          onConfirm={() => {
            showToast({icon: 'none', title: 'on click confirm...'})
          }}
          resetText={"Reset"}
          onReset={() => {
            showToast({icon: 'none', title: 'on click reset...'})
          }}
        />
      </Space>
      <Space direction={"vertical"}>
        <SubTitle>只展示一个按钮</SubTitle>
        <CommonSelectedFooter showReset={false} />
        <CommonSelectedFooter showConfirm={false} />
      </Space>
    </Space>
    <Space direction={"vertical"}>
      <View>SelectedLabel</View>
      <CommonSelectedLabel
        maxLength={10}
        value={[{ label: "测试", value: "1" }, { label: "文案", value: "2" }]}
        onClose={({label, value}) => {
          showToast({
            icon: 'none',
            title: `值为“${value}”、Label为“${label}”的数据被点击删除...`
          })
        }}
      />
    </Space>
  </Space>;
};

render(<BaseExample />);
