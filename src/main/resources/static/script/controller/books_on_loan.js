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

//************************************search box****************************************************

var $searchBox, $paginationContainer, lastCount = 1;
const initialVariables = () => {
    localStorage.setItem("books_on_loan", 1);
    $searchBox = $("#fullsearch");
    $paginationContainer = $(".pagination");
}
const initEvent = () => {
    $searchBox.on("keyup", (e) => {
        if (e.which === 13 || event.keyCode === 13) {
            $.ajax({
                url: "http://localhost:9090/users/BorrowedBooksDynamicSearch/" + $("#fullsearch").val(),
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
                }
            }).done(function (resp) {
                let o = 0;
                const size1 = resp.totalCount;
                if (resp.status === "SUCCESS") {
                    let table = $("<table/>", {
                        id: "data-table-customer",
                        class: "table text-nowrap w-100",
                        html: `<thead>
              <tr>
                        
                <th>شناسه کتاب</th>
                <th>شناسه کاربر</th>
                <th>عنوان کتاب</th>
                <th>دسته کتاب</th>
                <th>نام کاربری</th>
                <th>تاریخ امانت گرفتن</th>
                <th>تاریخ پس دادن</th>
                <th>تعداد باقی مانده کتاب</th>
                
                 </tr>
                </thead>
                <tbody id="customer-data">
                </tbody>`
                    })
                    $.each(resp,function(index, v) {//resp.dataList, (i, v) => {
                        console.log(v)
                        if (o == 0) {
                            o++;
                            console.log("resp : +++" + resp)
                            console.log("returnDate " + v.returnDate)
                            console.log("id : " + v.id)
                            console.log(v.title + " title")
                            console.log(v.returnDate)//resp.dataList, (i, v) => {
                            console.log("v.length " + v.length)
                            for (let i = 0; i < v.length; i++) {
                                let tr = ` <tr>
            
        <td style="text-align: center">${v[i].bookId}</td>
        <td style="text-align: center">${v[i].userId}</td>
        <td style="text-align: center">${v[i].title}</td>
        <td style="text-align: center">${v[i].bookType}</td>
        <td style="text-align: center">${v[i].username}</td>
        <td style="text-align: center">${v[i].reservationDate}</td>
        <td style="text-align: center">${v[i].returnDate}</td>
        <td style="text-align: center">${v[i].balance}</td>
             //محل پر کردن دیتا ها مطابق بالا برای قرار گیری در جدول
           
            
     
    </tr>`;
                                table.find("#customer-data").append(tr);
                            }

                    }});
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
        url: `http://localhost:9090/users/allBorrowedBooks/${offset}/${limit}`,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie("userToken"));
        }
    }).done(function (resp) {
        let o = 0;
        if (resp.status === "SUCCESS") {
            let table = $("<table/>", {
                id: "data-table-customer",
                class: "table text-nowrap w-100",
                html: `<thead>
                <tr>
                        
                <th>شناسه کتاب</th>
                <th>شناسه کاربر</th>
                <th>عنوان کتاب</th>
                <th>دسته کتاب</th>
                <th>نام کاربری</th>
                <th>تاریخ امانت گرفتن</th>
                <th>تاریخ پس دادن</th>
                 </tr>
                </thead>
                <tbody id="customer-data">
                </tbody>`
            })
            $.each(resp,function(index, v) {//resp.dataList, (i, v) => {
                console.log(v)
                if (o == 0) {
                o++;
                console.log("resp : +++" + resp)
                console.log("returnDate " + v.returnDate)
                console.log("id : " + v.id)
                console.log(v.title + " title")
                console.log(v.returnDate)//resp.dataList, (i, v) => {
                console.log("v.length " + v.length)
                for (let i = 0; i < v.length; i++) {
                    let tr = ` <tr>
            
        <td style="text-align: center">${v[i].bookId}</td>
        <td style="text-align: center">${v[i].userId}</td>
        <td style="text-align: center">${v[i].title}</td>
        <td style="text-align: center">${v[i].bookType}</td>
        <td style="text-align: center">${v[i].username}</td>
        <td style="text-align: center">${v[i].reservationDate}</td>
        <td style="text-align: center">${v[i].returnDate}</td>
             //محل پر کردن دیتا ها مطابق بالا برای قرار گیری در جدول
           
            
     
    </tr>`;
                    table.find("#customer-data").append(tr);
                }
            }
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
            if (Number(localStorage.getItem("books_on_loan")) === i) {
                activeClass = "active";
            }
            let li = $("<li/>", {
                class: "paginate_button page-item " + activeClass,
                html: `<a href="#" aria-controls="datatableDefault" data-dt-idx="${i}" tabindex="${i}" class="page-link">${i}</a>`,
                click: () => {
                    localStorage.setItem("books_on_loan", i);
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
        url: "محل قراری api " ,
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