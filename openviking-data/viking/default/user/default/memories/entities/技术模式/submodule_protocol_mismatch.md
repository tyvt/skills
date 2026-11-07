# 子模块权限探测协议不一致误判
批量初始化子模块时，若探测协议与 .gitmodules 中写的协议不一致（如误用 https 而文件全为 http），且对应端口不通，会误判为仓库无权限。

## 问题根因
- 批量初始化 14 个子模块时，8 个 zhi2-* 仓库 git ls-remote 全部失败，一度判为「仓库权限没开」
- .gitmodules 里所有子模块地址写的是 http://，本机网络 80 端口通、443 端口断
- 第一次测权限用 https://，443 不通表现成「没权限」，实际是协议走错
- 换成 .gitmodules 同样的 http:// 再探，git ls-remote 全部命中目标分支（如 develop/v2.6.2-suzhufang-dev），权限本来就是好的

## 解决方案
- 判「有没有权限」前，先用 git config -f .gitmodules --get submodule.<name>.url 取出原样协议，不要自作主张换 https
- 探测权限用 git ls-remote <url> <目标分支>，命中即说明凭据与网络都通
- 区分两类失败：认证失败（403 / 要求输入凭据）与网络失败（连接超时、443 不通），后者是换协议或换端口的事
- 批量初始化前先用一个子模块试协议，再放开跑全量，避免 14 个一起报同样错而无法分辨根因

## 验证与归属
- 验证：会话 2010156f（基线 02900b8）用户诉求初始化所有子模块并启动检查，最终结论写明之前 404 的 8 个 zhi2-* 仓库权限确实开了，坑在自用 https 而 .gitmodules 全 http，443 断，14/14 子模块全部初始化并切到目标分支
- 涉及文件：.gitmodules
- 来源会话ID：2010156f-5fb3-49c1-859a-daa3a63a94f2；代码基线：02900b8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_protocol_mismatch",
  "source_extraction_id": "67f0bec8f7804bb8904f00a630a74b4e",
  "version": 1,
  "memory_type": "entities"
}
-->