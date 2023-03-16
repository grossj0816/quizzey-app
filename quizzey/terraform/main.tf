terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "tc-terraform-state-storage-s3"
    key = "app-quizzey-frontend"
    region = "us-east-1"
    dynamodb_table = "terraform-state-locking"
    encrypt = true
  }
}


provider "aws" {
  region = "us-east-1"
}


resource "aws_s3_bucket" "quizzey-bucket" {
  bucket = "quizzey-bucket"
  force_destroy = true
}
# https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl
resource "aws_s3_bucket_acl" "quizzey-bucket-acl" {
  bucket = aws_s3_bucket.quizzey-bucket.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "quizzey-bucket-policy" {
  bucket = aws_s3_bucket.quizzey-bucket.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::quizzey-bucket/*"
        }
    ]
}
EOF
}


resource "aws_s3_bucket_website_configuration" "quizzey-bucket-web-config" {
  bucket = aws_s3_bucket.quizzey-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
  
  routing_rules = <<EOF
[{
    "Condition": {
      "KeyPrefixEquals": "/courses/:id"
    },
    "Redirect": {
      "ReplaceKeyPrefixWith": ""
    }
},
{
    "Condition": {
      "KeyPrefixEquals": "/quizzey-set/:id"
    },
    "Redirect": {
      "ReplaceKeyPrefixWith": ""
    }  
}]
EOF
}


