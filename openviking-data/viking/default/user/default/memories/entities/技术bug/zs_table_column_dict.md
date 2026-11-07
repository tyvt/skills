
# zs-table-column 字典列推导与 dict-url 写法问题
产品2.0 中 zs-table-column 的 dict-url kebab 写法不被读取，且 prop 驼峰会自动转下划线推导字典名，导致字典列显示原始码值。

## 问题现象
- 网络面板出现 POST /system/dictData/listByType { dictType: 'build_type' }，但全项目搜不到 'build_type' 字符串
- 表格字典列显示原始码值（如 1）

## 根因
- type="dict" 未指定字典时，组件把 prop 从驼峰自动转下划线（underline 方法：replace(/[A-Z]/g, '_$&小写')），prop="buildType" 推导出 build_type 并发请求
- 后端没配该字典时 options 为空，getDictLabel 显示原始值
- 模板写 `<zs-table-column dict-url="building_type">`（kebab-case）组件不读取，静默回退自动推导
- 正确字典名是 building_type（building/detail.vue 用 getDicts('building_type')）

## 解决方案
- 排查特征：网络面板的字典名在代码里搜不到 = prop 自动推导
- 字典列必须用驼峰显式传 dictUrl（或让组件兼容 dictUrl 与 dict-url 两种写法，参照 min-width/minWidth 处理）
- 字典选项存后端 sys_dict_type/sys_dict_data，前端不写死；显示原始码还需核对后端字典是否有对应 dictValue 条目

## 涉及与来源
- 涉及文件：zs-table-column.vue、BuildRecordTable.vue、dict.js；所属项目：产品2.0
- 来源会话：ee495a83；代码基线：62d5fb9


<!-- MEMORY_FIELDS
{
  "category": "技术Bug",
  "name": "zs_table_column_dict",
  "source_extraction_id": "b2ef880cfdd147c9bc8ecd0a19ff7f54",
  "version": 1,
  "memory_type": "entities"
}
-->