
# mini-core


### 安装

```shell
npm i --save @kne/mini-core
```


### 概述

这里填写组件概要说明


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- miniCore(@kne/mini-core),lodash(lodash)

```jsx
const {StateTag} = miniCore;
const BaseExample = () => {
    return <StateTag type="primary">哈哈哈</StateTag>;
};

render(<BaseExample/>);

```

- 枚举值
- 展示获取枚举值和批量获取枚举值
- miniCore(@kne/mini-core)

```jsx
const {Enum} = miniCore;
const BaseExample = () => {
    return <Enum loading={null} moduleName="degreeEnum" name={30}/>;
};

render(<BaseExample/>);

```

- 筛选
- 展示条件筛选器
- miniCore(@kne/mini-core)

```jsx
const {Enum, Filter} = miniCore;
const {useState} = React;

const BaseExample = () => {
    const [filter, setFilter] = useState({});
    return <Filter filter={filter} onChange={setFilter}>
        <Filter.SearchBar name="keyword"/>
        <Filter.StateBar name="state" items={[{
            key: 'all', children: '全部'
        }, {
            key: 'progress', children: '进展中'
        }, {
            key: 'stop', children: '暂停'
        }, {
            key: 'close', children: '关闭'
        }, {
            key: 'other1', children: '其他1'
        }, {
            key: 'other2', children: '其他2'
        }, {
            key: 'other3', children: '其他3'
        }, {
            key: 'other4', children: '其他4超长超长超长超长'
        }, {
            key: 'other5', children: '其他5'
        }]}/>
        <Enum loading={null}
              moduleName={["degreeEnum", "political", "positionStateEnum"]}>{([degreeEnum, political, positionStateEnum]) => {
            return <Filter.OptionsBar name="option2" items={[{
                key: 'city', label: '期望城市', type: 'CitySelect'
            }, {
                key: 'currentCity', label: '现居城市', type: 'CitySelect'
            }, {
                key: 'function', label: '职能', type: 'FunctionSelect'
            }, {
                key: 'industry', label: '行业', type: 'IndustrySelect'
            }, {
                key: 'mine', label: '我上传的', type: 'SwitchButton'
            }, {
                key: 'positionUser', label: '职位负责人', type: 'UserListSelect', apis: {
                    getUserList: {
                        loader: () => {
                            return {
                                pageData: degreeEnum.map(({value, description}) => ({
                                    uid: value, name: description, description
                                }))
                            }
                        }
                    }
                }
            }, {
                key: 'political', label: '政治面貌', type: "ListSelect", api: {
                    loader: () => {
                        return {
                            pageData: political.map(({value, description}) => ({
                                value, label: description
                            }))
                        }
                    }
                }
            }]}/>
        }}</Enum>
        <Filter.OptionsBar name="option3" items={[{
            key: 'city', label: '期望城市', type: 'CitySelect'
        }, {
            key: 'currentCity', label: '现居城市', type: 'CitySelect'
        }]}/>
    </Filter>;
};

render(<BaseExample/>);

```

- 表单
- 展示表单组件
- miniCore(@kne/mini-core),lodash(lodash),antd(@kne/antd-taro)

```jsx
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
    IndustrySelect,
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
            },
        }
    }}>
        <CommonListTitle subtitle="(至少填写一段工作经历)" extra="添加">工作经历</CommonListTitle>
        <CommonListTitle subtitle="(至少填写一段工作经历)" isSubheading extra="添加">工作经历</CommonListTitle>
        <Form data={{
            'name': "张三",
            'date-range': ['2010-01-01', '2012-01-02'],
            'test2': {value: 3, label: '第三项'},
            'city': ['020'],
            'industry': ["00100d4"],
            'function': ["001001002"]
        }} onSubmit={(data) => {
            console.log(data);
        }}>
            <FormPart title="表单标题"
                      list={[<AdvancedSelect.Item name="test2" label="高级选择"
                                                  interceptor={["picker-value", "picker-single"]} rule="REQ"
                                                  getSearchProps={() => {
                                                      return {};
                                                  }} api={{
                          loader: () => {
                              return {
                                  pageData: [{label: "第一项", value: 1}, {
                                      label: "第二项", value: 2, disabled: true
                                  }, {
                                      label: "第三项", value: 3,
                                  },],
                              };
                          }
                      }}/>, <Input.Item name="input" label="输入框" display={({formData}) => {
                          return formData.test2 === 3;
                      }}></Input.Item>, <SubmitButton>提交</SubmitButton>]}/>
        </Form>
        <Form data={{
            'name': "张三",
            'date-range': ['2010-01-01', '2012-01-02'],
            'test2': [3],
            'city': ['020'],
            'industry': ["00100d4"],
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
                          <AdvancedSelect.Item name="test2" label="高级选择" rule="REQ" getSearchProps={() => {
                              return {};
                          }} api={{
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
                          <IndustrySelect.Item name="industry" label="行业选择" multiple/>,
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

```

