const {FormInfo, Global} = miniCore;
const {range} = lodash;

const {
    FormPart,
    Form,
    Input,
    AdvancedSelect,
    AutoComplete,
    CalendarTimeRange,
    Calendar,
    CalendarRange,
    UserListSelect,
    InputNumber,
    InputNumberUnit,
    Upload,
    SubmitButton
} = FormInfo;

const BaseExample = () => {
  return <Global preset={{
    apis: {
      baseURL: 'https://erc.test.fatalent.cn',
      resume: {
        ossUpload: {
          url: '/api/v1/attachment/upload'
        }
      },
      user: {
        getUserList: {
          loader: () => {
            return {
              pageData: range(0, 20).map((index) => ({
                uid: index, name: `用户${index}`, description: `用户${index}`
              }))
            }
          }
        }
      }
    }
  }}>
    <Form onSubmit={(data) => {
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
          }}/>, <CalendarTimeRange.Item name="time" label="面试时间" rule="REQ"/>,
          <InputNumber.Item name="number" label="数字" addonAfter="元" step={2}/>,
          <InputNumberUnit.Item name="date" label="试用期"/>, <Calendar.Item name="time2" label="时间"/>,
                    <CalendarRange.Item name="time3" label="时间段"/>,
          <CalendarTimeRange.Item name="time2" label="面试时间2" rule="REQ" durationHidden/>,
          <UserListSelect.Item name="user" label="用户" rule="REQ"/>,
          <Upload.Item name="attachment" label="附件" rule="REQ" />,
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
    </Form>
  </Global>;
}

render(<BaseExample/>);
