<script src="asset\node_modules\jquery\dist\jquery.min.js" charset="utf-8"></script>
<link rel="stylesheet" href="asset\node_modules\bootstrap\dist\css\bootstrap.min.css">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

<script>
    $(document).ready(function(){
        var messageData = {
            message: 'Deadline akan berakhir dalam 1 jam'
        };

        $.ajax({
            url: '/dropshiptokopedia/smsgatewayme/send.php',
            method: 'POST',
            data: messageData,
            success: function(sms){
                console.log(sms);
            }
        })
    });
</script>
