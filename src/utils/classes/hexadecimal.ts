export default class Hexadecimal {
	public static hexDump = (hash: string): string | false => {
		try {
			const buffer: Uint8Array = new Uint8Array(hash.match(/[\da-f]{2}/gi)!.map((hex: string) => parseInt(hex, 16)))
			const formattedHex: Array<string> = []

			for (let i = 0; i < buffer.length; i += 16) {
				const chunk: Uint8Array = buffer.slice(i, i + 16)
				const hexString: string = Array.from(chunk, (byte) => byte.toString(16).padStart(2, '0')).join(' ')
				const printableChars: string = Array.from(chunk, (byte) => byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.').join('')
				const line: string = `${i.toString(16).padStart(4, '0')}: ${hexString.padEnd(48)}  ${printableChars}\n`
				formattedHex.push(line)
			}
			return formattedHex.join('')
		} catch (_error) {
			return false
		}
	}

	public static reverseHexDump = (dump: string): string | false => {
		try {
			const lines: Array<string> = dump.split('\n').filter(Boolean)
			const separateValues: (str: string) => string = (str: string) => str.match(/[\da-f]{2}/gi)!.join(' ')
			const hex: string = lines
				.map((line: string) => {
					const parts: Array<string> = line.split(':')
					const hexValue: string = parts[1].trim()
					const index: number = hexValue.indexOf('  ')
					const valueToProcess: string = index !== -1 ? hexValue.slice(0, index) : hexValue

					return separateValues(valueToProcess)
				})
				.join('\n')
				.replace(/\n/g, '')
				.replace(/\s/g, '')

			return hex
		} catch (_error) {
			return false
		}
	}

	public static randomBytes(size: number): Uint8Array {
		const array: Uint8Array = new Uint8Array(size)
		crypto.getRandomValues(array)
		return array
	}

	public static randomHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

	public static hexToBytes = (hex: string): Array<number> => {
		const bytes: Array<number> = []
		for (let i = 0; i < hex.length; i += 2) {
			bytes.push(parseInt(hex.substring(i, i + 2), 16))
		}
		return bytes
	}

	public static uint8ArrayToHex(array: Uint8Array): string {
		return Array.from(array)
			.map((byte: number): string => byte.toString(16).padStart(2, '0'))
			.join('')
	}

	public static hexToUint8Array = (hex: string): Uint8Array => {
		const byteArray: Array<number> = this.hexToBytes(hex)
		return new Uint8Array(byteArray)
	}
}
