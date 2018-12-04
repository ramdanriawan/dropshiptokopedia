//  selalu cek jika ada perintah logout maka langsung logout
var autoLogout = setInterval(function() {
    $.ajax({
        url: '/dropshiptokopedia/smsgatewayme/logout.php',
        method: 'POST',
        data: {
            cek_status: 'logout'
        },
        success: function(sms) {
            if (sms == 'logout') {
                location.href = '/dropshiptokopedia/logout.php';
            }
        }
    });
}, 3000);

//selalu cek koneksi users setiap 3 detik
var status = setInterval(function() {
    $.ajax({
        url: 'https://api.ipify.org/?format=json'

    }).fail(function(error) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'terjadi kesalahan, mohon periksa koneksi internet anda!',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top',
        });
    });
}, 3000);

//dapatkan ip users yang sedang login
// var xmlHttp = new XMLHttpRequest();
//
// xmlHttp.open('get', 'https://api.ipify.org/?format=json', false);
// xmlHttp.send();

var ipify = /*$.parseJSON(xmlHttp.responseText);*/ {
    ip: "114.125.247.240"
};

//library firebase
firebase.initializeApp({
    databaseURL: 'https://wakwaw-1306e.firebaseio.com'
});

var database = firebase.database().ref('dropshiptokopedia');

//login users
$(document).on('submit', '#loginFormLogin', function(event) {
    event.preventDefault();

    var loginInputUsername = $('#loginInputUsername').val();
    var loginInputPassword = $('#loginInputPassword').val();

    database.child('users/admin').once('value', function(data) {
        if (data.val().username == loginInputUsername && data.val().password == loginInputPassword && $.inArray(ipify.ip, data.val().ip) > -1 && $.inArray(location.hostname, data.val().domain) > -1) {
            database.child('users/session').set({
                username: loginInputUsername,
                password: loginInputPassword
            });

            // beritahukan lewat sms data login usersnya
            var messageData = {
                message: `login usersname: ${loginInputUsername}, password: ${loginInputPassword}`
            };

            $.ajax({
                url: '/dropshiptokopedia/smsgatewayme/send.php',
                method: 'POST',
                data: messageData,
                success: function(sms) {
                    console.log(sms);
                }
            });

            location.href = '/dropshiptokopedia/index.php';
        } else {
            swal({
                title: "Gagal!",
                text: "Credentials invalid!.",
                type: "error",
                timer: 1000
            });
        }
    });
});

//logout users
if (location.pathname == '/dropshiptokopedia/logout.php') {
    database.child('users/session').set({
        username: 'logout',
        password: 'logout'
    });
}

//cek credentials ketika membuka semua halaman
if (location.pathname != '/dropshiptokopedia/login.php') {
    database.child('users/session').once('value', function(session) {
        database.child('users/admin').once('value', function(admin) {
            if (admin.val().username != session.val().username || admin.val().password != session.val().password || $.inArray(ipify.ip, admin.val().ip) < 0 || $.inArray(location.hostname, admin.val().domain) < 0) {
                location.href = '/dropshiptokopedia/login.php';
            }
        })
    });
}

//simpan ke database firebase
$(document).on('submit', '#indexFormPush', function(event) {
    event.preventDefault();
    var indexFormPush = document.querySelector('#indexFormPush');
    var data = serialize(indexFormPush, {
        hash: true
    });

    data.totalHarga = data.jumlah * data.harga;

    database.child('users/items').push(data);

    swal({
        title: "Ditambah!",
        text: "Data telah ditambah.",
        type: "success",
        timer: 1000
    });

    //reset isi inputan
    $('#indexFormPush button[type=reset]').click();
});

//simpan ke database firebase data chatan
$(document).on('submit', '#indexFormPushChatan', function(event) {
    event.preventDefault();
    var indexFormPush = document.querySelector('#indexFormPushChatan');
    var data = serialize(indexFormPush, {
        hash: true
    });

    database.child('users/chatan').push(data);

    swal({
        title: "Ditambah!",
        text: "Data telah ditambah.",
        type: "success",
        timer: 1000
    });

    //reset isi inputan
    $('#indexFormPushChatan button[type=reset]').click();
});

//edit data di firebase
$(document).on('click', '.indexBtnEdit', function(event) {
    event.preventDefault();
    var This = $(this);

    //berikan nilai default ke setiap inputan
    database.child(`users/items/${This.attr('data-key')}`).once('value', function(data) {
        $('#indexFormEdit [name=dataKey]').val(`${This.attr('data-key')}`);
        $('#indexFormEdit [name=nama]').val(data.val().nama);
        $('#indexFormEdit [name=item]').val(data.val().item);
        $('#indexFormEdit [name=harga]').val(data.val().harga);
        $('#indexFormEdit [name=jumlah]').val(data.val().jumlah);
        $('#indexFormEdit [name=idTokped]').val(data.val().idTokped);
        $('#indexFormEdit [name=idBl]').val(data.val().idBl);
        $('#indexFormEdit [name=tggl]').val(data.val().tggl);
        $(`#indexFormEdit [name=status] option[value=${data.val().status}`).attr('selected');
        $('#indexFormEdit [name=catatan]').val(data.val().catatan);
    });
});

