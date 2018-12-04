<div class="row" id='index' >
    <div class="col-md-12">
        <div class="card card-default" style="margin-top:15px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h4>
                            <i class="fas fa-list-alt"></i>
                             List Pesanan
                        </h4>
                    </div>

                    <div class="col-6">
                        <span class="float-right">
                            <button  id='addBarang' class='btn btn-success btn-circle' data-toggle="modal" data-target="#addBarangModal">
                                <i class='fas fa-plus-circle fa-lg'></i>
                            </button>
                            <button id='indexBtnShowTr' class='btn btn-info btn-circle '>
                                <i class='fas fa-eye fa-lg'></i>
                            </button>
                            <!-- <button  id='editBarang' class='btn btn-primary btn-circle'  data-toggle="modal" data-target="#editBarangModal">
                                <i class='fas fa-edit fa-lg'></i>
                            </button> -->
                            <button id='indexBtnDeleteItems' class='btn btn-danger btn-circle '>
                                <i class='fas fa-trash-alt fa-lg'></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>

            <div class="card-body table-responsive">
                <table class="table table-stripped table-bordered table-hover table-sm table-condensed"  id='indexTableData'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Item</th>
                      <th>Harga</th>
                      <th>Jumlah</th>
                      <th>Total Harga</th>
                      <th>Id Tokped</th>
                      <th>Id Bl</th>
                      <th>Tggl</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Catatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody id='indexTbodyData'>
                      <!--  nanti datanya tampil disini -->
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- {{--  ini adalah modal untuk menambah barang --}} -->
<div id="addBarangModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-body">
        <div class="card">
                <div class="card-header">Tambah Pesanan</div>
                <div class="card-body">

                    <form id='indexFormPush'>
                        <input type="hidden" name="id" value="<?= rand(100000, 999999) ?>">

                        <div class="form-group">
                            <label for="">Nama</label>
                            <input class="form-control form-control-sm" name='nama' />
                        </div>
                        <div class="form-group">
                            <label for="">Item</label>
                            <input class="form-control form-control-sm" name='item' />
                        </div>
                        <div class="form-group">
                            <label for="">Harga</label>
                            <input class="form-control form-control-sm" name='harga' type='number' />
                        </div>
                        <div class="form-group">
                            <label for="">Jumlah</label>
                            <input class="form-control form-control-sm" name='jumlah' type='number' value='1'/>
                        </div>
                        <div class="form-group">
                            <label for="">idTokped</label>
                            <select class="form-control" name="idTokped">
                                <!--  data id tokped -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">idBl</label>
                            <select class="form-control" name="idBl">
                                <!--  data idBl -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Tggl</label>
                            <input class="form-control form-control-sm" name='tggl' type='datetime-local' value='<?= date('Y-m-d\TH:i')?>'/>
                        </div>
                        <div class="form-group">
                            <label for="">Status</label>
                            <select class="form-control form-control-sm" name="status">
                                <option value="bayar">bayar</option>
                                <option value="resi">resi</option>
                                <option value="terkirim">terkirim</option>
                                <option value="diterima">diterima</option>
                                <option value="complain">complain</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Catatan</label>
                            <textarea class="form-control form-control-sm" name="catatan" rows="3" cols="80"></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fas fa-save fa-lg"></i>
                            Simpan data pesanan
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


<!-- {{--  ini adalah modal untuk edit barang --}} -->
<div id="indexDivEditItems" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-body">
                <div class="card">
                    <div class="card-header">Edit Items</div>
                    <div class="card-body">
                        <form id='indexFormEdit'>
                            <input type="hidden" name="id">
                            <input type="hidden" name="dataKey">

                            <div class="form-group">
                                <label for="">Nama</label>
                                <input class="form-control form-control-sm" name='nama' />
                            </div>
                            <div class="form-group">
                                <label for="">Item</label>
                                <input class="form-control form-control-sm" name='item' />
                            </div>
                            <div class="form-group">
                                <label for="">Harga</label>
                                <input class="form-control form-control-sm" name='harga' type='number' />
                            </div>
                            <div class="form-group">
                                <label for="">Jumlah</label>
                                <input class="form-control form-control-sm" name='jumlah' type='number' value='1'/>
                            </div>
                            <div class="form-group">
                            <label for="">idTokped</label>
                            <select class="form-control" name="idTokped">
                                <!--  data id tokped -->
                            </select>
                            </div>
                            <div class="form-group">
                                <label for="">idBl</label>
                                <select class="form-control" name="idBl">
                                    <!--  data idBl -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Tggl</label>
                                <input class="form-control form-control-sm" name='tggl' type='datetime-local' value='<?= date('Y-m-d\TH:i')?>'/>
                            </div>
                            <div class="form-group">
                                <label for="">Status</label>
                                <select class="form-control form-control-sm" name="status">
                                    <option value="bayar">bayar</option>
                                    <option value="resi">resi</option>
                                    <option value="terkirim">terkirim</option>
                                    <option value="diterima">diterima</option>
                                    <option value="complain">complain</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Catatan</label>
                                <textarea class="form-control form-control-sm" name="catatan" rows="3" cols="80"></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary btn-sm">
                                <i class="fas fa-save fa-lg"></i>
                                Simpan data pesanan
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
<div id="indexDivModalCatatan" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-body">
            <div class="card">
                <div class="card-header">Catatan untuk <b id='indexBCatatan'></b></div>
                <div class="card-body">
                    <div id="indexDivCatatan">
                        <!--  text -->
                    </div>

                </div>
            </div>
      </div>
    </div>
  </div>
</div>
