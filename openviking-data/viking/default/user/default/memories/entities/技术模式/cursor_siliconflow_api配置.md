# Cursor 接入硅基流动 API 配置

在 Cursor 中使用硅基流动（SiliconFlow）API 作为模型时，需正确开启 Key 开关、修改 Base URL 并确认模型名，否则会报 Model name is not valid。

## 关键问题
- 保存 Key 不等于启用 Key：OpenAI API Key 右侧开关为白色（OFF）时请求不会走硅基流动 Key，导致 `Model name is not valid` 误导性报错。
- 新版 Cursor 保存 Key 后只显示 "Secret saved"，不再显示 Verify 按钮，属正常现象。

## 修复步骤
- 将 OpenAI API Key 右侧开关拨到绿色（ON）以启用 Key。
- 修改 Override OpenAI Base URL：从默认 `https://api.openai.com/v1` 改为硅基流动地址 `https://api.siliconflow.cn/v1`。
- 确认模型名保持 `THUD`（硅基流动模型标识）。

## 验证与归属
- 验证证据：extracted source=cursor project=d-repository
- 重新验证方法：清空 Key 重新粘贴保存，或开开关后发测试消息看是否报错。
- 涉及文件：C:\Users\Administrator\.cursor\skills-cursor\update-cursor-settings\SKILL.md、C:\Users\Administrator\AppData\Roaming\Cursor\User\settings.json
- 所属项目：d-repository；来源会话：d053681c-4823-458c-a33f-ab528b504230


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_siliconflow_api配置",
  "source_extraction_id": "6e6e2a92f3d744eab3c0a85558f73c01",
  "version": 1,
  "memory_type": "entities"
}
-->