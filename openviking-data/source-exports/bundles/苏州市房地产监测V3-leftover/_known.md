# 已知记忆清单（830 条）

以下技术经验已提炼过，不要重复产出。
只有不同根因/解法/更深细节时才产出新条目。

1. [泰兴] echarts 定制裁剪包缺 series.line 导致折线图静默空白
2. [泰兴] 小程序弹窗内 ZsUploader 不显示的根因：上传组件自身状态未随父组件清空
3. [泰兴] 员工端主题色约定：自定义组件读不到页面 CSS 变量，ZsButton primary 需内联 #1677ff
4. [泰兴] echarts 实例必须 markRaw，避免进入 Vue 响应式
5. [泰兴] 分类树带环对象写入响应式数据会导致 setData 崩溃并静默吞掉后续请求参数（知识库筛选不生效）
6. [泰兴] DsDialog 内嵌套 uni-popup 的 fixed 定位错乱 → 统一 ZsBottomPopup（root-portal 脱离层叠上下文）
7. [泰兴] ZsImage.buildStaticUrl 不判断 http(s) 前缀，把远程兜底图拼成 static/https://… 必然加载失败
8. [泰兴] 项目构建/验证约定：构建命令需关闭安全删除并用 PowerShell 后台落盘日志
9. [泰兴] 小程序端弹窗/控件颜色：硬编码色值 vs CSS 变量导致同一页面出现两种主色
10. [泰兴] uni-app 编译小程序会注入 addGlobalClass，App.vue 全局样式穿透进组件且组件 :deep 压不过
11. [泰兴] 底部弹窗不贴底/底部空隙：安全区 env() 的归属约定（外层零 padding，只有不透明内容盒承担安全区）
12. [泰兴] 用截图像素采样 + git 历史反推截图对应的代码版本，判定 bug 是否已修过
13. [泰兴] 小程序图标不要用 CSS mask-image，改用 ThemeIcon 组件 + SVG 字符串替换色值
14. [泰兴] 项目约定：泰兴小程序从「物业手持B端」同步改动的方式与适配清单
15. [泰兴] 小程序端写在自定义组件标签上的 class/style/CSS 变量不会透传到组件内部真实节点
16. [泰兴] 小程序组件颜色定制套路：用 props 下发颜色，组件内部在真实节点上绑内联 style
17. [泰兴] app.mixin(virtualHost) 在小程序端不生效，virtualHost 只能写在组件自身 options
18. [泰兴] WXSS 不支持 min()/max()/clamp()，整条声明被静默丢弃而不报错
19. [泰兴] 员工端与业主端同名业务接口不可互推，需对齐业主端实现
20. [泰兴] 弹层/弹窗内的页脚不要复用外层固定栏样式
21. [泰兴] 微信 <image> 的 mode 属性优先于 CSS object-fit，ZsImage 内写死 mode 会导致 hero 背景无法铺满
22. [泰兴] hero 背景图铺满套路：盒子宽高比 = 图片宽高比 + aspectFill + overflow 右对齐裁切
23. [泰兴] 项目约定：构建 mp-weixin 用 CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build:mp-weixin，并核对 dist 产物验证
24. [泰兴] 小程序弹层真机渲染必须用 root-portal 包裹（否则底层透出/内容缺失）
25. [泰兴] 真机 flex + scroll-view 高度计算偏差：用 flex:1 1 auto; min-height:0 + overflow:hidden 兜底
26. [泰兴] uni-popup 对插槽懒渲染：上传组件必须靠 v-if 强制重挂 + nextTick 后回填
27. [泰兴] 沙箱内对项目仓库执行 git rm 曾导致 src/ 637 个文件从工作区消失 —— git 写操作与构建改用非沙箱执行
28. [泰兴] 小程序 placeholder 样式对齐：原生 input 的 placeholder-class 与 uni-easyinput 内部类不通，须统一控件类型
29. [泰兴] 页面跳转统一传 projectNo（不用 projectId），接口字段用多候选映射兜底
30. [泰兴] 小程序点击事件统一用 <view @tap>，不要用 <text @click>
31. [泰兴] 表单图片上传校验要克制：不要拦截「有图但未取到持久化地址」
32. [泰兴] 手机号一律微信授权获取，禁止手动输入；且必须有格式校验兜底脏数据
33. [泰兴] 新建分包的页面开发约定：设计稿还原 + z-paging 分页 + store 内直接调接口
34. [泰兴] 图表文字改用原生叠加层渲染，避免 ECharts graphic 在小程序端不显示
35. [泰兴] ZsUploader 上传组件：临时路径不可写入 v-model，watchEffect 不可过度清空
36. [泰兴] echarts-uniapp 图表在小程序端要改用 type="2d" 同层渲染并串行化 init
37. [泰兴] 小程序日期格式化禁用 new Date('YYYY-M-D') 字符串解析
38. [泰兴] SVG 图标跟随主题色的统一做法：currentColor + mask + 白色叠加层
39. [泰兴] uni-app 小程序弹层层级（z-index）必须写在 App.vue 全局样式里
40. [泰兴] uni build 前需绕过 safe-delete 批量删除阈值，否则构建失败
41. [泰兴] 员工端主题色统一：用 staff-page-theme mixin 注入 CSS 变量，禁止硬编码蓝色
42. [泰兴] 微信小程序 ECharts 图表穿屏与图例缺色的修复套路
43. [泰兴] 小程序页面背景色必须写在非 scoped 样式块的 page 选择器
44. [泰兴] ZsPicker 传参必须用 :dataList，不能用 :data-list
45. [泰兴] 后端树形节点 ID 字段不固定，取值需多字段兜底
46. [泰兴] 列表/统计场景：接口返回的 0 必须视为有效值，仅在字段缺失时兜底
47. [泰兴] 详情页跳转优先用 store 传参，不重复调接口
48. [泰兴] 自定义 tabBar 模式下 uni.switchTab 会静默失败，跳转 tab 页改用 uni.reLaunch
49. [泰兴] 共享组件在 src/components 与 src/staff/components 各有一份副本，改动必须两边同步
50. [泰兴] 验证流程约定：微信开发者工具点「编译」不生效，必须重新构建并核对 dist 产物
51. [泰兴] 泰兴小程序技术栈与分包目录约定
52. [泰兴] 弹窗表单/上传/滚动的通用布局约定
53. [泰兴] staff 带背景 tab 页顶部留白统一规则
54. [泰兴] 小程序 echarts canvas 图表排查路径（先查产物与运行时，再怀疑代码）
55. [泰兴] Vue3 setup 中 ref 被同名局部变量遮蔽导致接口静默失败
56. [泰兴] 提交后同时弹窗 + navigateBack 会让弹窗来不及显示
57. [泰兴] 项目存在 components 与 staff/components 两套同名组件，应按端引用对应版本
58. [泰兴] 微信小程序按钮自定义颜色需配合 CSS 变量、!important 与清除 ::after 伪边框
59. [泰兴] 小程序浮层内的确认按钮不要用原生 <button>
60. [泰兴] 请求拦截器会静默丢弃非约定字段，构造请求参数前需归一化
61. [泰兴] 弹层内状态草稿：下钻回根节点时不要清空已选
62. [泰兴] 自定义弹层需补齐 flex 纵向布局并让出页面固定底栏
63. [泰兴] 设计稿中的装饰图片优先复用 tag.scss 伪元素实现
64. [泰兴] 表单页约定：单页全字段布局 + PageButton 固定提交 + ZsPicker hideArrow
65. [泰兴] 收款明细须展示账户抵扣行（账单-优惠-应付）
66. [泰兴] 小程序分包内不能靠 import 引 SVG 资源，本地图标必须放主包 src/static 并用 ZsImage
67. [泰兴] SCSS 中 :deep() 必须平铺书写，嵌套进父选择器会生成 chrome53 不支持的 CSS nesting 警告
68. [泰兴] 主题色改造走 staff 主题变量注入，不要在页面里直接写 background 覆盖组件
69. [泰兴] 本项目构建命令要用 npm.cmd，且必须设 NODE_OPTIONS 内存上限与 CODEBUDDY_SAFE_DELETE_ENABLED=0
70. [泰兴] 主包体积要以 dist/build 产物为准统计，dev 产物含未分包页面会导致误判超限
71. [泰兴] 主包超限的标准解法：把 ECharts 组件迁入 staff 分包并配置 componentPlaceholder 异步化
72. [泰兴] 小程序分包之间不能跨包引用静态资源，图片/图标会加载失败显示空白
73. [泰兴] 状态字段用字典映射，不用硬编码中文（如所处阶段 MF_CURRENT_STATE）
74. [泰兴] 接口字段有对应值就不要在前端用列表长度二次计算，且 0 也要正常显示
75. [泰兴] 详情页字段要按业务顺序与新增页对齐，空字段显示 -
76. [泰兴] 空数据回退取数要选对接口：步骤为空不能回退调记录列表接口
77. [泰兴] 自定义 tabbar 页面顶部留白存在两套体系，新增页需显式选择
78. [泰兴] 维保/巡检记录接口约定：recordType=1 为维保，搜索走 appKeyWord
79. [泰兴] UnoCSS 类名不能含小数点，否则 WXSS 编译报 unexpected \
80. [泰兴] 小程序页面底色/分区靠 page 级背景色 + pages.json 的 backgroundColor 双管齐下
81. [泰兴] 巡检记录新增采用两步流程：选程序后步骤内联展示，底部按钮不变
82. [泰兴] UI 页面必须严格 100% 还原设计稿：用户反复验收并要求按设计稿重建
83. [泰兴] 字典字段（如频次）统一用 getDict + getDictLabel 转中文，需带兜底
84. [泰兴] 业主身份认证相关接口的项目字段名是 complexId，不是 project
85. [泰兴] 多步表单用独立编辑页 + setStorageSync 传参 + $emit 回传结果
86. [泰兴] project.config.json 的 AppID 必须与 manifest.json 保持一致
87. [泰兴] 小程序弹窗内滚动区一律用 scroll-view，不用 div + overflow-y:auto
88. [泰兴] ZsImage 内部样式会覆盖页面同名规则，需 !important 或复核组件默认尺寸
89. [泰兴] ZsPicker 统一用 :dataList（驼峰）传选项，并兼容 0 值与数字/字符串类型
90. [泰兴] 附件材料统一走 listAppendixPackage 接口，busCode 区分业务、busId 取业务主键字段
91. [泰兴] 是/否类字段统一用 sys_yes_no 字典，非 0 值用 #f30a0a 标红
92. [泰兴] 列表页+详情页的标准复用套路：先找同目录最相近页面复刻，用 TMP_* 缓存列表项传给详情
93. [泰兴] 坑：接口字段命名不确定时要写多候选回退映射，联调需核对 keyWord/日期字段
94. [泰兴] UI 架构约定：详情页统一用 CardCell 组件族（CardCell / CellInline / CellFulline）+ PhoneCall 金色电话，双列区靠 cell-inline 与竖线分隔
95. [泰兴] 坑：ZsPopup 只管弹窗容器与传入内容布局，弹窗内容缺纵向 flex 会导致重叠、数字竖排、底部按钮错位
96. [泰兴] 小程序内图标不要走 ZsImage 的 /static/ 前缀，直接 import SVG 用 image 渲染
97. [泰兴] switchTab 路径必须与 pages.json tabBar 注册完全一致（员工端 tab 页带 /pages/staff/ 前缀）
98. [泰兴] 统计类页面初始时间区间默认取当月
99. [泰兴] ZsPicker 的 change 回调里别依赖 v-model 已同步，直接用事件参数 value
100. [泰兴] 页面空白且无明显报错 → 先查 script setup 是否运行时崩了（漏 import ref / 变量遮蔽 TDZ）
101. [泰兴] :deep 覆盖公共/第三方组件默认样式时权重会打平，必须上 !important 并注释原因
102. [泰兴] 后端相对资源路径（/zhi2/...）需按平台拼域名，ZsImage 要防止重复拼接
103. [泰兴] 子组件里不能用页面生命周期 onLoad，改用 onMounted；同路由跳转用 redirectTo 而非 navigateTo
104. [泰兴] 数值输入不要裸用 Number()：统一走正则解析函数，非法值拦截保存，展示侧对脏数据显示 -
105. [泰兴] 微信小程序分包之间不能互相引用组件，公共组件必须放主包 components 目录
106. [泰兴] 列表页分页统一使用 z-paging，不再使用 useLoadMore + uni-load-more
107. [泰兴] 普通链接二维码扫码参数在 options.q 中，需 decodeURIComponent + urlToObj 解析后再取值
108. [泰兴] 列表/「查看全部」页结构约定：导航栏下方 sticky 搜索框 + 面包屑
109. [泰兴] 小程序 input 切换 type text/password 会清空输入，密码显隐应固定 type="text" + :password
110. [泰兴] 附件能力复用套路：busCode + 业务 id 调 getFiles，页面用 downloadFile + openDocument 打开
111. [泰兴] 用户要求：cherry-pick 到旧分支时只取参数改动，必须人工恢复必填校验
112. [泰兴] 接口对接套路：store 内做后端字段→页面字段映射，并保留旧参数兼容
113. [泰兴] 维修资金金额字段按概算/决算后缀区分，用 scope 参数选字段
114. [泰兴] 字典字段统一走 dictLabel 转换，字典编码用常量提取
115. [泰兴] 列表页统一用 z-paging + store 列表字段双向绑定，mock 接口写在 store
116. [泰兴] 标签样式复用 tag-parallelogram 约定：伪元素画倾斜底、文字不倾斜
117. [泰兴] 扫码进小程序：必须从 options.q 解析完整 URL，并兼容 id/decisionId 多种参数名
118. [泰兴] 条件编译导入的常量在其他端会 ReferenceError，须用 typeof 兜底
119. [泰兴] 后端字段名/参数名变更在 api 层做适配，页面调用代码不动
120. [泰兴] 文档配图偏好：优先 draw.io 可导入 XML，且指定一页竖版 A4
121. [泰兴] 维修项目模块采用「接口层内聚到模块 JS」的约定
122. [泰兴] 维修资金相关字段区分概算/预算/决算三套口径（G/Y/J 后缀）
123. [泰兴] 小程序打开后端附件：IMAGE_BASE 拼前缀 + downloadFile→openDocument
124. [泰兴] 后端字段定型后应删除前端兼容映射，只保留单一字段
125. [泰兴] agentmemory 向量回填配置不生效：hydrateProcessEnvFromFile 只填「未设置」的变量，而 wrapper 先于它运行
126. [泰兴] 详情页字段全显示 `-`：路由缺 tableid 使 formMode 落成 add，detailMixins 只在 view 模式才 init，详情 GET 根本没发
127. [泰兴] 不同主体的基本信息页不要共用同一组件：开发企业与经纪机构的差异字段（办公信息 vs 企业管理员）会反复互相踩
128. [泰兴] 楼幢×楼层×单元网格：整表用**一个** CSS Grid 承载（列数取全表最大户数、楼层列固定宽），不要每个单元各自成格
129. [泰兴] Web 后台详情的附件区：查看态必须切到只读要件组件，不能复用 AnnexUpload
130. [泰兴] 要件区卡在「加载要件配置中」的根因是 busCode 没从路由解析出来
131. [泰兴] 「左表单 + 右要件」两栏页：右栏被要件列表撑破的高度约束套路
132. [泰兴] 楼盘表格子状态图标：默认只取 short 图例 2 个图标位，扩展状态走环境变量
133. [泰兴] 登录后进不去待办页：先查动态路由是否注册，本地静态注册兜底 + defaultLanding 定落地页
134. [泰兴] 要件附件按名称从企业/项目来源自动带出：prefillSources + 严格同名 + 别名表的完整设计
135. [泰兴] 注册入网与基本信息页的附件配置编码必须统一，否则审批后附件「传了看不到」
136. [泰兴] Playwright 跑注册入网全链路的联调约定：跳过发短信、审批接口要匹配两条路径、录制录屏
137. [泰兴] BusCode 集中常量 + resolver 取值，禁止页面写字面量（机构注册/入网链路）
138. [泰兴] 给历史数据常为空/「无」的下拉字段新增必填校验：进入表单时归一化，而不是提交时放宽
139. [泰兴] 接口回填会绕过表单 maxlength：长度上限必须同时喂给输入组件、校验规则和回填函数
140. [泰兴] e2e 有既有红用例时：git stash 到 HEAD 复跑逐条比对，别顺手去改旧用例
141. [泰兴] 共享校验规则工厂用 options 扩出「非必填」，别复制一份规则；非必填后仍要保留跨字段校验
142. [泰兴] 弹窗宽度收敛为两档并内聚进 zs-dialog：form-layout="single|double" 约定
143. [泰兴] Element Plus 双列规则命不中的两类结构：span24 全声明 与 裸 el-col
144. [泰兴] 详情页 Tab 内的全局样式污染 Headline：collapse-content 的 padding-top:0 让要件区贴边
145. [泰兴] 详情页跳其他业务页必须走公共跳转封装，直接改跳转会导致无侧栏、菜单不高亮、不调接口
146. [泰兴] 后端雪花 ID 精度丢失：19 位变更单 ID 传到前端变成 …390000
147. [泰兴] zs-table 列宽算法：取表头与内容的最大宽度，剩余空间均分给非序号列
148. [泰兴] 宽表被误判为「幽灵滚动」而 overflow-x:hidden，导致右侧列被裁切且不能横滚
149. [泰兴] 「挪区块」需求按最小改动执行：只动点名的面板，要件区抽公共组件复用
150. [泰兴] PC 后台响应式断点：同权重 @media 必须写在基础规则之后，否则宽度被压窄、高度不变，出现畸形比例
151. [泰兴] Tab 子表工具栏统一：SubTableToolbar 通过 inject('zsTabsToolbar') 注册到标题栏，弹窗内自动 fallback
152. [泰兴] 详情页返回按钮用「截断路径回列表页」而非 go(-1)；「没有授权相关菜单」报错根因在 utils/ruoyi.js 菜单查找层
153. [泰兴] 苏州房地产监测 V3 工程结构事实：源码在 zhi2-web-admin 子目录（npm workspace），技术栈是 Vue2 + 自研 zs-* 组件而非 Element Plus
154. [泰兴] 详情页间距不要双来源：父容器 flex/grid gap 与共享组件自带 margin 叠加会翻倍
155. [泰兴] 从 vue-cli 老仓库（建湖G）迁模块到 Vite V3：遗留组件/指令必须换成 V3 公共件并 build 验证
156. [泰兴] 踩坑：用正则批量给 Vue 文件补字段会误伤 props/watch 里的同名 key，造成 `visible: {,` 与缺逗号，构建直接失败
157. [泰兴] Element Plus el-tooltip 的提示内容挂在 body 下，样式必须写在非 scoped 块，scoped 一定不生效
158. [泰兴] 一对多单据的 batchSave 返回 boolean 无主键 → 保存后必须回来源列表，不能跳详情；分组靠 projectLimitId 外键
159. [泰兴] 用户硬性约束：新模块必须复用公共组件/mixins 与既有字典，自绘楼盘表或自写选房弹窗会被直接打回
160. [泰兴] 本后台的 e2e 套路：真实接口流 + fixtures 登录助手 + 断言图片 naturalWidth，而不是 mock
161. [泰兴] 删除全局项目上下文（store state/getter）必须全量排查引用，否则降级为静默 undefined
162. [泰兴] 弹窗表格列宽撑满失效：scale 动画中 getBoundingClientRect 量到变换后尺寸，且 ResizeObserver 不感知 transform
163. [泰兴] ResizeObserver 在 el-table :key 整表重建 + Vue2 先建后销顺序下会孤立，列注册表需 owner 令牌
164. [泰兴] 选择类弹窗统一 zs-select-dialog：先圈定旧 SelectDialog 消费方，再脚本批量迁移
165. [泰兴] Vue2 模块 export { ... } 再导出漏 import：路由页进不去，报错只提符号未定义
166. [泰兴] 详情页 detailMixins 提交链路与两个必改钩子：/save 后缀 + getDetailParams 返回裸 id
167. [泰兴] 前端模块批量重命名的边界：前端标识可改，后端契约串一字不能动
168. [泰兴] 详情页子表工具栏统一放 Headline 的 #right 插槽（PC 端 UI 架构约定 + 批量改造脚本套路）
169. [泰兴] 列表翻到末页表格下方大片留白：必须在 zs-table 组件层收敛，逐页改样式无效
170. [泰兴] 验证方式偏好的演进：默认只做静态检查，但布局类需求被反复打回后用户要求自己跑 e2e（含账号冻结坑）
171. [泰兴] 详情页表单「padding 重叠/左右留白过大/标签居中/页面卡死」的根因与共享样式层治理（label-top + align-items:center + 折叠区 padding 叠加）
172. [泰兴] Web 后台审批流 E2E 稳定写法：要件宫格上传 + 用 refresh + 接口断言「在途审核」
173. [泰兴] Element Plus 表单行「输入框+右侧按钮」禁用 append 插槽（宽度溢出），统一 input-with-actions 结构
174. [泰兴] 用户偏好：新增合同版本文档页要「参考旧页但全部新写」，不复用旧组件
175. [泰兴] 全站菜单遍历审计：字段空值 / 字典未转译 / 日期时间类型不符的批量扫描口径
176. [泰兴] Web 后台新增页草稿跨路由丢失：用独立 sessionStorage 草稿 key 让列表回显未保存行
177. [泰兴] E2E 依赖真实后端的用例用 test.skip 标注联调原因，不判失败（并同步补必填校验）
178. [泰兴] 周报整理：多 AI 工具会话 + 禅道 MCP 汇总，子模块只写实际改动不写指针更新
179. [泰兴] Vue 渲染期「Property or method "xxx" is not defined」的根因：选项放错位置（该 computed 的写成了方法/该 methods 的写错位置）+ 模板调用方式与实际定义不一致
180. [泰兴] 从业人员菜单按业务阶段拆成「申请 / 备案」两条路由，用路由 meta.filePath 从全量路由反查 busCode，并据此控制主管端增删权限
181. [泰兴] 列表点「新增/详情」整页刷新：详情页 chunk 加载失败 + importWithChunkRetry 主动 reload 的组合根因
182. [泰兴] 列表→详情跳转要按 meta.filePath 反查路由，不能拼 this.$route.path + '/add'
183. [泰兴] 裸用的 debounce() 在 Vite ESM 下会 ReferenceError：用 define 映射到 window.debounce 一次覆盖全项目
184. [泰兴] CRUD 接口统一规范：详情一律 POST .../detail 且主键放 body，不走 REST 路径参数
185. [泰兴] AnnexUpload 的 requirementGrid 宫格模式是多点联动的开关，只传一个 prop 会残留「选择」按钮和批量操作条
186. [泰兴] 主子表合并保存接口不能按「子表是否为空」回退到单表新增接口
187. [泰兴] 附件要单独成块时，能力下沉到通用上传组件 + 全局样式类，不写页面专用包装组件
188. [泰兴] 真实接口 E2E：在途单占用行的排除要在 fixture 里做（查业务列表求交集），无可用数据时 skip 而不是硬跑
189. [泰兴] 合同计价方式弹窗的 houseId 是「page 列表行 → detail 详情」两段式，页面行对象未就绪即读 row.houseId 会报 undefined
190. [泰兴] 弹窗不要复用路由详情页 detail.vue：formMode 串味导致新增变查看 → 拆独立 Panel + 轻量 mixin
191. [泰兴] 变更类页面双 ID URL 约定：路径末段 = 变更单 ID，query?id = 备案 ID；changeActive 不能只看「有两个 ID」
192. [泰兴] 业务状态统一走全局 biz_state，但只替换「本地静态数组」，BIZ_STATE 常量保持原样
193. [泰兴] UI 还原度验收套路：写临时 Playwright 脚本按多分辨率自截图再逐条比对设计稿
194. [泰兴] 新增机构类型（租赁机构）：路由做完但登录页弹窗没加入口 = 界面「没有入口」
195. [泰兴] 把内嵌操作按钮上移到容器插槽：Headline #right + hideViewToggle 反向兼容
196. [泰兴] v-dialogDrag 指令给 .el-dialog 写 inset:0，把弹窗撑满整屏（高度怎么改 CSS 都不生效的根因）
197. [泰兴] 全站级 UI 约定要落成可执行的 lint 门禁脚本，而不是逐文件手工搜索
198. [泰兴] 字典码与接口枚举「数值相同、含义不同」时必须建显式映射层，不能拿接口值直接查字典
199. [泰兴] 迁移代码的表格操作列必须换成项目公共 zs-operate-column：权限码、主键、删除回调三处最易错
200. [泰兴] 函数式弹窗（xxx-func.vue / Xxx.open）必须与组件版共用同一套 DOM 与样式，否则「还是和其他弹窗不一样」
201. [泰兴] 注册/匿名环节上传附件不要传 busId，由后端在保存后转挂；对应 E2E 校验基准要改成提交的 attachmentList
202. [泰兴] E2E 用例禁止用 API 调用 / page.evaluate 直接改 Vue 实例绕过 UI，必须走纯 UI 流程
203. [泰兴] V3 接口规范：详情接口统一改 POST /module/resource/detail，主键放 body
204. [泰兴] Element el-dialog 弹窗过窄的全局解法：禁止写死 width，inheritAttrs:false + 剥离 width + CSS 变量统一宽度
205. [泰兴] Tab 统一用公共组件 zs-tabs，但登录页必须保留原 el-tabs（用户明确偏好）
206. [泰兴] 附件包按业务开关动态组合并去重；新增场景不传 busId，改走 attachmentList 随表单提交
207. [泰兴] 纯展示改版不要新增接口；卡片/网格只读展示的空值不显示占位符「-」
208. [泰兴] Web 后台卡死/内存增长的排查路径：ECharts 实例未 dispose 是主因，且不要信文件级正则计数
209. [泰兴] 被全局 mixin 与数百文件共用的工具函数（getId）加缓存前，必须先做等价性用例并评估行为变化
210. [泰兴] Web 后台详情页顶栏与边距规范：detail-container → operation-btn-group → detail-from-container
211. [泰兴] Web 后台单位规范：单位一律写在值侧，label 只写字段名（amount-input unit / DetailTemplate type:'amount'）
212. [泰兴] 函数式选择弹窗 zs-select-dialog「点确定没反应」的根因：resolve/reject 竞态，需 settled 锁只结算一次
213. [泰兴] 银行网点（联行号）查询接口全局收敛到 /system/unionBank/page 的迁移套路
214. [泰兴] 全局 ElCol 断点补丁会让 :span="24" 失效（整行字段被半宽规则覆盖）
215. [泰兴] Element Plus 后台 E2E：按钮不在预期容器、弹窗选项点不动、等待策略的定位套路
216. [泰兴] 详情页业务状态头部区统一用 HeadTitle 组件（含全局排查容易漏的公共详情组件）
217. [泰兴] 脱敏开关走 Desensitize-Flag 请求头：列表默认 '1'、详情默认 '0'
218. [泰兴] 「变更」改「编辑」类改造：UI 可先落地，保存被后端状态机拦住时用 test.skip 记录而非改断言
219. [泰兴] Web 后台「栅格列数不生效」根因：Headline 组件的 .el-row flex 覆盖 + 详情态判定
220. [泰兴] 全局 ElCol 的 lg/xl 默认 8 会把「一行两列」渲染成三列，验证必须做 UI 布局断言
221. [泰兴] 注册页等新模块拉附件配置统一用 listAppendixPackage（busId 可省略），不要再用 appendixConfig/page + detail 两段式接口
222. [泰兴] 配置化搜索表单（zs-search-form）新增 type 必须补渲染分支，否则静默退化成占满宽度的空输入框
223. [泰兴] 企信通 qxtEntInfo 企业信息提取：双注册模块共享映射 + noMessage/noReject + businessTermEnd 为 null/undefined 即「长期」
224. [泰兴] Web 后台选择弹窗收敛为函数式 open helper（SelectDialog.open / mountSelectDialogComponent），替代模板内嵌弹窗组件
225. [泰兴] 企业详情「资质信息 / 要件信息」为空的三类根因：附件缺 companyId、详情嵌套归一化缺失、资质列表无数据需回退变更接口
226. [泰兴] 附件面板「业务编码为空」的两个根因：详情子路由 meta.busCode 缺失 + detail 监听在编码就绪前抢跑
227. [泰兴] 后端下发菜单 path 丢斜杠拼成 `xxx:/tableid`，新增页报「页面未授权或不存在」
228. [泰兴] Web 管理后台：附件与审批流程共用路由 meta.busCode，禁止前端硬编码两套业务常量
229. [泰兴] 详情页顶部状态统一用单块 HeadTitle 的 headTitleList 扩展，不要再加一条自定义状态栏
230. [泰兴] 后端 Long 型 id 在 JSON 数字里会精度丢失：前端关联 id 一律按字符串传
231. [泰兴] E2E 录屏验收附件类断言：先滚动到附件区并显式停顿，否则视频里看不到证据
232. [泰兴] Web 端要件附件上传组件封装：listAppendixPackage + picture-card + loadSeq 并发防护
233. [泰兴] 附件扩展名不能用后端 fileType（字典码）推断，否则 PDF 被当图片走 el-image 预览而报错
234. [泰兴] 行政区划展示统一到区级：改 formatter 而非逐页改，保留三级路径 formatter 并兼容历史拼接串
235. [泰兴] 营业期限结束日期可为 null（长期）时不要用 daterange：拆成开始/结束两个独立日期选择器 + 共享组件
236. [泰兴] 路由/菜单占位符 tabUuid 被当成业务主键发到接口 → 统一 isUsableCompanyRecordId 过滤并在 api 层二次校验
237. [泰兴] Element Plus 全局表单项满宽规则：只给块级控件 100%，span 组合字段用 flex+wrap
238. [泰兴] 用户偏好：公共组件改造要「全局处理」，禁止别名注册，直接替换成现有公共组件
239. [泰兴] E2E 用例报「路由里找不到页面」多半是测试账号菜单未授权，不是回归失败
240. [泰兴] Playwright getByText 模糊命中多元素触发 strict mode 报错：用容器 scope + 精确类名定位
241. [泰兴] Web 后台详情页头部与子表操作列约定：HeadTitle + 按钮进 zs-tabs 插槽，操作列按状态定宽
242. [泰兴] Web 详情页只读附件/资质区块：listAppendixPackage 参数必须与上传组件对齐，且要 watch 业务 id 异步回填后重拉
243. [泰兴] 后台详情页「基本信息」与 zs-tabs 之间出现巨大空白：.detail-from-container 的 flex:1 撑满剩余高度
244. [泰兴] 要件面板同时合并多个 busCode 会导致业务编码错乱 + 接口被重复调用（切换开关时调用次数翻倍）
245. [泰兴] Web 后台「按钮不显示」先查数据状态条件，不要先怀疑权限
246. [泰兴] el-form 套进三列 grid 的 section-form 内，会把表单压成 1/3 宽
247. [泰兴] 嵌套 el-form 让 el-form-item 注册到内层，validate() 静默失效且必填从不生效
248. [泰兴] V3 删除接口的请求体是裸 ID 数组，不要包成 { xxxIds: [] }
249. [泰兴] 动态菜单 path 少一个斜杠被规整成同路径，vue-router 先注册者抢占导致详情页打开错误组件
250. [泰兴] Web 后台详情页要件统一走 AppendixPackageSection + requirement-grid，表底总条数统一用 zs-pagination 关闭分页器
251. [泰兴] zs-table 窄屏列宽仍被省略：内容最宽 + 表体横向滚动替代 ellipsis（裁剪检测不能依赖 scrollWidth）
252. [泰兴] 机密白名单路径（/file/appendix/）下的 $get 会发真实 GET：后端只支持 POST 时返回 405
253. [泰兴] 跳转页 projectId 多来源互相覆盖：路由 query / sessionStorage / 详情接口三选一必须「路由优先」+ nextTick 再同步
254. [泰兴] 附件 busCode 不能靠路由 meta/菜单 filePath 推断：按机构类型常量表映射，并删掉会把变更编码强行纠正回备案编码的 normalize
255. [泰兴] 同一入网接口按主体拆分 API 封装：经纪/租赁机构 save 必须剥离 qualificationList
256. [泰兴] Web 后台详情页「表单变单列」的根因在公共 detail-template，必须全局修而非逐页改
257. [泰兴] Web 后台子表统一为「弹窗式增删改查」，独立接口的子表不要塞进主表单保存
258. [泰兴] 只读详情页的区块要与申请页对齐：复用 build*ContentInfo 构造器，并配 dev 路由 + E2E 地址清空
259. [泰兴] zs-table 的 table-tr 是「固定行数」契约，列表页乱传会导致显示不全/右侧留白；树表必须在异步 resolve 后 doLayout
260. [泰兴] el-tree 懒加载树做关键字搜索：filter-node-method 只能过滤已加载节点，需 treeRefreshKey 重挂让根节点按 keyWord 重拉
261. [泰兴] zs-select-dialog 两类语义要分清：选数据必须「单选列 + 取消/确定 + @setData」，只查看的房屋清单才关掉勾选与确定
262. [泰兴] 接口传参改造的边界：只改 utils 里请求体形态、不动接口路径；批量校验类接口传 ID 数组而非逗号串
263. [泰兴] 企业信息「变更」留在当前菜单页内编辑：白名单 + query formMode + 壳页面 Provider，菜单必须挂壳页面路径
264. [泰兴] 同一业务的「注册页」与「后台管理页」必须共用一份字段配置 js，否则两边字段漂移
265. [泰兴] 保存请求体分层：品牌/附件是主表字段，不要塞进 projectExtend；各证件子表字段名不统一不能按规律推断
266. [泰兴] 多步注册改造成「一步注册」：以开发企业单页实现为模板复用
267. [泰兴] Web 后台菜单 filePath 必须与 views 目录一一对应，不要多加中间层级
268. [泰兴] el-table 接口有数据但表格空白：row-key 为空值或重复导致 tbody 不渲染
269. [泰兴] 字典异步加载后重渲染崩溃：Cannot read properties of undefined (reading 'length')
270. [泰兴] Web 管理后台详情页布局三件套：zs-tabs(line) + 带边框 zs-search-form + list-card 包表格
271. [泰兴] zs-table 的 loading 只遮表体、表头常显（含旧 v-loading 写法的兼容层）
272. [泰兴] Web 后台列表/子表工具栏统一 div.operation-button-container，禁用 el-row.action-container + el-col
273. [泰兴] 审核详情页的业务列表优先取详情接口内嵌数组，分页接口只作兜底
274. [泰兴] 注册流程 Stepper 图标是脚本生成的位图资产：改样式必须改生成脚本重跑并同步视觉快照
275. [泰兴] Web 后台表单 label-position 必须由 zs-form 统一读取 platformConfig.formLayout，页面禁止硬编码
276. [泰兴] B 端备案/变更单能否编辑只看 bizState，不要掺 approvalState / displayStatus
277. [泰兴] 子表「新增/删除」按钮不出现：旧只读组件 + Vite 热更新仍加载旧模块，改名强制重载
278. [泰兴] 房屋限制主子表一体保存对接：单 DTO 提交 + 子表行回填父表冗余字段 + mixin/常量/e2e 三件套
279. [泰兴] Web 详情页信息块分区约定：统一走 presale-detail-section-stack，禁止双层卡片与局部 margin 补偿
280. [泰兴] 企业端详情页业务主键不能用 getId() 从路由解析：按 query→params→store→本企业接口逐级兜底
281. [泰兴] 只读详情模板不显示必填星号：改公共 DetailTemplate 一处生效，但要清理业务侧冗余配置且不动 el-form rules
282. [泰兴] el-tabs 多版本页签用业务字段拼 key 会撞车导致同时激活，name 必须用行下标
283. [泰兴] Web 选证/查证弹窗统一改函数式 zs-select-dialog-func + *Constants.js 配置工厂，删掉页面私有 Dialog 组件
284. [泰兴] 页面私有审批流弹窗应迁到公共审批流：OperationBtnGroup + ZsSubmit + zs-approval，业务靠 busCode 区分
285. [泰兴] Web 业务详情页顶栏统一用 HeadTitle 组件（申请编号/业务状态 tag/创建时间），并删掉 DetailTemplate 内重复字段
286. [泰兴] Vuex 模块未开启 namespaced 时 mapState('user', [...]) 静默返回 undefined，条件接口不请求
287. [泰兴] Web 后台要件上传在「新增态」不显示：根因是 busId 为空，需新增态专用组件只传 busCode
288. [泰兴] 后台路由 component 字符串与 views 目录精确匹配：目录名不一致即页面加载失败，跳转用的 getRouterPathByFilePath 必须同步
289. [泰兴] 后台提交接口的业务编码(busCode)必须取路由 meta，并把它与表单逻辑一并收进 constants + mixin 复用
290. [泰兴] 把「选填→必填」改造收敛成规则工厂 + strict 开关，并保证保存 payload 始终带数组字段
291. [泰兴] Vue2 中直接调用 this.$options.data() 未绑定实例，导致 mixin/data 里 this.xxx 全是 undefined
292. [泰兴] 同一内核页被多机构/多上下文复用：busCode 按「菜单 meta 优先 + 机构类型回退」查表解析
293. [泰兴] 审批按钮权限与提交 key 必须从 flowable 动态取，不能拿后端展示用的 currentNode 硬编码
294. [泰兴] 新增独立业务模块的交付物清单：供运维录入的菜单路由 JSON + 双端只读差异 + 权限串
295. [泰兴] 股东/成员类明细表的一致性校验：保存前全量拉取再算比例与法人唯一
296. [泰兴] zs-table-column 自定义列插槽是 { scope } 而非 { row }：接口有数据但表格整块空白/渲染报错
297. [泰兴] 按 organType 隐藏字段必须四处同步：配置 js / 编辑表单 / 只读详情 / 必填校验（含跳过专属字典接口）
298. [泰兴] 楼盘格网一个组件双模复用：mode="select|view"，替换旧表格时保留 data-testid 让 E2E 不回归
299. [泰兴] 要件（附件）按业务条件动态必填：上下文对象 + 自定义提交前校验，绕过配置里的 IS_REQUIRED
300. [泰兴] 跨角色全流程 E2E：企业端提交 → 主管部门审批，同一条 video.webm 录屏的写法与前置条件
301. [泰兴] 详情页附件「暂无附件」：busCode 在附件与审批流之间分叉 + busId 必须沿用上传时挂载的 id
302. [泰兴] DetailTemplate 一行两列但两列不等分：根因是同一行字段 span 不同，必须组件层强制 flex:1 1 0 + 归一 span
303. [泰兴] 「子表统一弹窗式 CRUD」的例外：业务上限只有一条时用内联表单承载，提交仍保持数组形态
304. [泰兴] 详情页 Headline/Collapse 分块间距消失：`.xxx.el-row` 复合选择器归零 gap 压过间距 token
305. [泰兴] 机构基本信息变更：核心字段判定单一来源，决定「留变更页提交审核」还是「保存即生效」
306. [泰兴] zs-select-dialog 无搜索栏时表格只占左半边、下方大片留白
307. [泰兴] 按主体拆分接口（companyAdd/companyUpdate/companyDelete）：共用组件换接口注入 + 明确未改动消费方
308. [泰兴] 详情页显示字典原始码值：先直查字典接口验证 key 是否存在，前端不加本地映射兜底
309. [泰兴] E2E 标准化交付物四件套：规则文件 + fixtures(env-loader/helpers) + 录屏合并脚本 + npm 一键脚本
310. [泰兴] zs-operate-column 权限拼出 undefined：permission 是布尔开关，permissionType 才是后缀
311. [泰兴] 函数式挂载弹窗点不开：propsData 传 visible 被 Vue2 丢弃（老弹窗未声明该 prop）
312. [泰兴] 详情附件按类型显示缩略图：图片取原图、PDF 用固定占位图，判断收口到 utils
313. [泰兴] 选择类只读输入框统一用 zs-input（suffix-icon + readonly + @focus），且要全模块收敛
314. [泰兴] 同一弹窗查看态与编辑态分离高度策略：查看随内容、编辑定高内部滚动
315. [泰兴] V3 列表接口必须从 data.records 取，沿用 res.rows 会静默空表
316. [泰兴] V3 行政区划：/system/area/list 已废弃，改用 /system/region/listTree + common store 的 areas
317. [泰兴] 列表「数据状态」只看 bizState 会漏「已注销」：注销态由 cancelStatus 承载
318. [泰兴] 全流程 E2E 被外部服务卡住时，抽独立布局专项 spec 验证改动
319. [泰兴] 详情页整页不能滚动的根因：内容没包进 .detail-from-container（滚动职责分层）
320. [泰兴] 同一详情页出现两遍同一套要件：未传 bus 的 AnnexUpload 默认继承路由 busCode
321. [泰兴] busCode 去硬编码：用 getRouteMetaValue 沿 matched 父级继承 menu meta，并同步改 E2E
322. [泰兴] 用户报「这里有竖线」先判定元素归属：表格内的分隔线不要改页面级样式
323. [泰兴] [苏房] 企业备案附件批量迁移前先摸清 wrapper 壳页与共享核心组件：11 个 organType 页共用一份 detail.vue
324. [泰兴] [苏房] 「要件已上传:1 但保存仍报未完善」双根因：共享附件未绑本次申请分组 + 校验读错组件实例
325. [泰兴] [苏房] 审批必须带附件等额外字段时：保留 zs-approval 流程能力 + customDialog 挂自定义审批弹窗，禁用通用按钮
326. [泰兴] zs-table 二级表头按单行算高度，导致少显示一行：传 header-count 并关掉多余合计行
327. [泰兴] 两级选择弹窗串联（选房 → 选限制记录）的三处接线点：上下文透传、回写父行、子表刷新
328. [泰兴] 楼盘表选房的可选性只按 saleStatus=03 判定，不要叠加 hasLimit
329. [泰兴] 单 Tab 不要用 zs-tabs：全局替换为 Headline 组件（含 cardValue 被别处复用的坑）
330. [泰兴] zs-dialog 弹窗内做两列表单：必须自己包 el-row + el-col span12，标签宽走 scoped CSS 而非 label-width
331. [泰兴] 全局清理表格列硬编码宽度（只留序号列）：脚本边界与两类漏网写法
332. [泰兴] 「变更」类业务拆单架构：备案表原样保留，另立变更单表 + isChange 模式复用同一 detail.vue
333. [泰兴] 销售合同删除接口 V3 全局对齐：先 grep 页面级 deleteType/deleteParamKey 覆盖，再收口 API 层 [].concat(id)
334. [泰兴] Vue2 报 Invalid value for option "computed": expected an Object, but got Function —— 根级把 computed()/watch() 写成方法简写，且 warn 指向的是使用方而非元凶
335. [泰兴] 状态标签配色必须「先判异常再判正常」：单条白名单只认「有效/正常」会把字典里的「已备案」漏成灰色
336. [泰兴] 「经纪机构」在 V3 里是三条独立业务线且命名互相撞车：按「端 + 目录前缀 + busCode」定位，cyjg 是只剩 api 的死路由
337. [泰兴] [苏房] 多步注册页「上一步」回退丢主键：无参 goStep 把 companyRegisterId 写成 undefined
338. [泰兴] [苏房] 批量删除写死 label-width 的边界：label-width="0px" 承担布局语义，不能直接删
339. [泰兴] [苏房] 房屋限制「新增房屋」弹窗必须复用楼盘表选择组件：两段式接口与参数约定
340. [泰兴] 合同双范本（pre / suzhou2016）并行改造：入口按路由判版本 + 操作按钮组抽公共组件 + 跨接口字段名差异集中映射
341. [泰兴] 注销状态是叠加位不是独立 bizState：状态展示必须复合判断 bizState + cancelStatus，并同步收敛操作按钮
342. [泰兴] 批量「详情页统一改 DetailTemplate」前，先用路由注册表按 component 去重收敛出真正的详情组件清单
343. [泰兴] 苏房V3 注册步骤条完成态图标：用 completeIcon 位图，禁止蓝底 el-icon-check
344. [泰兴] 同一从业人员详情页被 B/G 两端复用：按 terminalType 分端控制字段显隐与「仅改角色」维护模式
345. [泰兴] OperationBtnGroup 里 prop 与 computed 同名 businessName 会告警并互相覆盖：权限前缀要独立成 permissionPrefix
346. [泰兴] 子表弹窗的查看态复用 DetailTemplate + contentInfo（蓝底标签矩形），编辑态仍走 zs-form
347. [泰兴] 合同正文「买受人」列表空白：v3 分页接口已改成 rows 包装，旧代码还在读 response.data
348. [泰兴] 详情页底部大片空白：zs-tabs 被 flex:1 撑满视口，空白在 Tab 卡片内部而非 padding 叠加
349. [泰兴] 详情页各区块统一边框包裹：Headline 增加 borderOnly 保留外框，Tab 改 card 模式，禁止 v-if 降级成 div
350. [泰兴] 详情页「改列数」要同时改编辑态 grid 与只读态布局常量，两套声明会各自漂移
351. [泰兴] 详情页底部「审批记录」区块统一收敛为 OperationBtnGroup 的「流程查看」抽屉
352. [泰兴] 开业（入网）编辑页要件区：注册要件只读、开业要件可上传，同一 adminType 且提交按序预检两个 busCode
353. [泰兴] 「点按钮没反应也没报错」的根因常在方法开头的静默 return 守卫，router.push 失败同样静默
354. [泰兴] 新增/提交拆分的审批流改造：先落库草稿再提交，add 成功前不显示「提交」
355. [泰兴] E2E 主管部门登录打不开：E2E_BASE_URL 存在就强制走 storageState，且默认端口与注册环境不一致
356. [泰兴] 页面右上角「保存」按钮消失且输入框全灰：先查只读/编辑开关的布尔参数是否传反，不要先怀疑权限
357. [泰兴] 弹窗式新增/编辑：前置数据未就绪就 return 会让「新增」按钮点不开，需 v-if 重挂 + 弹窗内只留取消/确定
358. [泰兴] 选择弹窗右侧留白：样式类挂在 el-dialog 根节点时 scoped 不生效，且缩放动画结束不会自动重算列宽
359. [泰兴] 备案「流程 busCode」与「要件 busCode」必须成对分离，且提交端与审核端用同一个要件编码
360. [泰兴] 列表新列整列为 `-` 的判定顺序：先比对详情接口字段，再判定分页 VO 未返回（期限字段统一「起 至 止」formatter）
361. [泰兴] 弹窗「点确定无反应」：rules 必填项在模板里没有对应 el-form-item，校验静默失败
362. [泰兴] 只读「查看详情」一律用公共 DetailTemplate，同区多行信息合并成一个模板而非拆两块
363. [泰兴] [苏房] el-table 树形列的全局省略样式别按 .cell > span 收口：display:block 会把展开箭头和文字拆成两行
364. [泰兴] [苏房] 「按字段值触发远端资格校验」的表单：请求序号防旧响应覆盖 + 保存前二次校验 + 查无数据即拦截
365. [泰兴] zs-select-dialog 迁移契约：$attrs 覆盖 title、@opened 不抛出、默认带 bizState:2
366. [泰兴] 变更管理列表「查看」跳错详情页：后端下发 redirectPath 未读 + 用备案 busCode 解析变更行
367. [泰兴] 机构类型字段约定：走 company_type 字典 + 统一 companyType，禁止默认值 agency
368. [泰兴] 新增保存后拿不到主键 / 详情请求带 null：统一 resolveResponseId + changeFormState 空值守卫
369. [泰兴] 预售/现售合同签订共用一套详情页，靠路由 /pre/ 与 /cash/ 决定 contractType 并动态加载章节
370. [泰兴] 匿名/新增态机构注册要件的上传 busId 用 Date.now() 占位，配置只按 busCode 拉，转挂交给后端
371. [泰兴] 后台 Playwright 探测脚本必须断言已离开登录页，否则「退出码 0」是假阴性
372. [泰兴] 待办任务跳转 resolver 迁移：壳路由、失效 storedPath、缺主键的三层兜底
373. [泰兴] 详情页「返回」找不到授权菜单：不报错，静默降级浏览器返回（router.resolve 判可用性）
374. [泰兴] 提交报「审核流程未维护完成」：auditBusCode 硬取路由 meta 的兜底方案
375. [泰兴] 日期字段不回显：禁用态 zs-date-picker 换成只读 zs-input + formatDateOnly 归一
376. [泰兴] 用 currentRoute 判断页面身份：写的是臆想的路由名，条件恒假且静默失效
377. [泰兴] 全站详情页 label 统一右对齐：一条全局选择器 + 只读模板默认值，不逐页改
378. [泰兴] zs-table 选择列要写 type="link" :function，写 :index 只是序号列——样式是蓝的但点不动
379. [泰兴] 列表「有数据但不显示」：V3 接口把列表放在 data 里，通用 listCallback 只读 response.rows
380. [泰兴] Playwright 在 testId scope 内再 getByTestId 同一 testid 必找不到——scope 只匹配子孙节点
381. [泰兴] 弹窗内表单结构规范：form-box → zs-form(label-position=right) → zs-form-item，禁用 el-row/el-col
382. [泰兴] 企业端新增表单「所属企业」自动带入：terminalType=B 时用统一社会信用代码反查第一条企业记录回填
383. [泰兴] 「选项目→选地块→勾选测绘楼幢」级联导入弹窗的完整流程与失败处理（含裸整数请求体）
384. [泰兴] 选择类弹窗「太靠上 / 大弹窗上方空太多」：固定 top:15vh 改成 flex 垂直居中，并强制关闭 v-dialogDrag
385. [泰兴] 弹窗查询参数不能「打开时赋一次」：每次请求前重建 payload，否则 projectId 丢失
386. [泰兴] 业务审批请求体是三件套：key 只是流程节点，通用 approveMessage 与业务 approvalMessage 是两份意见
387. [泰兴] 「审核流程查看」按钮不出现：OperationBtnGroup 依赖路由 formMode 与 data-id，别先怀疑权限
388. [泰兴] 详情页「返回」点了没反应：导航构造器没写 backUrl，兜底回退到当前详情路径等于原地刷新
389. [泰兴] 术语全局重命名前先按后端菜单快照圈定模块边界
390. [泰兴] 要件必填校验会被异步加载状态与 busId 缺失静默放行
391. [泰兴] 老 vue-cli 仓库迁 Vite：环境变量前缀与 iframe 待办页迁移清单
392. [泰兴] 变更项角标：用后端 changeObject 快照逐字段比对并抽公共 mixin
393. [泰兴] 「已备案不可编辑」要整条拆掉维护态旁路，而不是逐字段禁用
394. [泰兴] 字典项未配置时 list.find(...).dictValue 必崩：抽安全取值工具 + 全库清同类写法
395. [泰兴] 跨模块跳转别硬编码带参数占位符的 name：走 buildNavigationByFilePath + pathHint/preferDetail/routeId
396. [泰兴] 弹窗内 zs-search-form 搜索项宽度被详情栅格规则挤压：改公共样式层而非逐弹窗调
397. [泰兴] 选择类弹窗宽度收成 CSS 变量 + 选择壳类：新增选择弹窗不写 width 也保持一致
398. [泰兴] zs-table 字典列必须三件套（type=dict + dict-url + :options），缺 options 会回退到错字典显示码值
399. [泰兴] zs-table 固定宽自定义列仍参与剩余宽度均分 → 表格右侧凭空多出一块空白
400. [泰兴] zs-table-column 插槽必须 slot-scope="{ scope }" 解构，否则行内按钮拿到 undefined 且被空 catch 静默吞掉
401. [泰兴] 要件上传「暂无附件」缺省图统一：沉到常量 + AppendixEmpty 组件，根因是 AnnexUpload 的 image-size 默认 200
402. [泰兴] 表格「去竖线」是全站规范：border 有三层来源，只删页面模板不生效，还须清理 mixin 与公共组件 prop
403. [泰兴] 详情表单右缘不齐：列间距有多套并行来源，补位要用 span 2 的宽字段档
404. [泰兴] 「预设单选 + 后面输入框」联动模式：SzChoice 的 fill-from-option / :fill.sync
405. [泰兴] E2E 不要用 DEV 常量路由(/__e2e__)做 mock，导航改由动态菜单解析真实路径
406. [泰兴] 删除接口参数名不统一：在 table.js 的 deleteRequest 里加 deleteType:'v2' 分流，默认仍发裸数组
407. [泰兴] zs-table 序号列统一用 type="index"，跨页序号靠 :index 方法而非 slot
408. [泰兴] 同源弹窗跨模块复用：抽共享 Dialog + variant 薄封装，刷新用 $emit('success') 不用 $parent.getList
409. [泰兴] 要件面板标题栏高度与其它区块对齐靠共享 mixin，内部不滚动是缺高度链而非 overflow 写法
410. [泰兴] 企业主体详情按 organType 分成多个包装页共用一个 detail 组件，编码与跳转口径要记牢
411. [泰兴] 退役同源分支时清理全局 mixin 的环境标识：Vue「xxx is not defined」警告来自已被删的全局 computed
412. [泰兴] [苏房] 姓名/手机类脱敏：列上配了 formatter 但全局未注册该函数时会静默显示明文，需请求头 + 展示层双保险
413. [泰兴] [苏房] 复制/新增跳转整段复制 $route.query 会留下旧 id，被 getId() 优先读取后新增页退化成「带旧主键的详情」
414. [泰兴] [苏房] 跨业务模块列表穿透详情：一律 buildNavigationByFilePath + 目标模块自己的 busCode，缺主键先提示不跳转
415. [泰兴] [苏房] 用全局 border:none 消除「Tab+Headline+网格」三层框，会把公共组件自身必须保留的独立外框一并删掉
416. [泰兴] 列表状态列空白且删除/注销按钮永不出现：接口返回 bizState 而前端误用 recordState，字典未就绪就回显原始码
417. [泰兴] getRouterPathByFilePath 找不到路由但控制台能匹配：flattenTree 后 meta.filePath 变成 Layout/ParentView，真实组件路径在 component
418. [泰兴] 链式接口传参取错同类 ID：source 同时返回 sourcePlanId 与 presalePermitId，detail 误传前者导致数据为空
419. [泰兴] [苏房] zs-tabs 页签栏工具栏按钮 disabled 不随勾选更新：跨 inject 的配置对象不触发父级重渲染，需 notifyToolbarUpdate + $forceUpdate
420. [泰兴] [苏房] 页面自写 formMode watcher 与 detailMixins 冲突：immediate 无条件 createForm() 会覆盖 mixin 从 sessionStorage 恢复的草稿
421. [泰兴] [苏房] Vue2 原生 radio/checkbox 无法二次点击取消：浏览器默认行为抢先改写 checked，交互必须收敛到 label 的 @click.prevent
422. [泰兴] [苏房] 「表单禁用」标志不能当提交按钮的正向显示条件：审核锁态（displayStatus=2）仍能重复提交
423. [泰兴] B 端隐藏「企业/机构主体」类搜索条件：用户要求逐页过滤，禁止改公共 zs-search-form
424. [泰兴] 端别(terminalType)条件隐藏的判定口径与降级方向：缺失按 G 端处理；薄入口共用内核列表组件一处改覆盖多菜单
425. [泰兴] 同一详情组件被多个审批节点路由共用时，busCode 要写死常量，不能按路由 meta 动态解析
426. [泰兴] 接口字段更名（provinceCityArea→administrativeArea）的迁移套路：抽 normalize 函数 + 全量排查关联页残留
427. [泰兴] lint 验证口径：npm run lint 跑的是全仓 eslint，输出尾部不能用来判定本次改动是否引入问题
428. [泰兴] 弹窗左侧「楼幢→单元」懒加载树在各业务弹窗里重复实现，应抽成可配置公共组件
429. [泰兴] 新增态要件从 RegisterUploadItem 迁到 AppendixPackageSection 后，保存前校验与提交前校验不同源
430. [泰兴] 「表单项宽度过短」的两个根因：窄容器里仍用三列 + label-width=auto，且编辑态与查看态是两套配置
431. [泰兴] 选择弹窗「打开即空白、必须点搜索才有数据」的根因：v-if 懒挂载让 el-dialog 的 open 事件永不触发
432. [泰兴] 审批意见字段的可编辑与必填由「审批节点常量表 + formMode + bizState」共同决定，不能只看有没有审批按钮
433. [泰兴] 表底统计只留一处：删掉手写 table-summary/共计 N 条，统一交给 zs-pagination（纯总数用 :show-pagination="false"）
434. [泰兴] 给公共 scss 加「折叠区底部留白收紧」规则时，不能挂在 label-position 变体类上，否则 label-left 页面必然漏网
435. [泰兴] 只读详情的长文本/大字段必须走 detail-template，不要用 disabled 表单控件兜底
436. [泰兴] 菜单 component 指向 views/**/components/** 会被路由表排除：变更类业务必须有自己的详情入口，禁止前端兼容映射
437. [泰兴] 入网/注册提交成功后的反馈用单按钮确认弹窗替代 toast（用户明确偏好）
438. [泰兴] 多详情页批量迁移「流程查看」按钮：可见性三条件契约 + 主键字段逐页核对
439. [泰兴] [苏房] 变更页数据带不进表单的两层根因：多 watcher 并发 getDetail 竞态 + beforeForm 早于注水
440. [泰兴] Vite 下 Vue2 全局/上下文注册章节组件失效：Unknown custom element 用 import.meta.glob + 父级映射 prop 修复
441. [泰兴] 多文件要件驳回后只回显 1 张：附件回填不能用 usedConfigIds 占位分配配置
442. [泰兴] 复刻详情页漏掉 detailMixins 契约字段：渲染期 businessName 未定义警告 + 底部审批按钮不渲染
443. [泰兴] 弹窗表格「有数据但空白」：先看响应顶层是 data 还是 rows，再统一走 extractListData 归一化
444. [泰兴] 详情页局部可编辑字段：DetailTemplate 命名 slot 原位渲染 + item.autoHeight，禁止网格外另加 el-row
445. [泰兴] Vue2 里 data 优先于同名 computed：改 mixin 的 selectable 必须写在 data() 中
446. [泰兴] 内联选择弹窗缺 v-if：关闭后组件常驻挂载，在 flex 容器里撑出一块空白
447. [泰兴] tdai 记忆 MCP 报 Missing required argument: session_key —— 每个工具都必须带 session_key
448. [泰兴] 详情页重写 detailMixins 的 init() 会静默断掉查看/编辑的详情请求
449. [泰兴] zs 后台组件的全局注册规则（文件夹名即标签名）与要件上传的两种落地模式
450. [泰兴] 公共 Headline 标题栏：内边距只给左右，Vue2 具名插槽用 slot="right"
451. [泰兴] 子表行删除：草稿态只改本地，已保存单据必须走整单 save 持久化
452. [泰兴] 详情页底部子表块被整体裁掉：整页滚动出口规则要收敛成三个互斥触发条件（styles/index.scss 一处修）
453. [泰兴] 详情页子表「去掉新增/删除/编辑但要保留关联数据展示」：给同一子表组件加 readOnly，而不是删组件或另造只读组件
454. [泰兴] 同一详情组件被「维护/变更」两个菜单复用 → 管理端误调变更接口的根因与前端防御回退
455. [泰兴] 详情页查看态要件按钮全部不可点：zs-form 的 disabled 会级联禁用整个表单域内按钮
456. [泰兴] 行政区划字段 approvalRegion → administrativeArea 的迁移半成品状态与完整改动面
457. [泰兴] OperationBtnGroup 统一 emit refresh：提交/审核后详情页不刷新与详情接口重复请求的根治
458. [泰兴] zs-tabs 区块内的子表不要自带 Headline：用 SubTableToolbar 把按钮挂到 Tab 右侧，否则出现重复「明细/收起」标题
459. [泰兴] 详情表单纵向间距双来源叠加：收敛到 --detail-block-gap 单一口径（含弹窗裸 el-col 的例外）
460. [泰兴] 表格列改名只改 label/formatter，绝不能改 prop —— 列配置按 prop 持久化在 localStorage
461. [泰兴] DetailTemplate 的 column prop 声明了但无效：一行两列只能逐项配 layout
462. [泰兴] 详情页 ZsSubmit 提交体会丢主键：submitData 定义在页面却没接到 operation-btn-group 的 :submit-data
463. [泰兴] 弹窗保存别在接口返回前 close()：校验通过即无条件关闭会让失败路径丢失上下文并双次关闭
464. [泰兴] 表单校验提示溢出区块边框：提示是绝对定位不占流，全局把 form-item 的 padding-bottom 清零就会挤出去
465. [泰兴] 动态章节组件报 Unknown custom element：配置里的组件名与 SFC name 大小写不一致
466. [泰兴] 状态双口径没对齐：列表显示「已备案」但工具栏仍可编辑/删除
467. [泰兴] 公共弹窗别用 prop 透传字典 options：prop/data 同名触发 Vue warn 且文案不显示
468. [泰兴] 多机构共用内核页的 organType 解析：filePath → busCode → 父级菜单标题三级回退，共用内核不得默认某个机构类型
469. [泰兴] 共用内核页 + 薄入口模式：菜单 component 必须是 views 下的页面入口，薄入口未登记时按 filePath 跳转必报「未找到菜单路由」
470. [泰兴] 从原证发起变更时 bizState 会继承原证的「已备案」值，导致新单要件区直接只读
471. [泰兴] v-dialogDrag 让弹窗偏位后如何真正居中：关掉拖拽 + body 挂载层 flex 居中 + @opened 清内联样式
472. [泰兴] 接口 200 却提示「发起变更失败」：空 catch 把路由解析异常伪装成接口失败
473. [泰兴] 列表「有 total 但无行」：主键字段改名要同步 primaryKey，且分页数据可能落在 response.data.rows
474. [泰兴] 变更单保存后跳详情传错 ID：query 残留的原始备案 ID 会压过保存返回的变更 ID
475. [泰兴] 图形验证码 /code 不显示：用请求级 skipCrypto 跳过加解密，不要塞进明文白名单
476. [泰兴] 列表「新增/详情」跳错模块：用路由 name 首段当 pathHint，在同构详情路由之间必然撞车
477. [泰兴] 变更表单的「原值」红色角标：必须两侧跑同一套格式化再比较，否则全字段都判成已改
478. [泰兴] [苏房] 合同章节窄版心内宽表穿屏：外包滚动容器 + 放弃固定操作列
479. [泰兴] [苏房] OperationBtnGroup 公共按钮组的标准顺序与「不带图标」约定
480. [泰兴] [苏房] zs-table-column 字典列必须显式传 dictUrl，否则按 prop 推导出错误字典键
481. [泰兴] [苏房] 附件上传全面统一为宫格：在旧组件上加委托层，而不是逐页改模板
482. [泰兴] [苏房] 接口字段替换的适配三件套：回填兼容旧值、提交剔除旧字段、界定不在范围的接口
483. [泰兴] Vite 生产构建加速：瓶颈是 SFC 数量，资产合并只省写盘不省墙钟
484. [泰兴] 详情页返回按钮「路径末段是主键」的判定，在 query 传 id 的企业端路由上必然失效
485. [泰兴] 同一页面承载「备案单 + 变更单」两套单据时，状态必须单独维护 changeBizState，不能用备案 form.bizState
486. [泰兴] 日期范围控件把详情表单列宽撑歪：改用 detail-form.scss 的 section-form 三列栅格 + min-width:0
487. [泰兴] 迁到 zs-select-dialog 后宿主 selection 必须随 visible 重置，否则取消残留导致提交过期载荷
488. [泰兴] 命名详情路由没有 :tableid 时主键必须显式放 query.id，否则 getId() 把模块段名当业务主键
489. [泰兴] 行政区划 formatter 按「有无名称字段」分两套：administrativeRegionFormatter vs fullRegionFormatter
490. [泰兴] 并行 AI 会话共用同一工作区：交付前用 git status 核对自己改的文件，别提交别人的改动
491. [泰兴] 详情接口整表覆盖 form，会抹掉「从路由识别出来的页面形态字段」，导致字段区与 Tab 凭空消失
492. [泰兴] 树形选房弹窗只在最后一级回写上下文 → 父页 created 抛出「请先选择项目信息」
493. [泰兴] 注册步骤组件复制改字段后，E2E 的 fillStep1 用 placeholder 文本定位会连带全流程失败
494. [泰兴] V3 子表/列表表格的容器约定：详情用 .sub-container，列表用 .list-card，边框规则在 index.scss 一处收敛
495. [泰兴] 列表首行「（未保存）」幽灵行：sessionStorage 草稿失效后仍被无条件回显
496. [泰兴] 删除接口「裸 ID 数组」的全局收敛点：mixins/table.js 的 deleteType/deleteParamKey，单 Long 接口要单独留出
497. [泰兴] 批量脚本改过的 Vue 模板报「tag has no matching end tag」时，用 scan-tag-mismatch 脚本定位而不是靠人眼
498. [泰兴] 注册流程 Step 图标按 stepKey 三段式命名，缺图时只列清单由用户提供，禁止自造素材
499. [泰兴] 公共 section-form 里再套 el-row/el-col 会塌成 1 行 1 列，且 768–991px 段缺 sm 断点列宽
500. [泰兴] 详情模板 label 宽度必须按「所在栅格列」各自算最长，整行字段对齐第一列，空列占位按已推进的列序号推算
501. [泰兴] cursor-feedback 飞书 /new 拉起任务报「未配置 CURSOR_API_KEY」：key 要落到进程环境 + 重装守护进程，默认模型与项目目录在 cli.json/settings.json
502. [泰兴] 引入公共 @/mixins/area.js 时页面同名 regionOptions 会与 mixin 计算属性撞车，区划回显要按三级兜底
503. [泰兴] 文本字段改 zs-input-number 时校验 trigger 必须从 blur 改 change，且历史脏文案要先迁移
504. [泰兴] presale-detail-section-stack 的白卡片是靠子选择器命中的：新塞裸 div 区块会变成透明底
505. [泰兴] [苏房] 详情页片区/区域下拉无值：api 模块引错 + 缺分页参数 + 响应字段不匹配三件事
506. [泰兴] [苏房] 子步骤保存后要能立刻看到结果：保存接口必须回传展示态字段（PDF 地址）并用 sessionStorage 桥接
507. [泰兴] [苏房] el-tree 选中/高亮不生效：node-key 类型与 setCurrentKey 入参类型不一致
508. [泰兴] [苏房] 同一要件面板同时承载「外部带出的只读要件 + 本单可上传要件」：靠 busCode 逐项判定可操作性，不要合并成一个可编辑列表
509. [泰兴] [苏房] 新增态「先传附件后保存」：用临时附件分组 busId + 保存时传 applyAttachGroupId 由后端转挂
510. [泰兴] [苏房] 路由主键是防伪码（UUID）时，附件/提交的 busId 必须由页面显式传业务主键，且详情返回前不得回退路由参数
511. [泰兴] [苏房] 多机构薄封装（zljg 复用 jjjg 内核页）：Provider 注入上下文必须被核心页消费，生成脚本目标路径与草稿 key 都要按机构维度校验
512. [泰兴] zs-table-column 插槽必须写 #default="{ scope }" 并用 scope.row，写 { row } 会 undefined
513. [泰兴] 列表行可编辑判断与详情头部可编辑判断必须共用同一判定函数，否则能进页不能提交
514. [泰兴] zs-tabs 统一改造的边界：登录页与右侧抽屉（attachmentDraw）保留 el-tabs 经典页签
515. [泰兴] 「所有页面按这个字段顺序」类需求收敛到共享 Panel 的 constants 构造器，一处改全局生效
516. [泰兴] zs-table 树形表格列宽审计需计入缩进与展开图标，异步展开后必须重算
517. [泰兴] 逐条 POST 的批量提交：循环 break 后仍无条件弹成功提示
518. [泰兴] 选楼弹窗的 floorNumber 是「总层数」，不能直接写进 aboveGroundFloors
519. [泰兴] 弹窗新增态必须显式重置表单，只靠 onClose 的 resetFields 不可靠
520. [泰兴] 同一字典被「表格列 + 筛选项」各拉一次；字典类型常量不要跨模块 import
521. [泰兴] 通用 FileUpload 迁到要件组件 AppendixPackageSection：三态适配 + 旧数据 URL 回退
522. [泰兴] 区块「空态缺省图 + 操作按钮」条件互斥：未维护时应显示维护按钮，不要渲染缺省图
523. [泰兴] 提交接口地址从流程配置接口动态解析（resolveFlowSubmitApi + 常量兜底），不要前端硬编码
524. [泰兴] Vue2 本地 data 与 mixin 的 computed 同名：computed property is already defined in data 警告与重命名解法
525. [泰兴] 楼幢号：展示层用 buildingNo，提交层保留 buildingCode，且要跨多文件同步替换
526. [泰兴] 子表弹窗按 isViewMode 分流：查看用 DetailTemplate，编辑仍用 zs-form，表底统一 zs-pagination 统计
527. [泰兴] 共用 detail.vue 的「返回」按钮显隐：isChange 包装页 / backUrl / 路径末段为业务主键三选一，企业端编辑态必须隐藏
528. [泰兴] el-form-item 内挂两个控件时只有第一个触发校验：营业期限 range 拆成起止 picker 后必须手动 validateField 并同步 E2E 定位器
529. [泰兴] 登录后默认落地「第一个可访问菜单」：DFS 取首个非 hidden 叶子 + 统一 landingPath helper，不要写死 /todo
530. [泰兴] E2E 验证「变更页返回不保存」的断言基准；getByText('') 会匹配空节点导致误挂
531. [泰兴] 企信通企业信息回填要整体写回营业期限区间，逐字段「有值才赋值」会残留旧 businessTermStart
532. [泰兴] [苏房] 等保三级通信加密改造的前端分层与接入点：request 拦截器 + 独立 crypto/utils 模块
533. [泰兴] [苏房] 加密改造两个具体坑：security/public-key 是 POST，sm3(msg,{key}) 与 hmac 模式等价
534. [泰兴] [苏房] V3 新建模块的模板选取与 mixin 继承链：listMixins→table→tableComponents/permsMixins，detailMixins→form+area→formComponents
535. [泰兴] [苏房] 测绘变更（预测转实测）模块的业务约束与「编辑只放一个字段」的接口收敛
536. [泰兴] [苏房] V3 删除接口有两种请求体形态：裸 ID 数组之外还有 deleteType:'v2' + { ids: [] }，不能按同一模式改
537. [泰兴] 弹窗表单 label 左对齐的真正根因：Element UI 没有 label-align，只有 label-position(right/left)
538. [泰兴] 「直报现售备案」与「预售转现售」共用一套详情组件，用 sourceType 分流
539. [泰兴] zs-search-form 的 padding 层层叠加根因：全局 el-row gap + 组件内 :deep(.el-col) padding + 布局列 padding 三份来源
540. [泰兴] 弹窗内的「关联选择」改内嵌选择表，不要再叠二层选择弹窗
541. [泰兴] zs-table 的 bizState 列走专用渲染分支：字典化改造的三个暗坑
542. [泰兴] 要件区在新增/变更单不可上传：appendixOperable 拿 bizState 判定，新增态 bizState 是 undefined
543. [泰兴] 聚合型管理列表（无自有 detail 页）必须自己实现 handleView，否则点查看报「没有授权相关菜单」
544. [泰兴] 自定义要件上传区对齐公共 AnnexUpload：只搬展示子组件，锁死 e2e 选择器契约
545. [泰兴] 弹窗表单全局统一两列、文本域必须整行：detail-dialog-grid-col-sizes 的三处覆盖与顺序
546. [泰兴] 限制审核详情点「编辑」后关联房屋子表消失：查看态分页数据源与编辑态本地数组未打通
547. [泰兴] Web 详情页滚动所有权：detail-container 只锁高不滚，由 detail-from-container 独占滚动
548. [泰兴] 要件/附件卡宫格不要用等宽 grid：标题被省略号截断，用户要求完整单行
549. [泰兴] 弹窗表格多选勾不上、确定键常禁：row-key 用了本数据集里不存在的子表主键
550. [泰兴] 附件要「过滤掉别处配置但回显别处文件」：单配置集 + 同名只读回填 + fillFromBusCode，不要合并两套配置
551. [泰兴] 查看态不要用整表 disabled 的 zs-input 冒充只读：按 formMode 分支到 DetailTemplate
552. [泰兴] zs-dialog 传 header="" 会留下一条只剩关闭按钮的细条标题栏
553. [泰兴] 变更单「提交」按钮显隐不能绑死「变更申请」菜单，要按单据自身状态判定
554. [泰兴] el-tabs 换 zs-tabs 的两个实操细节：下划线错位根因 + hide-headline 去重复标题
555. [泰兴] zs-select-dialog 自定义左侧树时 tree prop 仍须补齐 treeUrl/treeKey/treeLabel 占位，否则 prop 校验告警
556. [泰兴] 弹窗/子表查询的两个静默退化：pageSize 写死 500 无截断提示、楼幢过滤字段缺失时不过滤直接全量查
557. [泰兴] 同一批字段散落在 extend / projectExtend / projectExtendChange / originExtendInfo 多个容器时，必须统一合并解析且禁止可选链直赋覆盖
558. [泰兴] 详情页「业务编号」字段的展示位置约定：顶栏 HeadTitle 只留申请编号/状态/创建时间，业务备案编号 unshift 到基本信息首位并做重复断言
559. [泰兴] 子表工具栏从页面自绘 operation-button-container 迁到 SubTableToolbar 时，把显示条件/权限/禁用逻辑整体搬进 operationButtons 计算属性
560. [泰兴] 按对接文档做字段更名收敛：读取侧新字段优先并兼容旧字段、保存侧只传新字段，字典选项要剔除「全部」
561. [泰兴] 详情页签内子表列宽/高度通用化：删掉 table-tr 与写死 width，用 :page-size 控高 + row-key 保多选
562. [泰兴] 长文本字段（经营范围）在只读详情里要移出三列栅格，单独整行禁用 textarea 展示
563. [泰兴] 自由文本字段改字典下拉（户型 house_type）的改造套路与历史数据回显坑
564. [泰兴] 跳隐藏子页（预售方案维护页）失败：菜单解析不可路由时按当前 URL 段替换推导，别只依赖 buildNavigationByFilePath
565. [泰兴] 委托代售新增对接新接口：选中项/详情/提交体三层映射，详情回填不能被选项列表覆盖
566. [泰兴] 行展开子表改独立 Tab：选楼弹窗必须缓存 houses 快照，汇总字段走「已保存用接口值/未保存本地汇总」双口径
567. [泰兴] DetailTemplate 改一行两列：在共享 contentInfo 里用 HALF_LAYOUT/FULL_LAYOUT 常量，不逐页写 span
568. [泰兴] 弹窗控制台报 Unknown custom element <pagination>：旧页面拷贝残留裸标签，本项目分页是全局 zs-pagination
569. [泰兴] [苏房] 要件网格末行落单整行展示：纯函数模拟两列排版 + grid-column: 1 / -1
570. [泰兴] [苏房] 详情页底部灰色空白带 + 最后一个 Headline 标题被拦腰截断：calc(100vh - 120px) 与实际 104px 不符
571. [泰兴] 全局水印被页面高层遮挡：水印层改挂 body + fixed 对齐 app-main，z-index 取 1990
572. [泰兴] 跨列字段换行后无法与上一行第 3 列对齐：给 DetailTemplate 加 gridOffset 偏移占位
573. [泰兴] 菜单配置的 submitApi 不生效：提交接口解析应做成 meta → 流程配置 → 默认路径三级优先级
574. [泰兴] 新增改走审批流（删除提交即生效接口）：草稿 add/update 拆分 + 新增态 config-only 上传 + 落库后才出提交按钮
575. [泰兴] 真实接口 E2E 三条稳定写法的坑：waitForResponse 后再 patch 表单、mock 用例缺函数会伪装成下游超时、按按钮可见性 skip
576. [泰兴] 新增保存后切查看态丢 ID：changeFormState('view', id) 必须显式传主键
577. [泰兴] 详情页迁到公共详情框架后，残留 <zs-attachment> 只报 Unknown custom element 警告
578. [泰兴] Tab 视觉统一：改 zs-tabs 公共组件一处，并清掉页面级 :deep(.tabs-tab) 覆盖
579. [泰兴] 限制单据保存后子表「暂无数据」：detail 不返回子表时回退分页接口，且禁止用空数组覆盖本地已选
580. [泰兴] 单页注册「查询暂存单」用服务端要件整体覆盖本地列表，会清掉尚未持久化的已上传附件
581. [泰兴] 「输入正确数字仍提示请输入正确数字」：this.patterns.xxx 被引用但 patterns/index.js 从未定义
582. [泰兴] 注册步骤条「已完成」态：复用 currentIcon 出实心蓝，别为一个完成态再维护第三套位图资产
583. [泰兴] [苏房] Web 后台表格列右对齐只认「金额/面积」白名单，不要在全局 formatter 里按列名后缀匹配
584. [泰兴] [苏房] 雪花 ID 精度治理：禁止 Number(x) || x，回填分支与 query 分支必须统一 String().trim()
585. [泰兴] [苏房] 从业人员变更 busCode 按机构类型三分，页内变更后要件 busId 必须切到变更单 ID
586. [泰兴] [苏房] 数字字段改用 zs-input-number 的联调清单：min/precision 显式声明 + 详情回填 Number 归一化
587. [泰兴] [苏房] 表格「序号」列表头被裁切：页面 width="60" 绕过 zs-table-column 的全局固定列宽下限
588. [泰兴] [苏房] 后端把字典字段整体替换（provinceCityArea→administrativeArea）时的多页迁移清单与兼容顺序
589. [泰兴] [苏房] 下线功能入口只删按钮、不删能力：按钮+计算属性+handler+无用 import 四件套一起清
590. [泰兴] [苏房] 定长字符字段（18 位统一社会信用代码）输入框宽度用 ch 计量并在 E2E 里断言可见性
591. [泰兴] [苏房] 图片预览弹窗标题显示文件名：preview store 增 nameList 与 urlList 同索引，URL 解析兜底
592. [泰兴] Vue 警告 Unknown custom element: <Submit> 的根因：全局组件名是 ZsSubmit，且 OperationBtnGroup 已内置提交按钮
593. [泰兴] 详情页底部白条与滚动灰条遮挡：calc(100vh-120px) 少减 16px + Headline 未包 detail-from-container
594. [泰兴] 详情页内层 Tab 把卡片 padding 清成 0 后，只补了 tabs-bar 留白，tabs-content 里的表格仍死贴边
595. [泰兴] 分页接口取 res.rows、全量 listAll 取 res.data：切接口族必须同步切取值字段
596. [泰兴] zs-input-number 输不进小数：默认 step-strictly + step=1，precision 只管显示
597. [泰兴] 「表格不带竖线」的真实含义：不传 border，detail-sub-table-root mixin 有 border 分支会加回竖线
598. [泰兴] [苏房] flowable 接口路径按 controller 分组：flowViewer/审批权限属 /flowable/task/*，写成 /flowable/definition/* 必然 400
599. [泰兴] [苏房] 弹窗表单行距统一走 zs-dialog 的 .form-box + --dialog-form-item-gap 变量，页面禁止写 scoped 间距
600. [泰兴] [苏房] 详情页关联子表用「本企业接口兜底 + 记录详情覆盖」两段式加载，detail 失败必须保留兜底不置空
601. [泰兴] [苏房] 隐藏详情页扩展栏目用常量开关 + 保留字段数据，删模板或停加载会导致保存时把已有数据清空
602. [泰兴] 详情页「查看态标签太靠左、和编辑态差 12px」：两态共用同一 DetailTemplate 并挂通用缩进类，用负边距抵消
603. [泰兴] 「新增正常、查看点不动且侧边栏空白」先查详情菜单 path 的动态段拼写（:tableld 少个 i），不是路由代码问题
604. [泰兴] 新建业务模块的骨架约定：薄壳 index/detail + components 下 List/Detail/Dialog，权限走 permsMixins 而非 v-hasPermi
605. [泰兴] 验证码 /code 接口要「明文 POST」：加密白名单会强制 GET，正确做法是 skipCrypto 单接口跳过
606. [泰兴] V3 本地 Nginx 部署约定：deploy/start-nginx.bat 统一「构建→重载」两步
607. [泰兴] 「机构注册」是入口统称，要按主体拆到三条独立路由，别在 institutionRegister 里找开发企业
608. [泰兴] 弹窗列表「暂无数据」先查响应体层级：$post 补丁返回顶层 {code,rows,total}，只读 res.data 必空
609. [泰兴] 改「几列布局」必须同步编辑态 grid 与查看态 FORM_COL_* 常量，并保留旧布局常量导出
610. [泰兴] 选择类弹窗首次打开不请求列表要按组件族全局排查，而不是逐页补搜索按钮
611. [泰兴] 跳转提示「没有授权相关菜单」多为手写 filePath 拼错，不是权限问题
612. [泰兴] 弹窗关闭按钮不垂直居中：用上内边距变量定位绝对定位元素 + 图标 line-height 拉偏
613. [泰兴] Playwright 只需录制部分用例时：video 是文件级配置，必须按录屏粒度拆 spec 文件
614. [泰兴] 注册表单「重置」无效的根因：重置逻辑只撤销「提取回填」而非整表还原，应改用 createRegisterForm() 工厂
615. [泰兴] 表格边框有三个来源：去边框不能只改 zs-table 默认值，列表页配置对象里的 border:true 才是主战场
616. [泰兴] AnnexUpload 的「隐藏视图切换」是多点联动开关：顶栏、底部批量栏、勾选态、watcher 四处必须一起关
617. [泰兴] 面积/金额类字段统一用 amount-input：编辑态 :dot 控小数、查看态用同一格式化函数，空值口径分开
618. [泰兴] 资质「有效期」时间段展示：getOwnCompany 种子数据要合并详情接口，别在「已有资质」时提前 return
619. [泰兴] detailMixins 只适用于整页：子表单组件不要混入，且 init() 应对缺三要素静默返回
620. [泰兴] 企业信息「变更审核中」的要件必须用变更单 ID 查，ID 未就绪时宁可为空也不回落备案 ID
621. [泰兴] 详情页「基本信息」整块空白且无报错：先查渲染它的公共组件 DetailTemplate 是否注册
622. [泰兴] 隐藏要件上传区必须同步放开保存校验，且管理端与 ToB 两份组件副本一起改
623. [泰兴] zs-table 拉伸列注册 uid 与 Element 内部列类型不一致，导致中间列撑不满、固定操作列前留白
624. [泰兴] zs-table-column 对 bizState 硬编码全局字典，列级 options 与 dict-url 被静默忽略
625. [泰兴] 组件 prop 名与全局 mixin / detailMixins 的 computed 同名会被覆盖：formMode 报 already defined as a prop，mode 直接吞掉父组件传值
626. [泰兴] OperationBtnGroup 自算 formMode 缺少 getId 兜底，导致「查看」进入时仍显示保存按钮
627. [泰兴] 非分页接口接入公共 SelectDialog.open：用 noPagination + stripPaginationParams，并保留 testId
628. [泰兴] 详情页顶栏空入口用 OperationBtnGroup 的 show-* 开关关掉，而不是留着打开空白弹窗
629. [泰兴] 操作列整体消失：先查页面 buttons/operationButtons 是否被覆写成空数组，再怀疑权限或样式
630. [泰兴] 顶栏(topNav)模式下侧栏路由的同步边界：叶子顶栏菜单必须保持侧栏为空
631. [泰兴] 合同条款 SzChoice：单选项收敛为固定【】文案并自动回填唯一值
632. [泰兴] 列表页标题禁止写死 list-name，统一从路由 meta.title 读取（matched 继承 + 「列表」后缀去重）
633. [泰兴] 只读/终止类详情页行操作列：查看与编辑删除的禁用条件必须同源，并与行内 link 保持一致
634. [泰兴] 公共子表组件注册在 mixin 里会让「复用公共组件」验收失效且查不出来
635. [泰兴] 同一详情页混用两种 detail 请求体：initDict 改裸 ID 而 getDetail 仍包对象的半迁移坑
636. [泰兴] 通用变更单 ID 解析工具是白名单制：新增业务变更必须补业务专属 changeId 字段
637. [泰兴] 子应用/第三方地址从前端环境变量迁到后端参数设置（land.domain）的完整改法
638. [泰兴] 多选字段与后端「逗号串」契约：回显 split 过滤 + 提交必留 key（空串=清空）
639. [泰兴] 要件按主体/角色过滤有两条并行渲染路径，改规则必须同步映射函数否则星标不一致挡提交
640. [泰兴] 变更单保存成功后要留在变更上下文但切回 view 态：router.replace 改 formMode，并去掉重复 loadChangeDetail
641. [泰兴] [苏房] 分页列表 /list → /page 的判定规则：按「是否带 pageNum/pageSize、响应 rows+total、是否接 zs-pagination」分流
642. [泰兴] [苏房] bankBranch 接口 list→page 改造实例：同页多接口要分治，并同步 e2e 的 URL 断言
643. [泰兴] 系统类下拉/列表接口统一取 response.rows（不是 response.data）
644. [泰兴] 用 ESLint 自定义规则 prefer-zs-components + Cursor User Rule 双轨约束 Agent 复用公共组件
645. [泰兴] DetailTemplate 的 border 只控制外框与圆角，内部分隔网格线始终保留
646. [泰兴] 详情页布局复刻 brand 模板的检查清单：Headline 必须是 zs-form 直接子节点，布局常量用 DETAIL_COL_HALF
647. [泰兴] 列表补「业务状态」列：状态码解析收敛到 utils，bizState 为空要回退 businessStatus
648. [泰兴] 用户偏好：单个页面的分块间距写进该组件 scoped 样式，不要改公共 index.scss
649. [泰兴] 列表行对象直接当弹窗 form 用，导致网点详情只回显一行字段
650. [泰兴] 本后台没有「全能」CRUD 模板：mixin 驱动型页面按能力拆开参考
651. [泰兴] 登录页「机构注册」是统称：四条注册路径，股东步骤只属于开发企业/物业
652. [泰兴] 要件上传项不要把格式/大小提示逐项重复，字段名也不能换行
653. [泰兴] 企业基本信息「资质区」回显为空：资质列表有两套字段名，只读 qualificationList 会全空
654. [泰兴] 详情页要「标签在左」必须显式传 label-position="left"：zs-form 在详情容器里强制 top 且清掉 labelWidth
655. [泰兴] el-form-item 的必填红星只认 rules 里的 required: true，自定义 validator 校验生效但不显示星号
656. [泰兴] 从业人员详情页附件 busCode 必须与提交/审批同源，否则变更态附件仍走备案编码
657. [泰兴] 附件字典项匹配失败会让缩略图与预览整体静默失效（ImageGrid 读 undefined.remark 抛错）
658. [泰兴] 第三方数据「提取」入库套路：独立查询弹窗 + 复用主表新增接口 + 沿用新增权限
659. [泰兴] businessName 与 flowBusCode 是两件事：只把流程编码改成从路由 meta 取，别连带改 API 段
660. [泰兴] 保存接口 400：apiV3Normalize 把 /save 误拆成「动作 cancel + 参数 save」丢掉了后缀
661. [泰兴] V3 接口路径固定三段：非 CRUD 业务方法后面禁止再拼 page/add/detail，批量改规范时最易误伤
662. [泰兴] 注册要件上传项缺少预览/下载：能力与测试定位契约要按已成熟的上传项组件对齐
663. [泰兴] 缴款网点弹窗应走 /prefund/bankBranch/page，字段与旧联行号接口完全不同
664. [泰兴] 同一模块多个列表接口响应包装不一致：写『递归解析分页结果』共享函数，不要让页面各写 res.rows
665. [泰兴] 守卫竞态：roles 已有值但 addRoutes 为空时直接 next()，动态路由未挂就跳落地页 → 报「页面未授权或不存在」
666. [泰兴] 跨模块穿透跳转（注销单→许可详情）必须带 busCode/pathHint + backUrl + query.id，且无主键时别保留 link 样式
667. [泰兴] 字段区块子组件：查看态统一走 DetailTemplate 文本而非 disabled 控件，且不要只写 el-form-item 依赖祖先 zs-form
668. [泰兴] Headline 的 border-only 会连 #right 操作区一起隐藏（子表工具栏消失）
669. [泰兴] 查看态仍出现「保存」按钮：头部按钮与只读展示必须共用同一 canEditInHeader 谓词
670. [泰兴] 接口路径带斜杠、权限字符用驼峰：用 businessNameForPerms 把两者拆开
671. [泰兴] 子表新增行缺少后端主键时，二次操作要「先补保存再刷新快照」，而不是提示用户手动保存
672. [泰兴] 未登录的注册页顶栏品牌信息（系统名称 + LOGO）统一从 platformConfig 读，公共组件内做回退
673. [泰兴] vue-qr 默认 margin=20 会让小尺寸二维码白边失控，需 margin=0 + white-margin=false 并固定容器尺寸
674. [泰兴] 弹窗表单项间距被「弹窗 margin」和「全局 error-slot padding」叠加成双份
675. [泰兴] 弹窗内 DetailTemplate 的标签列宽按「同列最长标签」计算：zs-dialog provide 列数 + effectiveColumn
676. [泰兴] 机构基本信息查看页要件：busCode 走场景常量 resolver，busId 固定 companyRecordId 不随 formMode 切换
677. [泰兴] 三主体注册流程的目录/busCode 结构，以及「匿名要件上传有 upload 无 delete」的现状
678. [泰兴] 合同章节改 zs-tabs 展示：v-show 保留 DOM + 打印时强制展开全部页签
679. [泰兴] OperationBtnGroup 的 show-print="false" 关不掉已备案态的内置打印，必须用 custom-print
680. [泰兴] Unknown custom element Submit 的根因：全局组件按「目录名」注册，模板必须写 ZsSubmit
681. [泰兴] 接口字段 provinceCityArea → administrativeArea 重命名的完整落地清单（含旧字段回退与剔除）
682. [泰兴] 用户对 api/ 封装文件的态度是「按模块点名」：被点名才删，不要全局推广
683. [泰兴] HeadTitle 空数据仍占位：组件内 v-if 不够，el-card 根节点 padding 还在
684. [泰兴] 列表批量删除按钮必须走 mixin 的 multiDeleteButton，自写会同时丢禁用态与主键来源
685. [泰兴] 只读详情改用 DetailTemplate 的正确切法，以及它把数值 0 渲染成 - 的根因
686. [泰兴] 级联表单的「上游变更清空下游」清单式清空 + 选择弹窗回填要合并详情接口与列表行
687. [泰兴] 新增态附件的临时 attachGroupId 必须每次进入重新生成，否则要件挂到上一单
688. [泰兴] 同一详情组件被「本企业菜单」与「待办/主管端」共用时，取数要按路由是否有 ID 分叉
689. [泰兴] 状态列一直显示错文案：配了不存在的字典编码，dict-tag 静默降级不报错
690. [泰兴] 同源分叉剪枝：删 isSuzhouzhizai / currentEnvironment 分支时保留通用逻辑并固化业务固定值
691. [泰兴] 详情页状态字段别在 computed 里 dictLabel 转纯文本，要交给 DetailTemplate type:'dict'
692. [泰兴] 后端接口基础路径批量迁移（buildinginfo → building）：只换资源基础路径，子路径名与前端目录名保留
693. [泰兴] 多步注册/向导表单：最终提交用的必填字段必须回填到所属步骤的 rules，否则报错落在最后一步
694. [泰兴] zs-table 金额/面积列不要写死 align:'left'：amountFormatter 已由组件自动右对齐，显式对齐会覆盖表头与合计行
695. [泰兴] 侧边栏/布局尺寸有四处来源：只改 variables.css 不生效，store 用 setProperty 内联覆盖 CSS 变量
696. [泰兴] 双表同屏页面复刻 ListTemplate/table mixin 的四个坑：loading 时序、丢掉分页、selection 语义、死弹窗
697. [泰兴] el-table/zs-table 列被强行拉满导致间距过大：改 width 固定列宽 + :fit="false"，不要用 min-width 让位
698. [泰兴] [苏房] 公共 mixin 的 data 字段被子组件写成同名 computed 会 Vue warn，内嵌态应 watch 驱动 mixin 数据
699. [泰兴] [苏房] 子表「新增」按钮点击没反应：守卫里静默 return（编辑态详情不返回 projectId）
700. [泰兴] [苏房] 后端给子列表新增字典字段后，列表列/查看弹窗/编辑表单三处要一起接 dict 并做旧字段归一化
701. [泰兴] [苏房] 列表页缺 ListOperationButtonContainer 就「没有列表标题」且卡片样式与同模块不一致
702. [泰兴] [苏房] 字段中文名改名要全链路同步：列头/label/contentInfo/校验提示/placeholder/弹窗标题/变更页
703. [泰兴] [苏房] 多主体同构页：共用「内容构造器 build*ContentInfo」，页面组件仍各写各的
704. [泰兴] DetailTemplate 的 type:'amount' 只认纯数字：自由文本字段照抄会静默显示「-」并无条件拼上单位
705. [泰兴] 同源多租户条件分支（isSuzhouzhizai / currentEnvironment）下线的改法与验收口径
706. [泰兴] zs-table 空表留白的正解：table-tr 传「实际行数（含 0）」触发紧凑空态，而不是写死固定行数
707. [泰兴] [苏房] 多步骤表单的「选填」改造：strict 开关与「行已填」判定必须共用一份工具，payload 过滤空壳行
708. [泰兴] [苏房] 正则批量删 Vue 标签属性的两类必伤点：动态 :label-width 与行内 label-width="0px"
709. [泰兴] [苏房] 变更单「变更前/变更后」对比不要并排两张表：单表合并 + 状态列 + 降级匹配键
710. [泰兴] [苏房] 子表放进 zs-form 内会把整块表格一起禁用：户室/明细子表必须渲染在表单外
711. [泰兴] [苏房] 要件宫格查看态要和编辑态同源：requirement-grid 模式统一 AnnexUpload(operable=false)
712. [泰兴] [苏房] 按原型调字段顺序时要同步改「编辑表单 + 查看态常量构造器」两处
713. [泰兴] [苏房] 主表字段下沉到子表弹窗：以 project-form 传默认值，外部提取缺字段回退主表
714. [泰兴] [苏房] 行政区划选择器统一替换为 zs-region-select：值与事件语义从「label 数组」变「区划编码」
715. [泰兴] [苏房] 行政区划字段重命名为 administrativeArea 的成套改法（字典 ECONOMIC_INSTITUTIONS_REGION + 过渡期兼容）
716. [泰兴] [苏房] 列表页新增/删除一律复用 listMixins 的 addButton 与 multiDeleteButton，不要自造按钮
717. [泰兴] [苏房] 详情页按钮组迁 OperationBtnGroup 的两个隐性坑：未注册的 <Submit> 静默失效、编辑/返回不能交给 changeFormState
718. [泰兴] detail-template 标签对齐有三层默认值来源，全局改必须三处同改
719. [泰兴] DetailTemplate 一行两列改三列：span 归一化把 8 强改 12 是真正的拦路点
720. [泰兴] Failed to resolve directive: waiting → 弹窗按钮点不动的隐藏根因（废弃指令残留）
721. [泰兴] 内嵌模式（只读禁用）字段预填必须在上下文就绪后触发，并让详情回调兜底
722. [泰兴] 自写子表删除按钮会漏二次确认；补确认后必须同步 e2e fixture 的确认框处理
723. [泰兴] 登录页「加载中自动放大/跳变」根因是 JS 动态量算布局，不是 CSS 动画 → 改首帧固定尺寸 + object-fit
724. [泰兴] 按设计稿+后端实体重排表单字段：两套独立字典缺映射时不要硬做级联，先要映射表
725. [泰兴] 列表行字段加跨模块详情跳转：getRouterPathByFilePath 动态解析 + 缺 id 用 msgWarning 提示
726. [泰兴] 沙箱内 npm run build 报 emptyDir 失败与代码无关：改用临时 outDir 验证前端构建
727. [泰兴] [苏房] 三家机构「备案信息变更」busCode 对账口径：申请侧留空由列表继承，租赁域缺菜单会误用经纪编码
728. [泰兴] [苏房] 清理多环境分支（isSuzhouzhizai / currentEnvironment）的收敛套路：差异改由业务字段判定，不用环境常量
729. [泰兴] [用户偏好] 开发工具的引入标准：只要自动触发、零配置、零额外工作量的能力
730. [泰兴] zs-table 选中行高亮失效的三处根因（setCurrentRow 不在组件上 / row-class-name 被内部覆盖 / 选中类无样式）
731. [泰兴] 详情页水平留白从 .collapse-content 挪到「直接子元素白名单」会漏掉表格区与 zs-form
732. [泰兴] variables.css 与 variables.scss 双份主题变量的收敛：只留一份 CSS 变量，冲突以「实际生效值」为准
733. [泰兴] 要件宫格上传改 picture-card：删除后列表回弹的根因是 getList 不同步返回
734. [泰兴] 同构注册页顶栏不统一时抽 RegisterPageHeader，用 testId prop 保住 e2e 断言
735. [泰兴] 变更单详情审核按钮不出现：工具栏 bizState 不能用变更单上的 bizState，要看 displayStatus
736. [泰兴] 选择类弹窗回填必须遍历「本次选中行」，不能遍历 selectList 全量（换接口时顺手修的老坑）
737. [泰兴] 明细页冗余汇总字段（现售面积）在本地增删行后必须前端重算，不能继续读接口旧值
738. [泰兴] 把 Headline 水平留白改成「直接子元素白名单」会静默丢掉表格/表单的 padding：改前必须枚举所有 slot 根节点
739. [泰兴] 全局详情页间距 token 化的副作用：collapse-content 的 el-row flex 规则会误伤 Headline 内 zs-search-form
740. [泰兴] 折叠区搜索条例外规则要同时覆盖 detail-container 与 detail-from-container 两条父链
741. [泰兴] 注册流程匿名态要件删除统一走 deleteAnonymous（appendixIds 数组），登录态仍用 deleteAppendixBatch
742. [泰兴] 共用内核列表页的 organType 要在入口页用 prop 显式钉死，不能只靠 Provider/路由 meta 解析
743. [泰兴] 审批流程抽屉固定宽度会截断节点名：按节点数与最长名估算宽度，加载完成后再加宽
744. [泰兴] 行政区域列显示成 6 位代码：接口字段有「字典值/区划代码」双形态，dictFormatter 未命中要回退区划全称
745. [泰兴] 双入口共用列表页的标题不要硬编码：取路由 meta.title 拼接，并处理重复后缀与空标题
746. [泰兴] 变更单只切了附件 busCode、没切流程 busCode：审批会走备案流程或报「流程未配置」
747. [泰兴] 页面编辑门控的状态集合必须与操作按钮组（OperationBtnGroup）的可提交集合一致，否则已驳回单改不了
748. [泰兴] 变更单用「页内变更态」而非新路由页：getLast 幂等取单 + 一次性切换 businessName/primaryKey/busCode/附件 busId/提交接口
749. [泰兴] 备案状态被后端拆成 bizState + cancelStatus 时，前端做「派生状态码」统一展示，不要改筛选参数
750. [泰兴] 弹窗内搜索栏也必须用公共 zs-search-form：靠新增 borderless prop + resetFields() 扩展，不另写一套 zs-form
751. [泰兴] 后端把行政区划「拼接串」换成字典码字段时，在共享字段配置的归一化层做映射，三处消费点同步改
752. [泰兴] 弹窗内表单 label 右对齐要全局修：zs-form 映射改「非 top 即 right」+ .el-dialog__body 选择器排除 top 布局
753. [泰兴] V3 新建接口把主键放在 data 字段：解构 { id } 得到 undefined，导致后一个接口缺合同主键
754. [泰兴] 详情页/弹窗间距统一到两级 CSS 变量（16px 区块 / 12px 行距），并清掉页面级 scoped 间距
755. [泰兴] 函数式弹窗 mount shell 的四个高频缺陷：opening 锁无 try/finally、$listeners 双转发、成功分支重复 close、catch 吞掉 already_open
756. [泰兴] [苏房] 管理员管理双入口 organType 串值：Provider 缺席时 resolveOrganType 的默认回退落到了错误分支
757. [泰兴] [苏房] 顶栏点目录时「唯一可见子菜单直接激活」：可见性过滤 + 单子项链递归的菜单解析套路
758. [泰兴] [苏房] 全选显示 (0/2) 但列表有 3 行：勾选弹窗的分母/模式判定混用了三个数据源，且行 key 重复
759. [泰兴] [苏房] 把详情页某字段抽成独立区块（业务范围）：omit 去重 + 查看/变更两条链路都要透传字典 options
760. [泰兴] zs-table 列表列不要写死 width：定宽会让表头省略号化，去掉后走内容测算
761. [泰兴] 多菜单共用同一个 detail.vue：pathHint 只取 path 末段会让详情路由互相抢占
762. [泰兴] 按设计稿删掉子表 UI 区块时，必须保留该子表数据的加载与回传，否则改主表会清空历史
763. [泰兴] 页面本地静态选项改后端字典：先写 normalize 兼容旧编码，再复核联动条件
764. [泰兴] [苏房] zs-operate-column 不要传固定 :width，交给组件按按钮文字自适应（列表操作列过宽的根因）
765. [泰兴] [苏房] 开发企业注册营业期限「长期」选项已被产品否决：删除字段需表单/校验初始数据/企信通映射/E2E 四处同步
766. [泰兴] [苏房] 删除楼幢复用主表 /save 持久化的三个隐患：隐式全量提交、并发竞态、汇总字段不回填
767. [泰兴] 要件上传网格同一行卡片高度不齐：根因是右侧操作区被条件渲染、一列有一列没有
768. [泰兴] 变更类详情页「修改」按钮不显示：必须用独立的 changeBizState，不能读备案单的 form.bizState
769. [泰兴] 「一行三列」栅格失效：el-col 被 div 包裹就脱离 el-row 栅格上下文
770. [泰兴] location-cascader 报 Missing required prop "region" 且历史区划不回显
771. [泰兴] 弹窗改「一行一列」只改 span 无效：el-col 必须是 .zs-form 的直接子级
772. [泰兴] 多步注册改「一步提交」：必须按各 step 的 DTO 逐条对齐，organType 与经营地址最易漏
773. [泰兴] 注册页暂存续办/详情态上传附件的 busId 必须换成真实 companyRegisterId
774. [泰兴] 字典未配置导致 el-radio-group 只有标签没有选项：固定语义状态改本地常量 options
775. [泰兴] 表单跨列对齐不要用 el-row+span，改用 section-form 的 section-field / --wide / --full
776. [泰兴] zs-select-column 全局注册与分页多选表契约：必须配 row-key，无用勾选列要删
777. [泰兴] DetailTemplate 的「独占一行」字段必须把栅格游标归零，否则后续字段列下标错到第 3 列、label 不对齐
778. [泰兴] zs-search-form 配置项漏写 model 会让 rules 与取值彻底脱钩（日期区间尤其容易踩）
779. [泰兴] 校验规则依赖另一个字段（如收费类型）时：rules 改 computed + watch 触发重校验 + 动态 placeholder
780. [泰兴] 列表页靠 ListTemplate 字符串 + 三段 replace 改造：同源页必须保持替换片段一致，不能各写一版
781. [泰兴] 删除详情页子表 UI 后必须同步收敛提交载荷：全量替换语义下会静默清空历史数据
782. [泰兴] zs-table 的 switch 自定义列固定宽度 60px 装不下开关，会画进右侧列（改 FIXED_TYPE_WIDTH 组件层）
783. [泰兴] 经纪机构从业人员「已注销」态的操作列矩阵：只留查看+删除，状态判断要收进公共 helper
784. [泰兴] 纯名称字段改下拉：复用注册页的品牌接口，并按名称反查回填 ID（详情只回传 brandName）
785. [泰兴] Vue2 项目 this.dayjs is not a function：index.html 全局脚本引入 ≠ 挂到 Vue 原型
786. [泰兴] 字典值的表格展示与打印/PDF 导出是两条链路：列上 type="dict" 覆盖不到打印稿
787. [泰兴] 弹窗里「搜索/重置」按钮上下堆叠：全局满宽规则的副作用要在 element-ui.scss 里加 button 例外
788. [泰兴] zs-dialog 弹窗内两列布局不生效的根因：.form-box 里 .zs-form > .el-col 被强制 100% 宽
789. [泰兴] 操作列按钮配色档位约定：只有「删除」用 danger，次要操作只给 plain，禁用 type:'warning'
790. [泰兴] zs-search-form 搜索区列宽由 formItems 的 item.layout 决定，默认「只有 2 项时各占半行」
791. [泰兴] 同页多个要件包（注册包 + 开业包）时必须逐包传 admin-type，且提交校验要覆盖每个 busCode
792. [泰兴] 变更单详情用「合并主备案整表」做 fallback 会把主表 bizState 覆盖进 form，编辑态被永久禁用
793. [泰兴] [苏房] 子表操作列手写 zs-table-column + fixed="right" 会让内容与相邻列叠字穿透，必须换 zs-operate-column
794. [泰兴] [苏房] zs-tabs 重型子面板要用 v-if 懒渲染而非 v-show，且切到该 Tab 时首屏要主动拉数据
795. [泰兴] detailMixins 的 validateDetailRequiredParams 强塞 primaryKey，会让「不需要 id 的详情接口」被静默跳过
796. [泰兴] 函数式/内嵌选择弹窗挂在 v-if 下时 watch(visible) 不触发首次加载：mounted 兜底 + buildQueryParams 只传有值字段
797. [泰兴] SubTableToolbar 注册到 zs-tabs 页签栏后，按钮的 disabled/title 不随行勾选变化（Vue2 实例缓存导致祖先不重渲染）
798. [泰兴] 新增页「一进页就弹提示」多因字典初始化函数里发了 message；依赖父字段的选择项要「先禁用、选完再开弹窗选择」
799. [泰兴] 楼栋选房弹窗：房屋状态字段双命名归一后，展示与可选性判定必须同源
800. [泰兴] 详情页查看态与编辑态字段数量不一致：contentInfo 的 add() 不能过滤空值
801. [泰兴] 接口前缀禁止按当前路由名推断：同一页面的列表/弹窗/删除应固定同一个常量前缀
802. [泰兴] 「查看」按钮灰显不等于权限问题：关联单号要 extractXxxId 多字段解析，并允许父单据 ID 兜底
803. [泰兴] zs-dialog 宽度档位：zs-size=medium(1300px)/common(900px)/mini(616px)，页面禁止写死 width
804. [泰兴] 企业端「变更」壳页面编辑态必须 show-back=false：返回会跳到无权限的 G 端列表
805. [泰兴] [苏房] 表单子区块组件误 mixin detailMixins：每条实例都发 /undefined/undefined/detail 并拉无关接口
806. [泰兴] [苏房] 「证号 + 隐藏外键 ID」成对字段：切父级必须清空、必填校验要落到 ID 上
807. [泰兴] [苏房] 清空外键写成 undefined 会被 JSON.stringify 整体省略，后端收不到=解绑失败
808. [泰兴] [苏房] 树+表二级联动的选择弹窗：zs-select-dialog 自定义 #left 插槽 + no-auto-query
809. [泰兴] [苏房] 证明/证书类文件下载按钮：统一走接口拿地址，显隐看证明字段而非只看机构类型
810. [泰兴] [苏房] 列表页把搜索项换成业务状态下拉：listMixins 的搜索缓存会残留已删除字段继续传给后端
811. [泰兴] [苏房] 单据「复制/引用新建」的完整套路：sessionStorage 预填 + Vuex 来源单号 + 剥离审计字段
812. [泰兴] [苏房] 改了提交接口默认值仍打旧接口：resolveSubmitApi 的「配置优先」链会覆盖回退值
813. [泰兴] [苏房] 页面内「发起变更」后提交误用备案主键：operation-btn-group 缺省会回退路由 id
814. [泰兴] V3 的 UI 约定靠 check:* 脚本门禁，全量 npm run lint 不能代表单个文件；label-width / label-position="left" 在模板中被禁
815. [泰兴] 接口路径互为前缀时，E2E waitForResponse 用 includes 会误命中：改为 URL pathname.endsWith 精确匹配
816. [泰兴] AmountInput 是 zs-input + v-money 而非 input-number：替换 zs-input-number 时会静默丢失 min/非负等数值约束
817. [泰兴] 雪花 ID 精度丢失的另一类根因：getDetailParams 里主动 Number(this.id) 绕过了项目既有的安全 ID 链路
818. [泰兴] 一份详情页同时承载备案与变更：busCode 用显式 resolve 函数按态区分，不再读菜单 meta.busCode
819. [泰兴] 动作语义不同的弹窗不要复用通用「状态调整」弹窗，按模块规范新建专用弹窗
820. [泰兴] 多来源详情页的附属只读字段没回显：主数据块取了但没写回 form，需统一的映射+空值补全函数
821. [泰兴] 要件「查看态」与「编辑态」字段顺序不一致：排序规则只落在查看链路，应下沉到 utils 并让两态共用
822. [泰兴] 金额小数位有两条通道：amount-input 的 dot 只管编辑态，查看态必须单独 formatter 格式化
823. [泰兴] zs-table-column 不支持多级表头：模板未转发 default 插槽，分组表头必须用原生 el-table-column
824. [泰兴] Unknown custom element: <pagination> 的根因是 mixin 里局部别名注册，解法是全局注册 zs-pagination 并批量替换标签
825. [泰兴] [苏房] 老自研选择弹窗迁到 zs-select-dialog 的三处回归：treeKey 覆盖筛选参数、onOpen 抢跑查询、丢失链接直选
826. [泰兴] [苏房] 弹窗表单双列栅格改造：嵌套顺序要 zs-form→el-row→el-col，且模板禁写 label-width（有 lint 门禁）
827. [泰兴] [苏房] 字典类搜索项要用 type:'dict'，且异步字典加载后必须校验默认值是否在枚举内
828. [泰兴] 同一业务字段在列表与详情绑定两套字典码：对账状态 reconciliation_state 的统一口径
829. [泰兴] 附件要件「下载模板」：fileTemplate 逗号路径解析 + fetch→blob 下载能力下沉到 utils
830. [泰兴] 派生字段（maxBatchNo+1）不回填的两类根因：旧构建未生效 与 草稿恢复覆盖自动计算值
