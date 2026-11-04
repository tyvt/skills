- For git branches carrying many submodule pointer commits (e.g. suzhou-shiqu-suzhufang-main-v2.1-mp with 64 of 109 commits touching pointers), never run `git rebase`; keep the current clean state or use `git merge` instead.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "git_submodule_rebase",
  "source_extraction_id": "3cc773466ea64436bc5bf0e2a554a53c",
  "version": 1,
  "memory_type": "preferences"
}
-->