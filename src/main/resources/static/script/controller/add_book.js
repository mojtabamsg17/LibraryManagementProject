




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
    $("#btnpost").click(function () {
        let title = $("#nameBook").val();
        let author = $("#author").val();
        let balance = $("#entity_all").val();
        let mBookType = $("#category").val();


        if (!nameBook) {
            Swal.fire({
                icon: 'warning',
                title: 'نام کتاب خالی',
                text: "لطفا نام کتاب خود را وارد کنید",
            })
        }

        else if (!author) {
            Swal.fire({
                icon: 'warning',
                title: 'نام نویسنده خالی',
                text: "لطفا نام نویسنده را وارد کنید",
            })
        }
        else if (!entity_all) {
            Swal.fire({
                icon: 'warning',
                title: 'تعداد کتاب خالی',
                text: "لطفا تعداد کتاب را وارد کنید",
            })
        }

        else if (!category) {
            Swal.fire({
                icon: 'warning',
                title: 'دسته بندی خالی',
                text: "لطفا دسته بندی را وارد کنید",
            })
        }




        else {
            var BookDto = {};
            BookDto.title = title;
            BookDto.author = author;
            BookDto.totalBookCount = balance;
            BookDto.typeName = mBookType;
alert(BookDto.typeName);
            $.ajax({
                type: "POST",
                url: "http://localhost:9090/books/save",
                data: JSON.stringify(BookDto) ,
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                // }
            })
                .done(function (resp) {
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








    }})
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
    url: "http://localhost:9090/books/findAll",
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


