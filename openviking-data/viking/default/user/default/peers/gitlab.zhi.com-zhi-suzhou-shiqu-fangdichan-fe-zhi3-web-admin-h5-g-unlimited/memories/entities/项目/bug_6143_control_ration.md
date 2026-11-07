# Bug 6143 控制百分比保留2位小数修复
苏州房产监管后台 zhi2-web-admin 中监管标准管理详情/编辑页「控制百分比」字段需保留2位小数的缺陷修复。

## 问题背景
- Bug 6143：预售资金监管银行-监管协议-监管标准管理，severity 3，提交人 zhunan
- 现象：监管标准管理详情/编辑页「控制百分比」输入框回显后端高精度值 17.466525245354，期望保留2位小数
- 根因：detail.vue 中控制百分比字段编辑态未加 v-money:2、查看态用 type:'text' 原样展示、加载与提交未对 controlRation 舍入

## 修复方案
- 编辑态输入框增加 v-money:2，失焦/回显格式化为2位小数
- 查看态 contentInfo 由 type:'text' 改为 type:'amount', dot:2, unit:'%', align:'left'
- 新增 toFixedRation2() 方法，在 getDetail 加载与 submitForm 提交前对 controlRation 四舍五入保留2位
- 改动文件：zhi2-web-admin/src/views/supervision/agreement/version/detail.vue（14增2删，单文件）

## 验证与提交
- ESLint 0 error（17条存量 warning 为 el-form-item/zs-form-item 偏好类，与改动无关）
- npm run build 通过（gitHash 6d60eb581，develop/v3.0.0）
- 子模块 a7cb8056c..6d60eb581 推 origin/develop/v3.0.0；父仓库 7334b7a..bd069e7 推 origin/develop/v3.0.0
- 禅道回写：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan、resolvedBuild=trunk、action#86857
- 未做交互目视验证（本地 API 网关 127.0.0.1:8080 未运行，8098 站点接口 502）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "项目",
  "name": "bug_6143_control_ration",
  "source_extraction_id": "ccc03f02bd19474faa1265ba9d02f080",
  "version": 1,
  "memory_type": "entities"
}
-->