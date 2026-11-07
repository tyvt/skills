# 附件允许类型后端字典码误判
附件类型不允许报错根因是后端 appendixConfig 逗号串字典码比对，而非前端 accept 或扩展名白名单。

## 问题现象
- 企业注册/入网等表单上传 png/jpg/pdf 仍统一返回「文件类型不允许」
- 用户确认已在配置勾选允许类型码 0 和 3，但上传仍被拒

## 根因分析
- V3 附件允许类型由 appendixConfig 逗号串字典码集合决定，后端按 fileType 字典码逐项比对
- 常见误判：配置只勾少数码用户以为全覆盖；前后端双真相源不一致；扩展名与字典码口径不一致（0/3 是码，png 是扩展名）
- 扩展名不能由后端 fileType 反推，方向反过来同样不成立（参见已知 #302）

## 解决方案
- 报错时先调 appendixConfig/detail 或 listAppendixPackage 打印允许类型码与上传文件 fileType 对照（已知 #286）
- 确认缺口由配置侧补码，前端仅在配置明确时做展示层过滤
- 前端禁止另建扩展名白名单作第二真相源；若需按扩展名过滤必须精确相等匹配而非 includes（已知 #1110）

## 验证与归属
- 来源会话 a48b51e8 用户贴配置接口 curl，最终因环境侧补数据后通过
- 涉及文件：zhi2-web-admin/src/components/AnnexUpload/index.vue、zhi2-web-admin/src/views/tool/fjflpz/components/FjDialog.vue、zhi2-web-admin/src/views/company/companyRegister/dialog.vue
- 所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "appendix_type_bug",
  "source_extraction_id": "023be684d29240b38dd4e584c076013b",
  "version": 1,
  "memory_type": "entities"
}
-->