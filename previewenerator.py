from PIL import Image, ImageDraw, ImageFont
from bs4 import BeautifulSoup
import os
import textwrap

def findallhtml():
  path ='./'
  for root, directories, file in os.walk(path):
    for file in file:
      if(file.endswith(".html")):
        readhtml(os.path.join(root,file))


def readhtml(filename):
  with open(filename, 'r') as f:
    contents = f.read()
    soup = BeautifulSoup(contents, 'html.parser')
    name = filename.split("/")[-1].split(".html")[0]
    title = soup.title.string.strip()
    links = soup.find_all(class_="header-nav sans")
    tag = ""
    for l in links:
      if "tagpage/" in str(l):
        tag = l.string.strip()

    draw(filename=name, text = title, type = tag)

def draw(filename, text, type):
  font = ImageFont.truetype('Manrope-SemiBold.ttf', 120)
  fontSmall = ImageFont.truetype('Manrope-SemiBold.ttf', 300)
  fontGray = ImageFont.truetype('Manrope-SemiBold.ttf', 80)
  # fntSmall = ImageFont.truetype('Manrope-Regular.ttf', size/2)
  # create image
  image = Image.new(mode = "RGB", size = (2000,1050), color = "white")
  draw = ImageDraw.Draw(image)

  offsetY = 30
  if type != "":
    draw.text((120,40), type, font=fontGray, fill=(128,128,128))
    offsetY  = 140

  offset = offsetY
  for line in textwrap.wrap(text, width=25):
    draw.text((120, offset), line, font=font, fill="#333333")
    offset += 140

  draw.text((1765,700), "•", font=fontSmall, fill=(0,0,0))

  fn = "./assets/preview/" + filename + ".jpeg"
  image.save(fn, 'jpeg')

findallhtml()