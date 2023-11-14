const {Content} = miniCore;
const {Button} = antd;
const BaseExample = () => {
    return <Content list={[{
        label: '测试', content: '哈哈啊哈哈'
    }, {
        label: '测试', content: '哈哈啊哈哈', tips: '哈哈哈哈', action: <Button>查看</Button>
    }]}/>;
};

render(<BaseExample/>);
