export interface DnsRecord {
  id: string;
  type: "A" | "CNAME" | "MX" | "TXT" | "NS" | "SOA" | "SRV" | "PTR";
  name: string;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  zone_id: string;
  zone_name: "twente.me";
  modified_on: string;
  created_on: string;
  meta: {
    auto_added: boolean;
    managed_by_apps: boolean;
    managed_by_argo_tunnel: boolean;
  };
}
