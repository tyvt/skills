# ZsMap 腾讯位置服务 Key 鉴权失败属平台配置
苏住房C 市民端 ZsMap 报错「鉴权失败：当前产品鉴权失败」「海外图鉴权失败」与静态图片 500 无关，属腾讯位置服务 Key 未绑定。

## 现象与根因
- 真机/开发者工具同屏出现地图鉴权失败报错，干扰图片 500 排查。
- 根因：ZsMap 的腾讯位置服务 Key 未在该小程序 AppID 下绑定或未启用「微信小程序」产品；Key 过期或属他项目亦如此，代码无法修。
- 具体 AppID 为 wx29004322ee722713；开发者工具 AppID 与 Key 绑定不一致同样触发「鉴权失败」「海外图鉴权失败」连带报错。

## 解决方案
- 到腾讯位置服务控制台为 Key 勾选「微信小程序」并填 AppID。
- 若 Key 过期或属他项目，需同步替换四处硬编码 Key：ZsMap.vue 的 subkey、utils/file.js 的 QQ_MAP_KEY、utils/index.js 中 localSearch 的 key、manifest.json 的 h5.sdkConfigs.maps.qqmap.key；建议抽成统一常量避免散落。
- 别把地图鉴权报错与图片 500 混成一个问题处理。

## 验证与归属
- 验证：会话 e3873d64 用户贴出两条地图鉴权失败与三张图片 500；结论指出鉴权失败是平台配置问题，与图片无关。
- 验证：会话 b1546e14 定位为腾讯地图 Key 鉴权问题，列出 ZsMap.vue subkey="3SQBZ-QJL66-TV5SJ-ETW3L-LADIS-T6FKA" 与 manifest.json appid；给出控制台检查、公众平台接口开通、清缓存、真机验证步骤及新 Key 替换四处落点。
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/manifest.json、src/utils/index.js、src/utils/file.js
- 所属项目：苏住房C；来源会话ID：e3873d64-6106-455a-aff6-e426cf0638d1, b1546e14-b5e1-43ee-beef-578fcfc4626f；代码基线：9832ba3。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsmap_tencent_key_auth",
  "source_extraction_id": "d37fa3aa8383435db39d4c43bf59ba61",
  "version": 2,
  "memory_type": "entities"
}
-->