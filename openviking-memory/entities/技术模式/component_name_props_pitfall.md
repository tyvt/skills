# 组件名撞名与 props 未透传陷阱
整理公共组件用法时发现两个不会报错但行为不对的源码级坑：内部 name 撞全局名、封装组件 fieldProps 未透传开关型 prop。

## 陷阱详情
- Vue2 扁平组件名空间：全局按目录名注册，AnnexUpload 内部写 name:'FileUpload' 与全局 FileUpload 撞名，后注册覆盖前者，特定页面渲染成另一组件且无 Vue warn。
- zs-file-upload 的 fieldProps 逐字段透传内部 el-upload，但 isShowTip 不在白名单，父组件传 fieldProps.isShowTip 不生效，提示语显隐被写死。

## 解决方案
- 写公共组件时内部子组件 name 不要与 src/components 下任何目录名重名，用私有名或不写 name。
- 排查「组件渲染成另一个」先查全局注册名与内部 name 是否重复，莫先怀疑 props 或数据。
- 封装组件支持开关型 props 必须在 fieldProps 透传白名单显式加入（如 isShowTip），改动时同步确认下游页面表现。
- 此类源码级陷阱写进组件手册踩坑小节，比只写用法更有价值。

## 验证与归属
- 验证证据：会话 57d32ce3-0078-4c6c-a983-06789d92189c（基线 a86bf95）将两陷阱写入 components-guide.md，核对 zs-dialog.vue:454-461、variables.css:69-70。
- 涉及文件：zhi2-web-admin/src/components/AnnexUpload/index.vue、zs-file-upload/zs-file-upload.vue、src/main.js。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "component_name_props_pitfall",
  "source_extraction_id": "23a9b1295c4141a4940596bbc58ceafc",
  "version": 1,
  "memory_type": "entities"
}
-->