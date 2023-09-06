export default defineAppConfig({
    "lazyCodeLoading": "requiredComponents",
    pages: ['pages/index/index', 'pages/components/index', 'pages/mine/index'],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
        navigationStyle: "custom"
    },
    tabBar: {
        backgroundColor: '#ffffff', color: '#003365', selectedColor: '#5879D0', custom: true, list: [{
            pagePath: 'pages/index/index', text: '工作台'
        }, {
            pagePath: 'pages/components/index', text: '职位'
        }, {
            pagePath: 'pages/mine/index', text: '我的'
        }]
    },
    "embeddedAppIdList": ["wx4167e8a57f6fb735", "wx7fc7c62a93b1b191"]
})
