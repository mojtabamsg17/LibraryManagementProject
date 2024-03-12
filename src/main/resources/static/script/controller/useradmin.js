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

//************************************search box****************************************************

var $searchBox, $paginationContainer, lastCount = 1;
const initialVariables = () => {
    localStorage.setItem("useradmin", 1);
    $searchBox = $("#fullsearch");
    $paginationContainer = $(".pagination");
}
const initEvent = () => {
    $searchBox.on("keyup", (e) => {
        if (e.which === 13 || event.keyCode === 13) {
            $.ajax({
                url: "محل قرار گیری api" + $("#fullsearch").val(),
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                }
            }).done(function (resp) {
                const size1 = resp.totalCount;
                if (resp.status === "SUCCESS") {
                    let table = $("<table/>", {
                        id: "data-table-customer",
                        class: "table text-nowrap w-100",
                        html: `<thead>
                <tr>
                <th>#</th>
                <th>شناسه کاربر</th>
                <th>نام کاربری</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>کد ملی</th>
                <th> سن</th>
                <th> جنسیت</th>
                <th>کدپستی</th>
                <th>تلفن</th>
                <th>شماره تماس</th>
                <th>آدرس</th>
                
                </tr>
                </thead>
                <tbody id="customer-data">

                </tbody>`
                    })
                    $.each(resp, function (index, v) {//(i, v) => {//$.each(resp.dataList, (i, v) => {
                        let tr = ` <tr>
         <td style="text-align: center"></td>
        <td style="text-align: center">${v.id}</td>
        <td style="text-align: center">${v.username}</td>
        <td style="text-align: center">${v.firstName}</td>     
        <td style="text-align: center">${v.lastName}</td>
        <td style="text-align: center">${v.nationalcode} </td>
         <td style="text-align: center">${v.age}</td>
         <td style="text-align: center">${v.gender}</td>
         <td style="text-align: center">${v.postalCode}</td>
         <td style="text-align: center">${v.phoneNumber}</td>
         <td style="text-align: center">${v.address}</td>
          
           
            
     
    </tr>`;
                        table.find("#customer-data").append(tr);
                    });
                    $("#table-place").html(table);
                    setTimeout(() => {
                        $("#data-table-customer").DataTable({
                            dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
                            lengthMenu: [10],
                            responsive: true,
                            buttons: [
                                {extend: 'print', className: 'btn btn-outline-default btn-sm ms-2'},
                                {extend: 'csv', className: 'btn btn-outline-default btn-sm'}
                            ]
                        });
                    }, 1000);
                }
                createPagination(size1);
            }).fail(function (resp, textStatus) {
                if (resp.responseJSON.message === "اتک نزن") {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا حملات امنیتی DDOS ',
                        text: " آی پی شما بلاک و از خدمات منع شدید",
                    })
                }

            });
        }
    })
}

//***************************************************************************************************

const getData = (offset, limit) => {
    $.ajax({
        // url: `http://localhost:9090/users/findAll/${offset}/${limit}`,
        url: `http://localhost:9090/users/findAll`,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
        // if (resp.status === "SUCCESS") {
        let table = $("<table/>", {
            id: "data-table-customer",
            class: "table text-nowrap w-100",
            html: `<thead>
                <tr>
                <th>شناسه کاربر</th>
                <th>نام کاربری</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>ایمیل</th>
                <th>تاریخ ثبت نام</th>
                <th>تاریخ اعتبار عضویت</th>
                <th>مسدود بودن حساب</th>
              
                
                </thead>
                <tbody id="customer-data">

                </tbody>`
        })
        $.each(resp, function (index, v) {//(i, v) => {//$.each(resp.dataList, (i, v) => {
            console.log(v)
            let tr = ` <tr>
         
        <td style="text-align: center">${v.id}</td>
        <td style="text-align: center">${v.username}</td>
        <td style="text-align: center">${v.firstName}</td>     
        <td style="text-align: center">${v.lastName}</td>
        <td style="text-align: center">${v.emailAddress}</td>
         <td style="text-align: center">${v.joinDate}</td>
         <td style="text-align: center">${v.dateOfRoleEnd}</td>
         <td style="text-align: center">${v.banned}</td>
           
    </tr>`;
            table.find("#customer-data").append(tr);
        });
        $("#table-place").html(table);
        setTimeout(() => {
            $("#data-table-customer").DataTable({
                dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
                lengthMenu: [10],
                responsive: true,
                buttons: [
                    {extend: 'print', className: 'btn btn-outline-default btn-sm ms-2'},
                    {extend: 'csv', className: 'btn btn-outline-default btn-sm'}
                ]
            });
        }, 1000);
        // }
        createPagination(lastCount);
    }).fail(function (resp, textStatus) {
        if (resp.responseJSON.message === "اتک نزن") {
            Swal.fire({
                icon: 'error',
                title: 'خطا حملات امنیتی DDOS ',
                text: " آی پی شما بلاک و از خدمات منع شدید",
            })
        }

    });
}