- popup里面的表单
- 展示popup里面的表单组件
- miniCore(@kne/mini-core),lodash(lodash),antd(@kne/antd-taro)

```jsx
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

```

- 高亮
- 展示搜索高亮
- miniCore(@kne/mini-core),tarojsComponents(@tarojs/components)

```jsx
const {HighLight, HighLightProvider} = miniCore;
const {View} = tarojsComponents;

const BaseExample = () => {
  return <View>
    <View>示例1：默认标签</View>
    <HighLightProvider keyword="东北">
      <HighLight text="我的家在东北，松花江上呀！"/>
    </HighLightProvider>
    <View style={{height: '30px'}}></View>
    <View>示例2：自定义容器标签</View>
    <HighLightProvider keyword={["项目需求分析", "新的技术栈"]}>
      <HighLight tagName={View} text="工作描述: 参与项目需求分析,业务模块划分↵学习一些新的技术栈↵部分功能模块代码的实现↵对自身完成代码进行简单测试↵对于电商项目的核心业务有一定经验↵后端开发RabbitMQJavaMySQLRedisSpringCloudElasticsearch微服务架构"/>
    </HighLightProvider>
    <View style={{height: '30px'}}></View>
    <View>示例2：忽略大小写</View>
    <HighLightProvider keyword={["哈尔滨", "信息", "abs wang"]}>
      <HighLight tagName={View} text="ABs Wang我的家在东北，松花江上呀！哈尔滨真美，信息通达"/>
    </HighLightProvider>
  </View>
};

render(<BaseExample/>);
```

- 日历
- 展示日历组件
- miniCore(@kne/mini-core),antd(@kne/antd-taro),tarojsComponents(@tarojs/components),dayjs(dayjs)

```jsx
const {
    Calendar,
    CalendarMonthView,
    CalendarMonthSelector,
    CalendarMonthSwiper,
    CalendarWeekTitle,
    CalendarWeekView,
    CalendarTimeStepView,
    CalendarTimeLengthView,
    CalendarView,
    CalendarTimeRangeView,
    CalendarTimeRangePopup,
    CalendarRangeView,
    CalendarPopup,
    CalendarRangePopup,
    CalendarTimeStepPopup
} = miniCore;
const {Space, Button} = antd;
const {useState} = React;
const {View} = tarojsComponents;
const BaseExample = () => {
    const [value, onChange] = useState(new Date());
    const [time, onTimeChange] = useState('09:15');
    const [timeLength, setTimeLength] = useState(60);
    const [timeRange, setTimeRange] = useState([new Date(), new Date(Date.now() + 60 * 60 * 1000)]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return <Space direction="vertical">
        <View>CalendarWeekTitle:展示星期文案</View>
        <CalendarWeekTitle/>
        <View>CalendarWeekView:展示一个周日期</View>
        <CalendarWeekView current={value} onChange={onChange} minDate="2020-10-01" maxDate="2030-01-01"
                          marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarMonthView:展示一个月日期</View>
        <CalendarMonthView current={value} onChange={onChange} minDate="2020-10-01" maxDate="2030-01-01"
                           marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarTimeStepView:展示一个时间段选择 {time}</View>
        <View style={{'--picker-height': '400px'}}>
            <CalendarTimeStepView value={time} onChange={onTimeChange}/>
        </View>
        <View>CalendarTimeLengthView:展示一个时长选择 {timeLength}分钟</View>
        <View style={{'--picker-height': '400px'}}>
            <CalendarTimeLengthView value={timeLength} onChange={setTimeLength}/>
        </View>
        <View>CalendarMonthSelector:展示月份选择</View>
        <View style={{'--month-selector-height': '200px'}}>
            <CalendarMonthSelector value={value} minDate="2020-10-01" maxDate="2030-01-01" onChange={onChange}/>
        </View>
        <View>CalendarMonthSwiper:展示一个月日期并且可以左右滑动切换月份</View>
        <CalendarMonthSwiper current={value} onChange={onChange} minDate="2020" maxDate="2030-01-01"
                             marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarView:完整日历视图</View>
        <View style={{'--month-selector-height': '600px'}}>
            <CalendarView value={value} onChange={onChange} disabledDate={(date) => {
                return dayjs(date).format('YYYY-MM-DD') === '2023-09-15';
            }}/>
        </View>
        <View>Calendar:完整日历功能</View>
        <Calendar value={value} onChange={onChange}/>
        <View>CalendarTimeRangeView:时间段选择器 {dayjs(timeRange[0]).format('YYYY-MM-DD HH:mm')}~{dayjs(timeRange[1]).format('YYYY-MM-DD HH:mm')}</View>
        <CalendarTimeRangeView value={timeRange} startTime="15:00" endTime="21:00" onChange={setTimeRange}/>
        <View>CalendarRangeView:</View>
        <CalendarRangeView/>
        <View>CalendarTimeRangePopup:</View>
        <Button onClick={() => {
            setOpen(true);
        }}>点击弹出</Button>
        <CalendarTimeRangePopup open={open} onOpenChange={setOpen} value={timeRange} onChange={setTimeRange}/>
        <View>CalendarPopup:</View>
        <Button onClick={() => {
            setOpen2(true);
        }}>点击弹出</Button>
        <CalendarPopup open={open2} onOpenChange={setOpen2}/>
        <View>CalendarRangePopup:</View>
        <Button onClick={() => {
            setOpen3(true);
        }}>点击弹出</Button>
        <View>CalendarTimeStepPopup:展示一个时间段选择弹窗</View>
        <Button onClick={() => {
            setOpen4(true);
        }}>点击弹出</Button>
        <CalendarTimeStepPopup open={open4} onOpenChange={setOpen4}/>
        <CalendarRangePopup open={open3} onOpenChange={setOpen3}/>
    </Space>;
};

render(<BaseExample/>);

```

