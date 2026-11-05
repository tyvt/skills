# 卡通女性头像替换与冗余文件清理
苏住房C(zhi2-mobile-shimin)及安卓端中卡通女性头像（default-avatar.png）已统一替换为苏住房logo白底图并删除冗余副本。

## 替换文件
- 以下分包的`default-avatar.png`换成苏住房logo白底图：`pages_my/static/images/default-avatar.png`、`pages_owner/static/images/default-avatar.png`、`pages_owner_extra/static/images/default-avatar.png`、`pages_transaction/static/images/default-avatar.png`。

## 删除文件
- 主包源文件`src/static/images/default-avatar.png`（卡通版）
- `src/pages_tab/static/images/default-avatar.png`（pages_tab根目录重复副本）

## 代码调整
- `My_Jiayuanqu.vue`改为使用`images/my/default-avatar.png`
- `utils/index.js`从分包映射中移除已不存在的文件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`My_Jiayuanqu.vue`、`utils/index.js`、安卓`MyFragment.kt`、`src/pages.js`等
- 来源会话ID：c3ed7f35-ce50-47d7-af6b-374b855d274e；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "default_avatar_replace",
  "source_extraction_id": "1cce340fb61d44689d381b5141b1cc0e",
  "version": 1,
  "memory_type": "entities"
}
-->