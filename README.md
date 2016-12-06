# Serverless Notifications
Serverless Service for Serverless Notifications (AWS IoT)

## Tutorial

Blog post: https://zanon.io/posts/serverless-notifications-on-aws

Demo: https://serverless-notifications.zanon.io

## Usage

1. With the Serverless Framework v1.x, run `serverless install --url https://github.com/zanon-io/serverless-notifications`

2. Inside the **create-role** folder, run `npm install` and `node index` to create an IoT role. I've named the role as **serverless-notifications**. If you want to rename, modify this file and the **handler.js** file.

3. Deploy the Lambda function with `serverless deploy`

4. Edit the **index.html** file that is placed inside the **frontend** folder to use your Lambda endpoint

5. To modify the IoT client, follow these steps:  
    5.1 Browse the **iot** folder  
    5.2 Edit the **index.js** file   
    5.3 Install dependencies with `npm install`      
    5.4 Run `node make-bundle`  
    5.5 Replace the **bundle.js** inside the **frontend** folder by this new **bundle.js** file  
