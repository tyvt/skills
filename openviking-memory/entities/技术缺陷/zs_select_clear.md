# zsLikeSelect清除不同步表单
资金代缴单位用zsLikeSelect绑定selectedCompany时，点清除只清UI不清form字段，导致提交异常。

## 问题根因
- 点输入框清除可能只清空展示，@select不触发，form.companyId/form.companyName仍保留旧值，必填校验异常。

## 解决方案
- watch selectedCompany，当v-model变为{}或空值时显式form.companyName=undefined、form.companyId=undefined，不依赖清除事件冒泡。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/depositNotice/company/components/AddDialog.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：76d28965-e3f4-48ff-bdb9-b55a6b87279b
- 验证证据：src=2-0/021.md

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "zs_select_clear",
  "source_extraction_id": "a5b508af35ef44519ddeab11320e8cba",
  "version": 2,
  "memory_type": "entities"
}
-->