import classnames from 'classnames';
import {Icon} from '@kne/antd-taro';

const toolbar = [{
    key: '/pages/index/index',
    icon: (active) => active ? <Icon type="tabgongzuotai-xuanzhong" className={classnames('iconfont')}/> :
        <Icon type="tabgongzuotai-moren" className={classnames('iconfont')}/>,
    title: '首页',
    pagePath: '/pages/index/index'
}, {
    key: '/pages/components/index',
    icon: (active) => active ? <Icon type="tabzhiwei-xuanzhong" className={classnames('iconfont')}/> :
        <Icon type="tabzhiwei-moren" className={classnames('iconfont')}/>,
    title: '组件',
    pagePath: '/pages/components/index'
}, {
    key: '/pages/mine/index',
    icon: (active) => active ? <Icon type="tabwode-xuanzhong" className={classnames('iconfont')}/> :
        <Icon type="tabwode-moren" className={classnames('iconfont')}/>,
    title: '我的',
    pagePath: '/pages/mine/index'
}];

export default toolbar;
