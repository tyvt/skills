# 报事报修工单图标缺失因静态资源丢失
物业手持B端报事报修工单的催办/转办/退单图标因静态资源丢失而缺失。

## 问题根因
- 催办/转办/退单图标缺失因 `images/szf/close.svg` 与 `default.png` 丢失

## 解决方案
- 从 git 历史恢复 `images/szf/close.svg` 与 `default.png`
- 改造 `ZsImage`：改用 `<image>` 标签，支持 `BASE_URL` 前缀与加载失败回退
- 修正工单模块：评价星标路径改对，催办弹窗上传图标与其他弹窗统一；H5 构建通过，本地 dev 静态资源可访问(HTTP 200)

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages/workbench/index.vue、src/pages_facility/issue/components/MoreDialog.vue、src/pages_facility/issue/components/UrgeDialog.vue、src/components/ZsImage/ZsImage.vue、src/pages_facility/issue/components/TransferDialog.vue、src/pages_facility/issue/components/RejectDialog.vue、src/components/ZsUploader/ZsUploader.vue、package.json
- 来源会话ID：a5632320-e94d-484e-8110-c15fe59318bf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_icon_missing",
  "source_extraction_id": "039687108a0b4a3480f4534b33cc58de",
  "version": 2,
  "memory_type": "entities"
}
-->