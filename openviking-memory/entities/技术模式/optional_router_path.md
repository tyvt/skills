# 选择对话框辅助链接的可选路由路径
park-benefit (园区公共收益) 收益模块的选择对话框使用 getRouterPathByFilePathOptional 在用户缺少菜单权限时静默跳过辅助链接，避免重复的授权错误。

## 症状
- 选择对话框选项展示通过 getRouterPathByFilePath 解析的辅助链接，例如“前往开户” (open account) / “签署协议” (sign agreement)；若无菜单权限，每次调用都会弹出“没有授权相关菜单” (no authorized menu)。
- B端 showPropertyProjectDialog 调用 getRouterPathByFilePath 解析无权限菜单路由，抛出的错误阻塞了整个区域选择对话框。
- 多个链接弹出重复的相同错误，而区域选择本身应保持可用。

## 根本原因
- getRouterPathByFilePath 在菜单缺失时直接抛出错误，未区分“无权限时静默跳过”与“区域选择仍可用”。

## 修复
- 在 ruoyi.js 中新增 getRouterPathByFilePathOptional，返回 null 而非抛出异常。
- pubUseMoneyApply/detail.vue 仅在解析出的路由存在时才添加 extraLinks。
- 辅助链接应全部经过 getRouterPathByFilePathOptional；有权限时渲染链接，否则静默跳过。assetLeaseApply 和 pubBankReceiptApply 需要进行同样的批量检查。

## 验证与归因
- 已验证：在没有监管账户开户/监管协议签署菜单时，getRouterPathByFilePath 弹出两个相同的授权错误；切换到 Optional 后对话框正常选择区域。
- 文件：ruoyi.js, assetLeaseApply/detail.vue, pubUseMoneyApply/detail.vue, pubUseMoneyApply2/detail.vue, pubBankReceiptApply/detail.vue, zs-select-dialog-func.vue, regulatoryAccountPanel.vue.
- 项目：园区公共收益；源会话：82837732-6269-4a38-bb56-614e39f5bbeb, 5922f357-1df8-46c0-8045-f0e84afd364d；代码基线：36a9a7e。

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：82837732-6269-4a38-bb56-614e39f5bbeb


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optional_router_path",
  "source_extraction_id": "5ce0a0c981c640988963387d2655a557",
  "version": 2,
  "memory_type": "entities"
}
-->
