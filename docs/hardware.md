# Hardware

Hardware inventory, approximate purchase prices, and acquisition notes for the homelab.

Source: [Homelab Inventory Track](https://docs.google.com/document/d/1GJGK8DJNu16LaCVvPN1NvJG9e17QHvIZQysvy7fJ4go/edit?tab=t.0), updated September 10, 2026.

!!! note
    Some components are omitted for brevity. Prices are approximate purchase costs. This inventory includes available hardware and salvaged parts; it does not imply that every item is installed in the rack.

## Compute Devices

| Device | Specifications | Approx. cost | Acquisition / use |
|---|---|---|---|
| Lenovo ThinkCentre M710q | i5-7500T, 16GB DDR4 SODIMM, 256GB SSD | $60 | Purchased from an IT professional in Irvine who had previously sold PCs to students. |
| Lenovo ThinkCentre M910q | i7-6700T, 32GB DDR4 SODIMM, 480GB SSD | $144 | Bought second-hand from a user who used it in a Ceph cluster. |
| HP ProDesk 600 G3 Micro | i7-6700T, 16GB DDR4 SODIMM, 512GB SSD | $100 | Purchased from Refurb Technologies, an e-waste recycling company based in Georgia. |
| Raspberry Pi 4 | 8GB RAM | $50 | Bought for an electronics class and used to prototype a building management system. |

## Networking

| Device | Specifications | Approx. cost | Acquisition / use |
|---|---|---|---|
| TP-Link Archer AX21 V5 | AX1800 Wi-Fi 6 router | $60 | Bought from Amazon for use as a standard apartment router. |
| TP-Link Omada TL-SG2210P JetStream | 8-port Gigabit Smart PoE switch, version 3+ | $65 | — |

## Server Components

| Component | Specifications | Approx. cost | Acquisition / use |
|---|---|---|---|
| ASRock Rack EPYC3151D4I-NL | AMD EPYC 3151, Mini-ITX motherboard | $77 | Pulled from previous servers with a unique Mini-ITX form factor and accessories. |
| Micron MTA36ASF4G72PZ-2G6D1QK memory | 4 × 32GB ECC RDIMM DDR4 2666V; 128GB total | $470 | Purchased to maximize the capability of the ASRock server motherboard. |

## Color Management

| Device | Specifications | Approx. cost | Acquisition / use |
|---|---|---|---|
| X-Rite i1Pro 2 Rev E | Spectrophotometer; ISO 13655 M0, M1, M2 | $600 | Purchased second-hand for color management in standard ink printing and soft-proofing. |

## Salvaged Parts

Parts extracted from a **Dell OptiPlex 980**, acquired **free** before it was sent to e-waste by the UCI ICS Department:

- ATI Radeon HD4550(B)
- WD Caviar Black WS1001FAES 1TB HDD
- Generic SATA cables
- 2 × Kingston KP223C-ELD 2GB 2RX8 DDR3 memory
- Toshiba Samsung TS-H653 DVD writer / CD-RW/DVD-ROM drive
- Intel Core i7-860
- Foxconn DC brushless fan PV123812DSPF 01
- DC speaker

### Salvage Photos

<div class="image-carousel image-carousel--horizontal" data-carousel aria-label="Dell OptiPlex 980 salvage photos">
  <div class="carousel-track">
    <figure class="carousel-slide is-active">
      <img src="../assets/hardware/optiplex-parts-1.jpg" alt="Dell OptiPlex 980 tower" width="640" height="640" loading="lazy">
      <figcaption>Dell OptiPlex 980 tower</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="../assets/hardware/optiplex-parts-3.jpg" alt="Motherboard and chassis after removing components" width="640" height="640" loading="lazy">
      <figcaption>Motherboard and chassis after removing components</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="../assets/hardware/optiplex-parts-4.jpg" alt="Open OptiPlex case" width="640" height="640" loading="lazy">
      <figcaption>Open OptiPlex case</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="../assets/hardware/optiplex-parts-5.jpg" alt="Salvaged components laid out" width="640" height="640" loading="lazy">
      <figcaption>Salvaged components laid out</figcaption>
    </figure>
    <figure class="carousel-slide">
      <img src="../assets/hardware/optiplex-parts-6.jpg" alt="CPU heatsink and motherboard" width="640" height="640" loading="lazy">
      <figcaption>CPU heatsink and motherboard</figcaption>
    </figure>
  </div>
  <button class="carousel-button carousel-button--previous" type="button" data-carousel-previous aria-label="Previous photo">&lsaquo;</button>
  <button class="carousel-button carousel-button--next" type="button" data-carousel-next aria-label="Next photo">&rsaquo;</button>
  <div class="carousel-dots" role="group" aria-label="Choose a salvage photo">
    <button class="carousel-dot is-active" type="button" data-carousel-dot="0" aria-label="Show photo 1" aria-current="true"></button>
    <button class="carousel-dot" type="button" data-carousel-dot="1" aria-label="Show photo 2"></button>
    <button class="carousel-dot" type="button" data-carousel-dot="2" aria-label="Show photo 3"></button>
    <button class="carousel-dot" type="button" data-carousel-dot="3" aria-label="Show photo 4"></button>
    <button class="carousel-dot" type="button" data-carousel-dot="4" aria-label="Show photo 5"></button>
  </div>
  <button class="carousel-pause" type="button" data-carousel-pause>Pause slideshow</button>
</div>

## Rack Roles and Status

The following deployment notes reflect the rack as of **August 8, 2026**.

| Device | Role | Status |
|---|---|---|
| HP ProDesk 600 G3 Micro | Proxmox node | Active |
| Lenovo ThinkCentre M710q | Proxmox node | Active |
| TP-Link TL-SG2210P | Managed PoE switch | Active |
| Ethernet patch/keystone panel | Network termination | Active |

## Future Hardware

- Mini-ITX TrueNAS PC

Additional hardware will be documented here as the homelab expands.
