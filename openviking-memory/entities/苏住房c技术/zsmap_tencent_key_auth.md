# ZsMap 腾讯位置服务 Key 鉴权失败属平台配置
苏住房C 市民端 ZsMap 报错「鉴权失败：当前产品鉴权失败」「海外图鉴权失败」与静态图片 500 无关，属腾讯位置服务 Key 未绑定。

## 现象与根因
- 真机/开发者工具同屏出现地图鉴权失败报错，干扰图片 500 排查。
- 根因：ZsMap 的腾讯位置服务 Key 未在该小程序 AppID 下绑定或未启用「微信小程序」产品；Key 过期或属他项目亦如此，代码无法修。

## 解决方案
- 到腾讯位置服务控制台为 Key 勾选「微信小程序」并填 AppID。
- 若 Key 过期或属他项目，需在 ZsMap.vue、manifest.json 中同步换新 Key。
- 别把地图鉴权报错与图片 500 混成一个问题处理。

## 验证与归属
- 验证：会话 e3873d64 用户贴出两条地图鉴权失败与三张图片 500；结论指出鉴权失败是平台配置问题，与图片无关。
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/manifest.json
- 所属项目：苏住房C；来源会话ID：e3873d64-6106-455a-aff6-e426cf0638d1；代码基线：9832ba3。


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsmap_tencent_key_auth",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 1,
  "memory_type": "entities"
}
-->