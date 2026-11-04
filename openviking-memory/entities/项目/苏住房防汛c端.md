# 苏住房防汛C端
uni-app Vue3 H5 防汛前端；主工作区 D:\repository\苏住房防汛C端；worktree D:\repository\苏住房防汛C端-wt-login-align（分支 fix/login-design-align，主区禁改）。

## 后端与服务
- 服务 zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610，60 防汛接口/7 控制器)；响应 JsonResult={code,msg,data}、PageResult={total,rows,code,msg,summary}
- 登录 POST /api-auth/v2.0/security/auth/login {username,password(AES-256 base64)} 头 zhi-project-id: suzhufang（Feign 也带）；token→localStorage flood-token-v1；账号 zsbase/Zs@2026Aa！ AES 密文 H03W0LoMA6EFQZIW46BnNA==（KEY=A-16-Byte-keyVal IV=A-16-Byte-String AES/CBC/PKCS5Padding）
- 巡查提交 SubmitInfoDto={id required,busCode?,deptId?,submitTittle?,procDefId?,variables?}；缺配置报错"提交流程失败，请检查审批流配置"
- 巡查保存前 bizState=FINISHED+阶段匹配，后 PENDING_SUBMIT；阶段 bizState=2 历史、汛中(3)/汛后(4) 填报、阶段 讯前/汛中/汛后；提交需每阶段+busCode 的 FINISHED 事件；权限 flood:inspection:add/submit，部门 property；搜索"小"如天地华城小区 code 667577485357516
- /v2.0/property/patrol/item/page total=0（多数据源疑 2026-11-03）；DM 库 ZHISHU_PROPERTY 与 SERVICE_EXPAND 各有不同 T_PATROL_ITEM

## 前端与状态
- .env VITE_DATA_MODE=remote 连真实后端（task-2 E2E 绿 2026-11-03）；VITE_LOGIN_USER/PWD 废弃、自动登录关
- 类型 FloodItem={templateItemId,label,fillType,fillOptions?,unit?,value,sortNo?}；FloodRecord={inspectionNo,complexName,checkDate,subject,bizState,items?,rescue?,values?}
- Store API：fetchTemplate(kind)->{kind,eventId,stage,items}、searchComplex(keyword)->{code,name}[]、submitInspection/submitRescue/saveDraft/loadDraft/fetchHistoryPage/countHistory/getRecord/getRecordAsync
- 渲染 fillType '1'/数值→非负数字输入，fillOptions→下拉，否则文本；value 字符串；draft 仅本地 uni 存储；雪花 19 位 ID 必须 String()（Number() 丢精度"预警不存在"）；store.submitInspectionRemote 2026-11-03 修 String(values.eventId)
- task-1 2026-11-03：inspection/detail/history/rescue index.vue + types/inspection.ts；onLoad 读 kind→fetchTemplate；detail 优先 record.items；commit d3c7440 修标签换行；history→detail 缺 kind 调 inspection API 的 bug

## 页面与对齐
- task-2 2026-11-03：tests/e2e/remote.spec.ts + playwright.config.ts，5 绿场景；2026-11-03 登录页 src/pages/login/index.vue；App.vue token→workbench 否则 login；store.logout()+"我的"tab
- 2026-11-04 新页 systems/index.vue（参考"苏州市服务监管平台"）、home/index.vue、housing/index.vue、data/index.vue；BottomNav.vue 5 tab；useMainNav.ts；App.vue→子系统选择；15 SVG/PNG；worktree commit 1a5b51e 快进 dev 未推
- 2026-11-04 顶部间距对齐：参考站 http://localhost:8443/（Figma Make React），本地 8095 nginx 指向 worktree dist；根因 .screen padding-top72px + .screen-content/.system-hero/.data-empty 各72px 重复计→空隙84px（ref 8~28px）、页头72px vs ref56px、标题19px/500 vs 18px/700；仅 theme.css 非登录段 .screen/.app-header/.app-back 72→56、.app-header bg rgba(247,249,253,.88)、标题18px/700、.workspace10→18、.screen-content→8px、.housing-content+28px、.system-hero/.data-empty→12px；空隙 home8/workbench18/housing28/systems12/data12 一致、单测20/20
- 2026-11-04 工作台对齐：删综合查询 category（侧栏仅项目检查/防台防汛2 tab，默认项目检查）；去副标题/计数角标；8 个 ref 图标替换（物业自查绿勾/街镇蓝建筑/区县紫盾/市级橙银行、汛前橙警告/汛中蓝日历/汛后紫刷新/历史青时钟，icon-well 底色 青=tone-2/蓝=default/靛=tone-1/黄=tone-3）；与 ref 逐像素一致、通知 Lead 放行 data-builder build；禁改 login/index.vue 与 theme.css 登录段
- 2026-11-04 我的页新建+数智页重做（设计稿 100% 还原）：src/pages/mine/index.vue 按 design-mine-mine.webp（蓝渐变卡/同心圆/陈乔乔+已认证/登录名300007/三行菜单含红点待处理/退出登录描边钮）；data/index.vue 按更细 design-data.webp 重做（6 区域 pill、3 彩卡含本地企业1,872·非本地120/混合、公共收益+报事报修环形图与图例、4 评价卡带项单位+三色条、7 排名行+完成率圆环）；useMainNav mine 改进我的页（退出逻辑移入页内）；e2e visual.spec.ts 扩 4 组全绿；改动未提交（交 Lead 决策）

## 部署与测试
- nginx D:\nginx\conf\conf.d\flood-c-h5.conf 8095 监听返回"苏住房防台防汛"，proxy /api-flood/→9610/、/api-auth/→9211/；与昆山8103 冲突迁 8095；root 原主区 dist，task-1 改 worktree dist
- package.json build/build:h5=`uni build --outDir ./dist`（扁平根）；build:mp-weixin dist-mp-weixin/ gitignore
- CI 2026-11-03：gitlab-runner 16.9.0 无 Bun；commit 04b0c7b scripts/install-deps.mjs（有 Bun bun install --frozen-lockfile，无 Bun npm install --legacy-peer-deps；tools/testing npm install --workspaces=false 隔离 vite@8+vitest@5）；test→npm --prefix tools/testing run test && uni build -m test --outDir ./dist
- 干净 CI 安装 exit0、测20/20、构建 dist/、Bun bun install 无变更；commit 2e42478 扁平构建；二次 CI 失败（04b0c7b..5115cb6 推 origin/dev）仅 npm run test 无 tar 报 Cannot stat，修测试注入 uni build 后 20 测、dist/index.html+43 产物
- Playwright/Chromium：C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe；脚本从 @playwright/test 导入；拦截 figma.com/font 避免截图等待字体超时；验证 typecheck0/单测20/20/visual e2e4/4/功能烟雾（个人中心→我的页→退出→登录）全绿

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "878f34c03ebb44f88f114b0ba61bb04c",
  "version": 24,
  "memory_type": "entities"
}
-->