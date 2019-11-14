const shell = require('shelljs');

// S3
shell.echo('Creating s3 bucket and uploading attributes...');

shell.exec('aws --endpoint-url=http://lambda-parser-aws:4572 s3 mb s3://my-bucket');
shell.exec('aws --endpoint-url=http://lambda-parser-aws:4572 s3 sync s3://my-bucket --acl public-read');
shell.exec('aws --endpoint-url=http://lambda-parser-aws:4572 s3api get-object-acl --bucket my-bucket --key my-attributes.json');


// Dynamodb
shell.echo('Creating DynamoDB table...');
shell.exec('aws --endpoint-url=http://lambda-parser-aws:4569  dynamodb create-table \
          --table-name Attributes \
          --attribute-definitions \
              AttributeName=ID,AttributeType=S \
          --key-schema AttributeName=ID,KeyType=HASH \
          --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1');

shell.echo('Bootstrap complete');