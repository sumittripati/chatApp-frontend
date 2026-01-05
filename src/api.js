// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// export const verifyUser = async (token) => {
//   if (!token) throw new Error("No token provided")

//   const res = await fetch(`${BASE_URL}/api/auth/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   })

// //   export const googleAuth = async (code) => {
// //   return axios.get(`${BASE_URL}/api/auth/google`, {
// //     params: { code }
// //   })
// // }

//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}))
//     throw new Error(error.message || "Unauthorized")
//   }

//   return res.json()
// }




// export const googleAuth = async (code) => {
//   return axios.get(`${BASE_URL}/api/auth/google`, {
//     params: { code }
//   })
// }




import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const verifyUser = async (token) => {
  if (!token) throw new Error("No token provided")

  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || "Unauthorized")
  }

  return res.json()
}

export const googleAuth = async (code) => {
  return axios.get(`${BASE_URL}/api/auth/google`, {
    params: { code }
  })
}


