CREATE TABLE dbo.SalesMaster
(
    SalesId INT IDENTITY(1,1) PRIMARY KEY,    
	SalesTotal INT,	
    SalesDate DATETIME DEFAULT GETDATE(),
	SalesmanId INT,
	SalesComment NVARCHAR(255),
	FOREIGN KEY (SalesmanId) REFERENCES Salesman(SalesmanId)
);

drop Table SalesMaster;

IF OBJECT_ID('SelectSalesMaster', 'P') IS NOT NULL
    DROP PROCEDURE SelectSalesMaster;



CREATE PROCEDURE SelectSalesMaster
AS
BEGIN
    SELECT * FROM SalesMaster;
END;



CREATE PROCEDURE InsertUpdateSalesMaster
(
    @SalesId INT OUTPUT,
    @SalesTotal INT,
    @SalesmanId INT,
	@SalesComment NVARCHAR(255),	
	@Action NVARCHAR(50)
)
AS
BEGIN
    -- Check if @SalesmanId is provided for update, if not, it's an insert
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO SalesMaster (SalesTotal, SalesmanId,SalesComment,SalesDate)
        VALUES (@SalesTotal, @SalesmanId,@SalesComment,GETDATE());

        -- Return the generated SalesmanId
        SET @SalesId = SCOPE_IDENTITY();
    END
    ELSE IF @Action = 'Update'
    BEGIN
        -- Update without modifying SalesmanId, since it's an identity column
        UPDATE SalesMaster
        SET SalesTotal = @SalesTotal, SalesmanId = @SalesmanId, SalesComment = @SalesComment
        WHERE SalesId = @SalesId;
    END
END;



CREATE PROCEDURE DeleteSalesMaster
(
    @SalesId INTEGER
)
AS
BEGIN
    DELETE FROM SalesMaster WHERE SalesId = @SalesId;
END

	Select *from SalesMaster;