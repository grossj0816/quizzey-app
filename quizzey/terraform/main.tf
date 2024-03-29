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


//we are setting who controls ownership to new objects added to our quizzey bucket
resource "aws_s3_bucket_ownership_controls" "bucket_owner_controls" {
  bucket = aws_s3_bucket.quizzey-bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

//enabling full public access to S3 
resource "aws_s3_bucket_public_access_block" "pub_access_block" {
  bucket = aws_s3_bucket.quizzey-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


# https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl
resource "aws_s3_bucket_acl" "quizzey-bucket-acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.bucket_owner_controls,
    aws_s3_bucket_public_access_block.pub_access_block,
  ]
  
  bucket = aws_s3_bucket.quizzey-bucket.id
  acl = "public-read"
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


