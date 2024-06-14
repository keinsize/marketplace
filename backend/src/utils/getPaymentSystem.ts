import { PaymentSystems } from '@prisma/client'

export const getPaymentSystem = async (cardNumber: number) => {
	let paymentSystem: PaymentSystems

	switch (cardNumber[0]) {
		case '2':
			paymentSystem = PaymentSystems.Mir
			break
		case '3':
		case '6':
			paymentSystem = PaymentSystems.Maestro
			break
		case '4':
			paymentSystem = PaymentSystems.Visa
			break
		case '5':
			paymentSystem = PaymentSystems.MasterCard
			break
	}

	return paymentSystem
}
