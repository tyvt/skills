# 腾讯地图Key鉴权失败排查
苏住房C(zhi2-mobile-shimin)地图渲染报「当前产品鉴权失败」，属腾讯地图Key未与小程序AppID正确绑定，非业务代码错误。

## 错误含义
- 「当前产品鉴权失败」：`subkey`无效或未开通「微信小程序」产品
- 「海外图鉴权失败」：个性化地图/海外图层鉴权失败，常伴随主Key鉴权失败出现

## 项目配置
- 腾讯地图Key：`3SQBZ-QJL66-TV5SJ-ETW3L-LADIS-T6FKA`（位于`src/components/ZsMap/ZsMap.vue`的`subkey`）
- 小程序AppID：`wx29004322ee722713`（位于`src/manifest.json`的`mp-weixin.appid`）

## 解决方向
- 登录腾讯位置服务控制台检查Key是否与当前AppID绑定、是否开通微信小程序产品

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/components/ZsMap/ZsMap.vue`、`src/manifest.json`
- 来源会话ID：b1546e14-b5e1-43ee-beef-578fcfc4626f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tencent_map_key_auth",
  "source_extraction_id": "1dc4c2f4b8f548ee871a78669e257e68",
  "version": 1,
  "memory_type": "entities"
}
-->