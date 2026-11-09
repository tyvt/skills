# 非物业服务小区变更记录审批流动态busCode
在zhi2-web-admin中，非物业服务小区（211/212/213/214/215/22）的变更记录审批流按complexManageType动态取对应类型菜单的busCode，实现社区提交、街道审核的二级审批。

## 方案要点
- 新增NON_PROPERTY_SERVICE_TYPES（211/212/213/214/215/22）标识非物业服务小区类型
- resolveComplexChangeFlowBusCode()按complexManageType从对应类型详情菜单路由meta.busCode取审批流编码
- 专业化(1)/未知/菜单未配置时回退共用busCode `we`，不写死编码
- complexChange/detail.vue新增flowBusCode computed传给operation-btn-group的:bus-code
- complexChange/index.vue的handleView/handleUpdate透传行上complexManageType到详情query

## 涉及文件
- zhi2-web-admin/src/utils/complexManageType.js
- zhi2-web-admin/src/views/property/complexChange/detail.vue
- zhi2-web-admin/src/views/property/complexChange/index.vue
- zhi2-web-admin/src/utils/ruoyi.js（待办跳转守卫：存储路径已指向complexChange/:id时直接沿用，避免反查落到小区备案详情）

## 验证与状态
- ESLint：3文件0报错；ruoyi.js有99项存量风格报错，新增8行无报错
- 方法级：busCode解析14/14、待办跳转5/5通过
- 构建：worktree×2+主工作区×2全部exit 0，部署nginx苏住房G:8101
- 提交：子模块40d0b0d4b、父仓库923f890均推送develop/v2.6.2-suzhufang
- 禅道任务2339已标记done（2026-11-09 11:05:06）

## 后端依赖
- 苏住房测试库6个类型busCode仅JDSQTGXQXXQ、WWYFWXQXXQ有SYS_FLOW_CONFIG
- DWZGXQXXQ/YZZGXQXXQ/FGSGLXQXXQ/SHZZDGXQXXQ尚无流程配置，需管理员配"社区提交、街道审核"
- 若后端另配变更专用busCode，前端按meta.busCode动态取，无需改代码

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_change_buscode",
  "source_extraction_id": "7636649086de41929e40b769422145bb",
  "version": 1,
  "memory_type": "entities"
}
-->