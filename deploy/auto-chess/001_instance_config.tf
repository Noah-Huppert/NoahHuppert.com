# Users
data "ignition_user" "autochess" {
    name = "autochess"
    password_hash = "${var.instance_password_hash}"
    ssh_authorized_keys = ["${file("${var.public_key_file}")}"]
    home_dir = "/home/autochess"
    shell = "/bin/bash"
    groups = ["sudo", "docker"]
}

# Services
# -- -- Postgres
data "template_file" "postgres_service" {
    template = "${file("${path.module}/postgres.service")}"

    vars {
        db_password = "${var.db_password}"
    }
}

data "ignition_systemd_unit" "postgres" {
    name = "postgres.service"
    content = "${data.template_file.postgres_service.rendered}"
    enable = true
}

# -- -- Auto Chess
data "template_file" "auto_chess_service" {
    template = "${file("${path.module}/auto_chess.service")}"

    vars {
        db_password = "${var.db_password}"
    }
}

data "ignition_systemd_unit" "auto_chess" {
    name = "auto_chess.service"
    content = "${data.template_file.auto_chess_service.rendered}"
    enable = true
}
# Config
data "ignition_config" "auto_chess" {
    users = ["${data.ignition_user.autochess.id}"]
    systemd = [
        "${data.ignition_systemd_unit.auto_chess.id}",
        "${data.ignition_systemd_unit.postgres.id}"
    ]
}
