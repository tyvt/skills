# 灵锡登录成功后仍需单独调用绑房接口
惠山二期H5中灵锡登录与绑房是两个独立步骤，仅登录成功不代表绑房成功。

## 流程说明
- 登录和绑房是两个独立步骤
- 前端方法 bindHouseByLingXi 定义于 src/api/security.js（POST /security/ctAuth/lingXi/bindHouse），于 src/utils/lingxi.js 登录成功后调用（传 authCode）
- security.js 的 bindHouseByLingXi 通过 POST /security/ctAuth/lingXi/bindHouse 提交授权页回跳URL中的 authCode
- lingxi.js 在登录成功后调用绑房接口
- 仅登录成功不能证明绑房成功

## 验证与归属
- 验证：extracted source=cursor session=3f88a068-ae31-4d50-8668-4179cc6f38aa
- 涉及文件：src/pages/index/newHome.vue、src/pages/index/useProjectState.js、src/api/index.js、src/utils/lingxi.js、src/App.vue 等
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：3f88a068-ae31-4d50-8668-4179cc6f38aa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_login_bind_separate",
  "source_extraction_id": "1807f7f40b37437882a8c1d8884b1b34",
  "version": 2,
  "memory_type": "entities"
}
-->