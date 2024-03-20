### Global

Global管理了一个全局的Context，preset及公共样式，css变量，dayjs默认插件引入，dayjs汉化语言包引入等

Global组件需要放在最外面，推荐在app.js中

常见的 preset如下：

ajax: 发送ajax请求的方法，通常为axios.create()对象。因为在项目中可能回存在给axios对象添加拦截器或者其他config的情况，所以在应用内部用到的地方均应获取该对象使用。

apis: 该应用的所有后端apis，应用内部，不管是组件还是业务在使用api时都应从这里获取，以保证后端api的可迁移性

enums: 枚举定义，应用内部用到枚举的都应该通过Enum组件获取，Enum组件会根据此配置去加载对应的枚举数据

formInfo: FormInfo组件会从此获取应用的Form预设配置

| 属性名    | 说明         | 类型     | 默认值 |
|--------|------------|--------|-----|
| preset | 全局preset设置 | object | {}  |

### AvatarPreview 照片预览

#### 属性

| 属性名     | 说明     | 类型                                | 默认值 |
|---------|--------|-----------------------------------|-----|
| value   | 头像链接   | string                            | -   |
| onClick | 头像点击事件 | (event: React.MouseEvent) => void | -   |

### Calendar 日历

### Comment 评论列表

#### 属性

| 属性名        | 说明      | 类型                  | 默认值                   |
|------------|---------|---------------------|-----------------------|
| user       | 行为用户    | {name: string}      | {}                    |
| title      | 列表标题    | string              | '添加了评论'               |
| time       | 列表时间    | PickerDate          | -                     |
| timeFormat | 列表时间格式  | string              | 'YYYY-MM-DD HH:mm:ss' |
| action     | 列表项动作按钮 | ReactNode           | -                     |
| extra      | 列表项右侧区域 | ReactNode \| string | -                     |

### Content 内容展示

#### 属性

| 属性名   | 说明      | 类型                  | 默认值 |
|-------|---------|---------------------|-----|
| empty | 数据为空时展示 | ReactNode \| string | '-' |
| list  | 每条内容数据  | ContentItem[]       | []  |

#### ContentItem

| 属性名     | 说明             | 类型                    | 默认值 |
|---------|----------------|-----------------------|-----|
| display | 数据为空时展示        | boolean \| () => void | -   |
| label   | 内容标题文案         | ReactNode \| string   | -   |
| content | 内容数据           | ReactNode \| string   | -   |
| block   | 是否将内容数据渲染为块级元素 | boolean               | -   |
| tips    | 文案提示           | ReactNode \| string   | -   |
| action  | 单条内容动作         | ReactNode             | -   |

### Enum 显示或获取枚举值

#### 属性

| 属性名        | 说明                                                                               | 类型                                                     | 默认值                          |
|------------|----------------------------------------------------------------------------------|--------------------------------------------------------|------------------------------|
| moduleName | 枚举值的名字，在preset设置的枚举对象的key,当其为数组时可以一次性获取多个枚举值列表                                   | string \| string[]                                     | -                            |
| name       | 枚举值的key，用来从moduleName的枚举值列表中获取对应key的值，传入该参数时moduleName不能为数组，不传时可以获取到整个枚举列表       | string                                                 | -                            |
| children   | 获取到枚举值，当组件有name传入时获取name所对应的枚举值，如果没有name传入则获取到整个枚举列表，如果moduleName为数组获取到对应的多个枚举列表 | ({description})=> void \| ({enum1, enum2, ...})=> void | ({description})=>description |
| loading    | 加载枚举值期间显示内容                                                                      | jsx                                                    | null                         |
| force      | 在加载枚举列表时，如果之前已经加载过了默认会直接获取上次加载缓存的枚举列表，当该参数为true时则会忽略缓存从新获取枚举值列表数据                | boolean                                                | false                        |

### File 文件显示及预览

#### 属性

| 属性名          | 说明   | 类型        | 默认值                                       |
|--------------|------|-----------|-------------------------------------------|
| icon         | 文件图标 | ReactNode | Icon className="iconfont" type={"fujian"} |
| originalName | 文件名称 | string    | -                                         |
| value        | 文件ID | string    | -                                         |

### Filter 条件筛选

一般放在页面顶部

#### 属性

