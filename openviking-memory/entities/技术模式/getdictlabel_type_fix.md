# getDictLabel 类型兼容修复避免 find is not a function
getDictLabel 对 options 调用 .find() 必须是数组，字典接口返回 data 为对象时触发报错，已用 normalizeDictList 统一成数组修复。

## 问题根因
- src/utils/index.ts 的 getDictLabel 对第二个参数调用 .find()，它必须是数组
- 字典接口返回的 data 可能是对象（常见 {rows:[...]} 或包一层 list），赋值给 stateOptions/businessTypeOptions 后，模板执行 getDictLabel(detailInfo.state, stateOptions) 时第二个参数是普通对象，没有 .find，压缩后报 t.find is not a function
- 与 decisionBusinessTypeList 等为 null 无直接关系；详情页用单独请求的字典接口，只要返回的 data 不是数组就会炸

## 解决方案
- 在 src/utils/index.ts 增加 normalizeDictList：把 data 统一成数组（支持直接数组，以及常见字段 rows / data / records / list）
- getDictLabel 里先用 normalizeDictList(options) 再 .find()
- 其他类型回退空数组避免报错

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：src/utils/index.ts（无锡锡山业主决策H5 另见 src/pages_ownerV2/elect/detail.vue）
- 所属项目：H5（另见于 无锡锡山业主决策H5）；来源会话：ccfe1852-05a9-47a2-add7-5f4e21296652（另见 3164adcd-5fdf-440f-a10b-0dfd4c2797b0）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getdictlabel_type_fix",
  "source_extraction_id": "a406d3eb4867402c8b60531599883674",
  "version": 2,
  "memory_type": "entities"
}
-->