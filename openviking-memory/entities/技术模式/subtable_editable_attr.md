# 子表增删入口可操作性判定下沉
子表新增/删除/提取按钮显隐统一由子表组件内 editable 计算属性按 bizState 判定，父层不再传 :readonly。

## 背景与问题
- 项目备案申请的宗地表与证书 Tab 需按状态控制按钮显隐，最初父组件传 :readonly 给子表
- 用户纠正：查看状态 formMode=view 也要显示，formMode 描述怎么进来的而非能不能改
- 真正可编辑性由业务状态 bizState 承载（bizState=0 或空=尚未备案=可编辑），父层混用 formMode 推导会互相打架

## 解决方案
- 判定统一收敛到子表组件内部 editable 计算属性，判据 bizState === 0 || bizState === undefined
- 父组件 detail.vue、changeDetail.vue 移除 :readonly 传参，不用 formMode 单独判只读
- 同一套判定覆盖子表全部写操作入口（新增、删除、宗地表「提取」按钮），不能只挡其中一个
- 规则沉淀为 docs/子表增删按钮显隐判断规范.md，交付前 eslint 0 error + 构建 EXITCODE=0 验证

## 验证与归属
- 会话 session-2f8d23da-97cc-4111-a10a-355b877d6fbc（基线 235e6ee）用户诉求 1/2/4，最终结论 fix(projectRecord) 宗地/证书增删入口改按备案状态判定
- 涉及文件：ParcelTable.vue、ProjectCertificateTabs.vue、detail.vue、changeDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_editable_attr",
  "source_extraction_id": "03080adbda084b2aac671362ab310a10",
  "version": 1,
  "memory_type": "entities"
}
-->