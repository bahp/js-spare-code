## About The Project

This a compendium of various JavaScript projects.

## Getting Started

### Prerequisites

### Adding a new project

Create a new folder and include a `main.html` file.

### Creating docs

#### including <iframe>

In `/static/tmps/base.html` uncomment the following line

```sh
{% include 'iframe.html' %}
{# include 'img.html' #}
```

#### including <img>

Create the thumbnail images to use

```sh
$ python create_imgs.py
```

In `/static/tmps/base.html` uncomment the following line

```sh
{# include 'iframe.html' #}
{% include 'img.html' %}
```