| 属性名      | 说明          | 类型       | 默认值 |
|----------|-------------|----------|-----|
| filter   | 筛选器的值       | object   | {}  |
| onChange | 筛选器值修改时触发执行 | function | -   |

#### Filter.SearchBar 关键字文本搜索

一般放在Filter顶部

| 属性名               | 说明                 | 类型                      | 默认值 |
|-------------------|--------------------|-------------------------|-----|
| name              | 筛选器的key，会赋值给filter | string                  | -   |
| searchPlaceholder | 输入框为空时占位符          | string                  | -   |
| onChange          | 点击搜索或输入Enter键时触发执行 | (value: string) => void | -   |

#### Filter.StateBar 状态筛选

| 属性名   | 说明                 | 类型                                          | 默认值 |
|-------|--------------------|---------------------------------------------|-----|
| name  | 筛选器的key，会赋值给filter | string                                      | -   |
| items | 状态列表               | {key: string,children: ReactNode\|string}[] | []  |

#### Filter.OptionsBar 复杂多条件筛选

| 属性名   | 说明                 | 类型                                                                      | 默认值 |
|-------|--------------------|-------------------------------------------------------------------------|-----|
| name  | 筛选器的key，会赋值给filter | string                                                                  | -   |
| items | 状态列表               | {key: string,label: string,type: string,className:string,api: Object}[] | []  |

#### OptionsBarItem

| 属性名       | 说明                 | 类型                                                                         | 默认值 |
|-----------|--------------------|----------------------------------------------------------------------------|-----|
| key       | 筛选器的key，会赋值给filter | string                                                                     | -   |
| label     | 筛选条件的名称            | string                                                                     | -   |
| type      | 筛选条件的类型            | CitySelect \|ListSelect \|UserListSelect \|FunctionSelect \|IndustrySelect | -   |
| className | 自定义筛选条件样式          | string                                                                     | -   |
| api       | 筛选条件需要远程获取数据时的接口   | string                                                                     | -   |

* 其他所需参数和对应type的组件参数一致

### FixedView 浮动层

#### 属性

| 属性名            | 说明         | 类型        | 默认值   |
|----------------|------------|-----------|-------|
| noPadding      | 不要内间距      | boolean   | false |
| hasSafeArea    | 是否需要底部安全距离 | boolean   | true  |
| fixed          | 是否固定在底部    | boolean   | true  |
| fixBottomExtra | 固定在底部的额外显示 | ReactNode | -     |
| className      | 自定义类名      | string    | -     |

### InfoPage

用以显示复杂数据

#### InfoPage.Part

放置于InfoPage内部显示带标题内容，如果InfoPage.Part内部再放置InfoPage.Part显示为二级标题，再放置一层则不显示标题

| 属性名   | 说明             | 类型     | 默认值 |
|-------|----------------|--------|-----|
| title | 标题             | string | -   |
| extra | 额外操作，显示于标题行最右侧 | jsx    | -   |

#### InfoPage.Collapse

放置于InfoPage内部显示止折叠面板

| 属性名              | 说明                               | 类型        | 默认值 |
|------------------|----------------------------------|-----------|-----|
| title            | 标题                               | string    | -   |
| activeKey        | 打开的折叠面板key                       | array,any | []  |
| defaultActiveKey | 打开的折叠面板key,在需要非受控时使用             | array,any | -   |
| onChange         | 折叠面板展开或收起时触发事件                   | function  | -   |
| items            | 折叠面板内容为{key,title,children}格式的数组 | array     | []  |

### FormInfo

***@kne/react-form-antd-taro*** 的再封装，实现了基本的Form样式和风格，统一和限制了调用方法，使写法更加统一规范，实现了一些复杂选择数据的Field组件

#### FormInfo{FormPart}

用以显示一个表单部分，可以包含对该段表单片段的说明

| 属性名          | 说明                   | 类型      | 默认值   |
|--------------|----------------------|---------|-------|
| list         | 表单组件列表，一般为一个Field的数组 | array   | []    |
| title        | 标题，说明该部分表单的内容        | string  | -     |
| subtitle     | 子标题，辅助说明             | string  | -     |
| isSubheading | 是否使标题显示为一个二级标题       | boolean | false |

#### FormInfo{List}

用以显示一个子表单，可以通过添加一条相同格式数据，一般用在类似教育经历，工作经历场景中。可以控制最大最小条数

