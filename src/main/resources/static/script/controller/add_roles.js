




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
    $("#addRole").click(function () {
        let nameRole = $("#nameRole").val();
        let paymentPerMonth = $("#paymentRole").val();
        let maxTotalBorrowedBookCount = $("#maxTotalBorrowedBookCount").val();
        let freeBorrowedGeneralBookCount = $("#freeBorrowedGeneralBookCount").val();
        let freeBorrowedSpecialBookCount = $("#freeBorrowedSpecialBookCount").val();
        let freeBorrowedRareBookCount = $("#freeBorrowedRareBookCount").val();
        let borrowedRareBookCount = $("#borrowedRareBookCount").val();
        let extraBorrowedGeneralBookCount = $("#extraBorrowedGeneralBookCount").val();
        let extraBorrowedSpecialBookCount = $("#extraBorrowedSpecialBookCount").val();
        let paymentPerExtraBorrowedSpecialBook = $("#paymentPerExtraBorrowedSpecialBook").val();
        let paymentPerExtraBorrowedGeneralBookCount = $("#paymentPerExtraBorrowedGeneralBookCount").val();
        let paymentPerRareBook = $("#paymentPerRareBook").val();





        if (!nameRole) {
            Swal.fire({
                icon: 'warning',
                title: 'نام نقش خالی',
                text: "لطفا نام نقش خود را وارد کنید",
            })
        }

        else {
            var memberTypeDto = {};
            memberTypeDto.memberTypeName = nameRole;
            memberTypeDto.paymentPerMonth = paymentPerMonth;
            memberTypeDto.maxTotalBookCount = maxTotalBorrowedBookCount;
            memberTypeDto.freeGeneralBookCount = freeBorrowedGeneralBookCount;
            memberTypeDto.freeSpecialBookCount = freeBorrowedSpecialBookCount;
            memberTypeDto.freeBorrowedRareBookCount = freeBorrowedRareBookCount;
            memberTypeDto.borrowedRareBookCount = borrowedRareBookCount;
            memberTypeDto.extraGeneralBookCount = extraBorrowedGeneralBookCount;
            memberTypeDto.extraSpecialBookCount = extraBorrowedSpecialBookCount;
            memberTypeDto.paymentPerExtraSpecialBook = paymentPerExtraBorrowedSpecialBook;
            memberTypeDto.paymentPerExtraGeneralBook = paymentPerExtraBorrowedGeneralBookCount;
            memberTypeDto.paymentPerRareBook = paymentPerRareBook;



            $.ajax({
                type: "POST",
                url: "http://localhost:9090/memberType/save",
                data: JSON.stringify(memberTypeDto) ,
                contentType: "application/json; charset=utf-8",
                dataType: "json",

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


