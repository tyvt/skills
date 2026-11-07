# zs-advanced-query最大组数上限
zs-advanced-query 的 max-groups 是「最大组数」硬上限，默认组数由组件内部兜 1，不能用设 1 来表达默认。

## 问题现象
- 公共查询—物业管理区域查询产品要求「条件组默认 1 个、最多 2 个」，实际点「添加筛选条件组」加不出第二个

## 根因
- 页面把 :max-groups 传成了 1；组件语义是「最多允许几组」而非「默认几组」，默认值 1 是组件内部自己给的
- max-groups=1 等于把上限锁死在同值，添加按钮后无空位可加

## 解决方案
- max-groups 只表达上限，默认展示数不要通过它表达；本例改 :max-groups="2" 即同时满足「默认 1 组」和「最多 2 组」
- 删除语义天然是「有 2 组时可删、至少保留 1 组」，组间「且/或」下拉随组数出现
- 凡是 max-xxx 型受控上限 prop（max-groups / max-length / max-count），先确认是否兼任默认值，否则「只能有一个」类反馈往往是上限写死导致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话用户反馈「条件组默认一个，再最多加一个，一共最多两个，现在只有一个了」；结论改 :max-groups="2"，改后行为（默认 1 组、可加 1 组、2 组时可删至 1 组、组间且/或切换）
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、src/components/zs-advanced-query/zs-advanced-query.vue
- 所属项目：苏住房G；来源会话：20e31648-4d28-46f2-81a2-de9c591a691a；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "query_max_groups",
  "source_extraction_id": "be6275e6d8164640a8327727cd8ac6dd",
  "version": 1,
  "memory_type": "entities"
}
-->