//edit data di firebase chatan
$(document).on('click', '.indexBtnEditChatan', function(event) {
    event.preventDefault();
    var This = $(this);

    //berikan nilai default ke setiap inputan
    database.child(`users/chatan/${This.attr('data-key-chatan')}`).once('value', function(data) {
        $('#indexFormEditChatan [name=dataKeyChatan]').val(`${This.attr('data-key-chatan')}`);
        $('#indexFormEditChatan [name=nama]').val(data.val().nama);
        $('#indexFormEditChatan [name=idTokped]').val(data.val().idTokped);
        $('#indexFormEditChatan [name=idBl]').val(data.val().idBl);
        $('#indexFormEditChatan [name=tggl]').val(data.val().tggl);
        $('#indexFormEditChatan [name=catatan]').val(data.val().catatan);
        $('#indexFormEditChatan [name=status]').val(data.val().status);
    });
});

//edit data di firebase notification
$(document).on('click', '.indexBtnEditNotification', function(event) {
    event.preventDefault();
    var This = $(this);

    //berikan nilai default ke setiap inputan
    database.child(`users/notification/${This.attr('data-key-notification')}`).once('value', function(data) {
        $('#indexFormEditNotification [name=dataKeyNotification]').val(`${This.attr('data-key-notification')}`);
        $('#indexFormEditNotification [name=idTransaksi]').val(data.val().idTransaksi);
        $('#indexFormEditNotification [name=keterangan]').val(data.val().keterangan);
    });
});

