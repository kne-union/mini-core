
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
    <HighLightProvider keyword="东北">
      <HighLight tagName={View} text="我的家在东北，松花江上呀！"/>
    </HighLightProvider>
  </View>
};

render(<BaseExample/>);
```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

