# 苏住房G 简易申报导入双链路必填 feeMode
苏住房G 简易申报批量导入弹窗的「下载模板」与「导入」两条请求链路必须同时带齐 feeMode 等业务参数。
## 问题背景
- 批量导入弹窗新增「收费模式」下拉（字典 fee_mode_declaration）
- 下载模板与导入是两条独立请求各自组 params，只改一条会导致缺参
- 入参集合含 busCode、complexId、declareYear、feeMode、path，应一次对齐
## 解决方案
- 弹窗 form 增加 feeMode，options 走 fee_mode_declaration 字典
- 下载模板与 excelImport 的 params 都补 feeMode，同源从 this.form / this.bus / $route.meta.busCode 取
- 请求前统一校验：小区、申报年度、收费模式任一为空则 msgWarning 拦截不发请求
- 两按钮独立 loading：下载用 templateLoading，导入用 btnLoading + v-loading
- 弹窗关闭时同时重置两个 loading 标志，避免按钮一直转圈
- 同页「费用类型」字典误用 fee_type 时按用户指定统一改为 fee_type_declaration
## 涉及与来源
- 涉及文件：bulkImportDialog.vue、feeDeclare2/index.vue、feeBindScopeTable.vue
- 所属项目：苏住房G；来源会话：8f44dfe2-7e91-48e0-b0d2-eb247b076f7b；代码基线：3697a62

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_feemode_dual",
  "source_extraction_id": "d4f9217e4b834d00b440bed176913edd",
  "version": 1,
  "memory_type": "entities"
}
-->
