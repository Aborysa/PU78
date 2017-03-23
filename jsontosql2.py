import argparse
import json
import codecs
import re
parser = argparse.ArgumentParser(description='Fetch json data')
parser.add_argument('--file',help='File with fetchlist')
parser.add_argument('--out',help='Where to dump all data')

args = parser.parse_args()

output = ""

lecture_insert = '''
INSERT INTO `Lectures` (`acronym`,`desc`,`arterminId`,`startTime`,`endTime`,`weekDay`,`idCourse_fkLectures`)
  VALUES('{}','{}','{}','{}','{}',{},'{}');\n
SET @last_l_id = LAST_INSERT_ID();
'''


lecture_room_insert = '''
INSERT IGNORE INTO `LectureRooms` (`idLectures_fkLectureRooms`,`syllabusRoomKey_fkLectureRooms`)
  VALUES(@last_l_id,'{}');\n
'''

lecture_weeks = '''
INSERT INTO `LectureWeeks` (`idLecture_fkLectureWeeks`,`startWeek`,`endWeek`)
VALUES (@last_l_id,{},{});\n
'''

studyprogam_insert = '''
INSERT INTO `StudyPrograms` (`idStudyPrograms`) VALUES ('{}');\n
'''

lecture_studyprogram_insert = '''
INSERT INTO `LecturesStudyPrograms` (`idLectures_fkLecturesStudyPrograms`,`idStudyPrograms_fkLecturesStudyPrograms`)
  VALUES(@last_l_id,'{}');\n
'''



program_dict = {}

escape = str.maketrans({"'":  r"\'"})

def fix(s):
  return (s or "").translate(escape)


with open(args.file,"r") as f:
  content = json.loads(f.read())
  for i,v in enumerate(content):
    t = v.get("summarized")
    if t:
      for i2, v2 in enumerate(t):

        #Insert Lecture
        output += lecture_insert.format(v2.get("acronym"),v2.get("description"),v2.get("arsterminId"),v2.get("from"),v2.get("to"),v2.get("dayNum"),v2.get("courseCode"))
        for i3, v3 in enumerate(v2.get("rooms") or []):
          output += lecture_room_insert.format(v3.get("syllabusKey") or v3.get("syllabusromkode"))
        
        for i3, v3 in enumerate(v2.get("weeks") or []):
          wRange = v3.split("-")
          sw = wRange[0]
          try:
            ew = wRange[1]
          except:
            ew = sw
          output += lecture_weeks.format(sw,ew)

        for i3, v3 in enumerate(v2.get("studyProgramKeys") or []):
          if not v3 in program_dict:
            output += studyprogam_insert.format(v3)
            program_dict[v3] = True
          output += lecture_studyprogram_insert.format(v3)
        

output = output.replace("'None'","null")

print("Generated\nWriting...")

with codecs.open(args.out,"w","utf-8") as f:
  f.write(output)

