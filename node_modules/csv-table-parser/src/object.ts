import { FixedOptions, AnyObject, CreateRows } from './interface'

import { convertStringToCorrectType, isNeededElement, trimString, trimUnnecessaryElement } from './shape'

export const convertCsvToObject = (rows: string[], options: FixedOptions): AnyObject => {
	const keys = createKeys(rows, options)
	const createRow = createObjectRowFactory(keys, options)

	return rows.reduce<AnyObject[]>((stack, next, index) => {
		const values = next.split(options.separator)
		const rowDataObject = values.reduce<AnyObject>(createRow, {})
		return isIgnoreRowDataObject(keys, rowDataObject, options) ? stack : stack.concat(rowDataObject)
	}, [])
}

export const createKeys = (rows: string[], options: FixedOptions): string[] => {
	const { separator, keys: optionKeys, startColumn } = options
	const isUsedOptionKeys = 0 < optionKeys.length
	const keys = isUsedOptionKeys ? optionKeys : (rows.shift() || '').split(separator)
	return trimUnnecessaryElement(keys, startColumn)
}

export const isIgnoreRowDataObject = (keys: string[], rowDataObject: AnyObject, options: FixedOptions): boolean => {
	const { defaultValue, ignoreRow, numberOfColumn } = options
	const { emptyRow, lackElements } = ignoreRow
	const needLength = numberOfColumn || keys.length

	if (lackElements && Object.keys(rowDataObject).length < needLength) return true
	if (emptyRow && Object.values(rowDataObject).every((elem) => elem === defaultValue)) return true

	return false
}

export const createObjectRowFactory = (keys: string[], options: FixedOptions): CreateRows => {
	const { trim, startColumn } = options
	return (obj, elem, index) => {
		if (isNeededElement(options, index) === false) {
			return obj
		}

		const actualHeaderIndex = index - startColumn
		const key = trim ? trimString(keys[actualHeaderIndex]) : keys[actualHeaderIndex]
		const value = trim ? trimString(elem) : elem
		obj[key] = convertStringToCorrectType(value, options)
		return obj
	}
}
