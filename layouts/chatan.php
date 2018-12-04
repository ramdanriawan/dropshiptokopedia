<div class='row' id='chatan'>
    <div class='col-md-12'>
        <div class='card' style="margin-top:15px;">
            <div class='card-header'>
                <div class='row'>
                    <div class='col-md-6'>
                        <h4 class='card-title'><i class='fas fa-comment'></i> Chatan</h4>
                    </div>
                    <div class='col-md-6'>
                        <span class="float-right">
                            <button  id='addChatan' class='btn btn-success btn-circle' data-toggle="modal" data-target="#addChatanModal">
                                <i class='fas fa-plus-circle fa-lg'></i>
                            </button>
                            <button id='indexBtnShowTrChatan' class='btn btn-info btn-circle '>
                                <i class='fas fa-eye fa-lg'></i>
                            </button>
                            <button id='indexBtnDeleteItemsChatan' class='btn btn-danger btn-circle '>
                                <i class='fas fa-trash-alt fa-lg'></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class='card-body card-default'>
                <div class='table-responsive'>
                    <table id='indexTableDataChatan' class='table table-stripped table-bordered table-hover table-sm table-condensed'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Id tokped</th>
                                <th>Id bl</th>
                                <th>Tggl</th>
                                <th>Keterangan</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id='indexTbodyDataChatan'>
                            <!--  data notification akan muncul disini -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- {{--  ini adalah modal untuk menambah chatan --}} -->
<div id="addChatanModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-body">
        <div class="card">
                <div class="card-header">Tambah Chatan</div>
                <div class="card-body">

                    <form id='indexFormPushChatan'>
                        <div class='form-group'>
                            <label for="">Nama</label>
                            <input class='form-control' type="text" name="nama">
                        </div>
                        <div class="form-group">
                            <label for="">idTokped</label>
                            <select class="form-control" name="idTokped">
                                <option value='-'>-</option>
                                <!--  data id tokped -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">idBl</label>
                            <select class="form-control" name="idBl">
                                <option value='-'>-</option>
                                <!--  data idBl -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Tggl</label>
                            <input class="form-control form-control-sm" name='tggl' type='datetime-local' value='<?= date('Y-m-d\TH:i')?>'/>
                        </div>
                        <div class="form-group">
                            <label for="">Keterangan</label>
                            <textarea class="form-control form-control-sm" name="catatan" rows="3" cols="80"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="">Status</label>
                            <select class="form-control" name="status">
                                <option value="belum">belum</option>
                                <option value="sudah">sudah</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fas fa-save fa-lg"></i>
                            Simpan data Chatan
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

<!-- {{--  ini adalah modal untuk edit chatan --}} -->
<div id="indexDivEditItemsChatan" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-body">
                <div class="card">
                    <div class="card-header">Edit Items Chatan</div>
                    <div class="card-body">
                        <form id='indexFormEditChatan'>
                            <input type="hidden" name="id">
                            <input type="hidden" name="dataKeyChatan">

                            <div class="form-group">
                                <label for="">Nama</label>
                                <input class="form-control" type="text" name="nama">
                            </div>
                            <div class="form-group">
                            <label for="">idTokped</label>
                            <select class="form-control" name="idTokped">
                                <option value='-'>-</option>
                                <!--  data id tokped -->
                            </select>
                            </div>
                            <div class="form-group">
                                <label for="">idBl</label>
                                <select class="form-control" name="idBl">
                                    <option value='-'>-</option>
                                    <!--  data idBl -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Tggl</label>
                                <input class="form-control form-control-sm" name='tggl' type='datetime-local' value='<?= date('Y-m-d\TH:i')?>'/>
                            </div>
                            <div class="form-group">
                                <label for="">Keterangan</label>
                                <textarea class="form-control form-control-sm" name="catatan" rows="3" cols="80"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="">Status</label>
                                <select class="form-control" name="status">
                                    <option value="sudah">sudah</option>
                                    <option value="belum">belum</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">
                                <i class="fas fa-save fa-lg"></i>
                                Simpan data chatan
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

<!-- {{--  ini adalah modal untuk melihat catatan --}} -->
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
