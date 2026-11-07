# getOauthInfoByIdNumber 接口调用说明
昆山市民小程序中 getOauthInfoByIdNumber 仅在实名成功后后台刷新时调用，且不返回 token 的影响取决于接口成败。

## 调用时机
- 仅在 `refreshUserAndHouse()` 中调用，位于人脸核身成功、页面跳转之后。
- 触发场景：`editUserInfo` 修改实名、首次实名，均先 toast+跳转再后台调接口。

## 代码位置
- 调用文件：`src/pages/verifyUser/index.vue` 的 `refreshUserAndHouse()`（约123:128行）。
- 相关接口：`getInfoByCode`（`wxLogin.js`）。

## 行为影响
- 接口成功：设置 token 与用户信息，并初始化房屋信息。
- 接口失败：不影响已完成的跳转，仅后台刷新失败。

## 验证与归属
- 所属项目：昆山市民；来源会话ID：e7a59e5a-613e-404d-ab23-37e8863e3fcf。
- 验证证据：extracted source=cursor project=昆山市民。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "getoauthinfo_interface",
  "source_extraction_id": "359960c73745441f8aff7633ed613feb",
  "version": 1,
  "memory_type": "entities"
}
-->