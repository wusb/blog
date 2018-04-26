# 个人博客 http://simbawu.com
- 结合GitHub GraphQL API，免费开源、开箱即用；
- 响应式布局，完美适配不同屏幕尺寸；
- 全新技术栈，持续更新升级；
- 面向人群：工程师、设计师、产品经理等。

## 开箱即用

#### 安装

```shell
git clone git@github.com:simbawus/blog.git
cd blog
yarn
yarn start
```

执行完上面四个步骤，打开浏览器访问 http://0.0.0.0:8097 即可预览我的博客。

#### 修改

1. 进入**config/githubConfig.js** 修改github access token，如何获取token请查看我这篇文章：[如何利用GitHub GraphQL API开发个人博客？](https://github.com/simbawus/blog/issues/11)。
2. 进入**tools/release.sh**修改你的服务器配置，主要是修改下面这段，别忘了要在你电脑上配置你的服务器的ssh登录哦！

```shell
root@115.28.222.218:/alidata/www/simbawu/simba/blog
```

两步修改即可上线你的个人博客啦！当然，可以进行个性化定制。

#### 上线

```shell
yarn deploy
```

执行上述命令，即可完成项目发布。是不是So easy ？

## 一起搞事情

- 如果你是产品经理，对博客的用户需求、用户体验有独到的见解，欢迎贡献你的想法；
- 如果你是设计师，有前沿的设计审美、极致的设计追求，欢迎贡献你的双手；
- 如果你是工程师，技术过硬、热衷开源，欢迎跟牛逼的产品和设计一起打造一流的个人博客。

让我们跟大牛们一起，做点不一样的事情。欢迎加我微信：**simbawu610**。

## Thanks

谢谢大家，欢迎Star & Fork  ｡◕‿◕｡