const {StateTag, preset} = miniCore;

preset({
    stateColors: {primary: '#4F185A'}
});
const BaseExample = () => {
    return <StateTag type="primary">哈哈哈</StateTag>;
};

render(<BaseExample/>);
