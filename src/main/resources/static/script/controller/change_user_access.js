




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
    $("#accessuser").click(function () {
        let amount = $("#amount").val();


        //     var CustomerDto = {};
        // CustomerDto.amount = 100000;


            $.ajax({
                type: "GET",
                url: "http://localhost:9090/users/setRole/normal",
                // data: JSON.stringify(CustomerDto) ,
                // contentType: "application/json; charset=utf-8",
                // dataType: "json",

                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                }
            }).done(function (resp) {
                console.log(resp.status)
                console.log(resp)
                if (resp.status === "SUCCESS") {
                    Swal.fire({
                        icon: 'success',
                        title: 'کتابخانه کمین',
                        text: "عملیات ثبت موفق",
                    })

                    return;
                } else if (resp.status === "RepeatRoleException") {

                    Swal.fire({
                        icon: 'warning',
                        title: '',
                        text: "درخواست نوع عضویت مشابه!",
                    })
                    return;
                } else if (resp.status === "BannedAccountException") {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: "حساب شما مسدود است!",
                    })
                }else if (resp.status === "NotEnoughWalletException") {
                    Swal.fire({
                        icon: 'error',
                        title: 'موجودی ناکافی',
                        text: "موجودی حساب شما کافی نیست!",
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








    })
});

$(function () {
    $("#accessvip").click(function () {



        // var CustomerDto = {};
        // CustomerDto.amount = 200000;


        $.ajax({
            type: "GET",
            url: "http://localhost:9090/users/setRole/specialize",
            // data: JSON.stringify(CustomerDto) ,
            // contentType: "application/json; charset=utf-8",
            // dataType: "json",

            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
            }
        }).done(function (resp) {

            console.log(resp.status)
            console.log(resp)
            if (resp.status === "SUCCESS") {
                Swal.fire({
                    icon: 'success',
                    title: 'کتابخانه کمین',
                    text: "عملیات ثبت موفق",
                })

                return;
            } else if (resp.status === "RepeatRoleException") {

                Swal.fire({
                    icon: 'warning',
                    title: '',
                    text: "درخواست نوع عضویت مشابه!",
                })
                return;
            } else if (resp.status === "BannedAccountException") {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: "حساب شما مسدود است!",
                })
            }else if (resp.status === "NotEnoughWalletException") {
                Swal.fire({
                    icon: 'error',
                    title: 'موجودی ناکافی',
                    text: "موجودی حساب شما کافی نیست!",
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








    })
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


