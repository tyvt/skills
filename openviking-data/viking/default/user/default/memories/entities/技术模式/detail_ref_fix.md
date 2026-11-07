# 设施详情页空白未调用详情接口修复
泰兴小程序 detail.vue 详情页空白、未调用详情接口的问题已修复。

## 问题根因
- `ref` 未导入：第 70 行用了 `const id = ref('')`，但只从 `vue` 引入了 `reactive`，未引入 `ref`，运行时报 `ReferenceError: ref is not defined`，`<script setup>` 整段失效。
- 变量遮蔽：`getDetail` 内写 `const id = id.value`，内层 `const id` 遮蔽外层 ref，`id.value` 在 TDZ 内被访问，导致 `getDetail` 执行失败，接口不调用。

## 修复内容
- 补充 `import { reactive, ref } from 'vue'`；改为 `getFacilityDetail(id.value)`，并加 `if (!id.value) return` 防护；删除无用的 `initDict`。
- 重新编译后从列表点「详情」进入，正常请求 `/dataProperty/facility/getDetailByFacilityId/{id}`。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_facility/detail.vue、src/api/maintenance.js、src/pages_facility/facility.vue、src/pages_owner/house/detail.vue
- 来源会话ID：0a04f62e-e6c7-4bef-bca2-b9f4f2de70ec
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_ref_fix",
  "source_extraction_id": "3d362587f08e485c87f954d90cef0281",
  "version": 1,
  "memory_type": "entities"
}
-->