const AWS = require('aws-sdk');
const iam = new AWS.IAM();
const roleName = 'serverless-notifications';

const createRoleParams = {
  AssumeRolePolicyDocument: `{
    "Version":"2012-10-17",
    "Statement":[{
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }`,
  RoleName: roleName
};

iam.createRole(createRoleParams, (err, data) => {
  if (err) return console.log(err, err.stack);

  const attachPolicyParams = {
    PolicyDocument: `{
      "Version": "2012-10-17",
      "Statement": [{
        "Action": ["iot:Connect", "iot:Subscribe", "iot:Publish", "iot:Receive"],
        "Resource": "*",
        "Effect": "Allow"
      }]
    }`,
    PolicyName: roleName,
    RoleName: roleName
  };

  iam.putRolePolicy(attachPolicyParams, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log(`Finished creating IoT Role: ${roleName}`);          
  });
});