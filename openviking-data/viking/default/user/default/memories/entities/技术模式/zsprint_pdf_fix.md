# 开户申请多选打印PDF修复
苏住房G 项目 zhi2-web-admin 的 ZsPrint 组件修复了开户申请多选打印只出一份 PDF 的问题。

## 修复内容
- 统一 PDF 生成逻辑 getPdfUrl：http直链、Word模板、积木报表三条路径均改为 await 等待完成后再返回 PDF 地址，修复积木报表分支未等待问题
- 多选预开窗口：选中2个及以上模板时同步预开空白标签页，PDF生成后依次赋值 location.href，避免浏览器拦截
- 统一打开逻辑 openPdf：优先使用预开窗口，失败降级为 window.open 或 a 标签点击
- Checkbox 使用稳定主键：checkedList 改为存储 printConfigId，通过 getCheckedPrintItems() 映射回打印配置

## 验证与归属
- 涉及文件：zhi2-web-admin/src/components/ZsPrint/index.vue、benefit/pubRegulatoryAccount/detail.vue、OperationBtnGroup/index.vue
- 所属项目：苏住房G；来源会话：c1889335-cc50-4595-9ba6-bc2ca4d3dbe9；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsprint_pdf_fix",
  "source_extraction_id": "b555c8349a924ea8baf9720c753e2722",
  "version": 1,
  "memory_type": "entities"
}
-->