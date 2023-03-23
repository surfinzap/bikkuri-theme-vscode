import pystache
import json
import os

# inputs
colors = json.loads(open('colors/colors.json', 'r').read())
schemes_dir = 'schemes/'
template = open('templates/b-default-vscode.mustache', 'r').read()
theme_folder = 'themes/'
theme_prefix = 'b-theme-'


def delete_files(folder_path): 
  files = os.listdir(folder_path)

  # iterate over the files and delete them
  for file_name in files:
    file_path = os.path.join(folder_path, file_name)
    try:
      if os.path.isfile(file_path):
        os.remove(file_path)
    except Exception as e:
      print(f"Failed to delete {file_path}. Reason: {e}")


def process_schemes(folder_path, render_theme):
  # cleaning up folder
  delete_files(theme_folder)

  schemes_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]

  themes_list = [] # that’s for populating for package.json

  # rendering themes
  for scheme_file in schemes_files:
    scheme_filepath = os.path.join(folder_path, scheme_file)
    with open(scheme_filepath) as f:
      scheme_json = json.load(f)

      themes_list.append({
        "label" : f"{scheme_json['name']}",
        "uiTheme" : f"vs-{scheme_json['type']}",
        "path" : f"./{theme_folder + theme_prefix + scheme_file}"
      })

      render_theme(scheme_json, scheme_file)

  # updating package.json
  with open('package.json', 'r') as f:
    package_data = json.load(f)

  package_data["contributes"]["themes"] = themes_list

  with open('package.json', 'w') as f:
    json.dump(package_data, f, indent=2)



def render_theme(scheme, filename):
  partial_render = pystache.render(template, scheme) 
  theme_filename = theme_folder + theme_prefix + filename
  with open(theme_filename, 'w') as f:
    f.write(pystache.render(partial_render, colors))
    print('Theme generated: ' + theme_filename)
    f.close()


process_schemes(schemes_dir, render_theme)