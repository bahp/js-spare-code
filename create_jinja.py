# Generic
import argparse

# Pathlib
from pathlib import Path

# Jinja
from jinja2 import Template
from jinja2 import FileSystemLoader
from jinja2 import Environment

# Initialize parser
parser = argparse.ArgumentParser()

# Adding arguments
parser.add_argument("-t", "--thumbnail",
    action='store_true', default=False, help="Include thumbnails.")

# Read arguments from command line
args = parser.parse_args()

# Compute the thumbnails
if args.thumbnail:
    exec(open("create_imgs.py").read())

# Create items information
path = Path('./')
items = [
    {'w': 200, 'title': e, 'h': 200, 'id': i, 'path': e}
        for i, e in enumerate(path.glob("**/main.html"))
]

# Set template environment
tmp_loader = FileSystemLoader(searchpath='static/tmps')
tmp_environment = Environment(loader=tmp_loader)
tmp_index = tmp_environment.get_template('base.html')

# Render template
html = tmp_index.render(items=items, thumbnail=args.thumbnail)

# Save index file
with open("index.html", "w") as fh:
    fh.write(html)