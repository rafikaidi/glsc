// Dates relatives à « aujourd'hui » : la démo reste cohérente quel que soit le jour de la démo.
export function ilYaDeuxJoursISO(heures = 10): string {
  const d = new Date(Date.now() - 2 * 86_400_000)
  d.setHours(heures, 0, 0, 0)
  return d.toISOString()
}

export function dansNJoursISO(n: number, heures = 10): string {
  const d = new Date(Date.now() + n * 86_400_000)
  d.setHours(heures, 0, 0, 0)
  return d.toISOString()
}

export function formaterDateCourte(iso: string, langue: string): string {
  return new Intl.DateTimeFormat(langue, { dateStyle: 'medium' }).format(new Date(iso))
}

export function formaterDateHeure(iso: string, langue: string): string {
  return new Intl.DateTimeFormat(langue, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}
