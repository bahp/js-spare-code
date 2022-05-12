# Generic
import glob

# Pathlib
from pathlib import Path

# Jinja
from jinja2 import Template
from jinja2 import FileSystemLoader
from jinja2 import Environment

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
html = tmp_index.render(items=items)

with open("index.html", "w") as fh:
    fh.write(html)