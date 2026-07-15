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
    'presentation'
    'sessions'
    '_meta'
    '_internal'
    'assets'
    'examples'
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
