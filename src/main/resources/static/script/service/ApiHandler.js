app.service("apiHandler", function ($http, $cookies) {

    this.callPost = (url, data, onSuccess, onError, setToken) => {
        let request = {
            url: url,
            method: 'POST',
            data: data
        };
        this.checkAndSetToken(request, setToken);
        $http(request).then((response) => {
            if (response != null && response.data != null) {
                let result = response.data;
                if (result.status == "SUCCESS" ) {
                    onSuccess(result);
                } else if (result.hasError) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'هشدار',
                        text: result.message,
                    })
                }else if (result.status === "NATIONAL_CODE_WRONG") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'خطا صحت مشخصات',
                        text: "اطلاعات در سامانه ثبت احوال یافت نشد",
                    })
                }

                else if (result.status === "CIVIL_SERVER_DOWN") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'خطا سامانه ثبت احوال',
                        text: "لطفا دقایقی دیگر مجددا تلاش کنید",
                    })
                }

                else if (result.hasError) {
                    Swal.fire({
                        icon: 'error',
                        title: 'ارور',
                        text: result.message,
                    })
                }
               else if (response.status === "NATIONALCODE_IN_USED") {
                    Swal.fire({
                        icon: 'warning',
                        title: ' کد ملی نامعتبر',
                        text: "کد ملی شما در سامانه وجود دارد",
                    })
                    return;
                }
                else if (result.status === "USERNAME_IN_USED"){
                    Swal.fire({
                        icon: 'warning',
                        title: 'نام کاربری نامعتبر',
                        text: "نام کاربری شما در سامانه وجود دارد",
                    })

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ارور',
                        text: "ارور ناشناس!!!",
                    })
                }
            }

        }, (err) => {

            Swal.fire({
                icon: 'error',
                title: 'خطا سمت سرور',
                text: "لطفا مجددا تلاش کنید",
            })
            onError(err);
        });
    }

    this.callGet = (url, onSuccess, onError, setToken) => {
        let request = {
            url: url,
            method: 'GET'
        };
        this.checkAndSetToken(request, setToken);
        $http(request).then((response) => {
            if (response != null && response.data != null) {
                let result = response.data;
                if (result.status == "SUCCESS") {
                    onSuccess(result);
                } else if (result.hasError) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "unknown error!!!",
                    })
                }
            }

        }, (err) => {
            if(err.status == 417){
                $cookies.remove("userToken");
                location.href = "/login";
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Exception on server",
            });
            onError(err);
        });
    }

    this.callPut = (url, data, onSuccess, onError, setToken) => {
        url = "/api/" + url;
        let request = {
            url: url,
            method: 'PUT',
            data: data
        };
        this.checkAndSetToken(request, setToken);
        $http(request).then((response) => {
            if (response != null && response.data != null) {
                let result = response.data;
                if (result.status == "SUCCESS") {
                    onSuccess(result);
                } else if (result.hasError) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "unknown error!!!",
                    })
                }
            }

        }, (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Exception on server",
            })
            onError(err);
        });
    }


    this.callDelete = (url, onSuccess, onError, setToken) => {
        url = "/api/" + url;
        let request = {
            url: url,
            method: 'DELETE'
        };
        this.checkAndSetToken(request, setToken);
        $http(request).then((response) => {
            if (response != null && response.data != null) {
                let result = response.data;
                if (result.status == "SUCCESS") {
                    onSuccess(result);
                } else if (result.hasError) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "unknown error!!!",
                    })
                }
            }

        }, (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Exception on server",
            })
            onError(err);
        });
    }

    this.checkAndSetToken = (request, setToken) => {
        if (setToken) {
            let token = $cookies.get("userToken");
            request.headers = {
                'Authorization': 'Bearer ' + token
            };
        }
    }
})