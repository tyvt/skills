# Git标签冲突处理
苏住房G 父仓库中本地标签与远程同名标签冲突导致 git pull --tags 报 would clobber existing tag 的处理方式。

## 问题原因
- 本地已有标签 20260509 指向 923ad74，远程同名标签指向 b14aecd。
- git pull --tags 默认不会覆盖本地标签，因此报错。

## 处理步骤
- 在父仓库苏住房G执行 git tag -d 20260509 删除本地冲突标签。
- 执行 git pull --tags origin develop/v2.6.0 重新拉取分支与标签，分支显示 up to date。
- 若需一律用远程标签覆盖本地，可用 git fetch --tags --force origin 再 pull。
- 若想保留本地标签内容，应改用别的标签名而不是覆盖远程。

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G。
- 涉及文件：父仓库及子模块 zhi2-web-admin 相关。
- 来源会话ID：1cf442bd-49b1-4bb8-a58a-32e8511b6d30。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "git标签冲突处理",
  "source_extraction_id": "2f4475fb1f0a401aa70109552d4c8041",
  "version": 1,
  "memory_type": "entities"
}
-->