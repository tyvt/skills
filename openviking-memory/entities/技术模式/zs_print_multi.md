# ZsPrint 多模板打印只出一份 PDF 修复
开户申请详情页多选模板打印只出第一份 PDF，通过统一 await、预开窗口、存 printConfigId 解决。

## 问题根因
- 情况：开户申请详情页先选「开户通知书（物业服务企业）」打印正常；再同时勾选两个模板点打印仍只弹第一份 PDF。
- 根因三层：① getPdfUrl 积木报表分支未 await 返回未完成 Promise/空值；② 连续 window.open 被浏览器拦截；③ 勾选项存行下标/模板名导致映射回同一条配置。

## 解决方案
- 三条生成分支（http 直链/Word 模板/积木报表）统一改为 await 完成后再返回 PDF 地址。
- 勾选 2 个及以上时点击即刻同步预开空白标签页，PDF 生成后依次赋 targetWindow.location.href；openPdf 统一逻辑，不可用时降级 <a target="_blank">。
- checkedList 存稳定主键 printConfigId，用 getCheckedPrintItems() 映射回打印配置。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 c1889335（基线 3c282a5）修复多选打印只出一份，验收用例 KH26090700011 单选各 1 份、双选出 2 标签页且内容不同。
- 涉及文件：zhi2-web-admin/src/components/ZsPrint/index.vue；zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue；zhi2-web-admin/src/components/OperationBtnGroup/index.vue；zhi2-web-admin/src/views/benefit/pubVoucherTemplate/detail.vue
- 所属项目：苏住房G；来源会话ID：c1889335-cc50-4595-9ba6-bc2ca4d3dbe9；代码基线：3c282a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_print_multi",
  "source_extraction_id": "e592ee3a3b1f492981b1f3ffdc20f2ce",
  "version": 1,
  "memory_type": "entities"
}
-->