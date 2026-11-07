# 硅基流动
Silicon Flow（硅基流动）是提供兼容 OpenAI 接口的大模型 API 服务，可作为 Cursor 的模型后端。
## 接入 Cursor 要点
- 需打开 OpenAI API Key 开关（仅保存 Key 不等于启用，开关为白色 OFF 时请求不走该 Key，会报 Model name is not valid 误导性错误）。
- Override OpenAI Base URL 需改为 https://api.siliconflow.cn/v1（默认 https://api.openai.com/v1 会报错）。
- 模型名保持 THUD 开头。
## 验证方式
- 新版 Cursor 保存 Key 后只显示 "Secret saved"，无 Verify 按钮属正常。
- 可清空重填 Key，或开开关后发测试消息验证是否报错。

<!-- MEMORY_FIELDS
{
  "category": "AI服务",
  "name": "silicon_flow",
  "source_extraction_id": "d93dd562d6324719bb258aed4b224de0",
  "version": 1,
  "memory_type": "entities"
}
-->