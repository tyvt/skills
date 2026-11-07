# 门户V3组件同步与e2e登录适配
门户 zhi2-web-admin 作为父仓子模块，常从苏州市房地产监测V3同期拷贝公共组件与全局样式，同步后需验证编译并适配e2e登录步骤。

## 同步与验证流程
- 常从 V3 拷贝 `src/components`、`src/styles/index.scss`、`detailLayout.js` 等公共组件与全局样式
- 同步后应运行 `npm run build` 验证编译是否通过
- 子模块提交后需更新父仓「门户」的子模块指针
- 例：V3 公共组件同步至 `zhi2-web-admin` 子模块指针 `2fab43729` 后 `npm run build` 通过

## e2e登录不一致问题
- V3 侧 e2e 用例默认按传统 `.login-form` 登录页编写
- 门户对外入口已是 `UnifiedLogin.vue`，直接跑 V3 迁来的 list-table 等 e2e 可能因选择器不一致而红测
- 稳定绿测需在 `e2e/fixtures/auth-helpers.js` 增加门户 UnifiedLogin 登录步骤，或单独维护登录 fixture
- 须于 `e2e/.env.e2e` 配账号后跑 `npm run test:e2e:list-table-column-width` 等依赖真实接口的用例（如 `e2e/list/table-column-width.spec.js`）
- 需在 `e2e/.env.e2e` 配置可访问后端的账号后再跑依赖真实接口的用例

## 涉及文件与归属
- 涉及 zhi2-web-admin/src/components、src/styles/index.scss、src/utils/detailLayout.js、e2e/fixtures/auth-helpers.js、e2e/list/table-column-width.spec.js、playwright.config.ts、src/views/home/UnifiedLogin.vue、package.json（含「门户」与「苏州市房地产监测V3」两仓对应路径）
- 所属项目：门户；来源会话 f1dec228-6407-422d-9866-035a036d169f；代码基线 b84b4e7（对话注 none）

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_v3_sync_e2e",
  "source_extraction_id": "cabaf046dae94cc2ac7e371aef4ebe99",
  "version": 2,
  "memory_type": "entities"
}
-->