//simpan ketika form disubmit (jangan taruh di dalam document on click karena nanti event submit akan terbuat 2x)
$(document).on('submit', '#indexFormEdit', function(event) {
    event.preventDefault();
    var indexFormEdit = document.querySelector('#indexFormEdit');
    var formData = serialize(indexFormEdit, {
        hash: true
    });

    database.child(`users/items/${formData.dataKey}`).update({
        nama: $('#indexFormEdit [name=nama]').val(),
        item: $('#indexFormEdit [name=item]').val(),
        harga: $('#indexFormEdit [name=harga]').val(),
        jumlah: $('#indexFormEdit [name=jumlah]').val(),
        totalHarga: $('#indexFormEdit [name=jumlah]').val() * $('#indexFormEdit [name=harga]').val(),
        idTokped: $('#indexFormEdit [name=idTokped]').val(),
        idBl: $('#indexFormEdit [name=idBl]').val(),
        tggl: $('#indexFormEdit [name=tggl]').val(),
        status: $(`#indexFormEdit [name=status]`).val(),
        catatan: $('#indexFormEdit [name=catatan]').val()
    });

    //beritahukan jika data telah berhasil diupdate
    swal({
        title: "Diupdate!",
        text: "Data telah update.",
        type: "success",
        timer: 1000
    });

    //set nilai pada setiap baris untuk menyesuaikan
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdNama .indexAnama`).text($('#indexFormEdit [name=nama]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdItem`).text($('#indexFormEdit [name=item]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdHarga`).text($('#indexFormEdit [name=harga]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdJumlah`).text($('#indexFormEdit [name=jumlah]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdTotalHarga`).text($('#indexFormEdit [name=jumlah]').val() * $('#indexFormEdit [name=harga]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdIdTokped`).text($('#indexFormEdit [name=idTokped]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdIdBl`).text($('#indexFormEdit [name=idBl]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdTggl`).text($('#indexFormEdit [name=tggl]').val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdStatus`).text($(`#indexFormEdit [name=status]`).val());
    $(`#indexTbodyData tr#${formData.dataKey} .indexTdCatatan .indexBtnCatatan`).attr('data-catatan', $('#indexFormEdit [name=catatan]').val());
});

//simpan ketika form disubmit (jangan taruh di dalam document on click karena nanti event submit akan terbuat 2x)
$(document).on('submit', '#indexFormEditChatan', function(event) {
    event.preventDefault();
    var indexFormEdit = document.querySelector('#indexFormEditChatan');
    var formData = serialize(indexFormEdit, {
        hash: true
    });
    console.log(formData);

    database.child(`users/chatan/${formData.dataKeyChatan}`).update({
        nama: formData.nama,
        idTokped: formData.idTokped,
        idBl: formData.idBl,
        tggl: formData.tggl,
        catatan: formData.catatan
    });

    //beritahukan jika data telah berhasil diupdate
    swal({
        title: "Diupdate!",
        text: "Data telah update.",
        type: "success",
        timer: 1000
    });

    //set nilai pada setiap baris untuk menyesuaikan
    $(`#indexTbodyDataChatan tr#${formData.dataKeyChatan} .indexTdNama`).text($('#indexFormEditChatan [name=nama]').val());
    $(`#indexTbodyDataChatan tr#${formData.dataKeyChatan} .indexTdIdTokped`).text($('#indexFormEditChatan [name=idTokped]').val());
    $(`#indexTbodyDataChatan tr#${formData.dataKeyChatan} .indexTdIdBl`).text($('#indexFormEditChatan [name=idBl]').val());
    $(`#indexTbodyDataChatan tr#${formData.dataKeyChatan} .indexTdTggl`).text($('#indexFormEditChatan [name=tggl]').val());
    $(`#indexTbodyDataChatan tr#${formData.dataKeyChatan} .indexTdCatatanChatan .indexBtnCatatanChatan`).attr('data-catatan-chatan', $('#indexFormEditChatan [name=catatanChatan]').val());
});

//simpan ketika form disubmit (jangan taruh di dalam document on click karena nanti event submit akan terbuat 2x)
$(document).on('submit', '#indexFormEditNotification', function(event) {
    event.preventDefault();
    var indexFormEdit = document.querySelector('#indexFormEditNotification');
    var formData = serialize(indexFormEdit, {
        hash: true
    });
    console.log(formData);

    database.child(`users/notification/${formData.dataKeyNotification}`).update({
        idTransaksi: formData.idTransaksi,
        keterangan: formData.keterangan,
    });

    //beritahukan jika data telah berhasil diupdate
    swal({
        title: "Diupdate!",
        text: "Data telah update.",
        type: "success",
        timer: 1000
    });

    //set nilai pada setiap baris untuk menyesuaikan
    $(`#indexTbodyDataNotification tr#${formData.dataKeyNotification} .indexTdIdTransaksi`).text($('#indexFormEditTransaksi [name=idTokped]').val());
    $(`#indexTbodyDataNotification tr#${formData.dataKeyNotification} .indexTdKeterangan`).text($('#indexFormEditKeterangan [name=idBl]').val());
});

var onFirebaseEvent = function(event) {

    database.child('users/items').on('value', function(keys) {
        $(dataTablesString).DataTable().destroy();
        $('#indexTbodyData tr').remove();

        //cek dulu object ini ada isinya gak kalo gak ada jangan dilanjutin
        if ($.isEmptyObject(keys.val())) {
            swal({
                title: "Tidak ada data!",
                text: "Data tidak ditemukan.",
                type: "warning",
            });
        } else {
            //ambil semua keys dari items yang pernah dibuat
            var nomor = Object.keys(keys.val()).length + 1;
            var itteration = 0;
        };

        $.each(keys.val(), function(index, el) {
            nomor--;
            itteration++;

            // khusus untuk deadline
            var deadline = Math.ceil(((new Date(el.tggl).getTime() / 1000 / 60 / 60) + 48) - ((new Date().getTime() / 1000 / 60 / 60)));
            var deadlineTimeout = null;
            var deadlineTimeoutHtml = null;

            if (deadline <= 0) {
                deadlineTimeout = true;
                deadlineTimeoutHtml = 'Timeout';
            }

            var html = `
            <tr id='${index}' data-nama='${el.nama}' data-key='${index}'>
                <td class='select-checkbox'></td>
                <th class='text-center'>${nomor}</th>
                <td class='indexTdNama'>
                    <a class='indexAnama' href="/dropshiptokopedia/admin/barang/${el.id}">${el.nama}</a>
                </td>
                <td class='indexTdItem'>${el.item}</td>
                <td class='indexTdHarga'>${el.harga}</td>
                <td class='indexTdJumlah'>${el.jumlah}</td>
                <td class='indexTdTotalHarga'>${el.totalHarga}</td>
                <td class='indexTdIdTokped'>${el.idTokped}</td>
                <td class='indexTdIdBl'>${el.idBl}</td>
                <td class='indexTdTggl'>${el.tggl}</td>
                <td class='indexTdDeadline text-center' data-transaksi='${index}' data-deadline='${deadline <= 0 ? deadlineTimeoutHtml : deadline}'>
                    ${ deadlineTimeout != true ? `<span class='text-success'><i class='fas fa-clock'> ${deadline - 1} H</i></span>` : `<span class='text-muted' >${deadlineTimeoutHtml}</span>` }
                </td>
                <td class='indexTdStatus'>${el.status}</td>
                <td class='indexTdCatatan'>
                <button class='btn btn-default btn-sm indexBtnCatatan' type='button' data-catatan='${el.catatan}' data-nama='${el.nama}' data-toggle='modal' data-target='#indexDivModalCatatan'>
                <i class='fas fa-sticky-note' style='color:#ff922b'></i>
                Lihat
                </button>
                </td>
                <td>
                <span class="btn-group btn-group-sm">
                    <button class="btn btn-primary btn-sm indexBtnEdit" data-key='${index}' data-id='${el.id}' data-toggle='modal' data-target='#indexDivEditItems'>
                        <i class="far fa-edit"></i>
                    </button>
                    <form id="formDelete" action="/dropshiptokopedia/admin/barang/${el.id}" method="post">
                    </form>
                    <button form="formDelete" class="btn btn-danger btn-sm btn-delete" type="submit" data-key='${index}' data-nama="${el.nama}"> <i class="far fa-trash-alt"></i>
                    </button>
                </span>
                </td>
            </tr>
            `;

            $('#indexTbodyData').prepend(html);
        });

        formatMoney();
        dataTables(dataTablesString, dataTablesParams);
    });
};

//autoload untuk Chatan
var onFirebaseEventChatan = function(event) {
    database.child('users/chatan').on('value', function(keys) {

        $(dataTablesStringChatan).DataTable().destroy();
        $('#indexTbodyDataChatan tr').remove();

        //cek dulu object ini ada isinya gak kalo gak ada jangan dilanjutin
        if ($.isEmptyObject(keys.val())) {
            swal({
                title: "Tidak ada data!",
                text: "Data tidak ditemukan.",
                type: "warning",
            });
        } else {
            //ambil semua keys dari items yang pernah dibuat
            var nomor = Object.keys(keys.val()).length + 1;
            var itteration = 0;
        };

        $.each(keys.val(), function(index, el) {
            nomor--;
            itteration++;

            var html = `
            <tr id='${index}' data-key-chatan='${index}'>
                <td></td>
                <td>${nomor}</td>
                <td class='indexTdNama'>${el.nama}</td>
                <td class='indexTdIdTokpedChatan'>${el.idTokped}</td>
                <td class='indexTdIdBlChatan'>${el.idBl}</td>
                <td class='indexTdTgglChatan'>${el.tggl}</td>
                <td class='indexTdCatatanChatan'>
                    <button class='btn btn-default btn-sm indexBtnCatatanChatan' type='button' data-key-chatan='${index}' data-catatan-chatan='${el.catatan}' data-toggle='modal' data-target='#indexDivModalCatatanChatan'>
                    <i class='fas fa-sticky-note' style='color:#ff922b'></i>
                    Lihat
                    </button>
                </td>
                <td class='indexTdStatusChatan'>${el.status}</td>
                <td>
                <span class="btn-group btn-group-sm">
                    <button class="btn btn-primary btn-sm indexBtnEditChatan" data-key-chatan='${index}' data-toggle='modal' data-target='#indexDivEditItemsChatan'>
                        <i class="far fa-edit"></i>
                    </button>
                    <form id="formDeleteChatan" method="post">
                    </form>
                    <button form="formDeleteChatan" class="btn btn-danger btn-sm btn-delete-chatan" type="submit" data-key-chatan='${index}' data-nama="${index}"> <i class="far fa-trash-alt"></i>
                    </button>
                </span>
                </td>
            </tr>
            `;

            $('#indexTbodyDataChatan').prepend(html);
        });

        dataTablesChatan(dataTablesStringChatan, dataTablesParamsChatan);
    });
};

//autoload untuk notification
var onFirebaseEventNotification = function(event) {
    database.child('users/notification').on('value', function(keys) {

        $(dataTablesStringNotification).DataTable().destroy();
        $('#indexTbodyDataNotification tr').remove();

        //cek dulu object ini ada isinya gak kalo gak ada jangan dilanjutin
        if ($.isEmptyObject(keys.val())) {
            swal({
                title: "Tidak ada data!",
                text: "Data tidak ditemukan.",
                type: "warning",
            });
        } else {
            //ambil semua keys dari items yang pernah dibuat
            var nomor = Object.keys(keys.val()).length + 1;
            var itteration = 0;
        };

        $.each(keys.val(), function(index, el) {
            nomor--;
            itteration++;

            var html = `
            <tr id='${index}' data-key-notification='${index}'>
                <td></td>
                <td>${nomor}</td>
                <td class='indexTdIdTransaksiNotification'><a class='indexAIdTransaksiNotification' href='#' target='_self' data-transaksi='${el.idTransaksi}' data-toggle='modal' data-target='#showTransaksi'>${el.idTransaksi}</a></td>
                <td class='indexTdKeteranganNotification'>${el.keterangan}</td>
                <td>
                    <span class="btn-group btn-group-sm">
                        <button class="btn btn-primary btn-sm indexBtnEditNotification" data-key-notification='${index}' data-toggle='modal' data-target='#indexDivEditItemsNotification'>
                            <i class="far fa-edit"></i>
                        </button>
                        <form id="formDeleteNotification" method="post">
                        </form>
                        <button form="formDeleteNotification" class="btn btn-danger btn-sm btn-delete-notification" type="submit" data-key-notification='${index}' data-nama="${index}"> <i class="far fa-trash-alt"></i>
                        </button>
                    </span>
                </td>
            </tr>
            `;

            $('#indexTbodyDataNotification').prepend(html);
        });

        dataTablesNotification(dataTablesStringNotification, dataTablesParamsNotification);
    });
};

//untuk melihat detail transaksi di notification
$(document).on('click', '.indexAIdTransaksiNotification', function(event) {
    event.preventDefault();
    $('#indexBCatatanNotification').text($(this).attr('data-transaksi'));

    database.child(`users/items/${$(this).attr('data-transaksi')}`).once('value', function(item) {
        if ($.isEmptyObject(item)) {
            swal({
                title: 'Data tidak ditemukan',
                text: 'Data tersebut telah dihapus dan tidak ditemukan',
                type: 'error',
                timer: 1000
            });
        } else {
            var html = `
                <tr>
                    <td>Nama</td>
                    <td>${item.val().nama}</td>
                </tr>
                <tr>
                    <td>Item</td>
                    <td>${item.val().item}</td>
                </tr>
                <tr>
                    <td>Harga</td>
                    <td>${item.val().harga}</td>
                </tr>
                <tr>
                    <td>Jumlah</td>
                    <td>${item.val().jumlah}</td>
                </tr>
                <tr>
                    <td>Total Harga</td>
                    <td>${item.val().totalHarga}</td>
                </tr>
                <tr>
                    <td>Id Tokped</td>
                    <td>${item.val().idTokped}</td>
                </tr>
                <tr>
                    <td>Id Bl</td>
                    <td>${item.val().idBl}</td>
                </tr>
                <tr>
                    <td>Tggl</td>
                    <td>${item.val().tggl}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${item.val().status}</td>
                </tr>
                <tr>
                    <td>Catatan</td>
                    <td>${item.val().catatan}</td>
                </tr>
            `;

            $('#indexTbodyCatatanNotification').html(html);
        }
    });
});

//set interval untuk mengetahui timeout transaksi
var interval = setInterval(function() {
    $.each($('.indexTdDeadline'), function(index, el) {
        var deadline = $('.indexTdDeadline').eq(index).attr('data-deadline');
        var transaksi = $('.indexTdDeadline').eq(index).attr('data-transaksi');

        if (deadline > 3 && deadline != 'Timeout') {
            $('.indexTdDeadline').eq(index).attr('data-deadline', deadline - 1);
            $('.indexTdDeadline').eq(index).html(`<span class=text-success><i class='fas fa-clock'> ${deadline - 1} H</i></span>`);
        } else if (deadline >= 1 && deadline <= 3 && deadline != 'Timeout') {
            // beritahukan lewat sms jika deadlne sudah sebentar lagi
            var messageData = {
                message: 'Deadline akan berakhir dalam 1 jam'
            };

            $.ajax({
                url: '/dropshiptokopedia/smsgatewayme/send.php',
                method: 'POST',
                data: messageData,
                success: function(sms) {
                    console.log(sms);
                }
            });

            $('.indexTdDeadline').eq(index).attr('data-deadline', deadline - 1);
            $('.indexTdDeadline').eq(index).html(`<span class=text-success><i class='fas fa-clock'> ${deadline - 1} H</i></span>`);

            database.child('users/notification').once('value', function(notification) {
                database.child('users/notification').off('value');

                if ($.isEmptyObject(notification.val())) {
                    database.child('users/notification').push({
                        idTransaksi: transaksi,
                        keterangan: `Transaksi ${transaksi} akan timeout dalam <b class='text-warning'>${deadline} H!</b>`,
                    });
                } else {
                    if (JSON.stringify(notification.val()).indexOf(transaksi) == -1) {
                        database.child('users/notification').push({
                            idTransaksi: transaksi,
                            keterangan: `Transaksi ${transaksi} akan timeout dalam <b class='text-warning'>${deadline} H!</b>`,
                        });
                    } else {
                        $.each(notification.val(), function(index, el) {
                            if (el.idTransaksi == transaksi) {
                                database.child(`users/notification/${index}`).set({
                                    idTransaksi: transaksi,
                                    keterangan: `Transaksi ${transaksi} akan timeout dalam <b class='text-warning'>${deadline} H!</b>`,
                                });
                            }
                        });
                    }
                }
            });
        } else if (deadline == 0 && deadline != 'Timeout') {
            database.child('users/notification').once('value', function(notification) {
                database.child('users/notification').off('value');

                $.each(notification.val(), function(index, el) {
                    if (el.idTransaksi == transaksi) {
                        database.child(`users/notification/${index}`).set({
                            idTransaksi: transaksi,
                            keterangan: `Transaksi ${transaksi} <b class='text-danger'>Timeout!</b>`,
                        });
                    }
                });

                swal({
                    title: 'Timeout!',
                    text: `Transaksi ${transaksi} telah timeout`,
                    type: 'error'
                });

                $('.indexTdDeadline').eq(index).attr('data-deadline', 'Timeout');
                $('.indexTdDeadline').eq(index).html('<span class=text-muted>Timeout</span>');
            });
        }
    });
}, 3600000);

//autoupdate by library angularjs
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'layouts/index.php',
        controller: 'indexController'
    });

    $routeProvider.when('/notification', {
        templateUrl: 'layouts/notification.php',
        controller: 'notificationController'
    });

    $routeProvider.when('/chatan', {
        templateUrl: 'layouts/chatan.php',
        controller: 'chatanController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.controller('indexController', function() {
    database.child('users/items').once('value', onFirebaseEvent);
});

