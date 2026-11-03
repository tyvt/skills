# 详情页子表弹窗取消按钮禁用级联
园区公共收益 Vue2 + Element UI 详情页将子表移出 zs-form 后，嵌套弹窗 footer 按钮仍可能因 inject 链继承查看态 disabled。

## 现象与根因
- 经营资源租赁合同详情查看态下，广告位等子表弹窗「取消」按钮呈禁用，但弹窗内无独立 form。
- Element UI 的 el-button 通过 inject 读取祖先 el-form 的 disabled；子表虽渲染在 zs-form 闭合标签后，Vue 组件树仍是详情页子孙节点，disabled 仍传到弹窗 footer 按钮。

## 修法与排查
- 仅把子表块移出 zs-form 不够，需对齐同业务已验证页面（如 assetLeaseApply/detail）的挂载位置与组件边界。
- 排查沿「详情 zs-form disabled → 子表 → 子弹窗 footer el-button」看 inject 链，不要只在弹窗模板找 form。

## 关联信息
- 涉及文件：benefit/resourcesLeaseContractFiling/detail.vue、assetLeaseApply/detail.vue、assetLeaseApply/components/subAdvertiseDialog.vue。
- 所属项目：园区公共收益；来源会话：8b780ae8-507b-43c5-a453-8d14ffb784a3；代码基线：Vue2 + Element UI + zs-form 详情页。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subdialog_disabled_inject",
  "source_extraction_id": "26c4c443e80649a0bdd7a9c3a71c55c0",
  "version": 1,
  "memory_type": "entities"
}
-->