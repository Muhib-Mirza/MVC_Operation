create database FinalPos;

create table dbo.Salesman
(
primary SalesmanId int identity not null, 
SalesmanCode nvarchar(50),
SalesmanName nvarchar(50),
SalesmanEntryDate DateTime identity
)
Go

Drop Table Salesman;

CREATE PROCEDURE SelectSalesman
AS
BEGIN
    SELECT * FROM Salesman;
END

DECLARE @Action VARCHAR(50); 
-- Insert and Update Employee
CREATE PROCEDURE InsertUpdateSaleman
(
	@SalesmanId int, 
	@SalesmanCode nvarchar(50),
	@SalesmanName nvarchar(50),
	@SalesmanEntryDate DateTime 
)
AS
BEGIN
DECLARE @Action VARCHAR(50); 
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Salesman(SalesmanCode, SalesmanName) VALUES (@SalesmanCode, @SalesmanName);
    END

    IF @Action = 'Update'
    BEGIN
        UPDATE Salesman
        SET SalesmanCode = @SalesmanCode, SalesmanName = @SalesmanName
        WHERE SalesmanId = @SalesmanId;
    END
END


IF OBJECT_ID('dbo.Salesman', 'U') IS NOT NULL
    DROP TABLE dbo.Salesman;

IF OBJECT_ID('SelectSalesman', 'P') IS NOT NULL
    DROP PROCEDURE SelectSalesman;

IF OBJECT_ID('InsertUpdateSalesman', 'P') IS NOT NULL
    DROP PROCEDURE InsertUpdateSalesman;

CREATE TABLE dbo.Salesman
(
    SalesmanId INT IDENTITY(1,1) PRIMARY KEY,
    SalesmanCode NVARCHAR(50),
    SalesmanName NVARCHAR(50),
    SalesmanEntryDate DATETIME DEFAULT GETDATE()
);

CREATE PROCEDURE SelectSalesman
AS
BEGIN
    SELECT * FROM Salesman;
END;
                 
CREATE PROCEDURE InsertUpdateSalesman
(
    @SalesmanId INT OUTPUT,
    @SalesmanCode NVARCHAR(50),
    @SalesmanName NVARCHAR(50),
    @Action NVARCHAR(50)
)
AS
BEGIN
    -- Check if @SalesmanId is provided for update, if not, it's an insert
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Salesman (SalesmanCode, SalesmanName, SalesmanEntryDate)
        VALUES (@SalesmanCode, @SalesmanName, GETDATE());

        -- Return the generated SalesmanId
        SET @SalesmanId = SCOPE_IDENTITY();
    END
    ELSE IF @Action = 'Update'
    BEGIN
        -- Update without modifying SalesmanId, since it's an identity column
        UPDATE Salesman
        SET SalesmanCode = @SalesmanCode, SalesmanName = @SalesmanName
        WHERE SalesmanId = @SalesmanId;
    END
END;



Select *from Salesman;



-- Delete Employee
CREATE PROCEDURE DeleteSalesman
(
    @SalesmanId INTEGER
)
AS
BEGIN
    DELETE FROM Salesman WHERE SalesmanId = @SalesmanId;
END