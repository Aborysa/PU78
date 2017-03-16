import argparse
import json
import codecs
import re

import urllib.request
from urllib.parse import quote 


parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--file',help='File with fetchlist')
parser.add_argument('--out',help="Output")
args = parser.parse_args()

output = ""

room_insert = '''
INSERT IGNORE INTO `Rooms`(`syllabusKey`,`roomName`,`floor`,`roomNr`,`buildingNr`,`floorName`,`type`)
  VALUES('{}','{}',{},'{}','{}','{}','{}');\n
'''


room_dict = {}


escape = str.maketrans({"'":  r"\'"})

def fix(s):
  return (s or "").translate(escape)


building_cache = {}
room_cache = {}

with open(args.file,"r") as f:
  content = json.loads(f.read())
  for i,v in enumerate(content):
    t = v.get("summarized")
    if t:
      for i2, v2 in enumerate(t[0].get("rooms") or []):
        skey = v2.get("syllabusromkode")
        if not skey in room_cache:
          print("Fetching... {}".format("http://www.ime.ntnu.no/api/fdv/rooms/lydiacode:{}".format(skey)))
          try:
            with urllib.request.urlopen(("http://www.ime.ntnu.no/api/fdv/rooms/lydiacode:{}").format(skey)) as req:
              room = json.loads(req.read().decode('utf-8',"ignore")).get("rooms")[0]
              room_cache[skey] = room
          except:
            print("Room failed: {}".format(skey))
            output += room_insert.format(skey,'None',-1,'None','None','None','None')
            continue
        r = room_cache[skey]
        floorId = r.get("floorId")
        bid = r["buildingId"]
        if not bid in building_cache:
          print("Fetching... {}".format("http://www.ime.ntnu.no/api/fdv/buildings/id:{}".format(skey)))
          try:
            with urllib.request.urlopen(("http://www.ime.ntnu.no/api/fdv/buildings/id:{}").format(bid)) as req:
              building = json.loads(req.read().decode('utf-8',"ignore")).get("buildings")[0]
              building_cache[bid] = building
          except:
            print("Building Failed {}".format(bid))
        b = building_cache.get(bid)
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
          
        lydid = "{}{}".format(bNr,r.get("nr"))
        if(lydid in room_dict):
          print("Duplicate")
          continue
        room_dict[lydid] = True
        output += room_insert.format(lydid,r.get("name"),floorNr,r.get("nr"),bNr,floorName,r.get("type"))
  



output = output.replace("'None'","null")

print("Generated\nWriting...")

with codecs.open(args.out,"w","utf-8") as f:
  f.write(output)

