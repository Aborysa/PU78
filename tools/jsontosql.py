import argparse
import json
import codecs
import re
parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--file',help='File with fetchlist')
parser.add_argument('--out',help='Where to dump all data')

args = parser.parse_args()

output = ""

course_insert = '''
INSERT INTO `Courses` (`idCourse`,`name`,`noCourseName`,`enCourseName`,`nnCourseName`,`location`,`taughtInSpring`,`taughtInAutumn`,`taughtInEnglish`)
  VALUES('{}','{}','{}','{}','{}','{}',{},{},{});\n
'''

info_insert = '''
INSERT INTO `CourseInfo` (`code`,`name`,`text`,`idCourse_fkCourseInfo`)
  VALUES('{}','{}','{}','{}');\n
'''

escape = str.maketrans({"'":  r"\'"})

def fix(s):
  return (s or "").translate(escape)


with open(args.file,"r") as f:
  content = json.loads(f.read())
  for i,v in enumerate(content):
    #Insert Course
    output += course_insert.format(v["code"],fix(v["name"]),fix(v.get("norwegianName")),fix(v.get("englishName")),fix(v.get("newNorwegianName")),fix(v.get("location")),v.get("taughtInSpring"),v.get("taughtInAutumn"),v.get("taughtInEnglish"))
    #Insert CourseInfo
    for i2, v2 in enumerate(v.get("infoType") or []):
      output += info_insert.format(v2.get("code"),fix(v2.get("name")),fix((v2.get("text"))),fix(v["code"]))


output = output.replace("'None'","null")

print("Generated\nWriting...")

with codecs.open(args.out,"w","utf-8") as f:
  f.write(output)

