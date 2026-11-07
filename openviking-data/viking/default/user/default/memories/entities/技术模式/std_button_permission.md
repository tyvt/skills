# 按钮权限走zs-button:permission而非v-hasPermi（std-evaluation）
本项目前端按钮权限用zs-button的:permission属性经checkPermission/hasPermission校验，后端stdEvaluation包@PreAuthorize实测0命中。

## 错误推论与事实
- 审计用grep v-hasPermi得「按钮无权限控制」(D9前端)被纠正：项目用组件prop+自研checkPermission，非Vue指令
- 后端stdEvaluation包15个Controller @PreAuthorize实测0命中是真实事实，但须表述为「接口层无鉴权，仅靠菜单隐藏+网关token」

## 正确检测方式
- 判断按钮权限先读zs-button的permission prop与checkPermission实现，再grep permission=/:permission，勿grep v-hasPermi
- 权限串统一 moduleName:businessName:action（如 evaluation:rectification:submit）
- OperationBtnGroup逐按钮校验 module:business:action

## 报告与补鉴权
- 报告分「前端有控制」「后端无鉴权」两节，不合成一句
- 前端按钮隐藏不能替代后端鉴权，结论写「渲染层已控制，但不能替代后端鉴权」
- 提后端补鉴权附Controller清单与实测0命中检索证据

## 验证与归属
- 来源会话 d38c482b（基线05caac8）最终结论核对表D9
- 涉及文件 zs-button.vue、OperationBtnGroup/index.vue、docs/std-evaluation/api-map-check.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_button_permission",
  "source_extraction_id": "3e2e7f4e118548deb96ba4904d71db2b",
  "version": 1,
  "memory_type": "entities"
}
-->