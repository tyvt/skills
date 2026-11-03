# rent补贴页在线申请接入底部mock表单
原在线申请跳转外部无法走通 mock，于 src/pages-rent/subsidy.vue 改为底部弹窗表单。

## 实现要点
- 底部弹窗表单预填苏州工业园区某某科技等示例
- 校验所属单位等三项必填字段
- 校验通过则 uni.showToast 提示申请成功，不跳外链

## 验证与归属
- 涉及文件：src/pages-rent/subsidy.vue
- 来源会话：0b6c14cb-8ef7-4458-9e20-74433b5f44f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_subsidy_form",
  "source_extraction_id": "9a29e76e1db34dbc832f5a873f6c0d40",
  "version": 1,
  "memory_type": "entities"
}
-->