const createPagination = (contentSize) => {
    setTimeout(() => {
        let ul = $("<ul/>", {
            style: "display: flex;flex-direction: row;\n" +
                "    justify-content: start;\n" +
                "    align-content: center;\n" +
                "    flex-wrap: wrap;\n" +
                ""
        });
        let pageSize = Math.trunc(contentSize / 10);
        let percent = contentSize % 10;
        if (percent) {
            pageSize++;
        }
        for (let i = 1; i <= pageSize; i++) {
            let activeClass = "";
            if (Number(localStorage.getItem("useradmin")) === i) {
                activeClass = "active";
            }
            let li = $("<li/>", {
                class: "paginate_button page-item " + activeClass,
                html: `<a href="#" aria-controls="datatableDefault" data-dt-idx="${i}" tabindex="${i}" class="page-link">${i}</a>`,
                click: () => {
                    localStorage.setItem("useradmin", i);
                    $("#customer-data").html("");
                    getData((i - 1) * 10, 10);
                }
            });
            ul.append(li)
        }
        $(".pagination").html(ul);

    }, 1000);

}


//total data
const getTotalData = () => {
    $.ajax({
        url: "http://localhost:9090/users/findAll",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
        if (resp.status === "SUCCESS") {
            lastCount = resp.dataList[0];
            createPagination(resp.dataList[0]);
        }
    });
}

//**************************************************cookie*******************************************************************

