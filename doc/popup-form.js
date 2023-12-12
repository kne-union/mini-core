const {FormInfo, HeaderContainer, FixView} = miniCore;
const {range} = lodash;
const {Button, Popup, NavBar} = antd;

const {useState} = React;

const {
    FormPart,
    Input,
    TextArea,
    CalendarTimeRange,
    Calendar,
    CitySelect,
    FunctionSelect,
    UserListSelect,
    SubmitButton,
    usePopupForm
} = FormInfo;

const BaseExample = () => {
    const popupForm = usePopupForm();
    return <Button onClick={() => {
        popupForm({
            title: '新增表单',
            formProps: {
                onSubmit: (data) => {
                    console.log(data);
                }
            },
            children: <FormPart list={[<Input.Item name="name" label="姓名" rule="REQ"/>,
                <CalendarTimeRange.Item name="time" label="时间" rule="REQ"/>,
                <CitySelect.Item name="city" label="城市"/>, <FunctionSelect.Item name="function" label="职能"/>,
                <TextArea.Item name="des" label="说明"/>]}/>
        });
    }}>点击弹出popup</Button>;
};

render(<BaseExample/>);
