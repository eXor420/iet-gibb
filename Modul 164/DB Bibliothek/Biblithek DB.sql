DROP Database IF EXISTS `bibliothek` ;

CREATE Database IF NOT EXISTS `bibliothek` DEFAULT CHARACTER SET utf8 ;
USE `bibliothek` ;

DROP Table IF EXISTS `Ausleihen`;
CREATE TABLE Ausleihen (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Datum_von DATETIME NOT NULL,
	Datum_bis DATETIME NOT NULL,
	Preis FLOAT,
    KundenID int,
    BuchID int 
);

DROP Table IF EXISTS `BUECHER`;
CREATE TABLE BUECHER (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL
);    

DROP Table IF EXISTS `Autoren`;
CREATE TABLE Autoren (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Nachname VARCHAR(50) NOT NULL,
	Vorname VARCHAR(50) NOT NULL,
	Adresse VARCHAR(20),
	OrtID INT
);

DROP Table IF EXISTS `Orte`;
CREATE TABLE Orte (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	PLZ INT NOT NULL,
	Ort Varchar(50) NOT NULL
);


DROP Table IF EXISTS `Verlage`;
CREATE TABLE Verlage (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Verlag varchar(50) NOT NULL,
	Email varchar(100) ,
	Telefonnr varchar(20) 
);

DROP Table IF EXISTS `Genres`;
Create Table Genres(
ID Int primary key auto_increment,
Genre varchar(50) not null default 0,
Fiktion bit(1) not null
);

DROP Table IF EXISTS `kunde`;
CREATE Table IF NOT EXISTS `kunde`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name`VARCHAR(45) not null,
	`vorname` VARCHAR(45) not null,
	`adresse` VARCHAR(45) not null,
    `geburtsdatum` Date,
    `OrtID` int not null,
	PRIMARY KEY (`id`)
);

DROP Table IF EXISTS `Autoren_Verlage`;
create table Autoren_Verlage (
ID INT PRIMARY KEY AUTO_INCREMENT,
AutorID INT ,
VerlagID INT 
);

ALTER Table `kunde`
ADD constraint OrtID Foreign Key(OrtID) references Orte (ID);

alter table Autoren_Verlage
ADD CONSTRAINT AutorID FOREIGN KEY (AutorID)
REFERENCES Autoren(ID)
ON DELETE SET NULL,
ADD CONSTRAINT VerlagID FOREIGN KEY (VerlagID)
REFERENCES Verlage(ID)
ON DELETE SET NULL;

ALTER TABLE Ausleihen
ADD CONSTRAINT KundenID FOREIGN KEY (KundenID)
REFERENCES Kunde(id)
ON DELETE CASCADE,
ADD CONSTRAINT FK_Ausleihen_Buecher FOREIGN KEY (id)
REFERENCES BUECHER(ID)
ON DELETE CASCADE,
ADD CONSTRAINT BuchID FOREIGN KEY (BuchID)
REFERENCES BUECHER(ID)
ON DELETE CASCADE;
    
-- Autoren
ALTER TABLE Autoren
MODIFY COLUMN Adresse VARCHAR(100),
ADD CONSTRAINT FK_Autoren_Ort FOREIGN KEY (OrtID)
REFERENCES Orte(ID)
ON DELETE SET NULL;


ALTER TABLE Orte
ADD CHECK (PLZ >= 1000 <= 9999);
    
insert into Orte (PLZ, Ort) values
(6362,"Loch"),
(2314,"Sagne"),
(8512,"Dorf"),
(3019,"Chäs"),
(3110,"Münze");

insert into Kunde (name, vorname, adresse, geburtsdatum, OrtID ) values
("Daeppen", "Maurice", "Bahnhofmatte 7", "2003-08-28", 3);
insert into buecher(name) values 
("Die 3 bösen Geister");














-- komplexes insert

insert into Autoren (Nachname ,Vorname, Adresse, OrtID  ) values
("Maurer","Hans", "Bahnhofstrasse 7", (select id from orte where Ort ="Chäs" and plz= 3019));

insert into Verlage (Verlag ,Email, Telefonnr) values
("OnePlus","info@oneplus.ch", "032 512 30 34");



insert into ausleihen(Datum_von, Datum_bis, Preis, KundenID, BuchID) values
((select current_date()), (select adddate(current_date(), interval 30 day)), 10.0, (select id from kunde where name = "Daeppen" and vorname = "Maurice"), (select id from buecher where name = "Die 3 bösen Geister"));


select * from ausleihen order by Datum_von;



















-- insert

insert into Autoren (Nachname ,Vorname, Adresse, OrtID  ) values
("Maurer","Hans", "Bahnhofstrasse 7", 3),
("Campiche","Finn", "Burgdorfstrass 37", 2),
("Aeschlimann","Patrick", "Bernstrasse 69", 3),
("Jaros","Marco", "Lindenweg 6", 2),
("Daeppen","Maurice", "Bahnhofmatte 9", 1);

-- update

update Autoren Set OrtID= 5 where nachname="Campiche" and vorname="Finn";
update Autoren Set Adresse="Solothurnstrasse 8" where nachname="Campiche" and vorname="Finn";
update Autoren Set OrtID= 3 where nachname="Daeppen" and vorname="Maurice";
update Autoren Set Adresse= Adresse="Fraubrunnenstrasse 23" where nachname="Däppen" and vorname="Maurice";
update Autoren Set Vorname="Fritz" where nachname="Däppen" and vorname="Maurice";

-- delete

delete from Autoren where nachname="Campiche" and vorname="Finn";
delete from Autoren where nachname="Daeppen" and vorname="Maurice";
delete from Autoren where nachname="Jaros" and vorname="Marco";
delete from Autoren where nachname="Steiner" and vorname="Hans";
delete from Autoren where nachname="Aeschlimann" and vorname="Patrick";















