# 打印附件相对路径解析修复
园区公共收益项目中，打印逻辑使用 window.origin 拼接绝对路径导致子目录部署路径错误，已改用相对路径解析。

## 问题根因
- 打印逻辑使用 window.origin 拼接接口返回的站内绝对路径
- 子目录部署时缺失前缀导致跳转错误

## 解决方案
- 改用 resolveServerAssetUrl 依据当前页面地址解析相对路径
- 自动携带部署前缀

## 验证与归属
- 来源会话：23bed992-7395-4a7a-9fa6-d6b2cbf58e24
- 涉及文件：components/ZsPrint/index.vue、utils/resolveServerAssetUrl.js、api/system.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "print_relative_path",
  "source_extraction_id": "aba4a2b6479d4f45a2363f3e0f9679b4",
  "version": 1,
  "memory_type": "entities"
}
-->