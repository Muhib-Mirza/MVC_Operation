CREATE TABLE dbo.Product
(
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(50),
    ProductCode NVARCHAR(50),
	ProductImageUrl NVARCHAR(200),
	ProductCostPrice INT,
	ProductRetailPrice INT,
    ProductCreationDate DATETIME DEFAULT GETDATE()
);


CREATE PROCEDURE SelectProduct
AS
BEGIN
    SELECT * FROM Product;
END;
                 

CREATE PROCEDURE InsertUpdateProduct
(
    @ProductId INT OUTPUT,
    @ProductName NVARCHAR(50),
    @ProductCode NVARCHAR(50),
	@ProductImageUrl NVARCHAR(200),
	@ProductCostPrice INT,
	@ProductRetailPrice INT,
    @Action NVARCHAR(50)
)
AS
BEGIN
    -- Check if @SalesmanId is provided for update, if not, it's an insert
    IF @Action = 'Insert'
    BEGIN
        INSERT INTO Product (ProductName, ProductCode,ProductImageUrl,ProductCostPrice,ProductRetailPrice, ProductCreationDate)
        VALUES (@ProductName, @ProductCode,@ProductImageUrl,@ProductCostPrice,@ProductRetailPrice, GETDATE());

        -- Return the generated SalesmanId
        SET @ProductId = SCOPE_IDENTITY();
    END
    ELSE IF @Action = 'Update'
    BEGIN
        -- Update without modifying SalesmanId, since it's an identity column
        UPDATE Product
        SET ProductName = @ProductName, ProductCode = @ProductCode, ProductImageUrl = @ProductImageUrl, ProductCostPrice = @ProductCostPrice, ProductRetailPrice = @ProductRetailPrice
        WHERE ProductId = @ProductId;
    END
END;



Select *from Product;



-- Delete Employee
CREATE PROCEDURE DeleteProduct
(
    @ProductId INTEGER
)
AS
BEGIN
    DELETE FROM Product WHERE ProductId = @ProductId;
END


IF OBJECT_ID('dbo.Product', 'U') IS NOT NULL
    DROP TABLE dbo.Product;

IF OBJECT_ID('SelectProduct', 'P') IS NOT NULL
    DROP PROCEDURE SelectProduct;

IF OBJECT_ID('InsertUpdateProduct', 'P') IS NOT NULL
    DROP PROCEDURE InsertUpdateProduct;