# 抽取成功弹窗垂直居中修复
园区物管2.0 中 SelectJudgesDialog.vue 的抽取成功弹窗因 body 高度与内容一致导致 align-items:center 无效，内容贴顶。

## 现象与根因
- 现象：成功提示弹窗内容紧贴顶部，垂直不居中
- 根因：body 高度与内容一致（约 100px），align-items:center 无实际效果

## 解决方案
- 给 body 设置 min-height:148px，让图标和文字在内容区垂直居中
- 收紧顶部 header，减少关闭按钮上方的空白
- 去掉 success-content 的上下 padding，由 body 统一控制垂直居中
- 若仍偏上或偏下可继续微调 min-height

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/property/extract/components/SelectJudgesDialog.vue
- 所属项目：园区物管2.0
- 来源会话ID：b185be66-bd45-4dfc-803b-68a0ab11cd87

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "extract_success_popup_center",
  "source_extraction_id": "ca96a95541ed44c7b78f9358b4b4b46d",
  "version": 1,
  "memory_type": "entities"
}
-->