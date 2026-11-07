# 子模块detached HEAD上的业务提交迁回命名分支
在 zhi2-web-admin 子模块内若在 detached HEAD（例如基于 develop/v2.6.2 的临时检出）完成提交，该提交不会落在任何分支上。

## 现象
- detached HEAD 上的提交不归属任何分支，易丢失或被忽视

## 恢复方式
- checkout 目标分支（如 develop/v2.6.2-yulin）
- 对 detached 上的提交 hash 执行 cherry-pick
- 成功后更新父仓库子模块指针并单独提交父仓

## 关联信息
- 验证证据：会话 adafa51d 提交 b2d27db21 在 detached HEAD，cherry-pick 到 develop/v2.6.2-yulin 得 8eff3cf75，父仓指针待提交
- 涉及文件：zhi2-web-admin、产品2.0 父仓库 .gitmodules
- 所属项目：2-0
- 来源会话：adafa51d-9fd4-491b-8176-bd3b8fbd7728
- 代码基线：产品2.0 develop/v2.6.2-yulin

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_detached_cherrypick",
  "source_extraction_id": "e48a8732da734876864af7434cc9e0e7",
  "version": 1,
  "memory_type": "entities"
}
-->