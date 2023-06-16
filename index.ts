import { createNewDomain } from './api/cloudflare'
import { getNameservers, listDomains, setNameservers } from './api/gandi'

const domains = await listDomains()

for (const domain of domains) {
  console.log(`--- ${domain.fqdn} ---`)

  if (domain.nameserver.current === 'other') {
    const nameservers = await getNameservers(domain.fqdn)
    if (nameservers.some(n => n.includes('cloudflare'))) {
      continue
    }
  }

  console.log('Creating new domain on Cloudflare')
  const response = await createNewDomain(domain.fqdn)

  console.log('Setting new nameservers')
  await setNameservers(domain.fqdn, response.result.name_servers)
}
