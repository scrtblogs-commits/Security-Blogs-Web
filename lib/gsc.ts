// Live Google Search Console snapshot, read from the Airtable "GSC Performance"
// table (populated daily by the n8n GSC → Airtable workflow). Server-only:
// requires the AIRTABLE_TOKEN env var (a read-scoped Airtable Personal Access
// Token). Returns null when unconfigured or on error, so callers can render
// nothing rather than break. All numbers are REAL — never fabricated.

const BASE = 'app4m6OOzymaqPKHX'
const TABLE = 'tbll8SQqDIrwq9ndZ'

export type GscQuery = { key: string; clicks: number; impressions: number; position: number }
export type GscDay = { date: string; clicks: number; impressions: number }
export type GscSnapshot = {
  hasData: boolean
  days: number
  totalClicks: number
  totalImpressions: number
  avgPosition: number
  byDate: GscDay[]
  topQueries: GscQuery[]
}

type AirtableRecord = { fields?: Record<string, unknown> }

export async function getGscSnapshot(): Promise<GscSnapshot | null> {
  const token = process.env.AIRTABLE_TOKEN
  if (!token) return null
  try {
    const url =
      `https://api.airtable.com/v0/${BASE}/${TABLE}` +
      '?pageSize=100&sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=asc'
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as { records?: AirtableRecord[] }
    const recs = json.records ?? []
    if (!recs.length) {
      return { hasData: false, days: 0, totalClicks: 0, totalImpressions: 0, avgPosition: 0, byDate: [], topQueries: [] }
    }

    let totalClicks = 0
    let totalImpressions = 0
    let posWeighted = 0
    const dateMap = new Map<string, GscDay>()
    const queryMap = new Map<string, GscQuery & { _posSum: number; _n: number }>()

    for (const r of recs) {
      const f = r.fields ?? {}
      const clicks = Number(f.Clicks) || 0
      const impressions = Number(f.Impressions) || 0
      const position = Number(f.Position) || 0
      const date = typeof f.Date === 'string' ? f.Date : ''
      const key = typeof f.Key === 'string' ? f.Key : ''
      totalClicks += clicks
      totalImpressions += impressions
      posWeighted += position * (impressions || 1)
      if (date) {
        const d = dateMap.get(date) ?? { date, clicks: 0, impressions: 0 }
        d.clicks += clicks
        d.impressions += impressions
        dateMap.set(date, d)
      }
      if (key) {
        const q = queryMap.get(key) ?? { key, clicks: 0, impressions: 0, position: 0, _posSum: 0, _n: 0 }
        q.clicks += clicks
        q.impressions += impressions
        q._posSum += position
        q._n += 1
        queryMap.set(key, q)
      }
    }

    const byDate = [...dateMap.values()].sort((a, b) => a.date.localeCompare(b.date))
    const topQueries: GscQuery[] = [...queryMap.values()]
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 6)
      .map((q) => ({
        key: q.key,
        clicks: q.clicks,
        impressions: q.impressions,
        position: q._n ? Math.round((q._posSum / q._n) * 10) / 10 : 0,
      }))
    const avgPosition = totalImpressions ? Math.round((posWeighted / totalImpressions) * 10) / 10 : 0

    return { hasData: true, days: byDate.length, totalClicks, totalImpressions, avgPosition, byDate, topQueries }
  } catch {
    return null
  }
}
