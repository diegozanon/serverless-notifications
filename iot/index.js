'use strict';

const awsIot = require('aws-iot-device-sdk');

const IoT = (() => { 

    let client, iotTopic;

    return { 
    
        connect: (iotTopic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {

            this.iotTopic = iotTopic;

            this.client = awsIot.device({
                region: region,
                protocol: 'wss',
                accessKeyId: accessKey,
                secretKey: secretKey,
                sessionToken: sessionToken,
                port: 443,
                host: iotEndpoint
            });

            this.client.on('connect', () => {
                this.client.subscribe(this.iotTopic);
                this.onConnect();
            });

            this.client.on('message', this.onMessage);            
            this.client.on('error', this.onError);
            this.client.on('reconnect', this.onReconnect);
            this.client.on('offline', this.onOffline);
            this.client.on('close', this.onClose);     
        },

        onConnect: () => {},
        onMessage: (topic, message) => {},
        onError: () => {},
        onReconnect: () => {},
        onOffline: () => {},
        onClose: () => {},

        send: (message) => {
            this.client.publish(this.iotTopic, message);
        }
    }
})(); 

IoT.onMessage = (topic, message) => {
    addLog(message);
};

IoT.onClose = () => {
    addLog('Connection failed');
};

$(document).ready(() => {

    // initial state
    $('#btn-keys').prop('disabled', false);
    $('#btn-connect').prop('disabled', true);
    $('#btn-send').prop('disabled', true);

    let iotKeys;

    $('#btn-keys').on('click', () => {
        $.ajax({
            url: "https://j81qrc8un8.execute-api.us-east-1.amazonaws.com/dev/iot/keys",
            success: (res) => {
                addLog(`Endpoint: ${res.iotEndpoint}, 
                        Region: ${res.region}, 
                        AccessKey: ${res.accessKey}, 
                        SecretKey: ${res.secretKey}, 
                        SessionToken: ${res.sessionToken}`);

                iotKeys = res; // save the keys
                
                $('#btn-keys').prop('disabled', true);
                $('#btn-connect').prop('disabled', false);
            }
        });
    });  

    $('#btn-connect').on('click', () => {
        const iotTopic = '/serverless/pubsub';        

        IoT.connect(iotTopic,
                    iotKeys.iotEndpoint, 
                    iotKeys.region, 
                    iotKeys.accessKey, 
                    iotKeys.secretKey, 
                    iotKeys.sessionToken);
        
        $('#btn-connect').prop('disabled', true);
        $('#btn-send').prop('disabled', false);
    });    

    $('#btn-send').on('click', () => {
        const msg = $('#message').val();
        IoT.send(msg);    
    });    
});

const addLog = (msg) => {
    const date = (new Date()).toTimeString().slice(0, 8);
    $("#log").prepend(`<li>[${date}] ${msg}</li>`);
}