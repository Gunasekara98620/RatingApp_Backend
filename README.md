Database setup

USE ratingapp; -- Switch to your database
GO

CREATE TABLE Rating (
    Id INT PRIMARY KEY IDENTITY(1,1),
    empId NVARCHAR(50) NOT NULL UNIQUE,
    ratingScore INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

INSERT INTO Rating (empId, ratingScore)
VALUES
    ('EMP001', 5),
    ('EMP002', 4),
    ('EMP003', 3),
    ('EMP004', 5),
    ('EMP005', 4),
    ('EMP006', 3),
    ('EMP007', 5),
    ('EMP008', 4),
    ('EMP009', 3),
    ('EMP010', 5),
    ('EMP011', 4),
    ('EMP012', 3),
    ('EMP013', 5),
    ('EMP014', 4),
    ('EMP015', 3),
    ('EMP016', 5),
    ('EMP017', 4),
    ('EMP018', 3),
    ('EMP019', 5),
    ('EMP020', 4),
    ('EMP021', 3),
    ('EMP022', 5),
    ('EMP023', 4),
    ('EMP024', 3),
    ('EMP025', 5);

	SELECT * FROM Rating;

	DROP TABLE Rating;

	Select avg(ratingScore) from Rating
