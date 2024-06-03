import Hexadecimal from './hexadecimal.ts'

import { crypto } from '@crypto'

interface AesAlgorithmParams extends Algorithm {
	name: 'AES-GCM' | 'AES-CTR' | 'AES-CBC'
	iv?: Uint8Array
	counter?: Uint8Array
	length?: number
}

export default class Aes256 {
	private static encoder: TextEncoder = new TextEncoder()
	private static decoder: TextDecoder = new TextDecoder()
	private static delimiter: string = String(Deno.env.get('CIPHER_DELIMITER'))

	constructor() {
		throw new Error('Aes256 class is static and cannot be instantiated.')
	}

	private static async setKey(key: Uint8Array, algorithm: AesAlgorithmParams): Promise<CryptoKey> {
		return await crypto.subtle.importKey('raw', key, { name: algorithm.name }, false, ['encrypt', 'decrypt'])
	}

	public static async encrypt(message: string, key: Uint8Array, algorithmType: 'AES-GCM' | 'AES-CTR' | 'AES-CBC'): Promise<string> {
		const encodedMessage: Uint8Array = this.encoder.encode(message)
		let algorithm: AesAlgorithmParams
		let iv: Uint8Array | undefined
		let counter: Uint8Array | undefined

		switch (algorithmType) {
			case 'AES-GCM': {
				iv = crypto.getRandomValues(new Uint8Array(12))
				algorithm = { name: 'AES-GCM', iv }
				break
			}
			case 'AES-CTR': {
				counter = crypto.getRandomValues(new Uint8Array(16))
				algorithm = { name: 'AES-CTR', counter, length: 64 }
				break
			}
			case 'AES-CBC': {
				iv = crypto.getRandomValues(new Uint8Array(16))
				algorithm = { name: 'AES-CBC', iv }
				break
			}
			default:
				throw new Error('Unsupported algorithm.')
		}

		const cryptoKey: CryptoKey = await this.setKey(key, algorithm)
		const encrypted: ArrayBuffer = await crypto.subtle.encrypt(algorithm, cryptoKey, encodedMessage)

		if (algorithmType === 'AES-GCM') {
			const tag: string = Hexadecimal.uint8ArrayToHex(new Uint8Array(encrypted.slice(-16)))
			const ciphertext: string = Hexadecimal.uint8ArrayToHex(new Uint8Array(encrypted.slice(0, -16)))
			return `${ciphertext}${this.delimiter}${Hexadecimal.uint8ArrayToHex(iv!)}${this.delimiter}${tag}`
		} else {
			const cipherHex: string = Hexadecimal.uint8ArrayToHex(new Uint8Array(encrypted))
			const counterHex: string = Hexadecimal.uint8ArrayToHex(algorithmType === 'AES-CTR' ? counter! : iv!)
			return `${cipherHex}${this.delimiter}${counterHex}`
		}
	}

	public static async decrypt(cipher: string, key: Uint8Array, algorithmType: 'AES-GCM' | 'AES-CTR' | 'AES-CBC'): Promise<string> {
		const parts: string[] = cipher.split(this.delimiter)
		let algorithm: AesAlgorithmParams
		let cryptoKey: CryptoKey
		let decrypted: ArrayBuffer

		switch (algorithmType) {
			case 'AES-GCM': {
				if (parts.length !== 3) throw new Error('Invalid cipher text format.')

				const [ciphertextHexGcm, ivHexGcm, tagHexGcm]: Array<string> = parts
				const ciphertextGcm: Uint8Array = Hexadecimal.hexToUint8Array(ciphertextHexGcm)
				const ivGcm: Uint8Array = Hexadecimal.hexToUint8Array(ivHexGcm)
				const tagGcm: Uint8Array = Hexadecimal.hexToUint8Array(tagHexGcm)

				algorithm = { name: 'AES-GCM', iv: ivGcm }
				cryptoKey = await this.setKey(key, algorithm)
				const cipherDataGcm: Uint8Array = new Uint8Array([...ciphertextGcm, ...tagGcm])
				decrypted = await crypto.subtle.decrypt(algorithm, cryptoKey, cipherDataGcm)
				break
			}
			case 'AES-CTR': {
				if (parts.length !== 2) throw new Error('Invalid cipher text format.')

				const [ciphertextHexCtr, counterHexCtr]: Array<string> = parts
				const ciphertextCtr: Uint8Array = Hexadecimal.hexToUint8Array(ciphertextHexCtr)
				const counterCtr: Uint8Array = Hexadecimal.hexToUint8Array(counterHexCtr)

				algorithm = { name: 'AES-CTR', counter: counterCtr, length: 64 }
				cryptoKey = await this.setKey(key, algorithm)
				decrypted = await crypto.subtle.decrypt(algorithm, cryptoKey, ciphertextCtr)
				break
			}
			case 'AES-CBC': {
				if (parts.length !== 2) throw new Error('Invalid cipher text format.')

				const [ciphertextHexCbc, ivHexCbc]: Array<string> = parts
				const ciphertextCbc: Uint8Array = Hexadecimal.hexToUint8Array(ciphertextHexCbc)
				const ivCbc: Uint8Array = Hexadecimal.hexToUint8Array(ivHexCbc)

				algorithm = { name: 'AES-CBC', iv: ivCbc }
				cryptoKey = await this.setKey(key, algorithm)
				decrypted = await crypto.subtle.decrypt(algorithm, cryptoKey, ciphertextCbc)
				break
			}
			default:
				throw new Error('Unsupported algorithm.')
		}

		return this.decoder.decode(decrypted)
	}
}
