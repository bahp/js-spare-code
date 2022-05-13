## About The Project

This repositoriy contains a compendium of JavaScript projects.

## Getting Started

### Prerequisites

* `jinja`: to create the docs.
* `pyppeteer`: to create the thumbnails.
* `asyncio`: to create the thumbnails.

### Adding a new project

Create a new folder and include a `main.html` file.

You can also include a `tags.txt` file with the tags associated
to the project. Note that this tags should be separated by a
space " ". Use hyphens to concatenate words.

### Creating docs

Run the following command

```sh
$ python create_jinja.py                # Includes iframes
$ python create_jinja.py --thumbnail    # Include thumbnails
```
