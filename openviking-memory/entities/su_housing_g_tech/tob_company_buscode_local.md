# ToB 企业变更 busCode 本地/非本地解析修复
苏住房G 中 ToB 企业变更 `busCode` 已按本地/非本地正确解析并推送，当前工作区干净无需再提交。

## 问题根因
- ToB 企业变更未根据本地/非本地使用对应的 `busCode`，导致后端反馈解析错误

## 修复方案
- 提交 `279e2ec42`：`fix: ToB 企业变更按本地/非本地解析正确 busCode`
- 子模块 `zhi2-web-admin` 分支 `develop/v2.6.2-suzhufang` 与 `origin` 一致，工作区干净
- 父仓库子模块指针已在 `00dc562` 更新并推送

## 验证与归属
- 验证：业务代码已在远端可直接联调；工作区仅剩未暂存 `env/.env`（代理地址注释）与本次修复无关
- 涉及文件：`zhi2-web-admin/src/utils/localOrganizationFlow.js`、`zhi2-web-admin/src/mixins/localOrganizationFlowMixin.js`、`zhi2-web-admin/src/views/toB/companyRecord/detail.vue`
- 所属项目：苏住房G；来源会话：a96b47f2-8e5d-47a4-8d57-d5fcdf160738

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "tob_company_buscode_local",
  "source_extraction_id": "199270f6de294f5b977b54d6c702ad55",
  "version": 1,
  "memory_type": "entities"
}
-->