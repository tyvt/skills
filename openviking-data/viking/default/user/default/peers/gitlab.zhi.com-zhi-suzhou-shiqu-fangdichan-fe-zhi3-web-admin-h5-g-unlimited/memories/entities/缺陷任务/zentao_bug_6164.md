# 禅道Bug 6164 监管账户开户网点过滤修复
房产管理系统zhi2-web-admin中监管账户开户选择开户网点时，承办银行已选"中国银行"但网点列表展示全部银行网点的缺陷任务（首轮修复还含弹窗高度留白修复）。

## 根因（2026-11-06 重新定位）
- 承办银行表 T_JG_WORK_BANK.bank_num 是各网点自身联行/网点码（如 736222218），并非联行表 SYS_UNION_BANK.bank_code 的大行代码（中国银行=104、02）
- 首轮修复(22b174619)把承办银行 bankNum 当 bankCode 传给 /system/unionBank/page 做 eq 匹配，永远命中不了 → 退化为返回全部网点
- 无过滤返回 133,831 条，正是截图"共133819条记录"，故激活备注"依然是所有银行网点"
- 正确做法：用承办银行名称 bankName（如"中国银行"）匹配 SYS_UNION_BANK.bank_name（8855 条覆盖全部网点）

## 修复方案（2026-11-06 正确修复）
- 前端 BranchOneDialog.vue：非树模式改为按承办银行名称 bankName 匹配联行表 bank_name 过滤；加 workBankId 兜底
- 前端 mainAccount/detail.vue、regulatoryAccountNew/detail.vue：去掉误用的 bankCode 传参
- 后端 SysUnionBankQueryDto 新增 workBankId；SysUnionBankServiceImpl.page() 仅带 workBankId 时反查承办银行名称作 bankName 过滤
- 后端 RemoteBankBranchService 新增 getBankNameByBankId（含降级）+ BankBranchApiImpl 实现，兜底前端只传 ID 场景
- 首轮修复(22b174619)另含弹窗 tableScroll:true 高度留白修复，已随首轮提交合入

## 提交与验证（2026-11-06）
- 前端 zhi2-web-admin develop/v3.0.0 提交 05584971e，已推送（merge 后 ede3cecfc；当前父仓库子模块指针 d925273f9 已包含该修复）
- 后端 feature/feat-ligy-260825 提交 4432d357（rebase 后），已推送
- 前端 lint 通过、生产构建成功（vite 8.3.5），dist 部署本地 nginx 站点 http://127.0.0.1:8098（version.json gitHash a2862e39c）
- 后端 common-api/common-framework/zhi3-prefund 编译通过（JDK21）
- 真实库验证：按"中国银行"过滤后 8,858 条（仅中国银行网点），替代全量 133,831 条

## 禅道回写
- 2026-11-04 首轮回写（错误修复）：status=resolved, resolution=fixed, resolvedBy=tiany, assignedTo=zhunan, resolvedBuild=trunk, 操作记录 id 87188
- 2026-11-06 二次回写（正确修复，action 88471）：DBX 事务提交，status=resolved, resolution=fixed, assignedTo=zhunan, resolvedBuild=trunk，附根因+修复+验证说明

## 第三次定位与修复（2026-11-10）
- 前两轮修复（87188/88471）改的是 mainAccount 和 regulatoryAccountNew，但测试人员实际用的是旧版监管账户开户页 supervision/agreement/account/detail.vue
- 根因：该页 showVisionOfBank() 打开「开户网点」弹窗时只传了 workBankId，未传 bankName；客测环境后端按 workBankId 反查承办银行名称的兜底未生效，bankName 为空导致 /system/unionBank/page 不加过滤返回全量网点（133819 条），选中国银行仍显示工商银行
- 修复：agreement/account/detail.vue 的 showVisionOfBank() 补传 bankName: this.form.bankName，由联行表 SYS_UNION_BANK.bank_name 模糊过滤，不再单靠后端反查兜底；后端 SysUnionBankServiceImpl.page() 已支持 bank_name LIKE（commit 4432d357），无需改动

## 提交与验证（2026-11-10）
- 子模块 zhi2-web-admin develop/v3.0.0 提交 988a5d2f5（fix），已推送；父仓库提交 e618b66（仅更新 gitlink 指向 988a5d2f5），已推送；期间远端有他人新提交，正常 merge 集成（非强推），父仓库子模块指针冲突按「我的 988a5d2f5（含远端子模块全部提交+本次修复）」解决
- 验证：目标文件 eslint 0 error；生产构建 node scripts/vite-build.mjs build EXIT=0；真实库 SYS_UNION_BANK 共 133831 条，bank_name LIKE '%中国银行%' = 8858 条（仅中国银行网点）

## 禅道回写（2026-11-10 第三次）
- 2026-11-10 08:21:52 第三次回写：DBX 事务提交，status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan、resolvedDate=2026-11-10 08:21:52，新增 zt_action id=89871（action=resolved，备注含根因/修复/提交号/验证/待回归）；用户再次要求回写时复核确认已落库，无重复回写

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6164",
  "source_extraction_id": "d88727c74486422985a77561984ad270",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->