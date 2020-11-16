module.exports = {
    projectName: "blog",
    prod: {
        name: 'prod 环境', // 环境名称
        script: 'npm run build', // 打包命令
        host: '47.98.175.99', // 服务器地址
        port: 22, // 服务器端口号
        username: 'root', // 服务器登录用户名
        password: 'W493189140c', // 服务器登录密码 *** 代表发布时输入 为了安全尽量***
        distPath: 'blog', // 本地打包生成目录
        webDir: '/web/webapps/blog/', // 服务器部署路径(不可为空或'/')
        isDelLocal: false, //上线之后是否删除本地文件dist
        projectUrl: 'https://www.jscheng.top' //项目上线后的地址
    }
};
