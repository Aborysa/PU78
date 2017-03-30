import argparse
import json
import codecs
import re

import urllib.request
from urllib.parse import quote 


parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--url',help='Url tempalte')
parser.add_argument('--file',help='File with fetchlist')
parser.add_argument('--field',help='What fields to use')
parser.add_argument('--out',help='Where to dump all data')

args = parser.parse_args()

output = ""

room_insert = '''
INSERT INTO `Rooms`(`syllabusKey`,`roomName`,`floor`,`roomNr`,`buildingNr`,`floorName`,`type`)
  VALUES('{}','{}',{},'{}','{}','{}','{}');\n
'''


room_dict = {}


escape = str.maketrans({"'":  r"\'"})

def fix(s):
  return (s or "").translate(escape)


building_cache = {}

with open(args.file,"r") as f:
  rooms = json.loads(f.read())
  for i,v in enumerate(rooms.get("rooms")):
    floorId = v.get("floorId")
    #try:
    if not v[args.field] in building_cache:
      print("Fetching building...",(args.url).format(v[args.field]))
      with urllib.request.urlopen((args.url).format(v[args.field])) as req:
        try:
          building = json.loads(req.read().decode('utf-8',"ignore")).get("buildings")[0]
          building_cache[v[args.field]] = building
        except:
          print("Fetch failed {}".format(v[args.field]))
    
    b = building_cache.get(v[args.field])
    floorNr = -1
    floorName = "None"
    bNr = ""
    if b:
      bNr = b.get("nr")
      for i2, v2 in enumerate(b.get("floors")):
        if(v2.get("id") == floorId):
          floorNr = i2
          floorName = v2.get("name")
          break
      
    lydid = "{}{}".format(bNr,v.get("nr"))
    if(lydid in room_dict):
      print("Duplicate")
      continue
    room_dict[lydid] = True
    output += room_insert.format(lydid,v.get("name"),floorNr,v.get("nr"),bNr,floorName,v.get("type"))
  

output = output.replace("'None'","null")

print("Generated\nWriting...")

with codecs.open(args.out,"w","utf-8") as f:
  f.write(output)

