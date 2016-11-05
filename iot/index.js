'use strict';

const awsIot = require('aws-iot-device-sdk');

let client, iotTopic;
const IoT = { 

    connect: (topic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {

        iotTopic = topic;

        client = awsIot.device({
            region: region,
            protocol: 'wss',
            accessKeyId: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken,
            port: 443,
            host: iotEndpoint
        });

        client.on('connect', onConnect);
        client.on('message', onMessage);            
        client.on('error', onError);
        client.on('reconnect', onReconnect);
        client.on('offline', onOffline);
        client.on('close', onClose);     
    },

    send: (message) => {
        client.publish(iotTopic, message);
    }  
}; 

const onConnect = () => {
    client.subscribe(iotTopic);
    addLog('Connected');
};

const onMessage = (topic, message) => {
    addLog(message);
};

const onError = () => {};
const onReconnect = () => {};
const onOffline = () => {};

const onClose = () => {
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
            url: window.lambdaEndpoint,
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
        $('#message').val('');
    });    
});

const addLog = (msg) => {
    const date = (new Date()).toTimeString().slice(0, 8);
    $("#log").prepend(`<li>[${date}] ${msg}</li>`);
}