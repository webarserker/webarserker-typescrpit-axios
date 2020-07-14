# webarserker-typescrpit-axios
使用typescript重构axios，深入的学习typescript语法，并且完整解析axios前端部分,包涵测试代码，并且通过单元测试
# 学习的想法和感受
axios 熟悉的陌生人，天天用，天天踩坑，才知道里面玄机有多大
> 拦截器，请求头，[CSRF攻击与防御](https://www.cnblogs.com/yulia/p/10347691.html),test测试等等，关于CSRF可以去收看[X调查](https://www.bilibili.com/video/BV1TT4y1E7KF?from=search&seid=17674863590970169699) 孟买黑客用邮件如何转账8000万美金

黄奕老师的代码功力十分深厚，从头到尾跟着走完啧啧称奇，每一行代码基本脱落小白编程感觉，完全类似于由结果反推实现，像电影降临的高纬度外星人一样。先是从脑子里出现框架架构，然后不急不缓写出代码，本人尝试过这样写，但是代码最后测试时终归会遇到问题，可能是自己纯度还不够，代码量还不足，无法做到黄老师轻松完成的事情，这也许是编程大牛和中级程序员的区别之一。

> 做事情的时候，肯定会遇到困难，事情越有价值，困难就越具规模。遇到困难的时候，心平气和地面对就好，因为这只不过是生活常态。《把时间当作朋友》 李笑来

**代码编写时解决的bug:**
- 无数bug等着，老师的代码可以，你的却不行，自己写的优化也很多，这个[Axios](src/core.Axios.ts)的[_requestMethodWithoutData](src/core.Axios.ts)也是再三权衡为之，应为merage出来的参数变量和预期不符最后的发布，各种报错缠身，包括
- [rollup](https://stackoverflow.com/questions/57943277/rollup-generates-node-resolve-plugin-typeerror-cannot-read-property-preserve)
> rollup 安装时版本号对应不上，最新更新的npm包和最后更新的npm包产生差异化，建议初始化项目时，提交一版源码到GitHub备份，后续出现代码编译或者打包问题，直接从github pull代码到本地作为沙箱，然后单独测试打包，版本号等等
- [rollup](https://github.com/Polymer/tools/issues/757)
> npm包内引用文件错误，rollup会优先寻找并且引用你引用的所有js文件，大型计算机CI 64GB运行内容可以做到这点，设置过include，但是效果作用不大，本人电脑[I7 7700HQ 16GB 1070TI 8GB]无法编译完成。解决手段可以直接删除node_modules 文件夹，从新下载备份到GitHub的文件后，只安装初始化时的依赖，保证打包正常然后发布即可，本地只保留初始化文件，这样就回避rollup的遍历项目。
- [jasmine] [jest] 测试代码报错
> 尝试删除本地的 jasmine 重新安装对应版本的代码


## Table of Contents

_Note: This is only a navigation guide for the specification, and does not define or mandate terms for any specification-compliant documents._

- [Sections](#sections)
  - [Title](#title)
  - [Banner](#banner)
  - [Badges](#badges)
  - [Short Description](#short-description)
  - [Long Description](#long-description)
  - [Table of Contents](#table-of-contents-1)
  - [Security](#security)
  - [Background](#background)
  - [Install](#install)
  - [Usage](#usage)
  - [Extra Sections](#extra-sections)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Thanks](#thanks)
  - [Contributing](#contributing)
  - [License](#license)
- [Definitions](#definitions)
