# domain-sync

> This is a tiny script for my use that migrates all my Gandi domains to use Cloudflare DNS.

To install dependencies, ensure you have the [latest version of bun](https://bun.sh/) installed, and then run:

```bash
bun install
```

Create a file called `.env` with your Gandi API token and a Cloudflare token with the following permissions:

 - User > Memberships > Edit
 - Zone > Zone Settings > Edit
 - Zone > Zone > Edit

Then simply run:

```bash
bun run index.ts
```

This script is idempotent; it's safe to run more than once as it will skip domains that already have their nameservers updated to CF.
