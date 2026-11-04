# 详情回填复用级联 change handler 会清掉下游字段（产品2.0）
产品2.0 项目变更详情页回填接口数据后复用级联 change handler 把下游字段清空，需 shouldReset 参数区分手动切换与回填。

## 问题现象
- 项目变更详情页接口返回了 subdistrict/community，进页面后字段却是空的（接口有值但被前端清掉）

## 根因
- detailCallback 回填完接口数据后顺手调用 onCascaderChange()
- 该方法为「用户手动切换行政区域」写，无条件执行 this.form.subdistrict = undefined; this.form.community = undefined
- 级联 change handler 的两种调用语境（用户交互 vs 程序回填）语义不同却复用同一入口

## 解决方案
- 给 onCascaderChange 加 shouldReset = true 参数：手动切换保持原清空交互；detailCallback 回填传 false，只加载下级（街道）列表数据、不清空已回填值
- 套路泛化：详情回填后触发下拉/级联加载选项的调用，不能直接复用用户交互 change handler，要么拆参数要么拆方法，回填路径只刷 options 不动 value

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/building/projectChange/detail.vue、zhi2-web-admin/src/mixins/area.js
- 所属项目：产品2.0；来源会话：43814712-13f1-423a-b18d-f6d42c3a291a；基线：183f95

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cascader_change_backfill",
  "source_extraction_id": "aa6a9cc932774c7691d3f30fa719d440",
  "version": 1,
  "memory_type": "entities"
}
-->