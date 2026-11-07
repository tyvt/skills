# options类型过严致getDictLabel报错
无锡锡山业主决策H5 中 getDictLabel 原对 options 类型假设过严，致 detail.vue 渲染报 find is not a function。

## 问题根因
- src/utils/index.ts 中 getDictLabel 对 options 参数类型假设过严
- detail.vue 渲染时因 options 结构不一致调用 find 报错

## 解决方案
- 改为支持 options 为数组或含 data/list 的对象
- 异常时回退空数组，以兼容不一致字典结构

## 验证与归属
- 验证证据：extracted source=cursor project=无锡锡山业主决策H5
- 验证：src=无锡锡山业主决策H5/001.md
- 涉及文件：src/utils/index.ts、src/api/common.ts、src/pages_ownerV2/elect/detail.vue
- 所属项目：无锡锡山业主决策H5；来源会话：3164adcd-5fdf-440f-a10b-0dfd4c2797b0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getdictlabel_options_loose",
  "source_extraction_id": "878c83b7f0a2436e8ec91da8162a19b5",
  "version": 1,
  "memory_type": "entities"
}
-->