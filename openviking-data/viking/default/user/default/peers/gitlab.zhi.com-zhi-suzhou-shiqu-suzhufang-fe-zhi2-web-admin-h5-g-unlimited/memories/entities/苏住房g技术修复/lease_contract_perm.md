# 其他租赁合同列表页新增按钮权限
苏住房G（zhi2-web-admin）benefit 模块「其他租赁合同」/租赁合同备案列表页的顶部「新增」按钮通过公共 mixin 携带权限字符 benefit:pubRevenueContract:add；2026-11-24 起新增按钮权限码覆盖为 benefit:otherRevenueContract:add（禅道任务 2788）。

## 控制链路
- 页面引用：resourcesLeaseContractFiling/index.vue:243 在 operationButtons 中放 `this.addButton`（同类页 parkingSpaceContractFiling 写法一致）。
- 按钮定义：src/mixins/table.js:101-111 设置 `attrs.permission: [this.perms.add]`。
- 权限码拼接：src/mixins/permsMixins.js:8-17，`add = permsPrefix + ':add'`，`permsPrefix = moduleName:businessName`。
- 隔离做法：src/mixins/permsMixins.js:7 注释说明 businessName 与接口强相关，隔离权限应覆盖 `permsPrefix`（先例 workOrder/urge/index.vue:79）；`extraPerms` 扩展点仅 permsMixins.js:29 引用，组件可覆盖且只影响指定按钮。
- 显隐执行：src/components/zs-button/zs-button.vue:2 用 `v-if="checkPermission(permission, buttonName)"`，src/utils/permission.js:23-38 与 `store.getters.permissions` 比对，不匹配则不渲染。

## 结论与同排按钮
- 结论：该「新增」按钮有权限字符控制，走公共 mixin 标准写法，未绕过校验；权限码 benefit:pubRevenueContract:add（moduleName=benefit、businessName=pubRevenueContract）。
- 共用冲突：经营用房租赁合同 assetsLeaseContractFiling 与 resourcesLeaseContractFiling 的 businessName 同为 `pubRevenueContract`，两者新增按钮权限码相同，无法单独控制显隐。
- 2026-11-24 改动：resourcesLeaseContractFiling/index.vue:80 的 computed 新增 `extraPerms`，把新增按钮权限码覆盖为 benefit:otherRevenueContract:add，同页其他按钮与接口不动；ESLint 通过，npm test 构建通过（exit 0，51s）。提交、实机截图与禅道回写待续。
- 同排按钮权限码：忽略预警 :ignore、新增既有合同维护 :already、删除 :remove。
- 角色看不到按钮属预期权限控制，需检查后台菜单/角色是否分配该权限码；无权限角色仍能看到则查 permission.js 是否误判命中。

## 备注
- 页签「其他租赁合同」是后端动态菜单标题，源码不含该中文，需按按钮组合定位组件。
- 2026-11-24 上午先做只读排查，当日随后实施 extraPerms 改动；菜单/角色授权属后端配置，不在前端代码范围。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "lease_contract_perm",
  "source_extraction_id": "1a0e7b46db974b45bfcadd1f5fbc4962",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->