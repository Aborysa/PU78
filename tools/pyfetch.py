import argparse
import json
import urllib.request
from urllib.parse import quote 

parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--url',help='Url tempalte')
parser.add_argument('--file',help='File with fetchlist')
parser.add_argument('--field',help='What fields to use')
parser.add_argument('--out',help='Where to dump all data')

args = parser.parse_args()
jfile = None

with open(args.file,"r") as f:
  jfile = json.loads(f.read())

outlist = []

if jfile:
  print("Parsed file: {}".format(args.file))
  for i, v in enumerate(jfile):
    print("Url",quote((args.url).format(v[args.field])))
    d = {}
    for i2,v2 in v.items():
      d[i2] = v2
    try:
      with urllib.request.urlopen((args.url).format(quote(v[args.field]))) as req:
        try:
          content = json.loads(req.read().decode('utf-8',"ignore"))
          for i3,v3 in content["course"].items():
            d[i3] = v3
        except e:
          print("Failed for url",(args.url).format(v[args.field]))
    except:
      pass
    outlist.append(d)

  with open(args.out,"w") as f:
    f.write(json.dumps(outlist))

  print("Done")

else:
  print ("Could not read file: {}".format(args.file))  

