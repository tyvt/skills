# getId解析路由主键须排除动作段
utils/ruoyi.js的getId()从路径末段解析业务主键时须排除/add等动作段，否则新增页拿到假主键。

## 问题根因
- getId()按约定从路由路径末段解析业务主键
- 新增页路由末段是字面量'add'（如/xxx/project/add），会把'add'当id返回
- getId的「末段即主键」启发式未排除非ID动作词段，新增路由无:tableid动态段

## 解决方案
- 在getId解析处排除'add'及类似动作段，命中动作词时不当作主键返回
- 推广：所有「从路径末段取主键」工具都要对已知动作段（add/detail/edit等）做排除白名单
- 新增页要用主键时走query.id或保存后返回值，而非路径段

## 验证与归属
- 验证证据：用户诉求ruoyi.js:47-53需排除/add；修复随提交ee38c27合入
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js
- 所属项目：产品2.0；来源会话ID：8f101920-674b-4cf2-a996-0d54083efaac；代码基线：c420af5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ruoyi_getid_action",
  "source_extraction_id": "ad869c7e1cac472293a790f179a77c52",
  "version": 1,
  "memory_type": "entities"
}
-->