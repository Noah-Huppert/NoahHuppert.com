# Vars
variable "do_token" {
    type = "string"
    description = "DigitalOcean API token"
}

variable "do_region" {
    type = "string"
    description = "DigitalOcean region to create resources in"
    default = "nyc3"
}

variable "do_ssh_key_id" {
    type = "string"
    description = "DigitalOcean SSH Key Id to use when creating new instances"
}

variable "public_key_file" {
    type = "string"
    description = "Path to public key to be setup on new instances"
}

# Provider setup
provider "digitalocean" {
    token = "${var.do_token}"
}
