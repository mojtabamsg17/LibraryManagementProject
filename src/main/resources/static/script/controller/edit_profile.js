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
    localStorage.setItem("userupdate", 1);
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
                    $.each(resp.dataList, (i, v) => {
                        let tr = ` <tr>
        <th scope="row">${i + 1}</th>
        <td style="text-align: center">${v.originCardNumber}</td>
        <td style="text-align: center">${v.destinationCardNumber}</td>
        <td style="text-align: center">${v.dateTransaction}</td>
        <td style="text-align: center"> تومان ${v.amountTransaction} </td>
         <td style="text-align: center">${v.fullTitle}</td>
        //محل پر کردن دیتا ها مطابق بالا برای قرار گیری در جدول
          
           
            
     
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
        url: `/محل قرار گیری api${offset}/${limit}`,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
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
                </thead>
                <tbody id="customer-data">

                </tbody>`
            })
            $.each(resp.dataList, (i, v) => {
                let tr = ` <tr>
        <th scope="row">${i}</th>
        <td style="text-align: center">${v.originCardNumber}</td>
        <td style="text-align: center">${v.destinationCardNumber}</td>
        <td style="text-align: center">${v.dateTransaction}</td>
        <td style="text-align: center">${separatorNumber(v.amountTransaction + "")}</td>
           <td style="text-align: center">${v.fullTitle}</td>
             //محل پر کردن دیتا ها مطابق بالا برای قرار گیری در جدول
           
            
     
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
            if (Number(localStorage.getItem("userupdate")) === i) {
                activeClass = "active";
            }
            let li = $("<li/>", {
                class: "paginate_button page-item " + activeClass,
                html: `<a href="#" aria-controls="datatableDefault" data-dt-idx="${i}" tabindex="${i}" class="page-link">${i}</a>`,
                click: () => {
                    localStorage.setItem("userupdate", i);
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
        url: "محل قراری api ",
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
    $("#updateuser1").click(function () {

        let fname = $("#fnamess").val();
        let lname = $("#lnamess").val();
        let age = $("#age1").val();
        let phone = $("#phone").val();
        let phoneNumber = $("#phonenumber").val();
        let postalCode = $("#postalcode").val();
        let address = $("#address").val();
        let gender = $("#gender").val();

            if (!fname) {
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
        }     else if (!age) {
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
        }      else {
            var CustomerDto = {};
            CustomerDto.firstName = fname;
            CustomerDto.lastName = lname;
            CustomerDto.age = age;
            CustomerDto.phone = phone;
            CustomerDto.phoneNumber = phoneNumber;
            CustomerDto.postalCode = postalCode;
            CustomerDto.address = address;
            CustomerDto.gender = gender;
            $.ajax({
                type: "PUT",
                url: "محل قرار گیری api",
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

//*******************************************updatepassword*********************************************************************

$(function () {
    $("#updatepass").click(function () {
        let pass1 = $("#pass1").val();
        let newpass = $("#newpass").val();
        let repeatpass = $("#repeatpass").val();


        if (!pass1) {
            Swal.fire({
                icon: 'warning',
                title: 'رمز فعلی خالی',
                text: "لطفا رمز فعلی خود را وارد کنید",
            })
        }else if (!newpass) {
            Swal.fire({
                icon: 'warning',
                title: 'رمز جدید خالی',
                text: "لطفا رمز جدید خود را وارد کنید",
            })
        }else if (!repeatpass) {
            Swal.fire({
                icon: 'warning',
                title: 'تکرار رمز جدید خالی',
                text: "لطفا تکرار رمز جدید خود را وارد کنید",
            })
        }else if (newpass !== repeatpass) {
            Swal.fire({
                icon: 'warning',
                title: ' تکرار پسورد نامعتبر',
                text: "پسورد و تکرار پسورد باید یکسان باشد",
            })
        }

        else {
            var CustomerDto = {};
            CustomerDto.password=pass1;
            CustomerDto.newPassword=newpass;
            CustomerDto.repeatNewPassword=repeatpass;
            $.ajax({
                type: "PUT",
                url: "محل قرار گیری api",
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

//********************************************delete account************************************************************

$(function () {
    $("#deleteacounts").click(function () {

            $.ajax({
                type: "PUT",
                url: "محل قرار گیری api",
                data: JSON.stringify(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                }
            }).done(function (resp) {
                if (resp.status === "SUCCESS") {
                    $cookies.remove("userToken");
                    location.href = "/loginA.html";

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