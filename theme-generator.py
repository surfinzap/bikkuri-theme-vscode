import pystache
import json

# inputs
template_file = 'templates/b-default-vscode.mustache'
scheme_file = 'schemes/b-default.json'
# output
theme_file = 'themes/b-theme-color-theme.json'

# read inputs
template = open(template_file, 'r')
scheme = json.loads(open(scheme_file, 'r').read())


# write output to theme_file 
with open(theme_file, 'w') as f:
  f.write(pystache.render(template.read(), scheme))
  print('Theme file written to: ' + theme_file)
