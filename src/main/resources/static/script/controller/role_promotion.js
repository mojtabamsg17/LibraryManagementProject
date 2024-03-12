




// app.controller("panelController", function ($scope, $cookies) {
//
//     $scope.checkAccess = () => {
//         var token = $cookies.get("userToken");
//
//         if (token === undefined || token == null || token === "") {
//             location.href = "/login.html";
//         }
//     }
//
//     $scope.logout = () => {
//         $cookies.remove("userToken");
//         location.href = "/login.html";
//     }
//     $scope.checkAccess();
// });



$(function () {
    $("#promoted").click(function () {
        let id_user = $("#id_user").val();
        let roles = $("#roles").val();



        if (!id_user) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        }

        else if (!roles) {
            Swal.fire({
                icon: 'warning',
                title: 'نقش خالی',
                text: "لطفا نقش خانوادگی خود را وارد کنید",
            })
        }
        else {
            // var RoleDto = {};
            // RoleDto.id = id_user;
            // RoleDto.roleName = roles;

            $.ajax({
                type: "POST",
                url: "http://localhost:9090/users/changeRoleByAdmin/"+id_user+"/"+roles,
                // data: JSON.stringify(RoleDto) ,
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
                } else if (resp.status === "CantChangeYourRoleException") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'نمی توانید رول خود را تغییر دهید'
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