- 确认对话框
- 展示确认对话框
- miniCore(@kne/mini-core),antd(@kne/antd-taro),tarojsComponents(@tarojs/components)

```jsx
const {Modal, ModalButton, useModal} = miniCore;
const {useState} = React;
const {Button} = antd;

const ExampleUseModal = () => {
    const modal = useModal();
    return <Button onClick={() => {
        modal({
            title: '确认解除微信关联？', content: '解除后，将无法直接通过企业微信发起聊天。'
        });
    }}>按钮</Button>;
};
const BaseExample = () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => {
            setOpen(true);
        }}>按钮</Button>
        <Modal open={open} onOpenChange={setOpen} title="确认解除微信关联？"
               content="解除后，将无法直接通过企业微信发起聊天。"/>

        <ModalButton title="确认解除微信关联？" content="解除后，将无法直接通过企业微信发起聊天。">点击弹出</ModalButton>
        <ExampleUseModal />
    </>;
};

render(<BaseExample/>);

```

- 信息展示
- 信息展示
- miniCore(@kne/mini-core),antd(@kne/antd-taro),tarojsComponents(@tarojs/components)

```jsx
const {Content, TipsMessage} = miniCore;
const {Button} = antd;
const BaseExample = () => {
  return <Content list={[{
    label: '测试', content: '哈哈啊哈哈'
  }, {
    label: '测试', content: '哈哈啊哈哈', tips: '哈哈哈哈', action: <Button>查看</Button>
  },{
    label:'tips',content:<TipsMessage content="哈哈哈哈" title="我是一个title" icon={null}/>
  }]}/>;
};

render(<BaseExample/>);

```

- 复杂信息展示
- 复杂信息展示
- miniCore(@kne/mini-core),antd(@kne/antd-taro),tarojsComponents(@tarojs/components)

