# Generic
import argparse

# Pathlib
from pathlib import Path

# Jinja
from jinja2 import Template
from jinja2 import FileSystemLoader
from jinja2 import Environment

# Helper function
def get_tags(e, parent=True, txt=True):
    """Gets the tags for a specificproject.

    Parameters
    ----------
    parent: boolean
        Whether to include the parent folder as ta.

    txt: boolean
        Whether to include the tags in a txt file. The txt
        file needs to be placed at the same level as main.html
        and should contain a list of tags separated by a space
        " ".

        e.g. tag1 tag2 tagn

    """
    tags = []
    if parent:
        tags.append(e.parts[1])
    if txt:
        path = Path(e.parent / 'tags.txt')
        if path.is_file():
            tags = tags + open(path, 'r').read().split(" ")
    return " ".join(tags)

# Initialize parser
parser = argparse.ArgumentParser()

# Adding arguments
parser.add_argument("-t", "--thumbnail",
    action='store_true', default=False, help="Include thumbnails.")

# Read arguments from command line
args = parser.parse_args()

# Compute the thumbnails
#if args.thumbnail:
#    exec(open("create_imgs.py").read())

# Create items information
items = [
    {   'w': 200,
        'title': e,
        'h': 200,
        'id': i,
        'path': e,
        'tags': get_tags(e)
     }
        for i, e in enumerate(Path('./').glob("**/main.html"))
]

# Set template environment
tmp_loader = FileSystemLoader(searchpath='docs/static/tmps')
tmp_environment = Environment(loader=tmp_loader)
tmp_index = tmp_environment.get_template('base.html')

# Render template
html = tmp_index.render(items=items, thumbnail=args.thumbnail)

# Save index file
with open("./index.html", "w") as fh:
    fh.write(html)