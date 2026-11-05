# 我的页头像相对路径直绑导致加载失败
苏住房C 小程序「我的」页 `My_Suzhufang.vue` 将头像相对路径直接绑定到 `<image>`，被微信当作本地资源引发 500 错误。

## 问题原因
- 上传头像后接口返回文件服务相对路径，例如 `/zhi2-pro/2026/v/w/0/6005de70-874d-4663-9b2a-35a0aa385b1c.png`
- `My_Suzhufang.vue` 中 `avatarUrl` 用 `resolveFullMediaUrl(userStore.avatar)` 直接绑到 `<image>`
- 微信小程序将以 `/` 开头的地址当作包内本地资源，不走网络请求，报 `Failed to load local image resource ... status 500`

## 页面差异
- `userInfo.vue` 使用 `ZsImage` 并设置 `:local` 正确处理
- `My_Suzhufang.vue` 直接绑定 `<image>`，未走 ZsImage 通道

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`My_Suzhufang.vue`、`userInfo.vue`、`zhi2-mobile-shimin/src/pages/index/components/My_Suzhufang.vue`
- 来源会话ID：785096f4-4ab9-4c30-b361-cd9f73a774e6

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "suzhufang_avatar_fix",
  "source_extraction_id": "e393299e4a9740aba5960facd459a397",
  "version": 1,
  "memory_type": "entities"
}
-->