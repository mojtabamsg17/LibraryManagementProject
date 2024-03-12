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
    localStorage.setItem("mybook", 1);
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
                 <th>شناسه کتاب</th>
            <th>عنوان کتاب</th>
            <th>دسته کتاب</th>
            <th>تاریخ دریافت</th>
            <th>تعداد روز باقیمانده</th>
                
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
        url: `http://localhost:9090/books/findByBookType/general/${offset}/${limit}`,
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
                 
                
                 <th>شناسه کتاب</th>
            <th>عنوان کتاب</th>
            <th>دسته کتاب</th>
            <th>تاریخ دریافت</th>
            <th>تعداد روز باقیمانده</th>
            
                </thead>
                <tbody id="customer-data">

                </tbody>`
            })
            $.each(resp, function(index, v){//resp.dataList, (i, v) => {
                let tr = ` <tr>
        
        <td style="text-align: center">${v.id}</td>
        <td style="text-align: center">${v.title}</td>
        <td style="text-align: center">${v.title}</td>
        <td style="text-align: center">${v.title}</td>
        <td style="text-align: center">${v.title}</td>
        <td style="text-align: center">${v.title}</td>
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
            if (Number(localStorage.getItem("mybook")) === i) {
                activeClass = "active";
            }
            let li = $("<li/>", {
                class: "paginate_button page-item " + activeClass,
                html: `<a href="#" aria-controls="datatableDefault" data-dt-idx="${i}" tabindex="${i}" class="page-link">${i}</a>`,
                click: () => {
                    localStorage.setItem("mybook", i);
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

//********************************************give back********************************************************************
$(function () {
    $("#addgivebackbook").click(function () {
        let givebackbook = $("#givebackbook").val();



        if (!givebackbook) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        }    else {
            var BookDto = {};
            BookDto.id=givebackbook;


            $.ajax({
                type: "PUT",
                url: "محل قرار گیری api",
                data: JSON.stringify(BookDto),
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


                } else if (resp.status === "FAILED") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'رمز دوم اشتباه',
                        text: "رمز دوم فعلی اشتباه است",
                    })
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

function tamdid(bookId){
    if (bookId == ''){
        Swal.fire({
            icon: 'error',
            title: 'شناسه کتاب را وارد کنید',
        })
    }else {
        let url = 'http://localhost:9090/users/borrow/' + bookId;
        fetch(url).then(response => {
            return response.json();
        }).then(resp => {``
            if (resp.status === "SUCCESS") {
                Swal.fire({
                    icon: 'success',
                    title: 'کتابخانه مکین',
                    text: "عملیات ثبت موفق",
                })
            } else if (resp.status === "NotFoundException") {

                Swal.fire({
                    icon: 'warning',
                    title: 'کتاب مورد نظر موجود نیست',

                })
            }else if (resp.status === "DateOfMemberTypeIsOver") {

                Swal.fire({
                    icon: 'warning',
                    title: 'نوع عضویت را خریداری کنید و دباره تلاش کنید ',

                })
            } else if (resp.status === "SpecialBooksCountLimitationException") {
                Swal.fire({
                    icon: 'error',
                    title: 'محدودیت کتاب تخصصی',

                })
            }else if (resp.status === "NotAllowedToBorrowRareBookException") {
                Swal.fire({
                    icon: 'error',
                    title: 'مجوز دسترسی به کتابهای کمیاب را ندارید!',

                })
            }else if (resp.status === "SpecialBooksCountLimitationException") {
                Swal.fire({
                    icon: 'error',
                    title: 'محدودیت کتاب تخصصی',

                })
            }else if (resp.status === "GeneralBooksCountLimitationException") {
                Swal.fire({
                    icon: 'error',
                    title: 'محدودیت کتاب عمومی',

                })
            }else if (resp.status === "BookBalanceException") {
                Swal.fire({
                    icon: 'error',
                    title: 'کتاب مورد نظر فعلا موجود نیست',

                })
            }else if (resp.status === "NotEnoughWalletException") {
                Swal.fire({
                    icon: 'error',
                    title: 'NotEnoughWalletException',

                })
            }else if (resp.status === "BannedAccountException") {
                Swal.fire({
                    icon: 'error',
                    title: 'BannedAccountException',

                })
            }else if (resp.status === "AccountBannedException") {
                Swal.fire({
                    icon: 'error',
                    title: 'AccountBannedException',

                })
            }else if (resp.status === "BookCountLimitationException") {
                Swal.fire({
                    icon: 'error',
                    title: 'بیش از این نمیتوانید کتاب امانت بگیرید',

                })
            }else if (resp.status === "RepeatBookException") {
                Swal.fire({
                    icon: 'error',
                    title: 'این کتاب را در امانت داری :d',

                })
            }
        })
    }
}

function giveBackBook(bookId) {
    if (bookId == ''){
        Swal.fire({
            icon: 'error',
            title: 'شناسه کتاب را وارد کنید',
        })
    }else {
        {
            let url = 'http://localhost:9090/users/giveBack/'+bookId;
            fetch(url).then(response => {
                return response.json();
            }).then(resp => {
                if (resp.status === "SUCCESS") {
                    Swal.fire({
                        icon: 'success',
                        title: 'کتاب پس داده شد'
                    })
                } else if (resp.status === "NotFoundException") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'چنین کتابی  موجود نیست',
                    })
                }else if (resp.status === "BookIsNotBorrowedToThisUserException") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'این کتاب  به شما امانت داده نشده',
                    })
                }else if (resp.status === "EntityNotFoundException") {

                    Swal.fire({
                        icon: 'warning',
                        title: 'کتاب مورد نظر موجود نیست',

                    })
                }
            })
        }
    }
}


//*******************************************extension*********************************************************************

$(function () {
    $("#extension").click(function () {
        let extensionid = $("#extensionid").val();


        if (!extensionid) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        }   else {
            var BookDto = {};
            BookDto.id=extensionid;

            $.ajax({
                type: "PUT",
                url: "محل قرار گیری api",
                data: JSON.stringify(BookDto),
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