# 江阴公共收益数据可视化全屏功能
江阴公共收益管理平台「数据可视化」页面（benefit/dataStatistics）新增右上角全屏切换按钮，参照惠山 dashboard 实现。

## 实现要点
- 根节点加 ref="fullscreenComponent" 与 :class="{'is-fullscreen': isFullscreen}"
- title-box 右上角新增 .full-screen-box，含全屏/退出全屏图标，点击切换
- 引入 screenfull 库，新增 isFullscreen 状态、mounted 监听 change、beforeDestroy 解绑、toggleFullScreen() 方法
- CSS：.title-box 加 position: relative，.full-screen-box 绝对定位右上角（right:20px top:10px）

## 参照与文件
- 参照页：zhi2-web-admin/src/views/property/dashboard/index.vue（惠山区物业管理可视化）
- 目标页：zhi2-web-admin/src/views/benefit/dataStatistics/index.vue（江阴公共收益-数据可视化）
- 仅改动上述一个文件

## 验证与构建
- pnpm run build 构建成功（exit 0，仅既有 circular-chunk 告警）
- 构建产物 index-8y04MFCq.css 含 .full-screen-box 与 .is-fullscreen 样式，JS 含 toggleFullScreen
- 本地 nginx 部署（江阴公共收益.conf，端口 8110，root→dist）访问 200
- 构建环境遇 pnpm 严格链接致 echarts/mathjs 传递依赖无法解析，用 --public-hoist-pattern=* + 扁平化链接解决（仅本地构建，未改仓库配置）

## 归属与提交
- 所属项目：江阴公共收益（zhi2-web-admin）
- 分支 develop/v2.6.1-jiangyin，合并提交 7c19d138e，推送 53b234815
- 禅道任务 1935，状态 wait→done

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "benefit_fullscreen",
  "source_extraction_id": "0c98693813404561bb4be6fdb2ef3d20",
  "version": 1,
  "memory_type": "entities"
}
-->