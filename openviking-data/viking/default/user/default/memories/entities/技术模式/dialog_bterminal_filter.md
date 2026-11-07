# 公共选择弹窗端别过滤逐页注入
园区物管2.0 中公共函数式选择弹窗 zs-select-dialog-func 不塞端别业务逻辑，B 端 projectId 由调用页注入 filterParams 的约定。

## 问题背景
- 物业服务监管账户选择弹窗需按端别区分过滤：B 端必须带 projectId，G 端不带
- 最初把「B 端追加 projectId」写进公共组件内部，导致通用组件绑定单一业务语义，复用行为不可控
- 端别条件本质是调用方上下文，不是弹窗自身职责

## 解决方案
- 将业务逻辑从 zs-select-dialog-func.vue 剥离，还原为纯通用组件
- 全部 17 个调用页面（assetLeaseApply、pubUseMoneyApply、pubBankReceiptApply、pubCommunityBook 等 benefit 域页面）在 SelectDialog.open 处统一注入：const isBTerminal = this.$store.state.user.terminalType === 'B'，再按 isBTerminal ? { projectId: this.$store.getters.currentProjectId } : {} 展开 filterParams
- 套路与「B 端按 terminalType 隐藏搜索项要逐页过滤」同源但方向相反：靠调用方 filterParams 注入端别差异，禁止改公共组件

## 验证与归属
- 验证：会话 e5aac6dd 撤销公共组件业务逻辑，17 个页面清单加 B 端 projectId 查询条件
- 涉及文件：src/components/zs-select-dialog/zs-select-dialog-func.vue 及 17 个 benefit 域调用页
- 所属项目：园区物管2.0；代码基线 177bc3ce4；来源会话 e5aac6dd-3ab0-4e2f-9913-fb3d8282eb18

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_bterminal_filter",
  "source_extraction_id": "79b34236c0554bfc9e14393689c2988b",
  "version": 1,
  "memory_type": "entities"
}
-->