const getCookie = (cName) => {
    let name = cName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//************************************************************show information******************************************

const showInformation = () => {
    $.ajax({
        url: "محل قرار گیری api",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
        if (resp.status === "SUCCESS") {
            $.each(resp.dataList, (i, v) => {
                var resp = JSON.stringify(v.username);

                $("#users12").append(" " + resp);

            })
        }
    });
}
//*******************************************ROLL BACK******************************************************************
$(function () {
    $("#rollbacks").click(function () {
        getData(0, 10);


    })
});

//********************************************update********************************************************************
$(function () {
    $("#updateusers").click(function () {
        let idUser = $("#iduserupdate").val();
        let fname = $("#fnameuserupdate").val();
        let lname = $("#lnameuserupdate").val();
        let age = $("#ageuserupdate").val();
        let phone = $("#phoneuserupdate").val();
        let phoneNumber = $("#phonenumberuserupdate").val();
        let postalCode = $("#postalcodeuserupdate").val();

        let usernames = $("#usernameuserupdate").val();
        let passwords = $("#passworduserupdate").val();
        let repeatpasswords = $("#repeatpassworduserupdate").val();
        let nationalcodes = $("#nationalcodeuserupdate").val();
        let address = $("#addressuserupdate").val();
        let gender = $("#genderuserupdate").val();

        if (!idUser) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        } else if (!fname) {
            Swal.fire({
                icon: 'warning',
                title: 'نام خالی',
                text: "لطفا نام خود را وارد کنید",
            })
        } else if (!lname) {
            Swal.fire({
                icon: 'warning',
                title: 'نام خانوادگی خالی',
                text: "لطفا نام خانوادگی خود را وارد کنید",
            })
        } else if (!nationalcodes) {
            Swal.fire({
                icon: 'warning',
                title: 'کد ملی خالی',
                text: "لطفا کد ملی خود را وارد کنید",
            })
        } else if (nationalcodes.length !== 10) {

            Swal.fire({
                icon: 'warning',
                title: 'ارقام کد ملی نامعتبر',
                text: "ارقام کد ملی 10 رقمی وارد کنید",
            })
        } else if (!age) {
            Swal.fire({
                icon: 'warning',
                title: 'سن خالی',
                text: "لطفا سن خود را وارد کنید",
            })
        } else if (!phone) {
            Swal.fire({
                icon: 'warning',
                title: 'شماره ثابت خالی',
                text: "لطفا شماره ثابت خود را وارد کنید",
            })
        } else if (phone.length <= 8) {
            Swal.fire({
                icon: 'warning',
                title: 'ارقام شماره ثابت کوتاه',
                text: "لطفا ارقام شماره ثابت خود را چک کنید",
            })
        } else if (!phoneNumber) {
            Swal.fire({
                icon: 'warning',
                title: 'شماره تلفن خالی',
                text: "لطفا شماره تلفن خود را وارد کنید",
            })
        } else if (phoneNumber.length !== 11) {
            Swal.fire({
                icon: 'warning',
                title: 'شماره تلفن نامعتبر',
                text: "لطفا شماره تلفن خود را چک کنید",
            })
        } else if (!postalCode) {
            Swal.fire({
                icon: 'warning',
                title: ' کد پستی خالی',
                text: "لطفا کد پستی خود را وارد کنید",
            })
        } else if (postalCode.length !== 10) {
            Swal.fire({
                icon: 'warning',
                title: ' کد پستی نامعتبر',
                text: "لطفا کد پستی خود را چک کنید",
            })
        } else if (!address) {
            Swal.fire({
                icon: 'warning',
                title: ' ایمیل خالی',
                text: "لطفا ایمیل خود را وارد کنید",
            })
        } else if (!usernames) {
            Swal.fire({
                icon: 'warning',
                title: ' نام کاربری خالی',
                text: "لطفا نام کاربری خود را وارد کنید",
            })
        } else if (usernames.length <= 8) {
            Swal.fire({
                icon: 'warning',
                title: ' نام کاربری کوتاه',
                text: "لطفا نام کاربری باید بیشتر 8 کاراکتر باشد",
            })
        } else if (!passwords) {
            Swal.fire({
                icon: 'warning',
                title: ' پسورد خالی',
                text: "لطفا پسورد خود را وارد کنید",
            })
        } else if (passwords.length <= 8) {
            Swal.fire({
                icon: 'warning',
                title: ' پسورد کوتاه',
                text: "لطفا پسورد باید بیشتر 8 کاراکتر باشد",
            })
        } else if (passwords !== repeatpasswords) {
            Swal.fire({
                icon: 'warning',
                title: ' تکرار پسورد نامعتبر',
                text: "پسورد و تکرار پسورد باید یکسان باشد",
            })
        } else {
            var CustomerDto = {};
            CustomerDto.id = idUser;
            CustomerDto.firstName = fname;
            CustomerDto.lastName = lname;
            CustomerDto.age = age;
            CustomerDto.phone = phone;
            CustomerDto.phoneNumber = phoneNumber;
            CustomerDto.postalCode = postalCode;
            CustomerDto.username = usernames;
            CustomerDto.password = passwords;
            CustomerDto.repeatpassword = repeatpasswords;
            CustomerDto.nationalcode = nationalcodes;
            CustomerDto.address = address;
            CustomerDto.gender = gender;
            $.ajax({
                type: "PUT",
                url: "http://localhost:9090/users/update",
                data: JSON.stringify(CustomerDto),
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
                if (resp.responseJSON.message === "اتک نزن") {
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

//*******************************************DELETE*********************************************************************

$(function () {
    $("#delete_users").click(function () {
        let id_delete = $("#id_delete_user").val();


        if (!id_delete) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        } else {
            // var CustomerDto = {};
            // CustomerDto.id=id_delete;

            $.ajax({
                type: "DELETE",
                url: "http://localhost:9090/users/delete/" + id_delete,
                // data: JSON.stringify(CustomerDto),
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
                if (resp.responseJSON.message === "اتک نزن") {
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


//*******************************************ready**********************************************************************

$(document).ready(function () {
    initialVariables();
    initEvent();
    getData(0, 10);
    getTotalData();
    showInformation();
});


const separatorNumber = (data) => {
    return data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}