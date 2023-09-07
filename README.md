
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
const BaseExample = ()=>{
    return '我是一个示例组件';
};

render(<BaseExample />);

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
    const [filter, setFilter] = useState([]);
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
                key: 'positionUser', label: '职位负责人', type: 'UserListSelect'
            }]}/>
        }}</Enum>
    </Filter>;
};

render(<BaseExample/>);

```

- 表单组件
- 展示表单组件
- miniCore(@kne/mini-core)

```jsx
const {FormInfo} = miniCore;

const {FormPart, Form, Input, AdvancedSelect, AutoComplete, SubmitButton} = FormInfo;

const BaseExample = () => {
    return <Form onSubmit={(data) => {
        console.log(data);
    }}>
        <FormPart
            list={[<Input.Item label="姓名" name="name" rule="REQ LEN-0-10"/>,
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

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

