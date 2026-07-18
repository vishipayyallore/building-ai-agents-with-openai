@{
  RepoName = 'building-ai-agents-with-openai'

  ExpectedFolders = @(
    'docs'
    'src'
    'src\frontend'
    'src\backend'
    'src\mcp-server'
    'sessions'
    'tools'
    'tools\psscripts'
    'tools\pyscripts'
    '.github'
  )

  YamlCheckRoots = @(
    'docs'
  )

  DisallowInterviewLanguage = $false
}
