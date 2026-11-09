# 禅道Bug 6379 经纪机构服务方案收费类型与标准必填
Bug 6379：苏州房地产客测环境，经纪机构-经纪服务方案，收费标准和收费类型更改为必填；zhunan 提交、tiany 处理并修复。

## 基本信息
- 提交人：zhunan；处理人：tiany（助手代理分析）
- 产品：product 7，项目：project 200，执行：execution 201
- 状态：2026-11-09 回写 status=resolved、resolution=fixed、resolvedBy=tiany、resolvedBuild=trunk、assignedTo=zhunan（开单人待客测回归）
- 禅道链接：http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6379

## 现象与根因
- 路径：经纪机构管理→服务方案→编辑服务方案弹窗（CompanySchemeDialog.vue）
- 截图确认：服务方案名称/机构名称/服务内容有红色 `*`，收费类型、收费标准无必填标记
- 根因：chargeType 完全无 required 规则；chargeStandard 仅有格式 validator 无 required 规则
- 文件：zhi2-web-admin/src/views/company/companyScheme/components/CompanySchemeDialog.vue（rules 第 167–171 行）

## 修复与验证
- chargeType 新增 `{ required: true, message: '请选择收费类型', trigger: 'change' }`
- chargeStandard 新增 `{ required: true, message: '请输入收费标准', trigger: 'blur' }`（保留原格式校验）
- 验证：ESLint 通过（exit 0）；生产构建成功（vite-build.mjs，EXIT=0，仅 Sass 弃用告警）
- 部署：本地 nginx 8098（站点 root 即 dist），构建产物 chunk 含 `chargeType:[{required:!0,...}]` 与 `chargeStandard:[{required:!0,...}]`

## 提交与回写
- 子模块 zhi2-web-admin 提交 f3d5c7c09，分支 fix/bug-6379-scheme-required（已推远程）
- 父仓库 gitlink 提交 6c9299b，分支 fix/bug-6379-scheme-required（已推远程）
- 禅道回写：DBX 事务化 UPDATE zt_bug + INSERT zt_action 89708（action=resolved、actor=tiany、备注含根因+修复+验证+提交号）
- Worktree：苏州市房地产监测V3-wt-bug-6379，未合并 develop/v3.0.0

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6379",
  "source_extraction_id": "3fd9f2051c44490a936ab0afff199155",
  "version": 1,
  "memory_type": "entities"
}
-->