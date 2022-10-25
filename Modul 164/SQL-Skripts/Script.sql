DROP Database IF EXISTS `Database` ;

CREATE Database `Database` DEFAULT CHARACTER SET latin1 ;
USE `Database` ;

CREATE TABLE Bild (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Dateipfad varchar(150) NOT NULL,
	ArtikelID INT 
);

CREATE TABLE Artikel (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name varchar(50) NOT NULL unique,
	Beschreibung varchar(255),
    Preis float Not Null
);

CREATE TABLE Artikel_Unterkategorie (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	ArtikelID INT,
    UnterkategorieID INT 
);

CREATE TABLE Bestellung_Artikel (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	ArtikelID INT,
    BestellungID INT 
);

CREATE TABLE Kategorie (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name varchar(50) NOT NULL
);

CREATE TABLE Unterkategorie (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name varchar(50) NOT NULL,
    KategorieID INT 
);

CREATE TABLE Bestellung (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Datum date NOT NULL,
    Auf_Rechnung tinyint,
    StatusID INT default 1,
    KundeID INT
);


CREATE TABLE Status (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Name varchar(50) NOT NULL
);


CREATE TABLE Kunde (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Vorname varchar(50) NOT NULL,
	Nachname varchar(50) NOT NULL,
    Geburtsdatum date not null,
    Email_Adresse varchar(130) not null,
    Strasse varchar(50) not null,
    Hausnummer int not null,
    OrtId int 
);

CREATE TABLE Ort (
	ID INT PRIMARY KEY AUTO_INCREMENT,
    PLZ int not null,
	Name varchar(50) NOT NULL
);



ALTER TABLE Ort
ADD CHECK (PLZ >= 1000 <= 9999);

ALTER TABLE Artikel
ADD CHECK (Preis > 0);

alter table Bild
ADD CONSTRAINT BildArtikelID FOREIGN KEY (ArtikelID)
REFERENCES Artikel(ID)
ON DELETE CASCADE;

alter table Artikel_Unterkategorie
ADD CONSTRAINT KategorisierterArtikelID FOREIGN KEY (ArtikelID)
REFERENCES Artikel(ID)
ON DELETE CASCADE,
ADD CONSTRAINT UnterkategorieID FOREIGN KEY (UnterkategorieID)
REFERENCES Unterkategorie(ID)
ON DELETE CASCADE;

alter table Unterkategorie
ADD CONSTRAINT KategorieID FOREIGN KEY (KategorieID)
REFERENCES Kategorie(ID)
ON DELETE CASCADE;

alter table Bestellung_Artikel
ADD CONSTRAINT BestellungArtikelID FOREIGN KEY (ArtikelID)
REFERENCES Artikel(ID)
ON DELETE CASCADE,
ADD CONSTRAINT BestellungID FOREIGN KEY (BestellungID)
REFERENCES Bestellung(ID)
ON DELETE CASCADE;

alter table Bestellung
ADD CONSTRAINT StatusID FOREIGN KEY (StatusID)
REFERENCES Status(ID) 
ON DELETE No Action,
ADD CONSTRAINT KundeID FOREIGN KEY (KundeID)
REFERENCES Kunde(ID)
ON DELETE CASCADE;

alter table Kunde
ADD CONSTRAINT OrtID FOREIGN KEY (OrtID)
REFERENCES Ort(ID)
ON DELETE No Action;



-- Inserts-------------------------------------------------------------------------------------------------------------------------------------------------------------
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Ort.csv'
INTO TABLE Ort
character set utf8mb4
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, PLZ, Name);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Status.csv'
INTO TABLE Status
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 rows
(ID, Name);


LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Kategorie.csv'
INTO TABLE Kategorie
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Name);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Artikel.csv'
INTO TABLE Artikel
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Name, Beschreibung, Preis);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Bild.csv'
INTO TABLE Bild
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Dateipfad, ArtikelID);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Kunde.csv'
INTO TABLE Kunde
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Vorname, Nachname, Geburtsdatum, Email_Adresse, Strasse, Hausnummer, OrtID);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Bestellung.csv'
INTO TABLE Bestellung
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Datum, Auf_Rechnung, StatusID, KundeID);



LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Unterkategorie.csv'
INTO TABLE Unterkategorie
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, Name, KategorieID);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Artikel_Unterkategorie.csv'
INTO TABLE Artikel_Unterkategorie
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, ArtikelID, UnterkategorieID);



LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Bestellung_Artikel.csv'
INTO TABLE Bestellung_Artikel
FIELDS ESCAPED BY '\\'
TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(ID, ArtikelID, BestellungID);



-- Select --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-- Kompetenz 5.1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

-- 6.8

select k.Vorname, k.Nachname, k.Strasse, k.Hausnummer, o.PLZ,  o.name as Ort from kunde as k
join ort as o on o.id = k.ortid
order by nachname asc, vorname ;

-- 6.9

select k.Vorname, k.Nachname, k.Strasse, k.Hausnummer from kunde as k
join ort as o on o.id = k.ortid
where o.name = "Fraubrunnen"
order by nachname asc;



-- 6.10

select k.Vorname, k.Nachname, k.Strasse, k.Hausnummer, o.PLZ,  o.name as Ort from kunde as k
join ort as o on o.id = k.ortid
where PLZ between 3050 and 3100;


-- 6.11

select * from bestellung where datum > '2021-08-01'
order by kundeId;


-- 6.13

select count(*) as Anzahl_Artikel from artikel;



-- Kompetenz 5.2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


-- 6.14

select u.name as Unterkategorie, count(*) from artikel as a
join artikel_unterkategorie as au on a.id = au.artikelid
join unterkategorie as u on u.id = au.unterkategorieid
group by Unterkategorie;

-- 6.15

select a.Name, b.Dateipfad, u.name as Unterkategorie from artikel as a
join artikel_unterkategorie as au on a.id = au.artikelid
join unterkategorie as u on u.id = au.unterkategorieid
join bild as b on b.artikelid = a.id
order by a.name asc;

-- 5.16

select b.Datum, a.Name as Artikel, a.Preis, k.Vorname, k.Nachname from bestellung as b
join status as s on s.id = b.statusid
join kunde as k on k.id = b.kundeid
join bestellung_artikel as ba on ba.bestellungid = b.id
join artikel as a on a.id = ba.artikelid
order by datum desc;


-- 5.17

select b.Datum, a.Name as Artikel, a.Preis, k.Vorname, k.Nachname from bestellung as b
join status as s on s.id = b.statusid
join kunde as k on k.id = b.kundeid
join bestellung_artikel as ba on ba.bestellungid = b.id
join artikel as a on a.id = ba.artikelid
where b.datum between "2021-08-01" and "2021-08-31" -- august statt jaanuar da wir keine bestellung im Januar haben
order by k.nachname desc, k.vorname;


-- 5.18

select k.Vorname, k.Nachname, count(b.id) as Anzahl_Bestellungen from kunde as k
join bestellung as b on b.kundeid = k.id
group by k.vorname
order by Anzahl_Bestellungen desc;


-- 5.19

select * from artikel as a
join artikel_unterkategorie as au on a.id = au.artikelid
join unterkategorie as u on u.id = au.unterkategorieid
join bild as b on b.artikelid = a.id
where u.name = "iPhone";



-- Prüfung auf referentielle Integrität
-- WICHTIG!!! 
-- Vor dem Import sämtliche Constraints löschen
-- Nach dem Import Daten prüfen und bereinigen
-- Constraints wieder erstellen

-- Test ob ID in Tabelle Kunden UNIQUE und NOT NULL ist

SELECT ID, COUNT(*) AS Anzahl FROM Kunde
 GROUP BY ID
 ORDER BY Anzahl DESC, ID;
 
 -- DESC um zu schauen ob eine ID mehrmals vorkommt 


