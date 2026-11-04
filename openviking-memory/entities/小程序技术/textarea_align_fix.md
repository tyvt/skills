# 全局 align-items:center 致 textarea 被下方区块遮挡
苏住房C 业主端加装电梯申请页「申请说明」textarea 因全局 .uni-forms-item align-items:center 不撑高，被下方区块盖住无法输入。

## 问题现象
- pages_owner_extra/elevator/addAlone.vue 的「申请说明」多行输入框点不进去、无法输入
- 下方「地理位置」标题压在输入框上，拦截点击与聚焦事件，形似「输入框坏了」

## 根因
- 全局 .uni-forms-item 用了 align-items:center，多行输入区实际渲染高度约 200rpx
- 表单项容器未为 textarea 预留高度，元素高度不被内容撑开，后续区块叠进输入框区域

## 解决方案
- 给该行（如 .description）补 min-height:300rpx、height:auto、align-items:flex-start，留 padding-bottom 与下方区块分开
- 标签加 margin-bottom 增加呼吸；参考项目内 signInfo.vue 成熟写法
- 不要动全局 .uni-forms-item 的 align-items，以免连累所有单行表单项垂直居中
- 排查顺序：先看容器高度与遮挡，再看 focus/v-model 逻辑，最后才怀疑组件

## 验证与归属
- 所属项目：苏住房C；来源会话：d8d3c33d-5a07-488c-9663-dd7409ec4528；代码基线：8fc3cc5
- 涉及文件：src/pages_owner_extra/elevator/addAlone.vue、add.vue、input.vue、src/styles/form2.scss、src/components/ZsTextarea/ZsTextarea.vue

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "textarea_align_fix",
  "source_extraction_id": "f6816503b931464c9b89b467f68dad1b",
  "version": 1,
  "memory_type": "entities"
}
-->