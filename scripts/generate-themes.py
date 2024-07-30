import pystache
import json
import os

schemes_folder = 'temp/'
template = open('src/templates/bikkuri.mustache', 'r').read()
dist_folder = 'dist/'
theme_prefix = 'bikkuri-'


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


def process_schemes(folder_path):
  # cleaning up dist folder
  delete_files(dist_folder)

  schemes_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]

  themes_list = []  # for populating for package.json

  for scheme_file in schemes_files:
    scheme_filepath = os.path.join(folder_path, scheme_file)
    with open(scheme_filepath) as f:
      scheme_json = json.load(f)

      themes_list.append({
          "label":
          f"Bikkuri ({scheme_json['mode-name']} {scheme_json['tint-name']} & {scheme_json['mood-name']})",
          "uiTheme":
          f"{scheme_json['mode-type']}",
          "path":
          f"./{dist_folder + theme_prefix + scheme_file}"
      })

      render_theme(scheme_json, scheme_file)

  # add theme definitions to the package.json
  with open('package.json', 'r') as f:
    package_data = json.load(f)

  package_data["contributes"]["themes"] = themes_list

  with open('package.json', 'w') as f:
    json.dump(package_data, f, indent=2)

  print('Themes generated.')


def render_theme(scheme, filename):
  theme_filename = dist_folder + theme_prefix + filename
  with open(theme_filename, 'w') as f:
    f.write(pystache.render(template, scheme))
    f.close()


process_schemes(schemes_folder)
