# IP
resource "digitalocean_floating_ip" "auto_chess" {
    droplet_id = "${digitalocean_droplet.auto_chess.id}"
    region = "${digitalocean_droplet.auto_chess.region}"
}

# DNS
resource "digitalocean_domain" "noahhuppert_com" {
    name = "noahhuppert.com"
    ip_address = "${digitalocean_droplet.auto_chess.ipv4_address}"
}

resource "digitalocean_record" "www" {
    domain = "${digitalocean_domain.noahhuppert_com.name}"
    name = "www"
    type = "CNAME"
    value = "noahhuppert.herokuapp.com."
}

resource "digitalocean_record" "keybase" {
    domain = "${digitalocean_domain.noahhuppert_com.name}"
    name = "noahhuppert.com"
    type = "TXT"
    value = "${var.keybase_verify_txt}"
}

resource "digitalocean_record" "auto_chess" {
    domain = "${digitalocean_domain.noahhuppert_com.name}"
    name = "autochess"
    type = "A"
    value = "${digitalocean_floating_ip.auto_chess.ip_address}"
}
