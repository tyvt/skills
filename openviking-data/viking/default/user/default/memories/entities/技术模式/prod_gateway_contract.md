---
audit_status: valid
last_checked: 2026-11-27T16:51:27+08:00
verdict_note: 惠山二期G(产品2.0) 命中 api/v2.0(2)，dist 接口硬编码 v2.0 前缀属实；nginx 配置不在代码仓
---
# 产品2.0 生产网关与本地联调契约
本地 zhi2-web-admin（产品2.0）dist 的接口前缀硬编码为 /api/v2.0/，只有产品2.0 生产网关 221.228.235.73:5777 与之配套，产品1.0 站点无法对接。

## 地址与契约差异
- 产品2.0 生产网关：http://221.228.235.73:5777；其 /api/v2.0/code 返回 `{"msg","code":200,"data":"..."}`，字段为 data，与本地 dist 读取方式一致（as of 2026-11-24 用户提供）
- 产品1.0 站点 www.hsqhoafunds.cn:5777 只认 /api/* 与 /prod-api/*（登录为 /prod-api/auth/login），/code 返回平铺 img 字段，没有 /api/v2.0/* 与 security/auth/userLogin，访问返回 404
- 本地 dist 指向产品1.0 网关时，验证码渲染成 `base64,undefined`、登录 POST 404，8119 完全不可用
- 本地 dist 登录接口固定为 /api/v2.0/security/auth/userLogin，接口契约只对产品2.0 后端成立

## 本地联调配置
- 本地站点 8119 nginx 的 Host 头与 4 处 proxy_pass 需指向同一网关；autonomy 代理保留 9606 不动
- 改配置后须 `nginx -t` 校验 + reload；改错（指向产品1.0）应立即回滚到原 dev 网关，不留坏配置
- 登录态 token 存在 sessionStorage 的 `Admin-Token`，调后端接口需带该 header

## 验证与归属
- 2026-11-24 将 4 处 proxy_pass 切至 221.228.235.73:5777 后，验证码正常渲染，本地 8119 登录成功、后台首页数据正常加载
- 所属项目：惠山二期G（产品2.0 zhi2-web-admin）；服务于禅道 bug 6950「资金拨付作废」前端验证环境搭建

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prod_gateway_contract",
  "source_extraction_id": "355e7d99a2df4ccc9f923ed313d97321",
  "version": 1,
  "memory_type": "entities"
}
-->