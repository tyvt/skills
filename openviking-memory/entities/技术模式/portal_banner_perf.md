# 门户二级页 Banner SVG 性能风险
PortalDialogHost 顶部 banner 使用超大内嵌位图 SVG 会拖慢首屏。

## 问题现象
- portal_city_banner.jpg 改为同尺寸 SVG（1920×165）时，若内嵌 base64 位图约 6.7MB，二级页首屏明显变慢
- 替换切图 173.svg 后明确提示文件约 6.7MB 与首屏变慢

## 处理建议
- 性能敏感场景应使用同尺寸压缩 jpg/png
- 保留旧 jpg 便于回退引用

## 验证与归属
- 文件：PortalDialogHost.vue、portal_city_banner.svg；项目：门户；会话：ecaebeeb-54ff-4c5a-91a6-258101a82b57；基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_banner_perf",
  "source_extraction_id": "ebc898f91d76487682d9f8c6657d78bd",
  "version": 1,
  "memory_type": "entities"
}
-->