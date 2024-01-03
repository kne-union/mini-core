const {usePopupView, FormInfo, FixedView, CommonListTitle} = miniCore;
const {Button} = antd;

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
    SubmitButton,
} = FormInfo;

const {useRef} = React;

const BaseExample = () => {
    const popupView = usePopupView();
    const listRef = useRef();
    return <Button onClick={() => {
        const {close} = popupView({
            className: 'bg-grey', title: '欢迎页面', children: <Form onSubmit={(data) => {
                console.log(data);
                close();
            }}>
                <FormPart list={[<Input.Item name="name" label="姓名" rule="REQ"/>,
                    <CalendarTimeRange.Item name="time" label="时间" rule="REQ"/>,
                    <CitySelect.Item name="city" label="城市"/>, <FunctionSelect.Item name="function" label="职能"/>,
                    <IndustrySelect.Item name="industry" label="行业选择" multiple/>,
                    <TextArea.Item name="des" label="说明"/>]}/>
                <CommonListTitle subtitle="(填写工作经历)" extra={<Button onClick={() => {
                    listRef.current.add();
                }}>添加</Button>}>工作经历</CommonListTitle>
                <FormList ref={listRef} name="list" minLength={1}
                          list={[<Input.Item name="name" label="名称" labelTips="哈哈哈哈哈哈"/>, <Input.Item name="field0" label="字段"/>,
                              <Input.Item name="field1" label="字段1"/>]}/>
                <Button onClick={() => {
                    popupView({
                        title: '下一个页面',
                        children: '下一个页面下一个页面下一个页面下一个页面下一个页面',
                        hasSafeArea: true,
                    });
                }}>点击弹出下一个页面</Button>
                <FixedView>
                    <SubmitButton>提交</SubmitButton>
                </FixedView>
            </Form>
        });
    }}>点击弹出</Button>;
};

render(<BaseExample/>);
