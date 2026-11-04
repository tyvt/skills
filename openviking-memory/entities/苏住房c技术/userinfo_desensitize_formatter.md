# 个人身份信息展示须走 formatter 脱敏
苏住房C 新房核验申请页直接展示 userStore 姓名与身份证号原文，漏掉项目脱敏约定。

## 问题现象
- newHouseCertification/detail.vue 直接渲染 userStore 里姓名与身份证号原文，未脱敏
- 新页面复刻只接数据源，漏掉展示层脱敏约定

## 根因
- 项目约定用户信息展示一律脱敏，新页漏接导致原样渲染
- 与后端无关，属前端展示层规范缺失

## 解决方案
- 调用 src/utils/formatter.js 的 blurName（保留首字，张三→张*）与 blurIdNumber（保留前2后2，中间*）
- 关键约定「只脱敏展示」：页面显示脱敏串，form 内仍存完整明文，提交接口不受影响
- 凡是新建/复刻申请页、签约页出现姓名或证件号展示，必须套这对 formatter，不自写截断

## 验证与归属
- 验证会话 ec2c21f5：申请页 detail.vue 直接用 userStore 原始数据；参照 stockHouseSign/apply.vue、publishHouse/verification.vue 改用 formatter
- 涉及文件：src/pages_transaction/newHouseCertification/detail.vue、src/utils/formatter.js、src/pages_transaction/publishHouse/verification.vue、src/store/user.js
- 所属项目：苏住房C；来源会话ID：ec2c21f5-1d1e-4abb-a5d4-f34c93d6919a；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "userinfo_desensitize_formatter",
  "source_extraction_id": "d37fa3aa8383435db39d4c43bf59ba61",
  "version": 1,
  "memory_type": "entities"
}
-->