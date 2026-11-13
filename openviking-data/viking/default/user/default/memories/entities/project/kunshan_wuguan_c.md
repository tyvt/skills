# 昆山物管 C端
昆山物管 C端（昆山市民 / kssm）uni-app Vue3 项目（repo: zhi1-mobile-shimin-h5-zhishu-c-unlimited），同时构建 H5 与微信小程序，使用 axios + axios-miniprogram-adapter。

## 项目背景
- 对应禅道任务 #2430【昆山物管】C端支持前后端加解密，目标为参照昆山G端补充响应解密拦截器（2026-11-12 仅完成响应解密半边，未做请求加密，故任务未回写为已解决）
- 参考兄弟仓库 D:\repository\昆山G 的解密实现

## 技术栈
- 包管理器：bun（bun.lock 被 gitignore）
- 请求封装：src/request/index.js，使用 axios + axios-miniprogram-adapter
- axios-miniprogram-adapter 构造响应时带 res.headers（含 x-encrypt），且 dataType:'json' 下 res.data 已是 {key,data} 对象，H5 与小程序均可读取

## 解密实现（2026-11-12）
- 新增 decryptResponseData(res)：响应头 x-encrypt == "true" 时用平台 RSA 私钥解密 res.data.key 得 AES 密钥，以 AES-CBC/PKCS7、固定全 0 IV 解密 res.data.data，并将 res.data 替换为解析后的 JSON
- 在响应拦截器开头（HTTP 状态码/业务码判断之前）调用 decryptResponseData(res)
- 复用昆山G/太仓G 同一套平台 RSA 私钥
- 新增 src/request/jsencrypt-polyfill.js：在 jsencrypt import 前注入 window/navigator/self 全局垫片，避免小程序运行时不含 window 导致 jsencrypt 模块加载崩溃
- 依赖安装：crypto-js@4.1.1、jsencrypt@3.0.0-rc.1（bun add）

## 验证与遗留
- Node 冒烟测试通过：jsencrypt 垫片后加载正常、平台 RSA 私钥可解析、AES-CBC/PKCS7 全 0 IV 可加解密
- 完整 uni build 未执行（构建路由经编排器未运行），建议 bun run build / bun run build:mp
- .npmrc 与 vite.config.js 为工作区原有未提交改动（非本次新增），未跟踪的 bunfig.toml.bak 亦未纳入；本次仅暂存 3 个文件（src/request/index.js、src/request/jsencrypt-polyfill.js、package.json）
- 已提交并推送至 origin/main：commit 0998dfe（fast-forward，0d3ceba..0998dfe）

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "kunshan_wuguan_c",
  "source_extraction_id": "d13ad57b74a54622bca4a50e01a39dd2",
  "version": 2,
  "memory_type": "entities"
}
-->