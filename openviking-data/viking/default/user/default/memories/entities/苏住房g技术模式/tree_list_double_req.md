# 左侧树+右侧列表页首屏请求翻倍
系统管理用户管理等左树右列表页面 Network 中 page 接口调两次，根因是 init() 直接 getList() 与树加载后自动选首节点两条取数路径叠加。

## 问题根因
- init() 里除 getTreeselect() 还直接调一次 getList()；getTreeselect 的 then 里 handleNodeClick(deptOptions[0]) 再拉一次列表
- 「默认选中第一个节点」与「无条件拉全量列表」语义冲突，无参 getList() 被覆盖成无用请求且先到先渲染误导
- 与已知 977（生命周期钩子叠加）形态相近但触发源不同：本条是异步回调自动设默认值开销

## 解决方案
- 列表首屏只留一条主路径：有树时去掉 init() 里 getList()，让树默认选中首节点负责首次取数
- 树为空（deptOptions.length===0）时明确不发列表请求，不补无参兜底
- maintenance/components/userDialog.vue 里同款写法改公共取数函数或同源改造

## 验证与归属
- 验证证据：用户报用户查询接口调用2次；定位 system/user/index.vue 的 init() 同时调两函数，修复后只剩带 deptId 的 page 请求
- 涉及文件：zhi2-web-admin/src/views/system/user/index.vue、src/mixins/listMixins.js、src/views/maintenance/components/userDialog.vue
- 所属项目：苏住房G；来源会话ID：7130b223-ea5d-4df2-a81c-47b905abbd28；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "tree_list_double_req",
  "source_extraction_id": "fc9114db6f08406fa42b32567924ccee",
  "version": 1,
  "memory_type": "entities"
}
-->