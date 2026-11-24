# 隐患处置页按钮安全权限改造模式
zhi2-web-admin 的 electrocar 隐患处置页（列表 index.vue、详情 detail.vue）按钮统一接入真实安全权限码的改造方式。

## 权限码来源
- 权限码存放在 app 库（不是禅道库）：electrocar:hazard:{list,view,add,edit,delete,feedback,finish}
- 删除对应权限码为 delete；公共 mixin 的 deleteButton 默认 permissionType 为 remove，需覆盖为 delete

## 列表页改造
- 编辑、删除改用公共 mixin 的 editButton/deleteButton，不再自写按钮配置
- 自写按钮的 permission:true 会让 checkPermission 直接放行，不能当作真实权限
- 反馈进度、处置完成等自定义按钮需显式补真实权限码

## 详情页改造
- 反馈进度、处置完成按钮保留自定义结构，但补 :permission 真实权限码
- OperationBtnGroup 遇到并发重构（如 bug 6902 吸底结构）时只在新位置补权限、不改结构

## 验证与关联
- 关联禅道 bug 6835；改造计划审核 78/100 通过
- 验证方式：改动文件 ESLint（exit 0），npm test 构建需后台运行并复核

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "hazard_button_permission",
  "source_extraction_id": "3c0d6f0fcadc4f89b25debe6ef5aed17",
  "version": 1,
  "memory_type": "entities"
}
-->