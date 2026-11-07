# 关闭外部登录时跳过灵锡房屋授权检查
惠山二期H5在 VITE_APP_OUT_LOGIN=false 时一律跳过灵锡房屋授权检查，避免测试环境误弹授权提示。

## 修改说明
- 原 checkLingxiHouseAuth 仅在 VITE_APP_OUT_LOGIN=false 且 MODE==='development' 时跳过，test模式仍弹提示
- 修改后复用 VITE_APP_OUT_LOGIN：export const skipLingxiHouseAuth = !isOutLoginEnabled
- checkLingxiHouseAuth(url) 中若 skipLingxiHouseAuth 则返回 true，跳过业务决策/选举的房屋授权检查

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话：acf753e7-5c5e-4a4b-813f-ee605ac49acf
- 验证：会话 acf753e7-5c5e-4a4b-813f-ee605ac49acf 完成修改
- 涉及文件：src/utils/lingxi.js、src/utils/index.js、.env.test
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_skip_house_auth_out_login",
  "source_extraction_id": "1807f7f40b37437882a8c1d8884b1b34",
  "version": 1,
  "memory_type": "entities"
}
-->