@{
  RepoName = 'agentic-engineering-in-practice'

  ExpectedFolders = @(
    '.copilot'
    '.cursor'
    '.claude'
    'docs'
    'src'
    'src\frontend'
    'src\backend'
    'src\mcp-server'
    'sessions'
    '_meta'
    '_internal'
    'tools'
    'tools\psscripts'
    '.github'
    '.cursor\rules'
  )

  YamlCheckRoots = @(
    'docs'
  )

  DisallowInterviewLanguage = $false
}
