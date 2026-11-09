# 禅道Bug 6382 现售合同新增合同户室缺失
禅道Bug 6382：zhi2-web-admin现售合同签订「新增合同」弹窗选房时户室302不在表格显示，后端返回6条含302，2026-11-09 AI助手排查中。

## 缺陷概况
- 禅道链接：http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6382
- 模块路径：合同网签-现售合同签订（contractMainInfo）「新增合同」弹窗选房
- 现象：选楼幢后表格仅显示部分户室，户室302（houseId 2117135233733548547）未出现
- 后端返回6条记录：封闭空间、架空层、201、202、301、302，total=6

## 疑似根因（排查中）
- contractMainInfo/components/chooseHouseDialog.vue 初始化 pageSize=5，并用 paginateRows 按 pageSize 切片
- 兄弟组件 contractView/components/chooseHouseDialog.vue 正常：pageSize=10 且 originData=rows 不做切片，靠 zs-table 内部滚动
- 6条户室且 pageSize=5 时 paginateRows(rows=6,total=6,pageNum=1,pageSize=5) 切片为5条，第6条302被丢弃
- 截图页脚显示「10条/页，共6记录，第1页/共1页」，与切片假设有矛盾，待运行时复现确认

## 排查与处理
- 2026-11-09 创建独立 worktree 排查；存在并行任务 bug-6379 的 worktree（未触碰）
- 疑为 #6235 修复引入 paginateRows 切片后的回归，需与正常兄弟弹窗对齐

## 关联
- 关联禅道 #6235（同弹窗户室分页，已修复引入 paginateRows）
- 关联文件 chooseHouseDialog.vue 两个实例：contractMainInfo（疑似缺陷）与 contractView（正常）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6382",
  "source_extraction_id": "ee5b65bbddc44cf8bdb5a36aa53d05bb",
  "version": 1,
  "memory_type": "entities"
}
-->