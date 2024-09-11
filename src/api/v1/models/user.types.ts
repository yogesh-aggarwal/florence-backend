import mongoose from "mongoose"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const UserMetadata_t = z.object({
   createdAt: z.number(),
   updatedAt: z.number(),

   isUpdated: z.boolean(),
})
export type UserMetadata_t = z.infer<typeof UserMetadata_t>

// --------------------------------------------------------------------------------------

export enum UserAddressType {
   Home = "Home",
   Work = "Work",
   Other = "Other",
}

// --------------------------------------------------------------------------------------

export const UserAddressMetadata_t = z.object({
   createdAt: z.number(),
   updatedAt: z.number(),

   isUpdated: z.boolean(),
})
export type UserAddressMetadata_t = z.infer<typeof UserAddressMetadata_t>

// --------------------------------------------------------------------------------------

export const UserAddress_t = z.object({
   _id: z.instanceof(mongoose.Types.ObjectId),
   metadata: UserAddressMetadata_t,

   type: z.nativeEnum(UserAddressType),
   isDefault: z.boolean(),

   city: z.string(),
   state: z.string(),
   country: z.string(),
   pincode: z.string(),
   landmark: z.string(),
   address: z.string(),
   phoneNumber: z.string(),

   latitude: z.number(),
   longitude: z.number(),
})
export type UserAddress_t = z.infer<typeof UserAddress_t>

// --------------------------------------------------------------------------------------

export const UserData_t = z.object({
   wishlist: z.array(z.string()),
   deliveryAddresses: z.array(UserAddress_t),
})
export type UserData_t = z.infer<typeof UserData_t>

// --------------------------------------------------------------------------------------

export const User_t = z.object({
   _id: z.instanceof(mongoose.Types.ObjectId),
   metadata: UserMetadata_t,

   dp: z.string(),
   name: z.string(),
   email: z.string(),
   password: z.string(),

   data: UserData_t,
})
export type User_t = z.infer<typeof User_t>

// --------------------------------------------------------------------------------------
