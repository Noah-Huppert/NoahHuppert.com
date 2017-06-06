variable "do_region" {}
variable "do_ssh_key_id" {}
variable "public_key_file" {}
variable "db_password" {}

variable "instance_password_hash" {
    type = "string"
    description = "Password hash of instance to create"
}

variable "keybase_verify_txt" {
    type = "string"
    description = "Text to insert into Keybase TXT DNS record"
}
