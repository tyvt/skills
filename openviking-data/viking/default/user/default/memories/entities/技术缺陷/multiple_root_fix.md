# building/mapProperty 模板根节点修复
园区物管2.0 的 building/mapProperty/index.vue 因模板结构错误触发 ESLint `vue/no-multiple-template-root`。

## 问题原因
- 第一个 `zs-dialog` 多了一个 `</div>`，提前关闭根节点 `<div class="list-container">`，导致后续 `area-dialog` 被当作第二个根元素
- `<div class="list-card">` 未闭合，在 `</el-col>` 前缺少对应的 `</div>`

## 修改内容
- 去掉第一个 dialog 中多余的 `</div>`
- 在 `</el-col>` 前补上 `list-card` 的闭合标签
- 顺带修正了缩进，本地 ESLint 已通过，可重新执行 git commit

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/building/mapProperty/index.vue、zhi2-web-admin/src/views/property/mapProperty/index.vue
- 所属项目：园区物管2.0；来源会话：a1f32ab9-7041-4fcc-8f3b-7c218f1b8032

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "multiple_root_fix",
  "source_extraction_id": "002609c992b548f3a2fb6c81c8304007",
  "version": 1,
  "memory_type": "entities"
}
-->