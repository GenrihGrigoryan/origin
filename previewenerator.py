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
    print(filename)
    soup = BeautifulSoup(contents, 'html.parser')
    name = filename.split("/")[-1].split(".html")[0]
    title = soup.title.string.split('— Origin')[0]
    draw(filename=name, text = title)

def draw(filename, text):
  font = ImageFont.truetype('Manrope-SemiBold.ttf', 100)
  fontSmall = ImageFont.truetype('Manrope-SemiBold.ttf', 240)
  # fntSmall = ImageFont.truetype('Manrope-Regular.ttf', size/2)
  # create image
  image = Image.new(mode = "RGB", size = (1280,640), color = "white")
  draw = ImageDraw.Draw(image)

  offset = 50
  for line in textwrap.wrap(text.strip(), width=20):
    draw.text((70, offset), line, font=font, fill="#333333")
    offset += font.getsize(line)[1]

  draw.text((1100,360), "•", font=fontSmall, fill=(0,0,0))

  fn = "./" + filename + ".jpeg"
  image.save(fn, 'jpeg')
  print("finish: " + fn)

findallhtml()
