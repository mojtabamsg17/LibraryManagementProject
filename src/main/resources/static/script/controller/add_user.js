 




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
        let fname = $("#firstName").val();
        let lname = $("#lname").val();
        // let age = $("#age").val();
        // let phone = $("#phone").val();
        // let phoneNumber = $("#phoneNumber").val();
        // let postalCode = $("#postalCode").val();

        let usernames = $("#usernames").val();
        let passwords = $("#passwords").val();
        let repeatpasswords = $("#repeatpasswords").val();
        // let nationalcodes = $("#nationalcodes").val();
        // let address = $("#address").val();
        // let gender = $("#gender").val();

        let emailAddress = $("#emailAddress").val();


        if (passwords != repeatpasswords) {
            Swal.fire({
                icon: 'warning',
                title: 'تکرار پسورد صحیح نیست '
            })
        }
        if (!fname) {
            Swal.fire({
                icon: 'warning',
                title: 'نام خالی',
                text: "لطفا نام خود را وارد کنید",
            })
        }

        else if (!lname) {
            Swal.fire({
                icon: 'warning',
                title: 'نام خانوادگی خالی',
                text: "لطفا نام خانوادگی خود را وارد کنید",
            })
        }
        else if (!emailAddress) {
            Swal.fire({
                icon: 'warning',
                title: 'ایمیل  وارد کن'
            })
        }
        // else if (!age) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'سن خالی',
        //         text: "لطفا سن خود را وارد کنید",
        //     })
        // }
        //
        // else if (!phone) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'شماره ثابت خالی',
        //         text: "لطفا شماره ثابت خود را وارد کنید",
        //     })
        // }
        // else if (phone.length <= 8) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'ارقام شماره ثابت کوتاه',
        //         text: "لطفا ارقام شماره ثابت خود را چک کنید",
        //     })
        // }

        else if (!repeatpasswords) {
            Swal.fire({
                icon: 'warning',
                title: 'شماره تلفن خالی',
                text: "تکرار پسورد وارد کنید",
            })
        }
        // else if (phoneNumber.length !== 11) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'شماره تلفن نامعتبر',
        //         text: "لطفا شماره تلفن خود را چک کنید",
        //     })
        // }
        // else if (!postalCode) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' کد پستی خالی',
        //         text: "لطفا کد پستی خود را وارد کنید",
        //     })
        // }
        // else if (postalCode.length !== 10) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' کد پستی نامعتبر',
        //         text: "لطفا کد پستی خود را چک کنید",
        //     })
        // }
        // else if (!address) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' ایمیل خالی',
        //         text: "لطفا ایمیل خود را وارد کنید",
        //     })
        // }

        else if (!usernames) {
            Swal.fire({
                icon: 'warning',
                title: ' نام کاربری خالی',
                text: "لطفا نام کاربری خود را وارد کنید",
            })
        }

        // else if (usernames.length <= 8 ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' نام کاربری کوتاه',
        //         text: "لطفا نام کاربری باید بیشتر 8 کاراکتر باشد",
        //     })
        // }
        else if (!passwords ) {
            Swal.fire({
                icon: 'warning',
                title: ' پسورد خالی',
                text: "لطفا پسورد خود را وارد کنید",
            })
        }
        // else if (passwords.length <= 8) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' پسورد کوتاه',
        //         text: "لطفا پسورد باید بیشتر 8 کاراکتر باشد",
        //     })
        // }
        // else if (passwords !== repeatpasswords) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' تکرار پسورد نامعتبر',
        //         text: "پسورد و تکرار پسورد باید یکسان باشد",
        //     })
        // }


        else {
            var CustomerDto = {};
            CustomerDto.firstName = fname;
            CustomerDto.lastName = lname;
            // CustomerDto.age = age;
            // CustomerDto.phone = phone;
            // CustomerDto.phoneNumber = phoneNumber;
            // CustomerDto.postalCode = postalCode;
            CustomerDto.username = usernames;
            CustomerDto.password = passwords;
            // CustomerDto.repeatpassword = repeatpasswords;
            // CustomerDto.nationalcode = nationalcodes;
            CustomerDto.emailAddress = emailAddress;
            CustomerDto.banned = true;
            // CustomerDto.gender = gender;

            $.ajax({
                type: "POST",
                url: "http://localhost:9090/users/save",
                data: JSON.stringify(CustomerDto) ,
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


