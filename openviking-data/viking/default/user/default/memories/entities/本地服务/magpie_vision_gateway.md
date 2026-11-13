# magpie 视觉网关
本地运行的多模型编排网关，提供 OpenAI 兼容接口，支持图像输入。

## 接口
- 地址：`127.0.0.1:3425/v1/chat/completions`
- 认证：API key=`magpie`
- 视觉模型：`auto/hy3`、`auto/deepseek-v4.1-flash`（支持图片 base64 data-URL）

## 用途
- 供 captcha-recognizer 技能做验证码 OCR
- 亦可用于通用图像理解

<!-- MEMORY_FIELDS
{
  "category": "本地服务",
  "name": "magpie_vision_gateway",
  "source_extraction_id": "10cf9a4ad7c64ff3865e579565280499",
  "version": 1,
  "memory_type": "entities"
}
-->