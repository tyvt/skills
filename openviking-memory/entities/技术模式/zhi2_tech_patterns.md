# 园区公共收益技术模式汇总
园区公共收益项目前端技术模式与修复点集合。

## 技术模式与修复
- ComplexPhoto 四点位、子表表单传递、视图高度切换、监管链接初始化
- 资金缴费通知单合同名跳转、自治通知单动态路由、提交审批 URL 移至 flowApi
- 弹窗窄列分页换行修复、银行明细日对账回单视图拆分、弹窗批量提示与表单并排换行修复
- todo 驳回前缀规范、撤回 approvalApi 校验、landPlotCode 写入 zs-remark 头、银行回单列镜像错乱、todo 驳回红渲染、用户角色下拉误传 roleType、营业用房业务状态过滤、账户明细弹窗三块表单绑定
- 楼幢表视图楼层单元不匹配列修复、前端解密密钥配对规范、全局请求自动附加路由 meta 菜单头、弹窗表格底部遮挡修复
- 备案详情创建工人入口、账户类型 dictValue 不匹配、detailMixins 表单缓存跳过
- 资产部分同路由跳转无响应与路由名误判、业委会物业费证明按业主身份必填、文件内容检查非必填致缺星号
- 空物业区域列表无弹窗改为 warning、mathjs 加空 ||0 兜底、Object prop 未 merge 默认致 treeMethod 错误
- 附件抽屉硬编码 z-index 阻塞全局图片预览、楼幢关联弹窗统一列兼容
- zs-table 单元格事件未空值检查错误、zs-operate-column 未声明 attr 警告、通知单年份字符串/数字严格相等失败、bash 脚本引号截断诊断
- 选择弹窗辅助链接 Optional 路由、B 端过滤逐页注入、B 端监管链接初始化
- 用款申请弹窗区域列需字典格式化、支出合同弹窗区域列缺字典格式化
- 银行回单查询未对账检查阻塞已对账查询、银行回单已对账行错误显示核销按钮
- 车位类型过滤覆盖字典致数字显示
- 折叠容器 margin 覆盖与间隔元素丢失页面间距
- 街道/社区编码全局自动转中文名：common store 预加载 subdistrictList/communityList，formatters 新增 subdistrictFormatter/communityFormatter，zs-table-column 自动应用（来源会话 a6aae663）
- houseTable.vue 删除按钮修复：canOperate 统一判断 bizState==0，批量/单行删除受控（来源会话 f1d10e9a）
- 业委会成员查看弹窗缺任命结束日期
- 楼幢授权弹窗表格复用 zs-table 样式
- complex detail 综合查询按 PM 决定移除
- zs-file-upload MIME 映射与驼峰 prop 修复支持 PDF
- 打印附件相对路径 via resolveServerAssetUrl
- 路由 meta 标题回溯操作日志模块
- complex detail recordName 合并备案名称+物业管理区域名称，移除 complexName 必填
- 表格去竖线及弹窗样式统一：houseTable 等去 border 仅留横线；subAdvertiseDialog 等去 Headline 边框、查看态 DetailTemplate :border=false、底部按钮右对齐、overflow:hidden 防遮挡；pubPaymentNotice/detail.vue 去通知书字段 align center（来源会话 e326e1ef）
- 物业管理区域项目类型校验无提示修复：projectTypeRules.js 新增 createProjectTypeRules，complex/detail 与 complexChange/detail 替换分散 rules（来源会话 76645e4d）
- 项目引用跨多个技术模式记忆，详见各模式来源会话。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_tech_patterns",
  "source_extraction_id": "4e197fd9c17d47ec9857dc89e475924b",
  "version": 1,
  "memory_type": "entities"
}
-->