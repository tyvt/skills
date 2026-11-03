# 字典编辑子集与展示全集双字典模式
同一字段在表单只能选「可选子集」，查看/回显需展示含已停用项在内的全集，否则历史数据回显成空或原始码值；本项目（苏州 V3 / 苏住房G）用「双字典 + computed 按 formMode 切换」形态复用。

## 根因
- 后端把「可选范围」和「全量语义」拆成两个字典类型，前端只拉一个就会在某个场景丢选项
- 仅用 sys_account_type（受限）会导致查看历史数据时旧类型因不在受限字典而显示原始码
- 仅用 sys_account_type_all（全量）会导致新增时能选到不该新增的类型

## 解决方案与范例
- data 放两个独立字段：accountTypeSelectOptions=sys_account_type、accountTypeAllOptions=sys_account_type_all；initDict 并行请求分别写入
- computed accountTypeOptions 按 formMode 切换：add 或 edit 且当前值为空时返回受限子集；view 或已有值返回全量全集；模板绑定不动
- system/user/detail.vue 即此形态；等价非 `_all` 写法为 transaction_region（表单筛选）/ transaction_region_real（展示统计含停用项），见 transaction/secondHouse 与 institution/record
- 字典基础设施：utils/dict.js 的 getDicts 走 /system/dictData/listByType/{dictType} 并缓存，main.js 挂到 Vue 原型

## 结论性事实
- 全仓库无强制 `_all` 命名约定，仅 sys_account_type(_all) 与 transaction_region(_real) 两对
- 新增类似需求按双 options + computed 切换形态复用，不自创第三套命名
- 与已知 659「字典选项要剔除『全部』」差异：本条讲「编辑子集 + 展示全集」两套字典并存与切换口径，非删下拉伪选项

## 验证与归属
- 验证证据：会话 b310969f 全仓检索确认 `_all` 后缀仅 system/user/detail.vue 一处，并给出 computed accountTypeOptions 切换代码；变体 transaction_region / transaction_region_real
- 涉及文件：zhi2-web-admin/src/views/system/user/detail.vue；utils/dict.js；main.js；institution/record/index.vue
- 所属项目：苏住房G；来源会话ID：b310969f-eb74-47fd-bd9f-361fe91d807f；代码基线：b0f2039


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dual_dict_subset_full",
  "source_extraction_id": "397984d9306b4d00ab495e7e01753845",
  "version": 2,
  "memory_type": "entities"
}
-->