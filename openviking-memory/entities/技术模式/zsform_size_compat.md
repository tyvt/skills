# ZsForm size 非法值兜底与旧值映射
父组件透传非法 size 致 Object.assign 覆盖默认 'default' 传 ElForm 触发自定义校验失败，需在 zs-form 封装层兜底映射。
## 问题根因
- 父组件透传 size 为 undefined/''/旧值(medium/mini) 至 ZsForm。
- ZsForm 内 Object.assign 覆盖默认 'default' 后传给 ElForm，触发自定义校验失败。
## 解决方案
- 在 src/components/zs-form/zs-form.vue 中对 size 做兜底与旧值映射：large/default/small。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：7fcbaa3b-c65e-436a-b509-af93a4b6be04
- 验证证据：会话 7fcbaa3b-c65e-436a-b509-af93a4b6be04 报 ZsForm 透传非法 size 致 ElForm 校验失败。
- 涉及文件：src/components/zs-form/zs-form.vue；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsform_size_compat",
  "source_extraction_id": "e2f835fecd3341d79c672dd1cc9b7a31",
  "version": 1,
  "memory_type": "entities"
}
-->