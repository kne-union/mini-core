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
