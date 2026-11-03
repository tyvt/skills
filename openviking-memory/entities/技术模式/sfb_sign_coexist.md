# 苏服办与业务签名共存约定
苏住房C 接入苏服办后请求头共存两套签名，通过 zs- 前缀区分业务侧与网关侧参数。

## 问题背景
- 苏服办网关要求 sign/nonce/timestamp，与本项目原有业务签名 key 冲突
- 若把业务签名改名苏服办 sign 会导致业务验签挂；反之苏服办参数不加前缀会被业务签名覆盖

## 解决方案
- 项目原有签名逻辑保持不变，请求头键名改为 zs-sign
- nonce、timestamp 也加 zs- 前缀（zs-nonce、zs-timestamp），与业务方约定同名不同前缀
- 苏服办自己的 sign 及配套参数严格按苏服办规范单独计算，走各自字段名
- utils/sign.js 供 uni.request 模块使用，static/js/sign.js 供 H5 侧 XHR 拦截使用，运行环境不同保留双份勿合并

## 验证与归属
- 涉及文件：src/utils/sign.js、src/static/js/sign.js、src/api/dispatcher.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 b5d791be；代码基线 83c4136

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_sign_coexist",
  "source_extraction_id": "81d0452c856b49acb88f4e24cefb5ea2",
  "version": 1,
  "memory_type": "entities"
}
-->