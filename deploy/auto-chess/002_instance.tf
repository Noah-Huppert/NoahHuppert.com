resource "digitalocean_droplet" "auto_chess" {
    image = "coreos-alpha"
    name = "auto-chess"
    region = "${var.do_region}"
    size = "512mb"
    ipv6 = true
    private_networking = true
    ssh_keys = ["${var.do_ssh_key_id}"]
    user_data = "${data.ignition_config.auto_chess.rendered}"
}
