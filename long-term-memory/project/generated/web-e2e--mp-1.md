# 项目专属 · E2E 与测试（1/1）

共 2 条，引用前核对所属项目及代码。

### x1932 · 微信开发者工具报「source size exceed max limit 2048KB」但自测体积合规：判定口径不同 + 4M 上限必须在工具 UI 勾选

🔴 套路 ｜ 验证于 苏住房C ｜ 距代码最后改动 62 天，绑定具体实现，务必先核对代码

情况：苏住房C 市民端小程序反复报「subpackage /pages_owner/ source size 2140KB exceed max limit 2048KB」「main package source size 2207KB exceed max limit 2048KB」，而本地脚本 size-main-package.mjs 统计出来是合规的，用户自己也说「似乎判断标准不一致」。

为什么：两套口径不同 —— 自写脚本通常量的是构建产物磁盘体积，开发者工具量的是「源码打包后的 source size」且会把依赖副本、分包占位等算进去；同时 project.config.json 里写的 bigPackageSizeSupport 不会自动生效，必须在「详情 → 本地设置」里人工勾选「预览及真机调试时主包、分包体积上限调整为 4M」，未勾选时哪怕配置里有这一项，超限分包（如 pages_transaction ≈2115KB）依旧会让模拟器直接起不来。

怎么做：1) 体积问题先确认工具 UI 里 4M 勾选状态，再看「编译」面板原文，而不是看「调试器 → Console」（模拟器启动失败时 Console 只显示 [object Object]，拿不到真错误）；2) 分包超限优先把体积挪走（拆页面到新分包 / 复用 scripts/split-pages-vote.mjs 这类切分脚本），不要靠调脚本阈值来自我安慰；3) 复测流程固定为「清缓存 → 重新导入 dist → 点编译」。

> 依据（摘）：会话 672f088f：连续三条 source size exceed 报错（pages_owner 2140KB/2100KB、main package 2207KB），用户反馈「似乎判断标准不一致」；结论明确 bigPackageSiz…

文件：`zhi2-mobile-shimin/project.config.json`、`zhi2-mobile-shimin/scripts/size-main-package.mjs`、`zhi2-mobile-shimin/scripts/split-pages-vote.mjs`
---

### x2100 · uni-app 小程序登录态不持久：Pinia 持久化被 #ifdef H5 包住，小程序端根本不执行

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 62 天，绑定具体实现，务必先核对代码

现象：苏住房C（zhi2-mobile-shimin）小程序登录后关闭再打开就回到未登录状态，「我的」页昵称/用户ID 全丢。

为什么：store/user.js 里把 Pinia 状态的本地持久化（$patch 回填 + $subscribe 订阅写回）整段包在 /* #ifdef H5 */ … /* #endif */ 条件编译里。uni-app 的条件编译是构建期按平台裁剪代码，mp-weixin 构建时这段被整体删除，于是 uni.setStorageSync('user', …) 与启动时 uni.getStorageSync('user') 回填从未执行，登录时 setToken() 只写进了内存，小程序被销毁后 Pinia 重置即等价于退出登录。

怎么做：1) 持久化逻辑必须写在全平台生效的位置，H5 想用 sessionStorage 就单独再包一层 #ifdef H5，不要用 H5 分支去顶替通用分支；2) 排查同类「H5 正常、小程序异常」的问题，第一刀切 store 与 utils 里的 #ifdef/#ifndef 平台标签，逐个确认目标平台是否命中；3) 修完必须走「重新编译小程序 → 登录 → 完全关闭小程序 → 重开」验证，H5 跑通不代表小程序生效。

> 依据（摘）：会话 81967bea：用户报「当前小程序登录状态没有缓存，关闭小程序重新打开就退出登录了」；定位到 user.js 的 #ifdef H5 分支导致小程序端持久化被跳过，改为 uni.setStorageSync/getStorageSy…

文件：`zhi2-mobile-shimin/src/store/user.js`、`zhi2-mobile-shimin/src/pages/login/index.vue`、`zhi2-mobile-shimin/src/App.vue`
