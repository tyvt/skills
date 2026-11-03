# 物业区域四图位ComplexPhotoUpload迁移
园区物管/公共收益分支迁移时，物业区域图从单图改为四槽位 ComplexPhotoUpload 并由 utils/complexPhoto.js 维护逗号串。

## 功能要点
- 四槽位：大门必填，鸟瞰/服务中心/特色可选，格式 png/jpg/jpeg ≤5MB，非 ASCII 文件名上传前自动改名
- utils/complexPhoto.js 维护槽位配置与 complexPhoto 逗号分隔串的 parse/serialize
- 解析过滤历史 empty.svg 占位；保存缺位补默认图

## 展示与迁移
- 详情「区域概览」按固定顺序展示，未上传位用默认缩略图
- complexChange、publicQuery/complex 只读页同步展示规则
- 两分支 detail.vue 差异大时手工逐处迁移保留园区字段（宗地号、项目类型级联等），勿整文件覆盖
- 组件目录名即全局标签名（main.js glob 注册），无需手动 import

## 验证与归属
- 验证：苏住房分支 develop/v2.6.2-suzhufang 迁园区 develop/v2.6.2-yuanqu，三提交合并；5 文件 eslint 0、vite build 通过
- 涉及文件：ComplexPhotoUpload/index.vue、utils/complexPhoto.js、property/complex/detail.vue、property/complexChange/detail.vue、publicQuery/complex/detail.vue
- 所属项目：园区公共收益；来源会话：05d8ab0e-ab89-4e9c-bffb-a284f36311b6；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complexphoto_four_slot",
  "source_extraction_id": "684fafd2b29640698c2b0bf8580c7d26",
  "version": 1,
  "memory_type": "entities"
}
-->