#!/usr/bin/env python3
import asyncio
import time
from pyppeteer import launch

async def generate_pdf(sourcepath, outfile):
    """Works for pdf files

    Parameters
    ----------
    sourcepath: string
        The source of the html file.
    outfile: string
        The path to save the image.

    """
    browser = await launch()
    page = await browser.newPage()
    await page.goto(sourcepath, {'waitUntil': 'networkidle2'})
    await page.pdf({
      'path': outfile,
      'format': 'A3',
      'printBackground': True,
      'margin': {
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0
      }
    })
    await browser.close()


async def generate_png(sourcepath, outfile):
    """Works or png and jpg

    Parameters
    ----------
    sourcepath: string
        The source of the html file.
    outfile: string
        The path to save the image.

    """
    browser = await launch({
        #'args': ['--window-size=500,500']
    })
    page = await browser.newPage()
    await page.goto(sourcepath)
    await page.screenshot({'path': outfile, 'fullPage': True})
    await browser.close()





if __name__ == '__main__':


    # .. note:: For some reason pyppeteer is not able to load local
    #           files. Thus, one trick can be to include the location
    #           of the examples within our own repository
    #
    #           sourcepath = 'https://bahp.github.io/js-spare-code/' + str(e)

    # Pathlib
    from pathlib import Path

    # Create items information
    path = Path('./')
    for e in path.glob("**/main.html"):
        print("Creating thumbnail... %s" % e)
        sourcepath = str(e.resolve())
        outputpath = str(e.parent / 'thumbnail-auto.png')
        asyncio \
            .get_event_loop() \
            .run_until_complete( \
                generate_png(sourcepath, outputpath))