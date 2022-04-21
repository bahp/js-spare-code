# Library
import glob

from pathlib import Path

path = Path('./')

def a_tag(href, inner):
	return '<a href="{href}"> {inner} </a>'.format(href=href, inner=inner) 

# Create file
f = open('index.html', 'w')

# Content
content = """
<html>
<head>
	<link rel="stylesheet" href="./style.css">
</head>
<body> {links} </body>
</html>
"""

# Links
links = '<ul>'
for e in path.glob("**/main.html"):
	links += a_tag(e, '<li>{e}</li>'.format(e=e.parent))
links+= '</ul>'

# Write file
f.write(content.format(links=links))