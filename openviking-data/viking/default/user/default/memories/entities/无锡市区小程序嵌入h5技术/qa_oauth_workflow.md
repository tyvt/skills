# 智能问答改三方OAuth流程
将 Tab 内智能问答替换为三方页面，需对齐无锡市区 G 项目调用 security/oauth2/authorize，并保留原页逻辑仅口令触发新链。

## 背景与需求
- 将 Tab 内智能问答替换为三方页面，与无锡市区 G 项目一致调用 security/oauth2/authorize 取跳转地址
- 路由换成当前 H5 工程路径（zhi2-mobile-admin-h5-c-unlimited）

## 实现要点
- 封装 qaOAuth（或同等工具）拉取授权 URL
- 默认保留原问答 UI/逻辑，仅当用户在原页输入隐藏口令「进入新页面」时走 OAuth 打开三方（如 znws 域名）
- 调试口令「打开控制台」可初始化 eruda
- complexId 等附加 query 与 G 项目对齐，三方暂不需要时显式关闭拼接（qaOAuth 直接返回接口 URL），避免未文档化参数导致三方拒登

## 验证与归属
- 验证会话：f4aa86cd-c715-4ff0-ada8-5790054a7607
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/qaOAuth.js、zhi2-mobile-admin-h5-c-unlimited/src/api/security.js
- 所属项目：无锡市区小程序嵌入H5；代码基线：df08cea

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "qa_oauth_workflow",
  "source_extraction_id": "af236467f8db4b978378c3b60607a339",
  "version": 1,
  "memory_type": "entities"
}
-->