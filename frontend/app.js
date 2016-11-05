$(document).ready(function() {

    // initial state
    $('#btn-keys').prop('disabled', false);
    $('#btn-connect').prop('disabled', true);
    $('#btn-send').prop('disabled', true);

    $('#btn-keys').on('click', function() {
        $.ajax({
            url: "https://j81qrc8un8.execute-api.us-east-1.amazonaws.com/dev/iot/keys",
            success: function(res) {
                addLog(`Endpoint: ${res.endpoint}, 
                        Region: ${res.region}, 
                        AccessKey: ${res.accessKey}, 
                        SecretKey: ${res.secretKey}, 
                        SessionToken: ${res.sessionToken}`);
                
                $('#btn-keys').prop('disabled', true);
                $('#btn-connect').prop('disabled', false);
            }
        });
    });
});

function addLog(msg) {
    msg = '[' + (new Date()).toTimeString().slice(0, 8) + '] ' + msg;
    $("#log").prepend('<li>' + msg + '</li>');
}