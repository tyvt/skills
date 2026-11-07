# 无锡市区G前端仓库
无锡市区G（关联无锡市智慧物业服务平台/三资监管）前端主仓库，使用 zhi2-web-admin 作为子模块，当前工作分支 develop/v2.6.1。

## 仓库结构
- 主仓库（superproject）为无锡市区G，子模块为 zhi2-web-admin
- 子模块改动提交后，父仓库更新 gitlink 指针并推送
- 分支：develop/v2.6.1（本会话修复用户管理列表时所处分支）

## 打 Tag 约定
- tag 只打在父仓库，子模块可不打 tag
- 命名格式为本地时间戳 `YYYYMMDDHHmm`，如 `202611051818`
- 父仓库提交含子模块指针后，在父仓对应提交上打 tag 并推送
- 实例：修复用户管理右侧不渲染后，父仓指针 7a93899 打 tag 202611051818

## 关联信息
- 子模块修复提交：4a3342506 + 合并 cb854ea7b
- 父仓库指针：7a93899（更新 zhi2-web-admin 子模块指针）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "wuxi_shiqu_g",
  "source_extraction_id": "3e5a9faa2d89494b8d41a3f53e2d3b2b",
  "version": 1,
  "memory_type": "entities"
}
-->