const {Table} = miniCore;
const BaseExample = () => {
    return <Table dataSource={[{
        id: 1, name: '哈哈哈', count: 12
    }, {
        id: 2, name: '张三', count: 200
    }]} columns={[{name: 'name', title: '名称'}, {name: 'count', title: '数量'}]}/>;
};

render(<BaseExample/>);
