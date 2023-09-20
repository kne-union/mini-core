const {FormInfo, HeaderContainer, FixView} = miniCore;
const {range} = lodash;
const {Button, Popup, NavBar} = antd;

const {useState} = React;

const {
    FormPart, Input, CalendarTimeRange, Calendar, CitySelect, FunctionSelect, UserListSelect, SubmitButton, PopupForm
} = FormInfo;

const BaseExample = () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => {
            setOpen(true);
        }}>点击弹出popup</Button>
        <PopupForm open={open} onOpenChange={setOpen} footer={<SubmitButton>提交</SubmitButton>}>
            <FormPart list={[<Input.Item name="name" label="姓名" rule="REQ"/>,
                <CalendarTimeRange.Item name="time" label="时间" rule="REQ"/>,
                <CitySelect.Item name="city" label="城市"/>]}/>
        </PopupForm>
    </>;
};

render(<BaseExample/>);
