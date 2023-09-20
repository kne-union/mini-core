const {FormInfo, Global, CommonListTitle} = miniCore;
const {range} = lodash;
const {Button} = antd;

const {
    FormPart,
    FormList,
    Form,
    Input,
    SalaryInput,
    PhoneNumber,
    CardType,
    Picker,
    AdvancedSelect,
    AutoComplete,
    CalendarTimeRange,
    Calendar,
    CitySelect,
    FunctionSelect,
    TimeStep,
    CalendarRange,
    UserListSelect,
    InputNumber,
    InputNumberUnit,
    Upload,
    SubmitButton
} = FormInfo;

const {useRef} = React;

const BaseExample = () => {
    const listRef = useRef();
    return <Global preset={{
        apis: {
            baseURL: 'https://erc.test.fatalent.cn', resume: {
                ossUpload: {
                    url: '/api/v1/attachment/upload'
                }
            }, user: {
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
        <CommonListTitle subtitle="(至少填写一段工作经历)" extra="添加">工作经历</CommonListTitle>
        <CommonListTitle subtitle="(至少填写一段工作经历)" isSubheading extra="添加">工作经历</CommonListTitle>
        <Form data={{
            'name': "张三",
            'date-range': ['2010-01-01', '2012-01-02'],
            'test2': [{label: "第三项", value: 3}],
            'city': ['020'],
            'function': ["001001002"]
        }} onSubmit={(data) => {
            console.log(data);
        }}>
            <FormPart title="表单标题"
                      list={[<Input.Item label="姓名" name="name" rule="REQ LEN-0-10"/>,
                          <Picker.DateRangePicker.Item name="date-range" label="时间段"/>,
                          <PhoneNumber.Item name="phone" label="手机"/>, <CardType.Item name="id-card" label="身份证"/>,
                          <SalaryInput.Item name="salary" label="薪资" hasMonth typeEnum={({render}) => render([{
                              description: '年薪', value: 6
                          }, {description: '月薪', value: 5}, {description: '周薪', value: 4}, {
                              description: '日薪', value: 3
                          }, {description: '时薪', value: 2}])}/>,
                          <AdvancedSelect.Item name="test2" label="高级选择" rule="REQ" api={{
                              loader: () => {
                                  return {
                                      pageData: [{label: "第一项", value: 1}, {
                                          label: "第二项", value: 2, disabled: true
                                      }, {
                                          label: "第三项", value: 3,
                                      },],
                                  };
                              }
                          }}/>, <CitySelect.Item name="city" label="城市选择"/>,
                          <FunctionSelect.Item name="function" label="职能选择" multiple={false}/>,
                          <CalendarTimeRange.Item name="time" label="面试时间" rule="REQ"/>,
                          <InputNumber.Item name="number" label="数字" addonAfter="元" step={2}/>,
                          <InputNumberUnit.Item name="date" label="试用期"/>,
                          <Calendar.Item name="time2" label="时间"/>, <TimeStep.Item name="timeStep" label="时间2"/>,
                          <CalendarRange.Item name="time3" label="时间段"/>,
                          <CalendarTimeRange.Item name="time2" label="面试时间2" rule="REQ" durationHidden/>,
                          <UserListSelect.Item name="user" label="用户" rule="REQ"/>,
                          <Upload.Item name="attachment" label="附件" rule="REQ"/>,
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
            <CommonListTitle subtitle="(填写工作经历)" extra={<Button fill="none" onClick={() => {
                listRef.current.add();
            }}>添加</Button>}>工作经历</CommonListTitle>
            <FormList ref={listRef} name="list" minLength={1}
                      list={[<Input.Item name="name" label="名称"/>, <Input.Item name="field0" label="字段"/>,
                          <Input.Item name="field1" label="字段1"/>]}/>
            <FormList name="list2" title="list2" subtitle="副标题" minLength={1}
                      itemTitle={({index}) => `第${index + 1}项`}
                      list={[<Input.Item name="name" label="名称"/>, <Input.Item name="field0" label="字段"/>,
                          <Input.Item name="field1" label="字段1"/>]}/>
        </Form>
    </Global>;
}

render(<BaseExample/>);
