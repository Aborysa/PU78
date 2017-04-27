-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 188.166.61.106    Database: studynator
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CourseInfo`
--

DROP TABLE IF EXISTS `CourseInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CourseInfo` (
  `idCourseInfo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `text` text,
  `idCourse_fkCourseInfo` char(24) NOT NULL,
  PRIMARY KEY (`idCourseInfo`,`idCourse_fkCourseInfo`),
  KEY `idCourse_fkCourseInfo` (`idCourse_fkCourseInfo`),
  CONSTRAINT `idCourse_fkCourseInfo` FOREIGN KEY (`idCourse_fkCourseInfo`) REFERENCES `Courses` (`idCourse`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24794 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CourseUsers`
--

DROP TABLE IF EXISTS `CourseUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CourseUsers` (
  `idUser_fkCourseUsers` varchar(128) NOT NULL,
  `idCourse_fkCourseUsers` char(24) NOT NULL,
  `courseUserRole` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser_fkCourseUsers`,`idCourse_fkCourseUsers`),
  KEY `idCourse_fkCourseUsers_idx` (`courseUserRole`),
  KEY `idCourse_fkCourseUsers` (`idCourse_fkCourseUsers`),
  CONSTRAINT `idCourse_fkCourseUsers` FOREIGN KEY (`idCourse_fkCourseUsers`) REFERENCES `Courses` (`idCourse`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUser_fkCourseUsers` FOREIGN KEY (`idUser_fkCourseUsers`) REFERENCES `Users` (`idUsersFeide`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Courses`
--

DROP TABLE IF EXISTS `Courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Courses` (
  `idCourse` char(24) NOT NULL,
  `noCourseName` varchar(128) DEFAULT NULL,
  `enCourseName` varchar(128) DEFAULT NULL,
  `nnCourseName` varchar(128) DEFAULT NULL,
  `location` varchar(25) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `taughtInSpring` tinyint(4) DEFAULT NULL,
  `taughtInAutumn` tinyint(4) DEFAULT NULL,
  `taughtInEnglish` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idCourse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Deliveries`
--

DROP TABLE IF EXISTS `Deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Deliveries` (
  `idDeliveries` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `deliveryName` varchar(128) DEFAULT NULL,
  `desc` text,
  `idCourse_fkDeliveries` char(24) NOT NULL,
  PRIMARY KEY (`idDeliveries`),
  KEY `idCourse_fkDeliveries` (`idCourse_fkDeliveries`),
  CONSTRAINT `idCourse_fkDeliveries` FOREIGN KEY (`idCourse_fkDeliveries`) REFERENCES `Courses` (`idCourse`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EventRepetitionRange`
--

DROP TABLE IF EXISTS `EventRepetitionRange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventRepetitionRange` (
  `idRepeatingEvent` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `repeatStart` date NOT NULL,
  `repeatEnd` date NOT NULL,
  `weekdays` varchar(45) NOT NULL,
  `idEvents_fkEventRepetitionRange` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idRepeatingEvent`),
  KEY `idEvents_fkEventRepetitionRange_idx` (`idEvents_fkEventRepetitionRange`),
  CONSTRAINT `idEvents_fkEventRepetitionRange` FOREIGN KEY (`idEvents_fkEventRepetitionRange`) REFERENCES `Events` (`idEvents`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EventTags`
--

DROP TABLE IF EXISTS `EventTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventTags` (
  `idEvent_fkEventTags` int(10) unsigned NOT NULL,
  `idTag_fkEventTags` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idEvent_fkEventTags`,`idTag_fkEventTags`),
  KEY `idTag_fkEventTags_idx` (`idTag_fkEventTags`),
  CONSTRAINT `idEvent_fkEventTags` FOREIGN KEY (`idEvent_fkEventTags`) REFERENCES `Events` (`idEvents`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTag_fkEventTags` FOREIGN KEY (`idTag_fkEventTags`) REFERENCES `Tags` (`idTags`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `idEvents` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `eventTitle` varchar(45) DEFAULT NULL,
  `eventDesc` varchar(255) DEFAULT NULL,
  `eventType` varchar(45) DEFAULT NULL,
  `eventStart` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `eventEnd` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `repWeekdays` varchar(45) DEFAULT NULL,
  `repetition` int(11) DEFAULT '0',
  `repEnd` date DEFAULT NULL,
  `idUsersFeide_fkEvents` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idEvents`),
  KEY `idUsersFeide_fkEvents_idx` (`idUsersFeide_fkEvents`),
  CONSTRAINT `idUsersFeide_fkEvents` FOREIGN KEY (`idUsersFeide_fkEvents`) REFERENCES `Users` (`idUsersFeide`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LectureRooms`
--

DROP TABLE IF EXISTS `LectureRooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LectureRooms` (
  `idLectures_fkLectureRooms` int(10) unsigned NOT NULL,
  `syllabusRoomKey_fkLectureRooms` char(16) NOT NULL,
  PRIMARY KEY (`idLectures_fkLectureRooms`,`syllabusRoomKey_fkLectureRooms`),
  KEY `syllabusRoomKey_fkLectureRooms` (`syllabusRoomKey_fkLectureRooms`),
  CONSTRAINT `idLectures_fkLectureRooms` FOREIGN KEY (`idLectures_fkLectureRooms`) REFERENCES `Lectures` (`idLectures`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `syllabusRoomKey_fkLectureRooms` FOREIGN KEY (`syllabusRoomKey_fkLectureRooms`) REFERENCES `Rooms` (`syllabusKey`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LectureTags`
--

DROP TABLE IF EXISTS `LectureTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LectureTags` (
  `idLectures_fkLectureTags` int(10) unsigned NOT NULL,
  `idTags_fkLectureTags` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idLectures_fkLectureTags`,`idTags_fkLectureTags`),
  KEY `idTags_fkLectureTags_idx` (`idTags_fkLectureTags`),
  CONSTRAINT `idLectures_fkLectureTags` FOREIGN KEY (`idLectures_fkLectureTags`) REFERENCES `Lectures` (`idLectures`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTags_fkLectureTags` FOREIGN KEY (`idTags_fkLectureTags`) REFERENCES `Tags` (`idTags`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LectureWeeks`
--

DROP TABLE IF EXISTS `LectureWeeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LectureWeeks` (
  `idLecture_fkLectureWeeks` int(10) unsigned NOT NULL,
  `startWeek` int(10) unsigned NOT NULL,
  `endWeek` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idLecture_fkLectureWeeks`,`startWeek`),
  CONSTRAINT `idLecture_fkLectureWeeks` FOREIGN KEY (`idLecture_fkLectureWeeks`) REFERENCES `Lectures` (`idLectures`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Lectures`
--

DROP TABLE IF EXISTS `Lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Lectures` (
  `idLectures` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acronym` varchar(10) DEFAULT NULL,
  `desc` varchar(128) DEFAULT NULL,
  `arterminId` varchar(10) DEFAULT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `weekDay` int(10) unsigned DEFAULT NULL,
  `idCourse_fkLectures` char(24) NOT NULL,
  PRIMARY KEY (`idLectures`),
  KEY `idCourse_fkLectures_idx` (`desc`),
  KEY `idCourse_fkLectures` (`idCourse_fkLectures`),
  CONSTRAINT `idCourse_fkLectures` FOREIGN KEY (`idCourse_fkLectures`) REFERENCES `Courses` (`idCourse`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4310 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LecturesStudyPrograms`
--

DROP TABLE IF EXISTS `LecturesStudyPrograms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LecturesStudyPrograms` (
  `idLectures_fkLecturesStudyPrograms` int(10) unsigned NOT NULL,
  `idStudyPrograms_fkLecturesStudyPrograms` char(24) NOT NULL,
  PRIMARY KEY (`idLectures_fkLecturesStudyPrograms`,`idStudyPrograms_fkLecturesStudyPrograms`),
  KEY `idStudyPrograms_fkLecturesStudyPrograms` (`idStudyPrograms_fkLecturesStudyPrograms`),
  CONSTRAINT `idLectures_fkLecturesStudyPrograms` FOREIGN KEY (`idLectures_fkLecturesStudyPrograms`) REFERENCES `Lectures` (`idLectures`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idStudyPrograms_fkLecturesStudyPrograms` FOREIGN KEY (`idStudyPrograms_fkLecturesStudyPrograms`) REFERENCES `StudyPrograms` (`idStudyPrograms`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rooms` (
  `syllabusKey` char(16) NOT NULL,
  `roomName` varchar(45) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `roomNr` varchar(10) DEFAULT NULL,
  `buildingNr` varchar(10) DEFAULT NULL,
  `floorName` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`syllabusKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudyPrograms`
--

DROP TABLE IF EXISTS `StudyPrograms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudyPrograms` (
  `idStudyPrograms` char(24) NOT NULL,
  PRIMARY KEY (`idStudyPrograms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags` (
  `idTags` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tagName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTags`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `idUsersFeide` varchar(128) NOT NULL,
  `lastLogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsersFeide`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `WeeklyEvent`
--

DROP TABLE IF EXISTS `WeeklyEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WeeklyEvent` (
  `id_event` int(10) unsigned NOT NULL,
  `weekday` int(11) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `interval` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_event`),
  CONSTRAINT `weekly_is_event_fk` FOREIGN KEY (`id_event`) REFERENCES `Events` (`idEvents`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-26 16:08:00
