import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class TrimPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (typeof value === 'string') {
			return value.trim()
		}

		if (typeof value === 'object' && value) {
			for (const key of Object.keys(value)) {
				if (typeof value[key] === 'string') {
					value[key] = value[key].trim()
				}
			}
		}

		return value
	}
}
