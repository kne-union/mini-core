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
    </Filter>;
};

render(<BaseExample/>);
