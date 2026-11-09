# 多分支合并需关联提交哈希与源分支
园区物管2.0 多分支串行合并时，需记录目标分支的提交哈希与来源分支，保持分支同步可追溯。

## 合并规则
- develop/v2.6.1 对应提交 3689c959d
- v2.6.2 从 261 合并
- v2.6.2-yulin 从 262 合并，并保持当前分支同步

## 验证与归属
- 验证：会话 0e718ede 记录多分支合并提交哈希与源分支关联关系
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、property/largeScreen/utils.js、building/complexSearch/index.vue、property/complex 系列、mixins/listMixins.js、mixins/area.js
- 所属项目：园区物管2.0；来源会话：0e718ede-cd05-40ef-932a-12e15396c92d；代码基线：none；验证证据：园区物管2.0/028.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_serial_merge",
  "source_extraction_id": "236e0ad1f0424f45996c7c5522b4f29a",
  "version": 1,
  "memory_type": "entities"
}
-->