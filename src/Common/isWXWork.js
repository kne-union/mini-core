import Taro from '@tarojs/taro';
const isWXWork = () => Taro.getSystemInfoSync().environment === 'wxwork';

export default isWXWork;
