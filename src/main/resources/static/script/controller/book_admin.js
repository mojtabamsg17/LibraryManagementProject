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
    localStorage.setItem("bookadmin", 1);
    $searchBox = $("#fullsearch");
    $paginationContainer = $(".pagination");
}
const initEvent = () => {
    $searchBox.on("keyup", (e) => {
        if (e.which === 13 || event.keyCode === 13) {
            $.ajax({
                url: "http://localhost:9090/books/findAll" + $("#fullsearch").val(),
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
                    <th>شناسه</th>
                    <th>نام کتاب</th>
                    <th>دسته کتاب</th>
                    <th>نویسنده کتاب</th>
                    <th>تعداد کل موجودی کتاب</th>
                    <th>تعداد موجودی فعلی کتاب</th>
                    
                    </tr>
                    </thead>
                    <tbody id="customer-data">
    
                    </tbody>`
                        })
                        $.each(resp, function(index, v) {//(i, v) => {//$.each(resp.dataList, (i, v) => {
                            let tr = ` <tr>
             <td style="text-align: center"></td>
            <td style="text-align: center">${v.id}</td>
            <td style="text-align: center">${v.title}</td>
            <td style="text-align: center">${v.mBookType}</td>     
            <td style="text-align: center">${v.author}</td>
            <td style="text-align: center">${v.balance} </td>
             <td style="text-align: center">${v.balance}</td>
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
        url: `http://localhost:9090/books/findAll/${offset}/${limit}`,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
        // if (resp.status === "SUCCESS") {
        console.log(resp)
            let table = $("<table/>", {
                id: "data-table-customer",
                class: "table text-nowrap w-100",
                html: `<thead>
                <tr>
                 
                <th>#</th>
                <th>شناسه</th>
                <th>نام کتاب</th>
                <th>دسته کتاب</th>
                <th>نویسنده کتاب</th>
                <th>تعداد کل موجودی کتاب</th>
                <th>تعداد موجودی فعلی کتاب</th>
                
                </thead>
                <tbody id="customer-data">

                </tbody>`
            })
            $.each(resp, function(index, v) {//(i, v) => {
                let tr = ` <tr>
        <td style="text-align: center"></td>
        <td style="text-align: center">${v.id}</td>
        <td style="text-align: center">${v.title}</td>
        <td style="text-align: center">${v.mBookType}</td>     
        <td style="text-align: center">${v.author}</td>
        <td style="text-align: center">${v.balance} </td>
         <td style="text-align: center">${v.balance}</td>
             
           
            
     
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
            if (Number(localStorage.getItem("bookadmin")) === i) {
                activeClass = "active";
            }
            let li = $("<li/>", {
                class: "paginate_button page-item " + activeClass,
                html: `<a href="#" aria-controls="datatableDefault" data-dt-idx="${i}" tabindex="${i}" class="page-link">${i}</a>`,
                click: () => {
                    localStorage.setItem("bookadmin", i);
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
        url: `http://localhost:9090/books/findAll/${offset}/${limit}`,
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
    $("#updatebook").click(function () {
        let idbookupdate = $("#idbookupdate").val();
        let namebookupdate = $("#namebookupdate").val();
        let authorbookupdate = $("#authorbookupdate").val();
        let entitybookupdate = $("#entitybookupdate").val();
        let categorybookupdate = $("#categorybookupdate").val();


        if (!idbookupdate) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        } else if (!namebookupdate) {
            Swal.fire({
                icon: 'warning',
                title: 'نام کتاب خالی',
                text: "لطفا نام کتاب خود را وارد کنید",
            })
        } else if (!authorbookupdate) {
            Swal.fire({
                icon: 'warning',
                title: 'نام نویسنده خالی',
                text: "لطفا نام نویسنده را وارد کنید",
            })
        } else if (!entitybookupdate) {
            Swal.fire({
                icon: 'warning',
                title: 'موجودی کتاب خالی',
                text: "لطفا موجودی کتاب را وارد کنید",
            })
        }
        else if (!categorybookupdate) {
            Swal.fire({
                icon: 'warning',
                title: 'دسته کتاب خالی',
                text: "لطفا دسته کتاب را وارد کنید",
            })
        }  else {
            var BookDto = {};
            BookDto.id=idbookupdate;
            BookDto.title = namebookupdate;
            BookDto.author = authorbookupdate;
            BookDto.balance = entitybookupdate;
            BookDto.mBookType = categorybookupdate;
            console.log(BookDto)
            $.ajax({
                type: "PUT",
                url: "http://localhost:9090/books/update",
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

//*******************************************DELETE*********************************************************************

$(function () {
    $("#deleteBook").click(function () {
        let idbookdelete = $("#idbookdelete").val();


        if (!idbookdelete) {
            Swal.fire({
                icon: 'warning',
                title: 'شناسه خالی',
                text: "لطفا شناسه خود را وارد کنید",
            })
        }   else {
            // var BookDto = {};
            // BookDto.id=idbookdelete;

            $.ajax({
                type: "DELETE",
                url: "http://localhost:9090/books/delete/"+idbookdelete,

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