# zhi2-web-admin 缺陷修复索引
zhi2-web-admin 子模块历次禅道 bug 修复的改动点、提交与禅道状态（项目本体与构建见 zhi2_web_admin 实体）。

## 修复记录（6112–6180）
- #6112 监管账户开户详情页（supervision/agreement/account/detail.vue，服务开户070401/销户070402）只传 :show-approval 未传 :show-audit 致开户单显「流程查看」；新增 :show-audit=“opensalesType != 'ACCOUNT_OPEN'” 同口径隐藏；子模块 a7cb8056c、父仓库 7334b7a；禅道 resolved 指派 zhunan
- #6128 changeDetail.vue 缺「楼幢类型」字段（菜单 projectManagement/buildingChange/detail.vue 薄封装），插入 zs-select（building_type 字典、必填、v-tooltip 新旧值），子模块 46d1d0cb5；#6143 监管标准管理详情/编辑页「控制百分比」保留 2 位小数（v-money:2、toFixedRation2），子模块 6d60eb581；#6147 预售许可申请退回后移除「电子签」按钮并加提交去签章门控，子模块 99cf5f75f、父仓库 d8ad5b0
- #6155 土地使用权证号 placeholder 文案修正（permit/plan + cashsale/plan），子模块 ec1a252c5、父仓库 bad38a5；#6159 形象进度弹窗附件行 CSS 对齐，子模块 886b9e437、父仓库 82fb987；#6160 预售许可受理详情页关通用「审核」按钮（:show-approval=false），子模块 8510f1e96、父仓库 fdcfcf6
- #6163 提交后切查看态隐藏保存按钮（changeFormState('view')），子模块 bf1dde633、父仓库 a7840ef；#6179 现售备案隐藏「电子签」按钮，子模块 cfe2fb985、父仓库 85d5d75；#6180 业务状态数字转中文加预售许可按钮显隐与提交后刷新，子模块 de6ee70bb、父仓库 ee64811

## 修复记录（6190 起）
- #6190 价格备案申请「编辑房屋备案价格」弹窗备案总价(recordAmountNew)无长度限制致超长输入后端溢出 500；PriceTableDialog.vue 增 @input 截断整数 10 位加校验规则；子模块 f3c67f86b（合 b8cd24a67）、父仓库 3d14e92
- #6476 企业基本信息表单品牌原值为空仍显示红三角与空提示，AgencyBasicInfoForm.vue:107,362-366 修复，子模块 9a324be7f、父仓库 a04cda3，禅道 resolved/fixed 回指 zhunan（action#98559，附图 verify-zoom.png fileID 24049）
- #6891 人事变更单详情改由薄壳按 meta.busCode===jgcyrybg 分发渲染 AgencyPersonnelDetail；2026-11-24 单文件 eslint exit 0、build 产物 gitHash 9a324be7f，前端改动尚未提交；阻塞于后端 400 与 dev 库凭据，未回写禅道，交 hop8 续（详见 zhi3_admin_h5、fangdichan_backend 实体）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷修复索引",
  "name": "zhi2_web_admin_bugfix",
  "source_extraction_id": "0b0b9d460a884399bd77607e85481cf4",
  "version": 1,
  "memory_type": "entities"
}
-->