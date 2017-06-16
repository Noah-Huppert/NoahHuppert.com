variable "db_password" {
    type = "string"
    description = "Database password"
}

variable "instance_password_hash" {}
variable "keybase_verify_txt" {}

module "auto-chess" {
    source = "./auto-chess"

    do_region = "${var.do_region}"
    do_ssh_key_id = "${var.do_ssh_key_id}"

    db_password = "${var.db_password}"
    public_key_file = "${var.public_key_file}"
    instance_password_hash = "${var.instance_password_hash}"
    keybase_verify_txt = "${var.keybase_verify_txt}"
}
