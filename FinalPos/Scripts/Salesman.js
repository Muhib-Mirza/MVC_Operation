// Load Data in Table when document is ready
$(document).ready(function () {
    
    console.log("document is ready")
    loadData();
});

// Load Data function
function loadData() {
    $.ajax({
        url: "/Salesman/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {

                var date = new Date(parseInt(item.SalesmanEntryDate.substr(6)));

                // Format the date as "Day/Month/Year"
                var formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();


                html += '<tr>';
                html += '<td>' + item.SalesmanId + '</td>';
                html += '<td>' + item.SalesmanCode + '</td>';
                html += '<td>' + item.SalesmanName + '</td>';
                html += '<td>' + formattedDate + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.SalesmanId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SalesmanId + ')">Delete</a></td>';
                html += '</tr>';
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
        SalesmanId: $('#SalesmanId').val(),
        SalesmanCode: $('#SalesmanCode').val(),
        SalesmanName: $('#SalesmanName').val(),
        SalesmanEntryDate: $('#SalesmanEntryDate').val(),
    };
    $.ajax({
        url: "/Salesman/Add",
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


function getbyID(smID) {
    $('#SalesmanCode').css('border-color', 'lightgrey');
    $('#SalesmanName').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Salesman/getbyID/" + smID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#SalesmanId').val(result.SalesmanId);
            $('#SalesmanCode').val(result.SalesmanCode);
            $('#SalesmanName').val(result.SalesmanName);
            $('#SalesmanEntryDate').val(result.SalesmanEntryDate);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
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
        SalesmanId: $('#SalesmanId').val(),
        SalesmanCode: $('#SalesmanCode').val(),
        SalesmanName: $('#SalesmanName').val(),
        SalesmanEntryDate: $('#SalesmanEntryDate').val(),
        
    };
    $.ajax({
        url: "/Salesman/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#SalesmanId').val("");
            $('#SalesmanCode').val("");
            $('#SalesmanName').val("");
            $('#SalesmanEntryDate').val("");
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Salesman/Delete/" + ID,
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

    $('#SalesmanId').val("");
    $('#SalesmanCode').val("");
    $('#SalesmanName').val("");
    $('#SalesmanEntryDate').val("");
   
    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#SalesmanCode').css('border-color', 'lightgrey');
    $('#SalesmanName').css('border-color', 'lightgrey');
    
    console.log("Modal Pressed")
}


function validate() {
    var isValid = true;
    if ($('#SalesmanCode').val().trim() == "") {
        $('#SalesmanCode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SalesmanCode').css('border-color', 'lightgrey');
    }
    if ($('#SalesmanName').val().trim() == "") {
        $('#SalesmanName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SalesmanName').css('border-color', 'lightgrey');
    }
   
    return isValid;
}


function check() {
    console.log("Checked")
}