# 昆山G 响应解密逻辑
昆山G（wuguan-fe-zhi1-web-admin-h5-g）参考太仓G（zhi1-web-admin）项目，在两个请求拦截器中补充了响应解密逻辑。

## 实现要点
- 修改文件：src/request/index.js 与 src/utils/request.js（后者被 73 个 API 模块引用，必须同步处理）
- 新增 import JSEncrypt from 'jsencrypt'；依赖 jsencrypt@3.0.0-rc.1 与 crypto-js@4.1.1 已存在
- 新增 decryptResponseData(res) 函数：响应头 x-encrypt == "true" 时，用平台 RSA 私钥解密 res.data.key 得到 AES 密钥，以 AES-CBC/PKCS7、固定全 0 IV 解密 res.data.data，并将 res.data 替换为解析后的 JSON
- 在响应拦截器开头（版本号/401/错误码判断之前）调用 decryptResponseData(res)
- 相比太仓G 原版增加 if (!aesKeyBase64) 保护：RSA 解密为空时不抛错、保留原始 res.data，避免整页崩溃

## 平台密钥
- 平台签名密钥 WEXL6R2P7S3Q9T4V8Y1U5Z0OAICBHDGE 在昆山G 与太仓G 完全一致，复用太仓G 同一套平台 RSA 私钥（平台级密钥，跨同底座项目通用）
- 该解密模式已被昆山物管 C端（zhi1-mobile-shimin-h5-zhishu-c-unlimited）复用，参照本实现新增响应解密拦截器（2026-11-12）
- 若昆山G 后端使用不同密钥对，需替换两处 RSA_PRIVATE_KEY 常量

## 提交与验证
- 提交 890bb7784，推送至 origin main/v1.47.1，提交信息：feat(request): 补充响应解密逻辑，兼容后端 x-encrypt 加密响应
- 本 checkout 未安装 ESLint，仅做 node --check 语法校验（通过）；未执行构建
- 需在联调环境用响应头 x-encrypt:true 的接口验证解密效果

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "昆山G响应解密逻辑",
  "source_extraction_id": "1ad5a19ddba4401da31040dd7b8d0599",
  "version": 2,
  "memory_type": "entities"
}
-->