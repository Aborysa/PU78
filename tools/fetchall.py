import argparse
import json
import urllib.request
from urllib.parse import quote 

parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--url',help='Url tempalte')
parser.add_argument('--out',help='Where to dump all data')

args = parser.parse_args()




print("Fetching....")
with urllib.request.urlopen(args.url) as req:
    print("Reading....")
    content = req.read().decode('utf-8',"ignore")
    with open(args.out,"w") as f:
      print("Writing ...")
      f.write(content)
    print("Done.")

