import { $fetch } from 'ofetch'
import { z } from 'zod'

const api = $fetch.create({
  baseURL: 'https://api.gandi.net/v5/domain/domains',
  headers: {
    Authorization: `Apikey ${Bun.env.GANDI_API_KEY}`,
  },
})

const domain = z.object({
  fqdn: z.string(),
  tld: z.string(),
  status: z.array(z.string()),
  dates: z.object({
    created_at: z.string(),
    registry_created_at: z.string(),
    registry_ends_at: z.string(),
    updated_at: z.string(),
  }),
  nameserver: z.object({
    current: z.string(),
  }),
  autorenew: z.boolean(),
  domain_owner: z.string(),
  orga_owner: z.string(),
  owner: z.string(),
  id: z.string(),
  tags: z.array(z.string()),
  href: z.string(),
  fqdn_unicode: z.string(),
})

export async function listDomains() {
  return await api('/').then(domains => z.array(domain).parse(domains))
}

export async function setNameservers(domain: string, nameservers: string[]) {
  return await api(`/${domain}/nameservers`, {
    method: 'PUT',
    body: {
      nameservers,
    },
  })
}

export async function getNameservers(domain: string) {
  return (await api(`/${domain}/nameservers`)) as string[]
}
