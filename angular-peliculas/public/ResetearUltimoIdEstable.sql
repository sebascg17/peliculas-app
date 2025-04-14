-- Revisa cuál es el último ID real que existe
SELECT MAX(Id) FROM Generos;

-- Supongamos que el último ID fue 15, entonces ejecutas:
DBCC CHECKIDENT ('Generos', RESEED, 15);