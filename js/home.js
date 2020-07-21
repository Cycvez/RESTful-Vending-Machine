// home.js
$(document).ready(function () {
    loadItems();

    var amountEntered = 0;
    $("#fundsEntered").val("");

    $("#dollar").click(function () {
        amountEntered += 1;
        sum(amountEntered);
    });

    $("#quarter").click(function () {
        amountEntered += 0.25;
        sum(amountEntered);
    });

    $("#dime").click(function () {
        amountEntered += 0.10;
        sum(amountEntered);
    });

    $("#nickel").click(function () {
        amountEntered += 0.05;
        sum(amountEntered);
    });

    $("#returnChange").click(function () {
        returnChange();
    });

    function sum(amountEntered) {
        $("#fundsEntered").val(amountEntered.toFixed(2));
    };

    $("#makePurchase").click(function () {
        var fundsAvailable = $("#fundsEntered").val();
        var itemSelectedId = $("#itemSelected").val();
        $.ajax({
            type: 'POST',
            url: 'http://tsg-vending.herokuapp.com/money/' + fundsAvailable + '/item/' + itemSelectedId + '',
            success: function (data) {
                var quarters = data.quarters;
                var dimes = data.dimes;
                var nickels = data.nickels;
                var pennies = data.pennies;

                $('#message').val("Thank You!");
                displayChange(quarters, dimes, nickels, pennies);
                amountEntered = 0;
                $("#fundsEntered").val(amountEntered);
                loadItems();

            },
            error: function (err) {
                var errMessage = jQuery.parseJSON(err.responseText);
                $('#message').val(errMessage.message);
            },
        })

    });
});

function returnChange() {
    var initialFunds = $('#fundsEntered').val() * 100;
    var remainder = 0;
    var quarterCount = 0;
    var dimeCount = 0;
    var nickelCount = 0;
    var pennyCount = 0;


    if (initialFunds > 0) {
        quarterCount = Math.floor(initialFunds / 25);
        remainder = initialFunds % 25;

        dimeCount = Math.floor(remainder / 10);
        remainder = remainder % 10;

        nickelCount = Math.floor(remainder / 5);
        remainder = remainder % 5;

        pennyCount = Math.round(remainder);
    }
    displayChange(quarterCount, dimeCount, nickelCount, pennyCount)
}

function displayChange(quarters, dimes, nickels, pennies) {
    var changeDisplayText = '';
    var nameIndex = 0;
    var coinName = ['Quarters', 'Dimes', "Nickels", "Pennies"];
    var change = [quarters, dimes, nickels, pennies];

    change.forEach(checkIfDisplayIsNeeded);

    function checkIfDisplayIsNeeded(currentCoin) {
        if (currentCoin != 0) {
            changeDisplayText += coinName[nameIndex];
            changeDisplayText += ": ";
            changeDisplayText += currentCoin;
            changeDisplayText += " ";
        };
        nameIndex++;
    };
    $("#changeReturned").val(changeDisplayText);
};



function loadItems() {

    $.ajax({
        type: 'GET',
        url: 'http://tsg-vending.herokuapp.com/items',
        success: function (data) {
            console.log(data);


            $.each(data, function (index, item) {
                var i = "<button type='button' style= 'border: solid' class='itemButton col-3 m-3' onclick='itemSelected(" + item.id + ")' id=" + item.id + ">";
                i += "<p>" + item.id + "</p>";
                i += "<p style= 'text-align: center'>" + item.name + "</p>";
                i += "<p style= 'text-align: center'>$" + item.price + "</p><br>";
                i += "<p style= 'text-align: center'>Stock: " + item.quantity + "</p>";
                i += "</button>";

                $('#itemOptions').append(i);
            });


        },
        error: function (jqXHr) {
            console.log(jqXHr);

        }
    });
};

function itemSelected(id) {
    $("#itemSelected").val(id);
};