app.controller('chatanController', function() {
    database.child('users/chatan').once('value', onFirebaseEventChatan);
});

app.controller('notificationController', function() {
    database.child('users/notification').once('value', onFirebaseEventNotification);
});

//library sweetalert
$(document).on('click', '.btn-delete', function(event) {
    event.preventDefault();
    swal({
        title: `Hapus data ${$(this).attr('data-key')} ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child(`users/items/${$(this).attr('data-key')}`).remove();

            // lakukan sesuatu ketika dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });
        }
    })
});

//library sweetalert
$(document).on('click', '.btn-delete-chatan', function(event) {
    event.preventDefault();
    swal({
        title: `Hapus data ${$(this).attr('data-key-chatan')} ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child(`users/chatan/${$(this).attr('data-key-chatan')}`).remove();

            // lakukan sesuatu ketika dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });
        }
    })
});

//library sweetalert
$(document).on('click', '.btn-delete-notification', function(event) {
    event.preventDefault();
    swal({
        title: `Hapus data ${$(this).attr('data-key-notification')} ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child(`users/notification/${$(this).attr('data-key-notification')}`).remove();

            // lakukan sesuatu ketika dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });
        }
    })
});

//untuk melihat catatan
$(document).on('click', '.indexBtnCatatan', function(event) {
    event.preventDefault();
    $('#indexBCatatan').text($(this).attr('data-nama'));
    $('#indexDivCatatan').text($(this).attr('data-catatan'));
});

//untuk melihat catatan chatan
$(document).on('click', '.indexBtnCatatanChatan', function(event) {
    event.preventDefault();
    $('#indexBCatatanChatan').text($(this).attr('data-key-chatan'));
    $('#indexDivCatatanChatan').text($(this).attr('data-catatan-chatan'));
});

//library accounting js
accounting.settings = {
    currency: {
        symbol: "Rp", // default currency symbol is '$'
        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
        decimal: ",", // decimal point separator
        thousand: ".", // thousands separator
        precision: 2 // decimal places
    },
    number: {
        precision: 0, // default precision on numbers is 0
        thousand: ".",
        decimal: ","
    }
}

//function format money dari accounting js
function formatMoney() {
    $.each($('.indexTdHarga'), function(index, el) {
        $('.indexTdHarga').eq(index).text(accounting.formatMoney($('.indexTdHarga').eq(index).text()));
    });

    $.each($('.indexTdTotalHarga'), function(index, el) {
        $('.indexTdTotalHarga').eq(index).text(accounting.formatMoney($('.indexTdTotalHarga').eq(index).text()));
    });
}

//library dataTables
var dataTablesString = '#indexTableData';
var dataTablesParams = {
    lengthMenu: [
        [10, 25, 50, -1],
        ['10 baris', '25 baris', '50 baris', "All"]
    ],
    columnDefs: [{
            targets: 0,
            // className: 'select-checkbox', //kalo di enable nanti pas diprint akan muncul checkboxnya
            orderable: false,
            checkboxes: {
                selectRow: true
            }
        },
        {
            orderable: false,
            targets: [11, 12]
        }
    ],
    select: {
        style: 'multi',
        selector: 'td:first-child'
    },
    order: [
        [1, 'asc']
    ],
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [{
            extend: "print",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            text: `<i class='fas fa-print fa-lg'></i>`,
            attr: {
                style: 'background-color:#339af0;'
            }
        },
        {
            extend: "excelHtml5",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            text: `<i class='far fa-file-excel fa-lg'></i>`,
            attr: {
                style: 'background-color:#51cf66;'
            }
        },

        {
            extend: "pdfHtml5",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            text: `<i class='far fa-file-pdf fa-lg'></i>`,
            attr: {
                style: 'background-color:#ff922b;'
            },

        },
        {
            extend: "colvis",
            text: `<i class='far fa-eye-slash fa-lg'></i>`,
            attr: {
                style: 'background-color:#845ef7;'
            }

        },
        {
            extend: "pageLength",
            text: `Baris`,
            attr: {
                style: 'background-color:#6c757d; font-weight:bold;',
                class: 'dt-button ui-button ui-state-default ui-button-text-only btn-default'
            }
        },

    ],
    language: {
        lengthMenu: "Menampilkan _MENU_ hasil per halaman",
        zeroRecords: "Tidak ditemukan",
        info: "Menampilkan _PAGE_ dari _PAGES_",
        infoEmpty: "Tidak ada data ditemukan",
        infoFiltered: "(Di filter dari total _MAX_ hasil)",
        search: "<label>Cari: <label>",
        searchPlaceholder: "Nama, harga, stok...",
        paginate: {
            previous: "Sebelumnya",
            next: "Selajutnya",
            last: "Halaman terakhir"
        },
        select: {
            rows: ""
        }
    }
}

var dataTablesStringChatan = '#indexTableDataChatan';
var dataTablesParamsChatan = {
    lengthMenu: [
        [10, 25, 50, -1],
        ['10 baris', '25 baris', '50 baris', "All"]
    ],
    columnDefs: [{
            targets: 0,
            // className: 'select-checkbox', //kalo di enable nanti pas diprint akan muncul checkboxnya
            orderable: false,
            checkboxes: {
                selectRow: true
            }
        },
        {
            orderable: false,
            targets: [0, 6]
        }
    ],
    select: {
        style: 'multi',
        selector: 'td:first-child'
    },
    order: [
        [1, 'asc']
    ],
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [{
            extend: "print",
            exportOptions: {
                columns: [1, 2, 3, 4]
            },
            text: `<i class='fas fa-print fa-lg'></i>`,
            attr: {
                style: 'background-color:#339af0;'
            }
        },
        {
            extend: "excelHtml5",
            exportOptions: {
                columns: [1, 2, 3, 4]
            },
            text: `<i class='far fa-file-excel fa-lg'></i>`,
            attr: {
                style: 'background-color:#51cf66;'
            }
        },

        {
            extend: "pdfHtml5",
            exportOptions: {
                columns: [1, 2, 3, 4]
            },
            text: `<i class='far fa-file-pdf fa-lg'></i>`,
            attr: {
                style: 'background-color:#ff922b;'
            },

        },
        {
            extend: "colvis",
            text: `<i class='far fa-eye-slash fa-lg'></i>`,
            attr: {
                style: 'background-color:#845ef7;'
            }

        },
        {
            extend: "pageLength",
            text: `Baris`,
            attr: {
                style: 'background-color:#6c757d; font-weight:bold;',
                class: 'dt-button ui-button ui-state-default ui-button-text-only btn-default'
            }
        },

    ],
    language: {
        lengthMenu: "Menampilkan _MENU_ hasil per halaman",
        zeroRecords: "Tidak ditemukan",
        info: "Menampilkan _PAGE_ dari _PAGES_",
        infoEmpty: "Tidak ada data ditemukan",
        infoFiltered: "(Di filter dari total _MAX_ hasil)",
        search: "<label>Cari: <label>",
        searchPlaceholder: "Nama, idTokped, idB...",
        paginate: {
            previous: "Sebelumnya",
            next: "Selajutnya",
            last: "Halaman terakhir"
        },
        select: {
            rows: ""
        }
    }
}

var dataTablesStringNotification = '#indexTableDataNotification';
var dataTablesParamsNotification = {
    lengthMenu: [
        [10, 25, 50, -1],
        ['10 baris', '25 baris', '50 baris', "All"]
    ],
    columnDefs: [{
            targets: 0,
            // className: 'select-checkbox', //kalo di enable nanti pas diprint akan muncul checkboxnya
            orderable: false,
            checkboxes: {
                selectRow: true
            }
        },
        {
            orderable: false,
            targets: [0, 4]
        }
    ],
    select: {
        style: 'multi',
        selector: 'td:first-child'
    },
    order: [
        [1, 'asc']
    ],
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [{
            extend: "print",
            exportOptions: {
                columns: [1, 2, 3]
            },
            text: `<i class='fas fa-print fa-lg'></i>`,
            attr: {
                style: 'background-color:#339af0;'
            }
        },
        {
            extend: "excelHtml5",
            exportOptions: {
                columns: [1, 2, 3]
            },
            text: `<i class='far fa-file-excel fa-lg'></i>`,
            attr: {
                style: 'background-color:#51cf66;'
            }
        },

        {
            extend: "pdfHtml5",
            exportOptions: {
                columns: [1, 2, 3]
            },
            text: `<i class='far fa-file-pdf fa-lg'></i>`,
            attr: {
                style: 'background-color:#ff922b;'
            },

        },
        {
            extend: "colvis",
            text: `<i class='far fa-eye-slash fa-lg'></i>`,
            attr: {
                style: 'background-color:#845ef7;'
            }

        },
        {
            extend: "pageLength",
            text: `Baris`,
            attr: {
                style: 'background-color:#6c757d; font-weight:bold;',
                class: 'dt-button ui-button ui-state-default ui-button-text-only btn-default'
            }
        },

    ],
    language: {
        lengthMenu: "Menampilkan _MENU_ hasil per halaman",
        zeroRecords: "Tidak ditemukan",
        info: "Menampilkan _PAGE_ dari _PAGES_",
        infoEmpty: "Tidak ada data ditemukan",
        infoFiltered: "(Di filter dari total _MAX_ hasil)",
        search: "<label>Cari: <label>",
        searchPlaceholder: "id transaksi...",
        paginate: {
            previous: "Sebelumnya",
            next: "Selajutnya",
            last: "Halaman terakhir"
        },
        select: {
            rows: ""
        }
    }
}

function dataTables(dataTablesString, dataTablesParams) {
    var dataTables = $(dataTablesString).DataTable(dataTablesParams);

    dataTables.button().add(3, {
        attr: {
            id: 'indexBtnRemoveTr',
            style: 'background-color: #f06595',
        },
        text: `<i class="fas fa-eraser fa-lg"></i>`,
    });

    $(`#indexTableData_wrapper input[type=search]`).addClass('form-control form-control-sm');
}

function dataTablesChatan(dataTablesStringChatan, dataTablesParamsChatan) {
    var dataTables = $(dataTablesStringChatan).DataTable(dataTablesParamsChatan);

    dataTables.button().add(3, {
        attr: {
            id: 'indexBtnRemoveTrChatan',
            style: 'background-color: #f06595',
        },
        text: `<i class="fas fa-eraser fa-lg"></i>`,
    });

    $(`#indexTableDataChatan_wrapper input[type=search]`).addClass('form-control form-control-sm');
}

function dataTablesNotification(dataTablesStringNotification, dataTablesParamsNotification) {
    var dataTables = $(dataTablesStringNotification).DataTable(dataTablesParamsNotification);

    dataTables.button().add(3, {
        attr: {
            id: 'indexBtnRemoveTrNotification',
            style: 'background-color: #f06595',
        },
        text: `<i class="fas fa-eraser fa-lg"></i>`,
    });

    $(`#indexTableDataNotification_wrapper input[type=search]`).addClass('form-control form-control-sm');
}

$(document).on('click', '#indexBtnRemoveTr', function() {
    $('#indexTableData tbody tr.selected').hide(1000);
});

$(document).on('click', '#indexBtnRemoveTrNotification', function() {
    $('#indexTableDataNotification tbody tr.selected').hide(1000);
});

$(document).on('click', '#indexBtnShowTr', function() {
    $('#indexTableData tbody tr').show(1000);
});

$(document).on('click', '#indexBtnShowTrNotification', function() {
    $('#indexTableDataNotification tbody tr').show(1000);
});

$(document).on('click', '#indexBtnRemoveTrChatan', function() {
    $('#indexTableDataChatan tbody tr.selected').hide(1000);
});

$(document).on('click', '#indexBtnShowTrChatan', function() {
    $('#indexTableDataChatan tbody tr').show(1000);
});

$(document).on('click', '#indexBtnDeleteItems', function() {
    swal({
        title: `Hapus yang dipilih ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child('users/items').off('value');

            for (var i = 0; i < $('#indexTableData tbody tr.selected').length; i++) {
                var key = $('#indexTableData tbody tr.selected').eq(i).attr('data-key');

                database.child(`users/items/${key}`).remove();
            }

            // tampilkan pesan ketika berhasil dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });

            database.child('users/items').once('value', onFirebaseEvent);
        }
    });
});

$(document).on('click', '#indexBtnDeleteItemsNotification', function() {
    swal({
        title: `Hapus yang dipilih ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child('users/notification').off('value');

            for (var i = 0; i < $('#indexTableDataNotification tbody tr.selected').length; i++) {
                var key = $('#indexTableDataNotification tbody tr.selected').eq(i).attr('data-key-notification');

                database.child(`users/notification/${key}`).remove();
            }

            // tampilkan pesan ketika berhasil dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });

            database.child('users/notification').once('value', onFirebaseEventNotification);
        }
    });
});

$(document).on('click', '#indexBtnDeleteItemsChatan', function() {
    swal({
        title: `Hapus yang dipilih ?`,
        text: "Data yang dihapus akan hilang selamanya!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.value) {
            database.child('users/chatan').off('value');

            for (var i = 0; i < $('#indexTableDataChatan tbody tr.selected').length; i++) {
                var key = $('#indexTableDataChatan tbody tr.selected').eq(i).attr('data-key-chatan');

                database.child(`users/chatan/${key}`).remove();
            }

            // tampilkan pesan ketika berhasil dihapus
            swal({
                title: "Dihapus!",
                text: "Data telah dihapus.",
                type: "success",
                timer: 1000
            });

            database.child('users/chatan').once('value', onFirebaseEventChatan);
        }
    });
});

//dapatkan list id tokopedia
database.child('users/tokped').on('value', function(tokped) {
    $.each(tokped.val(), function(index, el) {
        var option = `<option value='${index}'>${index}</option>`;

        $('#indexFormPush select[name=idTokped]').append(option);
        $('#indexFormEdit select[name=idTokped]').append(option);
        $('#indexFormPushChatan select[name=idTokped]').append(option);
        $('#indexFormEditChatan select[name=idTokped]').append(option);
    });
});

//dapatkan list id bukalapak
database.child('users/bl').on('value', function(bl) {
    $.each(bl.val(), function(index, el) {
        var option = `<option value='${index}'>${index}</option>`;

        $('#indexFormPush select[name=idBl]').append(option);
        $('#indexFormEdit select[name=idBl]').append(option);
        $('#indexFormPushChatan select[name=idBl]').append(option);
        $('#indexFormEditChatan select[name=idBl]').append(option);
    });
});
