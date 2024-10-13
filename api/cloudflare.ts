import { $fetch } from 'ofetch'
import { z } from 'zod'

const api = $fetch.create({
  baseURL: 'https://api.cloudflare.com/client/v4',
  headers: {
    Authorization: `Bearer ${Bun.env.CLOUDFLARE_API_TOKEN}`,
  },
})

const zoneSchema = z.object({
  result: z.object({
    id: z.string(),
    name: z.string(),
    status: z.string(),
    paused: z.boolean(),
    type: z.string(),
    development_mode: z.number(),
    name_servers: z.array(z.string()),
    original_name_servers: z.array(z.string()).nullable(),
    original_registrar: z.string().nullable(),
    original_dnshost: z.string().nullable(),
    modified_on: z.string(),
    created_on: z.string(),
    activated_on: z.string().nullable(),
    meta: z.object({
      step: z.number(),
      custom_certificate_quota: z.number(),
      page_rule_quota: z.number(),
      phishing_detected: z.boolean(),
      multiple_railguns_allowed: z.boolean().optional(),
    }),
    owner: z.object({
      id: z.string().nullable(),
      type: z.string(),
      email: z.string().nullable(),
    }),
    account: z.object({
      id: z.string(),
      name: z.string(),
    }),
    tenant: z.object({
      id: z.string().nullable(),
      name: z.string().nullable(),
    }),
    tenant_unit: z.object({
      id: z.string().nullable(),
    }),
    permissions: z.array(z.string()),
    plan: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      currency: z.string(),
      frequency: z.string(),
      is_subscribed: z.boolean(),
      can_subscribe: z.boolean(),
      legacy_id: z.string(),
      legacy_discount: z.boolean(),
      externally_managed: z.boolean(),
    }),
  }),
  success: z.boolean(),
  errors: z.array(z.unknown()),
  messages: z.array(z.unknown()),
})

export async function createNewDomain(domain: string) {
  return await api('/zones', {
    method: 'POST',
    body: {
      name: domain,
      jump_start: true,
      type: 'full',
    },
  }).then(zone => zoneSchema.parse(zone))
}
