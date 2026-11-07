# 企业注册页面截断修复
苏住房G项目companyRegister.vue修复了第二步表单容器布局冲突导致内容被截断的问题。

## 问题根因
- .content-wrap设置固定高度height:calc(100% - 180px)，白色内容区高度被锁死
- .form-wrap1设置overflow-y:auto，在固定高度父容器内形成内部滚动区，表单在法定代表人附近被裁切，下方按钮区却有空白

## 修复要点
- .register-wrap改为min-height:100vh，页面随内容自然撑开
- 去掉.content-wrap的固定高度
- 去掉.form-wrap1的overflow-y:auto，改为整页滚动
- .content-wrap增加padding-bottom:100px，避免底部固定按钮栏挡住内容

## 涉及文件
- zhi2-web-admin/src/views/register/companyRegister.vue
- zhi2-web-admin/src/views/register/components/companyInfo.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：c7ab501f-d841-4b86-85f5-4abc8de685fc；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_truncation_fix",
  "source_extraction_id": "fe0d6d2b918c4a599f472aedc212ae79",
  "version": 1,
  "memory_type": "entities"
}
-->