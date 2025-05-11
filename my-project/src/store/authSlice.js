// // import {createSlice} from "@reduxjs/toolkit";

// // const initialState = {
// //     status : false,
// //     userData : null
// // }

// // const authSlice = createSlice ({
// //     name : "auth",
// //     initialState,
// //     reducers : {
// //         login : (state,action) => {
// //             state.status = true;
// //             state.userData = action.payload;
// //         },
// //         logout : (state) => {
// //             state.status = false;
// //             state.userData = null
// //         }
// //     }
// // })

// // export const {login,logout} = authSlice.actions
// // export default authSlice.reducer

// import {createSlice} from "@reduxjs/toolkit";

// const initialState = {
//     status : false,
//     userData : null,
//     token: null
// }

// const authSlice = createSlice ({
//     name : "auth",
//     initialState,
//     reducers : {
//         login : (state, action) => {
//             state.status = true;
//             state.userData = action.payload;
//             // If a token is provided in the payload, store it
//             if (action.payload.token) {
//                 state.token = action.payload.token;
//             }
//         },
//         logout : (state) => {
//             state.status = false;
//             state.userData = null;
//             state.token = null;
//         },
//         updateUserData: (state, action) => {
//             state.userData = {
//                 ...state.userData,
//                 ...action.payload
//             };
//         }
//     }
// })

// export const {login, logout, updateUserData} = authSlice.actions
// export default authSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Create async thunk for updating user after payment
export const updateUserAfterPayment = createAsyncThunk(
  'auth/updateUserAfterPayment',
  async (userData, { rejectWithValue }) => {
    try {
      // In a real implementation, you might want to fetch the latest user data
      // from the server after a payment to ensure it's up to date
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update user data');
    }
  }
);

const initialState = {
    status: false,
    userData: null,
    token: null,
    paymentStatus: {
        loading: false,
        error: null,
        success: false,
        lastUpdated: null
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            // If a token is provided in the payload, store it
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.token = null;
            state.paymentStatus = initialState.paymentStatus;
        },
        updateUserData: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload
            };
        },
        // Reset payment status after handling
        resetPaymentStatus: (state) => {
            state.paymentStatus = initialState.paymentStatus;
        },
        // For direct token updates (if needed)
        updateUserTokens: (state, action) => {
            if (state.userData && state.userData.tokens) {
                state.userData.tokens.balance = action.payload.newBalance;
                // You might want to update other token-related fields
            }
        },
        // For direct subscription updates (if needed)
        updateUserSubscription: (state, action) => {
            if (state.userData && state.userData.subscription) {
                state.userData.subscription = {
                    ...state.userData.subscription,
                    ...action.payload
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserAfterPayment.pending, (state) => {
                state.paymentStatus.loading = true;
                state.paymentStatus.error = null;
                state.paymentStatus.success = false;
            })
            .addCase(updateUserAfterPayment.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.paymentStatus.loading = false;
                state.paymentStatus.success = true;
                state.paymentStatus.lastUpdated = new Date().toISOString();
            })
            .addCase(updateUserAfterPayment.rejected, (state, action) => {
                state.paymentStatus.loading = false;
                state.paymentStatus.error = action.payload;
                state.paymentStatus.success = false;
            });
    }
});

export const {
    login,
    logout,
    updateUserData,
    resetPaymentStatus,
    updateUserTokens,
    updateUserSubscription
} = authSlice.actions;

export default authSlice.reducer;