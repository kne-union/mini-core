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
