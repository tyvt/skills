# zs-dialog 内 zs-table 水平留白规范
zs-table 被放入 zs-dialog 的 form-box 后缺失左右 padding，须将水平留白下沉到 zs-table 公共容器规则而非逐弹窗补样式。

## 问题现象
- 经营用房(pubHouse)详情弹窗「资产部位」子表、公房车位弹窗、房屋部位 assetDialog 中表格紧贴弹窗边缘，左右缺留白
- 仅部分弹窗缺，其他弹窗正常

## 根因
- zs-table 水平留白依赖外层容器(.list-card/.sub-container/.form-box)提供
- 表格放进 zs-dialog 的 .form-box 时无任何一层给左右 padding；改页面级 scoped 样式仅当次生效，同类弹窗会复发

## 修法规范
- 将水平留白下沉到 zs-table 公共容器规则（与 .list-card、.sub-container 同源），一处改所有弹窗表格生效
- 改完须截图在多个弹窗（含公房车位、房屋部位）逐个复核左右是否一致

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 改动落在 zs-table.vue 与 styles/index.scss（公共层）后一次对齐，子模块提交后 cherry-pick 到 v2.6.2/v2.6.2-yulin
- 涉及文件：components/zs-table/zs-table.vue、styles/index.scss、pubHouse/components/pubHouseDialog.vue、pubParkingSpace/components/parkingDialog.vue、housePart/components/assetDialog.vue
- 所属项目：产品2.0；来源会话：2ee3fa7e-3302-4162-9884-a54bd1cffc7f；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_dialog_padding",
  "source_extraction_id": "741d126eb5854e64aed1e6056f86c066",
  "version": 1,
  "memory_type": "entities"
}
-->