# 禅道任务 2428
禅道任务 2428：开发企业注册流程中《平台使用协议》《企业注册协议》弹窗内容由硬编码/占位改为后台系统配置可配。

## 需求与依据
- 需求 1473 原文「增加注册使用协议配置功能，后续改动可直接配置」+ 两张需求截图（协议弹窗现状）。
- 归属 zhi2-web-admin 子模块，分支 develop/v3.0.0。

## 技术方案
- 复用项目已有接口 `GET /system/config/getByKey/<key>` 返回富文本，`v-html` 渲染；该接口有 `policy` 隐私政策页未登录可用先例。
- 因审核人质疑未登录态字典接口，方案改走 `/system/config/getByKey` 而非字典接口。
- 两个配置键：`company.register.agreement`（企业注册协议）、`platform.usage.agreement`（平台使用协议）。

## 代码改动
- 新增 `src/utils/agreementContent.js`：`getAgreementContent(configKey)` 走 `GET /system/config/getByKey/<key>`（`noMessage`，带请求去重缓存）。
- 新增 `src/views/register/components/CompanyAgreementDialog.vue`（configKey `company.register.agreement`），分步注册页 Step4Shareholders 与单页 CompanyRegisterSingleForm 复用，替换原 `$alert` 占位。
- 改 `PlatformAgreementDialog.vue`（configKey `platform.usage.agreement`）：`@open` 拉取，`v-html` 渲染配置文本，未配置/失败回退内置默认条款，加 loading 与富文本样式兜底。
- zhi2-web-admin 提交 `b61b9c547` 推送 develop/v3.0.0；父仓 gitlink `30f0ce0` 已推送。

## 验证与回写
- 5 个改动文件 `npx eslint` → 0 error、无新增 warning（CompanyRegisterSingleForm 20 条 warning 为未触碰存量行）。
- `npm run build` exit 0（v2.6.1 @ develop/v3.0.0）。
- 禅道回写：任务 2428 → status=done，zt_action 92226（finished，含 configKey 说明）。
- 未验证项：管理员实配两个 configKey 后真实页面效果（依赖后端配置，待联调）；需确认两键允许未登录读取。

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2428",
  "source_extraction_id": "b00812bf18f848ff8151bf40a999dd82",
  "version": 1,
  "memory_type": "entities"
}
-->