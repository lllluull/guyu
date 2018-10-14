const CONF = {
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1257750733',
    qcloudSecretId: 'AKIDTkma9TJzDCvPfgfyEG3bNyMWR8annRt7',
    qcloudSecretKey: '7yay6zd3EAtOgkaBetuhFbibFixxhBbw',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxbb71bfb2c1e02a8f',

    // 微信小程序 App Secret
    appSecret: '25eafc6892cf442291c6c411323cd57a',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,
    mysql: {
        insecureAuth: true,
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxbb71bfb2c1e02a8f',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
    // wxMessageToken: 'abcdefgh'
}

module.exports = CONF
