# 开户楼幢弹窗确认关闭逻辑分析（OpeningBuildingDialog）
产品2.0 的 zhi2-web-admin 中对 OpeningBuildingDialog.vue「确定」按钮与 close() 关系进行了是否点击后无法关闭的分析。

## 分析对象
- 组件：OpeningBuildingDialog.vue（路径 src/views/maintenance/components/）
- 关注点：submitForm() 中「确定」按钮逻辑与 close() 调用关系，是否存在点击确定后弹窗无法关闭

## 相关代码
- submitForm() 组装 list 并调用 request 提交至 this.submitUrl（post）
- 关联文件：@/utils/request.js、ScopeSelectDialog.vue、src/api/index.js 等

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：427d58f8-75b8-425c-af42-6fe424dbe22b；代码基线：none
- 涉及文件：src/views/maintenance/components/OpeningBuildingDialog.vue、@/utils/request.js、src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue、src/api/index.js、src/utils/request.js

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dialog_close_analysis",
  "source_extraction_id": "78adc053f19543b39c7c4949d8e76fa2",
  "version": 1,
  "memory_type": "entities"
}
-->