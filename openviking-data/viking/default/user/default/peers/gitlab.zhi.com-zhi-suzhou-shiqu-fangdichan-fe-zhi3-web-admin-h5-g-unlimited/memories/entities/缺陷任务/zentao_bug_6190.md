# 禅道Bug 6190 价格备案申请备案总价长度限制
房产管理系统价格备案申请-「编辑房屋备案价格」弹窗备案总价字段无长度限制，超长输入致后端数值溢出返回500。

## 根因
- 页面 zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/PriceTableDialog.vue
- 「备案总价」字段(recordAmountNew)仅用 v-money:2 做千分位格式化，无 maxlength/长度限制
- 用户可输入超长数字（截图示例 302,222,222,222,222,222,222,222.…），提交至 /api/v3/presale/recordPriceHouse/update 时后端数值溢出 → 500 服务器异常
- 菜单：项目管理 → 价格备案；弹窗由备案申请列表页「编辑房屋备案价格」触发

## 修复方案
- 备案总价输入框增加 @input="handleRecordAmountInput"：整数部分最多10位，超出自动截断（粘贴同样生效），从源头阻止超长提交
- 表单校验规则补充：整数部分超10位提示「备案总价整数部分不能超过10位」，替代后端500
- 纯新增33行，未改动任何无关代码

## 验证与交付
- npm run build 通过（exit 0），仅 Sass 既有弃用告警
- eslint：仅命中既有问题（第7行缩进+el-form-item告警），无新增
- nginx 8098 部署，HTTP 200，新构建已加载
- 子模块 zhi2-web-admin：f3c67f86b fix → 合并远程后 b8cd24a67，develop/v3.0.0 已推送 origin
- 父仓库：gitlink 3d14e92 推送 develop/v3.0.0；两仓库均同步(0/0)
- worktree D:\repository\szfc-v3-wt-bug6190 已 git worktree remove 清理，无残留

## 禅道回写
- bug 6190：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=lichandan（原提交人）
- 新增 zt_action id 87247（action=resolved），comment 记录根因/修复/验证说明

## 未验证项
- 未做浏览器内实际点击验证（需登录真实环境输入超长值复测）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6190",
  "source_extraction_id": "42d9385a2a88453a8fdeede2c112aedb",
  "version": 1,
  "memory_type": "entities"
}
-->