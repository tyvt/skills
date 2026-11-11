# zhi2_web_admin
房地产前端管理后台 H5 子模块，使用 Vue 开发。

## Description
- 苏州房产前端管理后台子模块，分支为 develop/v3.0.0
- 构建命令为 npm run build，产物输出到父仓库 dist 目录

## Relations
- 作为子模块被父仓库引用，父仓库通过 gitlink 指向其提交
- 父仓库 dist 由 nginx 8098 提供静态服务
- 缺陷在禅道（zentao-biz.zhi.com）跟踪，例如 bug 6096、bug 6455
- 从业人员模块路径为 src/views/institution/agencyPersonnel，电子信息卡弹窗组件为 InfoCardDialog.vue
- 从业人员证书数据来自 T_PERSONNEL_CERTIFICATE_RECORD，人员详情接口返回顶层 certificateType / certificateCode

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "ff2d8a22c759478fb5d1c6c7049f6718",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->