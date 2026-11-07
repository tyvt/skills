# dev-sfb分支标签同步修复
苏住房C 地图找房新房详情出现穿屏，根因为本地标签与远端指向不同提交导致代码未对齐，已通过强制同步标签解决。

## 问题根因
- 本地标签 `20260730-01` 与远端同名标签指向不同提交
- `git pull --tags` 默认不会覆盖本地已有标签，导致拉取后版本不对齐

## 修复内容
- 强制将本地标签同步为远端（现指向提交 `df15c9a`）
- 完成 dev-sfb 拉取，当前分支已与远端对齐
- 本地仍 ahead 1（有 1 个未推送提交）

## 后续处理
- 同类问题可用：`git fetch origin refs/tags/<标签名>:refs/tags/<标签名> --force`

## 涉及文件与归属
- 涉及文件：src/pages/commonNew/bottomBtn.vue、Cursor 项目资源图片
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：c76d5b96-d6d4-41d2-8409-c838c89e5beb

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "dev_sfb_tag_sync",
  "source_extraction_id": "be4cb5694a9049d2b5d24d217f92a0dc",
  "version": 1,
  "memory_type": "entities"
}
-->
