# Define provider and backend configuration
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
  backend "local" {}
}

# Configure the Google Cloud provider
provider "google" {
  credentials = file("gossip-hub-infra-422716-60e23fb588d6.json")
  project     = "gossip-hub-infra-422716"
  region      = "asia-south1"
}

# Create a VPC network
resource "google_compute_network" "vpc_network" {
  name                    = "vpc-network-gossip-hub"
  auto_create_subnetworks = false
}

# Create a public subnet
resource "google_compute_subnetwork" "public_subnet" {
  name          = "public-subnet-gossip-hub"
  network       = google_compute_network.vpc_network.self_link
  ip_cidr_range = "10.0.0.0/24"
}

# Create a private subnet
resource "google_compute_subnetwork" "private_subnet" {
  name          = "private-subnet-gossip-hub"
  network       = google_compute_network.vpc_network.self_link
  ip_cidr_range = "10.0.1.0/24"
}

# Create a bastion host in the public subnet
resource "google_compute_instance" "bastion_host" {
  name         = "bastion-host-gossip-hub"
  machine_type = "e2-micro"
  zone         = "asia-south1-a" # Replace with the desired zone
  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
  }
  network_interface {
    subnetwork = google_compute_subnetwork.public_subnet.self_link
    access_config {
      nat_ip = google_compute_address.bastion_ip.address
    }
  }
}

# Create a private VM instance in the private subnet
resource "google_compute_instance" "private_instance" {
  name         = "private-instance-gossip-hub"
  machine_type = "e2-medium"
  zone         = "asia-south1-b" # Replace with the desired zone
  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
  }
  network_interface {
    subnetwork = google_compute_subnetwork.private_subnet.self_link
  }
  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y git nodejs
  EOF
}

# Create a static IP address for the bastion host
resource "google_compute_address" "bastion_ip" {
  name = "bastion-ip-gossip-hub"
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.self_link

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
}
