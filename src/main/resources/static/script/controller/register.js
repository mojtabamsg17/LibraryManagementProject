app.controller("registerCtlr", function ($scope, apiHandler, $cookies) {


    $scope.doRegister = () => {
        let firstName = $("#fname").val();
        let lastName = $("#lname").val();
        // let age = $("#ages").val();
        // let phone = $("#phone").val();
        // let phoneNumber = $("#phoneNumber").val();
        // let address = $("#address").val();
        // let postalCode = $("#postalCode").val();
        // let gender = $("#gender").val();
        // let usernames = $("#usernames").val();
        // let passwords = $("#password").val();
        // let repeatpasswords = $("#repeatPassword").val();
        // let nationalcodes = $("#nationalcode").val();
        //
        //
        // if (!fname) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'نام خالی',
        //         text: "لطفا نام خود را وارد کنید",
        //     })
        // }
        //
        // else if (!lname) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'نام خانوادگی خالی',
        //         text: "لطفا نام خانوادگی خود را وارد کنید",
        //     })
        // }
        // else if (!nationalcodes) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'کد ملی خالی',
        //         text: "لطفا کد ملی خود را وارد کنید",
        //     })
        // }
        // else if (nationalcodes.length !== 10) {
        //
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'ارقام کد ملی نامعتبر',
        //         text: "ارقام کد ملی 10 رقمی وارد کنید",
        //     })
        // }
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
        //
        // else if (!phoneNumber) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'شماره تلفن خالی',
        //         text: "لطفا شماره تلفن خود را وارد کنید",
        //     })
        // }
        // else if (phoneNumber.length !== 11) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'شماره تلفن نامعتبر',
        //         text: "لطفا شماره تلفن خود را چک کنید",
        //     })
        // }
        // else if (!address) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'آدرس خالی',
        //         text: "لطفا آدرس خود را وارد کنید",
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
        //
        //
        // else if (!usernames) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' نام کاربری خالی',
        //         text: "لطفا نام کاربری خود را وارد کنید",
        //     })
        // }
        //
        // else if (usernames.length <= 8 ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' نام کاربری کوتاه',
        //         text: "لطفا نام کاربری باید بیشتر 8 کاراکتر باشد",
        //     })
        // }
        // else if (!passwords ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: ' پسورد خالی',
        //         text: "لطفا پسورد خود را وارد کنید",
        //     })
        // }
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




        // else {

            apiHandler.callPost(
                'http://localhost:9090/users/save',
                $scope.CustomerDto,
                (response) => {

                    let result = response.data;
                    if (response.status === "USERNAME_IN_USED") {
                        Swal.fire({
                            icon: 'warning',
                            title: 'نام کاربری نامعتبر',
                            text: "نام کاربری شما در سامانه وجود دارد",
                        })
                        return;
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'ثبت نام موفق',
                            text: "جهت مشاهده اطلاعات کارت وارد شوید (رمز اول و دوم شما 1010 در اسرع وقت اقدام به تغییر آن کنید) و جهت دریافت کارت به بانک مراجعه کنید",
                        })
                    }
                }, (error) => {

                });
        // }

    }

    $scope.doLogin = () => {
        location.href = "/loginA.html";
    }
});


// const isValidEmail = (mail) => {
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//         return true;
//     }
//     return false;
// }




