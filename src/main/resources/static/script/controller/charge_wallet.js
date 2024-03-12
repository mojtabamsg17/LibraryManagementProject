




// app.controller("panelController", function ($scope, $cookies) {
//
//     $scope.checkAccess = () => {
//         var token = $cookies.get("userToken");
//
//         if (token === undefined || token == null || token === "") {
//             location.href = "/loginA.html";
//         }
//     }
//
//     $scope.logout = () => {
//         $cookies.remove("userToken");
//         location.href = "/loginA.html";
//     }
//     $scope.checkAccess();
// });



$(function () {
    $("#amountpromotebutton").click(function () {
        let amount = $("#amountpromotes").val();

        if (!amount) {
            Swal.fire({
                icon: 'warning',
                title: 'مبلغ درخواستی خالی',
                text: "لطفا مبلغ درخواستی خود را وارد کنید",
            })
        }
        else {

            var CustomerDto = {};
            CustomerDto.amount = amount;

            $.ajax({
                type: "POST",
                url: "http://localhost:9090/users/chargeWallet/"+amount,
                // data: JSON.stringify(CustomerDto) ,
                // contentType: "application/json; charset=utf-8",
                // dataType: "json",

                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                }
            }).done(function (resp) {
                if (resp.status === "SUCCESS") {
                    Swal.fire({
                        icon: 'success',
                        title: 'کتابخانه مکین',
                        text: "عملیات ثبت موفق",
                    })

                    return;
                } else if (resp.status === "FAILED") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'رمز دوم اشتباه',
                        text: "رمز دوم فعلی اشتباه است",
                    })
                    return;
                } else if (resp.status === "EXCEPTION") {
                    Swal.fire({
                        icon: 'error',
                        title: 'مکین بانک',
                        text: "خطا سمت سرور بعدا تلاش کنید",
                    })
                }

            }).fail(function (resp, textStatus) {
                if(resp.responseJSON.message ==="اتک نزن"){
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا حملات امنیتی DDOS ',
                        text: " آی پی شما بلاک و از خدمات منع شدید",
                    })
                }

            });


        }


    })
});



$.ajax({
    url: "http://localhost:9090/users/getWallet",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
    }
}).done(function (resp) {
    if (resp.status === "SUCCESS") {
        Swal.fire({
            icon: 'success',
            title: ' میزان موجودی'+ resp.amount,
        })
        let amount = resp.amount;
        $.each(resp, function(index, v) {
            var a=separatorNumber(amount+"");
            var resp=JSON.stringify(a);

            $("#infoamount").append(" "+a);

        })
    }
});


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$.ajax({
    url: "محل قرار یری api",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
    }
}).done(function (resp) {
    if (resp.status === "SUCCESS") {
        $.each(resp.dataList, (i, v) => {
            var resp=JSON.stringify(v.username);

            $("#users12").append(" "+resp);

        })
    }
});


