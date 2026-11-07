# 苏服办网关环境变量只保留需申请4类
苏住房C 小程序接入江苏省苏服办网关时，env 文件堆了 9 个 VITE_APP_SFB_* 变量，需只保留需申请的 4 类、固定值下沉代码默认。

## 问题根因
- 网关文档规定 app_id、interface_id、version、charset、biz_content、timestamp、origin、sign 九入参，其中 version=1.0.0、charset=UTF-8、origin=1 是文档写死示例常量，每套环境填一遍纯属噪声。
- APP_KEY/APP_SECRET 文档未要求且代码未用到，属历史遗留。
- 返回体是 data 字段里再套一层原接口 JSON 字符串（含 custom/status），解析需二次 JSON.parse。

## 解决方案
- 环境变量只留真正需开放平台申请的 4 类：VITE_APP_USE_SFB_DISPATCHER、VITE_APP_SFB_APP_ID、VITE_APP_SFB_GET_INTERFACE_ID、VITE_APP_SFB_POST_INTERFACE_ID。
- version/charset/origin 收进 dispatcher.js 默认值；biz_content 序列化、timestamp 时间戳、sign 验签返回均为运行时生成不能配。
- 判断原则：一份 env 只说明「环境间会变」和「需人工申请」的，协议常量一律代码默认。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 0f1c6af9 用户贴网关/验签参数表后要求移除不必要参数，处理结果如上。
- 涉及文件：zhi2-mobile-shimin/.env.development、.env.production、.env.test、src/utils/dispatcher.js。
- 所属项目：苏住房C；来源会话ID：0f1c6af9-9dca-4fad-8282-c48ebf2f048d；代码基线：166ed47

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_gateway_env",
  "source_extraction_id": "f05b6458c8ca40feaba9dc1759c1ed7d",
  "version": 1,
  "memory_type": "entities"
}
-->