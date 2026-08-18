# Homelab

Documentation for my personal homelab.

Built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## Run locally

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the local documentation server:

```bash
mkdocs serve
```

Open:

```text
http://127.0.0.1:8000
```

## Build the site

```bash
mkdocs build
```

The generated website will be placed in:

```text
site/
```
mkdocs gh-deploy
```

Update `site_url` in `mkdocs.yml` with your GitHub Pages URL before deployment.
