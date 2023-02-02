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

resource "aws_security_group" "minecraft" {
  name        = "minecraft"
  description = "Security group for Minecraft server"

  ingress {
    protocol    = "tcp"
    from_port   = 25565
    to_port     = 25565
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
  ami           = "ami-0b5eea76982371e91"
  instance_type = "t2.small"

  vpc_security_group_ids = [aws_security_group.minecraft.id]
  
  user_data = data.template_file.user_data.rendered

  tags = {
    Name = "MinecraftServer"
  }
}
