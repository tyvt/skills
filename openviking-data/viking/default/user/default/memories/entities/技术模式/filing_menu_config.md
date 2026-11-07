# 公共查询备案入口菜单报错
苏住房G公共查询页四个备案入口报「没有授权相关菜单」，实际是空状态链接复用旧filePath跳转配置导致路径解析失败，并非权限不足。

## 现象与根因
- 公共查询→物业管理区域查询→详情页，点广告位/停车位/经营用房/公共场地备案四个tab提示「没有授权相关菜单」，但账号确有菜单权限
- 四个入口空状态链接/右上角备案按钮共用一段跳转配置，指向旧备案页filePath，该路径在当前环境菜单里不存在，buildNavigationByFilePath解析失败统一抛错

## 解法与边界
- 先区分「权限不足」与「路径解析失败」：看菜单是否在动态路由表、filePath能否resolve到component
- 按需求只改被点名分支：广告位改调pubRevenueContractAdvSpace/project-statistics-page，详情跳benefit/resourcesLeaseContractFiling/detail并传revenueContractId
- 其余三个tab（pubParkingSpace/pubHouse/pubVenue）接口与跳转一律不改；文案不要顺手改（用户明确「文案别改」）
- 清理随之失效的公共配置：删除只服务批量改造的assetLeaseContractConfig.js与assetLeaseOverviewMixins.js（仅留一个消费方即成死代码）

## 验证与归属
- 来源会话39df3032（2026-07-30，基线e590ffa）：用户贴接口返回体与报错截图，要求改跳广告位租赁合同；两轮约束「文案别改」「只改广告位」
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、detail.vue、components/buildingTable.vue、advertiseTable.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filing_menu_config",
  "source_extraction_id": "52723b29124e479cbd6d860437d400c6",
  "version": 1,
  "memory_type": "entities"
}
-->