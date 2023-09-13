const {Modal, ModalButton} = miniCore;
const {useState} = React;
const {Button} = antd;
const BaseExample = () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => {
            setOpen(true);
        }}>按钮</Button>
        <Modal open={open} onOpenChange={setOpen} title="确认解除微信关联？"
               content="解除后，将无法直接通过企业微信发起聊天。"/>

        <ModalButton title="确认解除微信关联？" content="解除后，将无法直接通过企业微信发起聊天。">点击弹出</ModalButton>
    </>;
};

render(<BaseExample/>);
