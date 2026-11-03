# 报事报修工单图标缺失因静态资源丢失
物业手持B端报事报修工单的催办/转办/退单图标因静态资源丢失而缺失。

## 问题根因
- 催办/转办/退单图标缺失因 `images/szf/close.svg` 与 `default.png` 丢失

## 解决方案
- 从 git 历史恢复静态资源并改造图标引用以恢复展示

## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages/workbench/index.vue、src/pages_facility/issue/components/MoreDialog.vue、src/pages_facility/issue/components/UrgeDialog.vue、src/components/ZsImage/ZsImage.vue、src/pages_facility/issue/components/TransferDialog.vue、src/pages_facility/issue/components/RejectDialog.vue、src/components/ZsUploader/ZsUploader.vue、package.json
- 来源会话ID：a5632320-e94d-484e-8110-c15fe59318bf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_icon_missing",
  "source_extraction_id": "378a0d6c59af498ca69b4ef6193b77fc",
  "version": 1,
  "memory_type": "entities"
}
-->