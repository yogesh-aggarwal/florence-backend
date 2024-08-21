import { Client } from "@googlemaps/google-maps-services-js"
import { GOOGLE_MAPS_API_KEY } from "../../../../core/constants"
import { OrderPaymentDetailsQuotationDelivery_t } from "../../models/orders.types"
import { UserAddress_t } from "../../models/user.types"

const BASE_FARE_IN_INR = 50
const ADDITIONAL_FARE_PER_KM_IN_INR = 2
const TOTAL_MAXIMUM_FARE_IN_INR = 500

// --------------------------------------------------------------------------------------

export async function findNearestWarehouse(
	address: UserAddress_t
): Promise<[number, number]> {
	// TODO: Find nearest facility
	return [0, 0]
}

// --------------------------------------------------------------------------------------

export async function calculateDistanceInKM(
	address1: [number, number],
	address2: [number, number]
): Promise<number> {
	return 0

	const client = new Client()
	const res = await client.distancematrix({
		params: {
			origins: [address1],
			destinations: [address2],
			key: GOOGLE_MAPS_API_KEY,
		},
	})
	const distanceInMeters = res.data.rows[0].elements[0].distance.value
	const distanceInKM = distanceInMeters / 1000

	return distanceInKM
}

// --------------------------------------------------------------------------------------

export async function calculateOrderDeliveryQuotation(
	address: UserAddress_t
): Promise<OrderPaymentDetailsQuotationDelivery_t> {
	const quotation: OrderPaymentDetailsQuotationDelivery_t = {
		base: BASE_FARE_IN_INR,
		additional: 0,
		total: 0,
	}

	// Calculate distance from the nearest warehouse
	const sourceAddress = await findNearestWarehouse(address)
	const targetAddress: [number, number] = [address.latitude, address.longitude]
	const distanceInKM = await calculateDistanceInKM(sourceAddress, targetAddress)

	// Calculate additional fare
	quotation.additional = ADDITIONAL_FARE_PER_KM_IN_INR * distanceInKM
	quotation.total = quotation.base + quotation.additional

	// Cap the total fare
	quotation.total = Math.min(quotation.total, TOTAL_MAXIMUM_FARE_IN_INR)

	return quotation
}

// --------------------------------------------------------------------------------------
