# zs-import
项目全局统一注册的导入组件。

## Description
- 用于替代各页面自行编写的 zs-dialog + el-upload 导入弹窗
- 成功后调用 msgSuccess 提示，失败后调用 msgError 提示

## Role
- 统一项目内 16 处以上导入入口的提示规范
- 支持 @download 模板下载与校验失败结果文件下载

## Relations
- 在 BuildingsTable.vue 中替换了原生 this.$alert 弹窗（bug 6049 修复）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "前端组件",
  "name": "zs-import",
  "source_extraction_id": "ac62c34549714f5cb784c70d04a72110",
  "version": 1,
  "memory_type": "entities"
}
-->