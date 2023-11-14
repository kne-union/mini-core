const {InfoPage, Content} = miniCore;
const {Button, Steps} = antd;
const BaseExample = () => {
    return <InfoPage>
        <InfoPage.Part title="开票信息">
            <InfoPage.Part>
                <Content list={[{
                    label: '开票ID', content: 'IN00001533'
                }, {
                    label: '客户名称', content: '自动化测试有限公司'
                }, {
                    label: '合同', content: 'onsiteRPO合同', action: <Button>预览</Button>
                }]}/>
            </InfoPage.Part>
            <InfoPage.Part title="发票费用信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
            <InfoPage.Part title="发票信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
        </InfoPage.Part>
        <InfoPage.Part title="开票信息">
            <InfoPage.Part title="发票费用信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
            <InfoPage.Part title="发票信息">
                发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息发票费用信息
            </InfoPage.Part>
        </InfoPage.Part>
        <InfoPage.Part title="开票信息">
            <InfoPage.Collapse items={[{
                key: '1', title: '第一项', children: <Content list={[{
                    label: '开票ID', content: 'IN00001533'
                }, {
                    label: '客户名称', content: '自动化测试有限公司'
                }, {
                    label: '合同', content: 'onsiteRPO合同', action: <Button>预览</Button>
                }]}/>
            }, {
                key: '2', title: '第二项', children: '第二项第二项第二项第二项第二项第二项第二项第二项'
            }, {
                key: '3', title: '第三项', children: '第三项第三项第三项第三项第三项第三项第三项第三项第三项'
            }]}/>
        </InfoPage.Part>
        <InfoPage.Part title="审批流程">
            <Steps current={2} items={[{
                title: '第一步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第二步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第三步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第四步', description: '完成时间：2020-12-01 12:30'
            }]}/>
            <Steps direction="vertical" current={2} items={[{
                title: '第一步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第二步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第三步', description: '完成时间：2020-12-01 12:30'
            }, {
                title: '第四步', description: '完成时间：2020-12-01 12:30'
            }]}/>
        </InfoPage.Part>
    </InfoPage>
};

render(<BaseExample/>);
