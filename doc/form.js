const {FormInfo} = miniCore;

const {FormPart, Form, Input, AdvancedSelect, AutoComplete, CalendarTimeRange, SubmitButton} = FormInfo;

const BaseExample = () => {
    return <Form onSubmit={(data) => {
        console.log(data);
    }}>
        <FormPart
            list={[<Input.Item label="姓名" name="name" rule="REQ LEN-0-10"/>,
                <AdvancedSelect.Item name="test2" label="高级选择" rule="REQ" api={{
                    loader: () => {
                        return {
                            pageData: [{label: "第一项", value: 1}, {label: "第二项", value: 2, disabled: true}, {
                                label: "第三项", value: 3,
                            },],
                        };
                    }
                }}/>,<CalendarTimeRange.Item name="time" label="面试时间" rule="REQ"/>,
                <CalendarTimeRange.Item name="time2" label="面试时间2" rule="REQ" durationHidden/>,
                <AutoComplete.Item name="school" label="学校" rule="REQ" api={{
                    loader: ({data}) => {
                        return {
                            pageData: [{
                                label: "第一项" + data.searchText, value: 1
                            }, {label: "第二项" + data.searchText, value: 2, disabled: true}, {
                                label: "第三项" + data.searchText, value: 3,
                            },],
                        };
                    }
                }}/>, <SubmitButton>提交</SubmitButton>]}/>
    </Form>;
};

render(<BaseExample/>);
