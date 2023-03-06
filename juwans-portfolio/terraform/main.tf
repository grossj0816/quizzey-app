terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "tc-terraform-state-storage-s3"
    key = "app-portfolio-frontend"
    region = "us-east-1"
    dynamodb_table = "terraform-state-locking"
    encrypt = true
  }
}


provider "aws" {
  region = "us-east-1"
}


resource "aws_s3_bucket" "portfolio-hosting-bucket" {
  bucket = "juwans-portfolio-bucket"
  force_destroy = true
}
# https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl
resource "aws_s3_bucket_acl" "portfolio-hosting-bucket-acl" {
  bucket = aws_s3_bucket.portfolio-hosting-bucket.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "portfolio-bucket-policy" {
  bucket = aws_s3_bucket.portfolio-hosting-bucket.id
  policy = jsonencode({
    "Version": "2021-05-27",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::juwans-portfolio-bucket/*"
        }
    ]
  })
}


resource "aws_s3_bucket_website_configuration" "portfolio-bucket-web-config" {
  bucket = aws_s3_bucket.portfolio-hosting-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}