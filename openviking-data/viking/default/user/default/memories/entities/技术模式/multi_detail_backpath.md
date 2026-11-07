# 多详情菜单共享列表的返回路径截断坑
苏住房G整改通知书等详情页点「返回」报「页面未授权或不存在」，根因是同一列表按字典拆出多个详情菜单时截断路径落到未注册兄弟路径。

## 现象与根因
- 信用管理-整改通知书详情页点「返回」报「页面未授权或不存在」，从待办打开时尤其必现
- #198 记录的「用截断路径回列表页而非 go(-1)」本身没错，但同一列表按 source_dept 拆成 detailA/detail0/detail1/detail2 四个组件路径、四个菜单
- 详情路由 path 中间段随拆分分化，单纯截掉末段业务主键得到 `../detail1` 之类的兄弟详情路径，无对应菜单或未被注册，router 落到 catch-all 报未授权
- meta.activeMenu 也可能缺失，截断结果无从纠正

## 解法与边界
- 在统一的 getBackPathFromRoute 里按「权威优先」分层兜底：① 先按 routeMeta 详情识别用列表菜单 filePath 经 getCurrentRouterByFilePath 反查真实列表 path 并去掉 :tableid 占位符
- ② 再试 query.backUrl；③ 再试 meta.activeMenu；④ 最后才截断路径，且截断后必须用 isRegisteredRoutePath 复核
- 未注册则按 meta.filePath 把 /detail 换成 /index 再反查一次
- 本条根因是「多详情菜单共享一个列表」，不是 #198 的「截断路径本身取错」；解法是引入「按 filePath 反查路由」的正向权威来源，而非在路径字符串上打补丁

## 验证与归属
- 会话 35fa87f5：用户报「信用管理-整改通知书，查看详情后点击返回报页面未授权或不存在」
- 修复提交 6f33429af（fix(rectificationNotice): 修复整改通知书详情页返回跳转错误）
- 涉及文件：zhi2-web-admin/src/utils/sidebarActivePath.js、zhi2-web-admin/src/views/evaluation/rectificationNotice/constants.js、routeMeta.js、zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- 所属项目：苏住房G；代码基线：415629d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multi_detail_backpath",
  "source_extraction_id": "76e464440c524a74abc39276f53511b5",
  "version": 1,
  "memory_type": "entities"
}
-->