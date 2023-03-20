export default (
  value, scopeJson
) => {
  const json = JSON.parse(scopeJson)
  const dateFormat = (json.dateFormat) ?? 'DMY'
  const dateSeparator = (json.dateSeparator) ?? '/'
  const dateDay0 = (json.dateDay0) ?? 1
  const dateMonth0 = (json.dateMonth0) ?? 1

  let str = '', first = true

  for (const c of dateFormat) {
	if (!first) {
	  str = str + dateSeparator
	}
    switch (c) {
	  case 'D':
	    const day = value.getDate()
		if (dateDay0 && day < 10) {
		  str = str + '0'
		}
	    str = str + value.getDate()
		break
	  case 'M':
	    const month = value.getMonth() + 1
		if (dateMonth0 && month < 10) {
		  str = str + '0'
		}
	    str = str + month
		break
	  case 'Y':
	    str = str + value.getFullYear()
		break
    }
	first = false
  }

  return str
}
