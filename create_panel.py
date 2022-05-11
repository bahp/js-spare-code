# Library
import glob

from pathlib import Path

path = Path('./')

def a_tag(href, inner):
	return '<a href="{href}"> {inner} </a>'.format(href=href, inner=inner) 

def iframe_tag(href, id, w=300, h=200):
	tmp = "<div class='iframe-container'>"
	tmp+= "\n<iframe id='{id}' title='title' "
	tmp+= "width='{w}' height='{h}' src='{href}' "
	tmp+= 'scrolling="no" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" loading="lazy" '
	tmp+= 'style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px">'
	tmp+= "</iframe>"
	tmp+= "</div>"
	return tmp.format(href=href, id=id, w=w, h=h)

def object_tag(href):
	tmp = "<object "
	tmp+= "data='" + str(href) + "'"
	tmp+= "width='400' "
	tmp+= "height='400'></object>"
	return tmp

def card_tag(html, href):
	return '''<div class="col-md-4">
	             <div class="card mb-4 box-shadow">
	                {obj}
	                <a href="{href}" class="btn btn-light"> {link}
	                </a>
	             </div> 
	            </div>'''.format(html=html,
								 href=href,
								 link=e.parent,
								 obj=iframe_tag(html, 1))

# Create file
f = open('index-panels.html', 'w')

# Content
content = """
<html>
<head>
	<!-- Own -->
	<link rel="stylesheet" href="./_static/style.css">
	
	<!-- Boostrap -->
	<link rel="stylesheet" href="./_static/dist/css/bootstrap.min.css" >
	
	<!-- Custom styles for this template -->
    <link rel="stylesheet" href="./_static/album.css">
</head>
<body> 

	<main role="main">
		<div class="album py-5 bg-light">
			<div class="container">
				<div class="row">
					{links} 
				</div>
			</div>
		</div>
  	</main>
  	
	<script src="./_static/dist/js/bootstrap.min.js"></script>
</body>
</html>
"""



# Links
links = ''
for i,e in enumerate(path.glob("**/main.html")):
	#links += iframe_tag(e, id=i) + '<br><br>'
	#links += a_tag(e, '<li>{e}</li>'.format(e=e.parent))
	#links += object_tag(e) + '<br><br>'
	links+= card_tag(href=e, html=e)

# Download images from web

print(content.format(links=links))

"""
# Libraries
from html2image import Html2Image

URLS = [
	"https://bahp.github.io/ls2d/",
	"https://github.com/bahp/django-epicimpoc-microbiology",
	"https://github.com/bahp/django-epicimpoc-pathology",
	"https://github.com/bahp/fyp-djpkgdev-template",
	"https://bahp.github.io/pyAMR/",
	"https://bahp.github.io/datablend/",
	"https://www.mdpi.com/2079-6382/10/10/1267",
	"https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/s12911-017-0550-1"
]

# Loop
for i, url in enumerate(URLS):
	hti = Html2Image()
	hti.screenshot(url=url, save_as='url-%s.png' % i)

# Loop
for i,e in enumerate(path.glob("**/main.html")):
	url = "https://bahp.github.io/js-spare-code/%s" % e
	hti.screenshot(url=url, save_as='js-%s.png' % i)
"""

# Write file
f.write(content.format(links=links))