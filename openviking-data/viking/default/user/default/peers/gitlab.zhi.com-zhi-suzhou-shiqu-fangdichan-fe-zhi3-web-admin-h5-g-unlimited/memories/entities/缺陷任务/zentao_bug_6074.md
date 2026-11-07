# 禅道Bug 6074 价格备案申请下载模板报错
房产管理系统价格备案申请楼幢价格导入弹窗点击「下载模板」报服务器异常，已修复并 resolved。

## 根因
- BuildingsTable.vue 的 zs-import 组件绑定 @download="importTemplate"，调用后端 presale/recordPriceHouse/importTemplate 接口
- 后端确认无下载模板能力（禅道备注：没有下载模板功能，需要隐藏）

## 修复方案
- 给 zs-import 传 :tmpl="false" 隐藏下载模板链接（组件内部用 v-show="tmpl" 控制该链接）
- 移除失效的 importTemplate 方法与 @download 监听，未改动公共组件 zs-import.vue

## 验证与交付
- ESLint 通过（exit 0），npm run build 成功（buildTime 2026/11/3 12:50:21）
- 构建产物确认 zs-import attrs 为 tmpl:!1、无 download 监听、旧 importTemplate 路径已移除
- nginx 8098 站点服务新构建（version.json buildTime 一致）
- 子模块 zhi2-web-admin 3cdcc58a7..51d173d26 推送 develop/v3.0.0；父仓库 4d7a9e3..85de1e7 推送 develop/v3.0.0
- 禅道回写 status=resolved/resolution=fixed/resolvedBuild=trunk/resolvedBy=tiany/assignedTo=zhunan，事务化 action 记录已提交

## 备注
- 主工作区子模块原处不完整检出（343 跟踪文件含 index.html/.eslintrc 缺失），开工时用 git checkout 恢复跟踪文件后才构建，仅保留本 bug 改动进入提交，未夹带 version.json、flowable、docs 等无关改动

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6074",
  "source_extraction_id": "d7cdcc76a2cc40dc8317a1270c45bc32",
  "version": 1,
  "memory_type": "entities"
}
-->