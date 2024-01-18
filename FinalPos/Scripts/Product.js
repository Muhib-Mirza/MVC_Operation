// Load Data in Table when document is ready
$(document).ready(function () {

    //console.log("document is ready")
    loadData();
});

// Load Data function
function loadData() {
    $.ajax({
        url: "/Product/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger
            var html = '';
            $.each(result, function (key, item) {

                var date = new Date(parseInt(item.ProductCreationDate.substr(6)));

                // Format the date as "Day/Month/Year"
                var formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();


                html += '<tr>';
                html += '<td>' + item.ProductId + '</td>';
                html += '<td>' + item.ProductName + '</td>';
                html += '<td>' + item.ProductCode + '</td>'; 
                html += '<td>' + item.ProductImageUrl + '</td>';
                html += '<td>' + item.ProductCostPrice + '</td>';
                html += '<td>' + item.ProductRetailPrice + '</td>'; 
                html += '<td>' + formattedDate + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ProductId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ProductId + ')">Delete</a></td>';
                html += '</tr>';
                console.log("result"+result);
            });
            $('.tbody').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function modalclose() {
    $('#myModal').hide()
}

//function validate() {
//    let Name = document.getElementById('Name').value;
//    if (Name === "") {
//        console.log("Enter Name")
//    }
//}
// Add Data Function
function Add() {
    var res = validate()
    if (res == false) {
        return false;
    }
    var empObj = {
        ProductId: $('#ProductId').val(),
        ProductName: $('#ProductName').val(),
        ProductCode: $('#ProductCode').val(),
        ProductImageUrl: $('#ProductImageUrl').val(),
        ProductCostPrice: $('#ProductCostPrice').val(),
        ProductRetailPrice: $('#ProductRetailPrice').val(),
        ProductCreationDate: $('#ProductCreationDate').val(),
    };
    $.ajax({
        url: "/Product/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            modalclose();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    console.log(empObj)
}


function getbyID(ProdId) {
    $('#ProductName').css('border-color', 'lightgrey');
    $('#ProductCode').css('border-color', 'lightgrey');
    $('#ProductImageUrl').css('border-color', 'lightgrey');
    $('#ProductCostPrice').css('border-color', 'lightgrey');
    $('#roductRetailPrice').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Product/getbyID/" + ProdId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ProductId ').val(result.ProductId);
            $('#ProductName').val(result.ProductName);
            $('#ProductCode').val(result.ProductCode);
            $('#ProductImageUr').val(result.ProductImageUr);
            $('#ProductCostPrice').val(result.ProductCostPrice);
            $('#ProductRetailPrice').val(result.ProductRetailPrice);
            $('#ProductCreationDate').val(result.ProductCreationDate);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            console.log("result" + result);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

// Function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ProductId: $('#ProductId').val(),
        ProductName: $('#ProductName ').val(),
        ProductCode: $('#ProductCode').val(),
        ProductImageUrl: $('#ProductImageUrl').val(),
        ProductCostPrice: $('#ProductCostPrice').val(),
        ProductRetailPrice: $('#ProductRetailPrice').val(),
        ProductCreationDate: $('#ProductCreationDate').val(),

    };
    $.ajax({
        url: "/Product/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');

            $('#ProductId').val("");
            $('#ProductName').val("");
            $('#ProductCode').val("");
            $('#ProductImageUrl').val("");
            $('#ProductCostPrice').val("");
            $('#ProductRetailPrice').val("");
            $('#ProductCreationDate').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for deleting employee's record
function Delele(ProdId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Product/Delete/" + ProdId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

// Function for clearing the textboxes
function clearTextBox() {
    $('#myModal').toggle()
    $('#myModal').modal('hide');

    $('#ProductId').val("");
    $('#ProductName').val("");
    $('#ProductCode').val("");
    $('#ProductImageUrl').val("");
    $('#ProductCostPrice').val("");
    $('#ProductRetailPrice').val("");
    $('#ProductCreationDate').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#ProductName').css('border-color', 'lightgrey');
    $('#ProductCode').css('border-color', 'lightgrey');
    $('#ProductImageUrl').css('border-color', 'lightgrey');
    $('#ProductCostPrice').css('border-color', 'lightgrey');
    $('#ProductRetailPrice').css('border-color', 'lightgrey');
    

    console.log("Modal Pressed")
}


function validate() {
    var isValid = true;
    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');
    }
    if ($('#ProductCode').val().trim() == "") {
        $('#ProductCode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductCode').css('border-color', 'lightgrey');
    }
    if ($('#ProductImageUrl').val().trim() == "") {
        $('#ProductImageUrl').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductImageUrl').css('border-color', 'lightgrey');
    }
    if ($('#ProductCostPrice').val().trim() == "") {
        $('#ProductCostPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductCostPrice').css('border-color', 'lightgrey');
    }
    if ($('#ProductRetailPrice').val().trim() == "") {
        $('#ProductRetailPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductRetailPrice').css('border-color', 'lightgrey');
    }

    return isValid;
}


function check() {
    console.log("Checked")
}