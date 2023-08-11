import object from '@mailobj-browser/front/js/utils/object.js'

const pad = (value, size) => `${value}`.padStart(size + 1, '0')

const cases = object(null, {
	D: (date, { dateDay0 }) => pad(date.getDate(), dateDay0),
	M: (date, { dateMonth0 }) => pad(date.getMonth() + 1, dateMonth0),
	Y: (date) => date.getFullYear()
})

export default (
  date,
	{
		dateFormat = 'DMY',
		dateSeparator = '/',
		dateDay0 = 1,
		dateMonth0 = 1
	}
) => {
	const values = []
	const format = { dateDay0, dateMonth0 }

  for (const key of dateFormat) {
		values.push(cases[key]?.(date, format))
  }

  return values.join(dateSeparator)
}
