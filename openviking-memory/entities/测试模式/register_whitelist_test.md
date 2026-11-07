# 企业注册真实接口白名单联调
产品2.0 的 zhi2-web-admin 企业注册全流程已接入白名单真实联调，卡在 Step3 暂无附件配置。

## 联调结果
- Step1 saveCompanyRegister ✅200；Step2 saveLegalPersonInfo（短信码 293858）✅200
- Step3 listByBusCode ✅200 但 data 为空；Step3 listAppendixSimplified ✅200（白名单已通）
- 全流程 Step1→5 ❌ 卡在 Step3「暂无附件配置」

## 本次修复
- 唯一手机号：避免 13800000000 触发「该手机号已注册」
- 图形验证码：Step2 加载后从 Vue 状态读取 /code 结果，不再误等已完成的请求
- Step3 探测用例：新增 real-api.spec.js 中「Step3 附件配置接口探测」
- 明确报错：无附件配置时直接提示需维护 busCode=8

## 当前阻塞
- 测试库缺少附件配置：/file/appendixConfig/listByBusCode 传 busCode=8 返回空数组，页面显示「暂无附件配置」

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：real-api.spec.js、security.js、companyRegister.vue、accountInfo.vue
- 所属项目：产品2.0；来源会话：f750b067-6c90-4a44-8c42-69fa4ec69c0d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "register_whitelist_test",
  "source_extraction_id": "c5172269f24c433381c4000831c218d5",
  "version": 1,
  "memory_type": "entities"
}
-->