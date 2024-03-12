app.controller("loginCtlr", function ($scope, apiHandler, $cookies) {
    $scope.CustomerDto = {};

    $scope.doLogin = () => {
        let  usernames = $("#usernames").val();
        let  passwords = $("#passwords").val();

        if (!usernames) {
            Swal.fire({
                icon: 'warning',
                title: 'نام کاربری خالی',
                text: "لطفا نام کاربری خود را وارد کنید",
            })
        }

        else if (!passwords) {
            Swal.fire({
                icon: 'warning',
                title: 'رمز عبور خالی',
                text: "لطفا رمز عبور خود را وارد کنید",
            })
        }
        else {

            apiHandler.callPost(
                'http://localhost:9090/users/login',
                $scope.CustomerDto,
                (response) => {
                    if (response.status === 'FAILED') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'اطلاعات نا معتبر',
                            text: " یوزرنیم یا پسورد نا معتبر",
                        })
                        return;
                    }
                    var token = response.dataList[0].token;
                    if (token == null || token == "") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "invalid token",
                        })
                        return;
                    }
                    $cookies.put("userToken", token);
                    location.href = "/panel.html";
                }, (error) => {
                });

        }

    }


    $scope.doRegister = () => {
        location.href="/register.html";

    }

});


