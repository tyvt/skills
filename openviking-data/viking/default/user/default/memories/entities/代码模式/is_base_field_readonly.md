# 页内编辑态折叠成只红框字段可编辑
物业服务费账单详情组件通过抽 isBaseFieldReadonly 谓词统一门控只读字段，不在模板逐字段写 disabled。

## 基本做法
- 新增计算属性 isBaseFieldReadonly（判定 formMode === 'edit'）统一门控，挂在只读字段 disabled 上
- 新增态该属性恒为 false，新增页字段照常可填，不出现「新增也变灰」回归
- 可编辑集合通常为「账单归属月、起止时间、金额、备注」加内嵌优惠记录子表

## 为何不逐处改
- 该详情组件被物业费/公共能耗费/电梯费/垃圾清运费四类账单共用，逐字段改 disabled 会漏
- 会与 zs-form 整表 disabled 级联冲突（连带禁用区域内按钮），新增账单类型还会再次漂移

## 配套与验证
- 子表（优惠记录）按同一 formMode 分流：编辑态保留新增/编辑/撤销，查看态只留「查看」并隐藏批量操作
- 用户给截图圈定范围时，先在组件顶部写死范围清单注释，再落地谓词
- 参考会话 6d15f625：四类物业账单共用、规则全域生效，涉及 detail.vue 与 service/detail.vue，代码基线 075e6e9

<!-- MEMORY_FIELDS
{
  "category": "代码模式",
  "name": "is_base_field_readonly",
  "source_extraction_id": "fe98c453fafb46bda36d6363aa048c3d",
  "version": 1,
  "memory_type": "entities"
}
-->