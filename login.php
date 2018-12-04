<?php include './layouts/head.php' ?>

<div class="container" >
    <div class='row'>
        <div class="col-md-8 offset-md-2">
            <div class="card card-default"  style="top:50%;">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <h4 class='text-center'>
                                <i class="fas fa-user fa-lg"></i>
                                Login user
                            </h4>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <form id='loginFormLogin'>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input class="form-control" id='loginInputUsername'>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input class="form-control" id='loginInputPassword' type='password'>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-sign-in-alt"></i>
                                Login
                            </button>
                            <button type="reset" class="btn btn-warning">
                                <i class="fas fa-sync"></i>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                <div class="card-footer">

                </div>
            </div>
        </div>
    </div>
</div>

<?php include './layouts/footer.php' ?>
