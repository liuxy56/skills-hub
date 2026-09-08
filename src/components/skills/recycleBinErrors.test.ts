import { describe, expect, it } from 'vitest'
import i18n from '../../i18n'
import { formatRecycleBinError } from './recycleBinErrors'

describe('recycle bin errors', () => {
  it.each(['zh', 'en', 'ko'])('translates occupied-location errors in %s', (language) => {
    const t = i18n.getFixedT(language)
    const message = formatRecycleBinError('RECYCLE_BIN_LOCATION_OCCUPIED', 'restore', t)
    expect(message).toBe(t('recycleBin.errors.locationOccupied'))
    expect(message).not.toContain('recycleBin.errors.')
    expect(formatRecycleBinError(new Error('The original Skill location is already occupied'), 'restore', t)).toBe(message)
  })
  it.each(['load', 'restore', 'delete'] as const)('localizes unknown %s errors without exposing raw backend text', (operation) => {
    const message = formatRecycleBinError('SQLite failure: internal path', operation, i18n.getFixedT('zh'))
    expect(message).not.toContain('SQLite')
    expect(message).toBe(i18n.getFixedT('zh')(`recycleBin.errors.${operation}Failed`))
  })
})
