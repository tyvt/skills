# 苏服办H5登录失败集中弹窗展示
无锡市区小程序嵌入H5在苏服办登录失败时，统一通过 h5Context 的 showSfbLoginErrorModal 展示完整入参与响应，并配合 noReject 避免拦截器 Toast 冲突。

## 背景与做法
- 登录失败需展示接口 msg、实际入参（name/idType/idNumber/phone）与完整响应 JSON，且必须手动点确定关闭
- 在 utils/h5Context.js 的 performSfbLoginIfNeeded 内统一调用 showSfbLoginErrorModal：uni.showModal + showCancel:false
- 覆盖业务 code 非 200/0、成功但无 accessToken、网络异常三类失败
- sfbLogin 请求带 noReject:true，api/index.js 对 noReject 分支禁止自动 Toast
- usePortal.js 去掉重复 showToast，避免与调试弹窗叠两层

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：e904622f-d610-4edc-99c8-78a4514d766f
- 验证会话：e904622f-d610-4edc-99c8-78a4514d766f（基线 06aa6e2）
- 涉及文件：src/utils/h5Context.js、src/hooks/usePortal.js、src/api/index.js、src/api/security.js
- 所有入口（initH5Context、usePortal.bootstrap、onGateConfirm）共用这一套
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_login_error_modal",
  "source_extraction_id": "ebbf4b220692482fb080e0c398f71fe7",
  "version": 1,
  "memory_type": "entities"
}
-->