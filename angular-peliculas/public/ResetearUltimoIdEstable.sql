-- Revisa cu�l es el �ltimo ID real que existe
SELECT MAX(Id) FROM Generos;

-- Supongamos que el �ltimo ID fue 15, entonces ejecutas:
DBCC CHECKIDENT ('Generos', RESEED, 15);