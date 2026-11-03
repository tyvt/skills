# 本后台页面四范式：可直接复制的页面骨架
本 Vue2 生成式模板后台的新页面落地需遵循四套页面范式（列表/详情/子表/弹窗），而非每页自创结构。

## 四种页面范式
- 范式 A 列表：building/plot/index.vue 为 <script>-only（不写 <template>），配 ListTemplate.js + listMixins；列表列统一用公共 ListTemplate + 字典列配置，不改写 tableData
- 范式 B 详情/保存：building/plot/detail.vue 用 zs-form ref="form" + operation-btn-group；提交体接 :submit-data，主键走 getDetailParams 返回裸 id
- 范式 C 子表：ParcelTable.vue 用模板 A + SubTableToolbar（挂区块标题栏）；bizState 四处同改表，与 docs/子表增删按钮显隐判断规范.md 一致
- 范式 D 弹窗：CandidateDialog.vue 用 dialogMixins + @open 拉数（不在 created 拉，避免复用脏数据）；选择项统一走 SelectDialog.open()

## 硬约束
- ESLint 禁止 label-width、禁止 label-position="left"，Options API 须简写；弹窗布局与选择器后缀有专用 scripts/check-*.mjs
- 占位合同统一用 /example/record + recordId，示例页须来自仓库真实页面

## 涉及文件与归属
- 涉及文件：building/plot/index.vue、detail.vue、ParcelTable.vue、CandidateDialog.vue、ListTemplate.js、docs/frontend/page-recipes.md
- 来源会话：session-dd2640d3、9c09226d-8b25-4c30-a875-1a0f0848acda；代码基线：a86bf95

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "page_four_paradigms",
  "source_extraction_id": "fbafd4fd1605421ead8749279bdeff62",
  "version": 1,
  "memory_type": "entities"
}
-->