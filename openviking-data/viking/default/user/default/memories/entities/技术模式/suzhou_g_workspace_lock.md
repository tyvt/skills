# 苏住房G根仓npm workspaces锁文件冲突
苏州V3仓库根（zhi2-web-admin父仓）为npm workspaces容器，加private:true并新增yarn.lock后导致锁文件并存、install结果取决于包管理器。

## 问题现象
- 根package.json加"private":true并新增根级yarn.lock（3673行），仓库同时有package-lock.json与yarn.lock
- 谁生效取决于最后谁执行install，易出现本地装A版、CI用另一把锁装B版的差异
- 子模块node_modules被提升到根目录导致路径级差异

## 根因
- workspaces容器带private:true时，npm与yarn都将其当不可发布工作区根，各自接管依赖图并写自己的锁文件

## 解决做法
- 根目录只保留一把锁，跟随团队实际使用的包管理器，另一把不提交
- private:true只做发布保护，不要顺手切换包管理器
- 装完依赖核对子模块zhi2-web-admin/node_modules与根node_modules提升情况，构建仍须进入子模块执行
- 提交时子模块指针与父仓锁文件属两次独立提交，不要混在一起

## 验证与归属
- 验证：会话580b69ca根package.json新增"private":true并新增根级yarn.lock（v1，指向registry.npmmirror.com），仓库本身已是npm workspaces结构
- 涉及文件：package.json、yarn.lock、zhi2-web-admin/package.json
- 所属项目：苏住房G；来源会话：580b69ca-8f1a-46c6-b741-7d3f3fe10ff3；代码基线：359acba

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_g_workspace_lock",
  "source_extraction_id": "89bde800f6fd4be7996bc80e03c166d2",
  "version": 1,
  "memory_type": "entities"
}
-->