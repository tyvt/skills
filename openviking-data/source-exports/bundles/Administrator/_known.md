# 已知记忆清单（3901 条）

以下技术经验已经从同源项目提炼过，**不要重复产出**。
只有当本批会话给出不同根因、不同解法或更深细节时才产出新条目。

1. [泰兴] echarts 定制裁剪包缺 series.line 导致折线图静默空白
2. [泰兴] 小程序弹窗内 ZsUploader 不显示的根因：上传组件自身状态未随父组件清空
3. [泰兴] 员工端主题色约定：自定义组件读不到页面 CSS 变量，ZsButton primary 需内联 #1677ff
4. [泰兴] echarts 实例必须 markRaw，避免进入 Vue 响应式
5. [泰兴] 分类树带环对象写入响应式数据会导致 setData 崩溃并静默吞掉后续请求参数（知识库筛选不生效）
6. [泰兴] DsDialog 内嵌套 uni-popup 的 fixed 定位错乱 → 统一 ZsBottomPopup（root-portal 脱离层叠上下文）
7. [泰兴] ZsImage.buildStaticUrl 不判断 http(s) 前缀，把远程兜底图拼成 static/https://… 必然加载失败
8. [泰兴] 项目构建/验证约定：构建命令需关闭安全删除并用 PowerShell 后台落盘日志
9. [泰兴] 项目架构约定：业主端 / staff 手持端双端目录结构，工具函数改动要评估跨端复用面
10. [泰兴] 小程序端弹窗/控件颜色：硬编码色值 vs CSS 变量导致同一页面出现两种主色
11. [泰兴] uni-app 编译小程序会注入 addGlobalClass，App.vue 全局样式穿透进组件且组件 :deep 压不过
12. [泰兴] 底部弹窗不贴底/底部空隙：安全区 env() 的归属约定（外层零 padding，只有不透明内容盒承担安全区）
13. [泰兴] 用截图像素采样 + git 历史反推截图对应的代码版本，判定 bug 是否已修过
14. [泰兴] 小程序图标不要用 CSS mask-image，改用 ThemeIcon 组件 + SVG 字符串替换色值
15. [泰兴] 项目约定：泰兴小程序从「物业手持B端」同步改动的方式与适配清单
16. [泰兴] 小程序端写在自定义组件标签上的 class/style/CSS 变量不会透传到组件内部真实节点
17. [泰兴] 小程序组件颜色定制套路：用 props 下发颜色，组件内部在真实节点上绑内联 style
18. [泰兴] app.mixin(virtualHost) 在小程序端不生效，virtualHost 只能写在组件自身 options
19. [泰兴] WXSS 不支持 min()/max()/clamp()，整条声明被静默丢弃而不报错
20. [泰兴] 员工端与业主端同名业务接口不可互推，需对齐业主端实现
21. [泰兴] 弹层/弹窗内的页脚不要复用外层固定栏样式
22. [泰兴] 微信 <image> 的 mode 属性优先于 CSS object-fit，ZsImage 内写死 mode 会导致 hero 背景无法铺满
23. [泰兴] hero 背景图铺满套路：盒子宽高比 = 图片宽高比 + aspectFill + overflow 右对齐裁切
24. [泰兴] 项目约定：构建 mp-weixin 用 CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build:mp-weixin，并核对 dist 产物验证
25. [泰兴] 小程序弹层真机渲染必须用 root-portal 包裹（否则底层透出/内容缺失）
26. [泰兴] 小程序图片不显示的排查顺序：uploadFile 白名单独立于 request 白名单 / 真机拦截 http 图片
27. [泰兴] 真机 flex + scroll-view 高度计算偏差：用 flex:1 1 auto; min-height:0 + overflow:hidden 兜底
28. [泰兴] uni-popup 对插槽懒渲染：上传组件必须靠 v-if 强制重挂 + nextTick 后回填
29. [泰兴] 弹窗形态的步骤表单不应拆成独立页面（用户明确要求，且跨页回传会丢字段）
30. [泰兴] 沙箱内对项目仓库执行 git rm 曾导致 src/ 637 个文件从工作区消失 —— git 写操作与构建改用非沙箱执行
31. [泰兴] 小程序 placeholder 样式对齐：原生 input 的 placeholder-class 与 uni-easyinput 内部类不通，须统一控件类型
32. [泰兴] 页面跳转统一传 projectNo（不用 projectId），接口字段用多候选映射兜底
33. [泰兴] 接口数据字段结构不稳定：统一用归一化函数适配嵌套/扁平两种返回
34. [泰兴] 小程序点击事件统一用 <view @tap>，不要用 <text @click>
35. [泰兴] 表单图片上传校验要克制：不要拦截「有图但未取到持久化地址」
36. [泰兴] 手机号一律微信授权获取，禁止手动输入；且必须有格式校验兜底脏数据
37. [泰兴] 新建分包的页面开发约定：设计稿还原 + z-paging 分页 + store 内直接调接口
38. [泰兴] 图表文字改用原生叠加层渲染，避免 ECharts graphic 在小程序端不显示
39. [泰兴] ZsUploader 上传组件：临时路径不可写入 v-model，watchEffect 不可过度清空
40. [泰兴] echarts-uniapp 图表在小程序端要改用 type="2d" 同层渲染并串行化 init
41. [泰兴] 小程序日期格式化禁用 new Date('YYYY-M-D') 字符串解析
42. [泰兴] 搜索框自定义图标覆盖默认图标时必须做加载失败回退
43. [泰兴] SVG 图标跟随主题色的统一做法：currentColor + mask + 白色叠加层
44. [泰兴] uni-app 小程序弹层层级（z-index）必须写在 App.vue 全局样式里
45. [泰兴] uni build 前需绕过 safe-delete 批量删除阈值，否则构建失败
46. [泰兴] 员工端主题色统一：用 staff-page-theme mixin 注入 CSS 变量，禁止硬编码蓝色
47. [泰兴] 微信小程序 ECharts 图表穿屏与图例缺色的修复套路
48. [泰兴] 小程序页面背景色必须写在非 scoped 样式块的 page 选择器
49. [泰兴] ZsPicker 传参必须用 :dataList，不能用 :data-list
50. [泰兴] 后端树形节点 ID 字段不固定，取值需多字段兜底
51. [泰兴] 列表/统计场景：接口返回的 0 必须视为有效值，仅在字段缺失时兜底
52. [泰兴] 详情页跳转优先用 store 传参，不重复调接口
53. [泰兴] 自定义 tabBar 模式下 uni.switchTab 会静默失败，跳转 tab 页改用 uni.reLaunch
54. [泰兴] ZsPicker 空选项列表会崩溃（Cannot read properties of null (reading '0')），需在组件层做空数据保护
55. [泰兴] 共享组件在 src/components 与 src/staff/components 各有一份副本，改动必须两边同步
56. [泰兴] 验证流程约定：微信开发者工具点「编译」不生效，必须重新构建并核对 dist 产物
57. [泰兴] 泰兴小程序技术栈与分包目录约定
58. [泰兴] 手机号只在受信页面输入，业务页只用 store 回填
59. [泰兴] 弹窗表单/上传/滚动的通用布局约定
60. [泰兴] staff 带背景 tab 页顶部留白统一规则
61. [泰兴] 小程序 echarts canvas 图表排查路径（先查产物与运行时，再怀疑代码）
62. [泰兴] Vue3 setup 中 ref 被同名局部变量遮蔽导致接口静默失败
63. [泰兴] 提交后同时弹窗 + navigateBack 会让弹窗来不及显示
64. [泰兴] 静态图标资源目录约定与引用路径不一致会导致图片整块不显示
65. [泰兴] 项目存在 components 与 staff/components 两套同名组件，应按端引用对应版本
66. [泰兴] 微信小程序按钮自定义颜色需配合 CSS 变量、!important 与清除 ::after 伪边框
67. [泰兴] 小程序浮层内的确认按钮不要用原生 <button>
68. [泰兴] 请求拦截器会静默丢弃非约定字段，构造请求参数前需归一化
69. [泰兴] 弹层内状态草稿：下钻回根节点时不要清空已选
70. [泰兴] 自定义弹层需补齐 flex 纵向布局并让出页面固定底栏
71. [泰兴] 小程序静态资源一律走页面级 static 目录绝对路径
72. [泰兴] 设计稿中的装饰图片优先复用 tag.scss 伪元素实现
73. [泰兴] 表单页约定：单页全字段布局 + PageButton 固定提交 + ZsPicker hideArrow
74. [泰兴] 收款明细须展示账户抵扣行（账单-优惠-应付）
75. [泰兴] 小程序分包内不能靠 import 引 SVG 资源，本地图标必须放主包 src/static 并用 ZsImage
76. [泰兴] SCSS 中 :deep() 必须平铺书写，嵌套进父选择器会生成 chrome53 不支持的 CSS nesting 警告
77. [泰兴] 主题色改造走 staff 主题变量注入，不要在页面里直接写 background 覆盖组件
78. [泰兴] 本项目构建命令要用 npm.cmd，且必须设 NODE_OPTIONS 内存上限与 CODEBUDDY_SAFE_DELETE_ENABLED=0
79. [泰兴] 主包体积要以 dist/build 产物为准统计，dev 产物含未分包页面会导致误判超限
80. [泰兴] 主包超限的标准解法：把 ECharts 组件迁入 staff 分包并配置 componentPlaceholder 异步化
81. [泰兴] 小程序分包之间不能跨包引用静态资源，图片/图标会加载失败显示空白
82. [泰兴] 分包新增页面约定：pages.json 注册路径不带分包前缀，页面内跳转必须写完整分包路径
83. [泰兴] 状态字段用字典映射，不用硬编码中文（如所处阶段 MF_CURRENT_STATE）
84. [泰兴] 接口字段有对应值就不要在前端用列表长度二次计算，且 0 也要正常显示
85. [泰兴] 列表页新建流程约定：页面 + pages.json 注册 + 同目录 mock 接口模块三件套
86. [泰兴] 密码提交前必须 AES 加密：rawPassword cannot be null 的根因
87. [泰兴] 知识库接口参数约定：keyWord 大写 W、分类筛选用 categoryId
88. [泰兴] 项目无 API 文档，接口参数唯一权威来源是 api 层与调用点
89. [泰兴] 详情页字段要按业务顺序与新增页对齐，空字段显示 -
90. [泰兴] 空数据回退取数要选对接口：步骤为空不能回退调记录列表接口
91. [泰兴] 自定义 tabbar 页面顶部留白存在两套体系，新增页需显式选择
92. [泰兴] 维保/巡检记录接口约定：recordType=1 为维保，搜索走 appKeyWord
93. [泰兴] UnoCSS 类名不能含小数点，否则 WXSS 编译报 unexpected \
94. [泰兴] 小程序图片路径不存在会被解析到 __pageframe__ 并加载失败；静态图走 CDN 地址
95. [泰兴] 小程序页面底色/分区靠 page 级背景色 + pages.json 的 backgroundColor 双管齐下
96. [泰兴] 巡检记录新增采用两步流程：选程序后步骤内联展示，底部按钮不变
97. [泰兴] UI 页面必须严格 100% 还原设计稿：用户反复验收并要求按设计稿重建
98. [泰兴] 新建页面标准套路：页面目录 + pages.json 注册路由 + 模块 js 假接口 + 目录 static 图标
99. [泰兴] 设施设备页报修改为直达提交页，提交页需兼容 URL 直传设备参数
100. [泰兴] web-view 页面读 url 参数必须写在 onLoad，不能用 onShow
101. [泰兴] 字典字段（如频次）统一用 getDict + getDictLabel 转中文，需带兜底
102. [泰兴] 业主身份认证相关接口的项目字段名是 complexId，不是 project
103. [泰兴] 多步表单用独立编辑页 + setStorageSync 传参 + $emit 回传结果
104. [泰兴] project.config.json 的 AppID 必须与 manifest.json 保持一致
105. [泰兴] 小程序弹窗内滚动区一律用 scroll-view，不用 div + overflow-y:auto
106. [泰兴] ZsImage 内部样式会覆盖页面同名规则，需 !important 或复核组件默认尺寸
107. [泰兴] ZsPicker 统一用 :dataList（驼峰）传选项，并兼容 0 值与数字/字符串类型
108. [泰兴] 附件材料统一走 listAppendixPackage 接口，busCode 区分业务、busId 取业务主键字段
109. [泰兴] 是/否类字段统一用 sys_yes_no 字典，非 0 值用 #f30a0a 标红
110. [泰兴] 用户偏好：接口逻辑内聚到页面域 JS 文件，不要污染 src/api 目录
111. [泰兴] 可配置跳转模式：后台配置了 H5 链接走 webView，无链接走原生页
112. [泰兴] 列表页+详情页的标准复用套路：先找同目录最相近页面复刻，用 TMP_* 缓存列表项传给详情
113. [泰兴] 坑：接口字段命名不确定时要写多候选回退映射，联调需核对 keyWord/日期字段
114. [泰兴] UI 架构约定：详情页统一用 CardCell 组件族（CardCell / CellInline / CellFulline）+ PhoneCall 金色电话，双列区靠 cell-inline 与竖线分隔
115. [泰兴] 坑：ZsPopup 只管弹窗容器与传入内容布局，弹窗内容缺纵向 flex 会导致重叠、数字竖排、底部按钮错位
116. [泰兴] 项目结构约定：按业务域分包（src/staff、src/pages_xxx），收银台业务自成一包
117. [泰兴] 字典 remark 字段不可直接 JSON.parse，需安全解析
118. [泰兴] 小程序内图标不要走 ZsImage 的 /static/ 前缀，直接 import SVG 用 image 渲染
119. [泰兴] 项目采用业主端与员工端双分包目录结构（src/pages_* vs src/staff）
120. [泰兴] 巡检/维保/年检记录共用一套页面，靠 type 参数与 procedureType 区分
121. [泰兴] switchTab 路径必须与 pages.json tabBar 注册完全一致（员工端 tab 页带 /pages/staff/ 前缀）
122. [泰兴] 统计类页面初始时间区间默认取当月
123. [泰兴] 详情页统一用 CardCell 行式键值布局：空值显示 --、日期格式化、电话用 PhoneCall
124. [泰兴] ZsPicker 的 change 回调里别依赖 v-model 已同步，直接用事件参数 value
125. [泰兴] 页面空白且无明显报错 → 先查 script setup 是否运行时崩了（漏 import ref / 变量遮蔽 TDZ）
126. [泰兴] :deep 覆盖公共/第三方组件默认样式时权重会打平，必须上 !important 并注释原因
127. [泰兴] 后端相对资源路径（/zhi2/...）需按平台拼域名，ZsImage 要防止重复拼接
128. [泰兴] 子组件里不能用页面生命周期 onLoad，改用 onMounted；同路由跳转用 redirectTo 而非 navigateTo
129. [泰兴] 数值输入不要裸用 Number()：统一走正则解析函数，非法值拦截保存，展示侧对脏数据显示 -
130. [泰兴] 微信小程序分包之间不能互相引用组件，公共组件必须放主包 components 目录
131. [泰兴] 列表页分页统一使用 z-paging，不再使用 useLoadMore + uni-load-more
132. [泰兴] 普通链接二维码扫码参数在 options.q 中，需 decodeURIComponent + urlToObj 解析后再取值
133. [泰兴] 报错/日志排查先比对新旧代码：用户贴的日志往往来自修复前的旧版本
134. [泰兴] 从入口页拉取详情页所需参数，通过路由 query 传递给子页面
135. [泰兴] 跨页面复用交互逻辑时对齐已实现页面（查看表决），编号取值需带兜底
136. [泰兴] 列表/「查看全部」页结构约定：导航栏下方 sticky 搜索框 + 面包屑
137. [泰兴] 新页面开发流程：分包目录建页面 → pages.json 注册路由 → 数据层模拟接口（maintainProject.js）
138. [泰兴] 小程序 input 切换 type text/password 会清空输入，密码显隐应固定 type="text" + :password
139. [泰兴] 后台 remark 等字段可能是非法 JSON 或已是对象，JSON.parse 前必须做防御性解析
140. [泰兴] 维修模块页面统一模式：分包页面 + pages.json 注册 + xxx.js 内聚接口/mock 映射
141. [泰兴] 附件能力复用套路：busCode + 业务 id 调 getFiles，页面用 downloadFile + openDocument 打开
142. [泰兴] 用户要求：cherry-pick 到旧分支时只取参数改动，必须人工恢复必填校验
143. [泰兴] 员工端功能按 staff 分包 + components 前缀组件 + 两步表单流程组织
144. [泰兴] 业务逻辑统一收敛到页面目录内的本地 store，页面不直接调接口
145. [泰兴] 接口对接套路：store 内做后端字段→页面字段映射，并保留旧参数兼容
146. [泰兴] 维修资金金额字段按概算/决算后缀区分，用 scope 参数选字段
147. [泰兴] 字典字段统一走 dictLabel 转换，字典编码用常量提取
148. [泰兴] 列表页统一用 z-paging + store 列表字段双向绑定，mock 接口写在 store
149. [泰兴] 新增页面需在 pages.json 注册并同步修改入口页跳转地址
150. [泰兴] 步骤区展示条件：已选业务对象即展示，而非等点「下一步」
151. [泰兴] 小程序列表/卡片右箭头用 svg 图片而非字符「>」，复用同目录 static 资源
152. [泰兴] 标签样式复用 tag-parallelogram 约定：伪元素画倾斜底、文字不倾斜
153. [泰兴] 扫码进小程序：必须从 options.q 解析完整 URL，并兼容 id/decisionId 多种参数名
154. [泰兴] 条件编译导入的常量在其他端会 ReferenceError，须用 typeof 兜底
155. [泰兴] 页面业务数据走“页面目录下的聚合 js（接口+映射+store）”模式
156. [泰兴] 后端字段名/参数名变更在 api 层做适配，页面调用代码不动
157. [泰兴] 详情页路由参数以业务编号（applyNo/projectNo）为唯一入参
158. [泰兴] 文档配图偏好：优先 draw.io 可导入 XML，且指定一页竖版 A4
159. [泰兴] 维修项目模块采用「接口层内聚到模块 JS」的约定
160. [泰兴] 维修资金相关字段区分概算/预算/决算三套口径（G/Y/J 后缀）
161. [泰兴] 小程序打开后端附件：IMAGE_BASE 拼前缀 + downloadFile→openDocument
162. [泰兴] 后端字段定型后应删除前端兼容映射，只保留单一字段
163. [泰兴] 弹窗内 ZsUploader 不显示：flex 压缩 + 回填时机
164. [泰兴] 弹层组件使用 root-portal 后必须单独注入 staff 主题变量
165. [泰兴] 新增 pages_* 业务页面的固定交付流程：建页面 + pages.json 注册 + mock 接口 + 按设计图 100% 还原
166. [苏房] agentmemory 向量回填配置不生效：hydrateProcessEnvFromFile 只填「未设置」的变量，而 wrapper 先于它运行
167. [苏房] Web 管理端 e2e 约定：全量注入 test-id、单用例控制在 60s 内、必须把「阻塞」与「通过」分开报
168. [苏房] 删除接口约定：POST + 裸数组 body，不要包 { ids: [...] }
169. [苏房] 项目拓扑：苏州市房地产监测V3 是父仓库，zhi2-web-admin 是子模块，前端提交后要单独更新父仓指针
170. [苏房] 详情页字段全显示 `-`：路由缺 tableid 使 formMode 落成 add，detailMixins 只在 view 模式才 init，详情 GET 根本没发
171. [苏房] 不同主体的基本信息页不要共用同一组件：开发企业与经纪机构的差异字段（办公信息 vs 企业管理员）会反复互相踩
172. [苏房] 楼幢×楼层×单元网格：整表用**一个** CSS Grid 承载（列数取全表最大户数、楼层列固定宽），不要每个单元各自成格
173. [苏房] Web 后台详情的附件区：查看态必须切到只读要件组件，不能复用 AnnexUpload
174. [苏房] 要件区卡在「加载要件配置中」的根因是 busCode 没从路由解析出来
175. [苏房] 「左表单 + 右要件」两栏页：右栏被要件列表撑破的高度约束套路
176. [苏房] 楼盘表格子状态图标：默认只取 short 图例 2 个图标位，扩展状态走环境变量
177. [苏房] 登录后进不去待办页：先查动态路由是否注册，本地静态注册兜底 + defaultLanding 定落地页
178. [苏房] 要件附件按名称从企业/项目来源自动带出：prefillSources + 严格同名 + 别名表的完整设计
179. [苏房] 注册入网与基本信息页的附件配置编码必须统一，否则审批后附件「传了看不到」
180. [苏房] Playwright 跑注册入网全链路的联调约定：跳过发短信、审批接口要匹配两条路径、录制录屏
181. [苏房] BusCode 集中常量 + resolver 取值，禁止页面写字面量（机构注册/入网链路）
182. [苏房] 给历史数据常为空/「无」的下拉字段新增必填校验：进入表单时归一化，而不是提交时放宽
183. [苏房] 接口回填会绕过表单 maxlength：长度上限必须同时喂给输入组件、校验规则和回填函数
184. [苏房] e2e 有既有红用例时：git stash 到 HEAD 复跑逐条比对，别顺手去改旧用例
185. [苏房] 共享校验规则工厂用 options 扩出「非必填」，别复制一份规则；非必填后仍要保留跨字段校验
186. [苏房] 弹窗宽度收敛为两档并内聚进 zs-dialog：form-layout="single|double" 约定
187. [苏房] Element Plus 双列规则命不中的两类结构：span24 全声明 与 裸 el-col
188. [苏房] 详情页 Tab 内的全局样式污染 Headline：collapse-content 的 padding-top:0 让要件区贴边
189. [苏房] 详情页跳其他业务页必须走公共跳转封装，直接改跳转会导致无侧栏、菜单不高亮、不调接口
190. [苏房] 后端雪花 ID 精度丢失：19 位变更单 ID 传到前端变成 …390000
191. [苏房] zs-table 列宽算法：取表头与内容的最大宽度，剩余空间均分给非序号列
192. [苏房] 宽表被误判为「幽灵滚动」而 overflow-x:hidden，导致右侧列被裁切且不能横滚
193. [苏房] 「挪区块」需求按最小改动执行：只动点名的面板，要件区抽公共组件复用
194. [苏房] Vite 报「Install @vitejs/plugin-vue to handle .vue files」多半不是缺插件，而是该 .vue 标签闭合错乱
195. [苏房] PC 后台响应式断点：同权重 @media 必须写在基础规则之后，否则宽度被压窄、高度不变，出现畸形比例
196. [苏房] 用户偏好：排查/改造阶段不要启动 dev server，只改代码 + ESLint 静态检查；核对端口要覆盖自增后的成对端口
197. [苏房] Tab 子表工具栏统一：SubTableToolbar 通过 inject('zsTabsToolbar') 注册到标题栏，弹窗内自动 fallback
198. [苏房] 详情页返回按钮用「截断路径回列表页」而非 go(-1)；「没有授权相关菜单」报错根因在 utils/ruoyi.js 菜单查找层
199. [苏房] 苏州房地产监测 V3 工程结构事实：源码在 zhi2-web-admin 子目录（npm workspace），技术栈是 Vue2 + 自研 zs-* 组件而非 Element Plus
200. [苏房] 苏州V3审批流页面拆分约定：按节点目录 + nodeType/currentNode 一节点一页
201. [苏房] 详情页间距不要双来源：父容器 flex/grid gap 与共享组件自带 margin 叠加会翻倍
202. [苏房] 从 vue-cli 老仓库（建湖G）迁模块到 Vite V3：遗留组件/指令必须换成 V3 公共件并 build 验证
203. [苏房] 详情弹窗字段列数约定：字段数 < 8 用单列、≥ 8 用两列，严禁在页面写死列配置
204. [苏房] 踩坑：用正则批量给 Vue 文件补字段会误伤 props/watch 里的同名 key，造成 `visible: {,` 与缺逗号，构建直接失败
205. [苏房] Element Plus el-tooltip 的提示内容挂在 body 下，样式必须写在非 scoped 块，scoped 一定不生效
206. [苏房] 一对多单据的 batchSave 返回 boolean 无主键 → 保存后必须回来源列表，不能跳详情；分组靠 projectLimitId 外键
207. [苏房] 用户硬性约束：新模块必须复用公共组件/mixins 与既有字典，自绘楼盘表或自写选房弹窗会被直接打回
208. [苏房] 本后台的 e2e 套路：真实接口流 + fixtures 登录助手 + 断言图片 naturalWidth，而不是 mock
209. [苏房] Web 端详情/编辑页三列布局规范与 DetailTemplate 反模式（含批量修复脚本）
210. [苏房] 同一业务 B 端/G 端不要拆两套页面，合并成一个菜单按 terminalType 在页面内分流
211. [苏房] 删除全局项目上下文（store state/getter）必须全量排查引用，否则降级为静默 undefined
212. [苏房] 弹窗表格列宽撑满失效：scale 动画中 getBoundingClientRect 量到变换后尺寸，且 ResizeObserver 不感知 transform
213. [苏房] ResizeObserver 在 el-table :key 整表重建 + Vue2 先建后销顺序下会孤立，列注册表需 owner 令牌
214. [苏房] 选择类弹窗统一 zs-select-dialog：先圈定旧 SelectDialog 消费方，再脚本批量迁移
215. [苏房] Vue2 模块 export { ... } 再导出漏 import：路由页进不去，报错只提符号未定义
216. [苏房] zhi2-web-admin 列表页约定：listMixins + ListTemplate 生成式架构（PC 端，与泰兴小程序不同栈）
217. [苏房] 详情页 detailMixins 提交链路与两个必改钩子：/save 后缀 + getDetailParams 返回裸 id
218. [苏房] 前端模块批量重命名的边界：前端标识可改，后端契约串一字不能动
219. [苏房] 详情页子表工具栏统一放 Headline 的 #right 插槽（PC 端 UI 架构约定 + 批量改造脚本套路）
220. [苏房] 列表翻到末页表格下方大片留白：必须在 zs-table 组件层收敛，逐页改样式无效
221. [苏房] 验证方式偏好的演进：默认只做静态检查，但布局类需求被反复打回后用户要求自己跑 e2e（含账号冻结坑）
222. [苏房] 附件 busCode 按业务入口分工：租赁开业/G端审核 030310，B端入网注册 030300，经纪机构 030100，禁止全局替换
223. [苏房] 详情页表单「padding 重叠/左右留白过大/标签居中/页面卡死」的根因与共享样式层治理（label-top + align-items:center + 折叠区 padding 叠加）
224. [苏房] Web 后台审批流 E2E 稳定写法：要件宫格上传 + 用 refresh + 接口断言「在途审核」
225. [苏房] Element Plus 表单行「输入框+右侧按钮」禁用 append 插槽（宽度溢出），统一 input-with-actions 结构
226. [苏房] 用户偏好：新增合同版本文档页要「参考旧页但全部新写」，不复用旧组件
227. [苏房] 全站菜单遍历审计：字段空值 / 字典未转译 / 日期时间类型不符的批量扫描口径
228. [苏房] Web 后台新增页草稿跨路由丢失：用独立 sessionStorage 草稿 key 让列表回显未保存行
229. [苏房] E2E 依赖真实后端的用例用 test.skip 标注联调原因，不判失败（并同步补必填校验）
230. [苏房] 周报整理：多 AI 工具会话 + 禅道 MCP 汇总，子模块只写实际改动不写指针更新
231. [苏房] Web 后台列表列渲染约定：业务状态列走公共 ListTemplate + 字典列配置，禁止自造列组件/自定义插槽，也不许在列表组件里改写 tableData
232. [苏房] Vue 渲染期「Property or method "xxx" is not defined」的根因：选项放错位置（该 computed 的写成了方法/该 methods 的写错位置）+ 模板调用方式与实际定义不一致
233. [苏房] 从业人员菜单按业务阶段拆成「申请 / 备案」两条路由，用路由 meta.filePath 从全量路由反查 busCode，并据此控制主管端增删权限
234. [苏房] 列表点「新增/详情」整页刷新：详情页 chunk 加载失败 + importWithChunkRetry 主动 reload 的组合根因
235. [苏房] 列表→详情跳转要按 meta.filePath 反查路由，不能拼 this.$route.path + '/add'
236. [苏房] 裸用的 debounce() 在 Vite ESM 下会 ReferenceError：用 define 映射到 window.debounce 一次覆盖全项目
237. [苏房] CRUD 接口统一规范：详情一律 POST .../detail 且主键放 body，不走 REST 路径参数
238. [苏房] AnnexUpload 的 requirementGrid 宫格模式是多点联动的开关，只传一个 prop 会残留「选择」按钮和批量操作条
239. [苏房] AmountInput 只透传 $attrs 不传 placeholder 就不显示，用检查脚本全局兜住
240. [苏房] 主子表合并保存接口不能按「子表是否为空」回退到单表新增接口
241. [苏房] 附件要单独成块时，能力下沉到通用上传组件 + 全局样式类，不写页面专用包装组件
242. [苏房] 苏州后台新功能开发约定：目录按业务域、逻辑优先 mixins、API 写在页面内、E2E 走真实接口
243. [苏房] 含 git submodule 的前后端仓库：提交必须「子模块先行、父仓库只更新指针」，并显式排除本地环境文件
244. [苏房] 真实接口 E2E：在途单占用行的排除要在 fixture 里做（查业务列表求交集），无可用数据时 skip 而不是硬跑
245. [苏房] 合同计价方式弹窗的 houseId 是「page 列表行 → detail 详情」两段式，页面行对象未就绪即读 row.houseId 会报 undefined
246. [苏房] Vue2 变更详情页角标不刷新：mixin 写入的 beforeForm 必须在 data() 里显式声明
247. [苏房] 弹窗不要复用路由详情页 detail.vue：formMode 串味导致新增变查看 → 拆独立 Panel + 轻量 mixin
248. [苏房] 变更类页面双 ID URL 约定：路径末段 = 变更单 ID，query?id = 备案 ID；changeActive 不能只看「有两个 ID」
249. [苏房] 业务状态统一走全局 biz_state，但只替换「本地静态数组」，BIZ_STATE 常量保持原样
250. [苏房] UI 还原度验收套路：写临时 Playwright 脚本按多分辨率自截图再逐条比对设计稿
251. [苏房] PC 后台列表选择弹窗统一收口到 SelectDialog.open 函数式调用
252. [苏房] 新增机构类型（租赁机构）：路由做完但登录页弹窗没加入口 = 界面「没有入口」
253. [苏房] 把内嵌操作按钮上移到容器插槽：Headline #right + hideViewToggle 反向兼容
254. [苏房] v-dialogDrag 指令给 .el-dialog 写 inset:0，把弹窗撑满整屏（高度怎么改 CSS 都不生效的根因）
255. [苏房] 全站级 UI 约定要落成可执行的 lint 门禁脚本，而不是逐文件手工搜索
256. [苏房] 字典码与接口枚举「数值相同、含义不同」时必须建显式映射层，不能拿接口值直接查字典
257. [苏房] 迁移代码的表格操作列必须换成项目公共 zs-operate-column：权限码、主键、删除回调三处最易错
258. [苏房] 函数式弹窗（xxx-func.vue / Xxx.open）必须与组件版共用同一套 DOM 与样式，否则「还是和其他弹窗不一样」
259. [苏房] 注册/匿名环节上传附件不要传 busId，由后端在保存后转挂；对应 E2E 校验基准要改成提交的 attachmentList
260. [苏房] E2E 用例禁止用 API 调用 / page.evaluate 直接改 Vue 实例绕过 UI，必须走纯 UI 流程
261. [苏房] 苏州房地产监测V3 是纯前端仓库：查后端实现只能从前端 API 层反推契约
262. [苏房] V3 接口规范：详情接口统一改 POST /module/resource/detail，主键放 body
263. [苏房] Element el-dialog 弹窗过窄的全局解法：禁止写死 width，inheritAttrs:false + 剥离 width + CSS 变量统一宽度
264. [苏房] Tab 统一用公共组件 zs-tabs，但登录页必须保留原 el-tabs（用户明确偏好）
265. [苏房] 要件上传必须复用「机构基本信息」那一套组件，不要另造简化版
266. [苏房] 附件包按业务开关动态组合并去重；新增场景不传 busId，改走 attachmentList 随表单提交
267. [苏房] 纯展示改版不要新增接口；卡片/网格只读展示的空值不显示占位符「-」
268. [苏房] Web 后台卡死/内存增长的排查路径：ECharts 实例未 dispose 是主因，且不要信文件级正则计数
269. [苏房] 被全局 mixin 与数百文件共用的工具函数（getId）加缓存前，必须先做等价性用例并评估行为变化
270. [苏房] 表格金额/面积列：右对齐+千分位走 prop + :formatter，禁止为纯格式化套插槽
271. [苏房] Web 后台分页接口统一 /page：白名单驱动批量替换脚本，以及误伤「弹窗内分页」导致 400 的坑
272. [苏房] Web 后台详情页顶栏与边距规范：detail-container → operation-btn-group → detail-from-container
273. [苏房] Web 后台单位规范：单位一律写在值侧，label 只写字段名（amount-input unit / DetailTemplate type:'amount'）
274. [苏房] 函数式选择弹窗 zs-select-dialog「点确定没反应」的根因：resolve/reject 竞态，需 settled 锁只结算一次
275. [苏房] 银行网点（联行号）查询接口全局收敛到 /system/unionBank/page 的迁移套路
276. [苏房] 全局 ElCol 断点补丁会让 :span="24" 失效（整行字段被半宽规则覆盖）
277. [苏房] Element Plus 后台 E2E：按钮不在预期容器、弹窗选项点不动、等待策略的定位套路
278. [苏房] 详情页业务状态头部区统一用 HeadTitle 组件（含全局排查容易漏的公共详情组件）
279. [苏房] 从其他仓库整块迁移菜单到 V3.0 规范的前端落地清单
280. [苏房] 脱敏开关走 Desensitize-Flag 请求头：列表默认 '1'、详情默认 '0'
281. [苏房] 「变更」改「编辑」类改造：UI 可先落地，保存被后端状态机拦住时用 test.skip 记录而非改断言
282. [苏房] Web 后台「栅格列数不生效」根因：Headline 组件的 .el-row flex 覆盖 + 详情态判定
283. [苏房] 全局 ElCol 的 lg/xl 默认 8 会把「一行两列」渲染成三列，验证必须做 UI 布局断言
284. [苏房] PC 后台选择弹窗统一迁移为函数式 SelectDialog.open（helper + @focus 套路）
285. [苏房] zs-* 封装组件与 el 原生标签闭合混用会让 Vue2 模板编译直接失败（tag has no matching end tag），需全局扫描防复发
286. [苏房] 注册页等新模块拉附件配置统一用 listAppendixPackage（busId 可省略），不要再用 appendixConfig/page + detail 两段式接口
287. [苏房] 配置化搜索表单（zs-search-form）新增 type 必须补渲染分支，否则静默退化成占满宽度的空输入框
288. [苏房] zs-select-dialog 内置 @opened 吞掉父级监听：改合并 listeners + beginDialogAsyncLoad 解决打开拉数乱序
289. [苏房] 企信通 qxtEntInfo 企业信息提取：双注册模块共享映射 + noMessage/noReject + businessTermEnd 为 null/undefined 即「长期」
290. [苏房] Web 后台选择弹窗收敛为函数式 open helper（SelectDialog.open / mountSelectDialogComponent），替代模板内嵌弹窗组件
291. [苏房] 企业详情「资质信息 / 要件信息」为空的三类根因：附件缺 companyId、详情嵌套归一化缺失、资质列表无数据需回退变更接口
292. [苏房] Web 管理后台列表/详情页复用范式：共享内核 + 双入口（同一业务两套机构/角色入口）
293. [苏房] 附件面板「业务编码为空」的两个根因：详情子路由 meta.busCode 缺失 + detail 监听在编码就绪前抢跑
294. [苏房] 后端下发菜单 path 丢斜杠拼成 `xxx:/tableid`，新增页报「页面未授权或不存在」
295. [苏房] Web 管理后台：附件与审批流程共用路由 meta.busCode，禁止前端硬编码两套业务常量
296. [苏房] 详情页顶部状态统一用单块 HeadTitle 的 headTitleList 扩展，不要再加一条自定义状态栏
297. [苏房] 后端 Long 型 id 在 JSON 数字里会精度丢失：前端关联 id 一律按字符串传
298. [苏房] E2E 录屏验收附件类断言：先滚动到附件区并显式停顿，否则视频里看不到证据
299. [苏房] 叙事式填空布局改造：窄幅内联输入框必须关 clearable 且行高不得低于控件高度
300. [苏房] Web 端要件附件上传组件封装：listAppendixPackage + picture-card + loadSeq 并发防护
301. [苏房] 后端文件路径正确但前端加载报错 → 先 curl 验 Content-Type，多为网关未反代文件桶（返回 200 text/html 的 SPA）
302. [苏房] 附件扩展名不能用后端 fileType（字典码）推断，否则 PDF 被当图片走 el-image 预览而报错
303. [苏房] 行政区划展示统一到区级：改 formatter 而非逐页改，保留三级路径 formatter 并兼容历史拼接串
304. [苏房] 营业期限结束日期可为 null（长期）时不要用 daterange：拆成开始/结束两个独立日期选择器 + 共享组件
305. [苏房] 路由/菜单占位符 tabUuid 被当成业务主键发到接口 → 统一 isUsableCompanyRecordId 过滤并在 api 层二次校验
306. [苏房] Element Plus 全局表单项满宽规则：只给块级控件 100%，span 组合字段用 flex+wrap
307. [苏房] 用户偏好：公共组件改造要「全局处理」，禁止别名注册，直接替换成现有公共组件
308. [苏房] E2E 用例报「路由里找不到页面」多半是测试账号菜单未授权，不是回归失败
309. [苏房] Playwright getByText 模糊命中多元素触发 strict mode 报错：用容器 scope + 精确类名定位
310. [苏房] Web 后台详情页头部与子表操作列约定：HeadTitle + 按钮进 zs-tabs 插槽，操作列按状态定宽
311. [苏房] Web 后台「页内变更/编辑模式」必须把路由当唯一状态源：模式标志放 data() 不放 created()，否则组件重建后被 immediate watcher 抢先执行
312. [苏房] Web 详情页只读附件/资质区块：listAppendixPackage 参数必须与上传组件对齐，且要 watch 业务 id 异步回填后重拉
313. [苏房] 企业/项目附件没有独立接口：全部复用 listAppendixPackage「要件包」，靠 busCode + 多维过滤区分
314. [苏房] 后台详情页「基本信息」与 zs-tabs 之间出现巨大空白：.detail-from-container 的 flex:1 撑满剩余高度
315. [苏房] 要件面板同时合并多个 busCode 会导致业务编码错乱 + 接口被重复调用（切换开关时调用次数翻倍）
316. [苏房] Web 后台「按钮不显示」先查数据状态条件，不要先怀疑权限
317. [苏房] el-form 套进三列 grid 的 section-form 内，会把表单压成 1/3 宽
318. [苏房] 嵌套 el-form 让 el-form-item 注册到内层，validate() 静默失效且必填从不生效
319. [苏房] V3 接口规范：只有 CRUD 接口是四段路径，业务接口一律三段
320. [苏房] V3 删除接口的请求体是裸 ID 数组，不要包成 { xxxIds: [] }
321. [苏房] 动态菜单 path 少一个斜杠被规整成同路径，vue-router 先注册者抢占导致详情页打开错误组件
322. [苏房] Web 后台详情页要件统一走 AppendixPackageSection + requirement-grid，表底总条数统一用 zs-pagination 关闭分页器
323. [苏房] Web 后台新增业务模块的 Playwright 真实接口流程 E2E 组织套路（spec + 菜单 fixture + 独立账号缓存）
324. [苏房] zhi2-web-admin 列表页导入/导出按钮统一走 table mixin 的按钮描述对象
325. [苏房] zs-table 窄屏列宽仍被省略：内容最宽 + 表体横向滚动替代 ellipsis（裁剪检测不能依赖 scrollWidth）
326. [苏房] 机密白名单路径（/file/appendix/）下的 $get 会发真实 GET：后端只支持 POST 时返回 405
327. [苏房] Web 端表单弹窗宽度契约：form-layout single=500px 单列 / double=1000px 双列，禁手写 width + 门禁脚本
328. [苏房] 跳转页 projectId 多来源互相覆盖：路由 query / sessionStorage / 详情接口三选一必须「路由优先」+ nextTick 再同步
329. [苏房] 附件 busCode 不能靠路由 meta/菜单 filePath 推断：按机构类型常量表映射，并删掉会把变更编码强行纠正回备案编码的 normalize
330. [苏房] 同一入网接口按主体拆分 API 封装：经纪/租赁机构 save 必须剥离 qualificationList
331. [苏房] Web 后台详情页「表单变单列」的根因在公共 detail-template，必须全局修而非逐页改
332. [苏房] Web 后台子表统一为「弹窗式增删改查」，独立接口的子表不要塞进主表单保存
333. [苏房] 只读详情页的区块要与申请页对齐：复用 build*ContentInfo 构造器，并配 dev 路由 + E2E 地址清空
334. [苏房] vite build 报 esbuild `write EOF` 是子进程被中断/资源不足，不是代码语法错误
335. [苏房] zs-table 的 table-tr 是「固定行数」契约，列表页乱传会导致显示不全/右侧留白；树表必须在异步 resolve 后 doLayout
336. [苏房] el-tree 懒加载树做关键字搜索：filter-node-method 只能过滤已加载节点，需 treeRefreshKey 重挂让根节点按 keyWord 重拉
337. [苏房] zs-select-dialog 两类语义要分清：选数据必须「单选列 + 取消/确定 + @setData」，只查看的房屋清单才关掉勾选与确定
338. [苏房] 接口传参改造的边界：只改 utils 里请求体形态、不动接口路径；批量校验类接口传 ID 数组而非逗号串
339. [苏房] 企业信息「变更」留在当前菜单页内编辑：白名单 + query formMode + 壳页面 Provider，菜单必须挂壳页面路径
340. [苏房] 同一业务的「注册页」与「后台管理页」必须共用一份字段配置 js，否则两边字段漂移
341. [苏房] 保存请求体分层：品牌/附件是主表字段，不要塞进 projectExtend；各证件子表字段名不统一不能按规律推断
342. [苏房] Web 后台列表操作列统一用 zs-operate-column 替代 el-popover 内嵌按钮
343. [苏房] 多步注册改造成「一步注册」：以开发企业单页实现为模板复用
344. [苏房] Web 后台菜单 filePath 必须与 views 目录一一对应，不要多加中间层级
345. [苏房] el-table 接口有数据但表格空白：row-key 为空值或重复导致 tbody 不渲染
346. [苏房] 字典异步加载后重渲染崩溃：Cannot read properties of undefined (reading 'length')
347. [苏房] Web 管理后台详情页布局三件套：zs-tabs(line) + 带边框 zs-search-form + list-card 包表格
348. [苏房] zs-table 的 loading 只遮表体、表头常显（含旧 v-loading 写法的兼容层）
349. [苏房] Web 后台列表/子表工具栏统一 div.operation-button-container，禁用 el-row.action-container + el-col
350. [苏房] 审核详情页的业务列表优先取详情接口内嵌数组，分页接口只作兜底
351. [苏房] 注册流程 Stepper 图标是脚本生成的位图资产：改样式必须改生成脚本重跑并同步视觉快照
352. [苏房] Web 后台表单 label-position 必须由 zs-form 统一读取 platformConfig.formLayout，页面禁止硬编码
353. [苏房] B 端备案/变更单能否编辑只看 bizState，不要掺 approvalState / displayStatus
354. [苏房] 子表「新增/删除」按钮不出现：旧只读组件 + Vite 热更新仍加载旧模块，改名强制重载
355. [苏房] 房屋限制主子表一体保存对接：单 DTO 提交 + 子表行回填父表冗余字段 + mixin/常量/e2e 三件套
356. [苏房] Web 端查询条与「搜索/重置」对不齐的三个叠加根因（zs-search-form 单行 + Headline + el-row 栅格）
357. [苏房] Web 详情页信息块分区约定：统一走 presale-detail-section-stack，禁止双层卡片与局部 margin 补偿
358. [苏房] 企业端详情页业务主键不能用 getId() 从路由解析：按 query→params→store→本企业接口逐级兜底
359. [苏房] 只读详情模板不显示必填星号：改公共 DetailTemplate 一处生效，但要清理业务侧冗余配置且不动 el-form rules
360. [苏房] el-tabs 多版本页签用业务字段拼 key 会撞车导致同时激活，name 必须用行下标
361. [苏房] Web 选证/查证弹窗统一改函数式 zs-select-dialog-func + *Constants.js 配置工厂，删掉页面私有 Dialog 组件
362. [苏房] 页面私有审批流弹窗应迁到公共审批流：OperationBtnGroup + ZsSubmit + zs-approval，业务靠 busCode 区分
363. [苏房] Web 业务详情页顶栏统一用 HeadTitle 组件（申请编号/业务状态 tag/创建时间），并删掉 DetailTemplate 内重复字段
364. [苏房] Web 管理后台新增业务模块：mixins 驱动 CRUD，目录名=接口路径，不写 api 文件
365. [苏房] Vuex 模块未开启 namespaced 时 mapState('user', [...]) 静默返回 undefined，条件接口不请求
366. [苏房] Web 后台要件上传在「新增态」不显示：根因是 busId 为空，需新增态专用组件只传 busCode
367. [苏房] Web 后台组件全局自动注册：用父文件夹名当标签名，新增组件必须目录名=标签名
368. [苏房] Web 后台新模块的 E2E 验证约定：fixtures 菜单注入 + *-real-api-flow.spec.js + 独立 npm script
369. [苏房] Web 后台详情页统一骨架：detail-container → detail-from-container → zs-form → Headline/DetailTemplate（且全局无间距变量）
370. [苏房] 后台路由 component 字符串与 views 目录精确匹配：目录名不一致即页面加载失败，跳转用的 getRouterPathByFilePath 必须同步
371. [苏房] 后台提交接口的业务编码(busCode)必须取路由 meta，并把它与表单逻辑一并收进 constants + mixin 复用
372. [苏房] 把「选填→必填」改造收敛成规则工厂 + strict 开关，并保证保存 payload 始终带数组字段
373. [苏房] Vue2 中直接调用 this.$options.data() 未绑定实例，导致 mixin/data 里 this.xxx 全是 undefined
374. [苏房] 同一内核页被多机构/多上下文复用：busCode 按「菜单 meta 优先 + 机构类型回退」查表解析
375. [苏房] 审批按钮权限与提交 key 必须从 flowable 动态取，不能拿后端展示用的 currentNode 硬编码
376. [苏房] 新增独立业务模块的交付物清单：供运维录入的菜单路由 JSON + 双端只读差异 + 权限串
377. [苏房] 股东/成员类明细表的一致性校验：保存前全量拉取再算比例与法人唯一
378. [苏房] zs-table-column 自定义列插槽是 { scope } 而非 { row }：接口有数据但表格整块空白/渲染报错
379. [苏房] 按 organType 隐藏字段必须四处同步：配置 js / 编辑表单 / 只读详情 / 必填校验（含跳过专属字典接口）
380. [苏房] 楼盘格网一个组件双模复用：mode="select|view"，替换旧表格时保留 data-testid 让 E2E 不回归
381. [苏房] 要件（附件）按业务条件动态必填：上下文对象 + 自定义提交前校验，绕过配置里的 IS_REQUIRED
382. [苏房] 跨角色全流程 E2E：企业端提交 → 主管部门审批，同一条 video.webm 录屏的写法与前置条件
383. [苏房] 详情页附件「暂无附件」：busCode 在附件与审批流之间分叉 + busId 必须沿用上传时挂载的 id
384. [苏房] DetailTemplate 一行两列但两列不等分：根因是同一行字段 span 不同，必须组件层强制 flex:1 1 0 + 归一 span
385. [苏房] 「子表统一弹窗式 CRUD」的例外：业务上限只有一条时用内联表单承载，提交仍保持数组形态
386. [苏房] 详情页 Headline/Collapse 分块间距消失：`.xxx.el-row` 复合选择器归零 gap 压过间距 token
387. [苏房] 机构基本信息变更：核心字段判定单一来源，决定「留变更页提交审核」还是「保存即生效」
388. [苏房] zs-select-dialog 无搜索栏时表格只占左半边、下方大片留白
389. [苏房] 对接文档驱动的改造：先做「文档能力→现有文件」盘点表，缺口通常只有四类
390. [苏房] 按主体拆分接口（companyAdd/companyUpdate/companyDelete）：共用组件换接口注入 + 明确未改动消费方
391. [苏房] 详情页显示字典原始码值：先直查字典接口验证 key 是否存在，前端不加本地映射兜底
392. [苏房] E2E 标准化交付物四件套：规则文件 + fixtures(env-loader/helpers) + 录屏合并脚本 + npm 一键脚本
393. [苏房] zs-operate-column 权限拼出 undefined：permission 是布尔开关，permissionType 才是后缀
394. [苏房] 函数式挂载弹窗点不开：propsData 传 visible 被 Vue2 丢弃（老弹窗未声明该 prop）
395. [苏房] 详情附件按类型显示缩略图：图片取原图、PDF 用固定占位图，判断收口到 utils
396. [苏房] 选择类只读输入框统一用 zs-input（suffix-icon + readonly + @focus），且要全模块收敛
397. [苏房] 同一弹窗查看态与编辑态分离高度策略：查看随内容、编辑定高内部滚动
398. [苏房] V3 列表接口必须从 data.records 取，沿用 res.rows 会静默空表
399. [苏房] V3 行政区划：/system/area/list 已废弃，改用 /system/region/listTree + common store 的 areas
400. [苏房] 列表「数据状态」只看 bizState 会漏「已注销」：注销态由 cancelStatus 承载
401. [苏房] 全流程 E2E 被外部服务卡住时，抽独立布局专项 spec 验证改动
402. [苏房] 详情页整页不能滚动的根因：内容没包进 .detail-from-container（滚动职责分层）
403. [苏房] 同一详情页出现两遍同一套要件：未传 bus 的 AnnexUpload 默认继承路由 busCode
404. [苏房] busCode 去硬编码：用 getRouteMetaValue 沿 matched 父级继承 menu meta，并同步改 E2E
405. [苏房] 用户报「这里有竖线」先判定元素归属：表格内的分隔线不要改页面级样式
406. [苏房] [苏房] 企业备案附件批量迁移前先摸清 wrapper 壳页与共享核心组件：11 个 organType 页共用一份 detail.vue
407. [苏房] [苏房] 「要件已上传:1 但保存仍报未完善」双根因：共享附件未绑本次申请分组 + 校验读错组件实例
408. [苏房] [苏房] 审批必须带附件等额外字段时：保留 zs-approval 流程能力 + customDialog 挂自定义审批弹窗，禁用通用按钮
409. [苏房] zs-table 二级表头按单行算高度，导致少显示一行：传 header-count 并关掉多余合计行
410. [苏房] 两级选择弹窗串联（选房 → 选限制记录）的三处接线点：上下文透传、回写父行、子表刷新
411. [苏房] 楼盘表选房的可选性只按 saleStatus=03 判定，不要叠加 hasLimit
412. [苏房] 单 Tab 不要用 zs-tabs：全局替换为 Headline 组件（含 cardValue 被别处复用的坑）
413. [苏房] zs-dialog 弹窗内做两列表单：必须自己包 el-row + el-col span12，标签宽走 scoped CSS 而非 label-width
414. [苏房] 全局清理表格列硬编码宽度（只留序号列）：脚本边界与两类漏网写法
415. [苏房] 「变更」类业务拆单架构：备案表原样保留，另立变更单表 + isChange 模式复用同一 detail.vue
416. [苏房] 销售合同删除接口 V3 全局对齐：先 grep 页面级 deleteType/deleteParamKey 覆盖，再收口 API 层 [].concat(id)
417. [苏房] Vue2 报 Invalid value for option "computed": expected an Object, but got Function —— 根级把 computed()/watch() 写成方法简写，且 warn 指向的是使用方而非元凶
418. [苏房] 状态标签配色必须「先判异常再判正常」：单条白名单只认「有效/正常」会把字典里的「已备案」漏成灰色
419. [苏房] 「经纪机构」在 V3 里是三条独立业务线且命名互相撞车：按「端 + 目录前缀 + busCode」定位，cyjg 是只剩 api 的死路由
420. [苏房] [苏房] 多步注册页「上一步」回退丢主键：无参 goStep 把 companyRegisterId 写成 undefined
421. [苏房] [苏房] 批量删除写死 label-width 的边界：label-width="0px" 承担布局语义，不能直接删
422. [苏房] [苏房] 房屋限制「新增房屋」弹窗必须复用楼盘表选择组件：两段式接口与参数约定
423. [苏房] [苏房] 机构注册入口与路由映射事实：物业与开发企业共用 /companyRegister，靠 organType 区分
424. [苏房] 合同双范本（pre / suzhou2016）并行改造：入口按路由判版本 + 操作按钮组抽公共组件 + 跨接口字段名差异集中映射
425. [苏房] 注销状态是叠加位不是独立 bizState：状态展示必须复合判断 bizState + cancelStatus，并同步收敛操作按钮
426. [苏房] 批量「详情页统一改 DetailTemplate」前，先用路由注册表按 component 去重收敛出真正的详情组件清单
427. [苏房] 苏房V3 注册步骤条完成态图标：用 completeIcon 位图，禁止蓝底 el-icon-check
428. [苏房] 同一从业人员详情页被 B/G 两端复用：按 terminalType 分端控制字段显隐与「仅改角色」维护模式
429. [苏房] OperationBtnGroup 里 prop 与 computed 同名 businessName 会告警并互相覆盖：权限前缀要独立成 permissionPrefix
430. [苏房] 子表弹窗的查看态复用 DetailTemplate + contentInfo（蓝底标签矩形），编辑态仍走 zs-form
431. [苏房] 合同正文「买受人」列表空白：v3 分页接口已改成 rows 包装，旧代码还在读 response.data
432. [苏房] 详情页底部大片空白：zs-tabs 被 flex:1 撑满视口，空白在 Tab 卡片内部而非 padding 叠加
433. [苏房] 合同正文（填空式章节）保存前必填校验与定位：data-field 锚点 + 必填注册表 + 后端文案反查双通道
434. [苏房] 详情页各区块统一边框包裹：Headline 增加 borderOnly 保留外框，Tab 改 card 模式，禁止 v-if 降级成 div
435. [苏房] 苏州V3 排查某业务模块的事实前提：页面为「薄壳 + components」，可能没有 src/api 封装而直接用全局 $post；要件名称由后端 appendix-config 按 busCode 下发
436. [苏房] 详情页「改列数」要同时改编辑态 grid 与只读态布局常量，两套声明会各自漂移
437. [苏房] 详情页底部「审批记录」区块统一收敛为 OperationBtnGroup 的「流程查看」抽屉
438. [苏房] 开业（入网）编辑页要件区：注册要件只读、开业要件可上传，同一 adminType 且提交按序预检两个 busCode
439. [苏房] 「点按钮没反应也没报错」的根因常在方法开头的静默 return 守卫，router.push 失败同样静默
440. [苏房] 新增/提交拆分的审批流改造：先落库草稿再提交，add 成功前不显示「提交」
441. [苏房] E2E 主管部门登录打不开：E2E_BASE_URL 存在就强制走 storageState，且默认端口与注册环境不一致
442. [苏房] 页面右上角「保存」按钮消失且输入框全灰：先查只读/编辑开关的布尔参数是否传反，不要先怀疑权限
443. [苏房] 弹窗式新增/编辑：前置数据未就绪就 return 会让「新增」按钮点不开，需 v-if 重挂 + 弹窗内只留取消/确定
444. [苏房] 选择弹窗右侧留白：样式类挂在 el-dialog 根节点时 scoped 不生效，且缩放动画结束不会自动重算列宽
445. [苏房] 备案「流程 busCode」与「要件 busCode」必须成对分离，且提交端与审核端用同一个要件编码
446. [苏房] 列表新列整列为 `-` 的判定顺序：先比对详情接口字段，再判定分页 VO 未返回（期限字段统一「起 至 止」formatter）
447. [苏房] 弹窗「点确定无反应」：rules 必填项在模板里没有对应 el-form-item，校验静默失败
448. [苏房] 只读「查看详情」一律用公共 DetailTemplate，同区多行信息合并成一个模板而非拆两块
449. [苏房] [苏房] el-table 树形列的全局省略样式别按 .cell > span 收口：display:block 会把展开箭头和文字拆成两行
450. [苏房] [苏房] 「按字段值触发远端资格校验」的表单：请求序号防旧响应覆盖 + 保存前二次校验 + 查无数据即拦截
451. [苏房] zs-select-dialog 迁移契约：$attrs 覆盖 title、@opened 不抛出、默认带 bizState:2
452. [苏房] 变更管理列表「查看」跳错详情页：后端下发 redirectPath 未读 + 用备案 busCode 解析变更行
453. [苏房] 机构类型字段约定：走 company_type 字典 + 统一 companyType，禁止默认值 agency
454. [苏房] 新增保存后拿不到主键 / 详情请求带 null：统一 resolveResponseId + changeFormState 空值守卫
455. [苏房] 预售/现售合同签订共用一套详情页，靠路由 /pre/ 与 /cash/ 决定 contractType 并动态加载章节
456. [苏房] 匿名/新增态机构注册要件的上传 busId 用 Date.now() 占位，配置只按 busCode 拉，转挂交给后端
457. [苏房] 后台 Playwright 探测脚本必须断言已离开登录页，否则「退出码 0」是假阴性
458. [苏房] 待办任务跳转 resolver 迁移：壳路由、失效 storedPath、缺主键的三层兜底
459. [苏房] 详情页「返回」找不到授权菜单：不报错，静默降级浏览器返回（router.resolve 判可用性）
460. [苏房] 提交报「审核流程未维护完成」：auditBusCode 硬取路由 meta 的兜底方案
461. [苏房] 日期字段不回显：禁用态 zs-date-picker 换成只读 zs-input + formatDateOnly 归一
462. [苏房] 用 currentRoute 判断页面身份：写的是臆想的路由名，条件恒假且静默失效
463. [苏房] 全站详情页 label 统一右对齐：一条全局选择器 + 只读模板默认值，不逐页改
464. [苏房] zs-table 选择列要写 type="link" :function，写 :index 只是序号列——样式是蓝的但点不动
465. [苏房] 列表「有数据但不显示」：V3 接口把列表放在 data 里，通用 listCallback 只读 response.rows
466. [苏房] Playwright 在 testId scope 内再 getByTestId 同一 testid 必找不到——scope 只匹配子孙节点
467. [苏房] 弹窗内表单结构规范：form-box → zs-form(label-position=right) → zs-form-item，禁用 el-row/el-col
468. [苏房] 企业端新增表单「所属企业」自动带入：terminalType=B 时用统一社会信用代码反查第一条企业记录回填
469. [苏房] 「选项目→选地块→勾选测绘楼幢」级联导入弹窗的完整流程与失败处理（含裸整数请求体）
470. [苏房] 选择类弹窗「太靠上 / 大弹窗上方空太多」：固定 top:15vh 改成 flex 垂直居中，并强制关闭 v-dialogDrag
471. [苏房] 弹窗查询参数不能「打开时赋一次」：每次请求前重建 payload，否则 projectId 丢失
472. [苏房] 业务审批请求体是三件套：key 只是流程节点，通用 approveMessage 与业务 approvalMessage 是两份意见
473. [苏房] 「审核流程查看」按钮不出现：OperationBtnGroup 依赖路由 formMode 与 data-id，别先怀疑权限
474. [苏房] 详情页「返回」点了没反应：导航构造器没写 backUrl，兜底回退到当前详情路径等于原地刷新
475. [苏房] 术语全局重命名前先按后端菜单快照圈定模块边界
476. [苏房] 要件必填校验会被异步加载状态与 busId 缺失静默放行
477. [苏房] 老 vue-cli 仓库迁 Vite：环境变量前缀与 iframe 待办页迁移清单
478. [苏房] 变更项角标：用后端 changeObject 快照逐字段比对并抽公共 mixin
479. [苏房] 「已备案不可编辑」要整条拆掉维护态旁路，而不是逐字段禁用
480. [苏房] Web 后台列表页公共 class 拓扑与使用边界：list-container/list-card 只给独立列表页，详情内嵌子表不能套
481. [苏房] 字典项未配置时 list.find(...).dictValue 必崩：抽安全取值工具 + 全库清同类写法
482. [苏房] 跨模块跳转别硬编码带参数占位符的 name：走 buildNavigationByFilePath + pathHint/preferDetail/routeId
483. [苏房] 弹窗内 zs-search-form 搜索项宽度被详情栅格规则挤压：改公共样式层而非逐弹窗调
484. [苏房] 选择类弹窗宽度收成 CSS 变量 + 选择壳类：新增选择弹窗不写 width 也保持一致
485. [苏房] zs-table 字典列必须三件套（type=dict + dict-url + :options），缺 options 会回退到错字典显示码值
486. [苏房] zs-table 固定宽自定义列仍参与剩余宽度均分 → 表格右侧凭空多出一块空白
487. [苏房] zs-table-column 插槽必须 slot-scope="{ scope }" 解构，否则行内按钮拿到 undefined 且被空 catch 静默吞掉
488. [苏房] 要件上传「暂无附件」缺省图统一：沉到常量 + AppendixEmpty 组件，根因是 AnnexUpload 的 image-size 默认 200
489. [苏房] 表格「去竖线」是全站规范：border 有三层来源，只删页面模板不生效，还须清理 mixin 与公共组件 prop
490. [苏房] 详情表单右缘不齐：列间距有多套并行来源，补位要用 span 2 的宽字段档
491. [苏房] 「预设单选 + 后面输入框」联动模式：SzChoice 的 fill-from-option / :fill.sync
492. [苏房] E2E 不要用 DEV 常量路由(/__e2e__)做 mock，导航改由动态菜单解析真实路径
493. [苏房] 删除接口参数名不统一：在 table.js 的 deleteRequest 里加 deleteType:'v2' 分流，默认仍发裸数组
494. [苏房] zs-table 序号列统一用 type="index"，跨页序号靠 :index 方法而非 slot
495. [苏房] 同源弹窗跨模块复用：抽共享 Dialog + variant 薄封装，刷新用 $emit('success') 不用 $parent.getList
496. [苏房] 要件面板标题栏高度与其它区块对齐靠共享 mixin，内部不滚动是缺高度链而非 overflow 写法
497. [苏房] 企业主体详情按 organType 分成多个包装页共用一个 detail 组件，编码与跳转口径要记牢
498. [苏房] 退役同源分支时清理全局 mixin 的环境标识：Vue「xxx is not defined」警告来自已被删的全局 computed
499. [苏房] [苏房] 姓名/手机类脱敏：列上配了 formatter 但全局未注册该函数时会静默显示明文，需请求头 + 展示层双保险
500. [苏房] [苏房] 复制/新增跳转整段复制 $route.query 会留下旧 id，被 getId() 优先读取后新增页退化成「带旧主键的详情」
501. [苏房] [苏房] 跨业务模块列表穿透详情：一律 buildNavigationByFilePath + 目标模块自己的 busCode，缺主键先提示不跳转
502. [苏房] [苏房] 用全局 border:none 消除「Tab+Headline+网格」三层框，会把公共组件自身必须保留的独立外框一并删掉
503. [苏房] 列表状态列空白且删除/注销按钮永不出现：接口返回 bizState 而前端误用 recordState，字典未就绪就回显原始码
504. [苏房] getRouterPathByFilePath 找不到路由但控制台能匹配：flattenTree 后 meta.filePath 变成 Layout/ParentView，真实组件路径在 component
505. [苏房] 链式接口传参取错同类 ID：source 同时返回 sourcePlanId 与 presalePermitId，detail 误传前者导致数据为空
506. [苏房] [苏房] zs-tabs 页签栏工具栏按钮 disabled 不随勾选更新：跨 inject 的配置对象不触发父级重渲染，需 notifyToolbarUpdate + $forceUpdate
507. [苏房] [苏房] 页面自写 formMode watcher 与 detailMixins 冲突：immediate 无条件 createForm() 会覆盖 mixin 从 sessionStorage 恢复的草稿
508. [苏房] [苏房] Vue2 原生 radio/checkbox 无法二次点击取消：浏览器默认行为抢先改写 checked，交互必须收敛到 label 的 @click.prevent
509. [苏房] [苏房] 「表单禁用」标志不能当提交按钮的正向显示条件：审核锁态（displayStatus=2）仍能重复提交
510. [苏房] B 端隐藏「企业/机构主体」类搜索条件：用户要求逐页过滤，禁止改公共 zs-search-form
511. [苏房] 端别(terminalType)条件隐藏的判定口径与降级方向：缺失按 G 端处理；薄入口共用内核列表组件一处改覆盖多菜单
512. [苏房] 同一详情组件被多个审批节点路由共用时，busCode 要写死常量，不能按路由 meta 动态解析
513. [苏房] 接口字段更名（provinceCityArea→administrativeArea）的迁移套路：抽 normalize 函数 + 全量排查关联页残留
514. [苏房] lint 验证口径：npm run lint 跑的是全仓 eslint，输出尾部不能用来判定本次改动是否引入问题
515. [苏房] 弹窗左侧「楼幢→单元」懒加载树在各业务弹窗里重复实现，应抽成可配置公共组件
516. [苏房] 新增态要件从 RegisterUploadItem 迁到 AppendixPackageSection 后，保存前校验与提交前校验不同源
517. [苏房] 「表单项宽度过短」的两个根因：窄容器里仍用三列 + label-width=auto，且编辑态与查看态是两套配置
518. [苏房] 仓库边界事实：zhi2-web-admin 是纯前端子模块，后端按业务拆独立服务，接口契约在外部联调文档
519. [苏房] 选择弹窗「打开即空白、必须点搜索才有数据」的根因：v-if 懒挂载让 el-dialog 的 open 事件永不触发
520. [苏房] 审批意见字段的可编辑与必填由「审批节点常量表 + formMode + bizState」共同决定，不能只看有没有审批按钮
521. [苏房] 表底统计只留一处：删掉手写 table-summary/共计 N 条，统一交给 zs-pagination（纯总数用 :show-pagination="false"）
522. [苏房] 给公共 scss 加「折叠区底部留白收紧」规则时，不能挂在 label-position 变体类上，否则 label-left 页面必然漏网
523. [苏房] 只读详情的长文本/大字段必须走 detail-template，不要用 disabled 表单控件兜底
524. [苏房] 菜单 component 指向 views/**/components/** 会被路由表排除：变更类业务必须有自己的详情入口，禁止前端兼容映射
525. [苏房] 入网/注册提交成功后的反馈用单按钮确认弹窗替代 toast（用户明确偏好）
526. [苏房] 多详情页批量迁移「流程查看」按钮：可见性三条件契约 + 主键字段逐页核对
527. [苏房] [苏房] 文件类「查看」按钮打不开 PDF：路径字段嵌套在 plan 子对象里，需集中 resolve*Url 多候选解析
528. [苏房] [苏房] 变更页数据带不进表单的两层根因：多 watcher 并发 getDetail 竞态 + beforeForm 早于注水
529. [苏房] Vite 下 Vue2 全局/上下文注册章节组件失效：Unknown custom element 用 import.meta.glob + 父级映射 prop 修复
530. [苏房] 多文件要件驳回后只回显 1 张：附件回填不能用 usedConfigIds 占位分配配置
531. [苏房] 复刻详情页漏掉 detailMixins 契约字段：渲染期 businessName 未定义警告 + 底部审批按钮不渲染
532. [苏房] 弹窗表格「有数据但空白」：先看响应顶层是 data 还是 rows，再统一走 extractListData 归一化
533. [苏房] 详情页局部可编辑字段：DetailTemplate 命名 slot 原位渲染 + item.autoHeight，禁止网格外另加 el-row
534. [苏房] Vue2 里 data 优先于同名 computed：改 mixin 的 selectable 必须写在 data() 中
535. [苏房] 内联选择弹窗缺 v-if：关闭后组件常驻挂载，在 flex 容器里撑出一块空白
536. [苏房] tdai 记忆 MCP 报 Missing required argument: session_key —— 每个工具都必须带 session_key
537. [苏房] 详情页重写 detailMixins 的 init() 会静默断掉查看/编辑的详情请求
538. [苏房] zs 后台组件的全局注册规则（文件夹名即标签名）与要件上传的两种落地模式
539. [苏房] 公共 Headline 标题栏：内边距只给左右，Vue2 具名插槽用 slot="right"
540. [苏房] 子表行删除：草稿态只改本地，已保存单据必须走整单 save 持久化
541. [苏房] 详情页底部子表块被整体裁掉：整页滚动出口规则要收敛成三个互斥触发条件（styles/index.scss 一处修）
542. [苏房] 详情页子表「去掉新增/删除/编辑但要保留关联数据展示」：给同一子表组件加 readOnly，而不是删组件或另造只读组件
543. [苏房] 变更类业务的详情菜单必须挂 *Change 薄页组件路径，挂回原详情页会静默走成「备案」而非「变更」
544. [苏房] 同一详情组件被「维护/变更」两个菜单复用 → 管理端误调变更接口的根因与前端防御回退
545. [苏房] 详情页查看态要件按钮全部不可点：zs-form 的 disabled 会级联禁用整个表单域内按钮
546. [苏房] 苏州市房地产监测V3 仓库根只是 submodule 容器：本地没有后端代码，后端在独立服务
547. [苏房] 行政区划字段 approvalRegion → administrativeArea 的迁移半成品状态与完整改动面
548. [苏房] OperationBtnGroup 统一 emit refresh：提交/审核后详情页不刷新与详情接口重复请求的根治
549. [苏房] zs-tabs 区块内的子表不要自带 Headline：用 SubTableToolbar 把按钮挂到 Tab 右侧，否则出现重复「明细/收起」标题
550. [苏房] 详情表单纵向间距双来源叠加：收敛到 --detail-block-gap 单一口径（含弹窗裸 el-col 的例外）
551. [苏房] 表格列改名只改 label/formatter，绝不能改 prop —— 列配置按 prop 持久化在 localStorage
552. [苏房] DetailTemplate 的 column prop 声明了但无效：一行两列只能逐项配 layout
553. [苏房] V3 后台组件无需注册：main.js 用 import.meta.glob 按「父目录名」全局注册，目录名即标签名
554. [苏房] 详情页 ZsSubmit 提交体会丢主键：submitData 定义在页面却没接到 operation-btn-group 的 :submit-data
555. [苏房] 弹窗保存别在接口返回前 close()：校验通过即无条件关闭会让失败路径丢失上下文并双次关闭
556. [苏房] 表单校验提示溢出区块边框：提示是绝对定位不占流，全局把 form-item 的 padding-bottom 清零就会挤出去
557. [苏房] 动态章节组件报 Unknown custom element：配置里的组件名与 SFC name 大小写不一致
558. [苏房] 状态双口径没对齐：列表显示「已备案」但工具栏仍可编辑/删除
559. [苏房] 公共弹窗别用 prop 透传字典 options：prop/data 同名触发 Vue warn 且文案不显示
560. [苏房] 多机构共用内核页的 organType 解析：filePath → busCode → 父级菜单标题三级回退，共用内核不得默认某个机构类型
561. [苏房] 共用内核页 + 薄入口模式：菜单 component 必须是 views 下的页面入口，薄入口未登记时按 filePath 跳转必报「未找到菜单路由」
562. [苏房] 从原证发起变更时 bizState 会继承原证的「已备案」值，导致新单要件区直接只读
563. [苏房] v-dialogDrag 让弹窗偏位后如何真正居中：关掉拖拽 + body 挂载层 flex 居中 + @opened 清内联样式
564. [苏房] 接口 200 却提示「发起变更失败」：空 catch 把路由解析异常伪装成接口失败
565. [苏房] 列表「有 total 但无行」：主键字段改名要同步 primaryKey，且分页数据可能落在 response.data.rows
566. [苏房] 变更单保存后跳详情传错 ID：query 残留的原始备案 ID 会压过保存返回的变更 ID
567. [苏房] 图形验证码 /code 不显示：用请求级 skipCrypto 跳过加解密，不要塞进明文白名单
568. [苏房] 列表「新增/详情」跳错模块：用路由 name 首段当 pathHint，在同构详情路由之间必然撞车
569. [苏房] 变更表单的「原值」红色角标：必须两侧跑同一套格式化再比较，否则全字段都判成已改
570. [苏房] [苏房] 合同章节窄版心内宽表穿屏：外包滚动容器 + 放弃固定操作列
571. [苏房] [苏房] OperationBtnGroup 公共按钮组的标准顺序与「不带图标」约定
572. [苏房] [苏房] zs-table-column 字典列必须显式传 dictUrl，否则按 prop 推导出错误字典键
573. [苏房] [苏房] 附件上传全面统一为宫格：在旧组件上加委托层，而不是逐页改模板
574. [苏房] [苏房] 接口字段替换的适配三件套：回填兼容旧值、提交剔除旧字段、界定不在范围的接口
575. [苏房] Vite 生产构建加速：瓶颈是 SFC 数量，资产合并只省写盘不省墙钟
576. [苏房] 详情页返回按钮「路径末段是主键」的判定，在 query 传 id 的企业端路由上必然失效
577. [苏房] 同一页面承载「备案单 + 变更单」两套单据时，状态必须单独维护 changeBizState，不能用备案 form.bizState
578. [苏房] 日期范围控件把详情表单列宽撑歪：改用 detail-form.scss 的 section-form 三列栅格 + min-width:0
579. [苏房] 迁到 zs-select-dialog 后宿主 selection 必须随 visible 重置，否则取消残留导致提交过期载荷
580. [苏房] 命名详情路由没有 :tableid 时主键必须显式放 query.id，否则 getId() 把模块段名当业务主键
581. [苏房] 行政区划 formatter 按「有无名称字段」分两套：administrativeRegionFormatter vs fullRegionFormatter
582. [苏房] 并行 AI 会话共用同一工作区：交付前用 git status 核对自己改的文件，别提交别人的改动
583. [苏房] V3 详情接口「URL 拼 ID → body 传主键」的运行时归一化层：只管得住 api 层，兜不住 3 类写法
584. [苏房] 详情接口整表覆盖 form，会抹掉「从路由识别出来的页面形态字段」，导致字段区与 Tab 凭空消失
585. [苏房] 树形选房弹窗只在最后一级回写上下文 → 父页 created 抛出「请先选择项目信息」
586. [苏房] 注册步骤组件复制改字段后，E2E 的 fillStep1 用 placeholder 文本定位会连带全流程失败
587. [苏房] V3 子表/列表表格的容器约定：详情用 .sub-container，列表用 .list-card，边框规则在 index.scss 一处收敛
588. [苏房] 列表首行「（未保存）」幽灵行：sessionStorage 草稿失效后仍被无条件回显
589. [苏房] 删除接口「裸 ID 数组」的全局收敛点：mixins/table.js 的 deleteType/deleteParamKey，单 Long 接口要单独留出
590. [苏房] 批量脚本改过的 Vue 模板报「tag has no matching end tag」时，用 scan-tag-mismatch 脚本定位而不是靠人眼
591. [苏房] 注册流程 Step 图标按 stepKey 三段式命名，缺图时只列清单由用户提供，禁止自造素材
592. [苏房] 公共 section-form 里再套 el-row/el-col 会塌成 1 行 1 列，且 768–991px 段缺 sm 断点列宽
593. [苏房] 详情模板 label 宽度必须按「所在栅格列」各自算最长，整行字段对齐第一列，空列占位按已推进的列序号推算
594. [苏房] cursor-feedback 飞书 /new 拉起任务报「未配置 CURSOR_API_KEY」：key 要落到进程环境 + 重装守护进程，默认模型与项目目录在 cli.json/settings.json
595. [苏房] 引入公共 @/mixins/area.js 时页面同名 regionOptions 会与 mixin 计算属性撞车，区划回显要按三级兜底
596. [苏房] 文本字段改 zs-input-number 时校验 trigger 必须从 blur 改 change，且历史脏文案要先迁移
597. [苏房] presale-detail-section-stack 的白卡片是靠子选择器命中的：新塞裸 div 区块会变成透明底
598. [苏房] [苏房] 请求拦截器把路径末段当 REST 动作：/presale/permit/cancel/page 被改写成 /presale/permit/cancel 导致 400
599. [苏房] [苏房] 详情页片区/区域下拉无值：api 模块引错 + 缺分页参数 + 响应字段不匹配三件事
600. [苏房] [苏房] 子步骤保存后要能立刻看到结果：保存接口必须回传展示态字段（PDF 地址）并用 sessionStorage 桥接
601. [苏房] [苏房] el-tree 选中/高亮不生效：node-key 类型与 setCurrentKey 入参类型不一致
602. [苏房] [苏房] 同一要件面板同时承载「外部带出的只读要件 + 本单可上传要件」：靠 busCode 逐项判定可操作性，不要合并成一个可编辑列表
603. [苏房] [苏房] 新增态「先传附件后保存」：用临时附件分组 busId + 保存时传 applyAttachGroupId 由后端转挂
604. [苏房] [苏房] 路由主键是防伪码（UUID）时，附件/提交的 busId 必须由页面显式传业务主键，且详情返回前不得回退路由参数
605. [苏房] [苏房] 多机构薄封装（zljg 复用 jjjg 内核页）：Provider 注入上下文必须被核心页消费，生成脚本目标路径与草稿 key 都要按机构维度校验
606. [苏房] zs-table-column 插槽必须写 #default="{ scope }" 并用 scope.row，写 { row } 会 undefined
607. [苏房] 列表行可编辑判断与详情头部可编辑判断必须共用同一判定函数，否则能进页不能提交
608. [苏房] zs-tabs 统一改造的边界：登录页与右侧抽屉（attachmentDraw）保留 el-tabs 经典页签
609. [苏房] 「所有页面按这个字段顺序」类需求收敛到共享 Panel 的 constants 构造器，一处改全局生效
610. [苏房] zs-table 树形表格列宽审计需计入缩进与展开图标，异步展开后必须重算
611. [苏房] 逐条 POST 的批量提交：循环 break 后仍无条件弹成功提示
612. [苏房] 选楼弹窗的 floorNumber 是「总层数」，不能直接写进 aboveGroundFloors
613. [苏房] 弹窗新增态必须显式重置表单，只靠 onClose 的 resetFields 不可靠
614. [苏房] 同一字典被「表格列 + 筛选项」各拉一次；字典类型常量不要跨模块 import
615. [苏房] 通用 FileUpload 迁到要件组件 AppendixPackageSection：三态适配 + 旧数据 URL 回退
616. [苏房] 区块「空态缺省图 + 操作按钮」条件互斥：未维护时应显示维护按钮，不要渲染缺省图
617. [苏房] 提交接口地址从流程配置接口动态解析（resolveFlowSubmitApi + 常量兜底），不要前端硬编码
618. [苏房] Vue2 本地 data 与 mixin 的 computed 同名：computed property is already defined in data 警告与重命名解法
619. [苏房] 楼幢号：展示层用 buildingNo，提交层保留 buildingCode，且要跨多文件同步替换
620. [苏房] 子表弹窗按 isViewMode 分流：查看用 DetailTemplate，编辑仍用 zs-form，表底统一 zs-pagination 统计
621. [苏房] 共用 detail.vue 的「返回」按钮显隐：isChange 包装页 / backUrl / 路径末段为业务主键三选一，企业端编辑态必须隐藏
622. [苏房] el-form-item 内挂两个控件时只有第一个触发校验：营业期限 range 拆成起止 picker 后必须手动 validateField 并同步 E2E 定位器
623. [苏房] 登录后默认落地「第一个可访问菜单」：DFS 取首个非 hidden 叶子 + 统一 landingPath helper，不要写死 /todo
624. [苏房] E2E 验证「变更页返回不保存」的断言基准；getByText('') 会匹配空节点导致误挂
625. [苏房] 企信通企业信息回填要整体写回营业期限区间，逐字段「有值才赋值」会残留旧 businessTermStart
626. [苏房] [苏房] 等保三级通信加密改造的前端分层与接入点：request 拦截器 + 独立 crypto/utils 模块
627. [苏房] [苏房] 加密改造两个具体坑：security/public-key 是 POST，sm3(msg,{key}) 与 hmac 模式等价
628. [苏房] [苏房] V3 新建模块的模板选取与 mixin 继承链：listMixins→table→tableComponents/permsMixins，detailMixins→form+area→formComponents
629. [苏房] [苏房] 测绘变更（预测转实测）模块的业务约束与「编辑只放一个字段」的接口收敛
630. [苏房] [苏房] V3 删除接口有两种请求体形态：裸 ID 数组之外还有 deleteType:'v2' + { ids: [] }，不能按同一模式改
631. [苏房] 苏州V3 E2E 目录结构与命名约定：按业务域分目录 + fixtures 共享层
632. [苏房] 弹窗表单 label 左对齐的真正根因：Element UI 没有 label-align，只有 label-position(right/left)
633. [苏房] 「直报现售备案」与「预售转现售」共用一套详情组件，用 sourceType 分流
634. [苏房] zs-search-form 的 padding 层层叠加根因：全局 el-row gap + 组件内 :deep(.el-col) padding + 布局列 padding 三份来源
635. [苏房] 弹窗内的「关联选择」改内嵌选择表，不要再叠二层选择弹窗
636. [苏房] zs-table 的 bizState 列走专用渲染分支：字典化改造的三个暗坑
637. [苏房] 要件区在新增/变更单不可上传：appendixOperable 拿 bizState 判定，新增态 bizState 是 undefined
638. [苏房] 聚合型管理列表（无自有 detail 页）必须自己实现 handleView，否则点查看报「没有授权相关菜单」
639. [苏房] 自定义要件上传区对齐公共 AnnexUpload：只搬展示子组件，锁死 e2e 选择器契约
640. [苏房] 资质类「工作牌/信息卡」入口在 institution/agencyPersonnel，按钮可见性是四项数据条件而非权限
641. [苏房] 弹窗表单全局统一两列、文本域必须整行：detail-dialog-grid-col-sizes 的三处覆盖与顺序
642. [苏房] 限制审核详情点「编辑」后关联房屋子表消失：查看态分页数据源与编辑态本地数组未打通
643. [苏房] 自研组件库使用说明的生成套路：目录即全集、main.js glob 即全局注册规则、自检要验路径存在
644. [苏房] Web 详情页滚动所有权：detail-container 只锁高不滚，由 detail-from-container 独占滚动
645. [苏房] 要件/附件卡宫格不要用等宽 grid：标题被省略号截断，用户要求完整单行
646. [苏房] 弹窗表格多选勾不上、确定键常禁：row-key 用了本数据集里不存在的子表主键
647. [苏房] 附件要「过滤掉别处配置但回显别处文件」：单配置集 + 同名只读回填 + fillFromBusCode，不要合并两套配置
648. [苏房] 查看态不要用整表 disabled 的 zs-input 冒充只读：按 formMode 分支到 DetailTemplate
649. [苏房] zs-dialog 传 header="" 会留下一条只剩关闭按钮的细条标题栏
650. [苏房] 变更单「提交」按钮显隐不能绑死「变更申请」菜单，要按单据自身状态判定
651. [苏房] SM4 响应加密的后端实现在独立网关仓库，前端并行两套解密链路
652. [苏房] el-tabs 换 zs-tabs 的两个实操细节：下划线错位根因 + hide-headline 去重复标题
653. [苏房] 探索结论前先确认 zhi2-web-admin 子模块是否完整检出，否则会把「文件不存在」误判成功能未实现
654. [苏房] zs-select-dialog 自定义左侧树时 tree prop 仍须补齐 treeUrl/treeKey/treeLabel 占位，否则 prop 校验告警
655. [苏房] 弹窗/子表查询的两个静默退化：pageSize 写死 500 无截断提示、楼幢过滤字段缺失时不过滤直接全量查
656. [苏房] 同一批字段散落在 extend / projectExtend / projectExtendChange / originExtendInfo 多个容器时，必须统一合并解析且禁止可选链直赋覆盖
657. [苏房] 详情页「业务编号」字段的展示位置约定：顶栏 HeadTitle 只留申请编号/状态/创建时间，业务备案编号 unshift 到基本信息首位并做重复断言
658. [苏房] 子表工具栏从页面自绘 operation-button-container 迁到 SubTableToolbar 时，把显示条件/权限/禁用逻辑整体搬进 operationButtons 计算属性
659. [苏房] 按对接文档做字段更名收敛：读取侧新字段优先并兼容旧字段、保存侧只传新字段，字典选项要剔除「全部」
660. [苏房] 详情页签内子表列宽/高度通用化：删掉 table-tr 与写死 width，用 :page-size 控高 + row-key 保多选
661. [苏房] 长文本字段（经营范围）在只读详情里要移出三列栅格，单独整行禁用 textarea 展示
662. [苏房] 自由文本字段改字典下拉（户型 house_type）的改造套路与历史数据回显坑
663. [苏房] 跳隐藏子页（预售方案维护页）失败：菜单解析不可路由时按当前 URL 段替换推导，别只依赖 buildNavigationByFilePath
664. [苏房] 委托代售新增对接新接口：选中项/详情/提交体三层映射，详情回填不能被选项列表覆盖
665. [苏房] 行展开子表改独立 Tab：选楼弹窗必须缓存 houses 快照，汇总字段走「已保存用接口值/未保存本地汇总」双口径
666. [苏房] DetailTemplate 改一行两列：在共享 contentInfo 里用 HALF_LAYOUT/FULL_LAYOUT 常量，不逐页写 span
667. [苏房] 弹窗控制台报 Unknown custom element <pagination>：旧页面拷贝残留裸标签，本项目分页是全局 zs-pagination
668. [苏房] [苏房] 业务状态展示没有 StatusTag 公共组件：统一走 dict-tag + options[].listClass 字典配色
669. [苏房] [苏房] 要件网格末行落单整行展示：纯函数模拟两列排版 + grid-column: 1 / -1
670. [苏房] [苏房] 详情页底部灰色空白带 + 最后一个 Headline 标题被拦腰截断：calc(100vh - 120px) 与实际 104px 不符
671. [苏房] 全局水印被页面高层遮挡：水印层改挂 body + fixed 对齐 app-main，z-index 取 1990
672. [苏房] 跨列字段换行后无法与上一行第 3 列对齐：给 DetailTemplate 加 gridOffset 偏移占位
673. [苏房] 菜单配置的 submitApi 不生效：提交接口解析应做成 meta → 流程配置 → 默认路径三级优先级
674. [苏房] 新增改走审批流（删除提交即生效接口）：草稿 add/update 拆分 + 新增态 config-only 上传 + 落库后才出提交按钮
675. [苏房] 真实接口 E2E 三条稳定写法的坑：waitForResponse 后再 patch 表单、mock 用例缺函数会伪装成下游超时、按按钮可见性 skip
676. [苏房] 新增保存后切查看态丢 ID：changeFormState('view', id) 必须显式传主键
677. [苏房] 详情页迁到公共详情框架后，残留 <zs-attachment> 只报 Unknown custom element 警告
678. [苏房] Tab 视觉统一：改 zs-tabs 公共组件一处，并清掉页面级 :deep(.tabs-tab) 覆盖
679. [苏房] 限制单据保存后子表「暂无数据」：detail 不返回子表时回退分页接口，且禁止用空数组覆盖本地已选
680. [苏房] 单页注册「查询暂存单」用服务端要件整体覆盖本地列表，会清掉尚未持久化的已上传附件
681. [苏房] 「输入正确数字仍提示请输入正确数字」：this.patterns.xxx 被引用但 patterns/index.js 从未定义
682. [苏房] 注册步骤条「已完成」态：复用 currentIcon 出实心蓝，别为一个完成态再维护第三套位图资产
683. [苏房] [苏房] Web 后台表格列右对齐只认「金额/面积」白名单，不要在全局 formatter 里按列名后缀匹配
684. [苏房] [苏房] 雪花 ID 精度治理：禁止 Number(x) || x，回填分支与 query 分支必须统一 String().trim()
685. [苏房] [苏房] 从业人员变更 busCode 按机构类型三分，页内变更后要件 busId 必须切到变更单 ID
686. [苏房] [苏房] 数字字段改用 zs-input-number 的联调清单：min/precision 显式声明 + 详情回填 Number 归一化
687. [苏房] [苏房] 表格「序号」列表头被裁切：页面 width="60" 绕过 zs-table-column 的全局固定列宽下限
688. [苏房] [苏房] 后端把字典字段整体替换（provinceCityArea→administrativeArea）时的多页迁移清单与兼容顺序
689. [苏房] [苏房] 下线功能入口只删按钮、不删能力：按钮+计算属性+handler+无用 import 四件套一起清
690. [苏房] [苏房] 定长字符字段（18 位统一社会信用代码）输入框宽度用 ch 计量并在 E2E 里断言可见性
691. [苏房] [苏房] 图片预览弹窗标题显示文件名：preview store 增 nameList 与 urlList 同索引，URL 解析兜底
692. [苏房] Vue 警告 Unknown custom element: <Submit> 的根因：全局组件名是 ZsSubmit，且 OperationBtnGroup 已内置提交按钮
693. [苏房] 详情页底部白条与滚动灰条遮挡：calc(100vh-120px) 少减 16px + Headline 未包 detail-from-container
694. [苏房] 详情页内层 Tab 把卡片 padding 清成 0 后，只补了 tabs-bar 留白，tabs-content 里的表格仍死贴边
695. [苏房] 分页接口取 res.rows、全量 listAll 取 res.data：切接口族必须同步切取值字段
696. [苏房] zs-input-number 输不进小数：默认 step-strictly + step=1，precision 只管显示
697. [苏房] 「表格不带竖线」的真实含义：不传 border，detail-sub-table-root mixin 有 border 分支会加回竖线
698. [苏房] [苏房] flowable 接口路径按 controller 分组：flowViewer/审批权限属 /flowable/task/*，写成 /flowable/definition/* 必然 400
699. [苏房] [苏房] 弹窗表单行距统一走 zs-dialog 的 .form-box + --dialog-form-item-gap 变量，页面禁止写 scoped 间距
700. [苏房] [苏房] 详情页关联子表用「本企业接口兜底 + 记录详情覆盖」两段式加载，detail 失败必须保留兜底不置空
701. [苏房] [苏房] 隐藏详情页扩展栏目用常量开关 + 保留字段数据，删模板或停加载会导致保存时把已有数据清空
702. [苏房] 详情页「查看态标签太靠左、和编辑态差 12px」：两态共用同一 DetailTemplate 并挂通用缩进类，用负边距抵消
703. [苏房] 「新增正常、查看点不动且侧边栏空白」先查详情菜单 path 的动态段拼写（:tableld 少个 i），不是路由代码问题
704. [苏房] 新建业务模块的骨架约定：薄壳 index/detail + components 下 List/Detail/Dialog，权限走 permsMixins 而非 v-hasPermi
705. [苏房] 验证码 /code 接口要「明文 POST」：加密白名单会强制 GET，正确做法是 skipCrypto 单接口跳过
706. [苏房] V3 本地 Nginx 部署约定：deploy/start-nginx.bat 统一「构建→重载」两步
707. [苏房] 「机构注册」是入口统称，要按主体拆到三条独立路由，别在 institutionRegister 里找开发企业
708. [苏房] 弹窗列表「暂无数据」先查响应体层级：$post 补丁返回顶层 {code,rows,total}，只读 res.data 必空
709. [苏房] 改「几列布局」必须同步编辑态 grid 与查看态 FORM_COL_* 常量，并保留旧布局常量导出
710. [苏房] 选择类弹窗首次打开不请求列表要按组件族全局排查，而不是逐页补搜索按钮
711. [苏房] 用 ResizeObserver 监听容器自身再改容器尺寸会自激放大（登录页图片涨满全屏）
712. [苏房] 跳转提示「没有授权相关菜单」多为手写 filePath 拼错，不是权限问题
713. [苏房] 弹窗关闭按钮不垂直居中：用上内边距变量定位绝对定位元素 + 图标 line-height 拉偏
714. [苏房] Playwright 只需录制部分用例时：video 是文件级配置，必须按录屏粒度拆 spec 文件
715. [苏房] 注册表单「重置」无效的根因：重置逻辑只撤销「提取回填」而非整表还原，应改用 createRegisterForm() 工厂
716. [苏房] 表格边框有三个来源：去边框不能只改 zs-table 默认值，列表页配置对象里的 border:true 才是主战场
717. [苏房] AnnexUpload 的「隐藏视图切换」是多点联动开关：顶栏、底部批量栏、勾选态、watcher 四处必须一起关
718. [苏房] 面积/金额类字段统一用 amount-input：编辑态 :dot 控小数、查看态用同一格式化函数，空值口径分开
719. [苏房] 资质「有效期」时间段展示：getOwnCompany 种子数据要合并详情接口，别在「已有资质」时提前 return
720. [苏房] detailMixins 只适用于整页：子表单组件不要混入，且 init() 应对缺三要素静默返回
721. [苏房] 企业信息「变更审核中」的要件必须用变更单 ID 查，ID 未就绪时宁可为空也不回落备案 ID
722. [苏房] 详情页「基本信息」整块空白且无报错：先查渲染它的公共组件 DetailTemplate 是否注册
723. [苏房] 隐藏要件上传区必须同步放开保存校验，且管理端与 ToB 两份组件副本一起改
724. [苏房] zs-table 拉伸列注册 uid 与 Element 内部列类型不一致，导致中间列撑不满、固定操作列前留白
725. [苏房] zs-table-column 对 bizState 硬编码全局字典，列级 options 与 dict-url 被静默忽略
726. [苏房] 组件 prop 名与全局 mixin / detailMixins 的 computed 同名会被覆盖：formMode 报 already defined as a prop，mode 直接吞掉父组件传值
727. [苏房] OperationBtnGroup 自算 formMode 缺少 getId 兜底，导致「查看」进入时仍显示保存按钮
728. [苏房] Vue2 审查基线：msgSuccess 已在 main.js 挂到原型，zs-table-column 插槽必须解构 { scope }
729. [苏房] 非分页接口接入公共 SelectDialog.open：用 noPagination + stripPaginationParams，并保留 testId
730. [苏房] 详情页顶栏空入口用 OperationBtnGroup 的 show-* 开关关掉，而不是留着打开空白弹窗
731. [苏房] 操作列整体消失：先查页面 buttons/operationButtons 是否被覆写成空数组，再怀疑权限或样式
732. [苏房] 顶栏(topNav)模式下侧栏路由的同步边界：叶子顶栏菜单必须保持侧栏为空
733. [苏房] 合同条款 SzChoice：单选项收敛为固定【】文案并自动回填唯一值
734. [苏房] 列表页标题禁止写死 list-name，统一从路由 meta.title 读取（matched 继承 + 「列表」后缀去重）
735. [苏房] 只读/终止类详情页行操作列：查看与编辑删除的禁用条件必须同源，并与行内 link 保持一致
736. [苏房] 公共子表组件注册在 mixin 里会让「复用公共组件」验收失效且查不出来
737. [苏房] 同一详情页混用两种 detail 请求体：initDict 改裸 ID 而 getDetail 仍包对象的半迁移坑
738. [苏房] 通用变更单 ID 解析工具是白名单制：新增业务变更必须补业务专属 changeId 字段
739. [苏房] 子应用/第三方地址从前端环境变量迁到后端参数设置（land.domain）的完整改法
740. [苏房] 多选字段与后端「逗号串」契约：回显 split 过滤 + 提交必留 key（空串=清空）
741. [苏房] 要件按主体/角色过滤有两条并行渲染路径，改规则必须同步映射函数否则星标不一致挡提交
742. [苏房] 变更单保存成功后要留在变更上下文但切回 view 态：router.replace 改 formMode，并去掉重复 loadChangeDetail
743. [苏房] [苏房] CI Vite 构建 heap OOM 的根因是构建脚本里写死的「CI 小堆上限 + 低内存模式」
744. [苏房] [苏房] 构建/CI 修复要同步到子模块全部分支：逐分支同改 + 排除产物文件 + 回切主干后远程校验
745. [苏房] [苏房] 分页列表 /list → /page 的判定规则：按「是否带 pageNum/pageSize、响应 rows+total、是否接 zs-pagination」分流
746. [苏房] [苏房] bankBranch 接口 list→page 改造实例：同页多接口要分治，并同步 e2e 的 URL 断言
747. [苏房] V3 仓库是稀疏检出 + git 子模块：检索模块必须走 git 索引，不能只看工作区
748. [苏房] 系统类下拉/列表接口统一取 response.rows（不是 response.data）
749. [苏房] 用 ESLint 自定义规则 prefer-zs-components + Cursor User Rule 双轨约束 Agent 复用公共组件
750. [苏房] DetailTemplate 的 border 只控制外框与圆角，内部分隔网格线始终保留
751. [苏房] 详情页布局复刻 brand 模板的检查清单：Headline 必须是 zs-form 直接子节点，布局常量用 DETAIL_COL_HALF
752. [苏房] 列表补「业务状态」列：状态码解析收敛到 utils，bizState 为空要回退 businessStatus
753. [苏房] 用户偏好：单个页面的分块间距写进该组件 scoped 样式，不要改公共 index.scss
754. [苏房] 列表行对象直接当弹窗 form 用，导致网点详情只回显一行字段
755. [苏房] 本后台没有「全能」CRUD 模板：mixin 驱动型页面按能力拆开参考
756. [苏房] 登录页「机构注册」是统称：四条注册路径，股东步骤只属于开发企业/物业
757. [苏房] 要件上传项不要把格式/大小提示逐项重复，字段名也不能换行
758. [苏房] 企业基本信息「资质区」回显为空：资质列表有两套字段名，只读 qualificationList 会全空
759. [苏房] 详情页要「标签在左」必须显式传 label-position="left"：zs-form 在详情容器里强制 top 且清掉 labelWidth
760. [苏房] el-form-item 的必填红星只认 rules 里的 required: true，自定义 validator 校验生效但不显示星号
761. [苏房] 从业人员详情页附件 busCode 必须与提交/审批同源，否则变更态附件仍走备案编码
762. [苏房] 附件字典项匹配失败会让缩略图与预览整体静默失效（ImageGrid 读 undefined.remark 抛错）
763. [苏房] 第三方数据「提取」入库套路：独立查询弹窗 + 复用主表新增接口 + 沿用新增权限
764. [苏房] businessName 与 flowBusCode 是两件事：只把流程编码改成从路由 meta 取，别连带改 API 段
765. [苏房] 保存接口 400：apiV3Normalize 把 /save 误拆成「动作 cancel + 参数 save」丢掉了后缀
766. [苏房] V3 接口路径固定三段：非 CRUD 业务方法后面禁止再拼 page/add/detail，批量改规范时最易误伤
767. [苏房] 注册要件上传项缺少预览/下载：能力与测试定位契约要按已成熟的上传项组件对齐
768. [苏房] 缴款网点弹窗应走 /prefund/bankBranch/page，字段与旧联行号接口完全不同
769. [苏房] 同一模块多个列表接口响应包装不一致：写『递归解析分页结果』共享函数，不要让页面各写 res.rows
770. [苏房] 守卫竞态：roles 已有值但 addRoutes 为空时直接 next()，动态路由未挂就跳落地页 → 报「页面未授权或不存在」
771. [苏房] 跨模块穿透跳转（注销单→许可详情）必须带 busCode/pathHint + backUrl + query.id，且无主键时别保留 link 样式
772. [苏房] 字段区块子组件：查看态统一走 DetailTemplate 文本而非 disabled 控件，且不要只写 el-form-item 依赖祖先 zs-form
773. [苏房] 详情页整行字段不存在 zs-form-col，必须用 el-col + FORM_COL_FULL
774. [苏房] Headline 的 border-only 会连 #right 操作区一起隐藏（子表工具栏消失）
775. [苏房] 查看态仍出现「保存」按钮：头部按钮与只读展示必须共用同一 canEditInHeader 谓词
776. [苏房] 接口路径带斜杠、权限字符用驼峰：用 businessNameForPerms 把两者拆开
777. [苏房] 子表新增行缺少后端主键时，二次操作要「先补保存再刷新快照」，而不是提示用户手动保存
778. [苏房] 未登录的注册页顶栏品牌信息（系统名称 + LOGO）统一从 platformConfig 读，公共组件内做回退
779. [苏房] vue-qr 默认 margin=20 会让小尺寸二维码白边失控，需 margin=0 + white-margin=false 并固定容器尺寸
780. [苏房] 弹窗表单项间距被「弹窗 margin」和「全局 error-slot padding」叠加成双份
781. [苏房] 弹窗内 DetailTemplate 的标签列宽按「同列最长标签」计算：zs-dialog provide 列数 + effectiveColumn
782. [苏房] 机构基本信息查看页要件：busCode 走场景常量 resolver，busId 固定 companyRecordId 不随 formMode 切换
783. [苏房] 三主体注册流程的目录/busCode 结构，以及「匿名要件上传有 upload 无 delete」的现状
784. [苏房] 合同章节改 zs-tabs 展示：v-show 保留 DOM + 打印时强制展开全部页签
785. [苏房] OperationBtnGroup 的 show-print="false" 关不掉已备案态的内置打印，必须用 custom-print
786. [苏房] Unknown custom element Submit 的根因：全局组件按「目录名」注册，模板必须写 ZsSubmit
787. [苏房] 接口字段 provinceCityArea → administrativeArea 重命名的完整落地清单（含旧字段回退与剔除）
788. [苏房] 用户对 api/ 封装文件的态度是「按模块点名」：被点名才删，不要全局推广
789. [苏房] HeadTitle 空数据仍占位：组件内 v-if 不够，el-card 根节点 padding 还在
790. [苏房] 列表批量删除按钮必须走 mixin 的 multiDeleteButton，自写会同时丢禁用态与主键来源
791. [苏房] 只读详情改用 DetailTemplate 的正确切法，以及它把数值 0 渲染成 - 的根因
792. [苏房] 级联表单的「上游变更清空下游」清单式清空 + 选择弹窗回填要合并详情接口与列表行
793. [苏房] Vue2 表格操作列插槽作用域是包装对象：读 row 字段报 Cannot read properties of undefined
794. [苏房] 新增态附件的临时 attachGroupId 必须每次进入重新生成，否则要件挂到上一单
795. [苏房] 同一详情组件被「本企业菜单」与「待办/主管端」共用时，取数要按路由是否有 ID 分叉
796. [苏房] 状态列一直显示错文案：配了不存在的字典编码，dict-tag 静默降级不报错
797. [苏房] 同源分叉剪枝：删 isSuzhouzhizai / currentEnvironment 分支时保留通用逻辑并固化业务固定值
798. [苏房] 详情页状态字段别在 computed 里 dictLabel 转纯文本，要交给 DetailTemplate type:'dict'
799. [苏房] 后端接口基础路径批量迁移（buildinginfo → building）：只换资源基础路径，子路径名与前端目录名保留
800. [苏房] 多步注册/向导表单：最终提交用的必填字段必须回填到所属步骤的 rules，否则报错落在最后一步
801. [苏房] zs-table 金额/面积列不要写死 align:'left'：amountFormatter 已由组件自动右对齐，显式对齐会覆盖表头与合计行
802. [苏房] 侧边栏/布局尺寸有四处来源：只改 variables.css 不生效，store 用 setProperty 内联覆盖 CSS 变量
803. [苏房] 双表同屏页面复刻 ListTemplate/table mixin 的四个坑：loading 时序、丢掉分页、selection 语义、死弹窗
804. [苏房] el-table/zs-table 列被强行拉满导致间距过大：改 width 固定列宽 + :fit="false"，不要用 min-width 让位
805. [苏房] [苏房] 公共 mixin 的 data 字段被子组件写成同名 computed 会 Vue warn，内嵌态应 watch 驱动 mixin 数据
806. [苏房] [苏房] 子表「新增」按钮点击没反应：守卫里静默 return（编辑态详情不返回 projectId）
807. [苏房] [苏房] 后端给子列表新增字典字段后，列表列/查看弹窗/编辑表单三处要一起接 dict 并做旧字段归一化
808. [苏房] [苏房] 列表页缺 ListOperationButtonContainer 就「没有列表标题」且卡片样式与同模块不一致
809. [苏房] [苏房] 字段中文名改名要全链路同步：列头/label/contentInfo/校验提示/placeholder/弹窗标题/变更页
810. [苏房] [苏房] 多主体同构页：共用「内容构造器 build*ContentInfo」，页面组件仍各写各的
811. [苏房] DetailTemplate 的 type:'amount' 只认纯数字：自由文本字段照抄会静默显示「-」并无条件拼上单位
812. [苏房] 同源多租户条件分支（isSuzhouzhizai / currentEnvironment）下线的改法与验收口径
813. [苏房] zs-table 空表留白的正解：table-tr 传「实际行数（含 0）」触发紧凑空态，而不是写死固定行数
814. [苏房] [苏房] 多步骤表单的「选填」改造：strict 开关与「行已填」判定必须共用一份工具，payload 过滤空壳行
815. [苏房] [苏房] 正则批量删 Vue 标签属性的两类必伤点：动态 :label-width 与行内 label-width="0px"
816. [苏房] [苏房] 变更单「变更前/变更后」对比不要并排两张表：单表合并 + 状态列 + 降级匹配键
817. [苏房] [苏房] 子表放进 zs-form 内会把整块表格一起禁用：户室/明细子表必须渲染在表单外
818. [苏房] [苏房] 要件宫格查看态要和编辑态同源：requirement-grid 模式统一 AnnexUpload(operable=false)
819. [苏房] [苏房] 按原型调字段顺序时要同步改「编辑表单 + 查看态常量构造器」两处
820. [苏房] [苏房] 主表字段下沉到子表弹窗：以 project-form 传默认值，外部提取缺字段回退主表
821. [苏房] [苏房] 行政区划选择器统一替换为 zs-region-select：值与事件语义从「label 数组」变「区划编码」
822. [苏房] [苏房] 行政区划字段重命名为 administrativeArea 的成套改法（字典 ECONOMIC_INSTITUTIONS_REGION + 过渡期兼容）
823. [苏房] [苏房] 列表页新增/删除一律复用 listMixins 的 addButton 与 multiDeleteButton，不要自造按钮
824. [苏房] [苏房] 详情页按钮组迁 OperationBtnGroup 的两个隐性坑：未注册的 <Submit> 静默失效、编辑/返回不能交给 changeFormState
825. [苏房] detail-template 标签对齐有三层默认值来源，全局改必须三处同改
826. [苏房] DetailTemplate 一行两列改三列：span 归一化把 8 强改 12 是真正的拦路点
827. [苏房] Failed to resolve directive: waiting → 弹窗按钮点不动的隐藏根因（废弃指令残留）
828. [苏房] 内嵌模式（只读禁用）字段预填必须在上下文就绪后触发，并让详情回调兜底
829. [苏房] 自写子表删除按钮会漏二次确认；补确认后必须同步 e2e fixture 的确认框处理
830. [苏房] 苏州 V3 仓库是稀疏检出 + 子模块：搜不到文件不代表不存在，要用 git show 读
831. [苏房] 登录页「加载中自动放大/跳变」根因是 JS 动态量算布局，不是 CSS 动画 → 改首帧固定尺寸 + object-fit
832. [苏房] 按设计稿+后端实体重排表单字段：两套独立字典缺映射时不要硬做级联，先要映射表
833. [苏房] 列表行字段加跨模块详情跳转：getRouterPathByFilePath 动态解析 + 缺 id 用 msgWarning 提示
834. [苏房] 沙箱内 npm run build 报 emptyDir 失败与代码无关：改用临时 outDir 验证前端构建
835. [苏房] [苏房] 三家机构「备案信息变更」busCode 对账口径：申请侧留空由列表继承，租赁域缺菜单会误用经纪编码
836. [苏房] [苏房] 从业人员状态调整接口 /company/agencyPersonnel/adjust 契约：cancel 改 bizState、freeze 只改 freezeStatus
837. [苏房] [苏房] 清理多环境分支（isSuzhouzhizai / currentEnvironment）的收敛套路：差异改由业务字段判定，不用环境常量
838. [苏房] [用户偏好] 开发工具的引入标准：只要自动触发、零配置、零额外工作量的能力
839. [苏房] [苏房] E2E 全部位于 Git 子模块 zhi2-web-admin 内：目录、配置开关与运行方式的完整事实
840. [苏房] [苏房] 遇到「同一身份证号/证件号已关联」类后端校验报错时的正确排查路径（前端 monorepo 无后端源码）
841. [苏房] zs-table 选中行高亮失效的三处根因（setCurrentRow 不在组件上 / row-class-name 被内部覆盖 / 选中类无样式）
842. [苏房] 详情页水平留白从 .collapse-content 挪到「直接子元素白名单」会漏掉表格区与 zs-form
843. [苏房] variables.css 与 variables.scss 双份主题变量的收敛：只留一份 CSS 变量，冲突以「实际生效值」为准
844. [苏房] 要件宫格上传改 picture-card：删除后列表回弹的根因是 getList 不同步返回
845. [苏房] 同构注册页顶栏不统一时抽 RegisterPageHeader，用 testId prop 保住 e2e 断言
846. [苏房] 变更单详情审核按钮不出现：工具栏 bizState 不能用变更单上的 bizState，要看 displayStatus
847. [苏房] 选择类弹窗回填必须遍历「本次选中行」，不能遍历 selectList 全量（换接口时顺手修的老坑）
848. [苏房] 明细页冗余汇总字段（现售面积）在本地增删行后必须前端重算，不能继续读接口旧值
849. [苏房] 把 Headline 水平留白改成「直接子元素白名单」会静默丢掉表格/表单的 padding：改前必须枚举所有 slot 根节点
850. [苏房] 全局详情页间距 token 化的副作用：collapse-content 的 el-row flex 规则会误伤 Headline 内 zs-search-form
851. [苏房] 折叠区搜索条例外规则要同时覆盖 detail-container 与 detail-from-container 两条父链
852. [苏房] 注册流程匿名态要件删除统一走 deleteAnonymous（appendixIds 数组），登录态仍用 deleteAppendixBatch
853. [苏房] 共用内核列表页的 organType 要在入口页用 prop 显式钉死，不能只靠 Provider/路由 meta 解析
854. [苏房] 审批流程抽屉固定宽度会截断节点名：按节点数与最长名估算宽度，加载完成后再加宽
855. [苏房] 行政区域列显示成 6 位代码：接口字段有「字典值/区划代码」双形态，dictFormatter 未命中要回退区划全称
856. [苏房] 双入口共用列表页的标题不要硬编码：取路由 meta.title 拼接，并处理重复后缀与空标题
857. [苏房] 变更单只切了附件 busCode、没切流程 busCode：审批会走备案流程或报「流程未配置」
858. [苏房] 页面编辑门控的状态集合必须与操作按钮组（OperationBtnGroup）的可提交集合一致，否则已驳回单改不了
859. [苏房] 变更单用「页内变更态」而非新路由页：getLast 幂等取单 + 一次性切换 businessName/primaryKey/busCode/附件 busId/提交接口
860. [苏房] 备案状态被后端拆成 bizState + cancelStatus 时，前端做「派生状态码」统一展示，不要改筛选参数
861. [苏房] 弹窗内搜索栏也必须用公共 zs-search-form：靠新增 borderless prop + resetFields() 扩展，不另写一套 zs-form
862. [苏房] 后端把行政区划「拼接串」换成字典码字段时，在共享字段配置的归一化层做映射，三处消费点同步改
863. [苏房] 弹窗内表单 label 右对齐要全局修：zs-form 映射改「非 top 即 right」+ .el-dialog__body 选择器排除 top 布局
864. [苏房] V3 新建接口把主键放在 data 字段：解构 { id } 得到 undefined，导致后一个接口缺合同主键
865. [苏房] 详情页/弹窗间距统一到两级 CSS 变量（16px 区块 / 12px 行距），并清掉页面级 scoped 间距
866. [苏房] 函数式弹窗 mount shell 的四个高频缺陷：opening 锁无 try/finally、$listeners 双转发、成功分支重复 close、catch 吞掉 already_open
867. [苏房] [苏房] 管理员管理双入口 organType 串值：Provider 缺席时 resolveOrganType 的默认回退落到了错误分支
868. [苏房] [苏房] 顶栏点目录时「唯一可见子菜单直接激活」：可见性过滤 + 单子项链递归的菜单解析套路
869. [苏房] [苏房] 全选显示 (0/2) 但列表有 3 行：勾选弹窗的分母/模式判定混用了三个数据源，且行 key 重复
870. [苏房] [苏房] 把详情页某字段抽成独立区块（业务范围）：omit 去重 + 查看/变更两条链路都要透传字典 options
871. [苏房] zs-table 列表列不要写死 width：定宽会让表头省略号化，去掉后走内容测算
872. [苏房] 多菜单共用同一个 detail.vue：pathHint 只取 path 末段会让详情路由互相抢占
873. [苏房] 按设计稿删掉子表 UI 区块时，必须保留该子表数据的加载与回传，否则改主表会清空历史
874. [苏房] 页面本地静态选项改后端字典：先写 normalize 兼容旧编码，再复核联动条件
875. [苏房] [苏房] zs-operate-column 不要传固定 :width，交给组件按按钮文字自适应（列表操作列过宽的根因）
876. [苏房] [苏房] 开发企业注册营业期限「长期」选项已被产品否决：删除字段需表单/校验初始数据/企信通映射/E2E 四处同步
877. [苏房] [苏房] 删除楼幢复用主表 /save 持久化的三个隐患：隐式全量提交、并发竞态、汇总字段不回填
878. [苏房] [苏房] 现售面积 totalArea 依赖后端 save 后重算：前端不传面积，且本仓库无 Java 后端源码无法自证
879. [苏房] 要件上传网格同一行卡片高度不齐：根因是右侧操作区被条件渲染、一列有一列没有
880. [苏房] 变更类详情页「修改」按钮不显示：必须用独立的 changeBizState，不能读备案单的 form.bizState
881. [苏房] 「一行三列」栅格失效：el-col 被 div 包裹就脱离 el-row 栅格上下文
882. [苏房] location-cascader 报 Missing required prop "region" 且历史区划不回显
883. [苏房] 弹窗改「一行一列」只改 span 无效：el-col 必须是 .zs-form 的直接子级
884. [苏房] 多步注册改「一步提交」：必须按各 step 的 DTO 逐条对齐，organType 与经营地址最易漏
885. [苏房] 注册页暂存续办/详情态上传附件的 busId 必须换成真实 companyRegisterId
886. [苏房] 字典未配置导致 el-radio-group 只有标签没有选项：固定语义状态改本地常量 options
887. [苏房] 表单跨列对齐不要用 el-row+span，改用 section-form 的 section-field / --wide / --full
888. [苏房] zs-select-column 全局注册与分页多选表契约：必须配 row-key，无用勾选列要删
889. [苏房] Cursor/Volar 在大文件上崩溃：用户拒绝加内存，改关校验与扩展的降载配置
890. [苏房] DetailTemplate 的「独占一行」字段必须把栅格游标归零，否则后续字段列下标错到第 3 列、label 不对齐
891. [苏房] zs-search-form 配置项漏写 model 会让 rules 与取值彻底脱钩（日期区间尤其容易踩）
892. [苏房] 校验规则依赖另一个字段（如收费类型）时：rules 改 computed + watch 触发重校验 + 动态 placeholder
893. [苏房] 列表页靠 ListTemplate 字符串 + 三段 replace 改造：同源页必须保持替换片段一致，不能各写一版
894. [苏房] 删除详情页子表 UI 后必须同步收敛提交载荷：全量替换语义下会静默清空历史数据
895. [苏房] zs-table 的 switch 自定义列固定宽度 60px 装不下开关，会画进右侧列（改 FIXED_TYPE_WIDTH 组件层）
896. [苏房] dev 环境图片 404：静态资源被主代理多拼 /v3.0，需拆出独立文件服务代理 + URL 规范化
897. [苏房] 经纪机构从业人员「已注销」态的操作列矩阵：只留查看+删除，状态判断要收进公共 helper
898. [苏房] 纯名称字段改下拉：复用注册页的品牌接口，并按名称反查回填 ID（详情只回传 brandName）
899. [苏房] Vue2 项目 this.dayjs is not a function：index.html 全局脚本引入 ≠ 挂到 Vue 原型
900. [苏房] 字典值的表格展示与打印/PDF 导出是两条链路：列上 type="dict" 覆盖不到打印稿
901. [苏房] 弹窗里「搜索/重置」按钮上下堆叠：全局满宽规则的副作用要在 element-ui.scss 里加 button 例外
902. [苏房] zs-dialog 弹窗内两列布局不生效的根因：.form-box 里 .zs-form > .el-col 被强制 100% 宽
903. [苏房] 操作列按钮配色档位约定：只有「删除」用 danger，次要操作只给 plain，禁用 type:'warning'
904. [苏房] Cursor 内存占用爆炸的排查套路：语言服务上限 + jsconfig 收窄 + 闲置窗口
905. [苏房] zs-search-form 搜索区列宽由 formItems 的 item.layout 决定，默认「只有 2 项时各占半行」
906. [苏房] 同页多个要件包（注册包 + 开业包）时必须逐包传 admin-type，且提交校验要覆盖每个 busCode
907. [苏房] 变更单详情用「合并主备案整表」做 fallback 会把主表 bizState 覆盖进 form，编辑态被永久禁用
908. [苏房] [苏房] 子表操作列手写 zs-table-column + fixed="right" 会让内容与相邻列叠字穿透，必须换 zs-operate-column
909. [苏房] [苏房] 下拉/候选数据源的接口选择：不能用 /page（只回第一页），要改 /listAll 并取 res.data
910. [苏房] [苏房] zs-tabs 重型子面板要用 v-if 懒渲染而非 v-show，且切到该 Tab 时首屏要主动拉数据
911. [苏房] [苏房] 合同章节里【】印文单选项要迁成字典下拉：mixin 加 loadDictOptions 批量拉字典，并核对历史值 == dictValue
912. [苏房] detailMixins 的 validateDetailRequiredParams 强塞 primaryKey，会让「不需要 id 的详情接口」被静默跳过
913. [苏房] 函数式/内嵌选择弹窗挂在 v-if 下时 watch(visible) 不触发首次加载：mounted 兜底 + buildQueryParams 只传有值字段
914. [苏房] 去多项目化改造：删 isSuzhouzhizai / currentEnvironment 分支的三类落法与残留自查
915. [苏房] SubTableToolbar 注册到 zs-tabs 页签栏后，按钮的 disabled/title 不随行勾选变化（Vue2 实例缓存导致祖先不重渲染）
916. [苏房] 新增页「一进页就弹提示」多因字典初始化函数里发了 message；依赖父字段的选择项要「先禁用、选完再开弹窗选择」
917. [苏房] 楼栋选房弹窗：房屋状态字段双命名归一后，展示与可选性判定必须同源
918. [苏房] zhi2-web-admin 构建报 Rollup failed to resolve import "element-ui"：element-ui 是全量 external，页面禁止直接 import
919. [苏房] 详情页查看态与编辑态字段数量不一致：contentInfo 的 add() 不能过滤空值
920. [苏房] Vue2 $options.data() 批量审计：按「被重置的子对象是否含 this.*」分级，不要一刀切改造
921. [苏房] 接口前缀禁止按当前路由名推断：同一页面的列表/弹窗/删除应固定同一个常量前缀
922. [苏房] 「查看」按钮灰显不等于权限问题：关联单号要 extractXxxId 多字段解析，并允许父单据 ID 兜底
923. [苏房] zs-dialog 宽度档位：zs-size=medium(1300px)/common(900px)/mini(616px)，页面禁止写死 width
924. [苏房] 企业端「变更」壳页面编辑态必须 show-back=false：返回会跳到无权限的 G 端列表
925. [苏房] [苏房] 表单子区块组件误 mixin detailMixins：每条实例都发 /undefined/undefined/detail 并拉无关接口
926. [苏房] [苏房] 「证号 + 隐藏外键 ID」成对字段：切父级必须清空、必填校验要落到 ID 上
927. [苏房] [苏房] 清空外键写成 undefined 会被 JSON.stringify 整体省略，后端收不到=解绑失败
928. [苏房] [苏房] 树+表二级联动的选择弹窗：zs-select-dialog 自定义 #left 插槽 + no-auto-query
929. [苏房] [苏房] 证明/证书类文件下载按钮：统一走接口拿地址，显隐看证明字段而非只看机构类型
930. [苏房] [苏房] 列表页把搜索项换成业务状态下拉：listMixins 的搜索缓存会残留已删除字段继续传给后端
931. [苏房] [苏房] 单据「复制/引用新建」的完整套路：sessionStorage 预填 + Vuex 来源单号 + 剥离审计字段
932. [苏房] [苏房] 改了提交接口默认值仍打旧接口：resolveSubmitApi 的「配置优先」链会覆盖回退值
933. [苏房] [苏房] 页面内「发起变更」后提交误用备案主键：operation-btn-group 缺省会回退路由 id
934. [苏房] V3 的 UI 约定靠 check:* 脚本门禁，全量 npm run lint 不能代表单个文件；label-width / label-position="left" 在模板中被禁
935. [苏房] 接口路径互为前缀时，E2E waitForResponse 用 includes 会误命中：改为 URL pathname.endsWith 精确匹配
936. [苏房] AmountInput 是 zs-input + v-money 而非 input-number：替换 zs-input-number 时会静默丢失 min/非负等数值约束
937. [苏房] 详情页顶栏用 operation-btn-group 的 form-mode-override="view" 固定只读态，不再自绘 detail-header
938. [苏房] 雪花 ID 精度丢失的另一类根因：getDetailParams 里主动 Number(this.id) 绕过了项目既有的安全 ID 链路
939. [苏房] 一份详情页同时承载备案与变更：busCode 用显式 resolve 函数按态区分，不再读菜单 meta.busCode
940. [苏房] 动作语义不同的弹窗不要复用通用「状态调整」弹窗，按模块规范新建专用弹窗
941. [苏房] 多来源详情页的附属只读字段没回显：主数据块取了但没写回 form，需统一的映射+空值补全函数
942. [苏房] 要件「查看态」与「编辑态」字段顺序不一致：排序规则只落在查看链路，应下沉到 utils 并让两态共用
943. [苏房] 金额小数位有两条通道：amount-input 的 dot 只管编辑态，查看态必须单独 formatter 格式化
944. [苏房] zs-table-column 不支持多级表头：模板未转发 default 插槽，分组表头必须用原生 el-table-column
945. [苏房] Unknown custom element: <pagination> 的根因是 mixin 里局部别名注册，解法是全局注册 zs-pagination 并批量替换标签
946. [苏房] [苏房] 老自研选择弹窗迁到 zs-select-dialog 的三处回归：treeKey 覆盖筛选参数、onOpen 抢跑查询、丢失链接直选
947. [苏房] [苏房] 弹窗表单双列栅格改造：嵌套顺序要 zs-form→el-row→el-col，且模板禁写 label-width（有 lint 门禁）
948. [苏房] [苏房] 字典类搜索项要用 type:'dict'，且异步字典加载后必须校验默认值是否在枚举内
949. [苏房] 同一业务字段在列表与详情绑定两套字典码：对账状态 reconciliation_state 的统一口径
950. [苏房] 附件要件「下载模板」：fileTemplate 逗号路径解析 + fetch→blob 下载能力下沉到 utils
951. [苏房] 派生字段（maxBatchNo+1）不回填的两类根因：旧构建未生效 与 草稿恢复覆盖自动计算值
952. [苏房] [苏房] 详情页 mixin 自动拼出的详情接口不存在：覆盖 init() 停发而不是改 moduleName
953. [苏房] [苏房] 网点新增弹窗宽度：去掉 zs-size="common" 改为 width="60%" 与同类弹窗对齐
954. [苏房] [苏房] 选择类只读输入框补放大镜：批量补齐 56 处 + 新增 check:dialog-picker-suffix 脚本门禁
955. [苏房] 详情页右侧抽屉（attachmentDraw）改用 el-drawer 遮罩模式，勿再把左栏 flex:1 撑开
956. [苏房] 已注销从业人员详情：工作牌/电子信息卡/凭证按钮统一收进公共状态 helper，附件编码与提交审批同源
957. [苏房] 父仓库 zhi2-web-admin 是 git 子模块：合并 origin/develop/v3.0.0 的冲突是子模块指针冲突
958. [苏房] [苏房] 「必填，提示要和展示一致」的正确改法：rules + prop 走表单校验，删掉 beforeSaveHook 里的 msgWarning
959. [苏房] 机械替换分页标签前先确认「去掉 mixin 别名后靠全局注册兜底」这条依赖链
960. [苏房] 给公共附件面板加薄包装层时，必须代理 validateRequired / refreshAppendix / $refs.appendix 三个实例契约
961. [苏房] 控件高度 token 化的落点：输入框在 zs-search-form、按钮在 QueryResetButtons，同读 --search-form-control-height
962. [苏房] 详情页表单标签布局的解析优先级：显式 label-position > platformConfig.formLayout，left 要映射成 Element 的 right
963. [苏房] 机构注销列表行政区划整列显示「-」：主字段 administrativeArea 为空，真实编码在 provinceCityArea
964. [苏房] 详情页 type:'tag' 字段显示原始 0/1：DetailTemplate 不会自动向上取字典，必须显式传 options
965. [苏房] [苏房] 不同表格页的「列宽/省略」需求必须收口到 zs-table 公共层，页面级 CSS 会造出两套相反口径
966. [苏房] [苏房] zs-table 逐列扫 DOM 测宽是列表卡顿的主因：默认走文本测算，全表重算要合并防抖
967. [苏房] 银行名单详情页网点/左侧树接口不能顺手换成 unionBank/page：与旧系统的联行号口径不同
968. [苏房] 薄包装（thin wrapper）弹窗里用 this.$parent.getList() 刷新列表会静默失效：改用 $emit('success')
969. [苏房] [苏房] 表头含「缴款」的编号列被 tableColumnMeasure 误判成金额列：显示 0.00 且右对齐
970. [苏房] [苏房] Web 附件上传格：el-upload 的 disabled 会连带禁用删除，不能拿「已满数量」去禁用整个组件
971. [苏房] zs-table 列宽「先渲染再拉伸」闪动的两个异步根因：rAF+setTimeout(16) 滞后均分 与 DOM 二次测量回写
972. [苏房] el-form 的 :model 用 computed 合并分离的 codeForm（验证码）是可行的，但需配 validateField/clearValidate 才不留双轨提示
973. [苏房] 「非目录顶栏菜单应收起侧栏」改造的三个漏点：/redirect 分支、移动端抽屉、侧栏路由未清空
974. [苏房] 证书类外键（规划许可证/施工许可证）入表单的约定：ID 与证号成对维护，clear 与切项目都要清 ID
975. [苏房] [苏房] 加密链路调试：解密后响应日志要挂在 request.js 的两处解密分支，靠 CRYPTO_ENABLED 开关且依赖构建期 esbuild.drop 清除
976. [苏房] [苏房] 表格「关 tooltip + 换行完整展示」不要在页面里整表覆盖 cell 样式，要收窄到列级 class
977. [苏房] Vue2 组件重写 detailMixins 的 init() 后，再在 created/activated 里无条件 reloadDetail() 会导致首次挂载重复请求
978. [苏房] 「只去掉某字段必填」时禁止把 rules() 整表清空：会连带废掉所有带 prop 字段的校验
979. [苏房] 详情页区块标题必须是 Headline：单个「交易明细」不要再套一层 zs-tabs
980. [苏房] [苏房] zs-dialog 拖拽残留内联定位/transform，导致二次打开不居中且压制缩放动画
981. [苏房] [苏房] 变更单页 add 模式下变更单 ID 不能回退 getId()/query.id，否则保存误走 update 并打错详情接口
982. [苏房] [苏房] detail-container 的 flex gap 会被隐藏遮罩组件占位：zs-tencent-map / SelectDialog 必须放到容器末尾
983. [苏房] [苏房] V3 接口规范化会把非白名单 GET 改写成 POST + body，前置校验的“GET 直打网关”假设必然落空
984. [苏房] [苏房] 按 key 取配置的接口把值放在 response.msg 而不是 data：改造前必须核对历史消费代码
985. [苏房] [苏房] 选房弹窗确认回填的三个必修点：全量替换、换项目清空、houseId 统一 String 比较
986. [苏房] [苏房] 服务端分页弹窗跨页勾选回显依赖 clearSelection/toggleRowSelection，zs-table 未透传时静默失效
987. [苏房] [苏房] 同一响应体解析口径不一致会让分页弹窗出现“表格空但 total>0”：统一 parseApiList(res.data ?? res)
988. [苏房] [苏房] 打印类按钮整块不渲染，先查 /print/config/printList 是否配了模板，而不是查权限或样式
989. [苏房] [苏房] zs-select-dialog 被传 show-checkbox=false / show-confirm=false 会静默去掉勾选列与「确定」，用户只看到「选择框没了」
990. [苏房] [苏房] 端别判定 terminalType == null 被当成 B 端：同一业务线的共用列表组件必须统一 terminalType === 'B'
991. [苏房] [苏房] 价格备案模块「所有子菜单一起改」：先查是不是共用一个列表组件，改一处即全域生效
992. [苏房] [苏房] 同模块页面上下文不能只按路由路径特征判定：buildNavigationByFilePath 跳到非 Template 路径导致范本内容误调 contractMainInfo/detail 返回 400
993. [苏房] [苏房] 附件弹窗不走附件配置时，upload 只传 busId+busCode、查看沿用 listAppendixPackage，按配置ID查的那条接口要一并删掉
994. [苏房] el-upload 用 :http-request 自定义上传时仍必须给 action="#"，否则控制台报 Missing required prop: "action"
995. [苏房] [苏房] 内嵌详情（弹窗复用 detail mixin）必须重写 formMode/getId/init 三处，否则外层路由 ID 会串成证书主键
996. [苏房] [苏房] 机构入网「按 organType 收窄字段」必须四件套同源：编辑表单、保存载荷、查看态 contentInfo、字典请求
997. [苏房] [苏房] 顶栏第一个目录显示成子菜单名：根路径菜单的展平要判 alwaysShow，不能在 ruoyi.js 无条件取第一个子菜单
998. [苏房] [苏房] 查看态要件卡片的红色必填星号要靠 operable 门控，不能靠改 DetailTemplate
999. [苏房] [苏房] zs-select-dialog 自带查询会把宿主预加载的 tableData 清空：自定义取数弹窗必须传 no-auto-query
1000. [苏房] [苏房] zs-table fill-height 的 syncFillHeight 兜底会误关满页撑高：判定必须与 shouldSparseAutoHeight 同源
1001. [苏房] [苏房] zs-dialog 页脚居中改全局会压过业务侧右对齐：新规范样式必须收进 form-layout 变体作用域
1002. [苏房] 弹窗提交前把「未声明的 prop / 只读 computed」写回 form，静默覆盖行数据，表现像「点确定没反应」
1003. [苏房] 弹窗提交前先 blur 当前控件再 $nextTick 里校验，修复「焦点还在输入框时必填校验读到旧值」
1004. [苏房] 「地址类字段一律占 2 列」是全站约定：复用 FORM_COL_WIDE / DETAIL_COL_WIDE / .section-field--wide，编辑与查看两处同改
1005. [苏房] 共享布局组件里的兜底列宽规则会压扁 span24 整行字段：加标记类豁免，而不是改全局断点
1006. [苏房] 变更单跳详情的 resolver 判定顺序：精确 busCode 查表 → 编码对称映射 → 文案模糊兜底（兜底必须最后且最窄）
1007. [苏房] [苏房] 子表数据组件 value/innerList 双向 watch 会形成 $emit('input') 回环，点击新增直接卡死页面
1008. [苏房] 机构基本信息页「不调接口」的根因是重写了 detailMixins 的 init()，且机构类页要主动拉数不要依赖 formMode=view
1009. [苏房] 删掉页面私有组件前必须全仓 grep 同名引用：changeDetail 与 detail 共用组件时会漏改
1010. [苏房] 别把通用详情页套进 presale-detail-section-stack：间距修好了但连带继承预售页整块皮肤
1011. [苏房] 注册页验证码字段走 el-form rules 必须先进 formModel：codeForm 子对象里的 prop 校验永远命中不到
1012. [苏房] [苏房] DetailTemplate 配 type:'link' 展示附件点击打不开：link 分支只认 item.link，附件 URL 字段必须用 type:'image'
1013. [苏房] [苏房] 详情表单只读字段 v-show 写在 el-form-item 上会留下空列：栅格占位在 el-col，必须把 v-show 移到 el-col
1014. [苏房] [苏房] zs-table-column 猜测式判定金额列（列名含「金额/缴款」）误伤文本列：金额对齐只认显式 formatter
1015. [苏房] [苏房] zs-table-column 的 statusScheme 分支必须在 bizState 硬编码分支之前，自定义列属性要从 $attrs 剥离
1016. [苏房] [苏房] 要件区「有的显示有的不显示」的根因是 adminType 受托人专属过滤，且配置端只配受托人要件时整块必空白
1017. [苏房] [苏房] 广域列宽清理要产出「残留复扫 + 裸变量引用」两份报告，并顺手把脚本泛化成可传标签名
1018. [苏房] [苏房] 要件宫格把分组首项错当纯标题 v-if 掉，隐藏了第一条可上传要件
1019. [苏房] [苏房] 注册页凭空出现的附件是其他人/E2E 的匿名上传被按 busCode 捞回
1020. [苏房] 弹窗表单排版铁律：不为换行去拉长字段宽度，用独立 el-row 起新行
1021. [苏房] 详情 Tab 子表只用到查看按钮时，混入整套 listMixins 会重复 init 并留下死代码
1022. [苏房] 「查看」类按钮依赖子单 ID 时：本地 ID 兜底 + 不要用详情接口回冲 sessionStorage 回传的 ID
1023. [苏房] [苏房] zs-select 单选圆点样式挂在 .single-choice 上是全局副作用；视觉单选但语义仍是 checkbox
1024. [苏房] [苏房] 弹窗查看态把固定高改成自适应高，会让「只滚内层」的策略失效、长内容被裁且不可滚
1025. [苏房] [苏房] 预售/现售共用楼幢子表的「同构列不同名」分流：variant prop + 现售列字段在 stock 库里压根不存在
1026. [苏房] 详情页子表组件型双请求：subTableMixins 的 created→getList 与父页 detailCallback 里 $nextTick(refresh) 重复拉同一列表
1027. [苏房] 登录页左右分栏被右侧 width:100% 撑开：flex 面板宽被显式宽度覆盖，线上「最新部署」也照样瘦不下来
1028. [苏房] 列表字段做点击跳转详情的「链接列」改造：列顺序前移到序号后 + 列类型改 link 走 listMixins.handleView
1029. [苏房] 列表姓名脱敏落地：maskPersonName 工具 + formatters/index.js 注入 + 分隔符/机构名/系统账号三个边界
1030. [苏房] 区划列回退链不能用 ?? 串：空字符串会阻断回退，且要先取 canonical 字段 administrativeArea
1031. [苏房] 楼幢表切幢加载「转圈变空白、表格闪灭」：v-loading 挂在 v-if="tableData.length" 的表格上 + 请求前清空数据
1032. [苏房] 楼盘表换数据接口（selectBuildHouse → listHouseGroupByFloor）后状态图标全灰的风险：映射函数没归一化状态字段，而 classes()/cellStyle 仍死判 == '1'
1033. [苏房] [苏房] 租赁开业页剔除注册要件：以配置所属 busCode 过滤，三条链路必须同源且依赖字段缺省会静默失效
1034. [苏房] [苏房] 服务方案收费标准的单位按 FEE_TYPE 字典标签派生，展示端与 Step4 需共用同一个格式化函数
1035. [苏房] [苏房] 弹窗内 Tab 外壳的 :deep(.tabs){overflow:hidden} 会裁掉 Tab 内容区的下拉/日期面板等浮层
1036. [苏房] [苏房] 登录页左图底部白条：JS 高度量算只按 CSS 最小高度而非表单真实高度，object-fit:contain 留白
1037. [苏房] [苏房] 下掉表单字段时连带清理弹窗取值代码 + 查看态字段 + 校验规则，并同步变更页副本
1038. [苏房] [苏房] 机构类业务字段区「查看不显示 + 编辑不保存」的双根因：organType 兜底判定 + getForm 漏字段
1039. [苏房] [苏房] 子组件裸用 el-form-item 而整棵组件树没有 el-form 祖先：详情页必现 elForm 未定义警告，且 3 列栅格会错位
1040. [苏房] [苏房] 服务方案「收费类型」下拉无选项：字典键写成了 charge_type，全项目实际是 FEE_TYPE
1041. [苏房] [苏房] 从业人员详情页「后台关联数据」子表在编辑态也只读：operable=false / disabled + 提交报文剔除，四件套一起改
1042. [苏房] [苏房] 从业人员新增页「保存基本信息后才出现」的后置模块：统一用主键存在性控制显隐，不要用 formMode
1043. [苏房] [苏房] zs-dialog 的 form-layout="single" 会把宽度锁死 500px，带表格的弹窗必须去掉它或显式指定档位
1044. [苏房] [苏房] 要件排序按 appendixConfig.sort 全表排序后 isMenu 分组标记错位：需明确 sort 是全局序号还是组内序号
1045. [苏房] [苏房] Vue2 SFC `<style scoped>` 里 `@import` scss 会触发 Dart Sass 弃用警告，改 `@use` 即可（纯类选择器场景行为不变）
1046. [苏房] [苏房] 列表「序号」列空缺（列有值但为空）：根因是把序号列写成 prop="billNo"，必须用 zs-table 的 type="index" + :index=tableIndex
1047. [苏房] [苏房] 查看态混入编辑控件：contentInfo 里把开关量配成 DetailTemplate 的 switch 类型会渲染成禁用复选框，应改默认 text 并按字段映射「启用/停用」
1048. [苏房] [苏房] 合同「有无」类区块（父母/未成年兄弟姐妹）必须互不级联，且字段误删后用 git log 反查被误清理的提交再原位补回
1049. [苏房] [苏房] 仓库根是 superproject + zhi2-web-admin 子模块：合并冲突只在子模块指针上，选「包含对方提交的较新 SHA」，env/.env 不入库
1050. [苏房] [苏房] 从业人员详情隐藏扩展区块：模块常量开关 + computed 短路 + 只加 v-if，禁止删模板或停加载（否则保存清空历史数据）
1051. [苏房] 共享 USCI 正则带 /g 会让 .test() 第二次起误判失败
1052. [苏房] 同一列表组件按 nodeType 区分「申请页 vs 审批页」时用条件展开列，审批页只留过滤不留列
1053. [苏房] 弹窗标题不要用 `${nodeLabel}审批` 拼接：按钮与标题共用同一文案常量
1054. [苏房] [苏房] v-show="isFormDisabled" 的空列问题要挪到 el-col，但它写在「仅 add/edit 才渲染」的 el-row 里是恒假死代码
1055. [苏房] [苏房] table.js handleDelete 必须写成 (row && row[primaryKey]) || this.ids：工具栏无参调用时直接读 row 必崩
1056. [苏房] 有无类字段的字典选型：用 have_or_not，误用 sys_include 会因无匹配值而显示原始码 0
1057. [苏房] [苏房] B 端隐藏搜索项的统一实现：isCompanyTerminal 计算属性 + formItems 展开过滤，terminalType 为空按 B 端处理
1058. [苏房] 多步注册步骤条 resolveIcon 的三态优先级：完成态必须优先 completeIcon，第 5 步缺 completeIcon 目前无影响
1059. [苏房] [苏房] 多行搜索栏右侧「搜索/重置」按钮与搜索项不垂直居中：isExpanded 的分行对齐与按钮偏移是两套口径
1060. [苏房] [苏房] 查看态触发 business watcher 的远端校验：从业人员详情一打开就弹「未查询到专业人员资格证书」
1061. [苏房] [苏房] 状态 tag 显示原始值 0/1/2 先查字典编码是否在后端配置：personnel_business_status 未配置 → 统一改用 biz_state
1062. [苏房] [苏房] 合同模块 pre/cash/suzhou2016 三章节对「房屋属性类」接口字段多为未消费：判定字段是否消费必须先按 contracts 目录切分再下结论
1063. [苏房] [苏房] 接口已返回的展示文案字段不能被前端派生函数无条件覆盖（currentNodeLabel 全列空）
1064. [苏房] [苏房] Headline 区块的「新增」按钮误放默认插槽：必须用 Vue2 具名插槽 slot="right"
1065. [苏房] [苏房] zs-search-form 容器 padding 与列间距 gutter 是两件事，改一处会让 borderless 态与有边框态漂移
1066. [苏房] 登录页侧图「表单高度自适应」：ResizeObserver 挂在被拉伸的盒上必然失效，要观测内容节点并用 scrollHeight
1067. [苏房] [苏房] ImageUpload 的 file-type 只接受 'image'/'video' 字符串，误传后缀数组会让 allowedTypes 变 undefined 并渲染崩溃
1068. [苏房] [苏房] Windows 仓库里出现名为 nul 的文件（Git Bash 里 `> nul` 的产物），会让 git add 报 fatal: mmap failed: Invalid argument
1069. [苏房] V3 图片/文件代理统一走接口代理地址：getFileProxyTarget 不再读 FILE_PROXY_ADDRESS
1070. [苏房] 本后台图片/静态资源地址解析统一收口在 resolveServerAssetUrl，改代理要连同它一起复核
1071. [苏房] 按「字段清单」调表单顺序只改 fieldPlan 构造器一处，查看态与编辑态自动同源
1072. [苏房] 公共 CompanyDialog 复用契约：出参只认分页格式 rows/total，换接口不必改组件
1073. [苏房] 合同范本号 contractNo 是前端本地状态而非签约入参：提交 saveContract 时必须剔除
1074. [苏房] el-upload 只走 :http-request 自定义上传时仍必须给 action="#"，否则每条附件都刷 Missing required prop
1075. [苏房] scripts/*.test.mjs 里复制了一份生产逻辑做断言：跑通是假绿，新增分支等于没有回归
1076. [苏房] 同一详情组件同时承载备案与变更时，getForm 的字段白名单会把变更单主键 personnelRecordChangeId 一起过滤掉
1077. [苏房] [苏房] 详情页子区块（子表/要件区）的「可操作」必须由 formMode 与业务状态双重判定，不能只靠父页 editable
1078. [苏房] [苏房] 弹窗子组件直接给 prop visible 赋值：父状态不归位导致「点搜索却调弹窗接口」
1079. [苏房] [苏房] 顶栏显示子菜单标题而非父目录：单子根菜单展平必须以 alwaysShow 为开关
1080. [苏房] [苏房] 注册表单行「输入框 + 查询/提取/重置」按钮把输入框压成细线：flex-wrap:nowrap 与 GIS map-append inline-table 的根因及整行化解法
1081. [苏房] Vue2 methods 用了 data() 未声明的状态：对 undefined 调用 forEach 报错（穿梭框/弹窗选中态）
1082. [苏房] [苏房] zs-table-column 的多选列必须和序号列一样走「固定类型列宽」分支，否则会被内容测宽+剩余宽度均分撑坏
1083. [苏房] [苏房] 主管部门弹窗内的附件不显示：AnnexUpload 只在 created 拉一次 + 附件业务编码兜底为空，须 v-if+key 等 ID 就绪后再挂载
1084. [苏房] [苏房] zs-search-form 审查口径：内层 #queryForm>el-row 会被折叠区全局 el-row/el-col 规则劫持，且 id 多实例重复
1085. [苏房] [苏房] Panel 类子组件切查看/编辑态的契约：isView 必须是 prop，写 formMode 会导致恒 false 静默退化成编辑表单
1086. [苏房] [苏房] DetailTemplate 的 amount/textarea 展示口径：表单规范里的 amount-input+unit 字段，查看态必须配 type:'amount', unit, dot:2，长文本必须 type:'textarea'
1087. [苏房] [苏房] 行内可编辑子表用 computed setter 当 v-model：zs-table 重算高度时 row 为 undefined 报 trainYear 渲染错误
1088. [苏房] [苏房] 详情页 textarea「整行」有两条独立链路，改一条会漏另一条且会打乱既有半宽 layout
1089. [苏房] [苏房] 变更管理列表「基本信息变更」按 organType 分派详情路由：开发/经纪/租赁三机构共用列表，硬编码开发企业路由会跳错
1090. [苏房] [苏房] 选项目回填统一社会信用代码为空：接口字段是 uniformSocialCreditCode，旧映射只认 companyCreditCode/enterpriseCreditCode
1091. [苏房] [苏房] zs-table 多选列(type=selection)必须固定 55px 且不参与剩余宽度均分，否则无数据时被拉宽与序号列之间出现大空白
1092. [苏房] [苏房] Web 弹窗自定义居中样式禁止对 .el-dialog__wrapper 的 display 加 !important（会压过 v-show 的内联 display:none）
1093. [苏房] [苏房] 公共子组件透传给底层组件的可选回调 prop 默认值必须给 noop 函数，不能是 null
1094. [苏房] [苏房] 自研选择弹窗多个副本共存时，改搜索区要同步全部副本，且调用方差异靠 outQuery 传递
1095. [苏房] CSS :has() 祖先选择器会给 v-show 隐藏的兄弟面板误判状态：切 Tab 时高度被错误收缩
1096. [苏房] [苏房] 系统用户管理页的端别/账号类型字段名是 accountType，没有 terminalType；accountType='4' 时禁止编辑
1097. [苏房] [苏房] 删掉项目级备案价接口后，定价弹窗的项目级上下限校验静默失效（校验器分支永假）
1098. [苏房] [苏房] 变更单详情：detailCallback 不 return 让 loading 提前结束，复用组件时 qualificationList 残留还会短路兜底请求
1099. [苏房] [苏房] zs-table 列宽抖动改造后必须补三处重测触发：字典异步、tableData 同引用、DOM 测宽锁定后忽略内容估算
1100. [苏房] [苏房] BuildingNodeDialog 靠 watch('$attrs.visible') 驱动弹窗：没声明 visible prop，补 prop 会静默失效
1101. [苏房] [苏房] DetailTemplate 三列栅格的列宽档位：FORM_COL_TWO(span12) 被归一成 1/3 宽，跨两列要用 FORM_COL_WIDE(span16)
1102. [苏房] [苏房] zs-dialog 弹窗去掉固定 height 后，内部「绝对定位 + height:100% 的 el-table」会失去确定高度源
1103. [苏房] [苏房] 弹窗内用 table-wrap 包裹 zone + absolute/height:100% 时，必须改传 height 或补 max-height，不能只改 flex
1104. [苏房] [苏房] 资质列表改 strict 校验后，重置表单必须重新注入「单条占位行」，否则用户填了仍被拦
1105. [苏房] [苏房] 表格列优先用列配置 + 全局 formatter 渲染，不要写插槽手搓 dictLabel/formatRatio
1106. [苏房] [苏房] 落地页 guard 的兜底必须「可解析」：resolve 失败仍 return { path: '/todo' } 会反复 next 同一路径空转
1107. [苏房] [苏房] zs-dialog 里给 wrapper 写 display:flex !important 会让 v-show 关闭的选择弹窗常驻页面（多页面底部冒空壳弹窗）
1108. [苏房] [苏房] v-hasPermi 包裹层留下空 flex 子项，在 OperationBtnGroup 的 gap 布局里撑出多余间距
1109. [苏房] [苏房] 要件附件的提交校验只按「必填配置缺失项」判定，不要再用 attachmentList.length 粗粒度守卫
1110. [苏房] [苏房] 附件扩展名校验用 includes 子串匹配，配置 doc 会把 docx 误拦（须精确相等）
1111. [苏房] [苏房] Vue2 页面 scoped SCSS 用 $--color-primary 等 Element 变量报 Undefined variable：变量只在全局注入处生效
1112. [苏房] [苏房] listMixins 的 skipSearchParamsCache 只管了 created，watch.query 仍会把详情内嵌子表的分页写进主列表搜索缓存
1113. [苏房] 本地改 env/.env 的代理不生效：实际被 env/.env.development.local 覆盖，且 Vite 只在启动时读 env
1114. [苏房] zs-table-column type="tag" 会按 prop 推导字典名而丢弃父级传入的 :options，需同步 dict-url 并让组件优先用 options
1115. [苏房] ZsButton 的 permission prop 是数组，直接传权限码字符串会 Vue warn 且权限判定失效
1116. [苏房] [苏房] 公共 xxx-row 布局改造要按 formMode 加修饰类：默认态对齐兄弟页，只给新增态放开高度
1117. [苏房] [苏房] 变更子表与旧字段并存时的三件套：读取取首个非空数组、提交剔除旧字段、合并字段保留子表主键
1118. [苏房] [苏房] 单页注册表单在必填校验外多一道「至少一个附件」守卫，导致法人+全非必填要件仍被拦「请上传要件附件」
1119. [2-0] 嵌套侧栏 E2E：menuItem.getByTestId('sidebar-leaf-link') 会捞到所有后代叶子，必须过滤为直接子级再递归
1120. [2-0] 侧栏叶子点击超时且报 subtree intercepts pointer events：折叠标题挡住目标链接
1121. [2-0] 顶栏+侧栏全菜单可访问性 E2E：须先确认登录态与 navbar-root，并考虑系统默认激活第一个顶栏
1122. [2-0] clickLeafMenusUnderParent：用 DOM 计数 + nth 顺序点 sub-menu a，断言失败只记录不中断
1123. [2-0] Playwright 相对路径 page.goto('/#/login') 报 Cannot navigate to invalid URL：缺 baseURL
1124. [2-0] 登录图形验证码 E2E：扭曲算式图用 Tesseract+规则纠错不可靠，测试环境应返回 answer 或降难度
1125. [2-0] Vue3 富文本：@wangeditor/editor-for-vue 用 next 轨 + shallowRef 持实例
1126. [2-0] vue-compat.js 在 Vite 下禁止写绝对 node_modules 路径
1127. [2-0] Element Plus el-dialog：#header 直连子节点，禁嵌套 #title
1128. [2-0] Vue3 局部异步组件必须用 defineAsyncComponent
1129. [2-0] Vue3 迁移：@*.native 修饰符全局改为组件事件或外层绑定
1130. [2-0] RecursiveMenu 侧栏 E2E：data-testid 三件套 + 块内按序点叶子
1131. [2-0] npm workspaces 下 pre-commit 勿用 npx 调 lint-staged
1132. [2-0] Vite 启动失败：ImageViewer 深链 element-ui 包内 .vue
1133. [2-0] 子模块 detached HEAD 上的业务提交迁回命名分支
1134. [2-0] RecursiveMenu 激活态侧栏图标跟文字同色
1135. [2-0] 父仓合并子模块指针：双方非祖先时用较新提交时间择一
1136. [2-0] BuildingTable 弹窗打开时单元表头全选不回显
1137. [2-0] zs-dialog 内多段内容被 flex 横排拆列
1138. [2-0] Vue3 迁移：全局禁用 this.$set
1139. [2-0] Vue3 表格列插槽语法与 zs-table-column 宽度计算
1140. [2-0] OperationBtnGroup 读取路由 meta.busCode 须安全访问
1141. [2-0] zs-date-picker Vue3 v-model 必须走 props 而非 $attrs
1142. [2-0] Vite 构建误解析带 slot 的模板节点
1143. [2-0] 产品2.0 弹窗显隐统一 v-model 与 modelValue
1144. [2-0] Playwright PC 三浏览器全量 E2E：video 全开、Windows 不配 WebKit、404 白名单与未登录断言
1145. [2-0] 侧栏目录型菜单 E2E：必须遍历全部直接子叶子，同 URL 用 main-content 文本变化判定跳转成功
1146. [2-0] Vite+Vue3 模板里写 require() 会在运行时报 ReferenceError: require is not defined
1147. [2-0] el-drawer 内表格：全局 element-ui.scss 取消表体内部滚动并加大单元格 padding
1148. [2-0] 嵌套 zs-dialog footer 溢出：calculateHeight 应设 height:auto 而非测量像素高度
1149. [2-0] zs-like-select 在可滚动 dialog 内：下拉改 position:fixed 并随滚动/resize 同步坐标
1150. [2-0] element-ui 走 CDN 时禁止 SFC import element-ui/packages/*，ImageViewer 需自研预览层
1151. [2-0] 嵌套 zs-dialog 内控件点不动：须抬内层 wrapper/遮罩 z-index，不能只抬 el-select-dropdown
1152. [2-0] ref=queryForm 的弹窗 zs-form：去掉 DetailTemplate 与 contentInfo
1153. [2-0] HeadTitle 支持 link 类型，契约对齐 detail-template
1154. [2-0] 招标方案详情关联招标备案编号跳转 localPropertyBid
1155. [2-0] Vue Router 4：全局 mixin 须用 currentRoute.value 读 query.formMode
1156. [2-0] [产品2.0] TagsView 标签无法跳转：router-link 带 custom 却未用插槽导航
1157. [2-0] [产品2.0] Vue3 + Element Plus 关闭图标：弃用 el-icon-close 字体类，改用 @element-plus/icons-vue
1158. [2-0] [产品2.0] 搜索区 zs-select 高度不齐：Element Plus 的 el-select 内层改为 .el-select__wrapper
1159. [2-0] [产品2.0] listMixins.data() 访问 this.$options.props 在 Vue3 部分场景会抛 undefined
1160. [2-0] [产品2.0] 无断点 el-col 批量补全：scripts/fix-el-col-breakpoints.mjs
1161. [2-0] [产品2.0] 弃用 ::v-deep 组合符：全局改为 :deep(inner-selector)
1162. [2-0] [产品2.0] Element Plus 2.x 中文语言包导入：勿用 element-plus/es/locale/lang/zh-cn
1163. [2-0] [产品2.0] HeadTitle 模板用 formMode 必须在 props 声明并由父级传入
1164. [2-0] [产品2.0] hash 路由 No match：访问路径缺 /#/ 或动态路由尚未 addRoute
1165. [2-0] [产品2.0] main.js 重复 createInstance 导致全局组件二次注册
1166. [2-0] [产品2.0] ElDialog 上挂运行时指令会 Teleport 失效告警
1167. [2-0] [产品2.0] 动态菜单 loadView 与 views 目录不一致时用路径兼容映射
1168. [2-0] [产品2.0] AppMain 中 transition 包 router-view 须用 v-slot
1169. [2-0] [产品2.0] DictTag 向 ElTag 传 type="" 触发校验失败
1170. [2-0] [产品2.0] Element Plus 按钮 size 不支持 mini，ZsButton 层做兼容映射
1171. [2-0] ECharts LineView 读 undefined.type：setOption 前归一化 series 数组
1172. [2-0] 动态路由首跳 No match found：constantRoutes 加 catch-all 消 warn
1173. [2-0] ZsTableColumn 卸载期异步回写：_zsUnmounted + 双生命周期
1174. [2-0] ElButton type=text 弃用：改 link 并在 zs-button 做透传兼容
1175. [2-0] MultiSelect 在 updated 调 resetInputHeight 导致递归更新
1176. [2-0] DictTag 把 listClass=default 传给 ElTag.type 触发校验告警
1177. [2-0] zs-table-column 字符串 formatter 勿透传 ElTableColumn
1178. [2-0] Web 图表重复 init：getInstanceByDom 复用 + resize 单次绑定 + dispose
1179. [2-0] ZsTableColumn 兼容字符串 formatter 并阻断透传
1180. [2-0] 跨目录复用子组件必须 import + components 注册
1181. [2-0] Element Plus 2.x：el-radio 选中值改用 value 而非 label
1182. [2-0] Playwright 单用例仅跑 Chromium 的命令
1183. [2-0] E2E 登录账号通过 .env.e2e 注入
1184. [2-0] 字典 find 无匹配时 dictLabel 要用可选链
1185. [2-0] ListTemplate 列 v-for 的 key 不能仅用 prop
1186. [2-0] file:eslint-rules 本地插件新增规则后 node_modules 未刷新导致 pre-commit 全量 ESLint 报 Definition for rule … was not found
1187. [2-0] zs-select-dialog 弹窗标题用 header 而非 title，与 company 侧 PaymentRangeTable 对齐
1188. [2-0] zsLikeSelect 点清除只清 UI 不清 form：watch selectedCompany 在空对象时同步 companyId/companyName
1189. [2-0] OpeningBuildingDialog 查询只在 originData 上 filter 不会发 listUrl：应走 queryOriginData 带筛选参数
1190. [2-0] accountOpen 业主页 costMap 可能为 null：用可选链取 sum 再与默认小计对象合并
1191. [2-0] accountCancel 详情 contentInfo 须与 zs-form 同字段：补上 reason 变更/销户原因（textarea 占满行）
1192. [2-0] ListTemplate 写死 operationColumnWidth：table mixin data 须提供默认 80，页面可覆盖
1193. [2-0] MultiSelect 等组件 $attrs.value 可能是数组：getter 禁止直接 split(',')
1194. [2-0] Element 懒加载树表删深层子节点后界面仍显示：删除/refresh 后 tableRenderKey++ 强制重挂载清 lazyTreeNodeMap
1195. [2-0] el-dialog插槽须直接子节点且用#header
1196. [2-0] 组件内动态导入defineAsyncComponent
1197. [2-0] bun dev element-ui 解析失败端口占用
1198. [2-0] 侧边菜单激活态图标颜色未随文字变主题色
1199. [2-0] npx 解析 lint-staged 路径错于工作区
1200. [2-0] 异步组件须用defineAsyncComponent
1201. [2-0] Driver引导须挂载全局属性防未定义
1202. [2-0] 弹窗mixin借$attrs透传v-model免声明
1203. [2-0] el-radio 选中值弃 label 改 value
1204. [2-0] Drawer 外漏须 Teleport 至 body
1205. [2-0] 接口路由改 dataProperty 须同步模块名
1206. [2-0] 弹窗单元勾选失效因缺v-model与watch同步
1207. [2-0] Vue2旧插槽语法在Vue3致构建报错
1208. [2-0] 路由meta未定义时直接访问致报错
1209. [2-0] 构建失败因slot提取错误与JS语法错误
1210. [2-0] 弹窗全局采用v-model替代visible绑定
1211. [2-0] 附件抽屉移除visible仅用modelValue
1212. [2-0] 替换 require 须全局扫漏并跑构建检查
1213. [2-0] zs-dialog 写死高度致嵌套弹窗溢出
1214. [2-0] 祖先 overflow 裁剪下拉改 fixed 定位
1215. [2-0] CDN 引 element-ui 致内包引入解析失败
1216. [2-0] 内层弹窗z-index低于父遮罩致点击失效
1217. [2-0] 路由4中currentRoute为Ref须取value
1218. [2-0] 列表项未判空直接访问value引发读取属性报错
1219. [2-0] currentRoute未取value直接读query致
1220. [2-0] Sass弃用警告需启用modern-compiler消除
1221. [2-0] 仅设自定义变量未改Element Plus致换肤失效
1222. [2-0] Vue3下this.$options为空致props报错
1223. [2-0] data中BpmnJS被Proxy代理致$pkg报错
1224. [2-0] zs-button映射不全致el-icon图标不显示
1225. [2-0] Playwright断言timeout为最大等待时长
1226. [2-0] hash模式路由缺/#/或动态路由未注册无匹配
1227. [2-0] createInstance重入致全局组件重复注册
1228. [2-0] 动态路由组件名与前端views目录不匹配
1229. [2-0] 组件空type传入ElTag致prop校验失败
1230. [2-0] permsMixin缺extraPerms展开致警告
1231. [2-0] ElInput非法size传mini/medium告警
1232. [2-0] ElInput size不支持medium仅允特定
1233. [2-0] ECharts series未定义致type读错
1234. [2-0] series假值未过滤致图表type读取报错
1235. [2-0] 权限路由未addRoute致No match告警
1236. [2-0] 字典default致ElTag type校验告警
1237. [2-0] 同DOM重复init致ECharts实例已存在告警
1238. [2-0] 计算属性find无果直取dictLabel报错
1239. [2-0] 资金代缴单位清除未清model致旧值残留
1240. [2-0] 查询处理仅本地过滤未发请求
1241. [2-0] costMap空值未防护致sum读取报错
1242. [2-0] 组件get直接split值将渲染报错
1243. [2-0] Vue2中data与computed同名属性致告警
1244. [2-0] v-bind数字传入String类型prop致警告
1245. [repository] 统计地图资产卡片图标按 label 关键词兜底匹配本地图片
1246. [repository] git pull --tags 报 would clobber existing tag 时强制同步本地标签
1247. [repository] Java Long 类型 ID 后端返回数字在 JS 会精度丢失，前端应定义为字符串
1248. [repository] 返回首页/取消回到登录页应先 removeToken 再 router.replace
1249. [repository] 接口需自行处理错误提示时用请求配置跳过全局错误 toast
1250. [repository] 列表接口返回结构兼容 res.rows 与 res.data 两种字段
1251. [repository] 本地开发端口被 Node 进程占用时终止对应 PID 释放
1252. [repository] 多语言显示异常先查语言包是否缺对应 key
1253. [repository] v2 接口网关前缀统一用 /api/v2.0 并由 nginx 代理
1254. [repository] 腾讯地图 TMap 多边形虚线边框用 borderDashArray
1255. [repository] 中文文件名上传仅某客户现场失败多为 Nginx/网关差异
1256. [repository] 预账号(isPreAccount)登录后跳转续填并改用 editAndSubmit
1257. [repository] Pinia persist 会恢复旧 token，需 onLaunch clear 实现每次重登
1258. [repository] 密码前端 AES(CBC+Pkcs7) 加密后再发登录接口
1259. [repository] 地图组件需 watch markList 深度重绘 marker
1260. [repository] ZsTable 透传 attrs 到 el-table，缺 row-key 会报警告
1261. [repository] listMixins 混入组件未定义 queryParams 触发 TypeError
1262. [repository] dict-tag value 类型须与字典 dictValue 一致(字符串)
1263. [repository] 弹窗表单详情优先、列表补空的合并回显
1264. [repository] 表格滚动改为整体 table-body 而非每行独立滚动
1265. [repository] el-dialog 在 scoped 里设 z-index 不可靠，要用 wrapper-class 提层
1266. [repository] H5 index.html 的 onload 会被 Vite 构建注入脚本覆盖
1267. [repository] vconsole 仅 H5+开发环境启用并统一打印接口响应
1268. [repository] 退出登录用 uni.showModal 二次确认并 @tap.stop 防冒泡
1269. [repository] watch detailData 默认 {} 为 truthy 会把表单字段置 undefined
1270. [产品2.0] [苏房] 附件「允许类型」是后端配置的逗号串字典码，报「文件类型不允许」先查配置回填而不是改前端 accept
1271. [产品2.0] 账单优惠新增/编辑：优惠方式双模式共用同一个输入字段导致「选金额没框、选比例填的是金额」
1272. [产品2.0] 账单批量收款改走 spOrder/createFromBill：billIds 统一数组 + useDeduct + 按 channelType 推 payMode，返回 url 决定扫码还是直接成功
1273. [产品2.0] 折扣弹窗附件「编辑下载不了 + 再次新增带出上次附件」的双根因：行内附件走临时 busId，弹窗复用未重置
1274. [产品2.0] 折扣明细「查看」应直接展示主表应收金额，不要在前端再减一次优惠（同一金额只算一次）
1275. [产品2.0] 侧栏收起后表格右侧留白/列宽不均：修法必须是「重新触发宽度计算并均分剩余列」，不是调 fit
1276. [产品2.0] Web E2E 稳定性约定：按元素可见性等待、股东弹窗用主行/操作行分别定位、地图下拉被向上弹出时改选点
1277. [产品2.0] 注册步骤返回/再前进：要件恢复必须先 loadConfig 再 loadUploadedList，并核对 appendixConfigId 匹配
1278. [产品2.0] spec 里用的测试身份证号必须校验位合法，否则股东新增被拦且报错指向业务而非用例
1279. [产品2.0] 账目查询模块新增/编辑落地：列表页直接用 ListTemplate、导出按钮走配置、子表组件自己声明全部模板变量
1280. [产品2.0] 同一表单/字段的「必填与禁用」判定要按业务确认，别按模块惯例一把锁死
1281. [产品2.0] Playwright 别在接口已返回后再 waitForResponse 等同一请求：白等满超时才被 catch 吞掉
1282. [产品2.0] 注册类全流程真实接口 E2E 的三处必改：唯一手机号、验证码从 Vue 状态读、附件配置缺失要显式报阻塞
1283. [产品2.0] 同一份 ToB E2E 用 PLAYWRIGHT_LOGIN_TYPE 切管理端/企业端，做不到的用例 test.skip 并单列跳过原因
1284. [产品2.0] 详情页按钮组跑到表单下方：.detail-container 用 column-reverse 会把所有「尾部」子节点顶到最上面
1285. [产品2.0] 企业端「变更」要按登录态设计：仅接 -/detail、-/update 会被权限码挡住 403，getLastByLogin 才是企业端合法入口
1286. [产品2.0] 批量把接口改成 /detail 会误伤动作类与统计类接口：改造前必须按「实体详情 / 查询 / 动作」三类分词
1287. [产品2.0] 产品化前端不要用环境变量配域名：后端相对路径资源统一用 resolveServerAssetUrl 按当前浏览器地址解析，且用 import 而非挂 Vue 原型
1288. [产品2.0] 列表页「导入」入口依赖导入子菜单路由：菜单没配就报「没有找到路由」，需探测式跳转 + embedded 内嵌兜底
1289. [产品2.0] 视觉走查基线：对「已部署线上环境」批量截图存 prod 图，本地 dev 截 local 图，靠同名文件配对人工/自动 diff
1290. [产品2.0] 详情页批量迁新框架的机器化清单：五条固定改造项 + 共用操作脚本 + 显式列出未改文件及原因
1291. [产品2.0] 注册件匿名上传不带 Token：过期 Admin-Token 反而 401，E2E 需先清 Token 再进注册页
1292. [产品2.0] 页面白底会盖住挂在 #app-main 上的水印（遮罩）背景：逐层把容器 background 改 transparent
1293. [产品2.0] 登录页改版改错分支：需从暂存区迁移到 262portal 并「基于目标分支逻辑重新整合」，同时保留 portal 专属接口
1294. [产品2.0] 行政区划下拉/级联不显示：zs-select 选项键是 dictValue/dictLabel，location-cascader 收单码不收逗号串
1295. [产品2.0] 接口清单文档必须按后端下发的真实菜单路由 JSON 校名，不要沿用户口述的菜单名
1296. [产品2.0] 用户偏好：同一个接口不要拆两个按钮，编辑态只留一个「保存」，由后端在 update 里完成状态流转
1297. [产品2.0] 首页/看板卡片区内空状态与内容块的撑满约定：空态用 flex:1 + 双向居中，背景图要延伸到容器右缘
1298. [产品2.0] V3 接口规范化的脚本化批量迁移：三轮脚本的边界与残留写法口径
1299. [产品2.0] AmountInput 去掉 el-input 换原生 input 后必填/离焦校验静默失效：需手动向 ElFormItem 分发 el.form.blur
1300. [产品2.0] 带单位后缀的金额输入框高度异常：zs-input 默认 clearable 产生的 el-input--suffix
1301. [产品2.0] 真实接口 E2E 遇「审核中/在途」数据：用管理员账号驳回后复用该数据续跑，优于 skip
1302. [产品2.0] 弹窗表单里 el-row 必须包在 zs-form 外面，套在 zs-form 内部会把输入框压窄、placeholder 显示不全
1303. [产品2.0] 新增态隐藏配置型子表：用 v-if="formMode !== 'add'" 控显隐，同时从提交体剔除该字段
1304. [产品2.0] zs-table-column 内嵌 zs-select/zs-input 等复杂控件时列宽被压到约 80px，表头与单元格全截断，改用 min-width
1305. [产品2.0] Vite 报 [sass] expected selector 先查 SFC 里多个 style 块前一个是否漏写 </style>
1306. [产品2.0] V3 后台真实接口 E2E 跑开发企业 CRUD：新手引导遮罩未被自动关闭 + describe.serial 让一条 skip 阻断后续用例
1307. [产品2.0] 增删改入口用弹窗还是整页，按「字段总数」定档（<6 字段用弹窗新增），且不要把详情也改成弹窗
1308. [产品2.0] zs-tabs 要下划线 Tab 时用新增的 type="line" 变体，不要改默认 card 或逐页 :deep 覆盖
1309. [产品2.0] 详情页 Tab 内的子表工具栏：按钮放 Headline 的 #right 插槽，同时去掉 position:absolute 与操作列 fixed:right
1310. [产品2.0] 子表操作列的「操作」两字被裁/错位：改公共 zs-operate-column 的列宽兜底，不在各业务表上调 width
1311. [产品2.0] 三个租赁合同备案模块的列表说明文字：统一成「橙色警告图标 + 深灰正文、只有关键词标橙」，并内边距 8px
1312. [产品2.0] 跨角色全流程 E2E 录屏为空：企业端发起与管理端审核必须拆双账号登录，缺账号要在 beforeAll 直接报错而不是 skip
1313. [产品2.0] 租赁合同的路由判定标志别塞进 main.js 全局 mixin，独立成 leaseContractMixins 由子表/弹窗按需继承
1314. [产品2.0] 详情页两栏区块换顺序：编辑与查看两套声明必须同步换，子表数据加载与回传不能跟着删
1315. [产品2.0] zs-dialog 内 zs-table 左右缺 padding：不能逐弹窗补页面样式，须在 zs-table 组件层公共容器加水平内边距
1316. [产品2.0] 小范围修复要同步到多条版本分支时，用 cherry-pick 修复提交而不是全量 merge
1317. [产品2.0] 表格 border=false 仍显示列竖线：全局样式无条件给单元格加 border-right，压过了 el-table 的 border 开关
1318. [产品2.0] 门户(p/portal)接口族与后台接口族混淆导致 1400「HTTP请求方法不支持」：路由重写与请求方法同时核对
1319. [产品2.0] 迁移苏州原代码的审批流组件到 V3：$--color-primary 等 SCSS 变量未注入直接编译失败，详情页整页进不去
1320. [产品2.0] 变更详情「form 只放变更单、beforeForm 只放对比字段」的双数据源契约（产品2.0 版）
1321. [产品2.0] 变更详情不该重复调备案 detail：同一单据被两次取数时先问「谁的状态说了算」
1322. [产品2.0] 产品2.0 企业侧 busCode 编码族实测表：审核页 040900 与注册要件 040100 是两个编码
1323. [产品2.0] 跨账号（企业提交 → 管理员审批 → 企业回验）全流程 E2E 的四步串行写法
1324. [产品2.0] 产品2.0 的 npm test 不是单测，是 vite build --mode test；项目无任何单测框架
1325. [产品2.0] zs-table 改槽位命名导致的 this.xxx is not a function 是多页面回归，判定应看“首个变更提交”而非当前页代码
1326. [产品2.0] 表决项等子表的增删可操作性要按单据 bizState 判定（提交审核后转只读），列表/详情两层都要拦
1327. [产品2.0] dialogMixins 只提供 close()，模板写 @close="onClose" 会报 Property or method "onClose" is not defined
1328. [产品2.0] 企业端 E2E 降耗时：同日流程合并成单次登录 + test.step 保持分步可读，跨账号场景才保留重登
1329. [产品2.0] 登录页从 assets 迁进 views 后整页控件尺寸全坏：补回 scoped/选择器层级，别指望输入框高度自动继承
1330. [产品2.0] 登录页/顶栏 LOGO 优先级链：后台可配置 sysLogo 覆盖内置静态图（保留 defaultLogo 兜底并作为公开页回退）
1331. [产品2.0] [苏房] 带小计行的横向滚动表：右侧固定操作列被小计数据穿透，遮罩伪元素的 bottom 必须留 1px
1332. [产品2.0] [苏房] zs-select-dialog 的 rowKey 误用不存在的字段会让所有行 key 全为 undefined，选中后整表高亮
1333. [产品2.0] [苏房] 文件凭证类字段的正确承载方式：查看态走 DetailTemplate 的 type:'image'，编辑态用 ImageUpload，底部不再单挂缩略图；后端只给 fileId 时前端要补 URL
1334. [产品2.0] [苏房] 子表列与弹窗/表单字段必须共用同一份字段定义：分别维护必然漂移，且列 prop 易错填成相邻字段
1335. [产品2.0] [苏房] 后台列表页块间间距与操作栏对齐统一写进全局 index.scss（lease-contract-list / list-card-header），页面不各写一套
1336. [产品2.0] 产品2.0 分支拓扑与改动落点：261/262 选主干、262-yulin 为在用环境分支
1337. [产品2.0] 可搜索下拉（远端 keyWord）失焦必须回全量：用 el-select 的 visible-change 复位并清防抖
1338. [产品2.0] 本地正常、生产布局错乱的弹窗提示语：vite build 产物会改变 scoped 作用域属性，本地 dev 验证不可信
1339. [产品2.0] 详情页加「终止」按钮带数据跳转：新建页走列表路由+/add，并按来源主键主动取数
1340. [产品2.0] 左树+右内容两栏页的左栏高度必须锁成视口剩余高度，靠 flex 拉伸 + min-height:0 + 内部分区滚动
1341. [产品2.0] 详情页子表按「未就绪的主键」发请求：路由复用残留旧 id + detailCallback 浅合并不覆盖，导致查到别人的数据
1342. [产品2.0] B 端项目上下文（complexId）的注入口径：列表在 getQueryParams 按 terminalType 注入，详情新增态只在缺值时从 store 兜底
1343. [产品2.0] 批量操作表格的「可勾选」与「能否执行某操作」必须拆成两层判定，否则已支付账单永远选不中
1344. [产品2.0] 城市/项目专属的视觉素材不能进代码仓库：抽成 platformConfig 配置项，后端下发、未配置则不渲染
1345. [产品2.0] 下拉/选项列表「静默为空」的根因：`response.data || response.rows` 在 data 为对象时短路取到对象，.map() 抛错被空 catch 吞掉
1346. [产品2.0] 选项列表接口选型的纠偏：确认 list 接口存在后不要顺手换成 /page 或加本地状态过滤
1347. [产品2.0] 生产环境「后缀高度与输入框不一致」的双根因：align-self:stretch 撑高 + index.html 异步链式加载 CSS 的顺序竞态
1348. [产品2.0] 支付状态轮询不要调 queryOrderStatus：用订单详情接口的 payState 判定已支付
1349. [产品2.0] 登录密码加密曾被整段删除：恢复时 Key/IV/模式必须与历史 bug43754 版本逐字节一致
1350. [产品2.0] 同一修复分发到多条发布分支：子模块 cherry-pick 单提交 + 父仓库逐个更新指针，yulin 分支要补一次指针纠正
1351. [产品2.0] 多模块共用同一弹窗时，业务类型靠父页显式传 prop，禁止从路由名 / 目录名推断
1352. [产品2.0] 「保存」与「提交」按钮的显隐不能只看主键是否存在，要看单据是否已真正落库
1353. [产品2.0] 并行迁移（旧项目 → 新项目）时必须有字段命名与时序的映射台账，否则同名不同义会静默错查
1354. [产品2.0] [苏房] 详情模板「变更前原值」角标：多字段差异比对 + 原值对象的格式化同源 + 社区选项异步合并
1355. [产品2.0] [苏房] 表格行悬停色统一：固定列与操作列是独立 DOM，悬停态必须跨表体同步
1356. [产品2.0] [苏房] E2E 清会话先判当前页协议：about:blank 上调 page.evaluate 清 storage 会抛 SecurityError
1357. [产品2.0] [苏房] 能力开关走 getCustomConfig：按「模块名→配置键」两级取值，不用布尔强制转换
1358. [产品2.0] 公共收益模块没有 pubFinanceManage 聚合页：财务能力散落在标准账套/凭证模板/交易生成凭证三处，且「选择会计科目」只是凭证模板里的 treeTable
1359. [产品2.0] 同一套记录流程页被维保/巡检/年检三入口复用：列标题按 recordType 查 enums 表，不得在模板里写死
1360. [产品2.0] 详情页迁新版框架：operation-btn-group 传 primaryKey（业务主键字段名）而非主键值，且详情页只传 moduleName/businessName
1361. [产品2.0] 弹窗打开即预拉依赖数据，会让主接口请求体被误读为「多了查询条件」：渠道查询参数必须与同类弹窗同源
1362. [产品2.0] 下载类接口按「ID 归一化 + 统一 GET 下载器」实现：后端可能回完整路径也可能只回 ID
1363. [产品2.0] 页面挂载的审核按钮不出现：zs-approval 只认路由 meta.busCode，实例编码要显式覆盖
1364. [产品2.0] 「列表框总丢」别反复改样式：先在分叉分支上按页对比容器结构，合并定制分支时 list-card 会被吃掉
1365. [产品2.0] 同一模块内审批流分叉：用 OperationBtnGroup 的 show-approval 按页面关闭公共审批按钮
1366. [产品2.0] 详情页某字段查看态整行不显示：contentInfo 的 visible 短路 + detailCallback 只取 data.summary 双根因
1367. [产品2.0] V3 请求拦截器会把「路径末段不像动作」的 POST 统一补成 /add：编辑保存会静默打到新增接口
1368. [产品2.0] Vite 代理失效的第二类根因：代理 context 缺前导斜杠会永远匹配不上
1369. [产品2.0] 同一业务拆「报事/报修」两个菜单：共享 index/detail + orderType prop 的薄包装套路
1370. [产品2.0] 列表/弹窗自动带出区域账户要分角色：管理员不该继承左侧区域树，B 端才自动带
1371. [产品2.0] 「弹窗少字段就改单列」不是 8 字段阈值，而是用户点名的小字段弹窗不要铺双列
1372. [产品2.0] zs-select-dialog 嵌套分页不生效：自定义插槽内的分页组件脱离弹窗分页上下文
1373. [产品2.0] 只改「提示语布局」的 UI 需求要按白名单执行：其余改动全部回退
1374. [产品2.0] 多分支修复的交付形态：全量 merge 冲突多时改 cherry-pick，且父仓库与子模块逐分支成对更新
1375. [产品2.0] DetailTemplate 附件字段必须配 type:'image'：type:'text' 只渲染路径字符串，点不开也无法预览
1376. [产品2.0] E2E 里用 page.request 直连业务接口必须显式补 Authorization：不会自动带 sessionStorage 里的 Token
1377. [产品2.0] 详情页在新增态误调新增接口：$get 资源根路径被规范化成 POST /xxx/add + 空 body
1378. [产品2.0] 用 dialogMixins 的弹窗必须补齐 primaryKey/moduleName/businessName，否则详情保存仍打旧 REST 接口
1379. [产品2.0] 列表页迁 ListTemplate/listMixins 的映射口径：URL 拆 businessName、权限串拆 permsPrefix、自定义流程靠 baseTemplate.replace
1380. [产品2.0] 多分支并行（v2.6.1/v2.6.2）合并丢代码的定位与恢复流程：按目录比对差异文件数，再单提交恢复
1381. [产品2.0] 页内编辑态折叠成「只红框字段可编辑」：抽 isBaseFieldReadonly 谓词，不要在模板里逐字段写 disabled
1382. [产品2.0] B 端登录强制选物业管理区域这类「登录后行为」，必须做成 projectContext.js 里的显式开关常量
1383. [产品2.0] apiV3Normalize 的「路径末段当参数」规则要按路径段数分级：4 段以上全量迁移，末段 /detail 跳过
1384. [产品2.0] B 端业务列表按小区隔离数据：统一用 isBTerminalPractitioner 门控 + currentProjectId 传 propertyProjectId
1385. [产品2.0] 子模块提交被 pre-commit 拦在「缺依赖文件」：从来源分支补文件纳入提交，而不是跳过钩子
1386. [产品2.0] 产品2.0 表内已有汇总行时，表底「合计」条要用 :should-render-bottom-summary="false" 关掉（否则合计重复出现两次）
1387. [产品2.0] 详情/子表字段数少于 6 个时改成弹窗承载（zs-dialog zs-size="mini" + DetailTemplate 查看态），列表保留操作列不走详情页
1388. [产品2.0] [苏房] 筛选项能选却查不动：getQueryParams 里硬写默认值每次查询重置条件
1389. [产品2.0] [苏房] ImageViewer 挂在 App 常驻，el-dialog 缓存首次的 zIndex，写死 z-index 也压不过后续业务弹窗
1390. [产品2.0] [苏房] keep-alive 首页 tab 与统计数字错位：:key 强制重渲染 + 请求序号保护 + activated 重置
1391. [产品2.0] 同一模块存在两份同名 api 文件（pricehouse/ 与 presale/）时，接口路径改动只改一份 → 详情页 Tab 静默不调接口且模板读 undefined.length 报渲染错误
1392. [产品2.0] 操作前置守卫依赖列表行缺失的关联 ID 会静默拦截整条操作链
1393. [产品2.0] 自动默认账户必须沿「协议→账户」依赖链串行查询，并行各自过滤状态会命中已终止协议
1394. [产品2.0] 前端下线字段但后端仍必填：undefined 字段被 JSON 序列化省略，需提交前映射或后端同步放宽
1395. [产品2.0] OperationBtnGroup 内置 ZsSubmit，插槽里再手写提交按钮会出现双「提交」
1396. [产品2.0] Portal 菜单路由改为后端直出 Router 树（/portal/menu/listRouters）+ portalApiRewrite 重写规则
1397. [产品2.0] 聚合类子表明细查询必须显式传 bizState=2，只取已备案数据
1398. [产品2.0] [产品2.0] DetailTemplate type:'amount' 的 value 直接绑 form 原始字段，禁止 amountFormatter 预格式化
1399. [产品2.0] [产品2.0] 腾讯行政区划接口缺开发区/功能区 GeoJSON：本地补丁目录按市级 adcode 合并只补缺
1400. [产品2.0] [产品2.0] Excel 导入接口的部分失败约定：errorReportUrl 有值即提示 errorSummary 并自动下载错误报告
1401. [产品2.0] [产品2.0] 扫码收款链路约定：createFromBill → payInfo(CSCANC) → 轮询 queryOrderStatus
1402. [产品2.0] [产品2.0] public/sign.js 加签脚本与 API 前缀双写同步约定
1403. [产品2.0] [产品2.0] 账单两段式导入约定：/import 拿 importId 预览，/import/confirm 收尾
1404. [产品2.0] [产品2.0] 流程节点面板候选组回显丢失：watcher 首次赋值误清空，需 oldVal 判空 + val!==oldVal
1405. [产品2.0] [产品2.0] 树+筛选+单选表组合弹窗：single-choice 圆形样式须限定 .el-table 内，避免污染左侧多选
1406. [产品2.0] [产品2.0] 街道/社区编码配名称字段的公共工具 regOrg.js 与各模块社区编码口径差异
1407. [产品2.0] 同页面申请/查询分流的按钮显隐判定：按 routeKey 判定，不要按菜单 meta.title 文字分流
1408. [产品2.0] 选择弹窗 125% 浏览器缩放下最后一条数据滚不到：tableTrCount 写死小于 pageSize + 固定行高与实际渲染偏差
1409. [产品2.0] 慢三方支付接口的交互套路：先弹窗占位、异步拉二维码、失败给刷新按钮重试
1410. [产品2.0] el-tabs 状态筛选「全部」不能用空字符串 name：会被写成 Tab 索引 0
1411. [产品2.0] 顶栏标题区不能复用 --sidebar-width：收起侧栏会把标题裁没，需解耦为固定展开宽度变量
1412. [产品2.0] [产品2.0] BPMN 流程设计器：点画布空白/保存失败会清空「指定人员」的三层根因与修法
1413. [产品2.0] [产品2.0] el-upload 设 :limit=1 后「再选文件替换」必须走 on-exceed，on-change 根本不触发
1414. [产品2.0] [产品2.0] DetailTemplate type:'image' 按 URL 后缀判图，无后缀地址退化成链接；用 type:'images' 绕过
1415. [产品2.0] 详情页骨架依赖 .detail-container 的 column-reverse：页头必须放进 detail-container，套 list-container 会掉到页底
1416. [产品2.0] 详情页只有 DetailTemplate 没有编辑表单时，「编辑/保存无反应」的根因是 $refs.form 不存在被校验静默拦截
1417. [产品2.0] 本项目的「验签」与「加解密」是两套独立链路：sign.js 全局拦截 XHR/fetch 取 /api/v3.0/secret/key，移除要删文件+index.html+vite external 三处
1418. [产品2.0] [产品2.0] 单接口超时覆盖套路：axios 请求级 timeout + enums 常量，不改全局 100s 默认
1419. [产品2.0] [产品2.0] 版本分支修复约定：沿 261→262→262-yulin 链定位引入点，上游修完 cherry-pick 到下游
1420. [产品2.0] [产品2.0] 外链型菜单组件（B端SSO跳转）必须走 InnerLink 同款外链规范化，否则报「没有授权菜单」
1421. [产品2.0] [产品2.0] 业委会/筹备组候选人身份标识是两套字典，非业主跳过不动产校验
1422. [产品2.0] [产品2.0] 登录报 CryptoJS undefined：全局加密脚本存在但 index.html 漏引 script 标签
1423. [产品2.0] money 指令粘贴被 maxlength 截断：必须 preventDefault 先去千分位再写入
1424. [产品2.0] DetailTemplate 查看/编辑两态 layout 语义不同：查看态 16 映射整行、8 映射半宽
1425. [产品2.0] [产品2.0] this.download 固定走 POST：GET 下载接口必须用 downloadGet
1426. [产品2.0] [产品2.0] 生产保持相对路径 api/v2.0，Vite 代理 key 单独补前导斜杠
1427. [产品2.0] [产品2.0] 树形接口无 total 时 zs-pagination「共 XX 条」整块被隐藏，需递归计数兜底
1428. [产品2.0] zs-table-column 的 dict-url kebab 写法不被读取，且 prop 驼峰自动转下划线推导字典名
1429. [产品2.0] 项目部署在 /sz/ 子路径：地址一律自适应相对路径，禁止写死前缀（含 version.json）
1430. [产品2.0] 后端相对资源路径（/zhi2/...）在子路径部署下的解析套路：new URL 相对 location.href
1431. [产品2.0] portalApiRewrite 接口重写依赖前导斜杠：懒加载路径缺 `/` 会静默漏匹配
1432. [产品2.0] getByKey 的参数键归一化必须加在 ACTION_PARAM_KEY_OVERRIDES，加在 ACTION_PATH_PARAM_KEYS 不生效
1433. [产品2.0] 操作列按钮必须复用 mixin 的 viewButton/editButton/deleteButton， zs-operate-column 需带 moduleName/businessName
1434. [产品2.0] 区域树列表页统一复用 RegionTreeLayout：parentDeptId 传参 + shouldDeferListForRegionTree 延迟拉列表
1435. [产品2.0] zs-select-dialog 默认强制 bizState:2，注册类免过滤接口必须显式 :noBizState="true"
1436. [产品2.0] [苏房] zs-approval 审批请求体必须带 path，且 path 要声明为 prop
1437. [产品2.0] [苏房] zs-table-column 自定义插槽列被排除出自动测宽，无宽度列吸走剩余空间成大片空白
1438. [产品2.0] [产品2.0] 顶栏「首页」永远高亮：methods 方法被当属性用（漏括号恒 truthy）
1439. [产品2.0] [产品2.0] zs-select-column 默认跨页保留选中，批量操作会带上已翻页的旧选中
1440. [产品2.0] [产品2.0] 输入框 append 区「手工输入」点击无反应：状态未声明 + @focus 抢点击
1441. [产品2.0] [产品2.0] Blob 下载接口的 JSON 错误兼容：downloadBlobFileWithCheck + 错误拦截器解析 Blob
1442. [产品2.0] [产品2.0] ZsButton 不吃布尔 permission：v-bind="attrs" 会把按钮配置里的 permission:false 透传触发类型警告
1443. [产品2.0] [产品2.0] 接口前缀批量迁移（maintenance→dataProperty）：moduleName+businessName 拼接调用也要换，且防误伤 @/views import
1444. [产品2.0] [产品2.0] dialogMixins 声明 id 为 prop 后 $attrs.id 恒 undefined：弹窗取主键必须用 this.id
1445. [产品2.0] [产品2.0] DetailTemplate 对齐规范：垂直居中 + 横向左对齐，字段禁止单独居中
1446. [产品2.0] [产品2.0] 真实接口 E2E 报「该业务未配置流程」是后端工作流缺失，不是前端/脚本问题
1447. [产品2.0] [产品2.0] 已全局注册的 zs 组件（如 zs-tencent-map）禁止再局部 import：路径写错即 Vite resolve 失败
1448. [产品2.0] 跨层传递的业务标志/列注册契约断链会静默失效：入口 v-if、ifHistory 透传、zs-table 弹性列注册
1449. [产品2.0] 模板 :class 绑定 methods 方法引用恒为 truthy：导航「首页永远高亮」的静默根因
1450. [产品2.0] [产品2.0] 子表弹窗「必填规则来自程序步骤配置接口」的接法与 detailCallback 二次同步
1451. [产品2.0] [产品2.0] zs-select-dialog 混入 table mixin 会与组件 prop `selectable` 同名冲突，应混 tableComponents
1452. [产品2.0] 加密/V3 POST 化改造后 GET→POST 迁移的三类请求体坑（空 body、路径参数、字典 body 形态）
1453. [产品2.0] Windows 大小写不敏感掩盖 import 路径大小写错误，Linux CI 构建必挂
1454. [产品2.0] 数据量不可控的 zs-dialog 弹窗必须显式 max-height + 内容区滚动，否则关闭按钮被顶出视口
1455. [产品2.0] 弹窗提交的 close() 只放 then+code==200 分支时，接口 reject 会静默导致「确定后关不掉」
1456. [产品2.0] 列表页行政区域筛选的标准接入：area mixin + region-select 搜索项类型
1457. [产品2.0] 子表按角色禁用操作按钮：重写 multiDeleteButton + handleDelete 双层拦截
1458. [产品2.0] ZsTencentMap 弹窗报 TMap is not defined：SDK 异步加载未等待，onOpen 必须 await loadMap()
1459. [产品2.0] ListTemplate 模板绑定 tableRowStyle 但 table.js mixin 未定义：模板引用的绑定必须在 mixin 有默认实现
1460. [产品2.0] [产品2.0] 树状/平铺双展示模式切换必须清理「模式专属筛选字段」，否则旧筛选残留
1461. [产品2.0] [产品2.0] getId() 解析路由主键必须排除 /add 等动作段，否则新增页拿到假主键
1462. [产品2.0] [产品2.0] 只读详情附件点击的三分流套路：图片后缀白名单 / PDF 新窗口 / 其余 fetch blob 下载
1463. [产品2.0] [产品2.0] detailMixins 已内含 form+area：页面再引 area 是重复合并，data 不得重复声明 mixin 已有字段
1464. [产品2.0] [产品2.0] listMixins 列表页不消费 $route.query：重写 init() 在 getList 前同步路由参数
1465. [产品2.0] [产品2.0] 选关联数据回调写字段与跳转读取字段不一致导致点击跳转静默失效
1466. [产品2.0] [产品2.0] 404 全局拦截约定：beforeEach 拦 to.path==='/404' 改提示，不再渲染 404 页
1467. [产品2.0] [产品2.0] Vite 下 public 目录资源必须用 / 绝对路径，写 public/ 前缀会让构建报模块解析错误
1468. [产品2.0] [产品2.0] 腾讯地图多边形坐标串按错误分隔符解析成 NaN，所有 LatLng 构造必须走安全校验函数
1469. [产品2.0] [产品2.0] 查看态模板字符串手拼单位会让 undefined 变成「undefined㎡」，数值字段必须走 type:'amount' + unit
1470. [产品2.0] [产品2.0] el-table 固定列单元格样式必须走 class-name + 非 scoped 样式
1471. [产品2.0] [产品2.0] 子模块指针合并冲突：先查祖先关系再决定保留哪边，不重做子仓 merge
1472. [产品2.0] [产品2.0] 详情页模式标志是 detailMixins 的 formMode，不是弹窗子组件的 dialogMode
1473. [产品2.0] [产品2.0] 对象 prop 传 null 不会走 default: () => ({})，常驻弹窗渲染期崩溃
1474. [产品2.0] [产品2.0] 子表弹窗 form 必须用工厂预定义全字段：Vue2 后加属性非响应式导致选银行不反显
1475. [产品2.0] [产品2.0] Vite 代理 rewrite 契约：只剥 /api 前缀、保留 /v3.0，经 frontend-proxy 响应头验证
1476. [产品2.0] [产品2.0] 详情回填复用级联 change handler 会清掉下游字段：shouldReset 参数区分手动切换与回填
1477. [产品2.0] 跨系统跳转携带 errorMsg 的解析套路：location.search 优先 + $route.query 兜底
1478. [产品2.0] 「旧数据允许补填字段」的编辑门控必须以 detailCallback 时的 originForm 快照判定
1479. [产品2.0] 双视图选择弹窗（列表 + 楼盘表）的选择结果形态不同，统计/提交必须按视图分流
1480. [产品2.0] [产品2.0] zs-table 单元格悬停回调 cell 可能为 undefined：合计行/固定列/重绘瞬间必加空值守卫
1481. [产品2.0] [产品2.0] 页面按钮显隐改由 getCustomConfig 接口配置控制，禁止用 projectId 写死
1482. [产品2.0] [产品2.0] zs-table-column 默认 showOverflowTooltip:true 会给开关/图标类自定义列加省略号和 tooltip
1483. [产品2.0] [产品2.0] 业务按钮显隐开关走 /autonomy/common/getCustomConfig 配置接口，异常默认 false
1484. [产品2.0] [产品2.0] 表单内操作按钮被当提交按钮触发页面刷新：native-type="button" + @click.prevent
1485. [产品2.0] [产品2.0] main.js 入口重复挂载：URL token 与 iframe postMessage 双路径都调 createInstance
1486. [产品2.0] [产品2.0] 同一数据源并发请求竞态：序号守卫只接受最近一次响应
1487. [产品2.0] 物业合同列表B端须注入complexId
1488. [产品2.0] data为对象直接map抛错致下拉空
1489. [产品2.0] 多分支合并须同步子模块指针防偏差
1490. [产品2.0] 登录密码须AES-CBC加密传输防泄露
1491. [产品2.0] 变更页提交按钮仅判ID致提前显示
1492. [产品2.0] 字典显示须优先用dictValue避免显代码
1493. [产品2.0] 表格操作列与固定列须同步主表悬停色
1494. [产品2.0] 空白页清localStorage触发安全错误
1495. [产品2.0] map.js的path替换为官方抽稀保形区划边界
1496. [产品2.0] 带单位输入框后缀高度与输入框不一致
1497. [产品2.0] supervision详情页迁新版框架并改权限
1498. [产品2.0] 外网开发企业注册organType须为01
1499. [产品2.0] 榆林分支合入丢失四页面list-card层
1500. [产品2.0] 注册流程统一调用getDicts真实字典接口
1501. [产品2.0] 楼幢弹窗房屋类型坐落不显因列配置类型误
1502. [产品2.0] 支付二维码与轮询须统一用创建订单ID
1503. [产品2.0] 从业人员备案须绑审批码并按状态控按钮
1504. [产品2.0] 编辑保存$put被V3补/add致误调add接口
1505. [产品2.0] .6.2改B/G分离判断致B端误显空部门树
1506. [产品2.0] Navbar标题与菜单重叠因宽度CSS变量未定义
1507. [产品2.0] 全量合并冲突多故仅 cherry-pick 提交
1508. [产品2.0] Vite代理key缺前导斜杠致代理失效
1509. [产品2.0] 菜单可见数须按.top-nav实宽排左侧留白
1510. [产品2.0] 仅待支付未作废账单可编辑否则隐藏入口
1511. [产品2.0] 新增用户页冗余GET致V3空body报错
1512. [产品2.0] FjDialog.vue未适配V3致旧接口地址报错
1513. [产品2.0] 支付状态字段须用sp_pay_status字典
1514. [产品2.0] isPathId 仅移数字 ID 致非数字参数留 URL
1515. [产品2.0] 组件误引图片及scoped未引Sass致编败
1516. [产品2.0] 楼幢接口路径规范且响应rows需兜底
1517. [产品2.0] Vue2@reset联动不稳且树重置不全致失效
1518. [产品2.0] 穿透跳转未带complexId致备案页区域空
1519. [产品2.0] Search组件全局注册zs-search-form
1520. [产品2.0] 列表缺complexId致收款弹窗未调用
1521. [产品2.0] 同名 loading prop 与 mixin data
1522. [产品2.0] 支取通知书详情页写死提交按钮致重复显示
1523. [产品2.0] spFeeBill导入须映射接口字段并合并数据
1524. [产品2.0] dataType监听缺oldVal致候选组被清空
1525. [产品2.0] 子组件v-model直改prop触发Vue警告
1526. [产品2.0] single-choice样式未限定表格致复选框圆
1527. [产品2.0] 订单创建即弹扫码窗异步请求payInfo
1528. [产品2.0] 侧栏收起sidebar-width变0致标题裁切
1529. [产品2.0] el-tab-pane空name致状态参数错
1530. [产品2.0] limit=1时再上传走on-exceed不替换
1531. [产品2.0] image类型后缀判断致无后缀图不回显
1532. [产品2.0] zhi2-web-admin子模块引用不一致冲突
1533. [产品2.0] `spFeeBill/import` 单设 5 分钟超时
1534. [产品2.0] 查看模式layout16映射整行致发布范围换行
1535. [产品2.0] 错误报告GET接口使用POST下载方法失败
1536. [产品2.0] 生产环境接口须相对路径代理补前导斜杠
1537. [产品2.0] jgxm/detail.vue与监管表完成框架改造
1538. [产品2.0] 企业注册附件上传统一走匿名追加接口
1539. [产品2.0] 版本检查默认地址避免写死根路径
1540. [产品2.0] getDetail默认校验id致无id接口未请求
1541. [产品2.0] getByKey被ByKey规则优先推断致映射失效
1542. [产品2.0] Playwright产物须忽略不纳入版本控制
1543. [产品2.0] `xy/detail.vue`对齐同目录框架模式
1544. [产品2.0] 调拨详情页改用 zs-form 与操作组
1545. [产品2.0] 广告位查看跳转路由错误误报无权限
1546. [产品2.0] 操作按钮组返回用 go(-1) 误退新增页
1547. [产品2.0] 组件attrs透传permission触发Vue警告
1548. [产品2.0] 声明为prop的属性不在$attrs致id丢失
1549. [产品2.0] 监管账户详情重构采用 zs-form 动态权限
1550. [产品2.0] 企业注册提交审核失败因后端流程未配置
1551. [产品2.0] 组件v-if="!hasData"隐藏有数据备案入口
1552. [产品2.0] 同名prop与data冲突致Vue组件告警
1553. [产品2.0] detail.vue导入大小写致Linux构建失败
1554. [产品2.0] Candidate组件业委会筹备组身份逻辑未统一
1555. [产品2.0] StatisticsDialog未限高致弹窗超出视口
1556. [产品2.0] Headline禁showAction致展开收起缺失
1557. [产品2.0] zhi2-web-admin子模块指针不一致致冲突
1558. [产品2.0] 经纬度字段未数值化致小区点不显示
1559. [产品2.0] 绑定未定义tableRowStyle致Vue警告
1560. [产品2.0] 平铺切树状未清筛选字段致列表不同步
1561. [产品2.0] 存量业委会跳转漏拼ID致详情无记录
1562. [产品2.0] mSouseCode拼写错误致业务申请编号查询失效
1563. [产品2.0] main.js漏导MessageBox致加密引用错误
1564. [产品2.0] 全局守卫拦截404并警告回退首页
1565. [产品2.0] dialogMode未声明致模板渲染警告
1566. [产品2.0] 园区路径分号分隔误按空格切分致NaN
1567. [产品2.0] 详情页误用dialogMode触发Vue警告
1568. [产品2.0] 人员授权列表缺失所属企业筛选条件
1569. [产品2.0] 知识预览组件未处理null致Vue警告
1570. [产品2.0] 表格悬停处理未判空致cell未定义报错
1571. [产品2.0] el-upload自定义上传必填action属性
1572. [园区公共收益] 登录鉴权必须用 accessToken 写请求头，不能用登录返回里的 token 字段
1573. [园区公共收益] platformConfig.loginMethod 驱动登录页三种形态（含 loginWithCode）
1574. [园区公共收益] 登录页多字段模式：固定预留校验区高度，错误提示 absolute 不撑布局
1575. [园区公共收益] zs-table 小计数字落到固定「操作」列：element-ui 2.15.13 colgroup 同步闩锁 + resyncTableLayout
1576. [园区公共收益] 项目类型二级多选：仅备案/变更页改造，二级值硬编码 projectTypeConstants
1577. [园区公共收益] 详情页字典下拉显示数字 0：detailCallback 把 status 等字典字段转成字符串
1578. [园区公共收益] [园区公共收益] 政治面貌「党员」字典值为 dictValue=0，勿用其它项目常见的 01
1579. [园区公共收益] [园区公共收益] 筹备组征集：报名子表增删门禁 = 主表 bizState=2 + 征集起止日期内
1580. [园区公共收益] [园区公共收益] 筹备组/候选人报名：按身份与政治面貌切换附件项及必填
1581. [园区公共收益] [园区公共收益] 筹建申请筹建范围：默认全小区房屋且禁止增删（园区差异化）
1582. [园区公共收益] [园区公共收益] 管理规约/议事规则/工作规则：文件内容由富文本改为附件且兼容历史
1583. [园区公共收益] [园区公共收益] 物业管理区域备案/变更：projectType 与苏住房字段对齐及变更对比映射
1584. [园区公共收益] [园区公共收益] develop/v2.6.1-yuanqu cherry-pick 上游样式时保留本地 sub-container 与 padding 约定
1585. [园区公共收益] 导航栏「姓名（组织类型）」只显示姓名：展示依赖 accountTypeName 而非 accountType 原值
1586. [园区公共收益] menu-name/menu-path/data-id 须用 pendingOperHeaders 仅挂在编辑保存与列表删除
1587. [园区公共收益] 表决详情「发起公示」：decisionPublicity.js 统一公示类型 16 与多议题结果校验
1588. [园区公共收益] 物业管理区域四图位：complexPhoto 逗号串槽位与 ComplexPhotoUpload 迁移要点
1589. [园区公共收益] 子表组件传主单 form：写 :form="form" 勿用 $attrs.form
1590. [园区公共收益] [园区公共收益] BuildingTableViewTabs 在 v-show 切回列表时弹窗高度塌陷
1591. [园区公共收益] [园区公共收益] B 端收益类新增页初始化监管提示链接触发「没有授权相关菜单」
1592. [园区公共收益] [园区公共收益] 业委会工作人员「当前状态」与「状态」是两套字段与字典
1593. [园区公共收益] [园区公共收益] 操作人员详情行内授权写入用户授权模块
1594. [园区公共收益] [园区公共收益] 四类业主表决页面与 decisionType、主键约定
1595. [园区公共收益] [园区公共收益] 双表穿梭弹窗中间箭头偏下：勿相对「标题+表+分页」整块居中，改用 CSS Grid 三行
1596. [园区公共收益] [园区公共收益] 详情页为对齐子表宽度在 zs-form 外再包 el-col，会把整页挤到左侧约四成
1597. [园区公共收益] [园区公共收益] 同一弹窗组件多业务线上传口径：用场景标志切换 ImageUpload 与 zs-file-upload，勿先改全局上传组件
1598. [园区公共收益] [园区公共收益] 全站图片 10MB：改 ImageUpload 组件默认 fileSize，业务弹窗显式 :file-size，保留页面级特例
1599. [园区公共收益] [园区公共收益] 操作日志/列表误把路由段当 dataId：用 isNavigableDataId 统一拦截无效关联单据跳转
1600. [园区公共收益] [园区公共收益] 维保合同付款比例：用户要的是按钮显隐控制，不要在弹窗里堆校验/过滤
1601. [园区公共收益] [园区公共收益] 资金缴款通知书子表合同名称：contentInfo link + contractType 分路由，历史数据按 contractNo 反查
1602. [园区公共收益] [园区公共收益] 自治公示新增：动态菜单路由 + sessionStorage TMP_PUBLICITY 预填
1603. [园区公共收益] [园区公共收益] 提交/审批 URL 从流程工具配置迁到 flowApi：按 moduleName+businessName 拼接并先查 flowConfig
1604. [园区公共收益] [园区公共收益] 配了 company:xxx:approval 仍不调 flowViewer：权限只管按钮壳，挂载前三道闸在 bizState/busCode/dataId
1605. [园区公共收益] [园区公共收益] 强制改密弹窗刷新被跳过：GetInfo 异步回写覆盖了 isUpdatePwd 门禁状态
1606. [园区公共收益] [园区公共收益] 流程配置维护页：无 busCode 禁止开弹窗，须先去菜单管理配业务编码
1607. [园区公共收益] [园区公共收益] 本仓库仅含 zhi2-web-admin 前端；contractGuard 等 2.0 接口需查独立 BE 或 V0 对照
1608. [园区公共收益] [园区公共收益] 楼幢/单元/房屋链路「项目→宗地号」改造需五处同步
1609. [园区公共收益] [园区公共收益] 合并冲突 git checkout --theirs 会静默丢掉列表列配置
1610. [园区公共收益] [园区公共收益] 街道/社区编码全局转中文：登录预加载 + zs-table-column 按 prop 自动 formatter
1611. [园区公共收益] [园区公共收益] benefit 租赁申请与合同备案共用 assetLeaseApply/components 子表
1612. [园区公共收益] [园区公共收益] 选择弹窗内 zs-table 末行被裁切与重置后停在底部：opt-in containerHeight + setScrollTop(0)
1613. [园区公共收益] zs-operate-column 的 disabled/visible 传实例方法引用会丢 this，导致 bizState 置灰失效
1614. [园区公共收益] 首页待办改 flowable/todo 后 TagsView 出现两个固定「待办任务」标签
1615. [园区公共收益] 楼幢详情单元子表误用 buildingVId 作主键导致删改/房屋选择异常
1616. [园区公共收益] 园区收益租赁类子表：用户要求只按 bizState 控操作，查看态也可改明细
1617. [园区公共收益] 系统显示缩放导致 zs-dialog 内容被截断：在公共弹窗层统一加可滚动主体
1618. [园区公共收益] benefit 广告位/场地明细弹窗：去掉 Headline 嵌套并 overflow:hidden 防底部按钮被挡
1619. [园区公共收益] BuildingTable 表头单元只取首层 floor 导致后续单元列空白
1620. [园区公共收益] 级联「项目类型」只选一级时校验绑在隐藏 projectSubType 上会静默失败
1621. [园区公共收益] 物管会备案详情跳转组织用户授权：预填锁定须与校验失败可重选并存
1622. [园区公共收益] 工作人员/授权记录组织名称跳转用 accountType 直映射详情路由
1623. [园区公共收益] 筹备组征集选户室：已报名户室在楼盘表与列表双视图统一不可选
1624. [园区公共收益] 编辑删除接口附加menu与data-id请求头
1625. [园区公共收益] 苏住房图片上传组件手工迁移至园区分支
1626. [园区公共收益] 账户拆分功能调整页面字段与弹窗逻辑
1627. [园区公共收益] [园区公共收益] 组织工作人员列表列空白：列表 VO 用 accountType/userStatus，勿沿用 businessType/enable
1628. [园区公共收益] [园区公共收益] 弹窗分栏内 el-pagination「前往 x 页」折行：收窄 layout 并固定 pager-count
1629. [园区公共收益] [园区公共收益] 业务对账银行回单「查看」：已对账判定与核销详情/回单弹窗分流
1630. [园区公共收益] [园区公共收益] zs-dialog 横排 flex 下批量提示与表单并排导致文案换行
1631. [园区公共收益] [园区公共收益] 平台/用户授权：短信通知与密码模式用本地常量联动，不拉 password_msg 字典
1632. [园区公共收益] [园区公共收益] 附件配置文件大小：后端仍存字节，仅 fjflpz 配置弹窗做 MB 展示与提交换算
1633. [园区公共收益] [园区公共收益] BuildingTableViewTabs 列表视图分页被裁切：子区域 min-height 之和超过父级 min-height
1634. [园区公共收益] [园区公共收益] 弹窗内 zs-table 未设 table-tr 时默认行高把分页挤出可视区
1635. [园区公共收益] [园区公共收益] 公共设施维护「选择房屋」楼盘表在窄弹窗内被 flex 压扁
1636. [园区公共收益] [园区公共收益] 工作中心待办主题前缀「<驳回>」：认 flowable comment.type 与文案双条件
1637. [园区公共收益] 我发起的流程撤回 405：流程配置 approvalApi 写成纯数字会拼成 /api/v2/2
1638. [园区公共收益] 请求体/参数带 landPlotCode 时自动写入 zs-remark 请求头（删除 mixin 同理）
1639. [园区公共收益] 业务对账银行回单表：el-table 动态列 v-for + 右侧固定操作列会导致列顺序镜像错乱
1640. [园区公共收益] 登录后物管会单区域「2 秒自动进入」失效：bProjectDialog visible 与父组件抢状态
1641. [园区公共收益] 业主表决情况表详情跳转：MULTIPLE_ISSUES 主键是 decisionManageId 不是 decisionId
1642. [园区公共收益] 公示起止日期≥7天：dayjs 日历差 + 双字段挂载 + watch 联动天数
1643. [园区公共收益] 费用分摊表小计错位到「操作」列：动态列出现后须 refreshColumnOrderKey + doLayout
1644. [园区公共收益] 审核弹窗 approvalApi 未配：ApprovalProcessDialog 应对齐 flowApi.getApprovalApi
1645. [园区公共收益] B 端列表已注入 projectId 时，资产选择弹窗须同步 assetFilterParams
1646. [园区公共收益] 详情页 StatCardsRow 夹在 DetailTemplate 与列表间：清零模板上边距并单独设 12px 区块间距
1647. [园区公共收益] [园区公共收益] 操作人员「授权」弹窗选不到物业管理区域：bindSource/page 必须用 operatorAuthId 而非 operatorId
1648. [园区公共收益] [园区公共收益] G 端 RegionTreeLayout：默认平铺、重置 parentDeptId 回根节点、平铺模式静默缓存根 ID
1649. [园区公共收益] [园区公共收益] zs-select-dialog：clearSelectionOnTreeChange 禁止跨宗地多选楼幢
1650. [园区公共收益] [园区公共收益] 操作日志列表：关联单据用 dataId，跳转依赖 dataId + menuPath
1651. [园区公共收益] 详情页子表已移出 zs-form 后，嵌套弹窗 footer 的取消仍可能被查看态 disabled 级联
1652. [园区公共收益] 弹窗内 zs-table 在 listTableTr 未变时跳过 doLayout 会导致重置搜索后底部裁切
1653. [园区公共收益] 业主开户「账户类型」显示数字：选项 dictValue 必须对齐表单存值而非业务主键
1654. [园区公共收益] [园区公共收益] 编辑态 F5 不拉详情：detailMixins 把程序化改 form 误判为用户编辑写入 sessionStorage
1655. [园区公共收益] [园区公共收益] 改角色只传 roleIds 保存后名称错乱：zs-select 须 :label.sync 并在 getForm 带 roleName
1656. [园区公共收益] [园区公共收益] 物业管理区域「楼幢范围」展示字段与授权弹窗对齐：projectName 改为 landPlotCode/landPlotName
1657. [园区公共收益] [园区公共收益] DetailTemplate type:image 混排附件：PDF 与图片同用缩略图卡片，图标走 resolveServerAssetUrl('/assets/images/file/3.png')
1658. [园区公共收益] [园区公共收益] 子表传 zs-operate-column 固定 120px 会裁切三按钮：删除 width 走组件按文案估宽
1659. [园区公共收益] 回单核销凭证删附件后查看态出现可点击「0」
1660. [园区公共收益] 未授权物业管理区域账号登录后项目选择弹窗无法关闭
1661. [园区公共收益] 楼幢总层数 getFloor 对 mathjs.add 未兜底 undefined 触发 addScalar
1662. [园区公共收益] G 端账号顶栏/首页/水印统一展示「姓名（部门）」
1663. [园区公共收益] [园区公共收益] zs-select-dialog-func 传 tree 对象会整体替换默认值，缺 treeMethod 导致 this.$undefined 报错
1664. [园区公共收益] [园区公共收益] 「我发起的流程」列表驳回主题展示应对齐待办：listCallback 内 normalizeTodoTaskRows
1665. [园区公共收益] 全局 dictFormatter 用 !cellValue 会把字典值 0 显示成空白
1666. [园区公共收益] 支出合同维护收款五字段，资金拨付选合同时从合同带入而非用款申请
1667. [园区公共收益] 经营资源租赁合同详情对齐资产租赁合同的管理费与公共收益金额块
1668. [园区公共收益] 备案登记详情「创建工作人员」仅在已备案 bizState=2 显示
1669. [园区公共收益] 楼幢授权双列表弹窗字段与套数来源兼容
1670. [园区公共收益] [园区公共收益] 短信验证码按钮：先 loading、成功后再倒计时、失败 finally 复位
1671. [园区公共收益] [园区公共收益] benefit 详情选物业管理区域：B 端才按 complexId 过滤 /property/complex/page
1672. [园区公共收益] [园区公共收益] 自定义列表模板保存列顺序后表格不重排：zs-table 补 :key="tableColumnsKey"
1673. [园区公共收益] [园区公共收益] zs-table-column 自定义渲染绕过 tooltip：表头/单元格补 title 并放宽过窄 width
1674. [园区公共收益] 选择弹窗辅助链接无菜单权限时用 getRouterPathByFilePathOptional
1675. [园区公共收益] Element UI 必填红星要求 el-form-item 的 prop 与 rules 键名一致
1676. [园区公共收益] 联动显隐字段的条件必填用 rules.required 表达式而非自定义 validator
1677. [园区公共收益] 银行对账页「银行回单」双模式切换与空态提示
1678. [园区公共收益] 腾讯地图脚本被 CSP 拦截时 TMap is not defined 要先查部署层 script-src 白名单
1679. [园区公共收益] zs-table-column type=link 未传 :function 会运行时抛 attrs.function is not a function
1680. [园区公共收益] 街道社区编码由全局formatter自动转中文
1681. [园区公共收益] 方法引用丢this致bizState判断失效删可点
1682. [园区公共收益] 多处affix设置致待办任务标签重复固定
1683. [园区公共收益] B端新增设施未绑顶部项目ID致校验失败
1684. [园区公共收益] 待办跳转未兼容历史path数据致路由错误
1685. [园区公共收益] 表格并发重排失效致小计行错位操作列
1686. [园区公共收益] 物管会备案详情按条件展示用户授权入口
1687. [园区公共收益] 项目类型校验分散致错误提示静默
1688. [园区公共收益] 楼盘表视图楼层单元不一致导致列错位
1689. [园区公共收益] 前端解密须用配对原始密钥R避PKCS#8
1690. [园区公共收益] 全局接口请求须自动附加路由meta菜单头
1691. [园区公共收益] 弹框表格底部遮挡因底部表单在tabs内
1692. [园区公共收益] hasSubAccount列空因缺Options字典
1693. [园区公共收益] 弹框分页器含sizes与多页码致宽度溢出
1694. [园区公共收益] 楼盘表弹窗内禁止压缩并启用横向滚动
1695. [园区公共收益] 户室弹框分页栏须flex固定防裁切
1696. [园区公共收益] 未设table-tr致表格分页遭弹窗裁切
1697. [园区公共收益] 动态列致 zs-table 小计合计行错位
1698. [园区公共收益] 动态列加载未重建表格致小计行错位
1699. [园区公共收益] 楼幢授权仅宗地维度切换清空已选防跨地提交
1700. [园区公共收益] 已办及我发起列表移除待办上步处理列引用
1701. [园区公共收益] 机构角色接口缺organType参数报类型为空
1702. [园区公共收益] 户室弹框翻页未重置scrollTop致列表空白
1703. [园区公共收益] 表格重置后滚动区未更新因跳doLayout
1704. [园区公共收益] 已备案详情页缺失创建工作人员入口
1705. [园区公共收益] 账户类型显示数字因dictValue不匹配
1706. [园区公共收益] 程序化赋值误写表单缓存致刷新不请求详情
1707. [园区公共收益] 操作列固定宽度绕过自适应致按钮被截断
1708. [园区公共收益] 资产部位详情同路由跳转无反应且路由名误判
1709. [园区公共收益] 业委会征集物业费证明依业主身份必填
1710. [园区公共收益] 维修方案发布链接手工拼接缺失双斜杠
1711. [园区公共收益] 文件内容校验未置必填致星号缺失
1712. [园区公共收益] 筹备组户室选择列表与楼盘表需互斥单选
1713. [园区公共收益] 筹备组征集未备案时不渲染报名信息表
1714. [园区公共收益] 级联懒加载未载子节点致编辑回显失败
1715. [园区公共收益] 候选人征集未备案不应显示报名信息
1716. [园区公共收益] 开发企业物业管理区域字段可输入
1717. [园区公共收益] 空物业管理区域不弹窗且切换给提示
1718. [园区公共收益] mathjs add 空值入参触发类型报错
1719. [园区公共收益] 对象prop不合并默认值致treeMethod报错
1720. [园区公共收益] 线上主包告警为SPA误报加密分包硬编码AES密钥
1721. [园区公共收益] 附件抽屉写死z-index致全局图片预览被遮挡
1722. [园区公共收益] 楼幢关联弹窗须统一columns并兼容字段
1723. [园区公共收益] form.js校验器误将详情id设为始终必填
1724. [园区公共收益] zs-table单元格事件cell未判空致报错
1725. [园区公共收益] zs-operate-column用未声明属性致警告
1726. [园区公共收益] 公示年份字符串与数字严格相等致当前周期校验失效
1727. [园区物管2.0] 子表拆分粒度的用户偏好：列配置耦合进 vue 文件，弹窗子表才单独抽组件
1728. [园区物管2.0] Vite base='./' 部署下第三方地图区划代理的路径适配套路
1729. [园区物管2.0] zs-table 列宽自反馈死循环：用渲染后 realWidth 反推分配必然卡死，重构为 canvas 测文本 + min-width 委托 el-table 原生 fit
1730. [园区物管2.0] zs-table-column 列宽清理的两类漏网处与 slot-width 例外
1731. [园区物管2.0] 复制/改造页面后布局全乱：先查模板类名与样式类名是否对上（分支合并残留）
1732. [园区物管2.0] 设计稿切图入库约定：中文/无语义文件名重命名为英文语义名并同步引用
1733. [园区物管2.0] [园区物管2.0] zs-table 自适应列溢出遮挡相邻列：cell 收 ellipsis + showOverflowTooltip，500px 封顶即可，无需状态类
1734. [园区物管2.0] 合计行与表格宽度不一致：全局 .zs-table-container 的左右 padding 只作用于表格，不含 table-section 下的合计行
1735. [园区物管2.0] 同一组件写两个 computed 对象块：JS 重复键后者整块覆盖前者，属性静默变 undefined
1736. [园区物管2.0] 列表页禁止复制 ListTemplate 的 HTML 写独立模板：缺能力时增强 ListTemplate/mixin 本身
1737. [园区物管2.0] 列表页 list-container/list-card 标准包裹结构：全局排查与特殊布局落点
1738. [园区物管2.0] 数据大屏固定视口布局的裁切与滚动三坑：stage 锁高、scale-clip/画布 overflow:hidden 裁掉坐标轴
1739. [园区物管2.0] 楼盘表选择弹窗统一约定：BuildingTableViewTabs 共享组件 + zs-select-dialog building-table-mode 固定尺寸
1740. [园区物管2.0] SVG 图标主题色失效根因：SVGO convertColors 把 fill=currentColor 改写成写死色值，须从源文件批量恢复
1741. [园区物管2.0] [园区物管] zs-table-column 把 v-if 未渲染列的插槽误判为自定义列并固定 80px 宽
1742. [园区物管2.0] [园区物管] 切换小区刷新后查询参数丢失：currentProjectId 必须走 getter + localStorage 启动恢复
1743. [园区物管2.0] [园区物管] 数据地图页行政区划下钻的接口传参约定：regionCode 恒传 + dimension 分层
1744. [园区物管2.0] [园区物管] 腾讯地图行政区划轮廓接入套路与后端坐标字段 x/y 语义陷阱
1745. [园区物管2.0] [园区物管] 区域树侧栏布局收敛为 RegionTreeLayout 公共组件（16 页面迁移）
1746. [园区物管2.0] [园区物管] 地图区域信息框用户偏好：固定左上角定时轮播而非鼠标 hover
1747. [园区物管2.0] zs-table 固定列遮挡小计行分隔线：线条类元素 z-index 提到固定列（12）之上
1748. [园区物管2.0] [园区物管2.0] 「大量合并冲突」先双重自检再动手：grep <<<<<<< 与 diff-filter=U 都为 0 即无冲突
1749. [园区物管2.0] [园区物管2.0] 表格自定义列配置刷新后丢失：localStorage 预加载进 Vuex + created/mounted/activated 三处统一同步
1750. [园区物管2.0] [园区物管2.0] 环形图接口数据全 0 时的渲染策略：占位值画环 + 真实 0 值展示
1751. [园区物管2.0] 批量重构 .vue 后 pre-commit ESLint 解析错误的高发模式与收口做法
1752. [园区物管2.0] [园区物管2.0] 多版本分支修复的工作流约定：从最低版本分支修起、用户确认后再沿合并链逐级上推
1753. [园区物管2.0] [园区物管2.0] BuildingTableViewTabs 列表视图缺「共 N 条」分页：组件能力要靠 listData prop 显式开启，改一处覆盖所有选择户室弹窗
1754. [园区物管2.0] 跨系统「查看报告」按钮的显隐契约与公共化套路
1755. [园区物管2.0] 「Failed to fetch dynamically imported module」在生产上的根因与部署约定
1756. [园区物管2.0] 园区物管2.0 楼盘表组件拓扑：统一入口 src/views/components/BuildingTable.vue
1757. [园区物管2.0] 用户编码偏好：禁止 this/$ 取原型方法，公共逻辑一律显式 import
1758. [园区物管2.0] [园区物管] 布局壳里遗留的 :deep(.el-dialog) 定位样式会污染其后代所有弹窗
1759. [园区物管2.0] [园区物管] G 端误弹 B 端项目选择弹窗：terminalType 是残留态，登录/登出必须重置
1760. [园区物管2.0] 弹窗内复用详情页容器类会导致样式错乱：选择类弹窗按数据量分双形态
1761. [园区物管2.0] 用户偏好：详情页不要擅自改成弹窗展示
1762. [园区物管2.0] 多分支修复-确认-串行合并约定：从最早受影响分支修复后逐级向下合并
1763. [园区物管2.0] 地图区划数据生产报「Unexpected token '<'」：import.meta.env.DEV 分支在 terser 下被错误保留 + 生产无 /map 代理，统一 JSONP 直连
1764. [园区物管2.0] 空表格底边框偏粗/错位的根因是 1px 底边多来源叠加（最多 5 处），必须在组件与全局样式层收敛，页面级覆盖无效
1765. [园区物管2.0] zs-input-number 数字不显示：padding-left 未随 controls-position 适配 + 页面 flex 强制 100% 宽挤压输入区
1766. [园区物管2.0] [园区] sprite.svg 是构建自动生成产物，未消费的 sprite 生成链路要整链清理
1767. [园区物管2.0] [园区] ECharts 环图 100% 单扇区标签错位与 0 值扇区残留引导线的处理
1768. [园区物管2.0] [园区] zs-table 固定操作列多余边框只在有分页时出现：条件容器 class + syncFixedColumnOffset
1769. [园区物管2.0] [园区] 侧边栏是自定义 RecursiveMenu，缩进靠 level prop + paddingLeft，与 el-menu 无关
1770. [园区物管2.0] 图表金额格式化误用取整函数导致 0.几万元显示为 0
1771. [园区物管2.0] 编辑态选择弹窗回写不得覆盖详情接口已落库的分类字段（relBusinessType）
1772. [园区物管2.0] [园区物管2.0] 企业关联 ID 统一 companyRecordId，提交字段名保留 companyId
1773. [园区物管2.0] [园区物管2.0] 腾讯地图 Key 禁止硬编码，统一经 /system/config/getByKey/qq.map.key 接口获取
1774. [园区物管2.0] [园区物管2.0] 腾讯 GL 地图点位「不显示」的四类根因与排查套路
1775. [园区物管2.0] [园区物管2.0] CSS 里的静态资源 URL 用 JS 注入 CSS 变量解决（配合 resolveServerAssetUrl）
1776. [园区物管2.0] [园区物管] 腾讯区划边界接口环境判断必须用 import.meta.env.DEV，不要写 void 0 !== import.meta
1777. [园区物管2.0] [园区物管] 银行回单核销单业务约定：loanDirction 传「借/贷」中文枚举，编辑态锁死回单流水号
1778. [园区物管2.0] [园区物管2.0] Vite 静态资源中文文件名会被打成中文命名 chunk，部署到子路径/CDN 时 404 并伪装成动态模块加载失败
1779. [园区物管2.0] [园区物管2.0] ECharts 图例数据未随 0 值过滤同步，resize 时反复报 series not exists
1780. [园区物管2.0] [园区物管2.0] 公共选择弹窗不塞端别业务逻辑：B 端 projectId 过滤条件在 17 个调用页逐页注入 filterParams
1781. [园区物管2.0] [园区物管2.0] 吸顶操作栏被表格固定列遮挡 + 操作列按钮裁切：z-index 低于 10 与列宽 padding 估算错的叠加根因
1782. [园区物管2.0] [园区物管2.0] 大屏 1920 等比缩放右侧留白：按高度缩放时须动态放大设计稿宽度而非固定 1920
1783. [园区物管2.0] [园区物管2.0] B 端默认小区街道/社区反查为空：initCurrentProject 与 area 字典异步加载的竞态 + projectId 提前 return
1784. [园区物管2.0] OperationBtnGroup 渲染期必传四件套：缺 :form/:primaryKey 会直接崩，businessName 不能填权限串
1785. [园区物管2.0] driver.js 引导聚焦贴顶元素被裁切：padding:0 + inset box-shadow 内描边
1786. [园区物管2.0] zs-table 小计/合计双来源：shouldRenderBottomSummary 原是计算属性不是 prop，且 ZsSummaryText 写死「合计：」
1787. [园区物管2.0] Vue2 v-for 动态 :ref 返回 DOM 数组，echarts.init 直接报 getContext is not a function
1788. [园区物管2.0] 项目约定：表单内 input 不需要手写 width:100%，全局 element-ui.scss 已兜底
1789. [园区物管2.0] fixed 底栏被 flex 静态位置摆偏：left/right 为 auto 时跟随兄弟节点对齐
1790. [园区物管2.0] 全局单例弹窗首次打开闪烁的三根因：双实例挂载 + 数据未就绪先开 + 打开时重复初始化
1791. [园区物管2.0] 旧 <search-container> 已废弃：Unknown custom element 的根因是复刻旧页面模板
1792. [园区物管2.0] Web 后台页面内容区必须用 isolation 隔离层叠上下文，防止页面内高 z-index 元素盖住 Navbar
1793. [园区物管2.0] zs-region-select 默认选中顶级需 default-expand-level=1（Element 层级从根算 1），树选中状态要接入 cachedSearchParams 缓存
1794. [园区物管2.0] 平台配置异步加载竞态：computed/created 里做 msgError 副作用会在配置就绪前连发误报提示
1795. [园区物管2.0] ECharts 双 Y 轴 alignTicks 产生无限小数刻度的根因与修复
1796. [园区物管2.0] 腾讯地图 TMap「并非 TMap.Map 实例」的三类根因与统一防御套路
1797. [园区物管2.0] DetailTemplate 长 label 换行后同行背景色高度不齐：占位列改 stretch + min-height
1798. [园区物管2.0] B 端新增表单默认填充物业管理区域的可复制套路（initCurrentProject + applyPropertyProjectRow）
1799. [园区物管2.0] 街道/社区字段一律赋编码而非名称，且赋值后可移除字典等待依赖
1800. [园区物管2.0] RecursiveMenu 子菜单缩进依赖图标占位：icon 为 null 时文字比父级更靠左
1801. [园区物管2.0] ECharts 轴刻度上限约定：Math.ceil(峰值/步长)×步长，避免出现 2143 这类怪刻度
1802. [园区物管2.0] 超大地图/图表页面的精简拆分套路：constants / dataHelpers / chartOptions / index.vue 四件套
1803. [园区物管2.0] 表单校验失败不滚到错误项：Element UI 只标红不定位，需在自定义滚动容器内 scrollFormToFirstError
1804. [园区物管2.0] 自封装输入组件校验「填了仍提示必填」：必须在值变化时 dispatch el.form.change，blur 事件放 nextTick
1805. [园区物管2.0] 退出登录必须清「小区/项目」业务上下文：localStorage 三键 + Vuex + 组件 local 状态三处同清
1806. [园区物管2.0] [园区物管2.0] 列表页表格高度约定：取消 .list-card 自动撑满，表格随内容收缩
1807. [园区物管2.0] [园区物管2.0] 全局选项目弹窗的缓存恢复套路：localStorage + 权限列表校验 + cacheRestored 标记
1808. [园区物管2.0] [园区物管2.0] 页面级选择弹窗对齐 zs-select-dialog 的单选契约
1809. [园区物管2.0] [园区物管2.0] AmountInput 开发能过打包后 el-form 校验为空：blur 校验与 v-model 写入 model 的同 tick 竞态
1810. [园区物管2.0] [园区物管2.0] zs-table 合计行下边框缺失：overflow hidden 裁切 footer-wrapper，须在组件层加 with-summary 收敛
1811. [园区物管2.0] [园区物管2.0] 图表金额柱形不显示：接口已返回万元又被 parseCategoryAmount 二次 ÷10000
1812. [园区物管2.0] Element UI 树「全部展开」卡死的根因与分批套路：直接赋 node.expanded，不调 expand()
1813. [园区物管2.0] form.js getDetail 增加 getDetailRequiredParams 必需参数守卫钩子，防止路径不完整的详情请求
1814. [园区物管2.0] 地图下钻两条约定：SVG 区块数组与 svg <g> 文档顺序强耦合不可重排；下钻视野必须等接口数据就绪再移动
1815. [园区物管2.0] zs-table 小计与合计是两条通道：summary-method 管当前页小计，bottom-summary-items 管接口全量合计
1816. [园区物管2.0] 移除 xcrud 依赖的兼容改写套路：本地 XForm.vue 按「能力子集 + 同签名」替换
1817. [园区物管2.0] SVG 图标换色的坑：正则替换第一个 fill 会误改根节点 fill="none"，只替换 path 上的色值
1818. [园区物管2.0] 多系列折线图 Y 轴自适应刻度套路：取全系列最大值 ×1.08 后规整到 1/2/3/5/7/10×10ⁿ
1819. [园区物管2.0] 多版本发布分支的级联合并约定：最低受影响分支修复，逐级向上 merge
1820. [园区物管2.0] 地图打点两类坐标问题的分流处理：null 过滤 + 重合点圆环错开
1821. [园区物管2.0] 「新增可选」与「全量展示」分两个字典：双字典存储 + formMode 计算属性切换
1822. [园区物管2.0] 区域树列表页首屏闪烁：树模式延迟首次列表请求，等 tree-ready 后带 parentDeptId 拉取
1823. [园区物管2.0] 弹窗内表格底部双重边框：非 list-card 容器缺少 el-table::before 伪元素去重
1824. [园区物管2.0] 可手输选择组件（allow-custom）回填表单的三态处理：缺 companyId 不等于空值
1825. [园区物管2.0] 项目切换后不要 window.location.reload()：复用 TagsView 的 delCachedView + /redirect 软刷新
1826. [园区物管2.0] 弹窗表格选中项与外部默认值双向同步：清空数组不会清掉 el-table 内部勾选，watch 里必须 clearSelection 再回填
1827. [园区物管2.0] 业务选择弹窗的数据源要用业务专用过滤接口，不能拿通用列表接口靠前端凑
1828. [园区物管2.0] [园区物管] ECharts Y 轴刻度小数位失控：axisLabel 必须单独格式化并约束最小 interval
1829. [园区物管2.0] [园区物管] 切换小区后导航栏显示 "undefined"：展开合并被详情接口的 undefined 字段覆盖
1830. [园区物管2.0] [园区物管] 同一接口的所有 SelectDialog 要同步补 B 端 projectId 隔离条件
1831. [园区物管2.0] [园区物管] 发布分支修复约定：最低受影响分支修复 + 确认后沿版本链逐级 merge forward
1832. [园区物管2.0] 金额大数失焦被静默改写：AmountInput/currencyFormatter 禁用 parseFloat().toFixed()，改字符串格式化
1833. [园区物管2.0] 编辑弹窗重拉详情丢字段：详情接口不返回的字段要用列表行数据三级兜底回填
1834. [园区物管2.0] [园区物管] 表格加载后统计卡片闪烁的根因：transition:all 让滚动条引起的宽度变化也做动画
1835. [园区物管2.0] [园区物管2.0] 从其他页面复制的 Tab 区块不加载：value 契约、contentShow 开关、sourceData 三处遗漏
1836. [园区物管2.0] [园区物管2.0] zs-table 全列设 width/min-width 时右侧留白：min-width 弹性列参与均分的组件层改造
1837. [园区物管2.0] [园区物管2.0] 清理 src/api 死代码的判定口径：页面存在 ≠ api 模块被引用
1838. [园区物管2.0] [园区物管2.0] ECharts 饼图 hover 高亮移出不消失：dispatchAction highlight 必须配 downplay 成对
1839. [园区物管2.0] ECharts 地图去高亮要同时禁 emphasis/select/blur 三态，selectedMode:false 才能关掉点击选中
1840. [园区物管2.0] attachments 类字段是逗号分隔多路径，必须拆数组逐张走 resolveServerAssetUrl，多图用 el-carousel
1841. [园区物管2.0] 地图气泡配色必须绑定「数据层级」而非「缩放目标层级」，异步加载期间保持旧配色
1842. [园区物管2.0] 双 Y 轴量纲悬殊时去掉 alignTicks:true，改为按 1/2/5/10 友好步长各自计算 min/max/interval
1843. [园区物管2.0] 函数式挂载的 zs-select-dialog-func 实例必须注入 store/router/parent，否则 mixin 的 tableConfig getter 崩溃
1844. [园区物管2.0] [园区物管] 接口已换算好单位的数据，前端不得二次换算（百个/万元双坑）
1845. [园区物管2.0] [园区物管] 多页共享同一份 mock 数据源：mock 收敛到 constants 常量模块，页面只做字段映射
1846. [园区物管2.0] ECharts 双轴图表：Y 轴单位与图例争位时用 nameLocation:'middle' 竖排到轴中段
1847. [园区物管2.0] 列表排名垂直无缝自动滚动的实现套路（超出才滚 + 悬停暂停 + 尺寸/数据变化重判）
1848. [园区物管2.0] 详情页 dictFormatter 转译偶发显示编码：异步 options 竞态 + area mixin 重复挂载
1849. [园区物管2.0] benefit 模块 pageOptionalComplex 系列接口约定：filterParams 必须带 store 的 currentProjectId
1850. [园区物管2.0] 树+表联动列表页的树状/平铺切换：只清树过滤字段，绝不能调 resetQuery 清表单条件
1851. [园区物管2.0] ECharts geo+SVG 注册图的轮播高亮套路：setOption geo.regions 而非 dispatchAction，多 path 行政区（飞地）要逐 path 配置
1852. [园区物管2.0] 数字千分位的全局统一入口：formatters/currencyFormatter + patterns.number 判定，非数字原样透传
1853. [园区物管2.0] ImageUpload 多图预览错位的根因：resolved URL 与原始 fileUrl 格式不一致导致 indexOf 恒为 -1
1854. [园区物管2.0] flex 布局长文本挤掉右侧元素的通用解法：min-width:0 逐层打开 + 省略兜底
1855. [园区物管2.0] ECharts 饼图占比取值约定：统一用 p.percent，但 0 值占位扇区会污染分母
1856. [园区物管2.0] [园区物管] 顶栏下拉被裁切的根因：overflow:hidden 父容器裁掉 absolute 下拉，滚动职责必须拆到内层子容器
1857. [园区物管2.0] [园区物管] 腾讯地图在 SPA 中的请求全部由用户浏览器发起，前端静态服务器禁外网不影响地图
1858. [园区物管2.0] [园区物管] ECharts 图表约定：containLabel:false 时 Y 轴留白需手动 grid.left+margin 双调；饼图悬停 focus 用 'none' 不淡化其他扇区
1859. [园区物管2.0] el-input 用 @input.native 监听搜索会导致中文 IME 输入法下过滤失效
1860. [园区物管2.0] sign.js 全局改写 XHR/fetch 加签会把 nonce 头带到第三方外链，触发 CORS 预检失败
1861. [园区物管2.0] 全景类大屏页 height 与 min-height 同用 calc(100vh-…) 会把横向滚动条推出主内容区可视范围
1862. [园区物管2.0] zs-table summary 不展示：showMethod 的小计列识别不能只依赖 column.type==='index'
1863. [园区物管2.0] 子路径部署下 version.json 版本检查必须用 BASE_URL 相对路径，不能用绝对 /version.json
1864. [园区物管2.0] [园区物管] ESLint import/no-unresolved 会拦截 Vite 虚拟模块与 ?raw 导入，需在 eslintrc 配 ignore
1865. [园区物管2.0] [园区物管] zs-table 把 data 改成 prop 后，$attrs.data 恒为 undefined 导致表格高度只算 1 行
1866. [园区物管2.0] [园区物管] 柱状图数值轴上限算法：细刻度集合 + 峰值 1.1 倍取整，避免 Y 轴留白过大
1867. [园区物管2.0] 侧边栏展开收起不会触发 window.resize，ECharts 必须 watch sidebar.opened 延时重绘
1868. [园区物管2.0] TMap.Map 等原生类实例放进 data() 会被深度响应式改坏导致 instanceof 失败
1869. [园区物管2.0] Vite 的 ?raw 导入会被 ESLint import/no-unresolved 拦下 pre-commit
1870. [园区物管2.0] Vue 选项重复定义（同名 methods 两处）静默覆盖，靠 no-duplicate-vue-options 门禁拦截
1871. [园区物管2.0] 平台配置接口下发主题色：getPlatformConfig 后调 changeThemeColor 动态生成 CSS 变量
1872. [园区物管2.0] ECharts finished 事件里同步 setOption 报主流程告警：rAF 推迟 + 位置缓存 + replaceMerge
1873. [园区物管2.0] 响应拦截器并发失败弹窗去重：模块级标志位只弹第一个错误
1874. [园区物管2.0] dict-tag 根节点是块级 div，套进 span 值容器会被浏览器拆标签重排 DOM 导致布局错乱
1875. [园区物管2.0] 腾讯地图行政区名称重影：矢量底图 POI 文字(point)与自定义 MultiLabel 叠加，baseMap 要素要排除 point
1876. [园区物管2.0] 大屏数据沙盒页 transform 缩放：只缩 X 会导致纵向溢出，需拆 layoutScaleX/Y 且 Y=min(1, 视口/设计高)
1877. [园区物管2.0] [园区物管2.0] sticky 操作栏压住顶栏下拉的根因：兄弟层叠上下文只比根节点 z-index
1878. [园区物管2.0] [园区物管2.0] 地图下钻接口错乱的两类根因：遗留重复请求 + zoom 动画误触发回退
1879. [园区物管2.0] [园区物管2.0] 缩放舞台页底部大留白的根因：min-height/Math.max 固定下限与真实内容高度脱节
1880. [园区物管2.0] 登录后守卫内 next(replace) 触发 NavigationRedirected 控制台误报
1881. [园区物管2.0] RegionTreeLayout 左侧树边框随节点变矮的根因与固定高度方案
1882. [园区物管2.0] B 端租赁备案选物业管理区域：handlePick 增加 extra 与 extraLinks
1883. [园区物管2.0] zs-operate-column 按 label 测宽仍截断：只增不减与单元格 padding 补偿
1884. [园区物管2.0] 资金全景 renderCategoryBar 支出柱图需传 uniformBarColor 第三参
1885. [园区物管2.0] 底部饼图图例每行固定 N 项：legend 数组分段 + bottom 错开
1886. [园区物管2.0] 大屏指标区 repeat(3,1fr) 导致三项横向间距虚大
1887. [园区物管2.0] [苏房] USE_MOCK_DATA=false 仍先闪 mock：data() 初始化与开关脱节
1888. [园区物管2.0] [苏房] 列表页 el-switch 绑了 @change 但 methods 未声明对应 handler
1889. [园区物管2.0] [苏房] 区域树接口请求中 el-tree 应显示「加载中」而非「暂无数据」
1890. [园区物管2.0] [苏房] 详情页 mounted 误读 sessionStorage.setRow：仅新增选资产路径写入
1891. [园区物管2.0] [苏房] mapOverview 轮播「全市」须给全部区县推 geo regions 高亮项
1892. [园区物管2.0] [苏房] platformConfig 功能开关用 isShowPublishButton === true 默认隐藏
1893. [园区物管2.0] [苏房] 线柱混图去掉 series label 保留 tooltip 避免顶部数字拥挤
1894. [园区物管2.0] zs-select-dialog 默认勾选列未传 row-key 时 ElTable 在 data 变化时报警告
1895. [园区物管2.0] 操作列 buttons 用 .filter(visible) 时行级显示须拆到 rowVisible
1896. [园区物管2.0] 树+表选择弹窗：树节点字段用 onTreeClick 缓存，勿只信右侧表格行
1897. [园区物管2.0] 排名列表表头与数据行分列 grid 且含 auto 列会导致列宽不一致
1898. [园区物管2.0] [苏房] Vite 开发代理 HTTPS 连 IP 报 ERR_TLS_CERT_ALTNAME_INVALID
1899. [园区物管2.0] [苏房] 用户详情「授权范围」树勾选必填：beforeSaveHook + getForm 空树保护
1900. [园区物管2.0] [苏房] 自治用户授权：组织名称核验失败须级联清空组织与用户字段
1901. [园区物管2.0] [苏房] B 端物业管理区域 SelectDialog：extra + extraLinks 提示开户与签协议
1902. [园区物管2.0] [苏房] 模板绑定 :border="border" 须在 data 定义 border，否则 Vue 运行时警告
1903. [园区物管2.0] [苏房] 资金全景 fundPanorama 区县饼图 label 在 chartRenderers.js 而非 index.vue
1904. [园区物管2.0] [苏房] mapOverview 隐藏季度筛选 UI 时接口仍带默认季度参数
1905. [园区物管2.0] [园区物管2.0] 数据看板多列 CSS Grid 子板块高度未撑满：align-items:start 阻断默认 stretch
1906. [园区物管2.0] [园区物管2.0] zs-operate-column 仅一个「查看」时按钮贴左：动态列宽下需容器 justify-content:center
1907. [园区物管2.0] [园区物管2.0] 全局 request 拦截器：HTTP 404 不弹 MessageBox，仅 reject 交给调用方
1908. [园区物管2.0] [园区物管2.0] public/sign.js 密钥地址子路径部署：resolveSecretKeyUrl 用无前导斜杠的相对路径
1909. [园区物管2.0] [园区物管2.0] 数据沙盘 ECharts 饼图外侧标签：label.formatter 单独控制展示名/数值/单位
1910. [园区物管2.0] DetailTemplate 在B端不存在需全局排查
1911. [园区物管2.0] terminalType未重置致G端误弹物业弹窗
1912. [园区物管2.0] 表格高度随内容自适应禁固定撑满
1913. [园区物管2.0] 生产包区划接口无代理落SPA致JSON报错
1914. [园区物管2.0] 空表底边因多规则边框叠加显粗
1915. [园区物管2.0] 环图外侧标签遮挡且零值扇区留引线
1916. [园区物管2.0] 资金收支合并柱状图误用取整函数显0
1917. [园区物管2.0] 业务标识统一取记录ID废弃企业ID回退
1918. [园区物管2.0] 地图下钻点位缺失因视窗脱节坐标漏解析
1919. [园区物管2.0] .detail-label 右对齐致标签名称居右
1920. [园区物管2.0] 无数据图例全展而series空致ECharts报错
1921. [园区物管2.0] 固定1920设计稿按高度缩放致右侧留白
1922. [园区物管2.0] 多分支合并需关联提交哈希与源分支
1923. [园区物管2.0] 未传form及primaryKey致按钮组读取报错
1924. [园区物管2.0] 引导聚焦padding致顶部按钮边框裁切
1925. [园区物管2.0] 三级下钻改用独立接口且参数按需携带
1926. [园区物管2.0] zs-table底部合计因非prop无法受控隐藏
1927. [园区物管2.0] v-for中ref为数组致echarts初始化失败
1928. [园区物管2.0] 全局样式已兜底input宽度冗余style可删
1929. [园区物管2.0] flex内fixed底栏未设左右致偏移
1930. [园区物管2.0] 未注册search-container引发Vue警告
1931. [园区物管2.0] sprite.svg合并冲突因分支删除状态不一致
1932. [园区物管2.0] 环图全0隐藏扇区label致分类名不展示
1933. [园区物管2.0] Vue2代理或重复加载致TMap.Map校验失败
1934. [园区物管2.0] 饼图扇区悬停不触发图例高亮放大
1935. [园区物管2.0] 表格容器自动撑满高度致多余空白
1936. [园区物管2.0] 收支分布图万元数据重复换算致柱形不可见
1937. [园区物管2.0] zs-table合计默认复用小计值致显示一致
1938. [园区物管2.0] apply.svg根节点fill=none遭正则误改
1939. [园区物管2.0] 同经纬度数据致地图气泡重叠需错开显示
1940. [园区物管2.0] 资金余额改整数显示且保留柱高精度
1941. [园区物管2.0] 手输无 companyId 被清空致表单校验失败
1942. [园区物管2.0] 仪表记录弹窗误设 border 致详情无边框
1943. [园区物管2.0] rangeTable 未清表选区致勾选残留
1944. [园区物管2.0] 经营资产Y轴刻度未格式化显三位小数
1945. [园区物管2.0] yAxis配置混入xAxis缺逗号致语法错误
1946. [园区物管2.0] 欠费户室按钮位置调整合入三分支
1947. [园区物管2.0] 信用评级规则详情页名称与年度字段同行显示
1948. [园区物管2.0] 图标按card.key绑定致板块换位配色未交换
1949. [园区物管2.0] ECharts地图点击高亮需禁用select态
1950. [园区物管2.0] ECharts双Y轴alignTicks致刻度告警
1951. [园区物管2.0] 搜索失败未复位isSearchMode致样式错乱
1952. [园区物管2.0] 动态创建弹窗未注入Vuex store致Vue警告
1953. [园区物管2.0] 顶栏偏好自适应高度与紧凑内边距
1954. [园区物管2.0] 饼图比例只取ECharts计算值弃用接口ratio
1955. [园区物管2.0] 地图轮播原按GeoJSON序致与mock数据错位
1956. [园区物管2.0] 底部 Grid 列比例不当致账户余额排名区域过窄
1957. [园区物管2.0] 各区图表统一取色 DISTRICT_COLOR 色盘
1958. [园区物管2.0] 请求全局加签引发腾讯地图外链 CORS 预检失败
1959. [园区物管2.0] 饼图扇区与底部图例均需展示数值占比
1960. [园区物管2.0] TMap.Map实例不可存data否则图层校验失败
1961. [园区物管2.0] complexChange概览对齐complex页
1962. [园区物管2.0] ECharts主渲染中同步setOption告警
1963. [园区物管2.0] 布局纵向不缩放致设计稿超出视口
1964. [园区物管2.0] 非401接口异常全局弹窗暂禁用
1965. [园区物管2.0] 支出柱图未传统一色参数致柱体多色
1966. [园区物管2.0] 未定义changeType方法致Vue警告
1967. [园区物管2.0] 网格起始对齐致资金板块未占满行高
1968. [太仓G] 维修资金表决菜单权限与代码权限前缀不一致会导致详情按钮全隐藏
1969. [太仓G] decisionCommon 决策明细「投票来源」列须绑定 voteSource 与 vote_source 字典
1970. [太仓G] Tab 切换后动态插入 fixed 操作列会导致 Element 表体空白但分页仍有总数
1971. [太仓G] 表决详情按钮：禁止 v-show 与 v-hasPermi 混用，状态比较须归一类型
1972. [太仓G] v-hasPermi 指令须实现 inserted 钩子才能在首屏校验权限
1973. [太仓G] VoteRangeDialogLite 须从 optionDecision 引入 CandidateConfigTable
1974. [太仓G] 表决详情主 Tab 切换时 handleChange 误改 cardValue 导致子 Tab 文案与表格不一致
1975. [太仓G] 线下投票录入勿 Object.assign 整行决策范围，避免 remark 污染表决意见
1976. [太仓G] 物业小区基本信息变更模块无楼幢范围新增接口，备案组件被 show-button=false 截断
1977. [太仓G] 选项表决 VoteViewLite 投票表只展示配置表决项，弃权在顶层 waiver 字段
1978. [太仓G] 选项表决详情切到「投票信息」须 watch mainCardValue 重置 cardValue
1979. [太仓G] 维修资金公示「重新公示」新增接口必须带 publicityDays
1980. [太仓G] v-money 无绑定值时指令须对 binding.value 做空值守卫
1981. [太仓G] 业委会选举候选业主：政治面貌「群众」须隐藏并取消「所属党组织」必填
1982. [太仓G] 一般表决新增决策范围须按 decision-policy 分流：general 选户室 batchAdd，maintain 走表单
1983. [太仓G] 选项表决「决策明细维护」与「表决项 Tab」是两套接口，勿混用 /estate/option/*
1984. [太仓G] 业委会选举「是否已推送在线表决」应请求 onlineDecisionProperty/hasOnlineDecisionPush
1985. [太仓G] 选项表决详情 DecisionRangeTable 的 show-icon 勿只绑基本信息 Tab，否则投票信息 Tab 操作区整行隐藏
1986. [太仓G] 递归附件 TableBody 会在每层 created 重复 getDicts；多实例对话框宜模块级 Promise 去重
1987. [太仓G] Vue组件误引跨模块路径致构建失败
1988. [太仓G] 接口data空触发无需审计提示致step2禁填
1989. [太仓G] detail.vue遗漏driver导入致未定义
1990. [小程序] uni-app 微信小程序 script 中 import.meta.url 会触发 babel 编译失败
1991. [小程序] 苏服办/门户 externalWebview 首页：鉴权状态与全局 userStore 必须隔离
1992. [小程序] 门户首页作壳：带 complexId/houseId 入参不自动开 web-view，仅二级菜单点击拼接 H5
1993. [小程序] externalWebview 向 H5 传 token 不传 loginCode，并按实名分流壳页与 web-view
1994. [小程序] redirectUrl 含 authCode 时自动跑完整门户登录绑房链并防重复触发
1995. [小程序] static/images 死链清理：路径匹配 + resolveZhishuAsset 文件名反查
1996. [小程序] [无锡H5] ctUserIdentity 房屋分页返回顶层数组时 rows 解析为空
1997. [小程序] [无锡H5] refreshPortalProfile 须串联 profile 后立即拉房屋并写快照
1998. [小程序] [无锡H5] 业主决策/外链 H5 URL 过长用 storage 中转再开 web-view
1999. [小程序] [无锡H5] webview 首页维修资金/业主决策接口要带门户 auth 且 toast 展示后端 msg
2000. [小程序] [无锡H5] 门户首页轮播与 /system 接口对齐「我的」页的 v2.0 前缀与 Token
2001. [小程序] uni-app 分包瘦身：页面挪进 subPackages 后业务跳转的完整路径不变，不必批量改 URL
2002. [小程序] wygl 门户双 Tab（home / externalWebview）小区不同步：onShow 全量拉 profile 会冲掉 picker 选中项
2003. [小程序] 业主决策 portalPostAction：H5 打开成功后再消费缓存，且普通绑房入口要清残留
2004. [小程序] wygl 正式版房屋卡片：展示用 ctUserIdentity，业主决策仍单独校验灵犀绑房 houseBoundViaAuth
2005. [小程序] 门户菜单门禁分叉：维修资金要 bound houseId，业主决策每次强制灵犀选屋
2006. [小程序] 人脸核验须webview就绪后调用否则失败
2007. [小程序] 房屋卡展示依赖portalH5Webview封装
2008. [小程序] 房屋接口未串联profile且顶层数组解析失败
2009. [小程序] 接口异常toast未提取msg且401提示重复
2010. [小程序] 分包仅改变打包位置页面路径不变
2011. [小程序] 业主决策缓存于成功跳转后统一清理
2012. [小程序] Tab与首页onShow刷新竞争覆盖房屋选择
2013. [小程序] 微信小程序主包源码体积硬上限 2048KB
2014. [小程序] 业主决策自动跳转投票页须本次灵犀选屋成功且非 authCode=0
2015. [小程序] 合并灵犀房屋后事件与快照竞态导致房屋信息被清
2016. [小程序] 首页快捷菜单入口需先校验登录与绑定房屋再开 web-view
2017. [小程序] pages.json 可为单页单独设置导航栏白底黑字
2018. [小程序] 业主决策入口完整交互：二次确认→实名→灵犀选屋→表决H5
2019. [小程序] 首页菜单固定两行三列避免 flex-wrap 错乱
2020. [小程序] 业主决策入口先实名门禁再进二次确认
2021. [小程序] 微信开发者工具报 appid missing 多为工具项目 AppID 未配置
2022. [小程序] 个人中心「切换」房屋走添加房屋流程重新选房
2023. [小程序] 人脸识别失败改为当前页失败态+重试而非自动后退
2024. [小程序] 门禁弹窗(登录/添加房屋)文字换行被截断的共用样式修复
2025. [小程序] 体验版无需 authCode 直接拉取全部绑定房屋
2026. [小程序] housePickerLabels 中文直接使用 address 字段
2027. [小程序] 开发版+体验版 authCode=0 仍调用 selectMyHouse，仅正式版跳过
2028. [小程序] 生产日志不得打印完整证件号应脱敏
2029. [小程序] web-view 承载页移除自定义返回按钮改依赖导航栏默认返回
2030. [惠山二期G] Vite dev 下改密仍明文：encryptPassword 依赖 window.CryptoJS 时序未就绪
2031. [惠山二期G] 多议题表决决策范围导出为空：导出主键与筛选须与 list 的 getQueryParams 同源
2032. [惠山二期G] C 端附件 JSON 字符串 "[]" 被当有效 URL 显示为可点链接
2033. [惠山二期G] 小区台账空置广告位弹窗：不能因无 revenueContractId 跳过备案详情
2034. [惠山二期G] 列表 link 跳详情：主键字段、路由语义与 getRouterPathByFilePath 要三处对齐
2035. [惠山二期G] 表决明细建筑面积列：固定列宽并显式居中以压过 amountFormatter 右对齐
2036. [惠山二期G] 房屋变更对接可选新字段 houseNum：双表单 + 变更对比，非必填靠 rules 白名单
2037. [惠山二期G] 小区台账 statisticsMap 街道气泡与小区点混显的完整修复套路
2038. [惠山二期G] 一般表决列表「业务类型」空白：列表字典过滤与详情页不一致
2039. [惠山二期G] DetailTemplate 字段标签说明 labelTooltip 与可选金额校验
2040. [惠山二期G] 房屋维护/变更：预测建筑面积 predictFloorArea 改非必填须双页同步 rules 并预留后端校验
2041. [惠山二期G] 业主自治「全选楼幢」：general 的 DecisionRangeTable.setData 只提交当前楼幢会丢全选
2042. [惠山二期G] 多议题线下表决 VoteRangeDialog：外层 Headline 包 CandidateConfigTable 会出现「表决项 + 空框收起」双层
2043. [惠山二期G] 待办详情返回：resolveBackNavigationPath 的 backUrl 须拆 path/query，且仅允许站内单斜杠 path
2044. [惠山二期G] buildDetailPathFromRoute 非 tableid 路由禁止末尾裸拼接主键
2045. [惠山二期G] decisionRangeBuildingSelectMixins：exist 户室与全选状态的三处一致性
2046. [惠山二期G] B 端 SSO 先开空白窗：window.open 不能带 noopener，否则无法编程式跳转
2047. [惠山二期G] stripDuplicateHomeRoutes 裁掉 /index/home 后：守卫 canonicalize 来不及，须在 constantRoutes 加静态别名重定向
2048. [惠山二期G] 竣工备案 completion/detail：相邻字段共用 tip 计算属性时易整段复制错字段文案
2049. [惠山二期G] 后端无附件返"[]"前端split误作附件
2050. [惠山二期G] 无合同ID不请求致空置广告位图片缺失
2051. [惠山二期G] 全局表格滚动条常显且列宽防省略
2052. [惠山二期G] 楼盘表直用接口数据且布局防裁切
2053. [惠山二期G] 房屋详情页取消六字段前端必填校验
2054. [惠山二期G] 小区台账地图标记混显因竞态需序列与防抖
2055. [惠山二期G] 一般表决列表业务类型不展示因字典过滤0
2056. [惠山二期G] houseNum字段与后端命名一致且未设必填
2057. [惠山二期G] 预测建筑面积前端去除必填校验
2058. [惠山二期G] 全选楼幢勾选丢失因setData缺陷
2059. [惠山二期G] noopener使父页无法控制子窗跳转致空白
2060. [惠山二期G] table.js创建即查询致空参后端弹窗
2061. [惠山二期G] zs-input-number无按钮留内边距截文本
2062. [惠山二期G] 通用详情页时间变更事件覆盖选择致回显错误
2063. [惠山二期G] 房屋变更页缺少项目信息致楼幢单元选择失败
2064. [惠山二期G] 报事工单详情文本单行省略致显示不全
2065. [惠山二期G] 表格开关列固定宽度致长表头显示截断
2066. [惠山二期G] 侧栏首页路由被裁剪且归一化晚致404
2067. [惠山二期G] 房屋变更须先选项目否则楼幢查询无过滤
2068. [惠山二期G] 施工结算总额注释误袭线下核查费文案
2069. [惠山二期G] 物业B端首页未区分终端类型误渲新版
2070. [投资推送] 红利 core 依赖丢失的 pyc 导致运行失败
2071. [投资推送] 本地 stockdb 成份股加权估算指数股息率
2072. [投资推送] report/push 统一入口与三模块推送约定
2073. [投资推送] 数据源 URL 集中进 data_sources 配置
2074. [投资推送] 日频调仓：daily-monitor 与全日频买卖语义
2075. [投资推送] 增强因子优化：网格不优于默认、贝叶斯精调有效
2076. [投资推送] market_cap DataFrame 布尔判断导致 report 冒烟失败
2077. [投资推送] 阈值/选股约束变更后的 79 窗滚动回测约定
2078. [投资推送] 纳指估值买入阈值与分位参数联动
2079. [投资推送] 买入回测与完整策略回测必须分脚本，文档须标明是否含卖出
2080. [投资推送] 美股月度 Forward PE 在回测与实盘须沿用上月末，避免当月未来数据
2081. [投资推送] 全量回测区间对外用「自各指数基日起」，勿暴露 1990 占位起始日
2082. [投资推送] 红利指数就绪行须与其它模块一致输出实时价字段
2083. [投资推送] 峰值回撤 10% 一刀切卖出在强势趋势年显著劣于持有
2084. [投资推送] 「相对高点跌幅」买入过滤阈值按指数单独配置
2085. [投资推送] 止盈后再买入须等浮盈回落到约定阈值（如 30%）
2086. [投资推送] QDII 限购场景应提高买入频率、降低单次金额
2087. [投资推送] VectorBT 与 RQAlpha 对齐的工程约定
2088. [投资推送] 中证A500(000510)与中证500(000905)是独立模块，回测无行情年份须显式输出行
2089. [投资推送] A股宽基「PE分位+股债利差分位」联合卖出门槛在十年回测中几乎不触发
2090. [投资推送] 宽基卖出策略产品决策：仅科创50保留卖点，其余指定指数关闭卖出逻辑
2091. [投资推送] 移动止盈：按峰值回撤阈值扫描，采纳标准为波段收益较当前提升≥1.5个百分点
2092. [投资推送] 红利买入阈值放宽须用 2015 至今全窗口回测，兼顾买入次数与长期收益
2093. [投资推送] 历史数据本地缓存：回测/脚本读缓存，日报拉数增量写回缓存
2094. [投资推送] backtest_html：时间范围筛选、横轴年/月/日（默认月）、指数下拉按收益率降序且须含全部标的
2095. [投资推送] 每日推送仅包含有买卖信号的标的，收益率末四位默认不推荐参与额度分配
2096. [投资推送] 恒生科技卖出不对称修补：卖出需价格高于近1年买入成本+25%
2097. [投资推送] 买点消融：美股可删无效硬门槛，宽基/恒科/红利误删核心条件会失真频次
2098. [投资推送] 多因子数据管道：Parquet 优先，远程 API 必须先落本地再算
2099. [投资推送] PE 行业分位：负 PE / 零 PE 一律按缺失走 L3=0.5，禁止取绝对值
2100. [投资推送] 基本面因子行业中性化：ROE/毛利率 z-score，股息率与 PE 分位不中性化
2101. [投资推送] 美股限购：取消冷却期，用阈值放宽 + 单次基准金额换买入日
2102. [投资推送] 美股买点：21 日 10Y 利率升幅上限拦截利率急升阶段
2103. [投资推送] 美股 PEG：Forward PE 缓存 + 增速多级回退链
2104. [投资推送] 红利近 10 年股债利差分位仅作报告参考，不改变 is_buy
2105. [投资推送] 择时报告：买卖点位写指数数值，不写距高低点涨跌百分比
2106. [投资推送] 汇率买点：回测无明显收益贡献则整链移除
2107. [投资推送] 组合回测 HTML 未持仓指数不显示买卖点
2108. [投资推送] 指标变更后必须全量回测并重生 HTML
2109. [投资推送] 数据源变更后跑 validate_data_baostock 七段校验
2110. [投资推送] NDX Forward PE 主源 HOM 相对 Barron's 偏低约 13%
2111. [投资推送] H30269 等指数无 baostock K 线需 ETF 收益相关性抽检
2112. [投资推送] logs 仅日志、cache 与 output/backtest 与 gitignore 分工
2113. [投资推送] backtest_trade_signals 共用估值面板避免双倍构建
2114. [投资推送] report 与回测共用 config 阈值与买入金额链路
2115. [投资推送] 实盘剩余额度与回测年度预算两套分配模型
2116. [投资推送] [投资推送] 实盘挂单价与现价偏离：根因是调仓日历与筛选参数未对齐建仓日
2117. [投资推送] [投资推送] Phase 7-B Alpha 晋级：点估计改善仍可能因预注册闸门整体 FAIL
2118. [投资推送] [投资推送] 申万行业映射：静态快照、显式 unmapped、>10% 停线
2119. [投资推送] [投资推送] 融合排序稳健性：持仓上限显式化与 buffer 归因
2120. [投资推送] [投资推送] 调仓敏感性 Bootstrap：主方案调仓日偏移，辅方案分块重采样
2121. [投资推送] [投资推送] 宽基买入信号年际频率骤降：先查估值分位而非只调阈值
2122. [投资推送] [投资推送] 连续多日买卖信号：报告须标出当日可用的阈值与指标数值
2123. [投资推送] 宽基回测：iterrows 标量买入评估改为向量化掩码
2124. [投资推送] 买入金额排名重复计算与磁盘缓存
2125. [投资推送] 本地报告与微信推送脚本分离
2126. [投资推送] 推送/统计改动禁止实测微信推送
2127. [投资推送] 策略阈值与公共配置：config.py + 环境变量优先
2128. [投资推送] AlphaPurify：分层收益须与 IC 共用方向翻转后的因子
2129. [投资推送] 因子诊断默认 IC 口径为 Spearman Rank IC
2130. [投资推送] [投资推送] report 未触发买卖时不展示参考金额与触发估算
2131. [投资推送] [投资推送] 行情默认走实时，CLI 不分支，无实时再回退
2132. [投资推送] [投资推送] report 慢：开盘前 sync_data_cache 定时预拉
2133. [投资推送] [投资推送] 红利 report 须与 is_buy_signal 同含近252日高点回撤
2134. [投资推送] [投资推送] 额度分配：美股/创业板增速分离且缓存指纹含 growth
2135. [投资推送] [投资推送] 报告只输出已接入数据源的多维指标
2136. [投资推送] [投资推送] 新指数买入频次约束无解时需显式折中阈值
2137. [投资推送] [投资推送] DuckDB「被占用」常为单进程多连接：读路径勿开写连接且须自动 close
2138. [投资推送] [投资推送] DuckDB 读出的 datetime64[us] 与 CSV 的 [ns] 混用会导致 merge_asof 键不兼容
2139. [投资推送] [投资推送] StockDB 顶层 `rd.get('*')` 全量扫描易超时，数据源对比应文档+定向探测
2140. [投资推送] [投资推送] 指数机械复现（Phase 7-A）：只抄官网编制方案，策略变形进待测清单
2141. [投资推送] [投资推送] 死代码/冗余排查：入口+import 链+批处理/README 三向对照
2142. [投资推送] [投资推送] 代码库模块分层与运行时目录约定
2143. [投资推送] [投资推送] 回测 HTML 图表默认筛选：横轴「日」+ 当年 YTD 区间
2144. [投资推送] [投资推送] Windows 批处理入口：日报与自基日全历史回测
2145. [投资推送] [投资推送] 红利策略约束消融：降回撤≠相对市场超额，需区分现金暴露
2146. [投资推送] [投资推送] 文档结构：根 README 统一指数定投+红利子策略+Parquet 基建
2147. [投资推送] 月调仓含成本后低波 Band 相对 Top 的优势会被换手侵蚀
2148. [投资推送] 低波 Top + 调仓缓冲：保留池、每期卖上限与买卖互斥
2149. [投资推送] 原生 backtest 与 RQAlpha NAV 不一致但成交一致时，根因在现金与公司行为顺序
2150. [投资推送] AlphaPurify 因子诊断提速：进程内缓存与报告渲染去重
2151. [投资推送] 投资推送：实盘报告与回测对同一指数的信号口径刻意分叉
2152. [投资推送] [投资推送] 红利同规则多指数未同买：PE 分位与近1年区间低位豁免
2153. [投资推送] [投资推送] 环境配置收敛为单一 push.env
2154. [投资推送] [投资推送] 红利报告入口：core 库化、report.py 为 CLI
2155. [投资推送] [投资推送] 组合金额：_build_portfolio_by_code 为未引用死代码
2156. [投资推送] [投资推送] 实盘买入金额参考链：alloc → ranking → BASE
2157. [投资推送] [投资推送] dividend_lowvol_rotation：17 项可消融约束与三项必留结构约束
2158. [投资推送] 红利指数独立脚本与统一 report 流水线并存
2159. [投资推送] 微信推送从 PushPlus 迁 Server酱 与额度规划
2160. [投资推送] drop_to_buy 昨日已买入时的「涨幅熔断」反向推演
2161. [投资推送] 废弃 buy_amount_tiers 与孤儿 pyc 清理约定
2162. [投资推送] 投资推送按策略类型扩展新指数（非全局注册表）
2163. [投资推送] dividend_lowvol_rotation 止损无 ATR 与参数优化流水线
2164. [投资推送] [投资推送] Windows schtasks 创建中文计划任务：禁用 /tz，/tn 勿加引号
2165. [投资推送] [投资推送] 手工运行 push.py 控制台 GBK 与 Unicode 符号冲突
2166. [投资推送] [投资推送] 指数信号回测双管线：买入持有 vs 买卖波段
2167. [投资推送] [投资推送] report 全量展示 vs push 仅推送有买卖信号的指数
2168. [投资推送] [投资推送] dividend_lowvol_rotation ablation：大量开关可删，仅保留三项硬约束
2169. [投资推送] [投资推送] 红利合并推送：强烈买入利差 3.2% 与长短期双轨文案
2170. [投资推送] setup_task.bat 在 if 括号块内 echo 含括号或冒号会解析失败
2171. [投资推送] spread_10y_percentile 仅报告展示不参与买卖门控
2172. [投资推送] 年度买入回测按年一份 Markdown 覆盖保存
2173. [投资推送] 回测买卖阈值改 config/push.env 而非 backtest 脚本
2174. [投资推送] 红利低波轮动 live 报告：资金优先级与按手建仓
2175. [投资推送] [投资推送] 全回测与单年回测同年投入不一致：分档归一化须按自然年
2176. [投资推送] [投资推送] drop_to_buy.py 是盘中推演，买卖判定在 *_signal.py / dividend_data
2177. [投资推送] [投资推送] config.INDICES 仅红利模块；宽基走 CN_BROAD_INDEX_BY_CODE
2178. [投资推送] [投资推送] cn_broad 分指数阈值环境变量与 CSIndex 指标 URL 约定
2179. [投资推送] [投资推送] push.env 勿跟踪；曾提交历史则轮转 Server酱 SendKey
2180. [投资推送] [投资推送] merge_dataframes_by_date 将日期转成 python date 导致 merge_asof 间歇失败
2181. [投资推送] [投资推送] 波动率分位诊断「固定20日」年化不可当作月度调仓策略预期
2182. [投资推送] [投资推送] .gitignore 须覆盖 rqalpha_env 与已跟踪的 push.env
2183. [投资推送] [投资推送] 腾讯实时行情：中证定制指数代码用 cs 前缀
2184. [投资推送] [投资推送] 回测买入信号审计：用年内高低区间位置筛高位买入簇
2185. [投资推送] 定时推送无消息是「无买卖信号跳过」而非接口失败
2186. [投资推送] 红利类回测：全收益指数 ≠ 价格指数 + 现金分红
2187. [投资推送] Parquet 离线库：manifest 缺口、残留键与多 part 重复行
2188. [投资推送] index_daily 分区 symbol 为 6 位指数代码，非 RQAlpha 后缀格式
2189. [投资推送] 买卖回测与定投回测脚本职责分离
2190. [投资推送] [投资推送] 场外 QDII 申购：按 T 日净值成交，主体为已公开的美股前收盘
2191. [投资推送] [投资推送] 单次买入金额：战略权重 + 位置×就绪度，凯利仅作上限参考
2192. [投资推送] [投资推送] 年际买入频率解读：A 股卡 PE 分位，美股另卡 10Y 利率分位
2193. [投资推送] [投资推送] 下线指数：改 INDICES 并清理旧 Windows 计划任务名
2194. [投资推送] roe_volatility 与 roe_volatility_ratio 回看窗口不同
2195. [投资推送] 回测表现与诊断 IC 不一致时的三类修正口径
2196. [投资推送] 回测报告慢因逐行遍历与排名未缓存
2197. [投资推送] README对齐指数策略与回测体系逻辑
2198. [无锡市区小程序嵌入H5] 苏服办/支付宝 H5 扫脸拉不起：相同 URL+token 清缓存失败、重登容器成功，说明缺的是容器内人脸上下文而非 token 失效
2199. [无锡市区小程序嵌入H5] 外跳投票/第三方页：h5ExternalWebview 对 URL 二次 decodeURIComponent 会把 Base64 token 里的 +/= 弄坏
2200. [无锡市区小程序嵌入H5] H5 嵌小程序改源码仍弹「业主表决」确认框：实际跑的是 dist 里旧的 usePortal 编译产物
2201. [无锡市区小程序嵌入H5] 无锡市区嵌入 H5 通用 webView：仅允许 https 且域名白名单，拒绝 javascript:/data: 与任意外链
2202. [无锡市区小程序嵌入H5] 智能问答改三方 OAuth：对齐无锡市区 G 的 security/oauth2/authorize，原页保留口令「进入新页面」才走新链
2203. [无锡市区小程序嵌入H5] 从小程序 wygl-wxxcx 迁入门户 webview 页后本地图 404：禁止按当前路由拼 static，用 resolveZhishuAsset + import.meta.url
2204. [无锡市区小程序嵌入H5] H5 下 uni-icons 勿用 @tap.stop
2205. [无锡市区小程序嵌入H5] ZsDateRangePicker：快捷区间须确认、查询手动触发
2206. [无锡市区小程序嵌入H5] 日期下限静默 clamp 要改成禁选或可见提示
2207. [无锡市区小程序嵌入H5] 嵌入宿主 H5 的 ReturnAppBtn 与 backToApp 回退链
2208. [无锡市区小程序嵌入H5] 苏服办包裹页 appId 与人脸 API appId 不可混用
2209. [无锡市区小程序嵌入H5] 小程序 web-view 拦截第三方 backUrl 回自家首页
2210. [无锡市区小程序嵌入H5] 苏服办投票 H5 扫脸成功后勿再调 handleFaceSuccess
2211. [无锡市区小程序嵌入H5] 无锡 H5 维修资金页房屋历史交易明细：accountTransInfos 与 proDeal 展示约定
2212. [无锡市区小程序嵌入H5] 无锡 H5 子模块 dev_wuxi-sfb 与 dev_shiqu 的功能同步方式
2213. [无锡市区小程序嵌入H5] 小区/项目信息页物业公司：业委会与物管会主体取不到则显示 -
2214. [无锡市区小程序嵌入H5] 报事报修列表 z-paging：#top 插槽 + height 100% 防列表盖住顶部操作区
2215. [无锡市区小程序嵌入H5] 小程序 web-view 内腾讯地点搜索 JSONP 报 105：直链正常时需同源 /qqmap 代理 + JSON 请求
2216. [无锡市区小程序嵌入H5] 苏服办人脸支付宝 success 返回 result:"true"/msg:"成功" 却被判失败
2217. [无锡市区小程序嵌入H5] 嵌 web-view 的 H5 轮播/静态资源：接口相对路径须拼发布前缀绝对路径，禁止 ./ 相对当前路由
2218. [无锡市区小程序嵌入H5] 灵犀投票 wxzj.wxwgzx.com：VITE_WEBVIEW_ALLOW_HOSTS 配域名并重启；小程序 web-view 还需配置业务域名
2219. [无锡市区小程序嵌入H5] 苏服办内嵌灵犀 H5Vote 报 ERR_BLOCKED_BY_RESPONSE：灵犀 CSP frame-ancestors，需对方放宽或顶层/系统浏览器打开
2220. [无锡市区小程序嵌入H5] 苏服办 livenessFaceAuth：默认勿 getTicket/forceFresh，arg1 用 URL 用户 token、arg2 为 '1'
2221. [无锡市区小程序嵌入H5] 苏服办人脸 SDK success 可能返回 JSON 字符串，需 normalize 后再判 retcode/msg
2222. [无锡市区小程序嵌入H5] uni-app H5 覆盖全局 wx 导致 wx.miniProgram 为空：index.html 守卫 + restoreWeixinWx
2223. [无锡市区小程序嵌入H5] 门户首页「业主决策」外链与「共有资金表决」内嵌页是两条链路
2224. [无锡市区小程序嵌入H5] 苏服办深链 topicvoteid：入库后登录完成自动开门主决策，外链追加 topicvoteid 与 Base64 backUrl
2225. [无锡市区小程序嵌入H5] 苏服办 URL 换票登录：token/name/idType/idNumber/phone 五字段缺一即 toast 且不请求
2226. [无锡市区小程序嵌入H5] 共有资金总览查询时间与余额统一取自 accountStatistics
2227. [无锡市区小程序嵌入H5] accountStatistics.accountDisclosure 为 0 时隐藏「查询明细」
2228. [无锡市区小程序嵌入H5] 门户灵犀绑房：POST /external/lingXi/selectMyHouse 后同步业主房屋列表
2229. [无锡市区小程序嵌入H5] uni-app H5 地图报 Map key not configured：写 __uniConfig.qqMapKey 而非 sdkConfigs.maps
2230. [无锡市区小程序嵌入H5] 小区周边列表 district 取自腾讯 ad_info.district，禁止硬编码行政区
2231. [无锡市区小程序嵌入H5] H5 部署在 /h5/ 子路径时 Tab 图标须 resolveStaticIcon，禁止 /static 根路径
2232. [无锡市区小程序嵌入H5] 共有资金明细接口路径含 statistics 段
2233. [无锡市区小程序嵌入H5] 业主决策确认弹窗需红字标注适用区（梁溪/滨湖/新吴）；发布 tag 仅在父仓打
2234. [无锡市区小程序嵌入H5] 苏服办深链 sfbLogin：name/idType/idNumber/phone 密文前端不解密，URL 原样 POST 给后端
2235. [无锡市区小程序嵌入H5] 苏服办门户首页轮播：pages/webview/home 用原生 swiper，banner 当前仅本地图不调接口
2236. [无锡市区小程序嵌入H5] 维修资金房屋历史交易明细：鹏业对接后增加「温馨提示」弹窗（固定合规文案）
2237. [无锡市区小程序嵌入H5] 小区信息/物业合同 UI 精简合 main 时：main 版 project/info 无地图模块需单独改
2238. [无锡市区小程序嵌入H5] 凸起自定义 TabBar 与底部苏服办落款避让
2239. [无锡市区小程序嵌入H5] 第三方人脸跳转 backUrl 用 Base64 而非裸 URL/仅 encodeURIComponent
2240. [无锡市区小程序嵌入H5] web-view 内嵌 H5 的 PDF 预览需 postMessage 交给小程序
2241. [无锡市区小程序嵌入H5] 无锡市区嵌入 H5 双仓与 dev_wuxi-sfb / dev_shiqu 提交流程
2242. [无锡市区小程序嵌入H5] dev_shiqu 合并维修资金冲突时保留 wuxi-sfb 交易详情实现
2243. [无锡市区小程序嵌入H5] 共有资金明细类型「全部」重复：筛选项只信字典 benefit_app_account_fund_type，禁止再手拼一项
2244. [无锡市区小程序嵌入H5] 共有资金概览「监管银行」误绑 openbankName：应显示 regulatoryBankName，开户支行单独一行
2245. [无锡市区小程序嵌入H5] 苏服办人脸「免重复识别」默认 5 分钟：bdc 页须同时校验 URL 与时间戳，防 verifyResult 残留绕过
2246. [无锡市区小程序嵌入H5] 无锡苏服办 H5 人脸集成落点：官方 jssdk + sfbFaceAuth/h5Context，入口 token 不得当业务 Authorization
2247. [无锡市区小程序嵌入H5] 无锡三资监管演示门禁：无 Token 仅允许 newHome，移除 TabBar 后 401 也 reLaunch 到 newHome
2248. [无锡市区小程序嵌入H5] 无锡市区 H5 发版：子模块 dev_wuxi-sfb 提交推送后，主仓 main-sfb 更新子模块指针并打时间 tag
2249. [无锡市区小程序嵌入H5] [无锡H5] 业主决策深链 URL 查询失败也要消费 topicvoteid，否则会反复弹窗/跳转
2250. [无锡市区小程序嵌入H5] [无锡H5] 「公共收益」列表与「共有资金」三页签是不同路由，缺公示表先确认是不是 sharedFunds
2251. [无锡市区小程序嵌入H5] [无锡H5] 主仓 -sfb 与子模块 dev_wuxi-sfb 成对同步：双分支提交、推远端、按 YYYYMMDDHHmm 打 tag
2252. [无锡市区小程序嵌入H5] [无锡H5] 详情页临时下线一块 UI：布尔开关 + 模板 v-if + 逻辑层跳过对应接口
2253. [无锡市区小程序嵌入H5] 苏服办人脸已成功却报 DOMException code 12：勿用 origin+import.meta.env.BASE_URL 做 hash 跳转
2254. [无锡市区小程序嵌入H5] 小程序 web-view 内 H5：localStorage 恢复与异步 init 竞态，需 h5Context 同步 URL 并 await whenH5ContextReady
2255. [无锡市区小程序嵌入H5] 小程序嵌入 H5 只写 project/projectName 时公共收益地址显示 -：须 setProjectInfo 与 projectAddress 多级回退
2256. [无锡市区小程序嵌入H5] 共有资金「查询明细」展开下方区域：scroll-view 用 scroll-into-view 带动画滚到 bank-section
2257. [无锡市区小程序嵌入H5] [无锡H5] 业主维修资金首页走 external/maintenanceHouse 双步接口，非 AppMaintain
2258. [无锡市区小程序嵌入H5] [无锡H5] web-view 嵌入场景的 houseId 由 h5Context.getH5Selection 统一解析
2259. [无锡市区小程序嵌入H5] [无锡H5] ZsImage 在 H5 子路径部署下的路径规则（小程序仍用 IMAGE_BASE）
2260. [无锡市区小程序嵌入H5] [无锡H5] uni-app ZsMap：Logo 误点跳转与 H5 上 enable-poi 的限制
2261. [无锡市区小程序嵌入H5] [无锡H5] 小区信息页数据与周边 POI 的接口分工
2262. [无锡市区小程序嵌入H5] 苏服办登录失败：h5Context 集中 showModal 展示入参与完整响应，并配合 noReject 避免拦截器 Toast 冲突
2263. [无锡市区小程序嵌入H5] H5 嵌入：initQqMapKeys 必须在 await initH5Context 之后，且无 token 不请求 getConfigKey
2264. [无锡市区小程序嵌入H5] H5 文件预览 filePreview：与 ZsImage 一致，根路径转 ./ 相对地址走当前域与 Vite 代理
2265. [无锡市区小程序嵌入H5] 列表项「前置标签 + 多行标题」：用 float:left 标签让换行从整行左侧起而非与标签列对齐
2266. [无锡市区小程序嵌入H5] 小区周边无数据：地图链路勿静默 return []，onShow 重拉详情须重置 markers 防 push 累加
2267. [无锡市区小程序嵌入H5] 苏服办跳转 URL 经 URLSearchParams 解析时 Base64 密文中的 + 会被解码为空格导致解密失败
2268. [无锡市区小程序嵌入H5] 小程序 web-view 嵌入 H5：业务 houseId 以 App 启动解析的 userStore 为唯一来源
2269. [无锡市区小程序嵌入H5] 公告列表手动 map 丢字段会导致 getDictLabel 永远显示占位符
2270. [无锡市区小程序嵌入H5] 详情页根容器 height:100% 叠加 App 全局 uni-page-body 100% 会在内容不足时撑出底部灰留白
2271. [无锡市区小程序嵌入H5] uni-app Vue3 script setup 使用 onLoad 必须从 @dcloudio/uni-app 显式导入
2272. [无锡市区小程序嵌入H5] 苏服办人脸核验默认换票改类型致令牌失效
2273. [无锡市区小程序嵌入H5] 表决外链须含topicvoteid及backUrl
2274. [无锡市区小程序嵌入H5] Tab中间图标绝对路径致子目录部署404
2275. [无锡市区小程序嵌入H5] 跨分支改动须同步dev-shiqu并打tag
2276. [无锡市区小程序嵌入H5] 中文图片改名英文须同步代码引用
2277. [无锡市区小程序嵌入H5] 落款bottom小于按钮顶部高度致被遮挡
2278. [无锡市区小程序嵌入H5] 维修资金详情修复须同步dev-shiqu及父引用
2279. [无锡市区小程序嵌入H5] backUrl含特殊字符须Base64编码防解析错乱
2280. [无锡市区小程序嵌入H5] 维修资金详情页合并须同步dev-shiqu解冲突
2281. [无锡市区小程序嵌入H5] webView.vue须注册于pages.json
2282. [无锡市区小程序嵌入H5] 用户名误存昵称且跳转前未刷新信息
2283. [无锡市区小程序嵌入H5] OverviewTab未展示监管银行与开户支行名称
2284. [无锡市区小程序嵌入H5] 后端响应混用PascalCase致交易项目不显示
2285. [无锡市区小程序嵌入H5] 类型选项直取字典数据免硬编码重复
2286. [无锡市区小程序嵌入H5] 未授权仅许访问首页且首页仅显监管
2287. [无锡市区小程序嵌入H5] 苏服办token仅用于SDK换票禁加请求头
2288. [无锡市区小程序嵌入H5] z-paging须禁自动请求且兼容mainId字段
2289. [无锡市区小程序嵌入H5] 业主决策URL异常须清topicvoteid防重复
2290. [无锡市区小程序嵌入H5] 人脸成功页跳转因base:'./'致URL非法失败
2291. [无锡市区小程序嵌入H5] 查询明细展开流水区外层滚动容器未自动滚动
2292. [无锡市区小程序嵌入H5] 维修资金房屋信息报错出自getHouseInfo
2293. [无锡市区小程序嵌入H5] 苏服办登录失败弹窗展示入参与接口返回
2294. [无锡市区小程序嵌入H5] 小区周边无数据因静默return且marker累加
2295. [昆山市民] 昆山市民 H5 子目录部署：后端 /statics 与本地 /static 不能共用同一套相对路径规则
2296. [昆山市民] 昆山市民 H5 资源与接口：相对前缀、无前导斜杠、小程序仍拼 IMAGE_BASE
2297. [昆山市民] E证通实名变更：onSuccess 与 onShow 重复消费 pending 导致卡在修改页
2298. [昆山市民] useLoadMore 入参用 async 函数会触发 regenerator 与外层 ref 压缩名冲突（read-only）
2299. [昆山市民] 腾讯慧眼 verify_mpsdk 在 uni-app 小程序的落点与去重
2300. [昆山市民] 已完成决策详情空白/NaN：图表接口失败不得阻断主详情
2301. [昆山市民] 鹿路通 H5 登录 code 一次性：wxLogin 去重与 URL 清理
2302. [昆山市民] 个人中心修改实名：H5 禁用、小程序保留
2303. [昆山市民] H5 部署子目录 wyzx：hash 路由 + relativeBasePlugin
2304. [昆山市民] H5 物业合同 PDF：pdfjs 依赖 Array.at 需 polyfill + legacy 构建
2305. [昆山市民] [昆山市民] H5 合同 PDF 预览：scroll-view 与 uni canvas 均不可用，需原生 canvas + pdfjs
2306. [昆山市民] [昆山市民] 鹿路通 web-view 内附件下载：H5 桥接 navigateTo downloadFile action
2307. [昆山市民] [昆山市民] 小程序 BASE_URL 禁止沿用 H5 相对路径 /api
2308. [昆山市民] [昆山市民] 实名成功后 getOauthInfoByIdNumber 缺 accessToken 会静默清空登录态
2309. [昆山市民] [昆山市民] 业主表决/业委会选举列表勿在 onUnload 多级 navigateBack
2310. [昆山市民] [昆山市民] 首页 uni-badge 角标被 swiper overflow 裁切
2311. [昆山市民] [昆山市民] 经营性收支公示柱状图：无 dataset 勿用 encode；echarts 实例复用 setOption
2312. [昆山市民] SDK 原始副本未引用属重复文件
2313. [昆山市民] 鹿路通 code 多处调用致登录接口重复请求
2314. [昆山市民] 选项表决选中状态异常致提交预览缺项
2315. [昆山市民] H5选举页误调登录缺code致页面空白
2316. [昆山市民] 小程序人脸后跳转被接口绑死致实名页卡死
2317. [昆山市民] H5调uni.openDocument致PDF空白
2318. [昆山市民] list.vue未立即加载致闪暂无数据
2319. [昆山市民] 审核详情页刷新丢dataId致节点key空
2320. [昆山市民] H5复用旧token因登录短路与persist
2321. [昆山市民] 多级navigateBack致返回退出多页
2322. [昆山市民] mp.js相对路径/api致小程序打包接口失败
2323. [昆山市民] 柱状图缺dataset与重复init致重影乱码
2324. [昆山市民] navigateTo同路由静默失败致更改实名卡页
2325. [昆山市民] 详情页onShow未刷新且watch漏监听致状态旧
2326. [泰兴] resetStepForm未清全字段致巡检弹窗异常
2327. [泰兴] 分类节点反向指针致循环引用筛选失效
2328. [泰兴] 分包静态资源不可跨包访问否则图标加载失败
2329. [泰兴] 员工端工单页未注入主题致主色冲突
2330. [泰兴] 物业B端改动须合并泰兴小程序验证
2331. [泰兴] 弹窗外层内边距致底部安全区留白
2332. [泰兴] PageButton颜色未传入内联样式致背景白
2333. [泰兴] WXSS静默丢弃:deep致弹层变窄卡片
2334. [泰兴] 步骤弹窗原生input与组件混用致显隐异常
2335. [泰兴] 真机弹窗图片不显因代码结构差异非证书
2336. [泰兴] 步骤表单抽离独立页致新开页及图片丢失
2337. [泰兴] 知识库查看全部无响应因text点击未生效
2338. [泰兴] 巡检步骤图片传后仍报未上传因临时路径拦截
2339. [泰兴] 工单统计图表不可旧版canvas渲染否则穿屏空白
2340. [泰兴] 组织架构搜索图标不可引404 CDN否则缺失
2341. [泰兴] 小程序 ECharts 图例缺色及饼图穿屏
2342. [泰兴] 巡保记录模块缺主题 mixin 致色不统一
2343. [泰兴] scoped 样式不作用于 page 根节点背景失效
2344. [泰兴] 决算金额字段含0即用仅缺失时走兜底
2345. [泰兴] 区域节点缺 id 被过滤须扩展 ID 提取
2346. [泰兴] 设施页搜索栏tab-box白底与24rpx对齐
2347. [泰兴] 物业端自定义tabBar致switchTab静默失败
2348. [泰兴] statistic页产物正常疑模拟器同层渲染兼容
2349. [泰兴] 工单评价星标不显示因SVG缺失路径误
2350. [泰兴] 收银台Tab布局紊乱因flex与文字换行
2351. [泰兴] PageButton自定义色须CSS变量强覆盖
2352. [泰兴] :deep()嵌套编译出Chrome53不支持CSS
2353. [泰兴] 手持端登录立即登录按钮主色为蓝色
2354. [泰兴] 维修对象数展示objectNum且0正常显示
2355. [泰兴] 详情页巡检结果下方须展示巡检人及电话
2356. [泰兴] 费用详情页标题金额字号未对齐设计稿
2357. [泰兴] 记录详情页白卡需浅灰底色分区显示
2358. [泰兴] WXSS不支持选择器反斜杠转义致报错
2359. [泰兴] 本地缺失search-icon致小程序加载失败
2360. [泰兴] procedure_frequency字典转频次显示
2361. [泰兴] 添加巡检记录三步向导且数据不丢
2362. [泰兴] 组织架构页横幅写死宽高导致图片拉伸
2363. [泰兴] 公示附件须以publicityId独立调用
2364. [泰兴] 性别选择器误用data-list致个人信息不显
2365. [泰兴] 验收意见并入信息卡片不再单独分块
2366. [泰兴] 字典remark未校验致JSON.parse崩溃
2367. [泰兴] returnTab路径未带staff前缀致跳转失败
2368. [泰兴] changeBuilding误用value致列表异常
2369. [泰兴] 标准工时未校验致非法格式存为NaN
2370. [泰兴] :deep权重打平致默认样式覆盖popup
2371. [泰兴] processPictureList未拼域名H5加载失败
2372. [泰兴] 分包组件不可跨包引用否则报错
2373. [泰兴] 申请页查看表决须取applyNo校验跳
2374. [泰兴] 决策页onLoad兼容id与decisionId
2375. [泰兴] remark为对象或非标JSON致解析报错
2376. [泰兴] maintainProject.js内聚施工详情逻辑
2377. [泰兴] 公示页用t_mf_publicityType等字典
2378. [淮安物管] [淮安物管] 列表行政区划筛选同时传 regionCode 与 regionName：zs-region-select 的 label + SearchFormItem labelModel
2379. [淮安物管] [淮安物管] 变更详情「变更记录」弹窗：以页面 contentInfo 为白名单对比 originalObj 与当前 form
2380. [淮安物管] [淮安物管] 变更记录弹窗「变更时间/变更人」为空：detailCallback 先合并顶层审计字段再合并嵌套变更体
2381. [淮安物管] [淮安物管] Element UI 动态 required 拦不住条件必填：经营用房类别等字段要自定义 validator + 提交前二次校验
2382. [淮安物管] [淮安物管] zs-search-form 末行仅剩一项时被拉满整行：给该项显式栅格 md:8
2383. [淮安物管] [淮安物管] 物业/前期物业合同变更：从备案详情发起，变更列表去掉「新增」
2384. [淮安物管] [淮安物管] detail-template hasChangeIndicator：空→有值变更与 originInfo 同步合并
2385. [淮安物管] [淮安物管] 业委会/物管会变更单：草稿 bizState=0 可增删委员，businessType 物管会=3/业委会=2
2386. [淮安物管] [淮安物管] 企业变更审核通过后变更角标不显示：变更前禁止读已更新的 companyRecord 主档
2387. [淮安物管] [淮安物管] 物业全域管理台账 pubLedger：/property/pubLedger/page 与多业务态单元格展示口径
2388. [淮安物管] [淮安物管] DictTag 只认 dictValue/dictLabel 时出现「有底色无文字」空标签：与 detail-template 对齐 value/label
2389. [淮安物管] [淮安物管] 监管账户开户申请详情：查看模式应始终展示银行账号字段（勿被 accountOpenType 隐藏）
2390. [淮安物管] [淮安物管] 公共查询楼幢表与物业管理楼幢范围表列对齐：同接口补 houseObligeeNums、userIdentityNums
2391. [淮安物管] [淮安物管] 企业变更详情变更角标：contentInfo 补 field，行政区域用 changeCompareValue 按展示名对比
2392. [淮安物管] [淮安物管] 公共查询物业管理区域详情：收益等能力前置健康检查走 checkServiceHealth 工具
2393. [淮安物管] [淮安物管] 物业数据大屏全屏后排名区留白：列表勿写死高度，沿卡片 flex 链撑满并用 ResizeObserver 算可见行
2394. [淮安物管] [淮安物管] 产品约定：审批流无撤回，「我发起的」列表仅保留详情入口
2395. [淮安物管] 开户申请详情隐藏账户公开并固定传 accountDisclosure=1
2396. [淮安物管] 列表导出 zs-button 须配置 permission 否则无权限用户仍可见
2397. [淮安物管] Headline 收起后仍占位导致内嵌 Tab 露出
2398. [淮安物管] zs-operate-column 非 scoped 白底勿命中表头 th
2399. [淮安物管] TagsView「更多」下拉 z-index 勿高于弹窗遮罩
2400. [淮安物管] 公共查询小区详情备案入口始终展示
2401. [淮安物管] 淮安物管本地联调 building 接口的 Vite 代理模板
2402. [淮安物管] 导出功能须加loading状态防重复点击
2403. [淮安物管] 导出接口未统一 params 传参仅导出首页数据
2404. [淮安物管] 导出预检与下载须共用参数并防重复点击
2405. [淮安物管] index.vue增手机查询由listMixins生效
2406. [淮安物管] 酬金数额不可写死%否则固定金额误显百分号
2407. [淮安物管] zhi2-web-admin子模块指针冲突以远端合并
2408. [淮安物管] 备案按钮受v-if限制致有数据时不显示
2409. [淮安物管] Vite代理用HTTP连HTTPS端口报错
2410. [苏住房C] 苏住房C 市民端(H5→微信小程序)产物 vendor 依赖被 relocate 脚本从主包删除，引发 ENOENT 与 __route__ is not defined
2411. [苏住房C] 微信开发者工具报「source size exceed max limit 2048KB」但自测体积合规：判定口径不同 + 4M 上限必须在工具 UI 勾选
2412. [苏住房C] uni-load-more/useLoadMore 迁 z-paging 后 tab 切换分页集体失效：切换必须重置到第 1 页并重新发请求
2413. [苏住房C] 苏住房C 市民端以 iOS 原生代码为唯一参照做像素级还原：素材/菜单配置从 iOS 提取，用户按页点名验收
2414. [苏住房C] 苏服办网关模式：所有接口统一走 getDispatcher/postDispatcher 两个封装接口，环境变量开关控制
2415. [苏住房C] 苏服办签名与业务签名共存：业务 sign 保留原名放 zs-sign，苏服办侧 sign 用自己逻辑，nonce/timestamp 同样加 zs- 前缀
2416. [苏住房C] H5 内拉起苏服办 SDK（扫脸）在微信/支付宝 web-view 里失败的三处根因：页面级 ?token= 未读、空 sfbToken 覆盖 tokenjssdk、扫码凭证优先级错
2417. [苏住房C] 小程序主包瘦身：mainStaticPaths 白名单要同步裁剪，只在分包使用的空状态图移到分包内
2418. [苏住房C] 微信 80058 preloadRule 超 2MB：单条规则的 packages 合计算体积，多分包合并预加载必踩，删规则优于拆包
2419. [苏住房C] 苏住房C 非 sfb 分支要物理移除苏服办网关逻辑，并在产物层验收
2420. [苏住房C] 苏住房C 模拟器启动失败/页面路径为空：导入 dev 产物且主包 4MB 超限，不是代码问题
2421. [苏住房C] 苏住房C H5「接口没调用」：分页 hook 自动请求早于 onLoad 设参
2422. [苏住房C] V1/V2 双 token 策略：tokenV1 集中预取而非请求层拦截，且实名状态勿读本地缓存
2423. [苏住房C] 苏服办网关 404 根因：路径段 jpass 与 jpaas 仅差一字母，且生产地址被复制进全部 env
2424. [苏住房C] 同源分支大合并（main-v2.1 → mp 微信小程序分支）的冲突裁决三层规则与 118 文件落地
2425. [苏住房C] 跨端复刻默认图口径：以 Android 原生工程为权威源，全量排查同名副本并删冗余，不动灰色剪影
2426. [苏住房C] 苏住房C 真机页面白屏而模拟器正常：公共组件里 getCurrentInstance().ctx.$attrs 在真机上 ctx 为 undefined
2427. [苏住房C] H5 子目录部署下 static/images/empty.png 等资源 404：绝对路径 /static/... 会请求到域名根，统一用 resolveStaticUrl 转相对路径
2428. [苏住房C] [苏房] ZsButton 的 width/padding 大面积失效：页面 scoped 样式作用不到自定义组件内部，收敛为全局 zs-button.scss 一套布局规则
2429. [苏住房C] [苏房] 小程序弹层内的日期选择器点了没反应：H5 下自定义遮罩 z-index:996 把弹层压在下面，改用 uni-popup + ZsDatePicker
2430. [苏住房C] [苏房] 苏服办网关调用：GET 接口未上架时用 VITE_APP_SFB_GET_VIA_POST_INTERFACE + zs-method:GET 走 POST 通道；「404 请求接口不存在」是网关层不是业务后端
2431. [苏住房C] [苏房] 主包体积卡在临界值时，公告列表这类小公共组件要下放到各分包各自一份，而不是放主包 components/
2432. [苏住房C] 小程序静态资源按分包归属迁移：脚本盘点 + 主包保留白名单 + 引用语法逐个替换
2433. [苏住房C] 用户偏好：新增登录/授权类能力要叠加在原页面，禁止另建中间页或替身登录页
2434. [苏住房C] 页面背景色不铺满：min-height:100% 依赖父级已解析高度，改用 uni-page-body 100vh + 根节点 inherit 全局修
2435. [苏住房C] 小程序分包自身超 2048KB 的瘦身套路：整页迁出 + 禁跨包引用 + 全库核对跳转路径
2436. [苏住房C] [苏房C] 小程序 uni-app 项目里清理人脸/原生桥接能力时，只删调用与页面、保留后端契约字段与工具文件，避免「构建过了但流程断」
2437. [苏住房C] [苏房C] 小程序底部固定按钮「居中 + 撑满宽度」同时成立：flex-direction:column + align-items:stretch，而不是 flex 横排 + align-items:center
2438. [苏住房C] [苏房C] 「两个图标同 URL 一个不显示」的根因是后台双层素材（iconPath+bgPath）与前端单层渲染组件不匹配，不是 URL/路径错
2439. [苏住房C] [苏房C] 跨 sfb 分支合并的验收口径：先确认缺陷在目标分支可复现，业务逻辑与页面展示对齐原分支，只让 sfb 专属逻辑独立，并补回被漏同步的工具文件
2440. [苏住房C] [苏房C] WXSS 编译报 error at token `*`：小程序不支持 `> *` 通配选择器，全局撑满宽度要写成具体类名
2441. [苏住房C] [苏房C] uni-app 条件编译块里同名 import 会被 ESLint 判重复声明而卡住 pre-commit：抽单一实例模块按平台赋值
2442. [苏住房C] [苏住房C] 小程序主包体积判定必须用「上传预估(source size)≈磁盘×1.17」，超限后按包下沉第三方依赖
2443. [苏住房C] [苏住房C] ZsImage 封装默认 aspectFill + height:100%，父级无高度即「请求 200 但图不显示」；须补 width prop + widthFix
2444. [苏住房C] [苏住房C] 小程序端 H5-only 全局对象（window/location/sessionStorage）必须收敛到跨端工具，报错点在 setup 而非页面逻辑
2445. [苏住房C] [苏住房C] 列表「一直加载中、Android 必现」的根因是自研 useLoadMore 请求失败不回 complete，统一改用 z-paging
2446. [苏住房C] [苏住房C] 同一 Tab 组里各列表接口的传参结构并不统一：GET 扁平参数被套上 POST 的嵌套 t 会让条件静默丢失
2447. [苏住房C] [苏住房C] 网关传输层的 GET/POST 判定必须在调用入口处定型，不能等 config.method 被后续改写
2448. [苏住房C] 消息中心 msgUrl 是后端下发的旧分包路径，分包迁移后必须在前端跳转归一化层做路径映射
2449. [苏住房C] ZsButton 全局开 virtualHost 会把页面各处 size="mini" 的小操作钮撑成整行宽（弹窗双按钮等宽要局部解决）
2450. [苏住房C] banner 跳转地址是「菜单码&参数」复合串：小程序侧当整串查菜单表必报「功能暂未开放」
2451. [苏住房C] 主包 Tab 页的兜底占位图必须放主包 static：放在分包里未预加载时是空白而非默认图
2452. [苏住房C] 双分支子模块间功能互迁的固定打法：子模块先迁再更新父仓指针，且按分包/依赖清单成套搬
2453. [苏住房C] 报事报修拦截「已加但还是能点进去」：微信开发者工具跑的是 dist/dev 旧包，源码改动未进产物
2454. [苏住房C] 苏住房C 小程序静态图标必须进主包 static 并登记 mainStaticPaths，否则安卓端弹窗缺图、iOS 正常
2455. [苏住房C] 列表页空数据默认图不显示：空态判定挂在 requested 上，接口异常时既不渲染列表也不渲染空态
2456. [苏住房C] 小程序分包页里 CardCell 标签渲染不出来导致「只剩值 + 大段空白」：styleIsolation 隔离下改回页面内 DOM
2457. [苏住房C] 签名图片不显示：ZsImage 内部 .img 为 width:100%，无确定尺寸容器时高度塌成 0；套固定尺寸 wrap + :deep 覆盖
2458. [苏住房C] ZsPicker 组件内写死 width: 97% 导致全站表单选择器右侧留白：组件层改 100% + 全局统一，页面级覆盖仍生效
2459. [苏住房C] 富文本接口统一渲染套路：ZsRichText 组件 + formatRichTextContent 五段式归一化
2460. [苏住房C] 用户偏好：带 if/else 分支的页面必须「进页面即 loading，全部接口返回后再渲染」
2461. [苏住房C] 苏服办（SFB）接入的结构化事实：网关签名 + ticket SSO + VITE_APP_SFB_* 四件套，且极易在合并中被整块误删
2462. [苏住房C] SVG 矢量图标在重构中被误删 → 交付型图标（单选圆圈等）改用组件内置 CSS 绘制
2463. [苏住房C] 分包内再套子目录的页面路径（intention/my/list）在安卓端报 Component is not found，解法是删页合并 + 组件上提
2464. [苏住房C] z-paging 底部白条遮挡 loading：fixed 模式按原生 TabBar 高度二次上缩，与 tab-bar-placeholder 叠加成双层留白
2465. [苏住房C] 微信小程序 uni-data-checkbox 有样式隔离，页面 :deep 改不动；选项间距必须换项目内 ZsRadio
2466. [苏住房C] 项目早已移除 vue-router：小程序取路由参数必须 onLoad(options)，useRoute() 返回 undefined 会让按钮「看得见点不动」
2467. [苏住房C] 消息/微聊列表真机不显示：page{height:100%} 在微信小程序里高度塌陷，改用 calc(100vh - nav-height) 给 ZsPaging 确定高度
2468. [苏住房C] 列表图片绑定后端字段（complexPhoto）三件套：ZsImage 远程解析 + rows.map 显式保留 + 后端未填充即回退占位图
2469. [苏住房C] 市民端手机号只读展示用原生 input + 公共 .form-plain-input，展示脱敏值与业务完整值分离
2470. [苏住房C] 苏住房C 市民端菜单三层来源：入口页写死 menuList + menuRouteMap 路由码 + 后台 app.suzhufang.config
2471. [苏住房C] 小程序 CSS 背景图不能用内联 :style 绑定 backgroundImage 拼 url()，改用 PageBg 组件
2472. [苏住房C] 投票选举页 recordId 只从 decisionOptionResponseList[0] 取：选举场景该数组为空，候选人整块不渲染
2473. [苏住房C] 记录详情补姓名要选对接口：getDecisionRecordDetail 不返回 decisionPlayerName，应优先 getAppRecordDetail
2474. [苏住房C] 选举详情「非分组」分支取错字段：selects.rows 应为 selectOptions
2475. [苏住房C] 页面自己弹业务弹窗时，核验类接口必须让 API 层带 noReject，拦截器会抢先弹 toast + reject 吞掉页面逻辑
2476. [苏住房C] 主包上传预估贴边时，先查 MAIN_STATIC_PATHS 里多余的兜底图，分包有的图不要进主包白名单
2477. [苏住房C] 苏服办网关接入：环境变量只保留「需申请」的 4 类，固定值下沉代码默认值
2478. [苏住房C] 小程序 Tab 样式不要自造：统一复用 components/commonNew/tabLine.vue（TabLine）
2479. [苏住房C] 苏住房C 项目拓扑与「同步无锡版本」的复用约定：pages_benefit 等新业务页从无锡市区 H5 项目整目录移植
2480. [苏住房C] 苏服办 H5 无反向代理导致网络图片全挂：统一 resolveMediaUrl 在构建期拼线上域名
2481. [苏住房C] 自定义 tabBar 的 Tab 页滚动加载失效：不用页面级 onReachBottom 转发，改 z-paging 内部 scroll-view + disableScroll
2482. [苏住房C] 苏服办轻应用内拨打电话必须走 lightAppJssdk.device.call，统一收敛 callPhone/extractPhoneNumber
2483. [苏住房C] 业务代码分支 sfb 与 main-v2.1 互合并时，冲突按「sfb 基础设施留 HEAD / 业务改进取 main」分类决议
2484. [苏住房C] 市民端空态与加载态统一约定：ZsEmpty「图片+暂无相关数据」，判断无数据用 noReject 抑制 toast
2485. [苏住房C] 苏住房C 小程序静态图 URL 必须走分包感知的 SUBPACKAGE_STATIC_IMAGES 映射，组件内私有推断会漂移
2486. [苏住房C] relocate 后处理脚本删主包副本时必须同时改 .json 与 .js 的组件引用路径，否则运行时 ENOENT
2487. [苏住房C] 点击无反应无报错：openPage 把相对路径补 '/' 后不是完整页面路径，uni.redirectTo 无 fail 回调就静默吞掉
2488. [苏住房C] collectBtn 图标不显示三连根因：漏注册 ZsImage、subpackage 未传、小程序端 resolveStaticUrl 误走远程 IMAGE_BASE
2489. [苏住房C] 主分支打包输出目录必须为 dist，发版按分支逐一核对 build 配置、dist 产物与 tag
2490. [苏住房C] 投票模块「我的决策/决策记录」空白：列表接口只回时间，缺 decisionResponseId/决策人/选项名，须逐条调详情接口补全
2491. [苏住房C] 苏住房C 小程序静态图按分包各存一份 + prune-main-static 裁主包：跨包 import 主包图标运行时 500，须走 resolveStaticUrl(path, 分包名)
2492. [苏住房C] 小程序上传宫格整块「不显示」：grid-auto-rows 按宽度算行高会算成 0，改用 aspect-ratio:1 + min-height 保底
2493. [苏住房C] ZsButton 的 long / block 类名在项目里没有对应样式：按钮只按文字宽度撑开，需在组件内补 .zs-button--block{width:100%} 且父容器用 align-items:stretch
2494. [苏住房C] 苏服办开放平台接入收敛为「2 个 gateway 接口 + header 里的 zs-path」网关转发模式
2495. [苏住房C] 脱敏工具按用户给定规则统一收口，user store 的 secure* 必须改 getter 避免旧缓存
2496. [苏住房C] 苏服办 SDK 拨号在微信内必然失败：必须「SDK 优先 + tel: 协议降级」双通道
2497. [苏住房C] 同源副本空状态统一：判据用主字段 + v-else ZsEmpty，跨分支合并保留目标分支引用路径
2498. [苏住房C] 苏住房C 双执行环境：小程序（uni-app+Vue3）与 H5 内嵌 APP（Vue2）共用一套源码与工具函数
2499. [苏住房C] Android 上进入机器人问答页两次：模块级「上次跳转时间」节流，别用组件内标志
2500. [苏住房C] 把富文本/接口文本里的电话号码转 tel: 链接：必须按通用标签切分、只处理纯文本片段
2501. [苏住房C] 批量替换图片组件后出现 Invalid end tag：根因是 <img /> 与 </ZsImage> 混写，且会连带产生畸形静态资源路径
2502. [苏住房C] 后端下发的 msgUrl 仍指向页面迁移前的旧主包路径：在跳转层做 normalizeLegacyPageUrl 兜底，不要改后端配置
2503. [苏住房C] 主包上传预估体积超限（磁盘未超但 source size 超）：先查 mainStaticPaths 白名单里被误加回的大图
2504. [苏住房C] uni-app 小程序分包内 node-modules 组件 require 指向分包 common/vendor.js → 模块未定义（relocate 脚本缺 vendor 路径修正，且 dev 不跑后处理）
2505. [苏住房C] 慢接口拆「预验证 + 提交」两步的客户端约定：串行全程 loading、第一次失败静默重试一次、第二次才统一解析错误文案
2506. [苏住房C] 苏服办人脸识别拉不起支付宝扫脸：livenessFaceAuth 的 arg0 必须是 jisnzjk，填业务网关 szffluzm 必然失败
2507. [苏住房C] 居民端媒体地址约定：不用绝对 URL，统一把接口返回的 /zhi2-pro/... 规范成无前导斜杠相对路径
2508. [苏住房C] 苏住房C 市民端分包迁移后 navigateTo is not found：全仓路径映射须区分「路由映射」与「跳转字符串」，并保留 tabBar 主包路径
2509. [苏住房C] 市民端分包页面图片真机全部不显示：图片被放在「跳转目标那个分包」的 static 里，必须复制到本分包 + 补 resolveStaticUrl 白名单
2510. [苏住房C] 主包上传预估超限：无用 style 的 scss 组件会把整份 uni.scss 注入组件 wxss（每组件约 +7.5KB），解法是 scoped+纯 CSS 并加构建后裁剪脚本
2511. [苏住房C] 市民端列表页批量迁移 usePaging + z-paging 的固定套路：getList(pageParams) 取参、ZsEmpty 换 #empty 槽、双列表合并为一个 z-paging 按 Tab 切 query
2512. [苏住房C] 富文本 rich-text 里相对路径图片必然空白：ZsImage 的域名补全救不了 rich-text，需统一的 formatRichTextContent 前置转换
2513. [苏住房C] 小程序「年-字-号」组合输入框的排版约定：不要用 flex-wrap 自然换行，改固定两行结构；placeholder 字号走 placeholder-class 单独下发
2514. [苏住房C] 小程序协议类静态文本统一走 szf.user.* 配置键，旧的 jyq.* 键返回空且不报错
2515. [苏住房C] 微信小程序 map 与 textarea 两个原生组件同页互相遮挡，表单字段被压成纵排后彻底点不到
2516. [苏住房C] 分包迁移后 easycom 不再命中：模板里 <FileList> 无显式 import 导致详情页附件整块静默不渲染
2517. [苏住房C] H5 端 GET 的 query 不能对单个 key/value 做 encodeURIComponent，只能明文拼接后整体编码一次
2518. [苏住房C] 小程序跨端对齐接口参数以 Android App 为准：请求结构是 {pageNo,pageSize,t:{...}}，列表数据在 result.records/result.total
2519. [苏住房C] 小程序横向 flex 分栏（左分类+右菜单）不能用 height:0 修滚动，否则右栏内容塌陷消失
2520. [苏住房C] 苏住房C 图片地址解析约定：config 里带内网 IP 的绝对 URL 必须按资源路径段重写到生产域名
2521. [苏住房C] 小程序端动态 import() 被编译成路径字符串，解构出的 store 恒为 undefined
2522. [苏住房C] 小程序卡片间距双失效：flex gap 对自定义组件根节点不支持 + 顺手清掉了组件自带 margin
2523. [苏住房C] [苏住房C小程序] 分包页面引用 SVG/静态图 500 的根因：相对路径被解析成 /<分包>/static 且未在分包映射表登记
2524. [苏住房C] [苏住房C小程序] 组件标签上的 style/宽高不生效导致地图区域高度为 0：ZsMap 必须自带 height prop + inheritAttrs:false
2525. [苏住房C] [苏住房C H5] 嵌在三方小程序 web-view 里时 Tab 吸顶 offset 必须为 0，不能回退导航栏高度
2526. [苏住房C] [苏住房C小程序] H5 内嵌原生 APP 的 SZDJSBridge 遗留逻辑清退清单：小程序端统一走 appLogin
2527. [苏住房C] [苏住房C] 同模块列表页报「请求异常」先对齐兄弟页的参数：接口名已声明所需的 complexId 不能漏传
2528. [苏住房C] houseCard 的「个人/中介」徽章被 `type` 当开关：苏找房二手房被自己的 type="stock" 挡掉，且写法与同源三兄弟项目分叉
2529. [苏住房C] 卡片图片底部「二手 | 📍 定位 + 区域/中介名」前缀条：showTypePrefix 开关与 agentCompanyName 优先于 regionName 的展示口径
2530. [苏住房C] 共享卡片组件在新调用方「字段不显示」的三层排查顺序与发布角色字段名不一致（publishUserType vs publishRole）
2531. [苏住房C] 验证码组件把按钮置「发送中」但不保证回调复位：失败分支必须 onFail + 重置图形码，且成功回调只在接口 code 200 后调
2532. [苏住房C] 决策/选举记录不显示投票人姓名：姓名来自两个不同层级（记录行 vs 详情 recordMap），选举页是决策页的镜像复制
2533. [苏住房C] 从 pages_main 抽公共组件到 src/components 后必报 Component is not found：相对路径引用在抽取后成了「少一级」的死链
2534. [苏住房C] 苏服办(sfb)分支与主分支的「房屋核验失败」逻辑已分叉：cherry-pick 时要保留目标分支的 API 调用族，只搬新增交互
2535. [苏住房C] [苏住房C/苏找房小程序] 主包上传体积卡在 2048KB 边缘：只被单个分包使用的「全局组件」必须下沉进分包目录
2536. [苏住房C] [苏住房C/苏找房小程序] 双 API 实例架构：index.js(/api，V2) 与 v1Instance.js(/szf，V1) 的划分与接口清单产出方式
2537. [苏住房C] [苏住房C/苏找房小程序] 用户明确要求身份证号不做脱敏：姓名/手机号脱敏保留，全局去掉字符脱敏只留请求头兜底
2538. [苏住房C] 登录后仍提示「请先进行业主身份认证」：getUserInfo 未 await 身份列表 + 登录只存 token 不刷新认证态
2539. [苏住房C] 双晒公示页两列卡片塌成一列：flex:0 0 48% + nowrap 标题使最小宽度超出容器，改 CSS Grid 兜底
2540. [苏住房C] 分包页面图标/背景图不显示：ZsImage 必须补 subpackage 属性，样式类名走 :deep
2541. [苏住房C] 生产环境按环境变量跳过某条业务分支：入口 URL 工厂 + 页面 onLoad 重定向双层拦截
2542. [苏住房C] z-paging 默认 fixed 全屏铺开：列表遮挡小程序自定义导航栏 + 筛选栏 sticky 失效
2543. [苏住房C] 苏住房C 登录统一改苏服办 SSO：封装 utils/sfb.js 并全量替换 /pages/login 跳转
2544. [苏住房C] 移动端请求约定：then 里不再判 code == 200，失败由拦截器统一 toast（配套清 noReject）
2545. [苏住房C] 多子模块指针分支禁止 rebase：109 个提交中 64 个改子模块，必然在中途反复冲突
2546. [苏住房C] 首页 tab 切换时按绑定小区列表刷新缓存：空列表必须清掉本地小区信息
2547. [苏住房C] ZsImage 图片不显示的双重根因：分包静态资源按「当前页面路由」推断子包 + 默认 height:100% 无父级高度即为 0
2548. [苏住房C] 小程序自定义组件标签上的 class 与 scoped CSS 不生效：父级布局类必须挂在内层原生包裹节点，否则 flex 失效（卡片右箭头掉到日期下方）
2549. [苏住房C] pages_transaction 整包迁移 z-paging 的标准规则集（含 5 类例外页的处理法），19 页一次收敛
2550. [苏住房C] 政策/流程指南正文白屏且控制台只有 Parse Error：CMS 正文里的尖括号被 rich-text 当成非法 HTML 标签
2551. [苏住房C] 登录页 clickCheckTask err: Cannot read property '0' of null + undefined is not iterable：基础库 3.8.6+ 与 2023 版 uni-app 编译器的多 input 兼容问题
2552. [苏住房C] 地图页底部 textarea「怎么点都输不进字」：原生 map 层级最高，v-show 不销毁原生层，只加 min-height/z-index 无效
2553. [苏住房C] ZsImage 头像/图片不显示的两个叠加根因：父级尺寸透不进组件 + 资源放在分包 static 而非主包
2554. [苏住房C] SFB（苏服办）分支定期合并 main-v2.1 的裁决口径：按「SFB 特有逻辑 vs 业务展示」二分，组件与 tabBar 单独判定
2555. [苏住房C] z-paging 默认 fixed 铺满全屏，页面顶部 Banner/「去申请」按钮写在组件外会被挡住点击（表现为按钮无反应）
2556. [苏住房C] z-paging 空态（#empty 插槽）自己不提供样式：.paging-empty* 未定义 + ZsImage 在无尺寸父盒里变成 0×0，必须补 uni.scss 全局空态样式
2557. [苏住房C] 苏服办网关请求：GET/POST 靠不同 interface_id 分流，且不要自己带 zs-method
2558. [苏住房C] z-paging 放进自己实现的 uni-popup 弹窗里列表空白：父容器只有 max-height、没有确定高度
2559. [苏住房C] 单选字段误用 getDictLabel：该函数会按英文逗号拆分编码再拼接多标签
2560. [苏住房C] ZsEmpty 的文案 prop 是 description 不是 text；分包 static 下的 svg 会被构建清掉报 500
2561. [苏住房C] 苏住房C（uni-app 小程序）zs-uploader 基于 uni-file-picker 时的显示异常根因与修法：尺寸档位 padding-top 未复位 + tips 与卡片标题重复
2562. [苏住房C] 苏住房C：uni-forms 红色必填星号的触发条件是 uni-forms-item 的 required 属性，rules 里的 required 只校验不显标记；图片上传区块的必填星号只能靠样式类补
2563. [苏住房C] 苏住房C：未读角标不消失——getMsgNum 不传 readFlag/projectType 时返回的是消息总数而非未读数，同一项目内多处调用必须参数同源
2564. [苏住房C] 苏住房C：富文本解码函数遇到「HTML 标签 + 实体编码混排」会跳过解码导致正文空白——decodeHtmlEntitiesIfNeeded 必须改为内容含实体即解码
2565. [苏住房C] 苏住房C 分支模型：苏服办(sfb/main-v2.1) 与微信小程序(mp) 是同一子模块的两条并行分支，互合时必须「排除苏服办网关与文档、保留 mp 目录结构、保留小程序专属能力」再编译验证
2566. [苏住房C] [苏房] 「仅分包使用的组件放在主包 components/」是主包超限的头号复发根因：迁回分包 + 补 componentPlaceholder，别动静态白名单
2567. [苏住房C] [苏房] ZsImage 的 aspectFill + height:100% 在父容器无确定高度时高度塌成 0：加 mode prop 走 widthFix 才是通用解
2568. [苏住房C] [苏房] 信息类详情页空数据约定：用「主字段 v-if + ZsEmpty v-else」整页给缺省图，不再渲染空白字段模块
2569. [苏住房C] [苏房] 决策详情「只显示标题、内容全空」的三层根因：分包内 CardList/CardCell 渲染不稳 + 只解构 rows + voteStore 缓存串单
2570. [苏住房C] 苏服办网关返回 code:0 + data:"null" 时被误报「网络错误」：字符串 "null" 绕过空值分支后触发兜底文案
2571. [苏住房C] 页面 URL 的 type 直接当接口枚举传参导致列表空数据：「最新楼盘」实际按「在售楼盘」查询
2572. [苏住房C] APP 内嵌 H5 场景：所有「回到 H5 tab 页」的跳转/后退都必须转交原生 backInfo，统一在 utils 拦截而非逐页改
2573. [苏住房C] ZsImage 图片高度塌成 0 的双重条件：外层盒子无固定高度 + 页面 scoped 样式穿不透组件内部 img
2574. [苏住房C] 分包页面复用别的分包图标：不是路径写错而是微信分包隔离，必须把资源复制到本分包并改 subpackage
2575. [苏住房C] 小程序柱状图数值标签被右侧裁断：grid.right 必须按最长标签动态留白，缩略图看不出来
2576. [苏住房C] 分包体积优化脚本把 z-paging 复制进分包后，require('../../../../common/vendor.js') 未改路径 → 分包启动即报 module not defined
2577. [苏住房C] z-paging 接口返回 rows:null 时 res.rows.map() 抛错且 Promise 悬空，列表永远停在「正在加载」
2578. [苏住房C] 慧物业菜单跳转丢小区 ID：menuRouteMap 读的是不存在的 userStore.projectId，且 fallback 菜单码配错到别的页面
2579. [苏住房C] uni-app 小程序登录态不持久：Pinia 持久化被 #ifdef H5 包住，小程序端根本不执行
2580. [苏住房C] ZsImage 图标塌陷为 0 + 卡片被压窄：父容器没给尺寸、外层 align-items:center、按钮 long 类三处叠加
2581. [苏住房C] 小程序隐私合规审计：声明了 scope.userLocation / requiredPrivateInfos 但代码根本没调 getLocation，属冗余声明要清掉
2582. [苏住房C] 小程序 Tab 首页「整页上滑 + 搜索框吸顶」的实现套路：合并进一个 scroll-view + 搜索区 sticky，图标裁切靠容器给足尺寸
2583. [苏住房C] 苏住房C 埋点接口 401 不得阻塞跳转：noReject/skipAuth 标记 + 拦截器跳过登录副作用
2584. [苏住房C] 苏住房C 小程序 navigateTo 相对路径跳转必失败：在 openPage/goto 里统一解析成绝对路径
2585. [苏住房C] 苏住房C 小程序 ZsButton 宽度三件套：去掉 width:inherit + block 属性 + 全局满宽白名单
2586. [苏住房C] 苏住房C 默认图回退双重失效：默认图所属分包未加载 + 所在分包未预加载
2587. [苏住房C] [苏房C] 同源三项目（泰兴/V3/苏住房C/苏住房G）复制迁移时，分支专属的路径体系必须逐项对照映射表再改
2588. [苏住房C] [苏住房C] 小程序 SVG 加载 500 的两类根因：分包静态白名单未复制文件 + 原生 img 相对路径按组件目录解析
2589. [苏住房C] [苏住房C] 小程序按钮禁用态变绿的根因：ZsButton 向原生 button 传 type=primary，且禁用色用了小程序不支持的 rgba(var(...))
2590. [苏住房C] [苏住房C] 小程序附件列表不显示：getFiles 在 noReject 模式下要读 res.data.data 才是附件数组
2591. [苏住房C] 苏住房C 小程序静态资源解析：分包迁移后按 SUBPACKAGE_STATIC_IMAGES 映射回退 pages_main，否则主包空态图 500
2592. [苏住房C] ZsImage 的 width:100%/height:100% 默认尺寸需要父容器给出确定尺寸：小图标 0 宽不显示、弹窗示例图与固定高冲突被压成 0
2593. [苏住房C] 小程序 wx:key 缺失要做全局脚本扫描并复扫归零，重点在公共组件而非报错页
2594. [苏住房C] ZsImage 分包静态资源 500：resolveStaticUrl 按页面路由推断分包 + 主包清单优先级
2595. [苏住房C] 分包页面里的 ./static/ 不会被 uni-app 打包出产物（同样报 500），必须用 ../static/
2596. [苏住房C] ZsPicker 作为「图标+文字」复合按钮的触发器：整块 @tap + defineExpose show + pointer-events:none
2597. [苏住房C] 自定义组件（ZsButton）上的 margin / UnoCSS 间距类不生效：改用原生 view 包裹层 + 父级 flex 防外边距折叠
2598. [苏住房C] 横向 tab 被压成竖排：flex 子项缺 flex-shrink:0 + word-break:keep-all 逐字换行
2599. [苏住房C] 微信小程序 WXSS 不支持 :not() 伪类，编译期直接 error at token ':' 且一次报多个文件
2600. [苏住房C] 分包静态图不能手写相对路径：<image src="../static/images/x.png"> 会被解析到主包 /static 而 404，须统一走 ZsImage + resolveStaticUrl
2601. [苏住房C] 决策记录只显示一项：enrich 里 `...record` 展开详情会覆盖列表字段，且 CardList 的 label/value/remark 三槽位映射错位
2602. [苏住房C] H5 卡片插图以 Android 原生实现为视觉基准：把 drawable 图复制进分包 static 并走 tabStaticUrl，弃用接口 iconPath + MenuImage
2603. [苏住房C] index.html 里的脚本一律按 location.pathname 计算资源根再用绝对路径：`./static/...` 在无尾斜杠入口（微信/支付宝 WebView）下必然 404
2604. [苏住房C] ZsImage 内部写死 width/height:100%，页面直接给它挂固定尺寸 class 会被撑满父容器 —— 必须外层包一个定尺寸盒子
2605. [苏住房C] [苏住房C] 市民端网关文件上传契约：二进制 multipart 独立字段 + 精简 header，禁止 base64 塞进 biz_content
2606. [苏住房C] [苏住房C] ZsDatePicker 显示成 2026-08-01 但「01」掉到第二行：分隔符 flex:1 挤压 + 日期文本未 nowrap
2607. [苏住房C] 小程序空状态图整块不显示：.empty-pic 用 fit-content 与内部 ZsImage 的 100% 形成尺寸循环依赖，盒子塌缩为 0
2608. [苏住房C] 苏住房C 小程序 szf 图片按分包拆分：主包有文件不代表分包能加载，缺失表现为 Failed to load local image resource（HTTP 500）
2609. [苏住房C] 苏住房C 列表页「接口正常返回但列表不展示」的通用排查点：响应结构硬解、无效 computed 遮蔽、useLoadMore 无 catch
2610. [苏住房C] 苏住房C 小程序自定义组件上的 @click 在小程序端不触发，@tap 才行；公共卡片组件需在根节点同时 emit click/tap
2611. [苏住房C] PageBg 背景图「变成全屏」的根因：absolute+inset:0+object-fit:cover 撑满 flex:1 的容器，需固定高度包裹盒（380rpx=190px）
2612. [苏住房C] 注销/退出登录后「消息」未读角标不消失：三层防护（onShow 清零 + 展示层登录取值 + 请求前后 token 双检）
2613. [苏住房C] [苏房C] 小程序图片地址统一走 resolveMediaUrl：ZsImage 再手动拼 IMAGE_BASE 会拼出 /ttp:// 非法串（500 且被当本地资源）
2614. [苏住房C] [苏房C] uni-list-item 的 link+:to 内置跳转不能与自定义 @click 共存：埋点接口报错会连坐页面跳不出去
2615. [苏住房C] [苏房C] wx.getSystemInfoSync 弃用警告：框架 vendor.js 内部调用必须靠 main.ts 首行 polyfill 重定向，只改业务代码无效
2616. [苏住房C] [苏房C] ZsButton 全宽要靠 block 属性（没有 long 类），且父级 .page 的 flex 居中会让按钮塌成窄条
2617. [苏住房C] [苏房C] ZsImage 的 subpackage 属性传错分包会让图标静默不显示；分包页面必须指向图片实际所在的分包
2618. [苏住房C] [苏房C] 小程序全量补 loading 防重复提交：useSubmitLock + ZsButton loading + VerifyCode 的 (countDown, onFail) 三段契约
2619. [苏住房C] [苏房C] 明细字段按错日期字段取值会导致整块无数据：先核对接口返回里到底有哪几个日期
2620. [苏住房C] 苏住房C 图片地址两套 CDN 前缀分流：/zs-fym 走 V1（szfang.szfcweb.cn），其余走 V2，四处必须成对同改
2621. [苏住房C] 小程序 static 路径解析不能只按「当前页面路由」推断分包：images/szf 散落在 5+ 个分包，须按文件名映射
2622. [苏住房C] 同一业务流程的多个提交页漏带 store 参数：接口报「物业管理区域权限不能为空」的根因是只补了一个页面
2623. [苏住房C] 小程序消息页：未读数统计必须带 readFlag:0，顶部管理/筛选要跟随列表滚动就移进 z-paging 内并关掉 fixed
2624. [苏住房C] 苏住房C 小程序 ZsPopup 左右不留白：容器宽度约束写进公共组件（max-width: calc(100vw - 40px) + margin:0 auto）
2625. [苏住房C] 苏住房C 微信小程序分包组件不能跨包引用：抽到主包 src/components/<业务域>/ 后统一改引用路径
2626. [苏住房C] ZsButton 禁用态变绿不是主题色问题：原生 button 的 UA 禁用样式压过了 rgba(var(--primary-color-rgb), .5)
2627. [苏住房C] 安卓微信小程序：列表卡片 slot 里的普通 view @tap 收不到点击（点卡片能进、点按钮没反应）→ 统一换 ZsButton
2628. [苏住房C] 分包内 easycom 组件（uni-icons）的 vendor.js 相对路径多算一层：构建后补丁脚本 + closeBundle 自动执行
2629. [苏住房C] 跳转类页面的子页返回不能写死 navigateBack(delta:1)：入口重复入栈后要点 2～4 次才退干净
2630. [苏住房C] 人工审核实名提交报「证件类型不能为空」：提交时实时读 userStore 会被 App.onShow 的 getUserInfo 清空，必须 onLoad 快照
2631. [苏住房C] V1/V2 网关请求参数统一进 zs-param：GET 走 query string、POST 走 JSON 字符串，zs-path 只放业务路径
2632. [苏住房C] 从泰兴小程序迁移微信人脸核身实名认证：startFacialRecognitionVerify + weChatVerify 的完整链路与三方前置条件
2633. [苏住房C] 投票/选举结果记录列表姓名空、详情「决策人」空：分组合并丢 decisionPlayerName + enrich 展开整个 record 覆盖已取字段
2634. [苏住房C] 小程序原生页改 web-view 嵌入：必须保留原生壳页（多入口不能共用同一 URL）+ 域名白名单 + 多分支同步
2635. [苏住房C] WXSS error at token ':' —— 微信小程序整类不支持 :not() 伪类（不是只禁通配符），解法是包 body 容器承接 flex
2636. [苏住房C] 分包内静态资源禁止 import：小程序里 import 生成的是按文件物理位置推算的路径，页面在别的分包就必然加载失败
2637. [苏住房C] uni.scss 末尾 marker 规则改动会让 prune-component-wxss-leak.mjs 的 LEAK_END 正则失配，主包体积暴涨超限
2638. [苏住房C] 苏住房C 市民端分包静态资源 500：ZsImage 默认解析主包路径，需按当前路由自动推断分包
2639. [苏住房C] z-paging 默认 fixed 定位，放进弹窗会与底部按钮重叠：必须关 fixed 并做三段式 flex 布局
2640. [苏住房C] 苏住房C 市民端无引用的双份网关实现：sfbConfig/SM3 签名重复两文件，按「只留实际在跑的链路」清理
2641. [苏住房C] 构建后裁剪脚本的 LEAK_END 正则与 uni.scss 全局类强耦合：uni.scss 一改，主包上传预估就超限
2642. [苏住房C] 小程序/H5 双端构建告警的清理清单：sourcemap 重复键要按平台判断、CSS 嵌套必须展开、本地缺失 SVG 统一改 CDN
2643. [苏住房C] 苏服办 H5 里图片不显示：内联 :style 的相对路径绕过 Vite 构建，必须改用 resolveStaticUrl
2644. [苏住房C] z-paging 默认 fixed 全屏定位会盖住页面顶部的搜索/筛选/操作区
2645. [苏住房C] 页面整体迁到分包后必须全量替换旧路由路径：登录页 pages/login → pages_main/login 残留导致 page not found
2646. [苏住房C] onShow 无条件重载列表会重置用户的表单选择：重载时必须保留已选值（选完子页返回选择被冲掉）
2647. [苏住房C] 苏服办网关上传参数必须传 { file }，传 { files: [...] } 会静默退化成普通 POST 网关
2648. [苏住房C] uni-app 自定义 tab 组件同时写 v-model 与 @update:model-value，监听被覆盖导致切 tab 不请求接口
2649. [苏住房C] 小程序列表逐条 push 数据 + :key=index，渲染时 item 变 undefined 报 fileSite of undefined
2650. [苏住房C] 苏服办登录漏调 V2→V1 token 换取接口：所有登录入口必须走同一套 token 双写
2651. [苏住房C] uni.previewImage 预览问号占位图：ZsImage 内部的相对路径解析不能绕过，预览前必须自行 resolveMediaUrl
2652. [苏住房C] uni-app 列表滑动时图片穿透底部固定栏：z-index + translateZ(0) + 底栏移出滚动容器
2653. [苏住房C] 项目存在两套后端域名，API 前缀必须按域名分别配置：szfcweb.cn 用 /prod-api，主接口用 /api
2654. [苏住房C] 小程序 downloadFile 报 invalid url：拼域名时用 replace(/\/\//g,'/') 把 https:// 也压成 https:/
2655. [苏住房C] ZsButton 不声明 disabled 也不绑定到原生 button：`:disabled` 只变灰不拦截点击，倒计时/同意须知页可提前通过
2656. [苏住房C] 微信小程序 canvas/echarts 图表放进 scroll-view 必空白：原生组件不支持滚动容器内渲染
2657. [苏住房C] ZsButton 的 width:inherit 使 flex + space-between 按钮组被撑满挤压：两个 success 按钮文字重叠
2658. [苏住房C] 第三方便民功能的 web-view 入口全部硬编码在 cc.szfcweb.cn:9999：新增同类页面先复用这些既有地址
2659. [苏住房C] 埋点类 fire-and-forget 请求必须配 noReject + skipToken，否则 401 会触发登出并打断后续跳转
2660. [苏住房C] 同一小程序内多套后端基础路径：szfang.szfcweb.cn 的 prod-api 不拼 /v2.0，主接口 szzfcjj.cn 才保留
2661. [苏住房C] 横向图标导航不要用 scroll-view + calc 页宽：改 swiper 整页切换，flex 均分列宽
2662. [苏住房C] Vue3 下 @tap.native 静默失效：搜索框点击无反应，改在外层容器绑 @tap + @focus 双通道跳转
2663. [苏住房C] z-paging 默认 fixed 全屏覆盖会盖住顶部搜索栏：搜索页必须 :fixed="false" + autoFocus
2664. [苏住房C] 自定义组件的内边距/圆角必须写在组件内部：父页 :deep 穿不透小程序样式隔离（ZsCheckbox highlight 模式）
2665. [苏住房C] 签字图不显示 + 下方大片空白：ZsImage 要给固定尺寸容器 + aspectFit，并兼容 signature/sign 双字段
2666. [苏住房C] 公共 BackBtn 自带 margin 会把固定底栏按钮顶偏溢出：容器清 margin + 按钮补 block
2667. [苏住房C] 苏住房C 小程序导航约定：政策/导引类详情一律走 webViewNav + H5，本地没有对应页面
2668. [苏住房C] 苏住房C H5 部署在子路径（/testh5/）时接口前缀必须用 ./ 相对路径，而非 /api
2669. [苏住房C] 小程序原生 map 组件层级最高，紧贴 textarea 时会吞掉点击导致「不能输入」
2670. [苏住房C] 给自定义组件根节点加 margin 类在 uni-app 里不生效，模块间距要用父容器 flex + gap
2671. [苏住房C] zhi2-mobile-shimin 打包产物目录与 npm script 命名约定（szffluzm，命令不再带 suzhufang）
2672. [苏住房C] H5 部署子目录时媒体相对路径被拼进 pages/index 前缀：resolveMediaUrl 需统一补前导斜杠
2673. [苏住房C] 小程序端 ImageUploader 直接调 uni.chooseFile 必崩：按平台分派 chooseFile / chooseMedia / chooseImage
2674. [苏住房C] 小程序 WXSS 里 url() 引用本地图片必然失败：背景图必须条件编译（H5 本地 / 小程序 CDN）
2675. [苏住房C] 小程序以 / 开头的图片地址会被当包内资源加载（500），相对路径服务端图必须经 resolveFullMediaUrl 补全域名
2676. [苏住房C] 苏住房C 小程序子包组件内用相对路径写静态图必 500：统一走 ZsImage/resolveStaticUrl 的分包感知解析
2677. [苏住房C] 苏服办渠道下未适配的小程序原生能力入口（扫一扫）要整块下线，不能留「请使用APP扫一扫」提示
2678. [苏住房C] 小程序 ECharts 5.3+ 初始化报 el.addEventListener is not a function：WxCanvas 缺 DOM 事件接口，补空实现即可
2679. [苏住房C] 小程序端父组件 :deep 穿不进子组件内部态样式：自定义组件要自带高亮能力（ZsCheckbox 加 highlight prop）
2680. [苏住房C] 小程序表决详情页内容为空：跳转前必须写缓存 + 详情页三级数据回退（接口选项 → 记录 optionList → 缓存 value 拆分）
2681. [苏住房C] 苏住房C 小程序调试器用 vConsole 而非 eruda：封装 initVConsole + 环境变量开关 + 连点 10 次开启
2682. [苏住房C] 接口报「网络错误，请稍后再试」但报文其实是业务失败：noReject 需实例级 supportNoReject:true 才生效
2683. [苏住房C] 苏住房C 小程序富文本图片超宽：rich-text 无法外部 CSS 控 img，必须在 formatRichTextContent 里注入内联样式
2684. [苏住房C] 苏住房C 富文本自动电话链接化会把长记录编号染成蓝色可点：电话正则必须加数字边界
2685. [苏住房C] 苏住房C 小程序列表页搜索框被盖住：z-paging 是全屏固定层，页头必须放它的 #top 插槽
2686. [苏住房C] 苏住房C 首页轮播图横向被裁切：aspectFill + 固定高度容器必然裁边，改 aspectFit + 按设计图比例联动宽度
2687. [苏住房C] 苏住房C 小程序底部按钮铺满整行：ZsButton 的宽度靠 block 属性，附加的 .long 类是不存在的死类名
2688. [苏住房C] 苏住房C 查询条「重置/查询」间距与圆角：改共用的 inquireBox.vue 一处即可同时覆盖四个查询页
2689. [苏住房C] 苏住房C 苏服办网关 V1/V2 并存：用 zs-source 请求头在网关层标识版本，不要在业务页判断
2690. [苏住房C] [苏住房C] 接口拿不到数据先看拦截器封装：noReject:true 才有 response.data.data，缺省时 response.data 已是业务数据
2691. [苏住房C] [苏住房C] 菜单码跳转表 menuRouteMap 是页面迁移后「page not found」的集中漏改点
2692. [苏住房C] [苏住房C] 菜单跳转工具只给相对路径补前导斜杠，分包页必须写完整路径
2693. [苏住房C] [苏住房C] 分包内静态资源必须用 resolveStaticUrl(路径, 分包名) 解析，@/static 是主包路径
2694. [苏住房C] [苏住房C] 页面文件存在但没在 pages.json 对应分包里注册，同样报 page not found
2695. [苏住房C] [苏住房C] Cursor 报「npm 任务检测: 无法分析文件 package.json」是 IDE 误报，不是 monorepo 配置坏了
2696. [苏住房C] 苏住房C 生产图片 404：resolveMediaUrl 给 /zs-fym 走了独立图片域名，未跟随 VITE_APP_API_PROXY
2697. [苏住房C] 苏住房C 首页点新闻报 navigateTo:fail page not found：页面已迁到 pages_main 分包，跳转仍用旧 /pages 路径
2698. [苏住房C] 苏住房C 实名认证没有 /security/ctAuth/wechat/verify 请求：模拟器不支持人脸核身，该链路只能真机验证
2699. [苏住房C] uni.scss 被注入到每个页面，其中 @import 的相对路径按页面文件解析，style 模块必须改用 @/ 别名
2700. [苏住房C] uni CLI 的 --outDir 只对 build 生效，dev 脚本带上它就报 Unknown option，dev 产物固定落 dist/dev/mp-weixin
2701. [苏住房C] 页面用了自定义 ZsNav 却在 pages.json 漏配 navigationStyle:"custom"，会出现系统导航栏 + ZsNav 两条标题
2702. [苏住房C] uni-forms 里无标签的行仍占 label-width，协议 checkbox 被推右：用 label-width="0" + flex 行内排布
2703. [苏住房C] 多行 textarea 写不进字、被下方区块盖住：uni-forms-item 全局 align-items:center 不随 textarea 撑高
2704. [苏住房C] redirect 中转页多个接口共用一个 loading：深度计数 + trackApi 包装（含 onUnload 清零）
2705. [苏住房C] 小程序 Vue3 <script setup> 里误 import defineProps/defineEmits 会刷「compiler macro」警告
2706. [苏住房C] uni-app 微信小程序不支持 defineAsyncComponent：异步加载组件必须改静态导入或分包
2707. [苏住房C] 苏住房C 移动端的 UnoCSS 用短横线分段类名（p-x-32 而非 px-32），写错不报错只是静默不生效
2708. [苏住房C] 小程序里禁止用 window.scrollTo 做锚点滚动：改 uni.createSelectorQuery + uni.pageScrollTo
2709. [苏住房C] flex 横向卡片里长地址把左侧封面图挤压变形：三件套 flex-shrink:0 + min-width:0 + word-break
2710. [苏住房C] 多入口共用同一个详情页时，导航栏标题必须由列表把 label 透传下去，不能靠页面默认值
2711. [苏住房C] getDict 没 import 导致字典列表全空且无任何报错：小程序端「有标题没选项」的固定排查项
2712. [苏住房C] navigateTo 报 page is not found：页面 vue 还在但 pages.json 路由被删了
2713. [苏住房C] v-show 不阻止模板求值：空数组下标取 .icon 会在首屏渲染直接崩
2714. [苏住房C] [苏住房C] ZsMap 只合并 object 类型的 attrs.style，字符串 style 被静默忽略 → 地图被压成细线
2715. [苏住房C] [苏住房C] 小程序地图「鉴权失败」是腾讯位置服务 Key 与 AppID 未绑定，Key 还有 4 处硬编码副本
2716. [苏住房C] [苏住房C] 单对象接口返回 data:null 仍被 res.rows=[res.data] 包进列表，模板读字段直接崩
2717. [苏住房C] [苏住房C] 个人身份信息展示一律走 formatter.js 的 blurName / blurIdNumber，表单仍存原文
2718. [苏住房C] [苏住房C] 微信小程序环境没有 sessionStorage/window 等浏览器 API：列表页复用详情页方法时抛 ReferenceError is not defined
2719. [苏住房C] Vue 3.2.45 项目禁用 defineOptions 编译宏：小程序端运行时报 ReferenceError，须改用独立 <script> 导出 inheritAttrs
2720. [苏住房C] 网关 zs-param 请求头承载中文会变 ??：统一改 base64 编码，并在 gateway.js 收口
2721. [苏住房C] 苏住房C 市民端（zhi2-mobile-shimin）技术栈与构建告警口径：Vue3 + Vite 的 uni-app 工程，index.html 全局脚本与 vite sourcemap 重复是两类高频噪声
2722. [苏住房C] 「搜索框一半压在 Banner 上」的稳定做法：只给一个锚点量，另一侧用 margin/padding 让位，避免 bottom 负值与容器 padding 互相抵消
2723. [苏住房C] 「两个白色区块之间加 10px 间距」：相邻兄弟选择器被中间包裹层打断，间距要挂在锚定块的 margin-bottom，背景铺满靠 page height:100% + 容器 min-height:100%
2724. [苏住房C] 入口页 init 阶段报 Can't find variable: xxx：多半是调用了 API 封装函数但没 import，字典页无数据先查这条再查后端
2725. [苏住房C] 移动端接口层约定：请求方法以实际后端为准逐接口核对（listRecommend 是 GET 不是 POST），METHOD 错误表现为「无数据」而非报错
2726. [苏住房C] 前端统一gateway.do由zs-path路由
2727. [苏住房C] 微信拨号SDK不可用降级tel:协议
2728. [苏住房C] 电话转链接函数误跳过整段HTML致号码未转换
2729. [苏住房C] 公告页迁分包后端返旧路径致navigateTo失败
2730. [苏住房C] 分包页跨包引静态资源触发小程序报错
2731. [苏住房C] 业主认证拆分为预验证与提交两步调用
2732. [苏住房C] toMediaPath改动致首页图标URL解析错误
2733. [苏住房C] 微信弃用getSystemInfoSync需封装工具类
2734. [苏住房C] 小程序手机号授权失败因后端接口未部署
2735. [苏住房C] 支付宝扫脸失败因人脸appId误填业务网关
2736. [苏住房C] flex-wrap致权证号折行改固定两行布局
2737. [苏住房C] 分包静态资源跨包访问致真机图片404
2738. [苏住房C] 分栏flex布局右栏高度0致内容塌陷
2739. [苏住房C] 内网IP图片URL未转线上致H5失败
2740. [苏住房C] 微信小程序动态导入返回路径字符串致模块未定义
2741. [苏住房C] 微信小程序flex gap不稳致卡片间距失效
2742. [苏住房C] 未实名空路径触发goMenu功能暂未开放
2743. [苏住房C] 分包SVG须登记映射否则构建裁剪后加载失败
2744. [苏住房C] web-view嵌三方H5无导航栏回退40px致透出
2745. [苏住房C] 决策页意见色绑选举页用插槽避label冲突
2746. [苏住房C] PhoneForm未处理发码失败回调及刷新验证码
2747. [苏住房C] houseMap两文件误引已删路径致组件缺失
2748. [苏住房C] 登录未拉取身份列表且接口竞态致菜单认证误判
2749. [苏住房C] 卡片最小宽度超容器且标题不换行致双列布局失效
2750. [苏住房C] 非居民身份证后台不可用致生产跳过证件类型选择
2751. [苏住房C] z-paging全屏fixed致筛选吸顶失效遮挡导航
2752. [苏住房C] 移除独立登录页统一接入苏服办登录
2753. [苏住房C] 拦截器reject故批量移除code==200判断
2754. [苏住房C] 分支含子模块指针改动禁用rebase改merge
2755. [苏住房C] tab页切换时小区列表空则清缓存
2756. [苏住房C] 小程序web-view打开H5版PDF页面空白
2757. [苏住房C] 未指定分包的共享静态资源跨包加载失败
2758. [苏住房C] 注销页其他原因输入框宽100%加margin溢出
2759. [苏住房C] 电子业主卡报事报修拦截提示功能未开放
2760. [苏住房C] tabBar.js缺onTabPageShow致异常
2761. [苏住房C] 微信基础库3.8.6+与旧uni-app不兼容
2762. [苏住房C] 注销弹窗按钮圆角不可透出背景色
2763. [苏住房C] rich-text 屏蔽事件致小程序电话链接不可点
2764. [苏住房C] 分包静态资源跨包访问致渲染层加载失败
2765. [苏住房C] 子模块改动须同步父仓库引用并合主分支
2766. [苏住房C] 新房详情底部穿屏关联bottomBtn组件
2767. [苏住房C] 网关data为null字符串致解析走兜底
2768. [苏住房C] 最新楼盘页type未转枚举致接口空数据
2769. [苏住房C] APP内嵌H5后退至tab页需调原生返回
2770. [苏住房C] 分包脚本复制z-paging未更新依赖路径
2771. [苏住房C] 菜单路由读错store字段且fallback码错误
2772. [苏住房C] user.js持久化限H5编译致小程序登录态丢失
2773. [苏住房C] 埋点接口401不可阻塞跳转或登录
2774. [苏住房C] 实名认证跳过证件选择页直达证件号码输入页
2775. [苏住房C] 微信工具未重编译致defineOptions未定义报错
2776. [苏住房C] zs-sign签名依赖crypto-js否则为空
2777. [苏住房C] 分包空态图不可沿用主包路径否则资源加载失败
2778. [苏住房C] 微信小程序写法未生效改稳妥处理
2779. [苏住房C] 主包图片因分包路径推断错误加载失败
2780. [苏住房C] uni-app未复制分包子级static目录资源
2781. [苏住房C] 小程序 WXSS 不支持 :not() 伪类报错
2782. [苏住房C] multipart直传禁设Content-Type
2783. [苏住房C] 分包组件不可跨分包引用否则加载失败
2784. [苏住房C] 埋点接口错误应静默不弹提示
2785. [苏住房C] 注销账号后消息入口未读角标未清零
2786. [苏住房C] uni列表项混用link/to与click致跳转中断
2787. [苏住房C] 微信拆分系统信息API需polyfill兼容
2788. [苏住房C] 消息列表管理筛选栏须移入z-paging内滚动
2789. [苏住房C] 多仓库合并时子模块引用冲突须手动解决
2790. [苏住房C] 静态图片按路由推断分包致跨包加载失败
2791. [苏住房C] SuccessCard图片须水平居中且按钮贴底
2792. [苏住房C] 分包页面不可跨分包引用组件否则报错
2793. [苏住房C] 分组合并漏姓名且展开覆盖致选举人姓名空
2794. [苏住房C] 上传期间onShow清仓库致提交证件信息空
2795. [苏住房C] 分包内组件vendor.js路径错误致图标加载失败
2796. [苏住房C] 手机号授权弹窗UI间距与图标规范
2797. [苏住房C] min-height致wxss清理正则失配主包超限
2798. [苏住房C] 未引用模块与网关重复实现须移除
2799. [苏住房C] 样式裁剪正则未更新致组件wxss泄漏主包超限
2800. [苏住房C] vite配置及CSS嵌套错误致构建警告
2801. [苏住房C] 内联相对路径图标未走构建致H5显示失败
2802. [苏住房C] 登录页分包迁移后旧路径跳转致页面不存在
2803. [苏住房C] 报修提交页onShow重置房屋覆盖手动选择
2804. [苏住房C] 苏找房TabBar混用v-model致接口未请求
2805. [苏住房C] 新房轮播未空值保护且索引key不稳报错
2806. [苏住房C] 苏服办登录仅存V2 token未换V1致接口失败
2807. [苏住房C] 小程序URL拼接replace破坏协议头致下载失败
2808. [苏住房C] 小程序WXSS不支持> *致form.scss编译错
2809. [苏住房C] 首页disableScroll未限高致滚动失败
2810. [苏住房C] 地图找房请求须showLoading并计数
2811. [苏住房C] 埋点请求401须静默避免登出阻塞
2812. [苏住房C] 未注册本地页跳转致navigateTo失败
2813. [苏住房C] 小程序端WXSS本地背景图导致渲染层报错
2814. [苏住房C] 小程序不支持uni.chooseFile致上传报错
2815. [苏住房C] HomeRobotFloater 图比错且不可拖动
2816. [苏住房C] ECharts5.3+初始化el监听非函数
2817. [苏住房C] scoped样式不穿透子组件根节点致间距失效
2818. [苏住房C] 分包页面迁移后菜单路由未更新致找不到
2819. [苏住房C] 分包页面未注册pages.json路由致找不到
2820. [苏住房C] 相对路径经路由归一化补斜杠致找不到
2821. [苏住房C] 生产H5的/zs-fym图片误走V1代理失败
2822. [苏住房C] 新闻详情迁分包后首页跳旧路径致报错
2823. [苏住房C] 模拟器人脸核身失败不触发wechat/verify
2824. [苏住房C] --outDir 仅 build 有效 dev 报错
2825. [苏住房C] 用户配置关Volar混合防TS服务崩溃
2826. [苏住房C] 小程序无window调scrollTo致锚点失败
2827. [苏住房C] pages.json未注册登录路由致跳转报错
2828. [苏住房C] v-show不阻模板求值空数组取icon报错
2829. [苏住房C] 无合同接口返回null未判空致列表渲染报错
2830. [苏住房C] 渲染层腾讯地图Key鉴权失败因AppID未绑定
2831. [苏住房C] 房源核验页不动产权证号须单行布局
2832. [苏住房C] 微信小程序无sessionStorage致跳转异常
2833. [苏住房C] 市民端账户注销分步调3接口验证码
2834. [苏住房C] HomeRobotFloater悬浮按钮固定left仅纵
2835. [苏住房G] 已停用字典项导致历史数据回显空白：新增 organ_type_all 全量字典专供回显，新增/编辑仍用 organ_type
2836. [苏住房G] 字典双口径这类业务特例禁止写进公共组件：zs-table-column / main.js 全局注册层不对具体字典编码开后门
2837. [苏住房G] 新增业务模块不要新建 api 封装文件，按同目录既有页面的方式直接用全局 $get/$post
2838. [苏住房G] 设计稿一致性验收必查「是否复用了公共组件」：表格类区域被点名后要用 zs-table + zs-select-column
2839. [苏住房G] axios 0.28 下自定义 paramsSerializer 与数组参数会抛 AxiosError: options must be an object（页面 created 直接炸）
2840. [苏住房G] 同一 meta.filePath 命中多条菜单路由时，find 会挑中带 :tableid 动态段的详情入口，跳转落到详情而非列表
2841. [苏住房G] B 端企业人员按「登录选中小区」做数据隔离：projectId + complexId 双参数 + 区域锁定回填，靠公共 mixin 一次覆盖多模块
2842. [苏住房G] 保存报 For input string: "" 的根因：编码类字段（*Code）被填了中文名称，后端 Long.parseLong 炸在提交侧
2843. [苏住房G] 协议/开户类表单的网点主键 bankBranchManageId 只能靠网点名称反查：详情接口不返回它，必须走银行网点列表接口二次匹配
2844. [苏住房G] 替换设计稿切图图标：按「图形语义」映射到指标而不是按切图编号顺序，并统一集中到配置数组 + 语义化文件名
2845. [苏住房G] G端「树状/平铺」双模式列表：树状无数据的根因是 parentDeptId 对业务接口无效，必须换区划参数
2846. [苏住房G] 多个聚合列表页共用同一种「树节点→查询条件」失效问题：一次性抽 mixin 批量接入，不要逐页打补丁
2847. [苏住房G] 详情页内嵌子表的元素顺序即框架规范：搜索表单 → ListOperationButtonContainer → zs-table → 分页
2848. [苏住房G] 多页面复用的字段组合（冻结状态/冻结时间/冻结原因）不要封装专用组件，按常规表单项 + 显示条件直写
2849. [苏住房G] zs-dept-region-cascader 区县/街道/社区三级筛选：跳市级根节点 + deptTypes 0,1,2 + parentDeptId
2850. [苏住房G] 列表页同一组件承载备案/变更/解聘三类单据时，默认筛选与说明条只允许作用在备案分支
2851. [苏住房G] 像素相似度验收（95%）被设计稿 JPEG 反采样卡住时：先做「基线自身 JPEG 往返」对照实验再下结论
2852. [苏住房G] 公共查询页四个备案入口报「没有授权相关菜单」：不是权限问题，是空状态链接复用同一套跳转配置
2853. [苏住房G] 苏住房G：区域名「完整路径 vs 短名称」精确匹配失败，导致统计卡片全变「暂无数据」
2854. [苏住房G] 苏住房G 首页 v2：区域筛选上提为全页统一上下文（同一 parentDeptId 扇出到各卡片接口）
2855. [苏住房G] 苏住房G：统计数字点击跳列表并预置筛选，靠独立 homeStatNav 映射表 + saveSearchParams 打通
2856. [苏住房G] 苏住房G：学习园地新增页签必须同步改四处（tab 常量 / api 分流 / 跳转映射 / 数据字段映射）
2857. [苏住房G] Vue 异步组件报 `Identifier 'RELATION' has already been declared`：构建期重复声明，页面整个 chunk 加载失败
2858. [苏住房G] 苏住房G：列表页新增搜索区交互必须内聚进 zs-search-form，唯一例外是多条件组这类「动态行数」场景
2859. [苏住房G] 区划→街道→社区级联清空：mixin 基线比较 + shouldReset 双参，区分「回显」与「用户切换」
2860. [苏住房G] B 端项目上下文（projectId/complexId）的清除入口唯一化与「刷新即清空」行为
2861. [苏住房G] 导入校验失败要拿 data 里的错误文件地址：noReject 在 request.js 成功/HTTP 错误两条分支都要补，且 /zhi2/ 路径不能用 resolveServerAssetUrl 拼
2862. [苏住房G] 身份证格式校验的证件类型字典值必须是 document_type 的 '01'，写 30250001 这类长码校验永不通过
2863. [苏住房G] 给已有业务加必填字段前先产出「接口 × 入参/返回值」核对表 md；同一字段散落在 5 条业务链路上要一次列全
2864. [苏住房G] 弹窗列表要固定「N 条数据」的高度：分页器 v-show 隐藏会连高度一起塌，分页区必须预留固定占位
2865. [苏住房G] 侧栏「首页」报页面未授权/高亮错乱：统一把首页路径归一到 /index，且首页菜单只做精确匹配
2866. [苏住房G] 「资产部位/明细」选择弹窗带出了未备案的主单数据：过滤没有生效在正确的层级（明细 bizState vs 主单 houseBizState）
2867. [苏住房G] B 端「右上角全局物业管理区域」会隐式兜底：选了别的区域必须显式传 complexId，否则后端按全局区域处理
2868. [苏住房G] 苏房 V3 列表页首次进入只显示 4 行、刷新后正常：底部安全区测量函数在容器未撑满时反向扣高度
2869. [苏住房G] 字典「全量（含停用）」与「常规」必须用两套缓存 key，靠 formMode 切 options 而不是分两个变量
2870. [苏住房G] 高级查询（zs-advanced-query）字段配置必须前端本地定义，不要读后端字典 remark 下发类型
2871. [苏住房G] 银行账户状态要统一到银行侧字典 ACCOUNT_STATUS（含销户=6），不要用平台侧 benefit_account_status
2872. [苏住房G] Vue2 里把 `a && b` 的短路结果直接绑到布尔 prop，会因返回字符串/ID 触发 prop 类型警告（disabled 灰不掉）
2873. [苏住房G] 街道银行授权的下拉选项来自「上级区有效授权」接口，已失效的历史值要补回下拉并 disabled，保存走 {subdistrictCode} + rowVersion
2874. [苏住房G] 按机构类型联动的角色下拉：organType 写死默认值导致跨机构返回错误角色集
2875. [苏住房G] UAT 上 BIZ_STATE 字典 1/2 文案与后端编码对调：业务状态下拉与回显一律改用 biz_state
2876. [苏住房G] 租户可见的冻结原因要从下拉剔除，「只读」只对加载时已是系统冻结的账号生效
2877. [苏住房G] 只隐藏「平铺/树状切换」却顺手改了表格布局：切树节点后列错位与空数据撑满的两个真根因
2878. [苏住房G] 多份租赁合同列表的「忽略预警」勾选规则收口到 leaseContractWarningMixin
2879. [苏住房G] B 端首页恢复旧工作台：index-wrapper 按 terminalType 分流 + 就绪门闩，旧页存为 index-legacy.vue
2880. [苏住房G] [苏房] 首页统计卡「接口有数据但数字显示 0」：计数字段名与后端返回不一致，且解析失败被静默兜成 0
2881. [苏住房G] [苏房] 「行政区划不能为空」的根因：选择物业管理区域只回填 regionName 展示值，没同步 regionCode 提交值
2882. [苏住房G] [苏房] 服务周报街道账号「选物业管理区域」列表不全且无分页：选择数据集接分页参数 + 表格 fill-height 消除末行被裁
2883. [苏住房G] [苏房] 共管小区（统计地图）弹窗 Tab 全空白：terminalType 未就绪就 v-if 拦截 + 各 pane 共用 activeContentValue 撞 key + G 端被 skip-fetch
2884. [苏住房G] [苏房] 只读列表页隐藏「业务状态」筛选项，但 getQueryParams 仍固定传 bizState='2'：筛选控件与查询口径分离
2885. [苏住房G] [苏房] 「物业管理区域备案保存/权限校验在后端哪」的前端反推路线图：仓库无 Java 源码，只能按 mixin 拼路径 + 组件链路推契约
2886. [苏住房G] ECharts 只要「右侧单位（件）」不要第二套刻度：隐藏刻度标签的孪生 Y 轴用 axis name 承载单位
2887. [苏住房G] 左侧行政区域树点箭头不展开：node-key 用了可能重复/为空的业务编码，须补唯一 id 并手动展开根节点
2888. [苏住房G] 页面标题/按钮组跑到页面最底部：全局 .detail-container 是 flex-direction: column-reverse，统计展示页应改 list-container
2889. [苏住房G] 同一状态列既要字典又要开关：按行层级（市级/区级）运行时切换渲染形态，而不是整列只选一种
2890. [苏住房G] 左树+右列表页「新增按钮不见了」：丢了 table-container 包裹层，右栏 width:100% 与 200px 树并排溢出把按钮挤出可视区
2891. [苏住房G] 变更单提交 busCode 除机构类型外还有「本地/非本地」维度：收敛到 localOrganizationFlow 的 resolver + mixin 开关
2892. [苏住房G] 同一业务存在两个近名页面（property/account vs property/propertyAccount）时，参数要改「真正发请求的那个」，页面文件必须按接口名+所在目录定位
2893. [苏住房G] 拉「已备案」列表的默认筛选前，先分清 BIZ_STATE 常量与全局 biz_state 字典两套值源；重置语义靠 $options.data() 天然保默认
2894. [苏住房G] 「去掉默认业务状态筛选 + 加新增筛选项」的批量改造：时间区间与「是否本地机构」抽公共工具，前端兜底过滤会与分页 total 打架
2895. [苏住房G] [苏房] zs-region-select 只认平台区划树里的编码，页面自带区划值时 el-select 找不到 label 会直接回显 6 位数字
2896. [苏住房G] [苏房] 「鼠标移入才显示」类滚动条需求必须落到 styles/index.scss 的全局规则，且横向单独放宽：hover 选择器管的是轨道附近而非整表
2897. [苏住房G] [苏房] 同名列表两套接口：pageNew 支持高级筛选但分页不全，必须按「有没有高级筛选条件」分流，不能全量切过去
2898. [苏住房G] [苏房] 弹窗内表格写死像素列宽，弹窗加宽后不会跟着拉伸：改 minmax(160px, 1fr) 并把输入组宽度交给列
2899. [苏住房G] [苏房] 列表新增「最近备案结果」类字段：字典只给真实枚举，缺省态（未备案）要用 none 伪值前端追加，且兜底配置缺项要自动补齐
2900. [苏住房G] [苏房] 统计字段对接后端 VO 时按字段名一一对齐，逐项写兼容旧字段的兜底与本地计算回落
2901. [苏住房G] 统计卡片内「指标块 + 数值块」的双层嵌套：块显式写 height:100% 才能等高分栏，指标块用 flex-direction:column 让多个数值横排
2902. [苏住房G] 详情页统计率类指标的口径：分母取「接口返回的总数聚合字段」而非列表长度，空/0 分母显式回退为 0.00 并禁止除零
2903. [苏住房G] 行选中能力带反义标识时（reserve-selection）：reserve-selection 会让行对象快照字段滞后的实战坑
2904. [苏住房G] [苏房] zs-select-dialog 左侧列表「超过 N 条不显示」的根因是固定 pageSize=10，需改成按容器高度算首屏 + 未铺满自动续拉 + 滚动加载
2905. [苏住房G] [苏房] 仓库 API 前缀与 env 目录的实际位置：VITE_APP_BASE_API='api/v2.0'，env 文件在父仓库根而非子模块内
2906. [苏住房G] [苏房] 同一页面内「整卡横滚」与「只在标签行内滚」不能统一处理：RegionTabs 需 embedInParentScroll 开关 + 父容器 min-width:0
2907. [苏住房G] [苏房] B 端「字段置灰」不能一律用 isBTerminalPractitioner：企业管理员与从业人员必须分开判，且自动带入只对从业人员生效
2908. [苏住房G] [苏房] 详情页编码类字段回显成数字：全局 dictFormatter 依赖异步选项，且 Vue2 计算属性依赖收集不稳定 → 改用本地 formatter 并显式触碰选项源
2909. [苏住房G] patterns/index.js 里 IDCardNumber 是回调式 validator 不是正则，对它调 .test() 必抛 TypeError
2910. [苏住房G] 身份证校验规则把「证件号码」与证件类型字典值 '01' 比较，校验器恒假、身份证格式校验形同虚设
2911. [苏住房G] 同一列表挂多个详情菜单时，返回按钮「截断路径」会落到未注册的兄弟路径 → 报页面未授权或不存在
2912. [苏住房G] [苏房G] 接口 200 但抽屉全 0/暂无数据：台账类接口的 ID 主键优先级被改成 complexId 优先
2913. [苏住房G] [苏房G] 按项目裁剪业务菜单时，小区台账「租赁申请」Tab 要在三处入口同步移除，组件文件保留
2914. [苏住房G] [苏房] 重写 getDetailRequiredParams 只能放行请求，接口路径与回调还得各改一处：无 id 详情接口失效的三点落地清单
2915. [苏住房G] 共用列表组件里的说明提示「线上还在、本地已删」：先与提交历史对账，再判定为部署滞后
2916. [苏住房G] 「某字段改为必填/非必填」的跨模块落地：先逐模块核对校验现状，再只补缺口
2917. [苏住房G] 同一份月报数据的「填报页 / 统计页」列结构差异：用共享构造器的选项开关分流，不复制两份
2918. [苏住房G] zs-table 列级「换行 / 不换行」诉求的正确落点：showOverflowTooltip 与固定 width 成对配置，并修组件层样式覆盖
2919. [苏住房G] [苏房] 横切式审批流改造（非本地走不同流程）上线前必须收敛：它天然与「一页一 busCode」架构冲突，回退要按联调点逐个还原
2920. [苏住房G] [苏房] 后端必传参数报错先查「导航控件是否只切 UI 没参与请求」：Tab/页签类参数漏传是 1105 类错误的常见根因
2921. [苏住房G] zs-select-dialog 左右联动的选择弹窗必须做「左空不得查右」的前置拦截，不能靠后端过滤
2922. [苏住房G] 同一套「选开户银行」弹窗被多模块复用，业务域靠 sourceModel + 业务标记参数区分，改一处必须全量回扫消费方
2923. [苏住房G] Web 后台行政区划筛选不许前端写死：由 platformConfig.region 推导 parentCode 走 /system/region/list，并加请求序号防竞态
2924. [苏住房G] 含子模块的版本合并按「逐文件保留一侧语义」处理，并分别提交子模块与父仓指针
2925. [苏住房G] 详情页「查看态表格只读、点编辑才可操作」：readOnly 必须同时判 formMode 与 bizState，且别用 showEdit=false 一刀切
2926. [苏住房G] 字典编码大小写错位会让筛选参数与展示完全反序（BIZ_STATE vs biz_state）
2927. [苏住房G] 字典驱动的高级查询：操作符必须取 operator_type 字典，字段可用操作符配在 complex_field 的 remark 第 4 段
2928. [苏住房G] 部门树页「平铺展示后分页消失」：flex 高度链断裂，需加中间 body 容器 + zs-table fill-height
2929. [苏住房G] 导航栏系统标题溢出：字宽探针测宽 + 位移滚动，冗余与测宽两处决定「能否滚全」
2930. [苏住房G] 地图/面板类 ECharts 横轴区县名显示不清：containLabel + 动态 grid 底部 + 按数量切倾斜策略
2931. [苏住房G] DetailTemplate 的 labelAbove：在字段标签上方按条件追加说明文案
2932. [苏住房G] zs-import 成功提示与页面成果提示同屏重叠：给组件加 silentSuccess + auto-close 分工
2933. [苏住房G] ZsPrint 多模板打印只出一份 PDF：三条生成分支要统一 await + 点击时预开窗口 + 勾选存 printConfigId
2934. [苏住房G] el-link 文件名压住「删除」：icon 与文件名必须拆节点 + flex:1/min-width:0 + 按钮 flex-shrink:0
2935. [苏住房G] 长名称下拉框被截断：宽度用 flex:1+min/max 区间 + el-tooltip 兜底 + :deep 让内层 select 撑满
2936. [苏住房G] 「一键申报」进详情后保存按钮仍然显示：show-save 只认 formMode，页内 active 下标不得参与
2937. [苏住房G] zs-table-column 插槽根节点用 div 会被判成「复杂列」定宽 80px，表头被省略号截断
2938. [苏住房G] listMixins 切 POST 接口：apiMethod:'post' 之外，导出/打印前的数据校验必须同源切请求方法
2939. [苏住房G] zs-date-picker 没有 monthrange 分支：月份区间要用两个单月选择器，别用 attrs 硬覆盖 type
2940. [苏住房G] el-select 多选长标签把下拉箭头挤出可视区：给 suffix 预留空间 + 弹窗加宽 + label 置顶
2941. [苏住房G] 列表「操作人/姓名」列渲染成一长串数字：绑到了 ID 字段，先横向比对同模块兄弟页再改 prop
2942. [苏住房G] 子模块 .gitignore 的收录边界：E2E/预览产物不入库，本地 AI 会话记忆要入库
2943. [苏住房G] [苏房] CI 报 Cannot find module @rollup/rollup-linux-x64-gnu 的真实根因是 Runner 的 glibc 过低，解法是 CI 下切 @rollup/wasm-node
2944. [苏住房G] [苏房] 依赖别的字段重算的「派生汇总字段」必须用 watch 而非 @change，否则复制粘贴/程序化赋值不触发
2945. [苏住房G] [苏房] 原生 table + colgroup 的统计表右侧留白：把 width 改成 minWidth 让内容少时也铺满，样式表恢复 width:100%
2946. [苏住房G] [苏房] 查询结果与筛选条件反着来：查询区用了另一套 BIZ_STATE 常量，而列表展示走全局 biz_state（1=审核中，2=已备案）
2947. [苏住房G] [苏房] 查询条件选项过多难以选中：给 zs-search-form 增加 search-select 类型（可输入可搜索），而不是逐页换 select
2948. [苏住房G] [苏房] 跨分支合并（v2.6.2 → suzhufang）的冲突处置口径：业务逻辑保我方、Bug 修复取对方、公共样式逐 hunk 拼合而非整文件二选一
2949. [苏住房G] zs-table 里标签「用 +N 省略」而不是 overflow 截断，Tooltip 必须挂 body 才能逃出 fixed 列遮挡
2950. [苏住房G] 本后台路由不静态注册：公共查询/月报等页面由后端菜单 listRouters 动态下发，静态搜 router 目录必然扑空
2951. [苏住房G] 授权绑定类详情页：编辑态要锁死「被授权方」这类主数据字段，新增态才允许选择
2952. [苏住房G] [苏房] “统计/汇总接口覆盖详情字段”导致金额被清成 0：回退链必须是 接口值 → 已合并值 → 明细汇总
2953. [苏住房G] [苏房] getDetailRequiredParams 改为“只校验本页真正入参”，不要去全站放宽 detailMixins
2954. [苏住房G] [苏房] 导出按钮入参格式：复制来的页面要对照“同一接口在另一页”的请求格式，导出走 JSON body
2955. [苏住房G] [苏房] 变更单据的名称字段不能只信自己的 recordName：用 resolveRecordName 四级回退并统一到展示/回调/子表三处
2956. [苏住房G] BPMN 流程设计器「候选组/候选人员」回显为 ID 而非名称：远程下拉不会按已选 ID 预取 label
2957. [苏住房G] zs-remote-select 只拿到纯数字 ID 时显示编号：用 resolveDetailUrl 反查名称回填标签
2958. [苏住房G] 主动退出登录仍弹「登录状态已过期」：request.js 用 isLoggingOut 标志抑制 401 会话弹窗
2959. [苏住房G] 子路径部署（xxx.com/test/#/）下后端相对路径被解析到站点根：resolvePublicAssetUrl 改用 new URL(relative, window.location.href)
2960. [苏住房G] 导入/导出模板下载与导入接口新增必填业务参数 feeMode：两条请求链路必须同时带齐
2961. [苏住房G] 同源多分支（苏住房/惠山）交付：需求只进指定分支，另一分支用 revert 反向剔除，tag 用年月日时分纯数字
2962. [苏住房G] 区块自带「存在即显示」的落点问题：按 taskId 取的活动列表在预览态无条件渲染，导致空区块/异常请求
2963. [苏住房G] 日期范围选择器「先选结束日再选开始日」被锁死：禁用谓词不能把第一次点击的日期当固定起始锚点
2964. [苏住房G] 高级筛选「搜索后点查看再返回 → 暂无数据」：字典未就绪时把运算符兜底成 EQ，而筛选摘要读缓存所以看起来条件正常
2965. [苏住房G] 列表默认查询值从常量改成 undefined 做「查全部」时，search 条件缓存会让老用户仍看到旧默认
2966. [苏住房G] [苏房] 子表行内使用 zs-select 的 :value.sync 改不动数据：换 :value + @update:value + this.$set 回写 tableData
2967. [苏住房G] [苏房] 固定字典换成「本地 '1'/'0' 选项」的改造要同时守住四道口：归一化、colorMap 键、筛选参数、接口真值
2968. [苏住房G] [苏房] ECharts 环形图外侧标签被截成「...」：给 label 配 formatter+overflow，并同时放开饼图的居中与左右留白
2969. [苏住房G] 筛选项把「表格格式化用的字典 options」覆盖成子集，导致列回显原始码值
2970. [苏住房G] 同一 bug 要在多个开发分支同时修并逐支 cherry-pick 的既有协作流程
2971. [苏住房G] 字典「编辑子集 vs 展示全集」的 `_all` 双字典模式（本项目唯一范例与通用等价写法）
2972. [苏住房G] 字段级隐藏必须与校验规则/变更页对比视图成组处理（「住宅性质」隐藏实例）
2973. [苏住房G] 机构注册第二步「页面 UI 截断」：height:calc(100% - 180px) 定高 + 内层 overflow-y:auto 的双重高度锁死
2974. [苏住房G] ZsPrint 用 window.origin 拼模板地址，子路径部署（/test/）必丢部署前缀：改用 resolveServerAssetUrl
2975. [苏住房G] 待办跳转把 component:"Layout" 的壳菜单当有效组件：单菜单时会按 name+params 打开 Layout 壳而不是 storedPath
2976. [苏住房G] 「把 A 的跳转改成和 B 一致」类需求的完整改动面：顶部导航 + 表格空数据链接 + 目标页 URL 预置默认值
2977. [苏住房G] 全局多模板打印下拉框：min-height 定高 + 绝对定位按钮会让面板留白失控，改 max-content 自适应
2978. [苏住房G] [苏房] 筛选参数出现多值逗号串而页面是单选：先查 zs-search-form 是否对 bizState 做过全局 multiple 改写
2979. [苏住房G] 验证码失败统一按「超时」提示：用已知场景正向关键词二分，其余一律判为「错误」
2980. [苏住房G] [苏房] dict.js 全量字典接口从 dictData/list 分页改为 listByType/{type}?isAll=1：响应取值由 res.rows 变 res.data
2981. [苏住房G] [苏房] 置灰逻辑按「字段粒度 + 模式」判定，不要一刀切整个区块，更不要删掉跳转入口
2982. [苏住房G] [苏房] 首页 index-v2.vue 合并审查发现的三个真实缺陷：方法漏写括号、统计周期双源、合并冲突丢了整块布局
2983. [苏住房G] [苏房] git pull --tags 报 would clobber existing tag：删本地同名标签后重拉，或改用 fetch --tags --force
2984. [苏住房G] [苏房] DetailTemplate 查看态只渲染 item.value 不走 formatDisplay：区划编码直绑 value 必显示 320585
2985. [苏住房G] [苏房] 用户偏好：固定后端字段的明细表禁止自造格式化/兜底映射，只金额面积用公共 amountFormatter
2986. [苏住房G] [苏房] 从同源分支持久化响应解密层：挂在 request.js 拦截器 returnRawResponse 判断之前，私钥走 VITE_APP_EXPAND_ENCRYPT_PRIVATE_KEY
2987. [苏住房G] 同一业务按「本地机构/非本地机构」二态走两套流程时：isLocalOrganization 三值判定必须区分 undefined，不能塌缩成布尔
2988. [苏住房G] 变更列表改为复用新增列表 schema 后：请求侧白名单过滤不够，必须同时 bump tableId 做缓存击穿
2989. [苏住房G] 一个列表组件被多套同类规则共用时，按钮文案要从类型枚举派生中文名，不能在组件里写成某一套的名字
2990. [苏住房G] 「自动生成所以禁止编辑」的字段遇到历史空值会死锁：门控要读 originForm 而不是 form
2991. [苏住房G] B 端首页在 terminalType 就绪前就已挂载：v-if 分叉必须先过「类型就绪」门闩
2992. [苏住房G] 同族统计页对齐报表的列口径：结构对齐只改前端，导出链路与列宽计算要一起收敛
2993. [苏住房G] 月报模板树表「新增下级」后父级填报列仍显示且仍拦截保存：isLeafNode 不能优先看 leafFlag
2994. [苏住房G] 行业管理 6 个列表统一「更新时间最多跨 2 天」：限制必须内聚到共享工具，不要逐页改 zs-advanced-query
2995. [苏住房G] [苏房] 删除子表行后「本次核销金额」不归零：handleDelete 成功后没触发父页 refresh
2996. [苏住房G] [苏房] zs-dialog 新增 zs-dialog--scrollable 模式导致「内容溢出却完全不能滚动」，且只存在于单分支
2997. [苏住房G] [苏房] 左侧部门/区域树返回后跳回根节点：parentDeptId 没进搜索缓存 + tree-ready 早于 setNodeContext
2998. [苏住房G] [苏房] Vuex cachedSearchParams 跨账号残留：换账号后仍带着上一账号的部门筛选（LogOut 未清理）
2999. [苏住房G] [苏房] 树层级切换时同一列在「文字/开关」间错乱：v-for 的 key 只取 prop，列组件被跨层级复用
3000. [苏住房G] [苏房] ImageUpload 的 picture-card 把 PDF 地址当 img.src 显示破图：缩略图与预览要按扩展名分流
3001. [苏住房G] 多个菜单菜单共用一个列表组件：入口专属 UI/默认值收敛到「入口判定」，环境差异先归因菜单数据而非代码
3002. [苏住房G] 首页 V2 多数据源并发加载必须逐个加载函数独立持有请求序号，且不能漏掉后加的 tab 加载器
3003. [苏住房G] 占位/演示数据必须与真实数据在视觉上可区分：否则用户会当成业务数据
3004. [苏住房G] 接口下发的跳转地址不能直接当路由 path：必须做站内路径白名单校验
3005. [苏住房G] 独立预览/E2E 入口的 stub 必须覆盖页面 created 期实际调用的全局方法（getDicts/dictFormatter）
3006. [苏住房G] el-tree 点节点就收起：expand-on-click-node 默认 true，expandPathToNode 只展开祖先
3007. [苏住房G] 同一页面里的多个展示弹窗会漏改字段 formatter：街道/社区编码没转中文要逐个弹窗核对
3008. [苏住房G] 区域银行授权页（regionBankAuth）区级请求不带 regionCode：areaCodeTree 返回的是 areaCode，代码只读 region 字段导致双口径空值
3009. [苏住房G] [苏房G] 详情页标题/按钮跑到页面底部：.detail-container 全局 flex-direction: column-reverse 反序 DOM
3010. [苏住房G] [苏房] 高级筛选（zs-advanced-query）里的数值字段被四舍五入：getNumberDot 整数字段名单是唯一精度开关，会同时吞掉小数与区间取值
3011. [苏住房G] 请求头写入中文业务字段导致保存报 setRequestHeader 非 ISO-8859-1：pageRequestContext 必须走 toAsciiHeaderValue
3012. [苏住房G] [苏房] 「选择小区 / 选择项目」弹窗误显示外区县数据：pageNoScope 与 page 是两套数据权限口径，新增态一律用 page
3013. [苏住房G] [苏房] B 端内部还分「企业管理员 / 从业人员」两层，登录后物业管理区域弹窗与右上角区域切换只属于从业人员
3014. [苏住房G] mixins/table.js 的 isSelectable 是全局行勾选门禁：已备案行被禁选导致「忽略预警」报请选择合同
3015. [苏住房G] Vue2 私有深度选择器 /deep/ 会让 Vite+Dart Sass 构建直接失败：整库改 :deep()
3016. [苏住房G] 误 revert 子模块改动后的恢复流程：子模块 revert the revert 再更新父仓指针，并按清单逐条验收
3017. [苏住房G] [苏房] 侧栏高亮归并：activePath 只改「当前路径」不改「菜单路径」，精确/前缀两种匹配语义不能混用
3018. [苏住房G] [苏房] 页面标题/返回路径的公共逻辑要收进「纯函数模块」，store 与 utils 不得反向依赖 ruoyi（循环依赖 + 静默 undefined）
3019. [苏住房G] [苏房] 苏住房G 子模块专属分支上被误合并的首页改版：用 reset + force-with-lease 回退，并区分「撤销分支包含」与「删除提交」
3020. [苏住房G] [苏房] 首页大屏 mock 的 $get 直接返回裸数组而不是 {code,msg,data}：区县 Tab 只剩「全市」的静默降级
3021. [苏住房G] [苏房] 页面内多个列表各自拉数据时，序号防竞态必须逐个补齐（已补 loadCheckData 却漏 loadRegionOptions / loadStudyList）
3022. [苏住房G] [苏房] 详情/查看态里给某个值加「旁挂状态标签」：用下划线变体旁挂到值右侧，不要改 labelAbove
3023. [苏住房G] 支用合同新增：合同金额类型默认值与判断条件双重不一致，导致类型显示 0 且金额框切不回来
3024. [苏住房G] 物业管家编辑只开放两个字段的实现约定：白名单控可编辑、禁用字段隔离校验，换人时保留记录 ID 与管理范围
3025. [苏住房G] 子模块卡在 cherry-pick 冲突态时切不回分支：先 --abort 再 checkout，主仓显示 submodule modified 属正常
3026. [苏住房G] 共用内核列表按 organType 做差异化筛选项：同页两套 formItems 条件切换，未涉及的菜单保持原样
3027. [苏住房G] [苏房] zs-table-column 的 switch 列同时踩两个坑：表头被 60px 固定宽截成「...」+ 无文本触发黑色空 tooltip
3028. [苏住房G] zs-table 开关列回滚失败：handleSwitchChange 已先写新值，按 row.enableStatus 取的「旧值」其实是新值
3029. [苏住房G] el-select 开了 allow-create 会把历史手动输入值预置为下拉第一项：要去掉 allow-create/default-first-option/filterable
3030. [苏住房G] 按外部接口文档补路径前缀前先核对项目自己的 /system 约定；下线必填项要同时审 prop 空壳与 skip-check 的连带失效
3031. [苏住房G] 列表勾选被通用「草稿态才可勾选」规则全局门控：批次字段误用于与删除无关的勾选动作
3032. [苏住房G] 资源下载把相对路径拼成 window.origin + filePath：多级部署前缀丢失，必须走统一地址解析工具
3033. [苏住房G] 手工渲染 3 级树表：用 placeholder 空列补位会造成单元格合并错乱，应按层级算末级 colspan
3034. [苏住房G] 首页待办面板必须与关键数据区域解耦：待办是用户维度，不能带 regionCode
3035. [苏住房G] 跳新页面后内容停在中部：滚动容器是 #app-main 而非 window，scrollBehavior 对它完全无效
3036. [苏住房G] 物业费申报明细的欠缴金额字段是 arrearsAmount：不要绑 oweAmountSum，也不要改成自动计算禁用
3037. [苏住房G] 树表「叶子/分支」状态字段与树结构双轨判定：以 children 为唯一真值，状态字段只作派生写出
3038. [苏住房G] 左侧树 + 右侧列表页首屏请求翻倍：init() 直接 getList() 与「树加载后自动选首节点」两条取数路径叠加
3039. [苏住房G] 苏住房G 首页 v2 待办面板移除 mock：行数补齐逻辑与空态口径是同一个坑
3040. [苏住房G] 首页 v2 卡片面板的 Code Review 存量缺陷清单：附件/消息跳转 URL 校验与字典-消息竞态
3041. [苏住房G] 日期范围 disabledDate 的 anchor 跨度逻辑：校验失败分支必须一起重置 anchor
3042. [苏住房G] [苏房] zs-advanced-query 操作符列：禁用与默认值必须成对看，单操作符字段不能灰掉（需自动补默认值）
3043. [苏住房G] [苏房] 物业费简易申报编辑页：步骤条与提示框横向排布挤出换行问题，改纵向布局并复用新增页样式类
3044. [苏住房G] [苏房] 同一接口被多页面共用时的专属过滤参数：只在该调用点加，不要在 utils/api 层统一注入
3045. [苏住房G] [苏房] 顶栏菜单宽度不是单个 CSS 值：.nav-item / .more-menu-trigger / more-menu-dropdown 与 setVisibleNumber 的常量必须同步
3046. [苏住房G] [苏房] 首页版本分流门禁 homeVariantReady 只认 terminalType != null，G 端/超管永久 loading
3047. [苏住房G] [苏房] 首页别名 Tab 去重：链接做了 canonical 但侧栏 isItemActive 没做，首页菜单不高亮
3048. [苏住房G] [苏房] zs-operate-column 所在页必须在 data() 声明 moduleName/businessName，否则列表操作列整条 mixin 契约断裂
3049. [苏住房G] [苏房] Vue DevTools「在编辑器中打开」失效：项目自建 launch-editor 中间件受两个 env 开关控制，而非 Vite 官方插件
3050. [苏住房G] zs-advanced-query 操作符下拉的占位符与「自动选中第一项」规则（含禁用态）
3051. [苏住房G] 公共查询「动态字段」渲染成输入框还是下拉：字典 dictValue 必须与前端字段元数据 key 逐字一致
3052. [苏住房G] B 端选择框默认值一律用空串而非 null，避免「已选全部」歧义（根因在不同序列化链）
3053. [苏住房G] zs-advanced-query 的 max-groups 是「最大组数」硬上限，默认组数由组件自己兜 1，不能设 1 当默认
3054. [苏住房G] 地图下钻「先清空标记再请求」：慢接口下避免旧层级名称残留成新层级圆圈
3055. [苏住房G] 父项目加 private:true 后出现 yarn.lock 与 workspace 锁文件并存：install 结果取决于用 npm 还是 yarn
3056. [苏住房G] [苏房] 统计/查询类页面「点搜索完全不发请求」：handleQuery 是空壳方法，不是接口或参数问题
3057. [苏住房G] Vue2 的 data 属性以 _ / $ 开头不会被代理到 this：mounted 里 this._xxx.forEach 报 Cannot read properties of undefined
3058. [苏住房G] 同一首页多套区域导航必须拆成独立 state：切关键数据区域只刷关键数据，benefit/repair/study 与待办固定不带 region
3059. [苏住房G] 同页多个独立取数只给「按区域的主数据」加 fetchSeq 防竞态是半边工程：Tab 切换类列表同样要序号守卫
3060. [苏住房G] 同名统计字段跨接口兜底会静默覆盖主接口值：总户数被 oweHouseSum 顶掉，收缴率跟着算错
3061. [苏住房G] 只控制 el-tree 某一层级「隐藏展开图标」时，去掉图标的盒子会让该层文字左移一格
3062. [苏住房G] 字典配置不可靠的「启用状态/单据状态」列：字典列 + 遗留自定义插槽会静默覆盖字典渲染
3063. [苏住房G] 「预设下拉 + 手工输入」组件里给特殊项（其他）写自动切换逻辑，会让该选项无法被选中
3064. [苏住房G] 必填提示文案必须与表单项 label 完全一致：「就职日期」vs「入职日期」这类近义词会让用户以为校验对错了字段
3065. [苏住房G] 首页区域 Tab 的展示顺序要落在「兜底清单 + 接口结果排序」两处，否则后端返回什么顺序就显示什么顺序
3066. [苏住房G] 柱线混合趋势图自算 Y 轴刻度：Math.max(0, ...数组) 遇到 null 立刻整轴 NaN
3067. [苏住房G] 物业区域列表管理主体与收费方式展示筛选规则
3068. [苏住房G] 平台区域组件选项源非左侧树致编码回显
3069. [苏住房G] 物业管理区域列表误走pageNew致每页仅一条
3070. [苏住房G] 已备案预警合同可勾选且忽略预警取最新行过滤
3071. [苏住房G] 详情页所属社区显编码因Vue2依赖收集不稳定
3072. [苏住房G] IDCardNumber非正则误用test类型错
3073. [苏住房G] mapOverview须采用公共行政区划顺序
3074. [苏住房G] feeBindScopeTable金额列字段未对齐
3075. [苏住房G] 台账详情页complexId优先致台账查询无数据
3076. [苏住房G] 分支合并262-suzhufang更新子模块
3077. [苏住房G] 待办跳转未兼容detailId致缺主键误跳转
3078. [苏住房G] 嵌套路由致version.json错且dev未生效
3079. [苏住房G] 物业开发企业共用页漏校验成立日期注册资本
3080. [苏住房G] 月报统计页独立单位列填报页名称保留单位
3081. [苏住房G] 基础信息列表列宽换行及列组件类名合并
3082. [苏住房G] 监管协议打印依赖后端前端仅做页面调整
3083. [苏住房G] getStudyList未传tab触发1105报错
3084. [苏住房G] 回单删除后须触发refresh同步核销金额
3085. [苏住房G] 拟开户账户名称按主体类型生成物管会可编辑
3086. [苏住房G] 未选左侧银行时弹窗未拦截网点查询致查出全部
3087. [苏住房G] 首页区域筛选改为异步接口拉取替代硬编码
3088. [苏住房G] 监管账户横坐标随区县数动态留白倾斜
3089. [苏住房G] 资金拨付详情用款申请名上显见证
3090. [苏住房G] 协议签署单据状态查询字典错位
3091. [苏住房G] 新增日志功能同步两develop分支
3092. [苏住房G] 物业费申报详情页保存按钮仅编辑模式显示
3093. [苏住房G] 扣分指标下拉框弹性宽加tooltip防截断
3094. [苏住房G] 月报导入成功提示应单条置顶防与弹窗重叠
3095. [苏住房G] zhi2-web-admin分支合并业务冲突留苏住房
3096. [苏住房G] 多详情页面积字段改watch监听重算总面积
3097. [苏住房G] 月报表格留白因缺minWidth与width100%
3098. [苏住房G] 企业授权编辑态企业名称禁用新增可选
3099. [苏住房G] 物业区域变更详情页未统一名称回退致显示异常
3100. [苏住房G] 远程下拉回显未预取角色名致候选组显ID
3101. [苏住房G] 候选组数字ID未反查名称仅显编号
3102. [苏住房G] 批量导入必填 feeMode 否则拦截
3103. [苏住房G] 登出未置标志致401过期提示误弹
3104. [苏住房G] 资源路径解析应基于当前页面URL
3105. [苏住房G] 月报是否提交列须配dictUrl实现字典转译
3106. [苏住房G] 更新时间选择器限今起2年且锚点±2年
3107. [苏住房G] 编辑模式下提交按钮须由formMode控制显隐
3108. [苏住房G] 整改通知书业务状态不可默认已备案
3109. [苏住房G] 壳路由视作空路径以走待办storedPath
3110. [苏住房G] 企业变更页bizState多值非预期
3111. [苏住房G] 全景监管首载加loading避免白屏
3112. [苏住房G] 本地机构busCode空值处理缺失
3113. [苏住房G] 欠费统计优先读顶层金额字段否则明细汇总兜底
3114. [苏住房G] 验证码错误与超时文案须按关键词二分
3115. [苏住房G] 字典含禁用项须用listByType接口
3116. [苏住房G] 物管会变更区域名禁用日期可改
3117. [苏住房G] 申报明细普通字段直绑金额统一格式化
3118. [苏住房G] 响应解密迁自v2.6.1分支拦截器前置
3119. [苏住房G] 规约备案列表共用组件按钮文案须动态化
3120. [苏住房G] 账号类型空值编辑禁用且必填致保存失败
3121. [苏住房G] 详情页回单按钮在禁用表单致不可点击
3122. [苏住房G] 企业列表更新时间跨度限制2天且超期置灰
3123. [苏住房G] 月报模板isLeafNode误判致父级字段未清
3124. [苏住房G] 当前分支zs-dialog滚动模式致内容裁切无法滚动
3125. [苏住房G] Vue组件复用及异步竞态致层级切换列显示错乱
3126. [苏住房G] 切换账号残留parentDeptId致部门筛选数据错误
3127. [苏住房G] 首页公共收益及报事报修默认当月数据
3128. [苏住房G] 物业区域备案待提交态物业与管理同权编辑
3129. [苏住房G] 物业三列表页业务状态默认空展示全部
3130. [苏住房G] 接口字段不符致KeyDataNav映射失败
3131. [苏住房G] 街道节点列配置缺启用状态列
3132. [苏住房G] 机构注册第二步六字段缺失必填校验
3133. [苏住房G] 取消审核按钮去图标并增loading防重复点击
3134. [苏住房G] 月报模板填报校验须动态判断且不可编辑列置空
3135. [苏住房G] 密码过期强制改密由开关禁用避免登录弹窗拦截
3136. [苏住房G] 子模块git revert须同步父仓指针更新
3137. [苏住房G] hasFilingForm转Y/N不符字典致映射失败
3138. [苏住房G] 未备案单据开关因状态先改后取致回滚失效
3139. [苏住房G] el-select允许创建致历史输入成下拉选项
3140. [苏住房G] 资金拨付支取通知书恢复合同必填流程
3141. [苏住房G] 地图缩放层级竞态因旧请求覆盖新层级数据
3142. [苏住房G] 指标名称列无width触全局样式强制单行省略
3143. [苏住房G] 月报合计列未解包monthValue致显对象
3144. [苏住房G] 关键数据区域切换不触发待办接口请求
3145. [苏住房G] 附件window.open未校验URL且组件留日志
3146. [苏住房G] 物业费申报欠费列绑错且弹窗未绑定
3147. [苏住房G] 报修趋势图左留白大Y轴末段不等距
3148. [苏住房G] 公示监管账户参数仅非备案新增传
3149. [苏住房G] 月报表首列定宽被内容撑开失效
3150. [苏住房G] HMR未注册计算属性致模板属性警告
3151. [苏住房G] 单元格下钻错传行标识致 rowLabel 缺失
3152. [苏住房G] Vue调试工具跳Cursor失败因编辑器中间件误配
3153. [苏住房G] eslint 全仓扫描不限定单文件致改动误判
3154. [苏住房G] zs高级查询多操作符自动选中致占位缺失
3155. [苏住房G] 前端字段键名异于字典 dictValue 回退
3156. [苏住房G] 物业查询条件组max-groups=1不可添加
3157. [苏住房G] 慢接口下钻应先清除标记再渲染数据
3158. [苏住房G] Vue2不代理data下划线属性致挂载报错
3159. [苏住房G] 首页区域Tab顺序规定张家港常熟太仓昆山吴江
3160. [苏房] 企业注销功能复用经纪机构实现方案
3161. [苏房] 入网认证路由无tableid致detail接口未发
3162. [苏房] 楼表单元格误用长短图例且宽度自适应致图标拥挤
3163. [苏房] 查看态误渲染AnnexUpload致附件越权编辑
3164. [苏房] Headline组件溢出可见致要件列表撑破右栏
3165. [苏房] 注册单要件未同步备案致030100包缺文件
3166. [苏房] 表单弹窗用 form-layout 收敛为单双列两档宽度
3167. [苏房] Tab 内全局样式误清 Headline 内边距致要件贴
3168. [苏房] 接口ID强转收口全局去冗余
3169. [苏房] 宽表溢出误判幽灵滚动致列裁切
3170. [苏房] .ppf-box断点前置被覆盖致比例畸形
3171. [苏房] 正则重复处理Vue模板致振荡需栈解析
3172. [苏房] dev server端口占用切换致后台进程漏检
3173. [苏房] 详情页Headline间距因gap与margin叠加
3174. [苏房] 建湖G旧方案与V3现有能力重复
3175. [苏房] 批量补 visible 正则误改代码致语法错误
3176. [苏房] 产权证问号提示按区域证型显苏找房图
3177. [苏房] 移除项目切换功能须清理弹窗与全局状态
3178. [苏房] 详情页表单布局须以 el-row 包裹 Headline
3179. [苏房] 缩放动画期测视觉宽非布局宽致表格均分失败
3180. [苏房] 子表工具栏须置于 Headline #right
3181. [苏房] 租赁机构要件编码按入口注入不可硬编码
3182. [苏房] label-top致表单标签居中且标题左缘错位
3183. [苏房] 企业变更用例按宫格传要件且刷新断言
3184. [苏房] 注册GIS错用组件致超宽与竖线叠字
3185. [苏房] zsbase遍历命中1条申请时间声明时间实仅日期
3186. [苏房] 新增页sessionStorage离场清除致草稿丢失
3187. [苏房] saveAndSubmit非200致企业注册E2E跳过
3188. [苏房] tagOptionsKey误作method致HMR报错
3189. [苏房] 从业人员备案与申请菜单拆分G端先选机构
3190. [苏房] cbyh 局部 handleAdd 引发整页刷新
3191. [苏房] 详情接口须用 mixin 禁自定义
3192. [苏房] 金额输入未配占位符致提示遗漏
3193. [苏房] 证书新增无楼幢走旧接口致空白
3194. [苏房] 附件上传全局化传label自套外壳
3195. [苏房] e2e选楼幢须跳过在途及不可用标记
3196. [苏房] 变更详情页角标因回退致批量缺失
3197. [苏房] Navbar 按设计稿落地 88px 与溢出滚动
3198. [苏房] 租赁机构注册须由登录弹窗入口跳转带参
3199. [苏房] 预售资金监管弹窗统一SelectDialog
3200. [苏房] 拖拽指令写inset:0致el-dialog撑满
3201. [苏房] 编辑态横向表单标签全局右对齐调整
3202. [苏房] 状态字典与bizState编码不一致致误显
3203. [苏房] 迁移表格未用标准组件致save报错及权限主键错位
3204. [苏房] 注册附件上传不传busId由后端保存后处理
3205. [苏房] 函数式选择弹窗多线框致样式异于标准组件
3206. [苏房] Dialog 宽度剥离传参统一走 CSS 变量
3207. [苏房] 要件按角色展示且重复优先授权包
3208. [苏房] 金额列禁用插槽改用formatter右对齐
3209. [苏房] 详情表单单位展示由label移至值侧
3210. [苏房] 弹窗确定无效因reject覆盖resolve未加锁
3211. [苏房] 联行号接口统一迁移至unionBank模块
3212. [苏房] 银行弹窗E2E定位新增按钮且等待接口
3213. [苏房] ElCol补丁致单设span24被半宽覆盖
3214. [苏房] 已备案企业从业人员详情页默认编辑非变更
3215. [苏房] 企业入网确认详情页移除股东信息区块
3216. [苏房] 全局ElCol默认栅格致Step1三列布局异常
3217. [苏房] Headline内el-row冗余致栅格固定两列
3218. [苏房] 搜索表单字典及日期组件未统一对接zs全局规范
3219. [苏房] 模板zs组件闭合标签误用el前缀需全局统一
3220. [苏房] 企业注册信用代码提取统一采用企信通映射
3221. [苏房] 弹窗打开事件覆盖继承监听父级失效
3222. [苏房] 企业入网详情资质要件缺ID不显示
3223. [苏房] 企业经纪机构管理员e2e探针验证路由可达性
3224. [苏房] 预售详情附件缺失因busCode获取不可靠
3225. [苏房] 菜单详情path缺斜杠致新增路由匹配失败
3226. [苏房] 填空布局窄框清除图标重叠须关闭
3227. [苏房] 分支机构注销弹窗新增必填附件上传
3228. [苏房] 全站行政区划格式化统一仅显示区级
3229. [苏房] 三种企业注册统一营业期限组件与校验
3230. [苏房] 预售现售签订撤销列表工具栏去plain改色
3231. [苏房] 企业基本信息页增加资质区块并对齐要件上传
3232. [苏房] 详情页表单flex:1撑满致zs-tabs空白
3233. [苏房] 非增删改查接口禁带 /detail 或 /add
3234. [苏房] zljg租赁从业人员E2E真实接口覆盖企管端
3235. [苏房] 白名单内$get发GET致POST接口405
3236. [苏房] 预售域批量删除改删除且维护去图标
3237. [苏房] 房屋限制跳转路由 projectId 优先防传错
3238. [苏房] 机构端变更附件 busCode 按机构类型映射
3239. [苏房] esbuild子进程中断致vite构建失败非语法错误
3240. [苏房] 三个子表独立弹窗CRUD不随主表保存
3241. [苏房] contractRequest请求体改ID数组沿用原接口
3242. [苏房] 新增合同弹窗侧边栏与筛选区UI对齐
3243. [苏房] 部门列表去tableTr调用doLayout防留白
3244. [苏房] 租赁机构变更须本菜单页内切换查看编辑
3245. [苏房] 交付备案目录调整弃用中间delivery层级
3246. [苏房] 经纪租赁注册联调失败根因后端返回500
3247. [苏房] 字典重渲染未防御空值length访问致报错
3248. [苏房] 表格行键空值重复致tbody不渲染高度异常
3249. [苏房] 注册Stepper完成态图标须蓝底白文档与步骤统一
3250. [苏房] 机构入网审核详情服务方案须用内嵌列表防空数据
3251. [苏房] zs-table加载态须仅遮表体使表头始终可见
3252. [苏房] 子表工具栏须用operation-button容器
3253. [苏房] 详情页label-position由zs-form读
3254. [苏房] B端子表编辑权限由operable正向控制
3255. [苏房] 搜索表单flex对齐冲突致字典弹窗错乱
3256. [苏房] 页签key撞车致互斥失效及子表未就绪取数为空
3257. [苏房] 选证弹窗内联组件致表格溢出函数式Dialog替代
3258. [苏房] 预售详情页接入HeadTitle统一样式去重
3259. [苏房] user模块未命名空间致终端类型读取失败
3260. [苏房] 合同表单统一样式标签在上行距24px列距32px
3261. [苏房] 管理员维护变更业务码按机构类型查表
3262. [苏房] 重置须optionsdata.call绑定组件实例
3263. [苏州市房地产监测V3-leftover] detailMixins视图模式拼错详情请求路径
3264. [苏州市房地产监测V3-leftover] zs-input弹窗选择须带suffix-icon
3265. [苏州市房地产监测V3-leftover] zs-table-column 单元格覆盖 index 
3266. [苏州市房地产监测V3-leftover] 表单项固定留白容纳校验错误防高度跳动
3267. [苏州市房地产监测V3-leftover] 填空输入框撑大行盒致合同行距紧贴
3268. [苏州市房地产监测V3-leftover] 构建报 API 未导出需于 companyApply 补
3269. [苏州市房地产监测V3-leftover] el-col 置于 zs-form 外致弹窗布局单列
3270. [苏州市房地产监测V3-leftover] .dialog-left flex:1 致弹窗留白
3271. [苏州市房地产监测V3-leftover] E2E保存超时因未传必传附件被前端拦截
3272. [苏州市房地产监测V3-leftover] detail.vue缺字段致Vue警告与详情请求异常
3273. [苏州市房地产监测V3-leftover] 备案证书弹窗重写移除旧表格采用背景图
3274. [苏州市房地产监测V3-leftover] 后端工作流503致公司注册提交失败
3275. [苏州市房地产监测V3-leftover] Windows执行别名致python3开商店
3276. [苏州市房地产监测V3-leftover] cashsalePlanId解析错致查看按钮禁用
3277. [苏州市房地产监测V3-leftover] 关联房屋详情弹窗分页按单据分流
3278. [苏州市房地产监测V3-leftover] 租赁合同录入与备案拆分为独立菜单
3279. [苏州市房地产监测V3-leftover] permitExtend列配置项目名称文本编号链接
3280. [苏州市房地产监测V3-leftover] 机构备案管理统一administrativeArea
3281. [苏州市房地产监测V3-leftover] FormInput未控fitContent致测宽报错
3282. [苏州市房地产监测V3-leftover] 单页注册样式仅认sm-12致sm-16列宽1/3
3283. [苏州市房地产监测V3-leftover] 人员状态调整弹窗按冻结态区分操作选项
3284. [苏州市房地产监测V3-leftover] 人员状态展示仅用bizState致注销冻结不显
3285. [苏州市房地产监测V3-leftover] 监管协议终止列表接口误拼/add后缀
3286. [苏州市房地产监测V3-leftover] 合并验证码字段不影响Element UI表单校验
3287. [苏州市房地产监测V3-leftover] 踏勘表busCode须统一引用ysxkcs
3288. [苏州市房地产监测V3-leftover] Vue2模板v-for的key须落在真实节点
3289. [苏州市房地产监测V3-leftover] 经纪机构详情页缺失备案状态与条件
3290. [苏州市房地产监测V3-leftover] 建设用地规划许可证不动产权证号错位
3291. [苏州市房地产监测V3-leftover] 企业变更接口须传行政区划字段
3292. [苏州市房地产监测V3-leftover] 满量禁用el-upload致删除失效与列表弹跳
3293. [苏州市房地产监测V3-leftover] 详情页data缺字段致按钮组未定义警告
3294. [苏州市房地产监测V3-leftover] 承办银行网点回显规范动态API与nextTick
3295. [苏州市房地产监测V3-leftover] 表单内Collapse区块缺失垂直间距需row-gap
3296. [苏州市房地产监测V3-leftover] 表格链接型插槽误用固定列宽需改弹性
3297. [苏州市房地产监测V3-leftover] 工作牌下载缺object-fit致图拉伸
3298. [苏州市房地产监测V3-leftover] zs-table列宽闪动因两段异步改宽逻辑叠加
3299. [苏州市房地产监测V3-leftover] 预售面积字段须用 zs-input-number
3300. [苏州市房地产监测V3-leftover] 预售历史文本解析回填至输入框
3301. [苏州市房地产监测V3-leftover] 监管项目prop与rules不一致致校验失效
3302. [苏州市房地产监测V3-leftover] 统一编码列误取房屋编号致显示异常
3303. [苏州市房地产监测V3-leftover] 写死labelAlign:right破坏详情左对齐
3304. [苏州市房地产监测V3-leftover] Headline标题栏与内容区内边距叠加重复
3305. [苏州市房地产监测V3-leftover] SelectDialog 拆散致 Vite 解析失败
3306. [苏州市房地产监测V3-leftover] 项目备案新增宗地信息地块编号改手输
3307. [苏州市房地产监测V3-leftover] 住房租赁合同备案详情缺打印按钮
3308. [苏州市房地产监测V3-leftover] 预售模板下载对齐要件下载模板写法
3309. [苏州市房地产监测V3-leftover] 经纪从业人员变更businessName写死致接口错
3310. [苏州市房地产监测V3-leftover] 银行详情页支行列表接口未适配路由前缀
3311. [苏州市房地产监测V3-leftover] 审批意见字段由comment改为approveMessa
3312. [苏州市房地产监测V3-leftover] Vue模板闭合标签错用zs前缀致编译失败
3313. [苏州市房地产监测V3-leftover] FileUpload先emit后同步v-model致附件
3314. [苏州市房地产监测V3-leftover] 监管项目名称flex布局对齐楼幢号与全角括号
3315. [苏州市房地产监测V3-leftover] 组件使用未定义fieldLayout报错
3316. [苏州市房地产监测V3-leftover] 下线generateQrCode接口与扫码上传UI
3317. [苏州市房地产监测V3-leftover] 机构变更须保留provinceCityArea原值
3318. [苏州市房地产监测V3-leftover] 工作牌信息卡弹窗布局须居中且标签对齐
3319. [苏州市房地产监测V3-leftover] 详情页缺CRUD字段致Vue警告及接口错
3320. [苏州市房地产监测V3-leftover] 组件误用detailMixins致冲突与form改写
3321. [苏州市房地产监测V3-leftover] 委托代售接口入参areaCode须改为region
3322. [苏州市房地产监测V3-leftover] 注册表单form无setter被赋值致警告
3323. [苏州市房地产监测V3-leftover] 根路径菜单含alwaysShow时不应展平为子菜单
3324. [苏州市房地产监测V3-leftover] 注销详情附件改普通attachmentList字段
3325. [苏州市房地产监测V3-leftover] ESM环境require不兼容致引用错误
3326. [苏州市房地产监测V3-leftover] 要件上传必填星号由operable控制显隐
3327. [苏州市房地产监测V3-leftover] 证书弹窗certificateType缺必填致无星号
3328. [苏州市房地产监测V3-leftover] 租赁机构基本信息页isLeaseOrgan隐变更
3329. [苏州市房地产监测V3-leftover] 共享布局兜底样式强制列宽致整行字段半宽
3330. [苏州市房地产监测V3-leftover] 服务方案页双向监听与表单嵌套致卡死
3331. [苏州市房地产监测V3-leftover] Step5Result删除打印凭证按钮与调用
3332. [苏州市房地产监测V3-leftover] 机构注册USCI按钮与输入框同行显示
3333. [苏州市房地产监测V3-leftover] 经纪机构基本信息页 created 无条件调 loadD
3334. [苏州市房地产监测V3-leftover] zs列组件规范移除width与:width绑定
3335. [苏州市房地产监测V3-leftover] 前端按管理员类型过滤受托人要件致不显示
3336. [苏州市房地产监测V3-leftover] 联调不可共用E2E文件服务否则sample.png回显
3337. [苏州市房地产监测V3-leftover] zs-dialog样式优先级平致弹窗左面板双重间距
3338. [苏州市房地产监测V3-leftover] 预售总面积前端按房屋汇总用mathjs避浮点误差
3339. [苏州市房地产监测V3-leftover] 法人姓名未限长致400故限30字符
3340. [苏州市房地产监测V3-leftover] 监管银行下拉框高度deep限38px
3341. [苏州市房地产监测V3-leftover] 项目无typecheck脚本且Vue审查未跑全仓
3342. [苏州市房地产监测V3-leftover] 机构注销列表机构类型须用companyType
3343. [苏州市房地产监测V3-leftover] 经纪入网保存携别名与协会字段
3344. [苏州市房地产监测V3-leftover] 测绘变更add接口入参经映射函数构造
3345. [苏州市房地产监测V3-leftover] 组件prop与mixin计算属性mode同名致覆盖
3346. [苏州市房地产监测V3-leftover] npm run lint 带文件名仍 lint 全 sr
3347. [苏州市房地产监测V3-leftover] 经纪租赁人员详情页移除证件类型字段
3348. [苏州市房地产监测V3-leftover] AppendixEmpty 误引路径且未注册报错
3349. [苏州市房地产监测V3-leftover] 缺appendixBusCode计算属性致Vue警告
3350. [苏州市房地产监测V3-leftover] INDUSTRY字典未转写致详情显原值
3351. [苏州市房地产监测V3-leftover] zs-table-column插槽误用{row}致报错
3352. [苏州市房地产监测V3-leftover] 选房对话框未初始选中数组致报错
3353. [苏州市房地产监测V3-leftover] 预售许可保存漏传batchNo字段致批次缺失
3354. [苏州市房地产监测V3-leftover] 分支注销附件因编码缺和挂载早未加载
3355. [苏州市房地产监测V3-leftover] 人员字段查看编辑显隐未统一致数量差
3356. [苏州市房地产监测V3-leftover] 组件v-model用computed致渲染行未定义
3357. [苏州市房地产监测V3-leftover] 多文件残留地域专属分支未统一通用
3358. [苏州市房地产监测V3-leftover] 注销信息布局复用基本信息栅格与间距规范
3359. [苏州市房地产监测V3-leftover] 预售合同标题置于右侧操作条左侧非侧边
3360. [苏州市房地产监测V3-leftover] 基本信息变更硬编码开发详情致经纪跳错
3361. [苏州市房地产监测V3-leftover] 测绘变更选项目信用代码字段映射缺失
3362. [苏州市房地产监测V3-leftover] 无tableid详情路由拼路径段易404
3363. [苏州市房地产监测V3-leftover] usemoney详情data缺三字段致警告
3364. [苏州市房地产监测V3-leftover] listName同时存props和data致警告
3365. [苏州市房地产监测V3-leftover] Grid回调默认null绑定Card致类型检查警告
3366. [苏州市房地产监测V3-leftover] 子表混入listMixins未声明属性致Vue警告
3367. [苏州市房地产监测V3-leftover] 经纪机构备案busCode误配jgcyrybg致异常
3368. [苏州市房地产监测V3-leftover] Vite误用process.env触发Vue警告
3369. [苏州市房地产监测V3-leftover] FORM_COL_TWO被转span8仅占1/3宽
3370. [苏州市房地产监测V3-leftover] 楼盘表图例绝对定位固定padding换行遮挡
3371. [苏州市房地产监测V3-leftover] 权限指令包裹按钮留空flex子项致间距异常
3372. [苏州市房地产监测V3-leftover] 上传组件包含校验误拦docx且旧类型未热更新
3373. [苏州市房地产监测V3-leftover] detail.vue缺字段引发Vue警告及接口拼接错
3374. [苏州市房地产监测V3-leftover] zs-table多选列未设row-key致更新报错
3375. [苏州市房地产监测V3-leftover] 楼幢详情房屋分页不可固定bizState
3376. [苏州市房地产监测V3-leftover] 不动产权证三页面字段顺序未按标注排列
3377. [苏州市房地产监测V3-leftover] 两列栅格FORM_COL_WIDE未归一化致错位
3378. [苏州市房地产监测V3-leftover] 机构类别弹窗去灰标仅留图标与全称
3379. [苏州市房地产监测V3-leftover] 从业人员查看态网格去编号重排8字段
3380. [苏州市房地产监测V3-leftover] 租金支付方式仅改显示承租字段非必填
3381. [苏州市房地产监测V3-leftover] 签订新增模式移除补拉合同主信息请求
3382. [苏州市房地产监测V3-leftover] 入网审核详情服务方案收费标准缺单位
3383. [苏州市房地产监测V3-leftover] 嵌套容器overflow-x叠加致宽表多横滚动条
3384. [苏州市房地产监测V3-leftover] 企业变更列表内核须固organType拆薄页
3385. [苏州市房地产监测V3-leftover] 租赁人员详情移除角色字段自动推导
3386. [苏州市房地产监测V3-leftover] 预售注销列表硬编码路径致跳转错位
3387. [苏州市房地产监测V3-leftover] 资金调拨详情外层Headline致标题重复
3388. [苏州市房地产监测V3-leftover] zs-table多选列未设row-key报警告
3389. [苏州市房地产监测V3-leftover] 企业证书companyAdd通Update报500
3390. [苏州市房地产监测V3-leftover] 注册表单附件守卫误拦法人非必填提交
3391. [苏州市房地产监测V3-leftover] 组件data与mixin同名computed告警
3392. [苏州市房地产监测V3-leftover] 组件ES6简写未导入变量致ReferenceError
3393. [苏州市房地产监测V3-leftover] 管理员详情缺organType致人员字段隐且保存漏
3394. [苏州市房地产监测V3-leftover] 从业人员附件busCode强制常量jgcyryba
3395. [苏州市房地产监测V3-leftover] 管理员详情变更按钮不显因权限校验失败
3396. [苏州市房地产监测V3-leftover] 服务方案收费类型无选项因字典charge_type
3397. [苏州市房地产监测V3-leftover] 组件data与mixin同名regionOptions冲
3398. [苏州市房地产监测V3-leftover] 证书列表序号列误绑billNo致空白
3399. [苏州市房地产监测V3-leftover] 资格证书管理页联系电话非必填仅格式校验
3400. [苏州市房地产监测V3-leftover] 组件data与混入computed同名引发警告
3401. [苏州市房地产监测V3-leftover] 单元列表误用sys_include字典显示0
3402. [苏州市房地产监测V3-leftover] handleDelete无参调用致空行报错
3403. [苏州市房地产监测V3-leftover] 资质详情页资质状态未加载字典显示1
3404. [苏州市房地产监测V3-leftover] el-row align=top致两行搜索未居中
3405. [苏州市房地产监测V3-leftover] 企业入网保存走saveAgency封装
3406. [苏州市房地产监测V3-leftover] 从业人员状态字典缺失致标签显原值
3407. [苏州市房地产监测V3-leftover] 对话框关闭置空致动画期读取属性报错
3408. [苏州市房地产监测V3-leftover] headroom库模式无对象代理层过重不引入
3409. [苏州市房地产监测V3-leftover] 股东信息表仅单列弹性致满屏空白
3410. [苏州市房地产监测V3-leftover] ImageUpload传数组file-type致报错
3411. [苏州市房地产监测V3-leftover] getFileProxyTarget返回接口代理地址
3412. [苏州市房地产监测V3-leftover] el-upload必填action未传致Vue警告
3413. [苏州市房地产监测V3-rest] list-card内表格少数据未收缩致空白
3414. [苏州市房地产监测V3-rest] 文本域组件全局独占一行一列
3415. [苏州市房地产监测V3-rest] zs-table-column插槽需解构取行数据
3416. [苏州市房地产监测V3-rest] 列表删除须交由table.js mixin统一
3417. [苏州市房地产监测V3-rest] 未注册zs组件触发Vue警告须替换
3418. [苏州市房地产监测V3-rest] 行内删除统一为danger且plain描边样式
3419. [苏州市房地产监测V3-rest] 变更按钮跳转失败因路由抛错及ID格式不兼容
3420. [苏州市房地产监测V3-rest] index透传冲突与type判断失效致表格链接失效
3421. [苏州市房地产监测V3-rest] 从业人员仅待提交态可编辑且统一update接口
3422. [苏州市房地产监测V3-rest] 变更列表查看按备案busCode解析路由调错接口
3423. [苏州市房地产监测V3-rest] 企业E2E查看页reload致数据竞态
3424. [苏州市房地产监测V3-rest] 按钮组返回去URL末段致空白页
3425. [苏州市房地产监测V3-rest] VITE文件代理错配致静态资源404
3426. [苏州市房地产监测V3-rest] 第三方iframe加载异常需查Console与Net
3427. [苏州市房地产监测V3-rest] 列表进详情频报未授权路由因缺静默查找
3428. [苏州市房地产监测V3-rest] 列表查询区与卡片间距统一由CSS变量控制
3429. [苏州市房地产监测V3-rest] 选择楼幢列表空因表格插槽解构错误
3430. [苏州市房地产监测V3-rest] 各区块标题过挤需栈容器统一间距
3431. [苏州市房地产监测V3-rest] 企业注册全流程主管审核e2e用例实现
3432. [苏州市房地产监测V3-rest] 详情页同行span不同导致双列不等分
3433. [苏州市房地产监测V3-rest] 详情容器 el-row 覆盖 gap 变量致间距失效
3434. [苏州市房地产监测V3-rest] 变更机构核心字段需审核且信用代码锁定
3435. [苏州市房地产监测V3-rest] zs-select-dialog 绝对定位致右侧空白
3436. [苏州市房地产监测V3-rest] 委托代售详情页字典key错配致回显失败
3437. [苏州市房地产监测V3-rest] 附件PDF用固定图证书弹窗随内容增高
3438. [苏州市房地产监测V3-rest] 预售选证字段弃用el-input改zs-input
3439. [苏州市房地产监测V3-rest] zs-operate-column的permission
3440. [苏州市房地产监测V3-rest] 委托代售E2E调整日期及删除按钮定位
3441. [苏州市房地产监测V3-rest] 弹窗未声明visible被Vue2丢弃致隐藏
3442. [苏州市房地产监测V3-rest] 预售方案未传bus致与要件上传重复ysxksq
3443. [苏州市房地产监测V3-rest] 测绘变更busCode应从菜单路由meta动态解析
3444. [苏州市房地产监测V3-rest] 项目交付备案接口新增审批附件与归一化逻辑
3445. [苏州市房地产监测V3-rest] zs-dialog致表单单列需el-row两列
3446. [苏州市房地产监测V3-rest] 合同删除接口弃用v2改走v1
3447. [苏州市房地产监测V3-rest] bizStateTone仅判有效正常漏已备案
3448. [苏州市房地产监测V3-rest] 注册步骤回退无参调用致ID丢失回显失败
3449. [苏州市房地产监测V3-rest] 房屋弹窗tree缺参及列表解析启发式致异常
3450. [苏州市房地产监测V3-rest] 合同2016组件按/cash判定现售复用公共组件
3451. [苏州市房地产监测V3-rest] 开发企业人员状态复用personnelStatus
3452. [苏州市房地产监测V3-rest] 价格备案详情页均复用DetailTemplate
3453. [苏州市房地产监测V3-rest] 注册步骤条完成态用completeIcon图片
3454. [苏州市房地产监测V3-rest] businessName禁作prop与computed
3455. [苏州市房地产监测V3-rest] 监管弹窗查看态统一用DetailTemplate
3456. [苏州市房地产监测V3-rest] Tab卡片 flex:1 占满高度致表格下方留白
3457. [苏州市房地产监测V3-rest] detail.vue 注册未导入组件致引用错误
3458. [苏州市房地产监测V3-rest] szForm.js 校验空实现致未填项无前端定位
3459. [苏州市房地产监测V3-rest] 企业详情页busCode写死致变更异常需路由解析
3460. [苏州市房地产监测V3-rest] 详情页Tab内嵌面板须用borderOnly避免标题重复
3461. [苏州市房地产监测V3-rest] 预售详情流程查看按钮调整并统一审批记录显隐
3462. [苏州市房地产监测V3-rest] 详情接口projectId空致楼盘表点击无响应
3463. [苏州市房地产监测V3-rest] 分支新增页用getOwnCompany替init回填
3464. [苏州市房地产监测V3-rest] E2E同址登录强走storageState致会话失效
3465. [苏州市房地产监测V3-rest] 现售维护页引专用填报组件修正编辑态
3466. [苏州市房地产监测V3-rest] 服务方案弹窗去拦截并用v-if重挂载
3467. [苏州市房地产监测V3-rest] dialog-box 左右边距叠加致间距过大
3468. [苏州市房地产监测V3-rest] 预售许可历史查看硬编码路由致页面未授权
3469. [苏州市房地产监测V3-rest] E2E表格间距验证未授权菜单须skip防误报
3470. [苏州市房地产监测V3-rest] 全局块级span致树形菜单箭头与名称错位
3471. [苏州市房地产监测V3-rest] 经纪机构入网保存必填业务范围受开业标志控
3472. [苏州市房地产监测V3-rest] 选择机构弹窗空白因未自适应高度
3473. [苏州市房地产监测V3-rest] 全局用resolveResponseId防无效ID
3474. [苏州市房地产监测V3-rest] Playwright通用登录无法验证证书筛选UI
3475. [苏州市房地产监测V3-rest] 路由meta缺busCode致审核流程未维护报错
3476. [苏州市房地产监测V3-rest] 转现售禁用日期选择器致项目交付日期不回显
3477. [苏州市房地产监测V3-rest] 银行网点弹窗列未配链接且缺编码无法选
3478. [苏州市房地产监测V3-rest] 所属区域编码未转名称致详情展示编码
3479. [苏州市房地产监测V3-rest] 定金列表因接口data未被解析而不显示
3480. [苏州市房地产监测V3-rest] 注册e2e定位与Step1表单不一致致失败
3481. [苏州市房地产监测V3-rest] 证书弹窗未用zs-form且缺上传提示
3482. [苏州市房地产监测V3-rest] select-dialog关拖拽置top0免双重下移
3483. [苏州市房地产监测V3-rest] 预售方案三字段改zs-select接入字典
3484. [苏州市房地产监测V3-rest] 监管弹窗未传用款类型致项目查询参数丢失
3485. [苏州市房地产监测V3-rest] 企业详情未传审核总线码与变更ID致查看缺失
3486. [苏州市房地产监测V3-rest] 标签页子表冗余内框且工具栏未与标题同行
3487. [苏州市房地产监测V3-rest] Vite须用VITE_前缀替代VUE_APP_变量
3488. [苏州市房地产监测V3-rest] 变更角标比对抽离mixin忽略日期格式差异
3489. [苏州市房地产监测V3-rest] 已备案bizState=2禁止显示编辑按钮
3490. [苏州市房地产监测V3-rest] 退款详情页字典缺项直访dictValue报错
3491. [苏州市房地产监测V3-rest] 合同范本跳转禁用硬编码路由名
3492. [苏州市房地产监测V3-rest] 固定宽自定义列参与均分致表格留白
3493. [苏州市房地产监测V3-rest] 表格列插槽解构错误致删除按钮失效
3494. [苏州市房地产监测V3-rest] 监管终止详情表单右缘对齐依赖列间距栅格
3495. [苏州市房地产监测V3-rest] Tab内明细去外框且工具栏同行需样式覆盖
3496. [苏州市房地产监测V3-rest] 开发企业详情页复用模板移除经纪机构逻辑
3497. [苏州市房地产监测V3-rest] 注册Step4股东信息采用zs-table标准布局
3498. [苏州市房地产监测V3-rest] 环境专属分支不清理则组件 Vue warn 告警
3499. [苏州市房地产监测V3-rest] `.detail-template`设无边框误删外框
3500. [苏州市房地产监测V3-rest] 硬编码busCode致机构备案审批流程未维护
3501. [苏州市房地产监测V3-rest] 路由查找未比对component致工具函数失效
3502. [苏州市房地产监测V3-rest] DetailTemplate required致详情查看
3503. [苏州市房地产监测V3-rest] 现售备案详情页显信息去顶栏防压表
3504. [苏州市房地产监测V3-rest] 列表搜索企业名称等须页内计算属性过滤
3505. [苏州市房地产监测V3-rest] 企业入网详情接口区域字段前端须同步迁移
3506. [苏州市房地产监测V3-rest] 业务对账页UI规范落地全仓检查误报非本文件
3507. [苏州市房地产监测V3-rest] 楼幢单元懒加载左树组件公共复用
3508. [苏州市房地产监测V3-rest] v-if懒挂载与@open错位致初始化未执行
3509. [苏州市房地产监测V3-rest] 折叠区label-left留白因样式规则未覆盖
3510. [苏州市房地产监测V3-rest] 查看态经营范围由 DetailTemplate 渲染弃用
3511. [苏州市房地产监测V3-rest] 预售方案PDF须读planDocSite防回退
3512. [苏州市房地产监测V3-rest] 移除全局注册后动态组件依赖prop传映射
3513. [苏州市房地产监测V3-rest] 占位分配拆散多文件要件致UI显单图
3514. [苏州市房地产监测V3-rest] 详情组件缺primaryKey等字段致Vue警告
3515. [苏州市房地产监测V3-rest] tdai工具未传session_key必填参数报错
3516. [苏州市房地产监测V3-rest] 价格备案详情view用text编辑态用slot防裁切
3517. [苏州市房地产监测V3-rest] Vue2里data覆盖同名computed属性
3518. [苏州市房地产监测V3-rest] 内联SelectDialog缺v-if致关闭后残留空白
3519. [苏州市房地产监测V3-rest] 信用代码改input-with-actions布局
3520. [苏州市房地产监测V3-rest] 现售楼幢删除已保存须调save接口
3521. [苏州市房地产监测V3-rest] .detail-container 溢出隐藏裁掉兄弟节点
3522. [苏州市房地产监测V3-rest] zhi2-web-admin仅前端无后端需别仓改
3523. [苏州市房地产监测V3-rest] 委托代售详情zs-form禁用致要件按钮不可点
3524. [苏州市房地产监测V3-rest] 操作按钮组未统一事件致页面重复绑定
3525. [苏州市房地产监测V3-rest] 详情表单 gap 与 padding 叠加致间距乱
3526. [苏州市房地产监测V3-rest] 预售页叙事行justify与输入框满宽致错位
3527. [苏州市房地产监测V3-rest] 经纪机构列表页主文件含筛选分页
3528. [苏州市房地产监测V3-rest] bizStateOptions同名冲突触发Vue警告
3529. [苏州市房地产监测V3-rest] 合同页动态组件仅按PascalCase注册
3530. [苏州市房地产监测V3-rest] 共用路由缺机构区分致 organType 误传
3531. [苏州市房地产监测V3-rest] 路由名首段作pathHint致合同缴款页误命中
3532. [苏州市房地产监测V3-rest] 变更表单值格式化后相同则隐藏原值角标
3533. [苏州市房地产监测V3-rest] 宽表未限宽横向滚动致800px版心穿屏
3534. [苏州市房地产监测V3-rest] 操作按钮须对齐公共组件顺序且去图标
3535. [苏州市房地产监测V3-rest] 机构注册区域字段须迁移兼容旧数据
3536. [苏州市房地产监测V3-rest] el-col栅格最小宽致日期范围证书有效期未对齐
3537. [苏州市房地产监测V3-rest] 入网变更详情页应显返回编辑与流程查看按钮
3538. [苏州市房地产监测V3-rest] 子表组件独占Headline避免嵌套冗余
3539. [苏州市房地产监测V3-rest] 接口覆盖form致opensalesType识别失败
3540. [苏州市房地产监测V3-rest] 选房弹窗未同步节点致合同页created异常
3541. [苏州市房地产监测V3-rest] 办公信息区联系人字段被误作企业名称
3542. [苏州市房地产监测V3-rest] 飞书拉起cursor会话秒退因守护进程未运行
3543. [苏州市房地产监测V3-rest] 资质表单弃el栅格采用section-form
3544. [苏州市房地产监测V3-rest] WorkBuddy签到定时任务迁移至pi-web
3545. [苏州市房地产监测V3-rest] 监管详情片区下拉无值因API引用未统一
3546. [苏州市房地产监测V3-rest] 预售方案查看无值因未解析presalePlanId
3547. [苏州市房地产监测V3-rest] 转现售通过yszxs码拼接预售与本单要件
3548. [苏州市房地产监测V3-rest] 房屋弹窗表格列须用 scope.row 否则报错
3549. [苏州市房地产监测V3-rest] 分支机构保存仅校验表单不预检要件审批
3550. [苏州市房地产监测V3-rest] 机构注销上传统一复用要件网格组件
3551. [苏州市房地产监测V3-rest] PermitPlanPanel未维护时缺省图遮挡维护按钮
3552. [苏州市房地产监测V3-rest] 本地字典与area mixin计算属性命名冲突
3553. [苏州市房地产监测V3-rest] 企业注册股东信息复用经纪机构三态图标
3554. [苏州市房地产监测V3-rest] 楼幢号优先展示 buildingNo 回退 buildi
3555. [苏州市房地产监测V3-rest] 企业变更返回未切view致编辑态残留
3556. [苏州市房地产监测V3-rest] 登录成功递归跳转首个叶子菜单无则回退
3557. [苏州市房地产监测V3-rest] 委托代售要件上传对齐全局并隐藏附件抽屉
3558. [苏州市房地产监测V3-rest] 弹窗两列布局中文本域经样式覆盖保持整行
3559. [苏州市房地产监测V3-rest] 限制审核编辑子表消失因选中房屋未初始化
3560. [苏州市房地产监测V3-rest] detail-container禁滚改由表单容器滚动
3561. [苏州市房地产监测V3-rest] 开业空附件按配置名复用注册包附件回显
3562. [苏州市房地产监测V3-rest] 现售备案详情基本信息首位展示备案编号
3563. [苏州市房地产监测V3-rest] 委托代售详情缺映射函数致数据不通
3564. [苏州市房地产监测V3-rest] 经纪机构详情页未复用布局常量致不统一
3565. [苏州市房地产监测V3-rest] 弹窗误用未注册pagination组件触发Vue警告
3566. [苏州市房地产监测V3-rest] .detail-container减高16px底空白
3567. [苏州市房地产监测V3-rest] 详情页高z-index组件遮挡水印致局部不可见
3568. [苏州市房地产监测V3-rest] 栅格占满换行缺gridOffset致列对齐错位
3569. [苏州市房地产监测V3-rest] presale详情页未注册zs-attachment致V
3570. [苏州市房地产监测V3-rest] 限制单据保存后子表未同步分页致不刷新
3571. [苏州市房地产监测V3-rest] Area列未统一识别致误伤与对齐覆盖
3572. [苏州市房地产监测V3-rest] busCode解析误将备案编码当变更码
3573. [苏州市房地产监测V3-rest] 序号列宽60透传绕过全局80致表头截断不全
3574. [苏州市房地产监测V3-rest] 经纪机构区域字段变更前端未同步适配
3575. [苏州市房地产监测V3-rest] 网点弹窗改zs-size mini并去除表单项行高
3576. [苏州市房地产监测V3-rest] 详情页高度计算误差致底部白条与滚动遮挡
3577. [苏州市房地产监测V3-rest] zs-input-num step=1致小数输入受限
3578. [苏州市房地产监测V3-rest] 企业注册页窄版表单与按钮栏水平居中
3579. [苏州市房地产监测V3-rest] 详情页容器覆盖 el-row 间隙并归零标题边距
3580. [苏州市房地产监测V3-rest] 合同审批接口路径须为 flowable/task
3581. [苏州市房地产监测V3-rest] 企业股东列表自 detail 响应解析并兜底
3582. [苏州市房地产监测V3-rest] 证书接口请求体须为companyApplyId对象
3583. [苏州市房地产监测V3-rest] 服务方案详情采用三列栅格且内容弃用v-html
3584. [苏州市房地产监测V3-rest] 弹窗关闭按钮用top对齐内边距致视觉未居中
3585. [苏州市房地产监测V3-rest] 登录盒ResizeObserver引发高度正反馈自激
3586. [苏州市房地产监测V3-rest] 楼幢详情项目链接错路径致误报无授权
3587. [苏州市房地产监测V3-rest] zs-input 无金额格式化致预售面积精度异常
3588. [苏州市房地产监测V3-rest] 开发企业注册重置依赖提取快照致失效
3589. [苏州市房地产监测V3-rest] 审核中要件busId须用变更单ID禁落备案ID
3590. [苏州市房地产监测V3-rest] 开发企业从业人员详情页隐藏要件上传模块
3591. [苏州市房地产监测V3-rest] 组件prop不可与全局mixin的formMode同名
3592. [苏州市房地产监测V3-rest] 组件formMode兜底逻辑须对齐全局mixin
3593. [苏州市房地产监测V3-rest] 组件mode prop被mixin覆盖致弹窗异常
3594. [苏州市房地产监测V3-rest] 委托代售楼幢选择复用公共弹窗
3595. [苏州市房地产监测V3-rest] 经纪机构备案详情附件业务编码复用注册编码
3596. [苏州市房地产监测V3-rest] 顶栏叶子菜单误同步侧栏并混入常量路由
3597. [苏州市房地产监测V3-rest] 备案态详情未用裸ID则加载失败
3598. [苏州市房地产监测V3-rest] 变更单保存须改formMode为view退出编辑态
3599. [苏州市房地产监测V3-rest] CI OOM 同步仅改子模块多分支 Vite 配置
3600. [苏州市房地产监测V3-rest] 实际前端代码存于 zhi2-web-admin 子模块内
3601. [苏州市房地产监测V3-rest] 银行网点列表接口 list 改 page 模式
3602. [苏州市房地产监测V3-rest] DetailTemplate无边框仅去外框留网格线
3603. [苏州市房地产监测V3-rest] 企业要件上传UI全局提示且标签同行
3604. [苏州市房地产监测V3-rest] 资质回显兼容双列表且动态解析许可编码
3605. [苏州市房地产监测V3-rest] 变更备案详情页表单标签位置偏好左对齐
3606. [苏州市房地产监测V3-rest] 房屋限制区域列须配 provinceFormatter
3607. [苏州市房地产监测V3-rest] 从业人员变更附件 busCode 误用备案编码
3608. [苏州市房地产监测V3-rest] 分支页图片预览失效因字典未匹配及缺校验
3609. [苏州市房地产监测V3-rest] 企业注册上传项重构对齐机构上传组件
3610. [苏州市房地产监测V3-rest] 缴款网点弹窗缺失bankBranch分页接口
3611. [苏州市房地产监测V3-rest] 分页接口列表嵌 data 硬取 rows 致表格空白
3612. [苏州市房地产监测V3-rest] 硬编码跳待办页早于动态路由注册致404
3613. [苏州市房地产监测V3-rest] 分支机构详情查看态头部未依业务状态隐保存
3614. [苏州市房地产监测V3-rest] Vite ESM 使用 require 致浏览器报错
3615. [苏州市房地产监测V3-rest] 预售楼幢进度维护前需补保存并保持编辑态
3616. [苏州市房地产监测V3-rest] 注册页顶栏从系统配置读取图标与名称
3617. [苏州市房地产监测V3-rest] vue-qr默认margin过大导致二维码留白超标
3618. [苏州市房地产监测V3-rest] 机构基本信息附件按类型固定 busCode 且 busI
3619. [苏州市房地产监测V3-rest] 三种注册流程删除 API 不一致且无 deleteAno
3620. [苏州市房地产监测V3-rest]  合同买受人信息改用 zs-tabs 卡片式页签
3621. [苏州市房地产监测V3-rest] 注册页 provinceCityArea 须替换
3622. [苏州市房地产监测V3-rest] 监管项目字段随缴款通知书回填并通栏
3623. [苏州市房地产监测V3-rest] 列表批量删除复用 mixin 回退 this.ids
3624. [苏州市房地产监测V3-rest] 机构基本信息删前二字段按序改名去前缀
3625. [苏州市房地产监测V3-rest] 证书管理操作列插槽未解构致字段未定义
3626. [苏州市房地产监测V3-rest] 楼盘表API旧路径buildinginfo致400错
3627. [苏州市房地产监测V3-rest] 股东列表列宽冗余且成立日期缺校验
3628. [苏州市房地产监测V3-rest] 证书等级回显失败因字段误用未配字典
3629. [苏州市房地产监测V3-rest] Vue2混入与组件同名属性触发警告
3630. [苏州市房地产监测V3-rest] 银行账表空态不可写死行数否则留白异常
3631. [苏州市房地产监测V3-rest] 企业注册资质选填与提交校验对齐非严格模式
3632. [苏州市房地产监测V3-rest] 股东表合并单侧空值需空值安全格式化
3633. [苏州市房地产监测V3-rest] 新增与批量删除按钮须复用mixin实现
3634. [苏州市房地产监测V3-rest] 机构变更列表须用administrativeArea
3635. [苏州市房地产监测V3-rest] detail-template标签列全局左对齐
3636. [苏州市房地产监测V3-rest] 股东信息删除前弹窗确认防误删
3637. [苏州市房地产监测V3-rest] 证书详情表单依设计稿调整为14字段三列栅格
3638. [苏州市房地产监测V3-rest] 单元列表项目与楼幢号跳转对应详情页
3639. [苏州市房地产监测V3-rest] 登录框加载放大因JS动态计算面板尺寸
3640. [苏州市房地产监测V3-rest] 租赁机构变更busCode未配致回退误用
3641. [苏州市房地产监测V3-rest] 移除isSuzhouzhizai分支统一通用逻辑
3642. [苏州市房地产监测V3-rest] 本仓库为前端monorepo无Java后端源码
3643. [苏州市房地产监测V3-rest] 详情页留白白名单漏表格与zs-form缺16px
3644. [苏州市房地产监测V3-rest] CSS变量仅维护variables.css单文件
3645. [苏州市房地产监测V3-rest] 要件宫格上传改picture-card弃文字按钮
3646. [苏州市房地产监测V3-rest] 监管楼栋接口URL与字段须按新规范映射
3647. [苏州市房地产监测V3-rest] 默认跳/todo且TagView移除首页affix
3648. [苏州市房地产监测V3-rest] 上传区须12px左缩进对齐标题栏内边距
3649. [苏州市房地产监测V3-rest] 经纪机构行政区域字段归一化并字典展示
3650. [苏州市房地产监测V3-rest] 网点弹窗搜索栏复用 zs-search-form
3651. [苏州市房地产监测V3-rest] 弹窗表单标签右对齐且排除上下布局
3652. [苏州市房地产监测V3-rest] 详情页表单项与折叠面板间距全局统一
3653. [苏州市房地产监测V3-rest] 从业人员筛选区重名因G端冗余name字段
3654. [苏州市房地产监测V3-rest] 用款详情路由hint歧义致跳非监管页
3655. [苏州市房地产监测V3-rest] MCP反馈需配autoRetry及mdc规则文件
3656. [苏州市房地产监测V3-rest] 预售填报字典未动态加载且联动错误
3657. [苏州市房地产监测V3-rest] 操作列固定宽度致留白过多
3658. [苏州市房地产监测V3-rest] 要件网格标题行固定高度且操作区占位
3659. [苏州市房地产监测V3-rest] 级联组件 region 非必填兼容默认值
3660. [苏州市房地产监测V3-rest] col-16负margin对齐楼幢号全角括号右缘
3661. [苏州市房地产监测V3-rest] zs-form直接子级el-col获满宽
3662. [苏州市房地产监测V3-rest] 编辑态项目坐落占两列防止栅格错位
3663. [苏州市房地产监测V3-rest] Cursor 不提升内存上限并禁用冗余扩展
3664. [苏州市房地产监测V3-rest] 服务方案按比例收费缺0-100两位小数校验
3665. [苏州市房地产监测V3-rest] 详情模板列布局未正确处理满行归零
3666. [苏州市房地产监测V3-rest] 配套用房更名并删封闭设施留回写风险
3667. [苏州市房地产监测V3-rest] 静态资源误代理多/v3.0层且网关无文件服务
3668. [苏州市房地产监测V3-rest] 全局宽百比致弹窗按钮纵向堆叠
3669. [苏州市房地产监测V3-rest] 监管银行弹窗新旧方案跨模块复用
3670. [苏州市房地产监测V3-rest] 注销按钮不可设 warning 否则对比度过低
3671. [苏州市房地产监测V3-rest] Cursor 不可不限服务且广索引否则内存高
3672. [苏州市房地产监测V3-rest] 注册资本统一以金额组件万元单位展示
3673. [苏州市房地产监测V3-rest] 详情校验不再强制合并主键适配无id页
3674. [苏州市房地产监测V3-rest] 缴款网点弹窗对接分页须校验归集账户
3675. [苏州市房地产监测V3-rest] 预售转现售列表许可证取sourcePermitNo
3676. [苏州市房地产监测V3-rest] 定金退款监管项目改弹窗选择并去进页警告
3677. [苏州市房地产监测V3-rest] 委托代售楼幢表操作列复用 zs-operate-colu
3678. [苏州市房地产监测V3-rest] 选房 saleStatus 归一对齐展示与禁用逻辑
3679. [苏州市房地产监测V3-rest] 查看态不过滤空值以对齐编辑态字段数
3680. [苏州市房地产监测V3-rest] 网点列表接口因路由缺失commercial走错404
3681. [苏州市房地产监测V3-rest] 已保存申请单缺planId致查看按钮灰显
3682. [苏州市房地产监测V3-rest] mixin缺参未拦致子组件误调getDetail
3683. [苏州市房地产监测V3-rest] 租赁机构表单padding叠加协议margin致底部留白
3684. [苏州市房地产监测V3-rest] 机构变更提交接口被配置覆盖须固定专用API
3685. [苏州市房地产监测V3-rest] 从业人员变更提交未传id误用备案主键
3686. [苏州市房地产监测V3-rest] 用户管理证件号码必填且校验身份证格式
3687. [苏州市房地产监测V3-rest] 电子签状态移出基本信息区按钮依赖signState
3688. [苏州市房地产监测V3-rest] 经纪分支备案fzjgba变更fzjgbg不取菜单
3689. [苏州市房地产监测V3-rest] el-input宽100%致日期选择器撑满整行
3690. [苏州市房地产监测V3-rest] 预售转现售详情取数未补总幢数户数则回显失败
3691. [苏州市房地产监测V3-rest] 企业入网要件编辑态未排序则与查看态不一致
3692. [苏州市房地产监测V3-rest] 账务对账页UI须对齐业务对账字典与样式
3693. [苏州市房地产监测V3-rest] 要件带fileTemplate时标题栏显示下载模板
3694. [门户] 门户首页卡片丝带标题被裁半：card-header 的 overflow:hidden 与白底 card-body 叠层
3695. [门户] Vite 开发环境（hash 路由）用 window.open 打开 public 下 PDF 会落到 index.html
3696. [门户] 门户 publicPortal 详情弹窗统一 PortalDetailHeader/Footer 与标签列宽
3697. [门户] 门户操作指引页视觉回归：独立 Playwright 配置 + 设计图 fixtures + 区域掩膜
3698. [门户] 公共门户二级页骨架屏：PortalSkeleton 多版式 + PortalDialogHost 最短展示与竞态丢弃
3699. [门户] 直刷 ?portal= 二级路由时跳过首页骨架，只展示该页二级骨架
3700. [门户] 二级页骨架屏只盖住将来走接口的区域，静态搜索区与表头不骨架
3701. [门户] banner 骨架被 .portal-skeleton-bar 盖掉 absolute 导致加载后高度差约 22px 弹跳
3702. [门户] 对外首页顶部卡片「操作指引」箭头在 UnifiedLogin，勿改 OperationGuideBody
3703. [门户] 登录后 B 端门户首页三皮肤：resolveHomeLayoutVariant 与 mock e2e 注入态
3704. [门户] Playwright 全局 **/api/** 路由会误拦 Vite 的 /src/api/*.js 模块请求
3705. [门户] Element 表格固定列会使 .el-table__row 行数在 e2e 中翻倍
3706. [门户] 门户非管理端禁止调 operableProjectList 且不展示侧边栏
3707. [门户] 门户首页底栏待办与公告左右底对齐：stretch 行高 + flex:1 卡片
3708. [门户] public-portal 像素回归：npm run test:e2e:public-portal 与 95%/85% 双门槛
3709. [门户] 门户视觉比对：设计稿头部 1px 裁切伪影用夹具 masks 屏蔽
3710. [门户] 新设计稿 PNG 张数与 PORTAL_DESIGNS 不一致时的对接
3711. [门户] UnifiedLogin 操作指引卡片：分类名与「操作指引」分两行纵向
3712. [门户] 门户侧栏 hidden 菜单仍显示 + 首页刷新只剩箭头：menuVisibility 过滤链与 TagsView/permission 侧栏写入时序
3713. [门户] 门户 v2 网关前缀 /api/v2.0 三处对齐：env、nginx 反代、portalApiRewrite 与 sign/上传页
3714. [门户] 门户 zhi2-web-admin 做骨架屏/动效前：样式入口、主题变量与 anim.scss 未全局注入
3715. [门户] 苏周到扫码登录：三接口均为 POST，login 只在授权回调页调用
3716. [门户] 首页存量房业务流程步骤以 homeLayout 本地 DEFAULT_BUSINESS_FLOWS 为权威
3717. [门户] UnifiedLogin platform-banner-desc 设计稿左对齐：避免固定宽度百分比拉伸
3718. [门户] 从苏州 V3 同步公共组件后，门户 e2e 登录步骤仍可能指向旧 login.vue
3719. [门户] [门户] 登录引导卡白色环绕光带：conic-gradient + 双层 mask 只保留 1px 环
3720. [门户] [门户] @property 动画中的自定义角度在 getComputedStyle 里常一直显示初始值
3721. [门户] [门户] 公开门户二级页详情字段对齐：四列网格 + display:contents + subgrid
3722. [门户] [门户] 公开门户二级页表单标签与值左对齐：portal.scss 与页面 scoped 分工
3723. [门户] [门户] 公开门户二级页缺省人像与二维码：集中工具 + 各页/弹窗统一接入
3724. [门户] [门户] 环绕边框动效需加 prefers-reduced-motion 降级
3725. [门户] [门户] 公网弹窗共用 portal:inventory 导致商品房/存量房标题与入口串台
3726. [门户] [门户] 商品房弹窗表头蓝色、存量房绿色，修一侧须全量排查另一侧主题
3727. [门户] [门户] 新首页隐藏 Sidebar/TagsView：页面设 hideLayoutChrome，Layout 用 isSuperAdmin 豁免超管
3728. [门户] [门户] Nginx 反代 /api/v3.0 时 proxy_pass 与调试头须保留 /v3.0 路径段
3729. [门户] [门户] Playwright 整页截图在 body 滚动时视口外空白不等于页面缺内容
3730. [门户] [门户] 操作指引多列白卡布局 gap:0 会视觉上连成一整块
3731. [门户] 门户首页业务流菜单以接口权限为准，商品房与存量房/租赁可并存
3732. [门户] resolveHomeLayoutVariant：bizSectionCodes 只管 B 端企业首页，不参与皮肤
3733. [门户] splitBusinessFlowsForLayout 统一首页侧栏业务流横排规则
3734. [门户] 对外门户即时成交标题日期用 resolvePortalTradeStatDate 动态取当天
3735. [门户] UnifiedLogin「更多」弹窗：wrapper 非 flex 时 margin:auto 会把对话框顶到页顶
3736. [门户] publicPortal 表格链接加粗：font:inherit 会冲掉 font-weight
3737. [门户] 对外门户 PortalBreadcrumb：仅层级页展示且用 .public-portal 压全局 gap
3738. [门户] 门户公示详情弹窗：双列网格内固定宽标签导致数值竖排
3739. [门户] 门户租赁机构强调色 #dc5c00
3740. [门户] 门户首页叠层弹窗统一灰底标题栏 PortalDetailHeader
3741. [门户] 门户首页查询条按钮布局只改 publicPortal 页内网格
3742. [门户] 顶栏模式侧栏残留幽灵父级：menuVisibility 规范化
3743. [门户] 固定列操作列表头左侧竖线：element-ui 末列 th 规则误伤
3744. [门户] 侧栏空目录与顶栏菜单为空因路由及函数错
3745. [门户] v2前缀未对齐/api/v2.0与nginx代理
3746. [门户] 门户生产首页：index-wrapper 默认挂载 index-new
3747. [门户] zs-table-column：测宽 <280px 固定 width，否则 min-width 作弹性列
3748. [门户] 首页存量房菜单暂未开放：菜单项 notOpen + 三处入口统一拦截
3749. [门户] 门户住房租赁人员弹窗：证件照多字段兜底与 empty.svg
3750. [门户] 门户全屏 publicPortal 二级页背景：portal_page_bg.jpg 必须与 portal.scss 同提交
3751. [门户] 门户登录后首页 index-wrapper：localStorage.cwzxt 存在时切财务首页 index-bak
3752. [门户] 门户首页业务板块主题色：homeLayout.js 配置项同步 HomeBizSection 标签与卡片底色
3753. [门户] 门户登录后首页四列业务菜单入场：列间 animation-delay 间隔 0.1s
3754. [门户] 门户对外 UnifiedLogin：商品房/存量房/租赁操作指引三卡仅在此页，主标题为 SVG 图
3755. [门户] 门户用户角色权限：GetInfo 经 getPortalUserInfo 汇总 roleKey，前端无角色枚举表
3756. [门户] UnifiedLogin 公示区 Tab 须 lint
3757. [门户] banner-desc 居左对齐须去固定宽
3758. [门户] V3 同步门户后 e2e 登录需更新
3759. [门户] [门户] 对内首页业务中心已改为 businessCenters 接口全量驱动（废弃 merge 覆盖本地文案）
3760. [门户] [门户] 苏周到扫码登录三接口迁至 /portal/login/external/suzhouDao（网关仍走 v3.0 portal base）
3761. [门户] [门户] 开发服可选 Bun、安装仍统一 npm（bun 可读 npm 的 node_modules）
3762. [门户] [门户] 公网门户 mock 展示日期统一 2026 年仅改演示字段，不动证件/法规范本年份
3763. [门户] 门户首页业务板块标签色集中在 homeLayout.js，并支持 functionName 兜底主题
3764. [门户] 门户 index-new：showTopNav 必须与 shouldHideLayoutChrome 共用同一条件
3765. [门户] homeDataMixin 调试 return 会永久短路门户首页 layoutVariant
3766. [门户] 门户 listRouters 多段 path:/ 时，父 Layout hidden 须阻断 buildNavbarChildrenMenus 扁平化
3767. [门户] Navbar topMenus 展平根路径菜单须取第一个可见子项
3768. [门户] 门户管理侧栏按 G/B 端与超管判定，非仅超级管理员可见
3769. [门户] 门户对外首页 UnifiedLogin 与登录后首页 index-wrapper 路由分工
3770. [门户] 门户仓库为 suzhufang 父仓 + zhi2-web-admin 子模块，横幅无 Swiper
3771. [门户] 登录后首页用 businessFlows 统一侧栏与 admin 布局，移除 BROKER_SECTION_CODES
3772. [门户] UnifiedLogin 与 homeNew 切图统一英文文件名并经 unifiedLoginAsset 引用
3773. [门户] platform-banner 文案区拆分 SVG 时同步桌面/移动端入场 animation-delay
3774. [门户] [门户] 苏周到扫码弹窗：240px 二维码不能用 zs-size="mini"，改 width="320px"
3775. [门户] [门户] index-new 装饰箭头：禁用固定 px 字符 ›，用 dw() 描边箭头对齐 1024 设计稿
3776. [门户] [门户] 业务中心流程条：图标中心等距（--flow-step-col），文案列宽随字数不等分
3777. [门户] [门户] 双行 flow-steps 绿色/灰色外框同宽：flow-grid 列宽取 max-content，行内 stretch
3778. [门户] 首页 authorizedSectionCodes 由本地板块码表+权限计算
3779. [门户] mergeBusinessFlows 固定顺序驱动 Sidebar/Admin 双行布局
3780. [门户] 首页 layoutVariant 皮肤不再按板块权限推断 broker
3781. [门户] layoutVariant 变更拉统计须等 permsLoaded
3782. [门户] PortalDetailHeader 样式挂在 .public-portal 全局 SCSS
3783. [门户] 门户详情弹窗正文内边距统一规则与例外
3784. [门户] zhi2-web-admin 门户无仓库级 TypeScript 校验
3785. [门户] 经纪分支机构详情页不展示交易记录
3786. [门户] 首页统计卡今日橙本月蓝
3787. [门户] [门户] el-table 横向滚动条仅在轨道附近悬停才显示：hover 选择器要挂在整张表而非 body-wrapper 的滚动条
3788. [门户] [门户] 公共门户叠层详情弹窗标题居中：在 portal.scss 统一 portal-detail-header，勿按单页 is-permit 补丁
3789. [门户] [门户] 苏周到扫码登录全在 zhi2-web-admin：/security/ctAuth/suzhouDao/* + noMessage/skipAuthDialog
3790. [门户] [门户] UnifiedLogin 预售公告列表：接口返回前勿用空列表渲染「暂无」；解析与注销过滤要对齐同页惯例
3791. [门户] [门户] 首页平台横幅文案入场偏晚：缩短 animation-delay 并用 IO threshold/rootMargin 或视口内立即挂 intro 类
3792. [门户] [门户] UnifiedLogin 顶部搜索框彩色旋转光带边框在该页维护，不在 index-new 横幅
3793. [门户] [门户] publicPortal 商品房表格「房屋用途」列：加宽并表头/单元格 nowrap 防换行
3794. [门户] [门户] GetInfo 返回 terminalType null 时用 inferTerminalType 推断 B 端，再按板块权限选 developer 首页
3795. [门户] [门户] 门户 API 大版本切换须父仓 env + nginx 与子模块 vite 代理三处同改再 npm run test
3796. [门户] [门户] PortalBreadcrumb 行内对齐：整体左排，文字与 › 分隔符同一水平中线
3797. [门户] 门户首页公示公告两行版式：标题行与标签/日期行分离，勿用 flex-wrap
3798. [门户] 门户首页 fetchAnnouncements：稳定 key、分类字段映射、失败清空与可访问列表项
3799. [门户] 门户首页业务步骤默认图标：homeNewSliceIcon + BIZ_ICON_BY_CODE，接口 functionIcon 优先
3800. [门户] 经纪机构账号首页误判：企业 roleKey 优先于接口 terminalType，jjjg/zljg 强制 broker 布局
3801. [门户] Vue Router 3 菜单相对 path：toRouterAbsolutePath 统一前导斜杠，激活态须同规则
3802. [门户] 业务中心 flow-step 标签挤入下一格：min-width max(min-content) + flex-shrink:0
3803. [门户] [门户] 侧栏收展不触发 window.resize 时 zs-table 须监听容器并完整重算布局
3804. [门户] [门户] 开发环境放开账号密码登录 Tab 的标准写法
3805. [门户] [门户] 首页 index-new 去 card-body 顶距须同步左右栏 flex 对齐策略
3806. [门户] [门户] 统一登录页装饰文案拆双 SVG 的无障碍与动效约定
3807. [门户] [门户] 公开门户页批量对齐设计稿的 E2E 与分支约定
3808. [门户] 门户 G 端 admin 首页中间业务板块为空：缺 portal:bizSection 权限
3809. [门户] 苏州道扫码登录：关弹窗后须阻断轮询与在飞 scanLogin 回调
3810. [门户] 门户 publicPortal 头部配色：portalSegment + resolvePortalAccent
3811. [门户] 门户租赁/信用详情弹窗：min-width 按场景分级，字段行禁止换行撑宽
3812. [门户] 门户二级页 banner 使用超大内嵌位图 SVG 会拖慢首屏
3813. [门户] 门户首页 top-row 与 bottom-row 列宽模型不一致导致上下栏不对齐
3814. [门户] 门户首页 width:max-content 流程区依赖 layout 横向滚动，max-width:100% 挡不住 intrinsic 最小宽
3815. [门户] 门户 Vite 静态图约定：public 下资源引用为站点根 /assets/images/homeNew
3816. [门户] 门户 publicPortal 全页背景 JPG 必须与 SCSS 同 PR 提交
3817. [门户] 门户房屋详情弹窗用 formatDateOnly 展示纯日期
3818. [门户] 门户经纪人页微信二维码 src 须经 isAllowedPortalImageUrl 白名单校验
3819. [门户] publicPortal 许可详情 mock 与列表行合并时缺字段会静默沿用 mock
3820. [门户] 预售许可弹窗「住宅」面积勿绑定预售总建筑面积
3821. [门户] 门户 E2E 单列表单对齐断言不适用于双栏 permit 区
3822. [门户] 门户双栏表单 nth-child 标签宽在断点单列化时必须重置
3823. [门户] 门户 publicPortal 标签/值列对齐需固定 flex-basis 而非仅 min-width
3824. [门户] 首页次要业务行 flex 按 functionCode 加宽勿用 nth-child(1/2)
3825. [门户] 门户 publicPortal 住房租赁合同备案查询代码落点
3826. [门户] 许可双栏半栏长文案桌面 nowrap 易溢出
3827. [门户] [门户] index-new 去掉 card-body 上 padding 仍无效：子区块更具体选择器与 !important 覆盖
3828. [门户] [门户] 业务中心 flow-grid：空 steps 时 label 单独占格导致两列布局错行
3829. [门户] [门户] flow-step 等宽列 + 绝对定位箭头：display:none 与层叠遮挡
3830. [门户] [门户] publicPortal 租赁详情证件照失败态：同 record.id 换 URL 不重置
3831. [门户] [门户] UnifiedLogin 菜单静态 PDF：window.open 分支与 public 文件部署
3832. [门户] [门户] publicPortal resolvePortalAccent 统一商品房蓝 #3f669c
3833. [门户] 经纪端首页业务流程须按 permittedCodes 过滤板块
3834. [门户] HomeTodoTable 斑马纹 !important 会盖住 el-table 悬停高亮
3835. [门户] 操作列去竖线样式勿全局写死除非产品确认全站统一
3836. [门户] 门户二级页背景走 portal.scss 的 --portal-page-bg 资源路径
3837. [门户] homeLayout mergeFlowSteps 合并接口时保留本地 defaultStep.label
3838. [门户] 首页待办条数可独立于公示公告常量
3839. [门户] publicPortal 复制筛选页须全链路改 placeholder 与校验文案
3840. [门户] 统一登录公示公告行悬停需背景色与表头同色系
3841. [门户] 门户 login.vue：开发环境始终显示账号密码登录，生产环境依赖 IP 白名单
3842. [门户] 操作指引三条业务线 Banner 统一走 public 下 banner.svg + operationGuideBanners.js
3843. [门户] 首页 UnifiedLogin 操作指引入口的 tab 查询参数决定默认高亮 Tab
3844. [门户] 首页 fetchStats：layoutVariant 切换竞态 + 200 空 stats 与 catch 回落 MOCK 语义不同
3845. [门户] HomeDeveloperStatsRow：统计图标 URL 仅直通 http(s) 与根路径，其余走 img()
3846. [门户] publicPortal 首页弹窗：两列基本信息标签定宽 162px、值左对齐
3847. [门户] PortalTable 分页序号与 CSV 导出序号分工
3848. [门户] 住房租赁合同备案查询页默认展示 rentalContractFixture 结果
3849. [门户] publicPortal 可售房屋 mock 须与详情/项目字段同源生成
3850. [门户] PropertyDetailDialog 的 house 计算属性合并与面积拆分约定
3851. [门户] 操作指引 operationGuideContent 外链走 links + 既有 onAction
3852. [门户] UnifiedLogin 竖向 el-carousel 公告条叠字需裁切容器
3853. [门户] 管理员首页 index-new 区块标题高度用 --section-tab-height 联动丝带
3854. [门户] UnifiedLogin 四列菜单子项前缀圆点是 ::before 伪元素
3855. [门户] HomeStatCard 今日蓝/本月绿应绑子元素类名
3856. [门户] publicPortal 详情弹窗字段标签统一左对齐
3857. [门户] 状态操作列均分且fixed致表头错位内容偏左
3858. [门户] 常量路由占/user父路由致动态路由注册失败
3859. [门户] 从业人员弹窗无照片显示缺省图 empty.svg
3860. [门户] 表格列宽由组件测算页面禁止写固定宽度
3861. [门户] 欢迎卡底图编码且固定比例侧栏配置固化
3862. [门户] 门户二级页弹窗字段标签无全角冒号
3863. [门户] 容器左右内边距致标题缩进故移除
3864. [门户] 公示公告标题列高亮链接复用详情路由
3865. [门户] 首页超管口径需含三板块全授权判定
3866. [门户] 隐藏顶部菜单缺 flex 占位致操作区左移
3867. [门户] 待办表格覆写 zs-table 底部间距去留白
3868. [门户] Vue2 编译器禁 v-for 模板写 key 需包层
3869. [门户] 查询入口显示不全因 menuList 文案过短
3870. [门户] 公示公告区 nth-child 偶数行斑马纹
3871. [门户] 全局PC最小宽度致苏周到移动端布局失效
3872. [门户] 表单标签左对齐实现与E2E文档断言不一致
3873. [门户] 遮罩镂空边框实现搜索框光带环绕
3874. [门户] 用途盒未全宽致与表单网格列不对齐
3875. [门户] e2e截图与结果应纳入gitignore
3876. [门户] 经纪页照片URL须校验且布局去残留
3877. [门户] registerUrl未配置时禁止跳转仅提示
3878. [门户] 首页业务中心菜单完全以接口配置为准渲染
3879. [门户] 依赖安装固定 npm 仅运行分岔用 bun
3880. [门户] 首页展示用 mock 日期时间统一为 2026 年
3881. [门户] 侧栏未溯父Layout hidden致子项误显
3882. [门户] 首页布局统一由businessFlows驱动
3883. [门户] 苏周到扫码弹窗改width320px消留白
3884. [门户] store-detail 隐藏交易记录且不扩路由兜底
3885. [门户] 开发企业首页旧组件致步骤无箭头角标
3886. [门户] 表格滚动条显示须整表悬停而非仅表体悬停
3887. [门户] 门户弹窗标题居中由portal.scss全局样式实现
3888. [门户] 预售列表初始空且无loading致空态误报
3889. [门户] 横幅入视口20%后触发动画仅播一次
3890. [门户] 经纪角色未优先于板块权限致首页误判
3891. [门户] 步骤条窄屏错位且全量扫描无针对性
3892. [门户] 未跟踪portalTheme.js致CI构建失败
3893. [门户] 门户弹窗正文内边距由portal.scss统一
3894. [门户] 弹窗宽自适应内容字段左对齐标签定宽
3895. [门户] Broker 标签对齐与定宽规范未统一
3896. [门户] broker-detail从业编号标签同列表对齐
3897. [门户] 搜索框旋转描边纯CSS调整可合并
3898. [门户] .card-body上padding被具体选择器覆盖
3899. [门户] 路由守卫冗余区域列表接口调用返回500
3900. [门户] 基本信息弹窗字段标签定宽162px值左对齐
3901. [门户] 骨架屏隐藏时动画提前播放致无效果
