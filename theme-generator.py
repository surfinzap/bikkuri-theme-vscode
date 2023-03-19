import pystache
import json

# inputs
template_file = 'templates/b-default-vscode.mustache'
tokens_file = 'schemes/tokens.json'
dark_warm_vivid_file = 'schemes/dark-warm-vivid.json'

# output
theme_file = 'themes/b-theme-color-theme.json'

# read inputs
template = open(template_file, 'r')
tokens = json.loads(open(tokens_file, 'r').read())
dark_warm_vivid = json.loads(open(dark_warm_vivid_file, 'r').read())



# write output to theme_file 
with open(theme_file, 'w') as f:
  dark_warm_vivid_partial = pystache.render(template.read(), dark_warm_vivid)

  f.write(pystache.render(dark_warm_vivid_partial, tokens))
  print('Theme file written to: ' + theme_file)
