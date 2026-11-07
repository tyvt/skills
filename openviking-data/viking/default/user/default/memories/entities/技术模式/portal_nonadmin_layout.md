# 门户非管理端布局接口与侧边栏规则
门户（zhi2-web-admin）登录后按门户/企业类型渲染首页时，除「管理端」外其他类型（如开发企业）不应请求 operableProjectList，也不展示左侧业务侧边栏。

## 规则要点
- 非管理端账号类型不调用 operableProjectList 接口
- 非管理端不展示左侧业务侧边栏
- 改角色/布局逻辑时先核对账号类型分支，再决定是否挂载侧边栏与项目列表接口
- 误调接口或沿用管理端布局会导致角色判断错误、多余接口与错误 chrome

## 验证与归属
- 验证证据：用户明确要求「operableProjectList 这个接口不需要调用，除了管理端，其他类型都不需要展示侧边栏」；同会话先用开发企业账号反馈「目前判断的角色不对」
- 涉及文件：zhi2-web-admin/src/utils/portalLayout.js、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/router/index.js
- 所属项目：门户；来源会话 ID：b723bff2-01cd-4334-975a-a2a40778f1a2；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_nonadmin_layout",
  "source_extraction_id": "e88d7ad093b243e2bf01f883f5d8b250",
  "version": 1,
  "memory_type": "entities"
}
-->