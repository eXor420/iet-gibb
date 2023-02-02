terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-east-1"
}

data "template_file" "user_data" {
  template = file("./cloud-init.yaml")
}

resource "aws_security_group" "pi_hole" {
  name        = "pi_hole"
  description = "Security group for Pi-Hole server"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0574da719dca65348"
  instance_type = "t2.medium"
  key_name      = "pihole key"
  vpc_security_group_ids = [aws_security_group.pi_hole.id]
  
  user_data = data.template_file.user_data.rendered

  tags = {
    Name = "PiHoleServer"
  }
}