```jsx
const {InfoPage, Content, Comment, Table} = miniCore;
const {Button, Steps, Space} = antd;
const BaseExample = () => {
    return <InfoPage>
        <InfoPage.Part title="开票信息">
            <InfoPage.Part>
                <Content list={[{
                    label: '开票ID', content: 'IN00001533'
                }, {
                    label: '客户名称', content: '自动化测试有限公司'
                }, {
                    label: '合同', content: 'onsiteRPO合同', action: <Button>预览</Button>
                }, {
                    label: '划转人', block: true, content: <Table dataSource={[{
                        id: 1, name: '哈哈哈', count: 12
                    }, {
                        id: 2, name: '张三', count: 200
                    }]} columns={[{name: 'name', title: '名称'}, {name: 'count', title: '数量'}]}/>
                }, {
                    label: '备注', content: null
                }]}/>
            </InfoPage.Part>
            <InfoPage.Part title="发票费用信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
            <InfoPage.Part title="发票信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
        </InfoPage.Part>
        <InfoPage.Part title="开票信息">
            <InfoPage.Part title="发票费用信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
            <InfoPage.Part title="发票信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
        </InfoPage.Part>
        <InfoPage.Part title="开票信息">
            <InfoPage.Collapse items={[{
                key: '1', title: '第一项', children: <Content list={[{
                    label: '开票ID', content: 'IN00001533'
                }, {
                    label: '客户名称', content: '自动化测试有限公司'
                }, {
                    label: '合同', content: 'onsiteRPO合同', action: <Button>预览</Button>
                }]}/>
            }, {
                key: '2', title: '第二项', children: '第二项第二项第二项第二项第二项第二项第二项第二项'
            }, {
                key: '3', title: '第三项', children: '第三项第三项第三项第三项第三项第三项第三项第三项第三项'
            }]}/>
        </InfoPage.Part>
        <InfoPage.Part title="审批流程">
            <Steps current={2} items={[{
                title: '第一步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第二步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第三步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第四步', description: '完成时间：2020-12-01 12:30'
            }]}/>
            <Steps direction="vertical" current={2} items={[{
                title: '第一步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第二步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第三步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第四步', description: '完成时间：2020-12-01 12:30'
            }]}/>
            <Steps direction="vertical" current={2} items={[{
                title: '第一步', description: <Space direction="vertical">
                    <Comment user={{name: '张三'}} time={new Date()}>
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                    </Comment>
                    <Comment user={{name: '张三'}} time={new Date()} action={<Button>撤回</Button>}>
                        评论评论评论评论评论评论评论评论评论评论评论评论评论评论
                    </Comment>
                </Space>
            }, {
                title: '第二步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第三步', status: 'error', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第四步', description: '完成时间：2020-12-01 12:30'
            }]}/>
        </InfoPage.Part>
    </InfoPage>
};

render(<BaseExample/>);

```

- 评论
- 评论
- miniCore(@kne/mini-core),antd(@kne/antd-taro)

```jsx
const {Comment} = miniCore;
const {Space, Button} = antd;


const BaseExample = () => {
    return <Space direction="vertical">
        <Comment user={{name: '张三'}} time={new Date()}>
            评论评论评论评论评论评论评论评论评论评论评论评论评论评论
        </Comment>
        <Comment user={{name: '张三'}} time={new Date()} action={<Button>撤回</Button>}>
            评论评论评论评论评论评论评论评论评论评论评论评论评论评论
        </Comment>
    </Space>;
};

render(<BaseExample/>);

```

- 弹出页面
- 弹出页面
- miniCore(@kne/mini-core),antd(@kne/antd-taro)

```jsx
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
                          list={[<Input.Item name="name" label="名称"/>, <Input.Item name="field0" label="字段"/>,
                              <Input.Item name="field1" label="字段1"/>]}/>
                <Button onClick={() => {
                    popupView({
                        title: '下一个页面', children: '下一个页面下一个页面下一个页面下一个页面下一个页面'
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

```

- 文件预览
- 文件预览
- miniCore(@kne/mini-core),antd(@kne/antd-taro)

```jsx
const {Global, File} = miniCore;
const BaseExample = () => {
    return <Global preset={{
        apis: {
            file: {
                getFileUrl: {
                    loader: ({params}) => {
                        return "https://attachment.test.fatalent.cn/attachment/Q0ol94kBBZgnCXyZKG1Y.jpg?Expires=1700814537&OSSAccessKeyId=LTAI5tAfbu2aBppB3jMj1kMt&Signature=KcJHlI8FDYMolFQFxacGzhoaA1A%3D";
                    }
                }
            }
        }
    }}>
        <File value="xxxxx" originalName="预览文件.jpg"/>
    </Global>;
};

render(<BaseExample/>);

```

- 表格
- 表格
- miniCore(@kne/mini-core),antd(@kne/antd-taro)

```jsx
const {Table} = miniCore;
const BaseExample = () => {
    return <Table dataSource={[{
        id: 1, name: '哈哈哈', count: 12
    }, {
        id: 2, name: '张三', count: 200
    }]} columns={[{name: 'name', title: '名称'}, {name: 'count', title: '数量'}]}/>;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

