# 门户人脸验证会话5分钟内复用
门户链路（verify→bdc→不动产）上次扫脸成功后5分钟内可不再调起人脸，由 isSfbFaceRecentlyVerified() 判断。

## 描述
- 惠山 zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceSession.js（新建）导出 SFB_FACE_VERIFY_SESSION_MAX_AGE_MS = 5 * 60 * 1000
- 提供 markSfbFaceVerified / isSfbFaceRecentlyVerified / clearExpiredSfbFaceVerifySession / clearSfbFaceVerifySession 方法
- 已完成灵犀选屋绑定：再次点「业主决策」会直接打开外部投票H5，不经过人脸页（逻辑仍在无锡项目的 usePortal.js，惠山仓库尚未接入门户）
- 后续从无锡同步 pages/face/bdc.vue 时可直接使用

## 验证
- 验证来源：src=惠山二期H5/003.md
- 文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/decision/form.vue、src/pages_owner/elect/form.vue、src/pages.json、src/pages_owner/decision/components/multiple/ViewOptionsList.vue、src/api/autonomy.js、src/pages_owner/house/index.vue、无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/hooks/usePortal.js
- 项目：惠山二期H5 / 无锡市区小程序嵌入H5；来源会话：dfbbf465-c764-4a09-b414-4083bef5f5d2；代码基线：none

## 验证与归属
- 所属项目：惠山二期H5
- 验证证据：extracted source=cursor project=惠山二期H5


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "portal_face_session_reuse",
  "source_extraction_id": "7045f4d455184c36854e68c49be63b56",
  "version": 2,
  "memory_type": "entities"
}
-->
