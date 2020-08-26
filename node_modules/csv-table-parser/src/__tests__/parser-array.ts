import { parser } from '../parser'
import { Options } from '../interface'

describe('parser type array', () => {
	const defaultOptions: Options = { type: 'array' }
	test('ignore rows if element length is less than first element length', async () => {
		const input = `a,b,c
1, true,false

`
		expect(parser(input, defaultOptions)).toEqual([['a', 'b', 'c'], [1, true, false]])
	})

	test('parse csv to array', async () => {
		const input = `a, b, c
1, true, false`
		expect(parser(input, defaultOptions)).toEqual([['a', 'b', 'c'], [1, true, false]])
	})

	test('parse null or undefined string to null or undefined', async () => {
		const input = `a,b,c
null, undefined, 3`
		expect(parser(input, defaultOptions)).toEqual([['a', 'b', 'c'], [null, undefined, 3]])
	})

	describe('parser using tab for separator', () => {
		test('parse tsv to array', async () => {
			const input = `a	b	c
1	2	3`
			expect(
				parser(input, {
					...defaultOptions,
					separator: '\t',
					trim: false
				})
			).toEqual([['a', 'b', 'c'], [1, 2, 3]])
		})
	})

	describe('parser using trim option', () => {
		test('should not trim space and tab before and after string', async () => {
			const input = `a, b,   c
1	,2 , 3 2`

			expect(
				parser(input, {
					...defaultOptions,
					trim: false,
					convertNumber: false
				})
			).toEqual([['a', ' b', '   c'], ['1	', '2 ', ' 3 2']])
		})
	})

	describe('parser using parseNumber option', () => {
		test('should not parse number value to Number', async () => {
			const input = `a, b, c
1, 2, 3`

			expect(
				parser(input, {
					...defaultOptions,
					convertNumber: false
				})
			).toEqual([['a', 'b', 'c'], ['1', '2', '3']])
		})
	})

	describe('parser using parseBoolean option', () => {
		test('should not convert boolean value to boolean', async () => {
			const input = `a, b, c
1, true, false`

			expect(
				parser(input, {
					...defaultOptions,
					convertBoolean: false
				})
			).toEqual([['a', 'b', 'c'], [1, 'true', 'false']])
		})
	})

	describe('parser using keys option', () => {
		test('ignore keys option', async () => {
			const input = `a, b, c
1, true, false`

			expect(
				parser(input, {
					...defaultOptions,
					keys: ['aaa', 'bbb', 'ccc']
				})
			).toEqual([['a', 'b', 'c'], [1, true, false]])
		})
	})

	describe('parser using default option', () => {
		test('return default value if value is null or undefined', async () => {
			const input = `a, b, c
, true, 1
2, , 3
4, 5,`

			expect(
				parser(input, {
					...defaultOptions,
					defaultValue: 'default value'
				})
			).toEqual([['a', 'b', 'c'], ['default value', true, 1], [2, 'default value', 3], [4, 5, 'default value']])
		})
	})

	describe('parser using startRow option', () => {
		test('return row from start row', async () => {
			const input = `a, b, c
1, 2, 3`
			expect(
				parser(input, {
					...defaultOptions,
					startRow: 1
				})
			).toEqual([[1, 2, 3]])
		})
	})

	describe('parser using startColumn option', () => {
		test('row has columns from start column', async () => {
			const input = `a, b, c
1, 2, 3`
			expect(
				parser(input, {
					...defaultOptions,
					startColumn: 1
				})
			).toEqual([['b', 'c'], [2, 3]])
		})
	})

	describe('parser using startColumn and StartRow option', () => {
		test('return row from start row that has columns from start column', async () => {
			const input = `a, b, c
A, B, C
4, 5 ,6`
			expect(
				parser(input, {
					...defaultOptions,
					startColumn: 1,
					startRow: 1
				})
			).toEqual([['B', 'C'], [5, 6]])
		})
	})

	describe('parser using numberOfColumn', () => {
		test("row's number of column is less than number Of Column", async () => {
			const input = `a, b, c
1, 2 ,3`
			expect(
				parser(input, {
					...defaultOptions,
					numberOfColumn: 2
				})
			).toEqual([['a', 'b'], [1, 2]])
		})
	})

	describe('parser using ignoreRow.emptyRow', () => {
		test('ignore rows have every element is defaultValue', async () => {
			const input = `a	b	c	d
      1	2		3	4	
      					`
			expect(
				parser(input, {
					...defaultOptions,
					separator: '\t',
					startColumn: 0,
					numberOfColumn: 4,
					defaultValue: null,
					ignoreRow: {
						emptyRow: true
					}
				})
			).toEqual([['a', 'b', 'c', 'd'], [1, 2, null, 3]])
		})
	})
})
