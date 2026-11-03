# 苏服办人脸成功却报 DOMException
苏服办 SDK 人脸认证已 success（retcode 000000），随后 location.replace 抛 DOMException code 12，根因是 origin 拼接 BASE_URL 生成非法 URL。

## 根因
- Vite 配置 `base: './'` 时 `import.meta.env.BASE_URL` 为 `./`
- 拼 `window.location.origin + normalizedBase + '#/...'` 得到 `https://host:port./#/...`（origin 与 `./` 直连），属非法 URL
- 堆栈落在 pages/face/face.vue 的 replace

## 修复方案
- 基于当前页做 hash 路由：`window.location.href.split('#')[0] + '#/pages/face/bdc?...'`
- bdc.vue 的 buildBackUrl 同样按当前路径生成，不要把 `./` 接到 origin 后
- 改完需重新 build 并部署 H5 再测整段人脸→选屋流程

## 验证与归属
- 验证证据：会话 a13995cc 用户贴 success 日志与 DOMException，非法示例 `https://wygl.wxwgzx.com:8989./#/pages/face/bdc`
- 验证文档：无锡市区小程序嵌入H5/015.md
- 涉及文件：src/pages/face/face.vue、src/pages/face/bdc.vue、vite.config.ts
- 所属项目：无锡市区小程序嵌入H5；来源会话：a13995cc-4742-462e-9a5d-9454229b15d1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "face_hash_domexception",
  "source_extraction_id": "eff8d90abd104a4a8d65d75af3d6c80f",
  "version": 2,
  "memory_type": "entities"
}
-->