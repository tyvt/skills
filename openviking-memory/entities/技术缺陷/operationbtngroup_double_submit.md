# OperationBtnGroup 内置 ZsSubmit 导致双提交按钮
支取通知书等详情页顶栏 OperationBtnGroup 内置 ZsSubmit 渲染提交，插槽里再手写提交按钮会出现两个「提交」。

## 问题现象
- 支取通知书（benefit/pubAllotNotice）详情页出现两个「提交」按钮
- 顶栏 operation-btn-group 组件内置通过 ZsSubmit 渲染「提交」按钮（走标准提交流程，含流程校验、附件校验，提交成功后 @update="init" 刷新详情）
- 页面又在插槽里手写了一个调用 audit() 的「提交」按钮，两者叠加

## 根因
- 详情页提交逻辑重复：内置 ZsSubmit 与手写 audit() 按钮并存，未统一出口

## 解决方案
- 删除插槽中写死的提交按钮及其 audit() 方法，只保留 OperationBtnGroup 内置提交
- 排查同类问题时先看是否 :showSubmit="false"（如 property/allotNotice 就是这样只留手写按钮的变体）
- 约定：详情页提交一律走 operation-btn-group 内置 ZsSubmit，禁止在插槽里手写提交按钮

## 验证与归属
- 验证证据：会话 2c381547 最终结论：删除插槽写死的提交按钮与 audit() 方法，保留 operation-btn-group 内置提交；并指出 property/allotNotice 是 :showSubmit="false" + 手写按钮的变体
- 涉及文件：zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue；zhi2-web-admin/src/components/OperationBtnGroup/index.vue；zhi2-web-admin/src/components/ZsSubmit/index.vue
- 所属项目：产品2.0；来源会话ID：2c381547-658f-48d5-908a-a6017928c089；代码基线：产品2.0/zhi2-web-admin（苏房V3同源），基线 c98afb0

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "operationbtngroup_double_submit",
  "source_extraction_id": "b2b84215894c4ce686e5d8228693700e",
  "version": 1,
  "memory_type": "entities"
}
-->