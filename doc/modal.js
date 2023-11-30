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
