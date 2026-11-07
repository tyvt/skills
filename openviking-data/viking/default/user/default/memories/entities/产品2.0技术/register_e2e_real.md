# 注册类真实接口 E2E 三处必改
用真实接口跑注册全链路 E2E 时，每次都必须处理唯一手机号、图形验证码读取方式与附件配置接口探测三件事。

## 必改要点
- 手机号必须每次唯一（时间戳或序号拼接），写死 13800000000 第二次会撞「该手机号已注册」导致用例假失败
- 图形验证码须等页面加载完成后从 Vue 状态读 /code 答案再填，不要在提交前 waitForResponse 等 /code（请求早已完成只会超时）
- 附件区依赖后端 fjflpz 按 busCode 下发的「附件分类配置」，listByBusCode 返回空时页面显示「暂无附件配置」且「下一步」永远不可点，属数据阻塞非代码 bug

## 正确做法
- 新增一条接口探测用例单独断言 listByBusCode 返回非空，缺失时明确报出 busCode 与所需配置编码，不要改前端绕过
- 白名单按链路顺次补齐：saveDraft / editAndSubmit / /file/appendix/upload

## 验证与归属
- 来源会话 f750b067：列出唯一手机号、Vue 状态读验证码、Step3 新增附件配置探测用例三项修复
- 阻塞为 /file/appendixConfig/listByBusCode 传 busCode=8 返回空数组，需在 fjflpz 维护 company_register_license / company_register_id_card
- 涉及文件：src/views/register/companyRegister.vue、e2e/real-api.spec.js、src/components/AnnexUpload/index.vue
- 所属项目：产品2.0；代码基线：39e3114

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "register_e2e_real",
  "source_extraction_id": "90d1b0f9d9774c0d9a37f9b9cd45eeee",
  "version": 1,
  "memory_type": "entities"
}
-->