| 属性名           | 说明                                                | 类型              | 默认值  |
|---------------|---------------------------------------------------|-----------------|------|
| list          | 表单组件列表，一般为一个Field的数组                              | array           | []   |
| name          | groupName，用来将该段表单的数据放置在对应的formData中               | string          | -    |
| title         | 标题，说明该部分表单的内容                                     | string          | -    |
| subtitle      | 子标题，辅助说明                                          | string          | -    |
| addText       | 添加按钮文案                                            | string          | 添加   |
| removeText    | 删除按钮文案                                            | string          | 删除   |
| minLength     | 最小个数，表单初始化会至少显示minLength条，实际条数等于minLength时将隐藏删除按钮 | number          | -    |
| maxLength     | 最大个数，实际条数等于maxLength时将隐藏添加按钮                      | number          | -    |
| isUnshift     | 新增时，新一条表单时添加到表单列表最前面还是最后面                         | boolean         | true |
| defaultLength | 初始化需要显示几段表单列表                                     | number          | -    |
| itemTitle     | 表单列表的二级title生成规则                                  | function,string | -    |

#### FormInfo{usePopupForm}

可以弹出一个Form页面来填写信息，hooks返回一个function，调用后即可弹出页面

```js
const popupForm = usePopupForm();

const { close } = popupForm({
  title, formProps, children
});
```

| 属性名       | 说明                                               | 类型     | 默认值 |
|-----------|--------------------------------------------------|--------|-----|
| title     | 表单弹出页面的标题                                        | string | -   |
| formProps | 传给Form的参数                                        | object | {}  |
| children  | 放置在Form中的children，一般为FormPart或者FormList          | jsx    | -   |
| footer    | Form的提交和取消按钮，已经默认预置号，通常不需要额外传值，除非业务上需要额外的一些设计和功能 | jsx    | -   |

#### FormInfo{fields}

表单的Field组件集合

此处将所有Field的共同参数作出说明，后面的具体Field将不包含这些共同部分

| 属性名         | 说明                                                | 类型              | 默认值   |
|-------------|---------------------------------------------------|-----------------|-------|
| name        | 表单字段的名称，将作为formData的属性的一部分                        | string          | -     |
| label       | 表单字段的显示文案，用以向用户说明字段的作用                            | string          | -     |
| rule        | 表单字段的校验规则，以空格分开，在表单字段触发校验时串行执行校验规则，全部通过时允许提交      | string          | -     |
| labelTips   | 字段提示说明，用来向用户补充说明字段的一些注意事项                         | string,function | -     |
| labelHidden | 是否隐藏label显示                                       | boolean         | false |
| labelRender | 一般情况label为string，当需要展示一个react组件时需要再传入该参数用以修饰label | function        | -     |

Field.Item

当Field需要放在FormPart或者List中，需要以此方法形式调用（目前的UI规范规定必须以此种方式调用Field，不推荐直接调用Field）如

```jsx
<AdvancedSelect.Item name="name" label="label" rule="rule" />
```

#### FormInfo{fields:{AdvancedSelect}}

高级列表选择器

#### FormInfo{fields:{AutoComplete}}

自动完成选择器

#### FormInfo{fields:{Avatar}}

头像或图片上传

#### FormInfo{fields:{Calendar}}

复杂日期选择器

#### FormInfo{fields:{CardType}}

证件类型选择和证件号码输入

#### FormInfo{fields:{CitySelect}}

城市选择

#### FormInfo{fields:{FunctionSelect}}

职能选择

#### FormInfo{fields:{IndustrySelect}}

行业选择

#### FormInfo{fields:{InputNumber}}

数字输入

#### FormInfo{fields:{InputNumberUnit}}

带单位数字输入

#### FormInfo{fields:{PhoneNumber}}

手机号输入

#### FormInfo{fields:{SalaryInput}}

薪资输入

#### FormInfo{fields:{TextArea}}

多行文本

#### FormInfo{fields:{Upload}}

文件上传

#### FormInfo{fields:{UserListSelect}}

用户选择

### Permission

权限判断

### Modal

模态对话框

### PopupView

弹出页面

### HeaderContainer

导航头

### Highlight

文字高亮

### StateTag

状态标签

### TipsMessage

提示消息

### Warning

警告文案

### Table

表格
