# zhi2-web-admin
The Suzhufang (苏住房) front-end code repository, mounted as a git submodule inside a parent repository.
## Structure
- Submodule name `zhi2-web-admin`; the parent repo records it as a gitlink that must be bumped after each submodule commit is pushed.
- Active work branch: `develop/v2.6.2-suzhufang`.
## Conventions
- Lint must pass before committing, and only the target file is committed.
- Other developers' dirty files are preserved by rebasing with `--autostash`.
- `env/.env` is a dirty local file that must be stashed and never committed.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "code_repository",
  "name": "zhi2_web_admin",
  "source_extraction_id": "988798ff7e4b4ac2bd1b3aa16ff2890c",
  "version": 1,
  "memory_type": "entities"
}
-->