## About The Project

This repositoriy contains a compendium of various JavaScript projects.

## Getting Started

### Prerequisites

* `jinja`: to create the docs.
* `pyppeteer`: to create the thumbnails.
* `asyncio`: to create the thumbnails.

### Adding a new project

Create a new folder and include a `main.html` file.

### Creating docs

Run the following command

```sh
$ python create_jinja.py                # Includes iframes
$ python create_jinja.py --thumbnail    # Include thumbnails
```