# 苏服办网关 V1/V2 并存用 zs-source 请求头标识
苏住房C 同一客户端并存两套苏服办网关接口，用 zs-source 请求头在网关层标识版本而非业务页判断。

## 问题情况
- zhi2-mobile-shimin 客户端同时存在 V1（v1Instance.js 旧 get/post 直调）与 V2（index.js）两套苏服办网关接口
- 需求是让网关区分请求来自哪一版接口约定

## 问题根因
- 两套实例最终都通过 gateway.js 的 buildGatewayHeader 组装网关 header（zs-sign / zs-authorization / zs-param / zs-path 等）
- 靠接口路径或业务字段猜版本，网关侧无法稳定识别，前端各处易漏改；版本是「客户端身份」属性，天然属于建连层

## 解决方案
- buildGatewayHeader 增加可选参数 zsSource，仅在传值时写入 header 的 zs-source 字段
- createHttpClient（httpInstance.js）新增同名 zsSource 配置项，在 GET、POST、文件上传三条通道统一透传
- 各实例声明自己的值：v1Instance.js 配 'v1'、index.js（V2）配 'v2'，业务页面零改动；同源项目（如宿迁苏服办）按此三件套复制

## 验证与归属
- 验证会话：0d10fb3e（2026-07-01，基线 a444c05），用户诉求 V1 接口请求头增加 zs-source 传 v1 或 v2
- 涉及文件：src/api/gateway.js、src/api/httpInstance.js、src/api/v1Instance.js、src/api/index.js
- 所属项目：苏住房C；来源会话ID：0d10fb3e-6963-45fd-89b1-7f2746aabe2a；代码基线：a444c05

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "gateway_zs_source",
  "source_extraction_id": "dca35173571046008ab4d13a3f707715",
  "version": 1,
  "memory_type": "entities"
}
-->