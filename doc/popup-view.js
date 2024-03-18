const { usePopupView, FormInfo, FixedView, CommonListTitle, Warning } = miniCore;
const { Space, Button } = antd;
const { Text } = tarojsComponents;

const {
  Form,
  FormList,
  FormPart,
  Input,
  TextArea,
  CalendarTimeRange,
  CitySelect,
  IndustrySelect,
  FunctionSelect,
  SubmitButton
} = FormInfo;

const { useRef } = React;

const PopupViewButton = ({ position }) => {
  const popupView = usePopupView({ position });
  return (
    <Button key={position} onClick={() => {
      popupView({
        title: position,
        children: <Text>从{position}弹出</Text>
      });
    }}>从{position}弹出</Button>
  );
};

const BaseExample = () => {
  const popupView = usePopupView();
  const listRef = useRef();
  return (
    <Space direction={"vertical"} size={30}>
      <Space direction={"vertical"}>
        <Text>基础用法</Text>
        <Button onClick={() => {
          popupView({
            title: "基础用法",
            children: <Text>基础用法弹窗</Text>
          });
        }}>点击弹出</Button>
      </Space>
      <Space direction={"vertical"}>
        <Text>自定义弹出方向</Text>
        <Space wrap>
          {
            ["center", "top", "bottom", "left", "right"].map(position => (
              <PopupViewButton key={position} position={position} />
            ))
          }
        </Space>
      </Space>
      <Space direction={"vertical"}>
        <Text>联合表单</Text>
        <Button onClick={() => {
          const { close } = popupView({
            className: "bg-grey", title: "欢迎页面", children: <Form onSubmit={(data) => {
              console.log(data);
              close();
            }}>
              <Warning>警告提示警告提示警告提示警告提示警告提示警告提示警告提示警告提示警告提示警告提示警告提示</Warning>
              <FormPart list={[<Input.Item name="name" label="姓名" rule="REQ" />,
                <CalendarTimeRange.Item name="time" label="时间" rule="REQ" />,
                <CitySelect.Item name="city" label="城市" />, <FunctionSelect.Item name="function" label="职能" />,
                <IndustrySelect.Item name="industry" label="行业选择" multiple />,
                <TextArea.Item name="des" label="说明" />]} />
              <CommonListTitle subtitle="(填写工作经历)" extra={<Button onClick={() => {
                listRef.current.add();
              }}>添加</Button>}>工作经历</CommonListTitle>
              <FormList ref={listRef} name="list" minLength={1}
                        list={[<Input.Item name="name" label="名称" labelTips="哈哈哈哈哈哈" />,
                          <Input.Item name="field0" label="字段" />,
                          <Input.Item name="field1" label="字段1" />]} />
              <Button onClick={() => {
                popupView({
                  title: "下一个页面",
                  children: "下一个页面下一个页面下一个页面下一个页面下一个页面",
                  hasSafeArea: true
                });
              }}>点击弹出下一个页面</Button>
              <FixedView>
                <SubmitButton>提交</SubmitButton>
              </FixedView>
            </Form>
          });
        }}>点击弹出</Button>
      </Space>
    </Space>
  );
};

render(<BaseExample />);
