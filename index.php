<?php include './layouts/head.php' ?>

<div ng-app='app'>
    <nav class="navbar navbar-expand-sm bg-light">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand text-secondary" href="#!index">Index</a>
            </div>
            <ul class="nav navbar-nav">
                <a class="nav-link text-secondary" href='#!notification'><i class="fas fa-bell"></i> Notification </a>
                <a class="nav-link text-secondary" href='#!chatan'><i class="fas fa-comment-alt"></i> Chatan</a>
                <li class="nav-item"><a class="nav-link text-secondary" href='logout.php'><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    </nav>

    <!--  halamannya akan tampil disini -->
    <div class="container">
        <div ng-view></div>
    </div>
</div>

<?php include './layouts/footer.php' ?>
