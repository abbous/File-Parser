import { FixedOptions, CreateColumns } from './interface'
import { isNeededElement, shapeData } from './shape'

export const convertCsvToArray = (rows: string[], options: FixedOptions): any[][] => {
	const { separator } = options
	const rowElmentFactory = createColumnsFactory(options)
	if (rows.length === 0) return [[]]
	const firstRow = ((rows.shift() as any).split(separator) as string[]).reduce<string[]>(rowElmentFactory, [])

	const remainingRow = rows.reduce<any[][]>((stack, next) => {
		const rowDataArray = next.split(separator).reduce<any[]>(rowElmentFactory, [])
		return isIgnoreRowDataArray(firstRow, rowDataArray, options) ? stack : stack.concat([rowDataArray])
	}, [])
	return [firstRow].concat(remainingRow)
}

export const createColumnsFactory = (options: FixedOptions): CreateColumns => {
	return (stack, elem, index) => {
		return isNeededElement(options, index) ? stack.concat([shapeData(elem, options)]) : stack
	}
}

export const isIgnoreRowDataArray = (keys: string[], rowDataArray: any[], options: FixedOptions): boolean => {
	const { defaultValue, ignoreRow } = options
	const { emptyRow, lackElements } = ignoreRow
	if (lackElements && rowDataArray.length < keys.length) return true
	if (emptyRow && rowDataArray.every((elem) => elem === defaultValue)) return true
	return false
}
