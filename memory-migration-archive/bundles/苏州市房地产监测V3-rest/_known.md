# 已知记忆清单（294 条）

以下技术经验**已经提炼过**，不要再重复产出。
只有当本批会话给出了**不同根因、不同解法或明显更深的细节**时才产出新条目。

1. [泰兴] 小程序弹窗内 ZsUploader 不显示的根因：上传组件自身状态未随父组件清空
2. [泰兴] 员工端主题色约定：自定义组件读不到页面 CSS 变量，ZsButton primary 需内联 #1677ff
3. [泰兴] echarts 实例必须 markRaw，避免进入 Vue 响应式
4. [泰兴] 分类树带环对象写入响应式数据会导致 setData 崩溃并静默吞掉后续请求参数（知识库筛选不生效）
5. [泰兴] DsDialog 内嵌套 uni-popup 的 fixed 定位错乱 → 统一 ZsBottomPopup（root-portal 脱离层叠上下文）
6. [泰兴] ZsImage.buildStaticUrl 不判断 http(s) 前缀，把远程兜底图拼成 static/https://… 必然加载失败
7. [泰兴] 项目构建/验证约定：构建命令需关闭安全删除并用 PowerShell 后台落盘日志
8. [泰兴] 小程序端弹窗/控件颜色：硬编码色值 vs CSS 变量导致同一页面出现两种主色
9. [泰兴] uni-app 编译小程序会注入 addGlobalClass，App.vue 全局样式穿透进组件且组件 :deep 压不过
10. [泰兴] 底部弹窗不贴底/底部空隙：安全区 env() 的归属约定（外层零 padding，只有不透明内容盒承担安全区）
11. [泰兴] 用截图像素采样 + git 历史反推截图对应的代码版本，判定 bug 是否已修过
12. [泰兴] 小程序图标不要用 CSS mask-image，改用 ThemeIcon 组件 + SVG 字符串替换色值
13. [泰兴] 项目约定：泰兴小程序从「物业手持B端」同步改动的方式与适配清单
14. [泰兴] 小程序端写在自定义组件标签上的 class/style/CSS 变量不会透传到组件内部真实节点
15. [泰兴] 小程序组件颜色定制套路：用 props 下发颜色，组件内部在真实节点上绑内联 style
16. [泰兴] app.mixin(virtualHost) 在小程序端不生效，virtualHost 只能写在组件自身 options
17. [泰兴] WXSS 不支持 min()/max()/clamp()，整条声明被静默丢弃而不报错
18. [泰兴] 员工端与业主端同名业务接口不可互推，需对齐业主端实现
19. [泰兴] 弹层/弹窗内的页脚不要复用外层固定栏样式
20. [泰兴] 微信 <image> 的 mode 属性优先于 CSS object-fit，ZsImage 内写死 mode 会导致 hero 背景无法铺满
21. [泰兴] hero 背景图铺满套路：盒子宽高比 = 图片宽高比 + aspectFill + overflow 右对齐裁切
22. [泰兴] 项目约定：构建 mp-weixin 用 CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build:mp-weixin，并核对 dist 产物验证
23. [泰兴] 小程序弹层真机渲染必须用 root-portal 包裹（否则底层透出/内容缺失）
24. [泰兴] 真机 flex + scroll-view 高度计算偏差：用 flex:1 1 auto; min-height:0 + overflow:hidden 兜底
25. [泰兴] uni-popup 对插槽懒渲染：上传组件必须靠 v-if 强制重挂 + nextTick 后回填
26. [泰兴] 沙箱内对项目仓库执行 git rm 曾导致 src/ 637 个文件从工作区消失 —— git 写操作与构建改用非沙箱执行
27. [泰兴] 小程序 placeholder 样式对齐：原生 input 的 placeholder-class 与 uni-easyinput 内部类不通，须统一控件类型
28. [泰兴] 页面跳转统一传 projectNo（不用 projectId），接口字段用多候选映射兜底
29. [泰兴] 小程序点击事件统一用 <view @tap>，不要用 <text @click>
30. [泰兴] 表单图片上传校验要克制：不要拦截「有图但未取到持久化地址」
31. [泰兴] 手机号一律微信授权获取，禁止手动输入；且必须有格式校验兜底脏数据
32. [泰兴] 新建分包的页面开发约定：设计稿还原 + z-paging 分页 + store 内直接调接口
33. [泰兴] 图表文字改用原生叠加层渲染，避免 ECharts graphic 在小程序端不显示
34. [泰兴] ZsUploader 上传组件：临时路径不可写入 v-model，watchEffect 不可过度清空
35. [泰兴] echarts-uniapp 图表在小程序端要改用 type="2d" 同层渲染并串行化 init
36. [泰兴] 小程序日期格式化禁用 new Date('YYYY-M-D') 字符串解析
37. [泰兴] SVG 图标跟随主题色的统一做法：currentColor + mask + 白色叠加层
38. [泰兴] uni-app 小程序弹层层级（z-index）必须写在 App.vue 全局样式里
39. [泰兴] uni build 前需绕过 safe-delete 批量删除阈值，否则构建失败
40. [泰兴] 员工端主题色统一：用 staff-page-theme mixin 注入 CSS 变量，禁止硬编码蓝色
41. [泰兴] 微信小程序 ECharts 图表穿屏与图例缺色的修复套路
42. [泰兴] 小程序页面背景色必须写在非 scoped 样式块的 page 选择器
43. [泰兴] ZsPicker 传参必须用 :dataList，不能用 :data-list
44. [泰兴] 后端树形节点 ID 字段不固定，取值需多字段兜底
45. [泰兴] 列表/统计场景：接口返回的 0 必须视为有效值，仅在字段缺失时兜底
46. [泰兴] 详情页跳转优先用 store 传参，不重复调接口
47. [泰兴] 自定义 tabBar 模式下 uni.switchTab 会静默失败，跳转 tab 页改用 uni.reLaunch
48. [泰兴] 共享组件在 src/components 与 src/staff/components 各有一份副本，改动必须两边同步
49. [泰兴] 验证流程约定：微信开发者工具点「编译」不生效，必须重新构建并核对 dist 产物
50. [泰兴] 泰兴小程序技术栈与分包目录约定
51. [泰兴] 弹窗表单/上传/滚动的通用布局约定
52. [泰兴] staff 带背景 tab 页顶部留白统一规则
53. [泰兴] 小程序 echarts canvas 图表排查路径（先查产物与运行时，再怀疑代码）
54. [泰兴] Vue3 setup 中 ref 被同名局部变量遮蔽导致接口静默失败
55. [泰兴] 提交后同时弹窗 + navigateBack 会让弹窗来不及显示
56. [泰兴] 项目存在 components 与 staff/components 两套同名组件，应按端引用对应版本
57. [泰兴] 微信小程序按钮自定义颜色需配合 CSS 变量、!important 与清除 ::after 伪边框
58. [泰兴] 小程序浮层内的确认按钮不要用原生 <button>
59. [泰兴] 请求拦截器会静默丢弃非约定字段，构造请求参数前需归一化
60. [泰兴] 弹层内状态草稿：下钻回根节点时不要清空已选
61. [泰兴] 自定义弹层需补齐 flex 纵向布局并让出页面固定底栏
62. [泰兴] 设计稿中的装饰图片优先复用 tag.scss 伪元素实现
63. [泰兴] 表单页约定：单页全字段布局 + PageButton 固定提交 + ZsPicker hideArrow
64. [泰兴] 收款明细须展示账户抵扣行（账单-优惠-应付）
65. [泰兴] 小程序分包内不能靠 import 引 SVG 资源，本地图标必须放主包 src/static 并用 ZsImage
66. [泰兴] SCSS 中 :deep() 必须平铺书写，嵌套进父选择器会生成 chrome53 不支持的 CSS nesting 警告
67. [泰兴] 主题色改造走 staff 主题变量注入，不要在页面里直接写 background 覆盖组件
68. [泰兴] 本项目构建命令要用 npm.cmd，且必须设 NODE_OPTIONS 内存上限与 CODEBUDDY_SAFE_DELETE_ENABLED=0
69. [泰兴] 主包体积要以 dist/build 产物为准统计，dev 产物含未分包页面会导致误判超限
70. [泰兴] 主包超限的标准解法：把 ECharts 组件迁入 staff 分包并配置 componentPlaceholder 异步化
71. [泰兴] 小程序分包之间不能跨包引用静态资源，图片/图标会加载失败显示空白
72. [泰兴] 状态字段用字典映射，不用硬编码中文（如所处阶段 MF_CURRENT_STATE）
73. [泰兴] 接口字段有对应值就不要在前端用列表长度二次计算，且 0 也要正常显示
74. [泰兴] 详情页字段要按业务顺序与新增页对齐，空字段显示 -
75. [泰兴] 空数据回退取数要选对接口：步骤为空不能回退调记录列表接口
76. [泰兴] 自定义 tabbar 页面顶部留白存在两套体系，新增页需显式选择
77. [泰兴] 维保/巡检记录接口约定：recordType=1 为维保，搜索走 appKeyWord
78. [泰兴] UnoCSS 类名不能含小数点，否则 WXSS 编译报 unexpected \
79. [泰兴] 小程序页面底色/分区靠 page 级背景色 + pages.json 的 backgroundColor 双管齐下
80. [泰兴] 巡检记录新增采用两步流程：选程序后步骤内联展示，底部按钮不变
81. [泰兴] UI 页面必须严格 100% 还原设计稿：用户反复验收并要求按设计稿重建
82. [泰兴] 字典字段（如频次）统一用 getDict + getDictLabel 转中文，需带兜底
83. [泰兴] 业主身份认证相关接口的项目字段名是 complexId，不是 project
84. [泰兴] 多步表单用独立编辑页 + setStorageSync 传参 + $emit 回传结果
85. [泰兴] project.config.json 的 AppID 必须与 manifest.json 保持一致
86. [泰兴] 小程序弹窗内滚动区一律用 scroll-view，不用 div + overflow-y:auto
87. [泰兴] ZsImage 内部样式会覆盖页面同名规则，需 !important 或复核组件默认尺寸
88. [泰兴] ZsPicker 统一用 :dataList（驼峰）传选项，并兼容 0 值与数字/字符串类型
89. [泰兴] 附件材料统一走 listAppendixPackage 接口，busCode 区分业务、busId 取业务主键字段
90. [泰兴] 是/否类字段统一用 sys_yes_no 字典，非 0 值用 #f30a0a 标红
91. [泰兴] 列表页+详情页的标准复用套路：先找同目录最相近页面复刻，用 TMP_* 缓存列表项传给详情
92. [泰兴] 坑：接口字段命名不确定时要写多候选回退映射，联调需核对 keyWord/日期字段
93. [泰兴] UI 架构约定：详情页统一用 CardCell 组件族（CardCell / CellInline / CellFulline）+ PhoneCall 金色电话，双列区靠 cell-inline 与竖线分隔
94. [泰兴] 坑：ZsPopup 只管弹窗容器与传入内容布局，弹窗内容缺纵向 flex 会导致重叠、数字竖排、底部按钮错位
95. [泰兴] 小程序内图标不要走 ZsImage 的 /static/ 前缀，直接 import SVG 用 image 渲染
96. [泰兴] switchTab 路径必须与 pages.json tabBar 注册完全一致（员工端 tab 页带 /pages/staff/ 前缀）
97. [泰兴] 统计类页面初始时间区间默认取当月
98. [泰兴] ZsPicker 的 change 回调里别依赖 v-model 已同步，直接用事件参数 value
99. [泰兴] 页面空白且无明显报错 → 先查 script setup 是否运行时崩了（漏 import ref / 变量遮蔽 TDZ）
100. [泰兴] :deep 覆盖公共/第三方组件默认样式时权重会打平，必须上 !important 并注释原因
101. [泰兴] 后端相对资源路径（/zhi2/...）需按平台拼域名，ZsImage 要防止重复拼接
102. [泰兴] 子组件里不能用页面生命周期 onLoad，改用 onMounted；同路由跳转用 redirectTo 而非 navigateTo
103. [泰兴] 数值输入不要裸用 Number()：统一走正则解析函数，非法值拦截保存，展示侧对脏数据显示 -
104. [泰兴] 微信小程序分包之间不能互相引用组件，公共组件必须放主包 components 目录
105. [泰兴] 列表页分页统一使用 z-paging，不再使用 useLoadMore + uni-load-more
106. [泰兴] 普通链接二维码扫码参数在 options.q 中，需 decodeURIComponent + urlToObj 解析后再取值
107. [泰兴] 列表/「查看全部」页结构约定：导航栏下方 sticky 搜索框 + 面包屑
108. [泰兴] 小程序 input 切换 type text/password 会清空输入，密码显隐应固定 type="text" + :password
109. [泰兴] 附件能力复用套路：busCode + 业务 id 调 getFiles，页面用 downloadFile + openDocument 打开
110. [泰兴] 用户要求：cherry-pick 到旧分支时只取参数改动，必须人工恢复必填校验
111. [泰兴] 接口对接套路：store 内做后端字段→页面字段映射，并保留旧参数兼容
112. [泰兴] 维修资金金额字段按概算/决算后缀区分，用 scope 参数选字段
113. [泰兴] 字典字段统一走 dictLabel 转换，字典编码用常量提取
114. [泰兴] 列表页统一用 z-paging + store 列表字段双向绑定，mock 接口写在 store
115. [泰兴] 标签样式复用 tag-parallelogram 约定：伪元素画倾斜底、文字不倾斜
116. [泰兴] 扫码进小程序：必须从 options.q 解析完整 URL，并兼容 id/decisionId 多种参数名
117. [泰兴] 条件编译导入的常量在其他端会 ReferenceError，须用 typeof 兜底
118. [泰兴] 后端字段名/参数名变更在 api 层做适配，页面调用代码不动
119. [泰兴] 文档配图偏好：优先 draw.io 可导入 XML，且指定一页竖版 A4
120. [泰兴] 维修项目模块采用「接口层内聚到模块 JS」的约定
121. [泰兴] 维修资金相关字段区分概算/预算/决算三套口径（G/Y/J 后缀）
122. [泰兴] 小程序打开后端附件：IMAGE_BASE 拼前缀 + downloadFile→openDocument
123. [泰兴] 后端字段定型后应删除前端兼容映射，只保留单一字段
124. [苏房] agentmemory 向量回填配置不生效：hydrateProcessEnvFromFile 只填「未设置」的变量，而 wrapper 先于它运行
125. [苏房] 详情页字段全显示 `-`：路由缺 tableid 使 formMode 落成 add，detailMixins 只在 view 模式才 init，详情 GET 根本没发
126. [苏房] 不同主体的基本信息页不要共用同一组件：开发企业与经纪机构的差异字段（办公信息 vs 企业管理员）会反复互相踩
127. [苏房] 楼幢×楼层×单元网格：整表用**一个** CSS Grid 承载（列数取全表最大户数、楼层列固定宽），不要每个单元各自成格
128. [苏房] Web 后台详情的附件区：查看态必须切到只读要件组件，不能复用 AnnexUpload
129. [苏房] 要件区卡在「加载要件配置中」的根因是 busCode 没从路由解析出来
130. [苏房] 「左表单 + 右要件」两栏页：右栏被要件列表撑破的高度约束套路
131. [苏房] 楼盘表格子状态图标：默认只取 short 图例 2 个图标位，扩展状态走环境变量
132. [苏房] 登录后进不去待办页：先查动态路由是否注册，本地静态注册兜底 + defaultLanding 定落地页
133. [苏房] 要件附件按名称从企业/项目来源自动带出：prefillSources + 严格同名 + 别名表的完整设计
134. [苏房] 注册入网与基本信息页的附件配置编码必须统一，否则审批后附件「传了看不到」
135. [苏房] Playwright 跑注册入网全链路的联调约定：跳过发短信、审批接口要匹配两条路径、录制录屏
136. [苏房] BusCode 集中常量 + resolver 取值，禁止页面写字面量（机构注册/入网链路）
137. [苏房] 给历史数据常为空/「无」的下拉字段新增必填校验：进入表单时归一化，而不是提交时放宽
138. [苏房] 接口回填会绕过表单 maxlength：长度上限必须同时喂给输入组件、校验规则和回填函数
139. [苏房] e2e 有既有红用例时：git stash 到 HEAD 复跑逐条比对，别顺手去改旧用例
140. [苏房] 共享校验规则工厂用 options 扩出「非必填」，别复制一份规则；非必填后仍要保留跨字段校验
141. [苏房] 弹窗宽度收敛为两档并内聚进 zs-dialog：form-layout="single|double" 约定
142. [苏房] Element Plus 双列规则命不中的两类结构：span24 全声明 与 裸 el-col
143. [苏房] 详情页 Tab 内的全局样式污染 Headline：collapse-content 的 padding-top:0 让要件区贴边
144. [苏房] 详情页跳其他业务页必须走公共跳转封装，直接改跳转会导致无侧栏、菜单不高亮、不调接口
145. [苏房] 后端雪花 ID 精度丢失：19 位变更单 ID 传到前端变成 …390000
146. [苏房] zs-table 列宽算法：取表头与内容的最大宽度，剩余空间均分给非序号列
147. [苏房] 宽表被误判为「幽灵滚动」而 overflow-x:hidden，导致右侧列被裁切且不能横滚
148. [苏房] 「挪区块」需求按最小改动执行：只动点名的面板，要件区抽公共组件复用
149. [苏房] PC 后台响应式断点：同权重 @media 必须写在基础规则之后，否则宽度被压窄、高度不变，出现畸形比例
150. [苏房] Tab 子表工具栏统一：SubTableToolbar 通过 inject('zsTabsToolbar') 注册到标题栏，弹窗内自动 fallback
151. [苏房] 详情页返回按钮用「截断路径回列表页」而非 go(-1)；「没有授权相关菜单」报错根因在 utils/ruoyi.js 菜单查找层
152. [苏房] 苏州房地产监测 V3 工程结构事实：源码在 zhi2-web-admin 子目录（npm workspace），技术栈是 Vue2 + 自研 zs-* 组件而非 Element Plus
153. [苏房] 详情页间距不要双来源：父容器 flex/grid gap 与共享组件自带 margin 叠加会翻倍
154. [苏房] 从 vue-cli 老仓库（建湖G）迁模块到 Vite V3：遗留组件/指令必须换成 V3 公共件并 build 验证
155. [苏房] 踩坑：用正则批量给 Vue 文件补字段会误伤 props/watch 里的同名 key，造成 `visible: {,` 与缺逗号，构建直接失败
156. [苏房] Element Plus el-tooltip 的提示内容挂在 body 下，样式必须写在非 scoped 块，scoped 一定不生效
157. [苏房] 一对多单据的 batchSave 返回 boolean 无主键 → 保存后必须回来源列表，不能跳详情；分组靠 projectLimitId 外键
158. [苏房] 用户硬性约束：新模块必须复用公共组件/mixins 与既有字典，自绘楼盘表或自写选房弹窗会被直接打回
159. [苏房] 本后台的 e2e 套路：真实接口流 + fixtures 登录助手 + 断言图片 naturalWidth，而不是 mock
160. [苏房] 删除全局项目上下文（store state/getter）必须全量排查引用，否则降级为静默 undefined
161. [苏房] 弹窗表格列宽撑满失效：scale 动画中 getBoundingClientRect 量到变换后尺寸，且 ResizeObserver 不感知 transform
162. [苏房] ResizeObserver 在 el-table :key 整表重建 + Vue2 先建后销顺序下会孤立，列注册表需 owner 令牌
163. [苏房] 选择类弹窗统一 zs-select-dialog：先圈定旧 SelectDialog 消费方，再脚本批量迁移
164. [苏房] Vue2 模块 export { ... } 再导出漏 import：路由页进不去，报错只提符号未定义
165. [苏房] 详情页 detailMixins 提交链路与两个必改钩子：/save 后缀 + getDetailParams 返回裸 id
166. [苏房] 前端模块批量重命名的边界：前端标识可改，后端契约串一字不能动
167. [苏房] 详情页子表工具栏统一放 Headline 的 #right 插槽（PC 端 UI 架构约定 + 批量改造脚本套路）
168. [苏房] 列表翻到末页表格下方大片留白：必须在 zs-table 组件层收敛，逐页改样式无效
169. [苏房] 验证方式偏好的演进：默认只做静态检查，但布局类需求被反复打回后用户要求自己跑 e2e（含账号冻结坑）
170. [苏房] 详情页表单「padding 重叠/左右留白过大/标签居中/页面卡死」的根因与共享样式层治理（label-top + align-items:center + 折叠区 padding 叠加）
171. [苏房] Web 后台审批流 E2E 稳定写法：要件宫格上传 + 用 refresh + 接口断言「在途审核」
172. [苏房] Element Plus 表单行「输入框+右侧按钮」禁用 append 插槽（宽度溢出），统一 input-with-actions 结构
173. [苏房] 用户偏好：新增合同版本文档页要「参考旧页但全部新写」，不复用旧组件
174. [苏房] 全站菜单遍历审计：字段空值 / 字典未转译 / 日期时间类型不符的批量扫描口径
175. [苏房] Web 后台新增页草稿跨路由丢失：用独立 sessionStorage 草稿 key 让列表回显未保存行
176. [苏房] E2E 依赖真实后端的用例用 test.skip 标注联调原因，不判失败（并同步补必填校验）
177. [苏房] 周报整理：多 AI 工具会话 + 禅道 MCP 汇总，子模块只写实际改动不写指针更新
178. [苏房] Vue 渲染期「Property or method "xxx" is not defined」的根因：选项放错位置（该 computed 的写成了方法/该 methods 的写错位置）+ 模板调用方式与实际定义不一致
179. [苏房] 从业人员菜单按业务阶段拆成「申请 / 备案」两条路由，用路由 meta.filePath 从全量路由反查 busCode，并据此控制主管端增删权限
180. [苏房] 列表点「新增/详情」整页刷新：详情页 chunk 加载失败 + importWithChunkRetry 主动 reload 的组合根因
181. [苏房] 列表→详情跳转要按 meta.filePath 反查路由，不能拼 this.$route.path + '/add'
182. [苏房] 裸用的 debounce() 在 Vite ESM 下会 ReferenceError：用 define 映射到 window.debounce 一次覆盖全项目
183. [苏房] CRUD 接口统一规范：详情一律 POST .../detail 且主键放 body，不走 REST 路径参数
184. [苏房] AnnexUpload 的 requirementGrid 宫格模式是多点联动的开关，只传一个 prop 会残留「选择」按钮和批量操作条
185. [苏房] 主子表合并保存接口不能按「子表是否为空」回退到单表新增接口
186. [苏房] 附件要单独成块时，能力下沉到通用上传组件 + 全局样式类，不写页面专用包装组件
187. [苏房] 真实接口 E2E：在途单占用行的排除要在 fixture 里做（查业务列表求交集），无可用数据时 skip 而不是硬跑
188. [苏房] 合同计价方式弹窗的 houseId 是「page 列表行 → detail 详情」两段式，页面行对象未就绪即读 row.houseId 会报 undefined
189. [苏房] 弹窗不要复用路由详情页 detail.vue：formMode 串味导致新增变查看 → 拆独立 Panel + 轻量 mixin
190. [苏房] 变更类页面双 ID URL 约定：路径末段 = 变更单 ID，query?id = 备案 ID；changeActive 不能只看「有两个 ID」
191. [苏房] 业务状态统一走全局 biz_state，但只替换「本地静态数组」，BIZ_STATE 常量保持原样
192. [苏房] UI 还原度验收套路：写临时 Playwright 脚本按多分辨率自截图再逐条比对设计稿
193. [苏房] 新增机构类型（租赁机构）：路由做完但登录页弹窗没加入口 = 界面「没有入口」
194. [苏房] 把内嵌操作按钮上移到容器插槽：Headline #right + hideViewToggle 反向兼容
195. [苏房] v-dialogDrag 指令给 .el-dialog 写 inset:0，把弹窗撑满整屏（高度怎么改 CSS 都不生效的根因）
196. [苏房] 全站级 UI 约定要落成可执行的 lint 门禁脚本，而不是逐文件手工搜索
197. [苏房] 字典码与接口枚举「数值相同、含义不同」时必须建显式映射层，不能拿接口值直接查字典
198. [苏房] 迁移代码的表格操作列必须换成项目公共 zs-operate-column：权限码、主键、删除回调三处最易错
199. [苏房] 函数式弹窗（xxx-func.vue / Xxx.open）必须与组件版共用同一套 DOM 与样式，否则「还是和其他弹窗不一样」
200. [苏房] 注册/匿名环节上传附件不要传 busId，由后端在保存后转挂；对应 E2E 校验基准要改成提交的 attachmentList
201. [苏房] E2E 用例禁止用 API 调用 / page.evaluate 直接改 Vue 实例绕过 UI，必须走纯 UI 流程
202. [苏房] V3 接口规范：详情接口统一改 POST /module/resource/detail，主键放 body
203. [苏房] Element el-dialog 弹窗过窄的全局解法：禁止写死 width，inheritAttrs:false + 剥离 width + CSS 变量统一宽度
204. [苏房] Tab 统一用公共组件 zs-tabs，但登录页必须保留原 el-tabs（用户明确偏好）
205. [苏房] 附件包按业务开关动态组合并去重；新增场景不传 busId，改走 attachmentList 随表单提交
206. [苏房] 纯展示改版不要新增接口；卡片/网格只读展示的空值不显示占位符「-」
207. [苏房] Web 后台卡死/内存增长的排查路径：ECharts 实例未 dispose 是主因，且不要信文件级正则计数
208. [苏房] 被全局 mixin 与数百文件共用的工具函数（getId）加缓存前，必须先做等价性用例并评估行为变化
209. [苏房] Web 后台详情页顶栏与边距规范：detail-container → operation-btn-group → detail-from-container
210. [苏房] Web 后台单位规范：单位一律写在值侧，label 只写字段名（amount-input unit / DetailTemplate type:'amount'）
211. [苏房] 函数式选择弹窗 zs-select-dialog「点确定没反应」的根因：resolve/reject 竞态，需 settled 锁只结算一次
212. [苏房] 银行网点（联行号）查询接口全局收敛到 /system/unionBank/page 的迁移套路
213. [苏房] 全局 ElCol 断点补丁会让 :span="24" 失效（整行字段被半宽规则覆盖）
214. [苏房] Element Plus 后台 E2E：按钮不在预期容器、弹窗选项点不动、等待策略的定位套路
215. [苏房] 详情页业务状态头部区统一用 HeadTitle 组件（含全局排查容易漏的公共详情组件）
216. [苏房] 脱敏开关走 Desensitize-Flag 请求头：列表默认 '1'、详情默认 '0'
217. [苏房] 「变更」改「编辑」类改造：UI 可先落地，保存被后端状态机拦住时用 test.skip 记录而非改断言
218. [苏房] Web 后台「栅格列数不生效」根因：Headline 组件的 .el-row flex 覆盖 + 详情态判定
219. [苏房] 全局 ElCol 的 lg/xl 默认 8 会把「一行两列」渲染成三列，验证必须做 UI 布局断言
220. [苏房] 注册页等新模块拉附件配置统一用 listAppendixPackage（busId 可省略），不要再用 appendixConfig/page + detail 两段式接口
221. [苏房] 配置化搜索表单（zs-search-form）新增 type 必须补渲染分支，否则静默退化成占满宽度的空输入框
222. [苏房] 企信通 qxtEntInfo 企业信息提取：双注册模块共享映射 + noMessage/noReject + businessTermEnd 为 null/undefined 即「长期」
223. [苏房] Web 后台选择弹窗收敛为函数式 open helper（SelectDialog.open / mountSelectDialogComponent），替代模板内嵌弹窗组件
224. [苏房] 企业详情「资质信息 / 要件信息」为空的三类根因：附件缺 companyId、详情嵌套归一化缺失、资质列表无数据需回退变更接口
225. [苏房] 附件面板「业务编码为空」的两个根因：详情子路由 meta.busCode 缺失 + detail 监听在编码就绪前抢跑
226. [苏房] 后端下发菜单 path 丢斜杠拼成 `xxx:/tableid`，新增页报「页面未授权或不存在」
227. [苏房] Web 管理后台：附件与审批流程共用路由 meta.busCode，禁止前端硬编码两套业务常量
228. [苏房] 详情页顶部状态统一用单块 HeadTitle 的 headTitleList 扩展，不要再加一条自定义状态栏
229. [苏房] 后端 Long 型 id 在 JSON 数字里会精度丢失：前端关联 id 一律按字符串传
230. [苏房] E2E 录屏验收附件类断言：先滚动到附件区并显式停顿，否则视频里看不到证据
231. [苏房] Web 端要件附件上传组件封装：listAppendixPackage + picture-card + loadSeq 并发防护
232. [苏房] 附件扩展名不能用后端 fileType（字典码）推断，否则 PDF 被当图片走 el-image 预览而报错
233. [苏房] 行政区划展示统一到区级：改 formatter 而非逐页改，保留三级路径 formatter 并兼容历史拼接串
234. [苏房] 营业期限结束日期可为 null（长期）时不要用 daterange：拆成开始/结束两个独立日期选择器 + 共享组件
235. [苏房] 路由/菜单占位符 tabUuid 被当成业务主键发到接口 → 统一 isUsableCompanyRecordId 过滤并在 api 层二次校验
236. [苏房] Element Plus 全局表单项满宽规则：只给块级控件 100%，span 组合字段用 flex+wrap
237. [苏房] 用户偏好：公共组件改造要「全局处理」，禁止别名注册，直接替换成现有公共组件
238. [苏房] E2E 用例报「路由里找不到页面」多半是测试账号菜单未授权，不是回归失败
239. [苏房] Playwright getByText 模糊命中多元素触发 strict mode 报错：用容器 scope + 精确类名定位
240. [苏房] Web 后台详情页头部与子表操作列约定：HeadTitle + 按钮进 zs-tabs 插槽，操作列按状态定宽
241. [苏房] Web 详情页只读附件/资质区块：listAppendixPackage 参数必须与上传组件对齐，且要 watch 业务 id 异步回填后重拉
242. [苏房] 后台详情页「基本信息」与 zs-tabs 之间出现巨大空白：.detail-from-container 的 flex:1 撑满剩余高度
243. [苏房] 要件面板同时合并多个 busCode 会导致业务编码错乱 + 接口被重复调用（切换开关时调用次数翻倍）
244. [苏房] Web 后台「按钮不显示」先查数据状态条件，不要先怀疑权限
245. [苏房] el-form 套进三列 grid 的 section-form 内，会把表单压成 1/3 宽
246. [苏房] 嵌套 el-form 让 el-form-item 注册到内层，validate() 静默失效且必填从不生效
247. [苏房] V3 删除接口的请求体是裸 ID 数组，不要包成 { xxxIds: [] }
248. [苏房] 动态菜单 path 少一个斜杠被规整成同路径，vue-router 先注册者抢占导致详情页打开错误组件
249. [苏房] Web 后台详情页要件统一走 AppendixPackageSection + requirement-grid，表底总条数统一用 zs-pagination 关闭分页器
250. [苏房] zs-table 窄屏列宽仍被省略：内容最宽 + 表体横向滚动替代 ellipsis（裁剪检测不能依赖 scrollWidth）
251. [苏房] 机密白名单路径（/file/appendix/）下的 $get 会发真实 GET：后端只支持 POST 时返回 405
252. [苏房] 跳转页 projectId 多来源互相覆盖：路由 query / sessionStorage / 详情接口三选一必须「路由优先」+ nextTick 再同步
253. [苏房] 附件 busCode 不能靠路由 meta/菜单 filePath 推断：按机构类型常量表映射，并删掉会把变更编码强行纠正回备案编码的 normalize
254. [苏房] 同一入网接口按主体拆分 API 封装：经纪/租赁机构 save 必须剥离 qualificationList
255. [苏房] Web 后台详情页「表单变单列」的根因在公共 detail-template，必须全局修而非逐页改
256. [苏房] Web 后台子表统一为「弹窗式增删改查」，独立接口的子表不要塞进主表单保存
257. [苏房] 只读详情页的区块要与申请页对齐：复用 build*ContentInfo 构造器，并配 dev 路由 + E2E 地址清空
258. [苏房] zs-table 的 table-tr 是「固定行数」契约，列表页乱传会导致显示不全/右侧留白；树表必须在异步 resolve 后 doLayout
259. [苏房] el-tree 懒加载树做关键字搜索：filter-node-method 只能过滤已加载节点，需 treeRefreshKey 重挂让根节点按 keyWord 重拉
260. [苏房] zs-select-dialog 两类语义要分清：选数据必须「单选列 + 取消/确定 + @setData」，只查看的房屋清单才关掉勾选与确定
261. [苏房] 接口传参改造的边界：只改 utils 里请求体形态、不动接口路径；批量校验类接口传 ID 数组而非逗号串
262. [苏房] 企业信息「变更」留在当前菜单页内编辑：白名单 + query formMode + 壳页面 Provider，菜单必须挂壳页面路径
263. [苏房] 同一业务的「注册页」与「后台管理页」必须共用一份字段配置 js，否则两边字段漂移
264. [苏房] 保存请求体分层：品牌/附件是主表字段，不要塞进 projectExtend；各证件子表字段名不统一不能按规律推断
265. [苏房] 多步注册改造成「一步注册」：以开发企业单页实现为模板复用
266. [苏房] Web 后台菜单 filePath 必须与 views 目录一一对应，不要多加中间层级
267. [苏房] el-table 接口有数据但表格空白：row-key 为空值或重复导致 tbody 不渲染
268. [苏房] 字典异步加载后重渲染崩溃：Cannot read properties of undefined (reading 'length')
269. [苏房] Web 管理后台详情页布局三件套：zs-tabs(line) + 带边框 zs-search-form + list-card 包表格
270. [苏房] zs-table 的 loading 只遮表体、表头常显（含旧 v-loading 写法的兼容层）
271. [苏房] Web 后台列表/子表工具栏统一 div.operation-button-container，禁用 el-row.action-container + el-col
272. [苏房] 审核详情页的业务列表优先取详情接口内嵌数组，分页接口只作兜底
273. [苏房] 注册流程 Stepper 图标是脚本生成的位图资产：改样式必须改生成脚本重跑并同步视觉快照
274. [苏房] Web 后台表单 label-position 必须由 zs-form 统一读取 platformConfig.formLayout，页面禁止硬编码
275. [苏房] B 端备案/变更单能否编辑只看 bizState，不要掺 approvalState / displayStatus
276. [苏房] 子表「新增/删除」按钮不出现：旧只读组件 + Vite 热更新仍加载旧模块，改名强制重载
277. [苏房] 房屋限制主子表一体保存对接：单 DTO 提交 + 子表行回填父表冗余字段 + mixin/常量/e2e 三件套
278. [苏房] Web 详情页信息块分区约定：统一走 presale-detail-section-stack，禁止双层卡片与局部 margin 补偿
279. [苏房] 企业端详情页业务主键不能用 getId() 从路由解析：按 query→params→store→本企业接口逐级兜底
280. [苏房] 只读详情模板不显示必填星号：改公共 DetailTemplate 一处生效，但要清理业务侧冗余配置且不动 el-form rules
281. [苏房] el-tabs 多版本页签用业务字段拼 key 会撞车导致同时激活，name 必须用行下标
282. [苏房] Web 选证/查证弹窗统一改函数式 zs-select-dialog-func + *Constants.js 配置工厂，删掉页面私有 Dialog 组件
283. [苏房] 页面私有审批流弹窗应迁到公共审批流：OperationBtnGroup + ZsSubmit + zs-approval，业务靠 busCode 区分
284. [苏房] Web 业务详情页顶栏统一用 HeadTitle 组件（申请编号/业务状态 tag/创建时间），并删掉 DetailTemplate 内重复字段
285. [苏房] Vuex 模块未开启 namespaced 时 mapState('user', [...]) 静默返回 undefined，条件接口不请求
286. [苏房] Web 后台要件上传在「新增态」不显示：根因是 busId 为空，需新增态专用组件只传 busCode
287. [苏房] 后台路由 component 字符串与 views 目录精确匹配：目录名不一致即页面加载失败，跳转用的 getRouterPathByFilePath 必须同步
288. [苏房] 后台提交接口的业务编码(busCode)必须取路由 meta，并把它与表单逻辑一并收进 constants + mixin 复用
289. [苏房] 把「选填→必填」改造收敛成规则工厂 + strict 开关，并保证保存 payload 始终带数组字段
290. [苏房] Vue2 中直接调用 this.$options.data() 未绑定实例，导致 mixin/data 里 this.xxx 全是 undefined
291. [苏房] 同一内核页被多机构/多上下文复用：busCode 按「菜单 meta 优先 + 机构类型回退」查表解析
292. [苏房] 审批按钮权限与提交 key 必须从 flowable 动态取，不能拿后端展示用的 currentNode 硬编码
293. [苏房] 新增独立业务模块的交付物清单：供运维录入的菜单路由 JSON + 双端只读差异 + 权限串
294. [苏房] 股东/成员类明细表的一致性校验：保存前全量拉取再算比例与法人唯一
