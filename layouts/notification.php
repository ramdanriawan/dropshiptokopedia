<div class='row' style='margin-top: 15px;' id='notification' >
    <div class='col-md-12'>
        <div class='card'>
            <div class='card-header'>
                <div class="row">
                    <div class="col-6">
                        <h4 class='card-title'><i class='fas fa-bell'></i> Notification</h4>
                    </div>

                    <div class="col-6">
                        <span class="float-right">
                            <button id='indexBtnShowTrNotification' class='btn btn-info btn-circle '>
                                <i class='fas fa-eye fa-lg'></i>
                            </button>
                            <button id='indexBtnDeleteItemsNotification' class='btn btn-danger btn-circle '>
                                <i class='fas fa-trash-alt fa-lg'></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class='card-body card-default'>
                <div class='table-responsive'>
                    <table id='indexTableDataNotification' class='table table-stripped table-bordered table-hover table-sm table-condensed'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No</th>
                                <th>Id transaksi</th>
                                <th>Keterangan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id='indexTbodyDataNotification'>
                            <!--  data notification akan muncul disini -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- {{--  ini adalah modal untuk edit notification --}} -->
<div id="indexDivEditItemsNotification" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-body">
                <div class="card">
                    <div class="card-header">Edit Items Notification</div>
                    <div class="card-body">
                        <form id='indexFormEditNotification'>
                            <input type="hidden" name="dataKeyNotification">
                            <div class="form-group">
                                <label for="">idTransaksi</label>
                                <input class="form-control form-control-sm" name="idTransaksi" rows="3" cols="80"></input>
                            </div>
                            <div class="form-group">
                                <label for="">keterangan</label>
                                <textarea class="form-control form-control-sm" name="keterangan" rows="3" cols="80"></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary btn-sm">
                                <i class="fas fa-save fa-lg"></i>
                                Simpan data notification
                            </button>
                            <button type="reset" class="btn btn-danger btn-sm">
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- {{--  ini adalah modal untuk melihat catatan chatan --}} -->
<div id="indexDivModalCatatanChatan" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-body">
            <div class="card">
                <div class="card-header">Catatan untuk <b id='indexBCatatanChatan'></b></div>
                <div class="card-body">
                    <div id="indexDivCatatanChatan">
                        <!--  text -->
                    </div>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>

<!--  ini adalah modal untuk melihat detail transaksi -->
<div id='showTransaksi' class="modal fade">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-body">
                <div class="card">
                    <div class="card-header">Detail transaksi untuk <b id='indexBCatatanNotification'></b></div>
                    <div class="card-body">
                        <div id='indexDivCatatanNotification'>
                            <table class='table table-striped'>
                                <tbody id='indexTbodyCatatanNotification'>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
