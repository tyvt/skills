# 无锡市区H5发版子模块流程
无锡市区小程序嵌入H5主仓通过git submodule引用子模块，发版须先推子模块再更新主仓指针并打时间tag。

## 仓库拓扑
- 主仓 `无锡市区小程序嵌入H5`（分支如 `main-sfb`）
- 通过git submodule引用 `zhi2-mobile-admin-h5-c-unlimited`（分支如 `dev_wuxi-sfb`）

## 发版流程
- 先在子模块commit+push功能修复
- 再在主仓 `chore: 更新子模块引用` 提交并push
- 最后在主仓打tag（示例 `202608282148` 与 `202608282148-sfb`）并推送
- 避免只推子模块导致线上主仓仍指向旧commit

## 验证与归属
- 来源会话：5e649194-e4f2-40db-bdc7-51c0016d5541
- 代码基线：05f9a28
- 涉及文件：.gitmodules、zhi2-mobile-admin-h5-c-unlimited
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "release_submodule_flow",
  "source_extraction_id": "259ccd137522413f8a275a710d09c982",
  "version": 1,
  "memory_type": "entities"
}
-->