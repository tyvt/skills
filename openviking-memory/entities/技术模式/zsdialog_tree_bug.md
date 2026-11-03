# zs-select-dialog-func 传 tree 对象整体替换默认值缺 treeMethod
Vue2 中 Object 类型 prop 采用传入对象整体替换 default，宿主只写部分 tree 字段时 treeMethod 为 undefined，运行时报 this[treeConfig.treeMethod] is not a function。

## 问题根因
- 打开带左侧银行树的函数式选择弹窗时，visible 的 immediate watcher 触发 getTree，内部执行 this['$' + treeConfig.treeMethod]（如 this.$get）
- Vue2 对 Object 类型 prop 采用传入对象整体替换 default，不做深度合并
- 宿主只写 isTree/treeUrl 等时 treeMethod 为 undefined，报 this[treeConfig.treeMethod] is not a function

## 解决方案
- 组件侧抽出 DEFAULT_TREE_CONFIG，在 mergedTreeConfig 中与 tree 合并，保证 treeMethod 等必有默认 'get'
- 宿主侧 showBankDialog 等仍建议显式写 treeMethod: 'get' 与同模块其它银行弹窗对齐
- 与「仅补 treeUrl/treeKey/treeLabel 消除 prop 校验告警」是不同故障面

## 验证与归属
- 验证：会话 e19f246b 中 pubExpenditureContract/detail.vue 的 showBankDialog 树配置缺 treeMethod；结论说明 Object prop 不合并默认值，并在 zs-select-dialog-func.vue 增加 DEFAULT_TREE_CONFIG 合并
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、zhi2-web-admin/src/views/benefit/pubExpenditureContract/detail.vue
- 所属项目：园区公共收益；来源会话：e19f246b-8b3f-4ed0-b2bc-12291e2e6315；代码基线：08d3255

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsdialog_tree_bug",
  "source_extraction_id": "54194ab371814c2fb7ecde84d359cc63",
  "version": 1,
  "memory_type": "entities"
}
-->